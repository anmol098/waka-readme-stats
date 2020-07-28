'''
Readme Development Metrics With waka time progress
'''

import re
import os
import base64
import sys
from pytz import timezone
import pytz
import locale
import requests
from github import Github
import datetime
from string import Template

START_COMMENT = '<!--START_SECTION:waka-->'
END_COMMENT = '<!--END_SECTION:waka-->'
listReg = f"{START_COMMENT}[\\s\\S]+{END_COMMENT}"

user = os.getenv('INPUT_USERNAME')
waka_key = os.getenv('INPUT_WAKATIME_API_KEY')
ghtoken = os.getenv('INPUT_GH_TOKEN')
showTimeZone = os.getenv('INPUT_SHOW_TIMEZONE')
showProjects = os.getenv('INPUT_SHOW_PROJECTS')
showEditors = os.getenv('INPUT_SHOW_EDITORS')
showOs = os.getenv('INPUT_SHOW_OS')
showCommit = os.getenv('INPUT_SHOW_COMMIT')
showLanguage = os.getenv('INPUT_SHOW_LANGUAGE')
isMorningPerson = os.getenv('INPUT_MORNING_PERSON')
show_loc = os.getenv('INPUT_SHOW_LINES_OF_CODE')

# The GraphQL query to get commit data.
userInfoQuery = """
{
    viewer {
      login
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
      ref(qualifiedName: "master") {
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

get_loc_url = Template("""/repos/$owner/$repo/stats/code_frequency""")


def run_v3_api(query):
    request = requests.get('https://api.github.com' + query, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception(
            "Query failed to run by returning code of {}. {},... {}".format(request.status_code, query, request.json()))


def run_query(query):
    request = requests.post('https://api.github.com/graphql', json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))


def make_graph(percent: float):
    '''Make progress graph from API graph'''
    done_block = '█'
    empty_block = '░'
    pc_rnd = round(percent)
    return f"{done_block * int(pc_rnd / 4)}{empty_block * int(25 - int(pc_rnd / 4))}"


def make_list(data: list):
    '''Make List'''
    data_list = []
    for l in data[:5]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        op = f"{l['name'][:25]}{' ' * (25 - ln)}{l['text']}{' ' * (20 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        data_list.append(op)
    return ' \n'.join(data_list)


def make_commit_list(data: list):
    '''Make List'''
    data_list = []
    for l in data[:7]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        op = f"{l['emoji']}{' ' * 2}{l['name']}{' ' * (13 - ln)}{l['text']}{' ' * (15 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        data_list.append(op)
    return ' \n'.join(data_list)


def generate_commit_list(tz):
    string = ''
    result = run_query(userInfoQuery)  # Execute the query
    username = result["data"]["viewer"]["login"]
    id = result["data"]["viewer"]["id"]
    print("user {}".format(username))

    result = run_query(createContributedRepoQuery.substitute(username=username))
    nodes = result["data"]["user"]["repositoriesContributedTo"]["nodes"]
    repos = [d for d in nodes if d['isFork'] is False]

    morning = 0  # 0 - 6
    daytime = 0  # 6 - 12
    evening = 0  # 12 - 18
    night = 0  # 18 - 24

    Monday = 0
    Tuesday = 0
    Wednesday = 0
    Thursday = 0
    Friday = 0
    Saturday = 0
    Sunday = 0

    total_loc = 0

    for repository in repos:
        if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
            try:
                datas = run_v3_api(get_loc_url.substitute(owner=repository["owner"]["login"], repo=repository["name"]))
                for data in datas:
                    total_loc = total_loc + data[1] - data[2]
            except Exception as e:
                print(e)

        result = run_query(
            createCommittedDateQuery.substitute(owner=repository["owner"]["login"], name=repository["name"], id=id))
        try:
            committed_dates = result["data"]["repository"]["ref"]["target"]["history"]["edges"]
            for committedDate in committed_dates:
                date = datetime.datetime.strptime(committedDate["node"]["committedDate"],
                                                  "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.utc).astimezone(
                    timezone(tz))
                hour = date.hour
                if isMorningPerson:
                    if 6 <= hour < 12:
                        daytime += 1
                    if 12 <= hour < 18:
                        evening += 1
                    if 18 <= hour < 24:
                        night += 1
                    if 0 <= hour < 6:
                        morning += 1
                else:
                    if 6 <= hour < 12:
                        morning += 1
                    if 12 <= hour < 18:
                        daytime += 1
                    if 18 <= hour < 24:
                        evening += 1
                    if 0 <= hour < 6:
                        night += 1
                weekday = date.strftime('%A')
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
            print("Please Ignore this exception " + str(ex))

    sumAll = morning + daytime + evening + night
    sum_week = Sunday + Monday + Tuesday + Friday + Saturday + Wednesday + Thursday
    if morning + daytime >= evening + night:
        title = "I'm an early 🕊"
    else:
        title = "I'm a night 🦉"


    one_day = [
        {"emoji": "🌔", "name": "Dawn", "text": str(morning) + " commits", "percent": round((morning / sumAll) * 100, 2)},
        {"emoji": "🌥️", "name": "Morning", "text": str(daytime) + " commits", "percent": round((daytime / sumAll) * 100, 2)},
        {"emoji": "🌤", "name": "Evening", "text": str(evening) + " commits", "percent": round((evening / sumAll) * 100, 2)},
        {"emoji": "🌒", "name": "Night", "text": str(night) + " commits", "percent": round((night / sumAll) * 100, 2)},
    ]
    dayOfWeek = [
        {"name": "Monday", "text": str(Monday) + " commits", "percent": round((Monday / sum_week) * 100, 2)},
        {"name": "Tuesday", "text": str(Tuesday) + " commits", "percent": round((Tuesday / sum_week) * 100, 2)},
        {"name": "Wednesday", "text": str(Wednesday) + " commits", "percent": round((Wednesday / sum_week) * 100, 2)},
        {"name": "Thursday", "text": str(Thursday) + " commits", "percent": round((Thursday / sum_week) * 100, 2)},
        {"name": "Friday", "text": str(Friday) + " commits", "percent": round((Friday / sum_week) * 100, 2)},
        {"name": "Saturday", "text": str(Saturday) + " commits", "percent": round((Saturday / sum_week) * 100, 2)},
        {"name": "Sunday", "text": str(Sunday) + " commits", "percent": round((Sunday / sum_week) * 100, 2)},
    ]

    max_element = {
        'percent': 0
    }

    for day in dayOfWeek:
        if day['percent'] > max_element['percent']:
            max_element = day
    days_title = 'I\'m Most Productive on ' + max_element['name'] + 's'
    if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
        string = string + '![Lines of code](https://img.shields.io/badge/From%20Hello%20World%20I\'ve%20written-' + locale.format_string(
            "%d", total_loc,
            grouping=True) + '%20Lines%20of%20code-blue)\n\n'
    string = string + '**' + title + '** \n\n' + '```text\n' + make_commit_list(one_day) + '\n\n```\n'
    string = string + '📅 **' + days_title + '** \n\n' + '```text\n' + make_commit_list(dayOfWeek) + '\n\n```\n'

    return string


def get_stats():
    '''Gets API data and returns markdown progress'''
    stats = ''

    request = requests.get(f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={waka_key}")

    if request.status_code != 401:
        data = request.json()
        if showCommit.lower() in ['true', '1', 't', 'y', 'yes']:
            stats = stats + generate_commit_list(tz=data['data']['timezone']) + '\n\n'
        stats = stats + '📊 **This week I spent my time on** \n\n'
        stats = stats + '```text\n'
        if showTimeZone.lower() in ['true', '1', 't', 'y', 'yes']:
            timezone = data['data']['timezone']
            stats = stats + '⏱ Timezone: ' + timezone + '\n\n'
        if showLanguage.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['languages']) != 0:
                lang_list = make_list(data['data']['languages'])
            else:
                lang_list = "No Activity tracked this Week"
            stats = stats + '💬 Languages: \n' + lang_list + '\n\n'

        if showEditors.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['editors']) != 0:
                edit_list = make_list(data['data']['editors'])
            else:
                edit_list = "No Activity tracked this Week"
            stats = stats + '🔥 Editors: \n' + edit_list + '\n\n'

        if showProjects.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['projects']) != 0:
                project_list = make_list(data['data']['projects'])
            else:
                project_list = "No Activity tracked this Week"
            stats = stats + '🐱‍💻 Projects: \n' + project_list + '\n\n'

        if showOs.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['operating_systems']) != 0:
                os_list = make_list(data['data']['operating_systems'])
            else:
                os_list = "No Activity tracked this Week"
            stats = stats + '🖥 Operating Systems: \n' + os_list + '\n\n'
        stats = stats + '```\n\n'
    else:
        print("Error With WAKA time API returned " + str(request.status_code) + " Response " + str(request.json()))

    return stats


def decode_readme(data: str):
    '''Decode the contets of old readme'''
    decoded_bytes = base64.b64decode(data)
    return str(decoded_bytes, 'utf-8')


def generate_new_readme(stats: str, readme: str):
    '''Generate a new Readme.md'''
    stats_in_readme = f"{START_COMMENT}\n{stats}\n{END_COMMENT}"
    return re.sub(listReg, stats_in_readme, readme)


if __name__ == '__main__':
    g = Github(ghtoken)
    try:
        repo = g.get_repo(f"{user}/{user}")
    except GithubException:
        print("Authentication Error. Try saving a GitHub Personal Access Token in your Repo Secrets")
        sys.exit(1)
    contents = repo.get_readme()
    headers = {"Authorization": "Bearer " + ghtoken}
    waka_stats = get_stats()
    rdmd = decode_readme(contents.content)
    new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
    if new_readme != rdmd:
        repo.update_file(path=contents.path, message='Updated with Dev Metrics',
                         content=new_readme, sha=contents.sha, branch='master')
