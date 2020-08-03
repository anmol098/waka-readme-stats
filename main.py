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
from tqdm import tqdm
# from loc import LinesOfCode
import time
import traceback
import humanize
from urllib.parse import quote

# from dotenv import load_dotenv
#
# load_dotenv()

debug = False

START_COMMENT = '<!--START_SECTION:waka-->'
END_COMMENT = '<!--END_SECTION:waka-->'
listReg = f"{START_COMMENT}[\\s\\S]+{END_COMMENT}"


if not debug:
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
    show_days_of_week = os.getenv('INPUT_SHOW_DAYS_OF_WEEK')
    showLanguagePerRepo = os.getenv('INPUT_SHOW_LANGUAGE_PER_REPO')
    showLocChart = os.getenv('INPUT_SHOW_LOC_CHART')
    show_profile_view = os.getenv('INPUT_SHOW_PROFILE_VIEWS')
    show_short_info = os.getenv('INPUT_SHOW_SHORT_INFO')
    show_waka_stats = 'y'

else:
    from debug import *

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
get_commit_counts = Template("""/repos/$owner/$repo/stats/punch_card""")
get_repos = Template("""/user/repos?per_page=100""")
get_profile_view = Template("""/repos/$owner/$repo/traffic/views""")
get_profile_traffic = Template("""/repos/$owner/$repo/traffic/popular/referrers""")
get_languages = Template("""/repos/$owner/$repo/languages""")

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
    for l in data[:10]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        op = f"{l['emoji']}{' ' * 2}{l['name']}{' ' * (20 - ln)}{l['text']}{' ' * (15 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        data_list.append(op)
    return ' \n'.join(data_list)


def generate_commit_list(tz):
    string = ''
    result = run_query(userInfoQuery)  # Execute the query
    username = result["data"]["viewer"]["login"]
    id = result["data"]["viewer"]["id"]
    # print("user {}".format(username))

    repos = run_v3_api(get_repos.substitute())

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
    print("Counting all your hard work")
    for repository in tqdm(repos, desc='Get commit count'):
        if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
            try:
                datas = run_v3_api(get_loc_url.substitute(owner=repository["owner"]["login"], repo=repository["name"]))
                for data in datas:
                    total_loc = total_loc + data[1] - data[2]
            except Exception as e:
                print(e)
        try:
            committed_dates = run_v3_api(get_commit_counts.substitute(owner=repository["owner"]["login"], repo=repository["name"]))

            for [weekday, hour, total] in committed_dates:

                if isMorningPerson.lower() in ['true', '1', 't', 'y', 'yes']:
                    if 6 <= hour < 12:
                        daytime += total
                    if 12 <= hour < 18:
                        evening += total
                    if 18 <= hour < 24:
                        night += total
                    if 0 <= hour < 6:
                        morning += total
                else:
                    if 6 <= hour < 12:
                        morning += total
                    if 12 <= hour < 18:
                        daytime += total
                    if 18 <= hour < 24:
                        evening += total
                    if 0 <= hour < 6:
                        night += total
                
                if weekday == 1:
                    Monday += total
                if weekday == 2:
                    Tuesday += total
                if weekday == 3:
                    Wednesday += total
                if weekday == 4:
                    Thursday += total
                if weekday == 5:
                    Friday += total
                if weekday == 6:
                    Saturday += total
                if weekday == 0:
                    Sunday += total
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
        {"emoji": "🙂", "name": "Monday", "text": str(Monday) + " commits", "percent": round((Monday / sum_week) * 100, 2)},
        {"emoji": "🤓", "name": "Tuesday", "text": str(Tuesday) + " commits", "percent": round((Tuesday / sum_week) * 100, 2)},
        {"emoji": "😅", "name": "Wednesday", "text": str(Wednesday) + " commits", "percent": round((Wednesday / sum_week) * 100, 2)},
        {"emoji": "🤩", "name": "Thursday", "text": str(Thursday) + " commits", "percent": round((Thursday / sum_week) * 100, 2)},
        {"emoji": "🚀", "name": "Friday", "text": str(Friday) + " commits", "percent": round((Friday / sum_week) * 100, 2)},
        {"emoji": "🧠", "name": "Saturday", "text": str(Saturday) + " commits", "percent": round((Saturday / sum_week) * 100, 2)},
        {"emoji": "🏖", "name": "Sunday", "text": str(Sunday) + " commits", "percent": round((Sunday / sum_week) * 100, 2)},
    ]

    max_element = {
        'percent': 0
    }

    for day in dayOfWeek:
        if day['percent'] > max_element['percent']:
            max_element = day
    days_title = 'I\'m most productive on ' + max_element['name'] + 's ' + max_element['emoji']
    if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
        string = string + '![Lines of code](https://img.shields.io/badge/From%20Hello%20World%20I\'ve%20written-' + locale.format_string(
            "%d", total_loc,
            grouping=True) + '%20Lines%20of%20code-blue)\n\n'
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

    if showLanguagePerRepo.lower() in ['true', '1', 't', 'y', 'yes']:
        string = string + generate_language_per_repo(repos) + '\n\n'

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
            timezone = data['data']['timezone']
            stats = stats + '⏱ Timezone: ' + timezone + '\n\n'
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
            stats = stats + '🖥 Operating Systems: \n' + os_list + '\n\n'
        stats = stats + '```\n\n'
    return stats


def generate_language_per_repo(repositories):
    
    language_count = {}
    total = 0
    for repo in tqdm(repositories, desc='Get language count'):
        if repo['language'] is None:
            continue

        datas = run_v3_api(get_languages.substitute(owner=repo["owner"]["login"], repo=repo["name"]))
        languages = list(datas.keys())
        # language = repo['language']

        # color_code = repo['node']['primaryLanguage']['color']
        for language in languages:
            total += 1
            if language not in language_count.keys():
                language_count[language] = {}
                language_count[language]['count'] = 1
            else:
                language_count[language]['count'] = language_count[language]['count'] + 1
            # language_count[language]['color'] = color_code
    data = []
    sorted_labels = list(language_count.keys())
    sorted_labels.sort(key=lambda x: language_count[x]['count'], reverse=True)
    most_language_repo = sorted_labels[0]

    emoji_group = ['🥇', '🥈', '🥉']
    rest = ['🔰'] * len(sorted_labels)
    emoji_group = emoji_group + rest

    for i, label in enumerate(sorted_labels):
        percent = round(language_count[label]['count'] / total * 100, 2)
        data.append({
            "emoji" : emoji_group[i],
            "name": label,
            "text": str(language_count[label]['count']) + " repos",
            "percent": percent
        })
    title = '🧑🏽‍💻 I mostly code in ' + most_language_repo
    return '**' + title + '** \n\n' + '```text\n' + make_commit_list(data) + '\n\n```\n'


def get_line_of_code():
    result = run_query(createContributedRepoQuery.substitute(username=username))
    nodes = result["data"]["user"]["repositoriesContributedTo"]["nodes"]
    repos = [d for d in nodes if d['isFork'] is False]
    total_loc = 0
    for repository in repos:
        try:
            time.sleep(0.7)
            datas = run_v3_api(get_loc_url.substitute(owner=repository["owner"]["login"], repo=repository["name"]))
            for data in datas:
                total_loc = total_loc + data[1] - data[2]
        except Exception as execp:
            print(execp)
    return humanize.intword(int(total_loc))


def get_short_info(github):
    string = ''
    string += '**🐱 My GitHub Data** \n\n'
    user_info = github.get_user()
    if user_info.disk_usage is None:
        disk_usage = humanize.naturalsize(0)
        print("Please add new github personal access token with user permission")
    else:
        disk_usage = humanize.naturalsize(user_info.disk_usage)
    request = requests.get('https://github-contributions.now.sh/api/v1/' + user_info.login)
    if request.status_code == 200:
        data = request.json()
        total = data['years'][0]['total']
        year = data['years'][0]['year']
        string += '> 🏆 ' + humanize.intcomma(total) + ' Contributions in year ' + year + '\n > \n'

    string += '> 📦 Used ' + disk_usage + ' in GitHub\'s Storage \n > \n'
    is_hireable = user_info.hireable
    public_repo = user_info.public_repos
    private_repo = user_info.owned_private_repos
    if is_hireable:
        string += "> 💼 Opted to Hire\n > \n"
    else:
        string += "> 🚫 Not opted to Hire\n > \n"

    string += '> 📜 ' + str(public_repo) + ' Public Repository \n > \n'
    string += '> 🔑 ' + str(private_repo) + ' Owned Private Repository \n\n'

    print(string)
    return string


def get_stats(github):
    '''Gets API data and returns markdown progress'''

    stats = ''
    # repositoryList = run_query(repositoryListQuery.substitute(username=username, id=id))
    repositoryList = run_v3_api(get_repos.substitute())

    if show_profile_view.lower() in ['true', '1', 't', 'y', 'yes']:
        data = run_v3_api(get_profile_view.substitute(owner=username, repo=username))
        stats += '![Profile Views](http://img.shields.io/badge/Profile%20Views-' + str(data['count']) + '-blue)\n\n'

    if show_loc.lower() in ['true', '1', 't', 'y', 'yes']:
        stats += '![Lines of code](https://img.shields.io/badge/From%20Hello%20World%20I\'ve%20written-' + quote(
            str(get_line_of_code())) + '%20Lines%20of%20code-blue)\n\n'

    if show_short_info.lower() in ['true', '1', 't', 'y', 'yes']:
        stats += get_short_info(github)

    if show_waka_stats.lower() in ['true', '1', 't', 'y', 'yes']:
        stats += get_waka_time_stats()

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
        print(username)
        repo = g.get_repo(f"{username}/{username}")
        contents = repo.get_readme()
        waka_stats = get_stats(g)
        
        if debug:
            print(waka_stats)
        else:
            rdmd = decode_readme(contents.content)
            new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
            if new_readme != rdmd:
                repo.update_file(path=contents.path, message='Updated with Dev Metrics',
                                content=new_readme, sha=contents.sha, branch='master')
                print("Readme updated")
    except Exception as e:
        traceback.print_exc()
        print("Exception Occurred " + str(e))
