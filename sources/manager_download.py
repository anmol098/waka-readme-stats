import asyncio
import collections.abc
import json
from hashlib import md5
from os.path import join
from string import Template
from typing import Any, Callable, Optional, List, Tuple

from httpx import AsyncClient
from yaml import safe_load

from manager_environment import EnvironmentManager as EM
from manager_debug import DebugManager as DBM

GITHUB_API_QUERIES = {
    # Query to collect info about all user repositories, including: is it a fork, name and owner login.
    # NB! Query includes information about recent repositories only (apparently, contributed within a year).
    "repos_contributed_to": """
{
    user(login: "$username") {
        repositoriesContributedTo(orderBy: {field: CREATED_AT, direction: DESC}, $pagination, includeUserRepositories: true) {
            nodes {
                primaryLanguage {
                    name
                }
                name
                owner {
                    login
                }
                isPrivate
                isFork
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
}""",
    # Query to collect info about all repositories user created or collaborated on, including: name, primary language and owner login.
    # NB! Query doesn't include information about repositories user contributed to via pull requests.
    "user_repository_list": """
{
    user(login: "$username") {
        repositories(orderBy: {field: CREATED_AT, direction: DESC}, $pagination, affiliations: [OWNER, COLLABORATOR], isFork: false) {
            nodes {
                primaryLanguage {
                    name
                }
                name
                owner {
                    login
                }
                isPrivate
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
}
""",
    # Query to collect info about branches in the given repository, including: names.
    "repo_branch_list": """
{
    repository(owner: "$owner", name: "$name") {
        refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, $pagination) {
            nodes {
                name
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
}
""",
    # Query to collect info about user commits to given repository, including: commit date, additions and deletions numbers.
    "repo_commit_list": """
{
    repository(owner: "$owner", name: "$name") {
        ref(qualifiedName: "refs/heads/$branch") {
            target {
                ... on Commit {
                    history(author: { id: "$id" }, $pagination) {
                        nodes {
                            ... on Commit {
                                additions
                                deletions
                                committedDate
                                oid
                            }
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                    }
                }
            }
        }
    }
}
""",
    # Query to hide outdated PR comment.
    "hide_outdated_comment": """
mutation {
    minimizeComment(input: {classifier: OUTDATED, subjectId: "$id"}) {
        clientMutationId
    }
}
""",
}


async def init_download_manager(user_login: str):
    """
    Initialize download manager:
    - Setup headers for GitHub GraphQL requests.
    - Launch static queries in background.

    :param user_login: GitHub user login.
    """
    if EM.MOCK_WAKATIME:
        DownloadManager._REMOTE_RESOURCES_CACHE["waka_latest"] = DownloadManager._load_mock_json("mock_wakatime_stats.json")
        DownloadManager._REMOTE_RESOURCES_CACHE["waka_all"] = DownloadManager._load_mock_json("mock_wakatime_all_time.json")

    await DownloadManager.load_remote_resources(
        linguist="https://cdn.jsdelivr.net/gh/github/linguist@master/lib/linguist/languages.yml",
        waka_latest=f"{EM.WAKATIME_API_URL}users/current/stats/last_7_days?api_key={EM.WAKATIME_API_KEY}",
        waka_all=f"{EM.WAKATIME_API_URL}users/current/all_time_since_today?api_key={EM.WAKATIME_API_KEY}",
        github_stats=f"https://github-contributions.vercel.app/api/v1/{user_login}",
    )


class DownloadManager:
    """
    Class for handling and caching all kinds of requests.
    There considered to be two types of queries:
    - Static queries: queries that don't require many arguments that should be executed once
      Example: queries to WakaTime API or to GitHub linguist
    - Dynamic queries: queries that require many arguments and should be executed multiple times
      Example: GraphQL queries to GitHub API
    DownloadManager launches all static queries asynchronously upon initialization and caches their results.
    It also executes dynamic queries upon request and caches result.
    """

    _client = AsyncClient(timeout=60.0)
    _REMOTE_RESOURCES_CACHE = dict()

    @staticmethod
    def _load_mock_json(filename: str) -> dict:
        path = join(EM.MOCK_DATA_DIR, filename)
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    @staticmethod
    async def load_remote_resources(**resources: str):
        """
        Prepare DownloadManager to launch GitHub API queries and launch all static queries.
        :param resources: Static queries, formatted like "IDENTIFIER"="URL".
        """
        for resource, url in resources.items():
            # Use mock instead of live
            existing = DownloadManager._REMOTE_RESOURCES_CACHE.get(resource)
            if isinstance(existing, dict):
                continue
            # Schedule the coroutine as a Task so it can be cancelled/inspected later
            DownloadManager._REMOTE_RESOURCES_CACHE[resource] = asyncio.create_task(DownloadManager._client.get(url))

    @staticmethod
    async def close_remote_resources():
        """
        Close DownloadManager and cancel all un-awaited static web queries.
        Await all queries that could not be cancelled.
        """
        for resource in DownloadManager._REMOTE_RESOURCES_CACHE.values():
            # Prefer Tasks: cancel and await them to ensure proper cleanup.
            if isinstance(resource, asyncio.Task):
                resource.cancel()
                try:
                    await resource
                except asyncio.CancelledError:
                    # Expected when task was cancelled
                    pass
                except Exception as e:
                    DBM.w(f"Error while awaiting cancelled resource: {e}")
            elif isinstance(resource, collections.abc.Awaitable):
                # Fallback for plain awaitables: await and log exceptions
                try:
                    await resource
                except Exception as e:
                    DBM.w(f"Error while awaiting resource: {e}")

    @staticmethod
    async def _get_remote_resource(resource: str, convertor: Optional[Callable[[bytes], dict]]) -> Optional[dict]:
        """
        Receive execution result of static query, wait for it if necessary.
        If the query wasn't cached previously, cache it.
        NB! Caching is done before response parsing - to throw exception on accessing cached erroneous response.
        :param resource: Static query identifier.
        :param convertor: Optional function to convert `response.contents` to dict.
            By default `response.json()` is used.
        :return: Response dictionary or None.
        """
        # use mock and prevent network data from being requested
        cached = DownloadManager._REMOTE_RESOURCES_CACHE.get(resource)
        if isinstance(cached, dict):
            return cached

        DBM.i(f"\tMaking a remote API query named '{resource}'...")
        if isinstance(DownloadManager._REMOTE_RESOURCES_CACHE[resource], collections.abc.Awaitable):
            res = await DownloadManager._REMOTE_RESOURCES_CACHE[resource]
            DownloadManager._REMOTE_RESOURCES_CACHE[resource] = res
            DBM.g(f"\tQuery '{resource}' finished, result saved!")
        else:
            res = DownloadManager._REMOTE_RESOURCES_CACHE[resource]
            DBM.g(f"\tQuery '{resource}' loaded from cache!")
        if res.status_code == 200:
            if convertor is None:
                return res.json()
            else:
                return convertor(res.content)
        elif res.status_code == 201:
            DBM.w(f"\tQuery '{resource}' returned 201 status code")
            return None
        elif res.status_code == 202:
            DBM.w(f"\tQuery '{resource}' returned 202 status code")
            return None
        else:
            raise Exception(f"Query '{res.url}' failed to run by returning code of {res.status_code}: {res.json()}")

    @staticmethod
    async def get_remote_json(resource: str) -> Optional[dict]:
        """
        Shortcut for `_get_remote_resource` to return JSON response data.
        :param resource: Static query identifier.
        :return: Response JSON dictionary.
        """
        return await DownloadManager._get_remote_resource(resource, None)

    @staticmethod
    async def get_remote_yaml(resource: str) -> Optional[dict]:
        """
        Shortcut for `_get_remote_resource` to return YAML response data.
        :param resource: Static query identifier.
        :return: Response YAML dictionary.
        """
        return await DownloadManager._get_remote_resource(resource, safe_load)

    @staticmethod
    async def _fetch_graphql_query(query: str, retries_count: int = 10, **kwargs) -> dict:
        """
        Execute GitHub GraphQL API simple query.
        :param query: Dynamic query identifier.
        :param use_github_action: Use GitHub actions bot auth token instead of current user.
        :param kwargs: Parameters for substitution of variables in dynamic query.
        :return: Response JSON dictionary.
        """
        headers = {"Authorization": f"Bearer {EM.GH_TOKEN}"}
        res = await DownloadManager._client.post(
            "https://api.github.com/graphql", json={"query": Template(GITHUB_API_QUERIES[query]).substitute(kwargs)}, headers=headers
        )
        if res.status_code == 200:
            return res.json()

        # Transient errors can happen (GitHub flakiness, rate limiting, proxies returning HTML/empty bodies).
        if res.status_code in (502, 503, 504, 429, 403) and retries_count > 0:
            # Minimal backoff (keeps behavior simple but avoids tight recursion loops)
            await asyncio.sleep(1.0)
            return await DownloadManager._fetch_graphql_query(query, retries_count - 1, **kwargs)

        try:
            body_obj = res.json()
            body_preview = json.dumps(body_obj)[:500]
        except (json.JSONDecodeError, ValueError):
            body_preview = (res.text or "").replace("\n", " ").replace("\r", " ")[:500]

        content_type = res.headers.get("content-type", "")
        rate_remaining = res.headers.get("x-ratelimit-remaining", "?")
        rate_reset = res.headers.get("x-ratelimit-reset", "?")
        raise Exception(
            f"Query '{query}' failed (HTTP {res.status_code}, content-type='{content_type}', "
            f"x-ratelimit-remaining={rate_remaining}, x-ratelimit-reset={rate_reset}). Body: {body_preview}"
        )

    @staticmethod
    def _find_pagination_and_data_list(response: dict) -> Tuple[List, dict]:
        """
        Parses response as a paginated response.
        NB! All paginated responses are expected to have the following structure:
        {
            ...: {
                "nodes": [],
                "pageInfo" : {}
            }
        }
        Where `...` states for any number of dictionaries containing _one single key_ only.
        If the structure of the response isn't met, a tuple of empty list and dist with only `hasNextPage=False` is returned!
        :param response: Response JSON dictionary.
        :returns: Tuple of the acquired pagination data list ("nodes" key) and pagination info dict ("pageInfo" key).
        """
        if "nodes" in response.keys() and "pageInfo" in response.keys():
            return response["nodes"], response["pageInfo"]
        elif len(response) == 1 and isinstance(response[list(response.keys())[0]], dict):
            return DownloadManager._find_pagination_and_data_list(response[list(response.keys())[0]])
        else:
            return list(), dict(hasNextPage=False)

    @staticmethod
    async def _fetch_graphql_paginated(query: str, max_nodes: Optional[int] = None, **kwargs) -> List[dict]:
        """
        Execute GitHub GraphQL API paginated query.
        Queries 100 new results each time until no more results are left.
        Merges result list into single query, clears pagination-related info.
        :param query: Dynamic query identifier.
        :param use_github_action: Use GitHub actions bot auth token instead of current user.
        :param max_nodes: Optional maximum number of nodes to return (early-stops pagination).
        :param kwargs: Parameters for substitution of variables in dynamic query.
        :return: Response JSON dictionary.
        """
        initial_query_response = await DownloadManager._fetch_graphql_query(query, **kwargs, pagination="first: 100")
        page_list, page_info = DownloadManager._find_pagination_and_data_list(initial_query_response)
        if max_nodes is not None and max_nodes > 0 and len(page_list) >= max_nodes:
            return page_list[:max_nodes]

        while page_info["hasNextPage"] and (max_nodes is None or max_nodes <= 0 or len(page_list) < max_nodes):
            pagination = f'first: 100, after: "{page_info["endCursor"]}"'
            query_response = await DownloadManager._fetch_graphql_query(query, **kwargs, pagination=pagination)
            new_page_list, page_info = DownloadManager._find_pagination_and_data_list(query_response)
            page_list += new_page_list
            if max_nodes is not None and max_nodes > 0 and len(page_list) >= max_nodes:
                page_list = page_list[:max_nodes]
                break
        return page_list

    @staticmethod
    async def get_remote_graphql(query: str, **kwargs) -> Any:
        """
        Execute GitHub GraphQL API query.
        The queries are defined in `GITHUB_API_QUERIES`, all parameters should be passed as kwargs.
        If the query wasn't cached previously, cache it. Cache query by its identifier + parameters hash.
        Merges paginated sub-queries if pagination is required for the query.
        Parse and return response as JSON.
        :param query: Dynamic query identifier.
        :param kwargs: Parameters for substitution of variables in dynamic query.
        :param _max_nodes: Internal parameter to cap nodes for paginated queries (not substituted into GraphQL).
        :return: Response JSON dictionary.
        """
        max_nodes = kwargs.pop("_max_nodes", None)
        cache_key_kwargs = dict(kwargs)
        cache_key_kwargs["_max_nodes"] = max_nodes
        key = f"{query}_{md5(json.dumps(cache_key_kwargs, sort_keys=True).encode('utf-8')).digest()}"
        if key not in DownloadManager._REMOTE_RESOURCES_CACHE:
            if "$pagination" in GITHUB_API_QUERIES[query]:
                res = await DownloadManager._fetch_graphql_paginated(query, max_nodes=max_nodes, **kwargs)
            else:
                res = await DownloadManager._fetch_graphql_query(query, **kwargs)
            DownloadManager._REMOTE_RESOURCES_CACHE[key] = res
        else:
            res = DownloadManager._REMOTE_RESOURCES_CACHE[key]
        return res
