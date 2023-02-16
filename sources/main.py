'''
Readme Development Metrics With waka time progress
'''
import re
import os
import base64
from asyncio import run
from typing import Dict

from pytz import timezone
import pytz
from github import Github, InputGitAuthor, AuthenticatedUser
import datetime

from download_manager import init_download_manager, DownloadManager
from loc import LinesOfCode
import humanize
from urllib.parse import quote
import json
import math

from dotenv import load_dotenv

load_dotenv()

START_COMMENT = f'<!--START_SECTION:{os.getenv("INPUT_SECTION_NAME")}-->'
END_COMMENT = f'<!--END_SECTION:{os.getenv("INPUT_SECTION_NAME")}-->'
listReg = f"{START_COMMENT}[\\s\\S]+{END_COMMENT}"

waka_key = os.getenv('INPUT_WAKATIME_API_KEY')
ghtoken = os.getenv('INPUT_GH_TOKEN')
branchName = os.getenv('INPUT_PUSH_BRANCH_NAME')
showTimeZone = os.getenv('INPUT_SHOW_TIMEZONE')
showProjects = os.getenv('INPUT_SHOW_PROJECTS')
showEditors = os.getenv('INPUT_SHOW_EDITORS')
showOs = os.getenv('INPUT_SHOW_OS')
showCommit = os.getenv('INPUT_SHOW_COMMIT')
showLanguage = os.getenv('INPUT_SHOW_LANGUAGE')
show_loc = os.getenv('INPUT_SHOW_LINES_OF_CODE')
show_days_of_week = os.getenv('INPUT_SHOW_DAYS_OF_WEEK')
showLanguagePerRepo = os.getenv('INPUT_SHOW_LANGUAGE_PER_REPO')
showLocChart = os.getenv('INPUT_SHOW_LOC_CHART')
show_profile_view = os.getenv('INPUT_SHOW_PROFILE_VIEWS')
show_short_info = os.getenv('INPUT_SHOW_SHORT_INFO')
locale = os.getenv('INPUT_LOCALE')
commit_by_me = os.getenv('INPUT_COMMIT_BY_ME')
ignored_repos_name = str(os.getenv('INPUT_IGNORED_REPOS') or '').replace(' ', '').split(',')
show_updated_date = os.getenv('INPUT_SHOW_UPDATED_DATE')
updated_date_format = os.getenv('INPUT_UPDATED_DATE_FORMAT')
commit_message = os.getenv('INPUT_COMMIT_MESSAGE')
commit_username = os.getenv('INPUT_COMMIT_USERNAME')
commit_email = os.getenv('INPUT_COMMIT_EMAIL')
show_total_code_time = os.getenv('INPUT_SHOW_TOTAL_CODE_TIME')
symbol_version = os.getenv('INPUT_SYMBOL_VERSION').strip()
show_waka_stats = 'y'

truthy = ['true', '1', 't', 'y', 'yes']

translate: Dict[str, str]
user: AuthenticatedUser


def millify(n):
    millnames = ['', ' Thousand', ' Million', ' Billion', ' Trillion']
    n = float(n)
    millidx = max(0, min(len(millnames) - 1,
                         int(math.floor(0
                                        if n == 0
                                        else math.log10(abs(n)) / 3))))

    return '{:.0f}{}'.format(n / 10 ** (3 * millidx), millnames[millidx])


def make_graph(percent: float):
    '''Make progress graph from API graph'''
    if (symbol_version == '1'):  # version 1
        done_block = '█'
        empty_block = '░'
    elif (symbol_version == '2'):  # version 2
        done_block = '⣿'
        empty_block = '⣀'
    elif (symbol_version == '3'):  # version 3
        done_block = '⬛'
        empty_block = '⬜'
    else:
        done_block = '█'  # default is version 1
        empty_block = '░'

    pc_rnd = round(percent)
    return f"{done_block * int(pc_rnd / 4)}{empty_block * int(25 - int(pc_rnd / 4))}"


def make_list(data: list):
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


async def generate_commit_list(tz):
    string = ''

    result = await DownloadManager.get_remote_graphql("repositories_contributed_to", username=user.login)
    nodes = result["data"]["user"]["repositoriesContributedTo"]["nodes"]
    repos = [d for d in nodes if d['isFork'] is False]

    morning = 0  # 6 - 12
    daytime = 0  # 12 - 18
    evening = 0  # 18 - 24
    night = 0  # 0 - 6

    Monday = 0
    Tuesday = 0
    Wednesday = 0
    Thursday = 0
    Friday = 0
    Saturday = 0
    Sunday = 0

    for repository in repos:
        result = await DownloadManager.get_remote_graphql("repository_committed_dates", owner=repository["owner"]["login"], name=repository["name"], id=user.node_id)
        committed_dates = result["data"]["repository"]["defaultBranchRef"]["target"]["history"]["edges"]
        for committedDate in committed_dates:
            date = datetime.datetime.strptime(committedDate["node"]["committedDate"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.utc).astimezone(timezone(tz))
            hour = date.hour
            weekday = date.strftime('%A')
            if 6 <= hour < 12:
                morning += 1
            if 12 <= hour < 18:
                daytime += 1
            if 18 <= hour < 24:
                evening += 1
            if 0 <= hour < 6:
                night += 1

            if weekday == "Monday":
                Monday += 1
            if weekday == "Tuesday":
                Tuesday += 1
            if weekday == "Wednesday":
                Wednesday += 1
            if weekday == "Thursday":
                Thursday += 1
            if weekday == "Friday":
                Friday += 1
            if weekday == "Saturday":
                Saturday += 1
            if weekday == "Sunday":
                Sunday += 1

    sumAll = morning + daytime + evening + night
    sum_week = Sunday + Monday + Tuesday + Friday + Saturday + Wednesday + Thursday
    title = translate['I am an Early'] if morning + daytime >= evening + night else translate['I am a Night']
    one_day = [
        {"name": "🌞 " + translate['Morning'], "text": str(morning) + " commits",
         "percent": round((morning / sumAll) * 100, 2)},
        {"name": "🌆 " + translate['Daytime'], "text": str(daytime) + " commits",
         "percent": round((daytime / sumAll) * 100, 2)},
        {"name": "🌃 " + translate['Evening'], "text": str(evening) + " commits",
         "percent": round((evening / sumAll) * 100, 2)},
        {"name": "🌙 " + translate['Night'], "text": str(night) + " commits",
         "percent": round((night / sumAll) * 100, 2)},
    ]
    dayOfWeek = [
        {"name": translate['Monday'], "text": str(Monday) + " commits", "percent": round((Monday / sum_week) * 100, 2)},
        {"name": translate['Tuesday'], "text": str(Tuesday) + " commits",
         "percent": round((Tuesday / sum_week) * 100, 2)},
        {"name": translate['Wednesday'], "text": str(Wednesday) + " commits",
         "percent": round((Wednesday / sum_week) * 100, 2)},
        {"name": translate['Thursday'], "text": str(Thursday) + " commits",
         "percent": round((Thursday / sum_week) * 100, 2)},
        {"name": translate['Friday'], "text": str(Friday) + " commits", "percent": round((Friday / sum_week) * 100, 2)},
        {"name": translate['Saturday'], "text": str(Saturday) + " commits",
         "percent": round((Saturday / sum_week) * 100, 2)},
        {"name": translate['Sunday'], "text": str(Sunday) + " commits", "percent": round((Sunday / sum_week) * 100, 2)},
    ]

    string = string + '**' + title + '** \n\n' + '```text\n' + make_commit_list(one_day) + '\n\n```\n'

    if show_days_of_week.lower() in truthy:
        max_element = {
            'percent': 0
        }

        for day in dayOfWeek:
            if day['percent'] > max_element['percent']:
                max_element = day
        days_title = translate['I am Most Productive on'] % max_element['name']
        string = string + '📅 **' + days_title + '** \n\n' + '```text\n' + make_commit_list(dayOfWeek) + '\n\n```\n'

    return string


async def get_waka_time_stats():
    stats = ''
    no_activity = translate["No Activity Tracked This Week"]

    data = await DownloadManager.get_remote_json("waka_latest")
    if showCommit.lower() in truthy:
        stats = stats + await generate_commit_list(data['data']['timezone']) + '\n\n'

    if showTimeZone.lower() in truthy or showLanguage.lower() in truthy or showEditors.lower() in truthy or showProjects.lower() in truthy or showOs.lower() in truthy:
        stats += '📊 **' + translate['This Week I Spend My Time On'] + '** \n\n'
        stats += '```text\n'

        if showTimeZone.lower() in truthy:
            tzone = data['data']['timezone']
            stats = stats + '⌚︎ ' + translate['Timezone'] + ': ' + tzone + '\n\n'

        if showLanguage.lower() in truthy:
            if len(data['data']['languages']) == 0:
                lang_list = no_activity
            else:
                lang_list = make_list(data['data']['languages'])
            stats = stats + '💬 ' + translate['Languages'] + ': \n' + lang_list + '\n\n'

        if showEditors.lower() in truthy:
            if len(data['data']['editors']) == 0:
                edit_list = no_activity
            else:
                edit_list = make_list(data['data']['editors'])
            stats = stats + '🔥 ' + translate['Editors'] + ': \n' + edit_list + '\n\n'

        if showProjects.lower() in truthy:
            if len(data['data']['projects']) == 0:
                project_list = no_activity
            else:
                # Re-order the project list by percentage
                data['data']['projects'] = sorted(data['data']['projects'], key=lambda x: x["percent"],
                                                      reverse=True)
                project_list = make_list(data['data']['projects'])
            stats = stats + '🐱‍💻 ' + translate['Projects'] + ': \n' + project_list + '\n\n'

        if showOs.lower() in truthy:
            if len(data['data']['operating_systems']) == 0:
                os_list = no_activity
            else:
                os_list = make_list(data['data']['operating_systems'])
            stats = stats + '💻 ' + translate['operating system'] + ': \n' + os_list + '\n\n'

        stats += '```\n\n'

    return stats


def generate_language_per_repo(result):
    language_count = {}
    total = 0
    for repo in result['data']['user']['repositories']['edges']:
        if repo['node']['primaryLanguage'] is None:
            continue
        language = repo['node']['primaryLanguage']['name']
        total += 1
        if language not in language_count.keys():
            language_count[language] = {}
            language_count[language]['count'] = 1
        else:
            language_count[language]['count'] = language_count[language]['count'] + 1
    data = []
    sorted_labels = list(language_count.keys())
    sorted_labels.sort(key=lambda x: language_count[x]['count'], reverse=True)
    for label in sorted_labels:
        percent = round(language_count[label]['count'] / total * 100, 2)
        extension = " repos"
        if language_count[label]['count'] == 1:
            extension = " repo"
        data.append({
            "name": label,
            "text": str(language_count[label]['count']) + extension,
            "percent": percent
        })

    title = '**' + translate['I Mostly Code in'] % sorted_labels[0] + '** \n\n' if len(sorted_labels) > 0 else ''
    return title + '```text\n' + make_list(data) + '\n\n```\n'


async def get_yearly_data():
    repository_list = await DownloadManager.get_remote_graphql("user_repository_list", username=user.login, id=user.node_id)
    loc = LinesOfCode(user, ghtoken, repository_list, ignored_repos_name)
    yearly_data = await loc.calculateLoc()
    if showLocChart.lower() in truthy:
        await loc.plotLoc(yearly_data)
    return yearly_data


async def get_line_of_code() -> str:
    repositoryList = await DownloadManager.get_remote_graphql("user_repository_list", username=user.login, id=user.node_id)
    loc = LinesOfCode(user, ghtoken, repositoryList, ignored_repos_name)
    yearly_data = await loc.calculateLoc()
    total_loc = sum(
        [yearly_data[year][quarter][lang] for year in yearly_data for quarter in yearly_data[year] for lang in
         yearly_data[year][quarter]])
    return millify(int(total_loc))


async def get_short_info():
    string = '**🐱 ' + translate['My GitHub Data'] + '** \n\n'
    if user.disk_usage is None:
        disk_usage = humanize.naturalsize(0)
        print("Please add new github personal access token with user permission")
    else:
        disk_usage = humanize.naturalsize(user.disk_usage)
    data = await DownloadManager.get_remote_json("github_stats")
    if len(data['years']) > 0:
        this_year_data = data['years'][0]
        total = this_year_data['total']
        year = this_year_data['year']
        string += '> 🏆 ' + translate['Contributions in the year'] % (humanize.intcomma(total), year) + '\n > \n'

    string += '> 📦 ' + translate["Used in GitHub's Storage"] % disk_usage + ' \n > \n'
    is_hireable = user.hireable
    public_repo = user.public_repos
    private_repo = user.owned_private_repos
    if private_repo is None:
        private_repo = 0
    if is_hireable:
        string += "> 💼 " + translate["Opted to Hire"] + "\n > \n"
    else:
        string += "> 🚫 " + translate["Not Opted to Hire"] + "\n > \n"

    string += '> 📜 '
    string += translate['public repositories'] % public_repo + " " + '\n > \n' if public_repo != 1 else translate[
                                                                                                            'public repository'] % public_repo + " " + '\n > \n'
    string += '> 🔑 '
    string += translate['private repositories'] % private_repo + " " + ' \n > \n' if private_repo != 1 else translate[
                                                                                                                'private repository'] % private_repo + " " + '\n > \n'

    return string


async def get_stats(github) -> str:
    '''Gets API data and returns markdown progress'''

    stats = ''
    repositoryList = await DownloadManager.get_remote_graphql("user_repository_list", username=user.login, id=user.node_id)

    if show_loc.lower() in truthy or showLocChart.lower() in truthy:
        # This condition is written to calculate the lines of code because it is heavy process soo needs to be calculate once this will reduce the execution time
        await get_yearly_data()

    if show_total_code_time.lower() in truthy:
        data = await DownloadManager.get_remote_json("waka_all")
        stats += '![Code Time](http://img.shields.io/badge/' + quote(
            str("Code Time")) + '-' + quote(str(
            data['data']['text'])) + '-blue)\n\n'

    if show_profile_view.lower() in truthy:
        data = github.get_repo(f"{user.login}/{user.login}").get_views_traffic(per="week")
        stats += '![Profile Views](http://img.shields.io/badge/' + quote(str(translate['Profile Views'])) + '-' + str(
            data['count']) + '-blue)\n\n'

    if show_loc.lower() in truthy:
        stats += '![Lines of code](https://img.shields.io/badge/' + quote(
            str(translate['From Hello World I have written'])) + '-' + quote(
            str(await get_line_of_code())) + '%20' + quote(str(translate['Lines of code'])) + '-blue)\n\n'

    if show_short_info.lower() in truthy:
        stats += await get_short_info()

    if show_waka_stats.lower() in truthy:
        stats += await get_waka_time_stats()

    if showLanguagePerRepo.lower() in truthy:
        stats = stats + generate_language_per_repo(repositoryList) + '\n\n'

    if showLocChart.lower() in truthy:
        stats += '**' + translate['Timeline'] + '**\n\n'
        branch_name = github.get_repo(f'{user.login}/{user.login}').default_branch
        stats = stats + '![Chart not found](https://raw.githubusercontent.com/' + user.login + '/' + user.login + '/' + branch_name + '/' + LinesOfCode.GRAPH_PATH + ') \n\n'

    if show_updated_date.lower() in truthy:
        now = datetime.datetime.utcnow()
        d1 = now.strftime(updated_date_format)
        stats = stats + "\n Last Updated on " + d1 + " UTC"

    return stats


def decode_readme(data: str):
    '''Decode the contents of old readme'''
    decoded_bytes = base64.b64decode(data)
    return str(decoded_bytes, 'utf-8')


def generate_new_readme(stats: str, readme: str):
    '''Generate a new Readme.md'''
    stats_in_readme = f"{START_COMMENT}\n{stats}\n{END_COMMENT}"
    return re.sub(listReg, stats_in_readme, readme)


async def main():
    global translate, user

    if ghtoken is None:
        raise Exception('Token not available')
    user = Github(ghtoken).get_user()
    print(f"Current user: {user.login}")
    await init_download_manager(waka_key, ghtoken, user)

    try:
        with open(os.path.join(os.path.dirname(__file__), 'translation.json'), encoding='utf-8') as config_file:
            data = json.load(config_file)
        translate = data[locale]
    except Exception as e:
        print("Cannot find the Locale choosing default to english")
        translate = data['en']

    g = Github(ghtoken)
    waka_stats = await get_stats(g)

    repo = g.get_repo(f"{user.login}/{user.login}")
    contents = repo.get_readme()
    rdmd = decode_readme(contents.content)
    new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)

    if commit_by_me.lower() in truthy:
        committer = InputGitAuthor(user.login or commit_username, user.email or commit_email)
    else:
        committer = InputGitAuthor(
            commit_username or 'readme-bot',
            commit_email or '41898282+github-actions[bot]@users.noreply.github.com'
        )
    if new_readme != rdmd:
        try:
            repo.update_file(path=contents.path, message=commit_message,
                             content=new_readme, sha=contents.sha, branch=branchName,
                             committer=committer)
        except:
            repo.update_file(path=contents.path, message=commit_message,
                             content=new_readme, sha=contents.sha, branch='main',
                             committer=committer)
        print("Readme updated")


if __name__ == '__main__':
    start_time = datetime.datetime.now().timestamp() * 1000
    run(main())
    end_time = datetime.datetime.now().timestamp() * 1000
    print(f"Program processed in {round(end_time - start_time, 0)} miliseconds.")
