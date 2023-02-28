from json import load
from os.path import join, dirname
from typing import Dict

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

    _LOCALIZATION: Dict[str, str] = dict()

    @staticmethod
    def load_localization(file: str):
        """
        Read localization file and store locale defined with environmental variable.

        :param file: Localization file path, related to current file (in sources root).
        """
        with open(join(dirname(__file__), file), encoding="utf-8") as config_file:
            data = load(config_file)
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
        name = join("assets", name) if assets else name
        with open(name, "a" if append else "w", encoding="utf-8") as file:
            file.write(content)
