from datetime import datetime
from logging import getLogger, Logger, StreamHandler
from string import Template
from typing import Dict

from humanize import precisedelta

from manager_environment import EnvironmentManager as EM


def init_debug_manager():
    """
    Initialize download manager:
    - Setup headers for GitHub GraphQL requests.
    - Launch static queries in background.
    """
    DebugManager.create_logger("DEBUG" if EM.DEBUG_LOGGING else "ERROR")


class DebugManager:
    _COLOR_RESET = "\u001B[0m"
    _COLOR_RED = "\u001B[31m"
    _COLOR_GREEN = "\u001B[32m"
    _COLOR_BLUE = "\u001B[34m"
    _COLOR_YELLOW = "\u001B[33m"

    _DATE_TEMPLATE = "date"
    _TIME_TEMPLATE = "time"

    _logger: Logger

    @staticmethod
    def create_logger(level: str):
        DebugManager._logger = getLogger(__name__)
        DebugManager._logger.setLevel(level)
        DebugManager._logger.addHandler(StreamHandler())

    @staticmethod
    def _process_template(message: str, kwargs: Dict) -> str:
        if DebugManager._DATE_TEMPLATE in kwargs:
            kwargs[DebugManager._DATE_TEMPLATE] = f"{datetime.strftime(kwargs[DebugManager._DATE_TEMPLATE], '%d-%m-%Y %H:%M:%S:%f')}"
        if DebugManager._TIME_TEMPLATE in kwargs:
            kwargs[DebugManager._TIME_TEMPLATE] = precisedelta(kwargs[DebugManager._TIME_TEMPLATE], minimum_unit="microseconds")

        return Template(message).substitute(kwargs)

    @staticmethod
    def g(message: str, **kwargs):
        message = DebugManager._process_template(message, kwargs)
        DebugManager._logger.info(f"{DebugManager._COLOR_GREEN}{message}{DebugManager._COLOR_RESET}")

    @staticmethod
    def i(message: str, **kwargs):
        message = DebugManager._process_template(message, kwargs)
        DebugManager._logger.debug(f"{DebugManager._COLOR_BLUE}{message}{DebugManager._COLOR_RESET}")

    @staticmethod
    def w(message: str, **kwargs):
        message = DebugManager._process_template(message, kwargs)
        DebugManager._logger.warning(f"{DebugManager._COLOR_YELLOW}{message}{DebugManager._COLOR_RESET}")

    @staticmethod
    def p(message: str, **kwargs):
        message = DebugManager._process_template(message, kwargs)
        DebugManager._logger.error(message)
