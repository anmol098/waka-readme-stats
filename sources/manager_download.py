from asyncio import Task
from hashlib import md5
from json import dumps
from string import Template
from typing import Awaitable, Dict, Callable, Optional, List, Tuple

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
    await DownloadManager.load_remote_resources(
        linguist="https://cdn.jsdelivr.net/gh/github/linguist@master/lib/linguist/languages.yml",
        waka_latest=f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={EM.WAKATIME_API_KEY}",
        waka_all=f"https://wakatime.com/api/v1/users/current/all_time_since_today?api_key={EM.WAKATIME_API_KEY}",
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
    async def load_remote_resources(**resources: str):
        """
        Prepare DownloadManager to launch GitHub API queries and launch all static queries.
        :param resources: Static queries, formatted like "IDENTIFIER"="URL".
        """
        for resource, url in resources.items():
            DownloadManager._REMOTE_RESOURCES_CACHE[resource] = DownloadManager._client.get(url)

    @staticmethod
    async def close_remote_resources():
        """
        Close DownloadManager and cancel all un-awaited static web queries.
        Await all queries that could not be cancelled.
        """
        for resource in DownloadManager._REMOTE_RESOURCES_CACHE.values():
            if isinstance(resource, Task):
                resource.cancel()
            elif isinstance(resource, Awaitable):
                await resource

    @staticmethod
    async def _get_remote_resource(resource: str, convertor: Optional[Callable[[bytes], Dict]]) -> Dict:
        """
        Receive execution result of static query, wait for it if necessary.
        If the query wasn't cached previously, cache it.
        NB! Caching is done before response parsing - to throw exception on accessing cached erroneous response.
        :param resource: Static query identifier.
        :param convertor: Optional function to convert `response.contents` to dict.
            By default `response.json()` is used.
        :return: Response dictionary.
        """
        DBM.i(f"\tMaking a remote API query named '{resource}'...")
        if isinstance(DownloadManager._REMOTE_RESOURCES_CACHE[resource], Awaitable):
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
        else:
            raise Exception(f"Query '{res.url}' failed to run by returning code of {res.status_code}: {res.json()}")

    @staticmethod
    async def get_remote_json(resource: str) -> Dict:
        """
        Shortcut for `_get_remote_resource` to return JSON response data.
        :param resource: Static query identifier.
        :return: Response JSON dictionary.
        """
        return await DownloadManager._get_remote_resource(resource, None)

    @staticmethod
    async def get_remote_yaml(resource: str) -> Dict:
        """
        Shortcut for `_get_remote_resource` to return YAML response data.
        :param resource: Static query identifier.
        :return: Response YAML dictionary.
        """
        return await DownloadManager._get_remote_resource(resource, safe_load)

    @staticmethod
    async def _fetch_graphql_query(query: str, retries_count: int = 10, **kwargs) -> Dict:
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
        elif res.status_code == 502 and retries_count > 0:
            return await DownloadManager._fetch_graphql_query(query, retries_count - 1, **kwargs)
        else:
            raise Exception(f"Query '{query}' failed to run by returning code of {res.status_code}: {res.json()}")

    @staticmethod
    def _find_pagination_and_data_list(response: Dict) -> Tuple[List, Dict]:
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
        elif len(response) == 1 and isinstance(response[list(response.keys())[0]], Dict):
            return DownloadManager._find_pagination_and_data_list(response[list(response.keys())[0]])
        else:
            return list(), dict(hasNextPage=False)

    @staticmethod
    async def _fetch_graphql_paginated(query: str, **kwargs) -> Dict:
        """
        Execute GitHub GraphQL API paginated query.
        Queries 100 new results each time until no more results are left.
        Merges result list into single query, clears pagination-related info.
        :param query: Dynamic query identifier.
        :param use_github_action: Use GitHub actions bot auth token instead of current user.
        :param kwargs: Parameters for substitution of variables in dynamic query.
        :return: Response JSON dictionary.
        """
        initial_query_response = await DownloadManager._fetch_graphql_query(query, **kwargs, pagination="first: 100")
        page_list, page_info = DownloadManager._find_pagination_and_data_list(initial_query_response)
        while page_info["hasNextPage"]:
            pagination = f'first: 100, after: "{page_info["endCursor"]}"'
            query_response = await DownloadManager._fetch_graphql_query(query, **kwargs, pagination=pagination)
            new_page_list, page_info = DownloadManager._find_pagination_and_data_list(query_response)
            page_list += new_page_list
        _, page_info = DownloadManager._find_pagination_and_data_list(initial_query_response)
        page_info.clear()
        return initial_query_response

    @staticmethod
    async def get_remote_graphql(query: str, **kwargs) -> Dict:
        """
        Execute GitHub GraphQL API query.
        The queries are defined in `GITHUB_API_QUERIES`, all parameters should be passed as kwargs.
        If the query wasn't cached previously, cache it. Cache query by its identifier + parameters hash.
        Merges paginated sub-queries if pagination is required for the query.
        Parse and return response as JSON.
        :param query: Dynamic query identifier.
        :param kwargs: Parameters for substitution of variables in dynamic query.
        :return: Response JSON dictionary.
        """
        key = f"{query}_{md5(dumps(kwargs, sort_keys=True).encode('utf-8')).digest()}"
        if key not in DownloadManager._REMOTE_RESOURCES_CACHE:
            if "$pagination" in GITHUB_API_QUERIES[query]:
                res = await DownloadManager._fetch_graphql_paginated(query, **kwargs)
            else:
                res = await DownloadManager._fetch_graphql_query(query, **kwargs)
            DownloadManager._REMOTE_RESOURCES_CACHE[key] = res
        else:
            res = DownloadManager._REMOTE_RESOURCES_CACHE[key]
        return res
