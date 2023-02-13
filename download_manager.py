from typing import Awaitable, Dict, Callable, Optional, Tuple

from http3 import AsyncClient
from yaml import safe_load


async def init_download_manager():
    await DownloadManager.load_remote_resources({
        "linguist": ("https://cdn.jsdelivr.net/gh/github/linguist@master/lib/linguist/languages.yml", {})
    })


class DownloadManager:
    _client = AsyncClient()
    _REMOTE_RESOURCES = dict()

    @staticmethod
    async def load_remote_resources(resources: Dict[str, Tuple[str, Dict]]):
        for resource, (url, params) in resources.items():
            DownloadManager._REMOTE_RESOURCES[resource] = DownloadManager._client.get(url, **params)

    @staticmethod
    async def _get_remote_resource(resource: str, convertor: Optional[Callable[[bytes], str]]) -> Dict:
        if isinstance(DownloadManager._REMOTE_RESOURCES[resource], Awaitable):
            res = await DownloadManager._REMOTE_RESOURCES[resource]
            if res.status_code == 200:
                if convertor is None:
                    DownloadManager._REMOTE_RESOURCES[resource] = res.json()
                    print(res.json())
                else:
                    DownloadManager._REMOTE_RESOURCES[resource] = convertor(res.content)
            else:
                raise Exception(f"Query '{res.url}' failed to run by returning code of {res.status_code}: {res.json()}")
        return DownloadManager._REMOTE_RESOURCES[resource]

    @staticmethod
    async def get_remote_json(resource: str) -> Dict:
        return await DownloadManager._get_remote_resource(resource, None)

    @staticmethod
    async def get_remote_yaml(resource: str) -> Dict:
        return await DownloadManager._get_remote_resource(resource, safe_load)
