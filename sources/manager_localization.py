from json import load
from os.path import join, dirname
from typing import Dict

from manager_environment import EnvironmentManager as EM


def init_localization_manager():
    """
    """
    LocalizationManager.load_localization("translation.json")


class LocalizationManager:
    _LOCALIZATION: Dict[str, str] = dict()

    @staticmethod
    def load_localization(file: str):
        with open(join(dirname(__file__), file), encoding='utf-8') as config_file:
            data = load(config_file)
        LocalizationManager._LOCALIZATION = data[EM.LOCALE]

    @staticmethod
    def t(key: str) -> str:
        return LocalizationManager._LOCALIZATION[key]
