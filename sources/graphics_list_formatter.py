from enum import Enum
from typing import Dict, Tuple, List
from datetime import datetime

from pytz import timezone, utc

from manager_download import DownloadManager as DM
from manager_environment import EnvironmentManager as EM
from manager_github import GitHubManager as GHM
from manager_localization import LocalizationManager as LM


DAY_TIME_EMOJI = ["🌞", "🌆", "🌃", "🌙"]
DAY_TIME_NAMES = ["Morning", "Daytime", "Evening", "Night"]
WEEK_DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


class Symbol(Enum):
    VERSION_1 = "█", "░"
    VERSION_2 = "⣿", "⣀"
    VERSION_3 = "⬛", "⬜"

    @staticmethod
    def get_symbols(version: int) -> Tuple[str, str]:
        return Symbol[f"VERSION_{version}"].value


def make_graph(percent: float):
    """
    Make progress graph from API graph
    """
    done_block, empty_block = Symbol.get_symbols(EM.SYMBOL_VERSION)
    percent_quart = round(percent / 4)
    return f"{done_block * percent_quart}{empty_block * (25 - percent_quart)}"


def make_list(data: Dict = None, names: List[str] = None, texts: List[str] = None, percents: List[float] = None, top_num: int = 5, sort: bool = True) -> str:
    """
    Make List
    """
    if data is not None:
        names = [value for key, value in data if key == "name"] if names is None else names
        texts = [value for key, value in data if key == "text"] if texts is None else texts
        percents = [value for key, value in data if key == "percent"] if percents is None else percents

    data = list(zip(names, texts, percents))
    top_data = sorted(data[:top_num], key=lambda _, __, p: p) if sort else data[:top_num]
    data_list = [f"{n:25]}{' ' * (25 - len(n))}{t}{' ' * (20 - len(t))}{make_graph(p)}   {p:05.2f} % " for n, t, p in top_data]
    return '\n'.join(data_list)


async def make_commit_day_time_list(time_zone: str) -> str:
    stats = str()

    result = await DM.get_remote_graphql("repos_contributed_to", username=GHM.USER.login)
    repos = [d for d in result["data"]["user"]["repositoriesContributedTo"]["nodes"] if d["isFork"] is False]

    day_times = [0] * 4  # 0 - 6, 6 - 12, 12 - 18, 18 - 24
    week_days = [0] * 7  # Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

    for repository in repos:
        result = await DM.get_remote_graphql("repo_committed_dates", owner=repository["owner"]["login"], name=repository["name"], id=GHM.USER.node_id)
        committed_dates = result["data"]["repository"]["defaultBranchRef"]["target"]["history"]["edges"]

        for committedDate in committed_dates:
            local_date = datetime.strptime(committedDate["node"]["committedDate"], "%Y-%m-%dT%H:%M:%SZ")
            date = local_date.replace(tzinfo=utc).astimezone(timezone(time_zone))

            day_times[date.hour // 6] += 1
            week_days[date.isoweekday() - 1] += 1

    sum_day = sum(day_times)
    sum_week = sum(week_days)
    day_times = day_times[1:] + day_times[:1]

    day_time_names = [f"{DAY_TIME_EMOJI[i]} {LM.t(DAY_TIME_NAMES[i])}" for i in range(len(day_times))]
    day_time_texts = [f'{day_time} commits' for day_time in day_times]
    day_time_percents = [round((day_time / sum_day) * 100, 2) for day_time in day_times]
    title = LM.t("I am an Early") if sum(day_times[0:2]) >= sum(day_times[2:4]) else LM.t("I am a Night")
    stats += f"**{title}** \n\n```text\n{make_list(names=day_time_names, texts=day_time_texts, percents=day_time_percents, top_num=7)}\n\n```\n"

    if EM.SHOW_DAYS_OF_WEEK:
        week_day_names = [LM.t(week_day) for week_day in WEEK_DAY_NAMES]
        week_day_texts = [f'{week_day} commits' for week_day in week_days]
        week_day_percents = [round((week_day / sum_week) * 100, 2) for week_day in week_days]
        title = LM.t("I am Most Productive on") % week_day_names[week_day_percents.index(max(week_day_percents))]
        stats += f"📅 **{title}** \n\n```text\n{make_list(names=week_day_names, texts=week_day_texts, percents=week_day_percents, top_num=7)}\n\n```\n"

    return stats


def make_language_per_repo_list(result: Dict) -> str:
    language_count = dict()
    repos_with_language = [repo for repo in result["data"]["user"]["repositories"]["edges"] if repo["node"]["primaryLanguage"] is not None]
    for repo in repos_with_language:
        language = repo["node"]["primaryLanguage"]["name"]
        language_count[language] = language_count.get(language, {"count": 0})
        language_count[language]["count"] += 1

    names = list(language_count.keys())
    texts = [f"{language_count[lang]['count']} {'repo' if language_count[lang]['count'] == 1 else 'repos'}" for lang in names]
    percents = [round(language_count[lang]["count"] / len(repos_with_language) * 100, 2) for lang in names]

    top_language = max(list(language_count.keys()), key=lambda x: language_count[x]["count"])
    title = f"**{LM.t('I Mostly Code in') % top_language}** \n\n" if len(repos_with_language) > 0 else ""
    return f"{title}```text\n{make_list(names=names, texts=texts, percents=percents)}\n```\n\n"
