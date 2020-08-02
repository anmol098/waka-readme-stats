'''
Readme Development Metrics With waka time progress
'''
import re
import os
import base64
from pytz import timezone
import pytz
import requests
from github import Github, GithubException
import datetime
from string import Template
from loc import LinesOfCode
import time

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
show_waka_stats = 'y'
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


def human_format(num):
    magnitude = 0
    while abs(num) >= 1000:
        magnitude += 1
        num /= 1000.0
    # add more suffixes if you need them
    return '%.2f%s' % (num, ['', 'K', 'M', 'G', 'T', 'P'][magnitude])


def run_v3_api(query):
    request = requests.get('https://api.github.com' + query, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception(
            "Query failed to run by returning code of {}. {},... {}".format(request.status_code, query,
                                                                            str(request.json())))


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
        op = f"{l['name']}{' ' * (13 - ln)}{l['text']}{' ' * (15 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        data_list.append(op)
    return ' \n'.join(data_list)


def generate_commit_list(tz):
    string = ''
    result = run_query(userInfoQuery)  # Execute the query
    username = result["data"]["viewer"]["login"]
    id = result["data"]["viewer"]["id"]
    # print("user {}".format(username))

    result = run_query(createContributedRepoQuery.substitute(username=username))
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

    total_loc = 0

    for repository in repos:
        if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
            try:
                time.sleep(0.7)
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
        except Exception as ex:
            print("Please Ignore this exception " + str(ex))

    sumAll = morning + daytime + evening + night
    sum_week = Sunday + Monday + Tuesday + Friday + Saturday + Wednesday + Thursday
    if morning + daytime >= evening + night:
        title = "I'm an early 🐤"
    else:
        title = "I'm a night 🦉"
    one_day = [
        {"name": "🌞 Morning", "text": str(morning) + " commits", "percent": round((morning / sumAll) * 100, 2)},
        {"name": "🌆 Daytime", "text": str(daytime) + " commits", "percent": round((daytime / sumAll) * 100, 2)},
        {"name": "🌃 Evening", "text": str(evening) + " commits", "percent": round((evening / sumAll) * 100, 2)},
        {"name": "🌙 Night", "text": str(night) + " commits", "percent": round((night / sumAll) * 100, 2)},
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

    if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
        string = string + '![Lines of code](https://img.shields.io/badge/From%20Hello%20World%20I\'ve%20written-' + human_format(
            int(total_loc)) + '%20Lines%20of%20code-blue)\n\n'
    string = string + '**' + title + '** \n\n' + '```text\n' + make_commit_list(one_day) + '\n\n```\n'

    if show_days_of_week.lower() in ['true', '1', 't', 'y', 'yes']:
        max_element = {
            'percent': 0
        }

        for day in dayOfWeek:
            if day['percent'] > max_element['percent']:
                max_element = day
        days_title = 'I\'m Most Productive on ' + max_element['name'] + 's'
        string = string + '📅 **' + days_title + '** \n\n' + '```text\n' + make_commit_list(dayOfWeek) + '\n\n```\n'

    return string


def get_waka_time_stats():
    stats = ''
    request = requests.get(
        f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={waka_key}")

    if request.status_code == 401:
        print("Error With WAKA time API returned " + str(request.status_code) + " Response " + str(request.json()))

    else:
        data = request.json()
        if showCommit.lower() in ['true', '1', 't', 'y', 'yes']:
            stats = stats + generate_commit_list(tz=data['data']['timezone']) + '\n\n'
        stats += '📊 **This week I spent my time on** \n\n'
        stats += '```text\n'
        if showTimeZone.lower() in ['true', '1', 't', 'y', 'yes']:
            tzone = data['data']['timezone']
            stats = stats + '⌚︎ Timezone: ' + tzone + '\n\n'

        if showLanguage.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['languages']) == 0:
                lang_list = "No Activity tracked this Week"
            else:
                lang_list = make_list(data['data']['languages'])
            stats = stats + '💬 Languages: \n' + lang_list + '\n\n'

        if showEditors.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['editors']) == 0:
                edit_list = "No Activity tracked this Week"
            else:
                edit_list = make_list(data['data']['editors'])
            stats = stats + '🔥 Editors: \n' + edit_list + '\n\n'

        if showProjects.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['projects']) == 0:
                project_list = "No Activity tracked this Week"
            else:
                project_list = make_list(data['data']['projects'])
            stats = stats + '🐱‍💻 Projects: \n' + project_list + '\n\n'

        if showOs.lower() in ['true', '1', 't', 'y', 'yes']:
            if len(data['data']['operating_systems']) == 0:
                os_list = "No Activity tracked this Week"
            else:
                os_list = make_list(data['data']['operating_systems'])
            stats = stats + '💻 Operating Systems: \n' + os_list + '\n\n'

        stats += '```\n\n'
    return stats


def generate_language_per_repo(result):
    language_count = {}
    total = 0
    for repo in result['data']['user']['repositories']['edges']:
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
    data = []
    sorted_labels = list(language_count.keys())
    sorted_labels.sort(key=lambda x: language_count[x]['count'], reverse=True)
    most_language_repo = sorted_labels[0]
    for label in sorted_labels:
        percent = round(language_count[label]['count'] / total * 100, 2)
        data.append({
            "name": label,
            "text": str(language_count[label]['count']) + " repos",
            "percent": percent
        })

    title = 'I mostly code in ' + most_language_repo
    return '**' + title + '** \n\n' + '```text\n' + make_commit_list(data) + '\n\n```\n'


def get_stats():
    '''Gets API data and returns markdown progress'''

    stats = ''
    repositoryList = run_query(repositoryListQuery.substitute(username=username, id=id))

    if show_waka_stats.lower() in ['true', '1', 't', 'y', 'yes']:
        stats += get_waka_time_stats()

    if showLanguagePerRepo.lower() in ['true', '1', 't', 'y', 'yes']:
        stats = stats + generate_language_per_repo(repositoryList) + '\n\n'

    if showLocChart.lower() in ['true', '1', 't', 'y', 'yes']:
        loc = LinesOfCode(id, username, ghtoken, repositoryList)
        loc.calculateLoc()
        stats += '**Timeline**\n\n'
        stats = stats + '![Chart not found](https://github.com/' + username + '/' + username + '/blob/master/charts/bar_graph.png) \n\n'

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
    try:
        if ghtoken is None:
            raise Exception('Token not available')
        g = Github(ghtoken)
        headers = {"Authorization": "Bearer " + ghtoken}
        user_data = run_query(userInfoQuery)  # Execute the query
        username = user_data["data"]["viewer"]["login"]
        id = user_data["data"]["viewer"]["id"]
        repo = g.get_repo(f"{username}/{username}")
        contents = repo.get_readme()
        waka_stats = get_stats()
        rdmd = decode_readme(contents.content)
        new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
        # print(new_readme)
        if new_readme != rdmd:
            repo.update_file(path=contents.path, message='Updated with Dev Metrics',
                             content=new_readme, sha=contents.sha, branch='master')
            print("Readme updated")
    except Exception as e:
        print("Exception Occurred " + str(e))
