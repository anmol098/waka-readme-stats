from os.path import join, isfile, dirname
from pickle import load as load_pickle, dump as dump_pickle
from json import load as load_json
from typing import Dict, Optional, Any

from manager_environment import EnvironmentManager as EM


def init_localization_manager():
    """
    Initialize localization manager.
    Load GUI translations JSON file.
    """
    FileManager.load_localization("translation.json")


class FileManager:
    """
    Class for handling localization (and maybe other file IO in future).
    Stores localization in dictionary.
    """

    ASSETS_DIR = "assets"
    _LOCALIZATION: Dict[str, str] = dict()

    @staticmethod
    def load_localization(file: str):
        """
        Read localization file and store locale defined with environmental variable.

        :param file: Localization file path, related to current file (in sources root).
        """
        with open(join(dirname(__file__), file), encoding="utf-8") as config_file:
            data = load_json(config_file)
        FileManager._LOCALIZATION = data[EM.LOCALE]

    @staticmethod
    def t(key: str) -> str:
        """
        Translate string to current localization.

        :param key: Localization key.
        :returns: Translation string.
        """
        return FileManager._LOCALIZATION[key]

    @staticmethod
    def write_file(name: str, content: str, append: bool = False, assets: bool = False):
        """
        Save output file.

        :param name: File name.
        :param content: File content (utf-8 string).
        :param append: True for appending to file, false for rewriting.
        :param assets: True for saving to 'assets' directory, false otherwise.
        """
        name = join(FileManager.ASSETS_DIR, name) if assets else name
        with open(name, "a" if append else "w", encoding="utf-8") as file:
            file.write(content)

    @staticmethod
    def cache_binary(name: str, content: Optional[Any] = None, assets: bool = False) -> Optional[Any]:
        """
        Save binary output file if provided or read if content is None.

        :param name: File name.
        :param content: File content (utf-8 string) or None.
        :param assets: True for saving to 'assets' directory, false otherwise.
        :returns: File cache contents if content is None, None otherwise.
        """
        name = join(FileManager.ASSETS_DIR, name) if assets else name
        if content is None and not isfile(name):
            return None

        with open(name, "rb" if content is None else "wb") as file:
            if content is None:
                try:
                    return load_pickle(file)
                except Exception:
                    return None
            else:
                dump_pickle(content, file)
                return None
