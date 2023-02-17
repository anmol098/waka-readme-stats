from typing import Dict
from datetime import datetime

from pytz import timezone, utc

from manager_download import DownloadManager as DM
from manager_environment import EnvironmentManager as EM
from manager_github import GitHubManager as GHM
from manager_localization import LocalizationManager as LM


def make_graph(percent: float):
    '''Make progress graph from API graph'''
    if EM.SYMBOL_VERSION == 1:  # version 1
        done_block = '█'
        empty_block = '░'
    elif EM.SYMBOL_VERSION == 2:  # version 2
        done_block = '⣿'
        empty_block = '⣀'
    elif EM.SYMBOL_VERSION == 3:  # version 3
        done_block = '⬛'
        empty_block = '⬜'
    else:
        done_block = '█'  # default is version 1
        empty_block = '░'

    pc_rnd = round(percent)
    return f"{done_block * int(pc_rnd / 4)}{empty_block * int(25 - int(pc_rnd / 4))}"


def make_list(data: list):  # TODO: add arg: sorted
    '''Make List'''
    data_list = []
    for l in data[:5]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        percent = "{:05.2f}".format(float(l['percent']))
        op = f"{l['name'][:25]}{' ' * (25 - ln)}{l['text']}{' ' * (20 - ln_text)}{make_graph(l['percent'])}   {percent} % "
        data_list.append(op)
    return '\n'.join(data_list)


def make_commit_list(data: list):
    '''Make List'''
    data_list = []
    for l in data[:7]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        percent = "{:05.2f}".format(float(l['percent']))
        op = f"{l['name']}{' ' * ((15 - ln) + (11 - ln_text))}{l['text']}{' ' * (7)}{make_graph(l['percent'])}   {percent} % "
        data_list.append(op)
    return '\n'.join(data_list)


async def generate_commit_list(time_zone: str) -> str:
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
    time_of_day_data = [
        {"name": f"🌞 {LM.t('Morning')}", "text": f"{day_times[0]} commits", "percent": round((day_times[0] / sum_day) * 100, 2)},
        {"name": f"🌆 {LM.t('Daytime')}", "text": f"{day_times[1]} commits", "percent": round((day_times[1] / sum_day) * 100, 2)},
        {"name": f"🌃 {LM.t('Evening')}", "text": f"{day_times[2]} commits", "percent": round((day_times[2] / sum_day) * 100, 2)},
        {"name": f"🌙 {LM.t('Night')}", "text": f"{day_times[3]} commits", "percent": round((day_times[3] / sum_day) * 100, 2)},
    ]
    day_of_week_data = [
        {"name": LM.t("Monday"), "text": f"{week_days[0]} commits", "percent": round((week_days[0] / sum_week) * 100, 2)},
        {"name": LM.t("Tuesday"), "text": f"{week_days[1]} commits", "percent": round((week_days[1] / sum_week) * 100, 2)},
        {"name": LM.t("Wednesday"), "text": f"{week_days[2]} commits", "percent": round((week_days[2] / sum_week) * 100, 2)},
        {"name": LM.t("Thursday"), "text": f"{week_days[3]} commits", "percent": round((week_days[3] / sum_week) * 100, 2)},
        {"name": LM.t("Friday"), "text": f"{week_days[4]} commits", "percent": round((week_days[4] / sum_week) * 100, 2)},
        {"name": LM.t("Saturday"), "text": f"{week_days[5]} commits", "percent": round((week_days[5] / sum_week) * 100, 2)},
        {"name": LM.t("Sunday"), "text": f"{week_days[6]} commits", "percent": round((week_days[6] / sum_week) * 100, 2)},
    ]

    title = LM.t("I am an Early") if sum(day_times[0:2]) >= sum(day_times[2:4]) else LM.t("I am a Night")
    stats += f"**{title}** \n\n```text\n{make_commit_list(time_of_day_data)}\n\n```\n"

    if EM.SHOW_DAYS_OF_WEEK:
        most_productive = max(day_of_week_data, key=lambda d: d["percent"])
        stats += f"📅 **{LM.t('I am Most Productive on') % most_productive['name']}** \n\n```text\n{make_commit_list(day_of_week_data)}\n\n```\n"

    return stats


def make_language_per_repo_list(result: Dict) -> str:
    language_count = dict()
    repos_with_language = [repo for repo in result["data"]["user"]["repositories"]["edges"] if repo["node"]["primaryLanguage"] is not None]
    for repo in repos_with_language:
        language = repo["node"]["primaryLanguage"]["name"]
        language_count[language] = language_count.get(language, {"count": 0})
        language_count[language]["count"] += 1

    data = list()
    for language in language_count.keys():
        data.append({
            "name": language,
            "text": f"{language_count[language]['count']} {'repo' if language_count[language]['count'] == 1 else 'repos'}",
            "percent": round(language_count[language]["count"] / len(repos_with_language) * 100, 2)
        })

    top_language = max(list(language_count.keys()), key=lambda x: language_count[x]["count"])
    title = f"**{LM.t('I Mostly Code in') % top_language}** \n\n" if len(repos_with_language) > 0 else ""
    return f"{title}```text\n{make_list(data)}\n```\n\n"
