'''
Readme Development Metrics With waka time progress
'''
import re
import os
import base64
from pytz import timezone
import pytz
import requests
from github import Github, GithubException, InputGitAuthor
import datetime
from string import Template
from loc import LinesOfCode
import time
import traceback
import humanize
from urllib.parse import quote
import json
import sys
from datetime import date
import math

from dotenv import load_dotenv

load_dotenv()

START_COMMENT = '<!--START_SECTION:waka-->'
END_COMMENT = '<!--END_SECTION:waka-->'
listReg = f"{START_COMMENT}[\\s\\S]+{END_COMMENT}"

waka_key = os.getenv('INPUT_WAKATIME_API_KEY')
ghtoken = os.getenv('INPUT_GH_TOKEN')
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
show_total_code_time = os.getenv('INPUT_SHOW_TOTAL_CODE_TIME')
symbol_version = os.getenv('INPUT_SYMBOL_VERSION').strip()

# The GraphQL query to get commit data.
userInfoQuery = """
{
    viewer {
      login
      email
      id
    }
  }
"""
createContributedRepoQuery = Template("""query {
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
  }
""")
createCommittedDateQuery = Template("""
query {
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
  }
""")
repositoryListQuery = Template("""
{
  user(login: "$username") {
    repositories(orderBy: {field: CREATED_AT, direction: ASC}, last: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], isFork: false) {
      totalCount
      edges {
        node {
          object(expression:"master") {
                ... on Commit {
                history (author: { id: "$id" }){
                totalCount
                    }
                }
                }
          primaryLanguage {
            color
            name
            id
          }
          stargazers {
            totalCount
          }
          collaborators {
            totalCount
          }
          createdAt
          name
          owner {
            id
            login
          }
          nameWithOwner
        }
      }
    }
    location
    createdAt
    name
  }
}
""")

get_loc_url = Template("""/repos/$owner/$repo/stats/code_frequency""")
get_profile_view_url = Template("""/repos/$owner/$repo/traffic/views?per=week""")
get_profile_traffic = Template("""/repos/$owner/$repo/traffic/popular/referrers""")
truthy = ['true', '1', 't', 'y', 'yes']


#######################################
#     METHODS
#######################################

def run_query(query):
    request = requests.post('https://api.github.com/graphql', json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))


def run_v3_api(query):
    request = requests.get('https://api.github.com' + query, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception(
            "Query failed to run by returning code of {}. {},... {}".format(
                request.status_code,
                query,
                str(request.json())
            )
        )


def millify(n):
    millnames = ['', ' Thousand', ' Million', ' Billion', ' Trillion']
    n = float(n)
    millidx = max(0, min(len(millnames) - 1,
                         int(math.floor(0
                                        if n == 0
                                        else math.log10(abs(n)) / 3))))

    return '{:.0f}{}'.format(n / 10 ** (3 * millidx), millnames[millidx])


def get_stats(github):
    # variable used to concat every part of readme
    readme_string = ''

    waka_request = requests.get(f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={waka_key}")
    if waka_request.status_code == 401:
        print("Error With WAKA time API returned " + str(waka_request.status_code) + " Response " + str(
            waka_request.json()))
    else:
        waka_request = waka_request.json()

        if show_loc.lower() in truthy or showLocChart.lower() in truthy:
            # This condition is written to calculate the lines of code because it is heavy process soo needs to be
            # calculated once this will reduce the execution time
            yearly_data = get_yearly_data()

        if show_total_code_time.lower() in truthy:
            readme_string += get_total_line_of_code()

        if show_profile_view.lower() in truthy:
            readme_string += get_profile_view()

        if show_loc.lower() in truthy:
            readme_string += get_line_of_code()

        if show_short_info.lower() in truthy:
            readme_string += get_short_info()

        if showCommit.lower() in truthy:
            readme_string += get_commit_list(waka_request)

        if showTimeZone.lower() in truthy:
            readme_string += get_time_zone(waka_request)

        if showLanguage.lower() in truthy:
            readme_string += get_language(waka_request)

        if showEditors.lower() in truthy:
            readme_string += get_editor(waka_request)

        if showProjects.lower() in truthy:
            readme_string += get_projects(waka_request)

        if showOs.lower() in truthy:
            readme_string += get_os(waka_request)

        if showLanguagePerRepo.lower() in truthy:
            readme_string += get_language_per_repo()

        if showLocChart.lower() in truthy:
            readme_string += get_chart()

        if show_updated_date.lower() in truthy:
            readme_string += get_last_update()

        return readme_string


#######################################
#     GET METHOD
#######################################

def get_yearly_data():
    repository_list = run_query(repositoryListQuery.substitute(username=username, id=id))
    loc = LinesOfCode(id, username, ghtoken, repository_list, ignored_repos_name)
    yearly_data = loc.calculateLoc()
    if showLocChart.lower() in truthy:
        loc.plotLoc(yearly_data)
    return yearly_data


def get_total_line_of_code():
    request = requests.get(f"https://wakatime.com/api/v1/users/current/all_time_since_today?api_key={waka_key}")
    if request.status_code == 401:
        print("Error With WAKA time API returned " + str(request.status_code) + " Response " + str(request.json()))
    elif "text" not in request.json()["data"]:
        print("User stats are calculating. Try again later.")
    else:
        return '![Code Time](https://img.shields.io/badge/' + quote(str("Code Time")) + '-' + quote(
            str(request.json()['data']['text'])) + '-blue)\n\n'


def get_profile_view():
    profile_view_data = run_v3_api(get_profile_view_url.substitute(owner=username, repo=username))
    return '![Profile Views](https://img.shields.io/badge/' + quote(str(translate['Profile Views'])) + '-' + str(
        profile_view_data['count']) + '-blue)\n\n'


def get_line_of_code():
    loc = LinesOfCode(id, username, ghtoken, run_query(repositoryListQuery.substitute(username=username, id=id)),
                      ignored_repos_name)
    yearly_data = loc.calculateLoc()
    total_loc = sum(
        [yearly_data[year][quarter][lang] for year in yearly_data for quarter in yearly_data[year] for lang in
         yearly_data[year][quarter]])

    return '![Lines of code](https://img.shields.io/badge/' + quote(
        str(translate['From Hello World I have written'])) + '-' + quote(str(millify(int(total_loc)))) + '%20' + quote(
        str(translate['Lines of code'])) + '-blue)\n\n'


def get_short_info():
    github_profile = Github(ghtoken)
    string = '**🐱 ' + translate['My GitHub Data'] + '** \n\n'
    user_info = github_profile.get_user()

    if user_info.disk_usage is None:
        disk_usage = humanize.naturalsize(0)
        print("Please add new github personal access token with user permission")
    else:
        disk_usage = humanize.naturalsize(user_info.disk_usage)
    request = requests.get('https://github-contributions.now.sh/api/v1/' + user_info.login)
    if request.status_code == 200:
        git_contrib_data = request.json()
        total = git_contrib_data['years'][0]['total']
        year = git_contrib_data['years'][0]['year']
        string += '> 🏆 ' + translate['Contributions in the year'] % (humanize.intcomma(total), year) + '\n > \n'

    string += '> 📦 ' + translate["Used in GitHub's Storage"] % disk_usage + ' \n > \n'
    is_hireable = user_info.hireable
    public_repo = user_info.public_repos
    private_repo = user_info.owned_private_repos
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


def get_commit_list(waka_request):
    string = ''
    result = run_query(userInfoQuery)  # Execute the query
    username = result["data"]["viewer"]["login"]
    id = result["data"]["viewer"]["id"]

    nodes = run_query(createContributedRepoQuery.substitute(username=username))["data"]["user"]["repositoriesContributedTo"]["nodes"]
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
        result = run_query(createCommittedDateQuery.substitute(owner=repository["owner"]["login"], name=repository["name"], id=id))
        try:
            committed_dates = result["data"]["repository"]["defaultBranchRef"]["target"]["history"]["edges"]
            for committedDate in committed_dates:
                commit_date = datetime.datetime.strptime(committedDate["node"]["committedDate"],
                                                         "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.utc).astimezone(
                    timezone(waka_request['data']['timezone']))
                hour = commit_date.hour
                weekday = commit_date.strftime('%A')
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
        except Exception as ex:
            if str(ex) != "'NoneType' object is not subscript":
                print("Exception occurred " + str(ex))

    sum_all_time = morning + daytime + evening + night
    sum_week = Sunday + Monday + Tuesday + Friday + Saturday + Wednesday + Thursday
    title = translate['I am an Early'] if morning + daytime >= evening + night else translate['I am a Night']
    one_day = [
        {"name": "🌞 " + translate['Morning'], "text": str(morning) + " commits",
         "percent": round((morning / sum_all_time) * 100, 2)},
        {"name": "🌆 " + translate['Daytime'], "text": str(daytime) + " commits",
         "percent": round((daytime / sum_all_time) * 100, 2)},
        {"name": "🌃 " + translate['Evening'], "text": str(evening) + " commits",
         "percent": round((evening / sum_all_time) * 100, 2)},
        {"name": "🌙 " + translate['Night'], "text": str(night) + " commits",
         "percent": round((night / sum_all_time) * 100, 2)},
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

    string = '**' + title + '** \n\n' + '```text\n' + make_commit_list(one_day) + '\n\n```\n'

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


def get_time_zone(waka_request):
    return '⌚︎ ' + translate['Timezone'] + ': ' + waka_request['data']['timezone'] + '\n\n'


def get_language(wake_request):
    lang = wake_request['data']['languages']
    if len(lang) == 0:
        text = translate["No Activity Tracked This Week"]
    else:
        text = make_list(lang)

    return '💬 ' + translate['Languages'] + ': \n' + text + '\n\n'


def get_editor(waka_request):
    editor = waka_request['data']['editors']
    if len(editor) == 0:
        text = translate["No Activity Tracked This Week"]
    else:
        text = make_list(editor)

    return '🔥 ' + translate['Editors'] + ': \n' + text + '\n\n'


def get_projects(waka_request):
    project = waka_request['data']['projects']
    if len(project) == 0:
        text = translate["No Activity Tracked This Week"]
    else:
        text = make_list(sorted(project, key=lambda x: x["percent"], reverse=True))

    return '🐱‍💻 ' + translate['Projects'] + ': \n' + text + '\n\n'


def get_os(waka_request):
    os_used = waka_request['data']['operating_systems']
    if len(os_used) == 0:
        text = translate["No Activity Tracked This Week"]
    else:
        text = make_list(os_used)

    return '💻 ' + translate['operating system'] + ': \n' + text  + '\n\n'


def get_language_per_repo():
    language_count = {}
    total = 0
    for repo in run_query(repositoryListQuery.substitute(username=username, id=id))['data']['user']['repositories'][
        'edges']:
        if repo['node']['primaryLanguage'] is None:
            continue
        language = repo['node']['primaryLanguage']['name']
        color_code = repo['node']['primaryLanguage']['color']
        total += 1
        if language not in language_count.keys():
            language_count[language] = {}
            language_count[language]['count'] = 1
        else:
            language_count[language]['count'] = language_count[language]['count'] + 1
        language_count[language]['color'] = color_code
    data_array = []
    sorted_labels = list(language_count.keys())
    sorted_labels.sort(key=lambda x: language_count[x]['count'], reverse=True)
    most_language_repo = sorted_labels[0]
    for label in sorted_labels:
        percent = round(language_count[label]['count'] / total * 100, 2)
        extension = " repos"
        if language_count[label]['count'] == 1:
            extension = " repo"
        data_array.append({
            "name": label,
            "text": str(language_count[label]['count']) + extension,
            "percent": percent
        })

    title = translate['I Mostly Code in'] % most_language_repo
    return '**' + title + '** \n\n' + '```text\n' + make_list(data_array) + '\n\n```\n'


def get_chart():
    string = '**' + translate['Timeline'] + '**\n\n'
    return '![Chart not found](https://raw.githubusercontent.com/' + username + '/' + username + '/' + Github(
        ghtoken).get_repo(f'{username}/{username}').default_branch + '/charts/bar_graph.png) \n\n'

def get_last_update():
    return "\n Last Updated on " + datetime.datetime.utcnow().strftime(updated_date_format) + " UTC"


#######################################
#     UTILS METHOD
#######################################

def make_commit_list(commit_list: list):
    list = []
    for l in commit_list[:7]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        op = f"{l['name']}{' ' * (13 - ln)}{l['text']}{' ' * (15 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        list.append(op)
    return ' \n'.join(list)


def make_graph(percent: float):
    if symbol_version == '1':  # version 1
        done_block = '█'
        empty_block = '░'
    elif symbol_version == '2':  # version 2
        done_block = '⣿'
        empty_block = '⣀'
    elif symbol_version == '3':  # version 3
        done_block = '⬛'
        empty_block = '⬜'
    else:
        done_block = '█'  # default is version 1
        empty_block = '░'

    pc_rnd = round(percent)
    return f"{done_block * int(pc_rnd / 4)}{empty_block * int(25 - int(pc_rnd / 4))}"


def make_list(data_list: list):
    list = []
    for l in data_list[:5]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        op = f"{l['name'][:25]}{' ' * (25 - ln)}{l['text']}{' ' * (20 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        list.append(op)
    return ' \n'.join(list)

def decode_readme(data: str):
    decoded_bytes = base64.b64decode(data)
    return str(decoded_bytes, 'utf-8')


def generate_new_readme(stats: str, readme: str):
    stats_in_readme = f"{START_COMMENT}\n{stats}\n{END_COMMENT}"
    return re.sub(listReg, stats_in_readme, readme)


if __name__ == '__main__':
    try:
        start_time = datetime.datetime.now().timestamp() * 1000
        if ghtoken is None:
            raise Exception('Token not available')
        g = Github(ghtoken)
        headers = {"Authorization": "Bearer " + ghtoken}
        user_data = run_query(userInfoQuery)  # Execute the query
        username = user_data["data"]["viewer"]["login"]
        id = user_data["data"]["viewer"]["id"]
        emails_user = run_v3_api("/user/emails")  # Execute the api
        email = emails_user[0]['email']
        print("Username " + username)
        repo = g.get_repo(f"{username}/{username}")
        contents = repo.get_readme()
        try:
            with open(os.path.join(os.path.dirname(__file__), 'translation.json'), encoding='utf-8') as config_file:
                data = json.load(config_file)
            translate = data[locale]
        except Exception as e:
            print("Cannot find the Locale choosing default to english")
            translate = data['en']
        waka_stats = get_stats(g)
        # star_me()
        rdmd = decode_readme(contents.content)
        new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
        if commit_by_me.lower() in truthy:
            committer = InputGitAuthor(username, email)
        else:
            committer = InputGitAuthor('readme-bot', '41898282+github-actions[bot]@users.noreply.github.com')
        if new_readme != rdmd:
            try:
                repo.update_file(path=contents.path, message=commit_message,
                                 content=new_readme, sha=contents.sha, branch='master',
                                 committer=committer)
            except:
                repo.update_file(path=contents.path, message=commit_message,
                                 content=new_readme, sha=contents.sha, branch='main',
                                 committer=committer)
            print("Readme updated")
        end_time = datetime.datetime.now().timestamp() * 1000
        print("Program processed in {} miliseconds.".format(round(end_time - start_time, 0)))
    except Exception as e:
        traceback.print_exc()
        print("Exception Occurred " + str(e))
