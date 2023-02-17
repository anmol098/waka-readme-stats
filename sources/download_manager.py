from hashlib import md5
from json import dumps
from string import Template
from typing import Awaitable, Dict, Callable, Optional

from httpx import AsyncClient
from yaml import safe_load
from github import AuthenticatedUser


GITHUB_API_QUERIES = {
    "repositories_contributed_to": """
{
    user(login: "$username") {
        repositoriesContributedTo(last: 100, includeUserRepositories: true) {
            nodes {
                isFork
                name
                owner {
                    login
                }
            }
        }
    }
}""",
    "repository_committed_dates": """
{
    repository(owner: "$owner", name: "$name") {
        defaultBranchRef {
            target {
                ... on Commit {
                    history(first: 100, author: { id: "$id" }) {
                        edges {
                            node {
                                committedDate
                            }
                        }
                    }
                }
            }
        }
    }
}""",
    "user_repository_list": """
{
    user(login: "$username") {
        repositories(orderBy: {field: CREATED_AT, direction: ASC}, last: 100, affiliations: [OWNER, COLLABORATOR], isFork: false) {
            edges {
                node {
                    primaryLanguage {
                        name
                    }
                    name
                    owner {
                        login
                    }
                }
            }
        }
    }
}
""",
    "repository_commit_list": """
{
    repository(owner: "$owner", name: "$name") {
        refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 10) {
            edges {
                node {
                    ... on Ref {
                        target {
                            ... on Commit {
                                history(first: 100, author: { id: "$id" }) {
                                    edges {
                                        node {
                                            ... on Commit {
                                                additions
                                                deletions
                                                committedDate
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
"""
}


async def init_download_manager(waka_key: str, github_key: str, user: AuthenticatedUser):
    """
    Initialize download manager:
    - Setup headers for GitHub GraphQL requests.
    - Launch static queries in background.
    :param waka_key: WakaTime API token.
    :param github_key: GitHub API token.
    :param user: GitHub current user info.
    """
    await DownloadManager.load_remote_resources({
        "linguist": "https://cdn.jsdelivr.net/gh/github/linguist@master/lib/linguist/languages.yml",
        "waka_latest": f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={waka_key}",
        "waka_all": f"https://wakatime.com/api/v1/users/current/all_time_since_today?api_key={waka_key}",
        "github_stats": f"https://github-contributions.vercel.app/api/v1/{user.login}"
    }, {
        "Authorization": f"Bearer {github_key}"
    })


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
    async def load_remote_resources(resources: Dict[str, str], github_headers: Dict[str, str]):
        """
        Prepare DownloadManager to launch GitHub API queries and launch all static queries.
        :param resources: Dictionary of static queries, "IDENTIFIER": "URL".
        :param github_headers: Dictionary of headers for GitHub API queries.
        """
        for resource, url in resources.items():
            DownloadManager._REMOTE_RESOURCES_CACHE[resource] = DownloadManager._client.get(url)
        DownloadManager._client.headers = github_headers

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
        if isinstance(DownloadManager._REMOTE_RESOURCES_CACHE[resource], Awaitable):
            res = await DownloadManager._REMOTE_RESOURCES_CACHE[resource]
            DownloadManager._REMOTE_RESOURCES_CACHE[resource] = res
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
    async def get_remote_graphql(query: str, **kwargs) -> Dict:
        """
        Execute GitHub GraphQL API query.
        The queries are defined in `GITHUB_API_QUERIES`, all parameters should be passed as kwargs.
        If the query wasn't cached previously, cache it. Cache query by its identifier + parameters hash.
        NB! Caching is done before response parsing - to throw exception on accessing cached erroneous response.
        Parse and return response as JSON.
        :param query: Dynamic query identifier.
        :param kwargs: Parameters for substitution of variables in dynamic query.
        :return: Response JSON dictionary.
        """
        key = f"{query}_{md5(dumps(kwargs, sort_keys=True).encode('utf-8')).digest()}"
        if key not in DownloadManager._REMOTE_RESOURCES_CACHE:
            res = await DownloadManager._client.post("https://api.github.com/graphql", json={
                "query": Template(GITHUB_API_QUERIES[query]).substitute(kwargs)
            })
            DownloadManager._REMOTE_RESOURCES_CACHE[key] = res
        else:
            res = DownloadManager._REMOTE_RESOURCES_CACHE[key]
        if res.status_code == 200:
            return res.json()
        else:
            raise Exception(f"Query '{query}' failed to run by returning code of {res.status_code}: {res.json()}")
