'''
Readme Development Metrics With waka time progress
'''

import re
import os
import base64
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
    for l in data[:5]:
        ln = len(l['name'])
        ln_text = len(l['text'])
        op = f"{l['name']}{' ' * (13 - ln)}{l['text']}{' ' * (15 - ln_text)}{make_graph(l['percent'])}   {l['percent']}%"
        data_list.append(op)
    return ' \n'.join(data_list)


def generate_commit_list():
    result = run_query(userInfoQuery)  # Execute the query
    username = result["data"]["viewer"]["login"]
    id = result["data"]["viewer"]["id"]
    print("user {} id {}".format(username, id))

    result = run_query(createContributedRepoQuery.substitute(username=username))
    nodes = result["data"]["user"]["repositoriesContributedTo"]["nodes"]
    repos = [d for d in nodes if d['isFork'] is False]

    morning = 0  # 6 - 12
    daytime = 0  # 12 - 18
    evening = 0  # 18 - 24
    night = 0  # 0 - 6

    for repository in repos:
        result = run_query(
            createCommittedDateQuery.substitute(owner=repository["owner"]["login"], name=repository["name"], id=id))
        try:
            committed_dates = result["data"]["repository"]["ref"]["target"]["history"]["edges"]
            for committedDate in committed_dates:
                date = datetime.datetime.strptime(committedDate["node"]["committedDate"], "%Y-%m-%dT%H:%M:%SZ")
                hour = date.hour
                if 6 <= hour < 12:
                    daytime += 1
                if 12 <= hour < 18:
                    evening += 1
                if 18 <= hour < 24:
                    night += 1
                if 0 <= hour < 6:
                    morning += 1
        except Exception as ex:
            print("Exception occured" + str(ex));

    sumAll = morning + daytime + evening + night
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

    return '**' + title + '** \n\n' + '```text\n' + make_commit_list(one_day) + '\n\n```\n'


def get_stats():
    '''Gets API data and returns markdown progress'''
    stats = ''

    if showCommit.lower() in ['true', '1', 't', 'y', 'yes']:
        stats = stats + generate_commit_list() + '\n\n'

    try:
        request = requests.get(
            f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={waka_key}")

        if request.status_code == 200:
            data = request.json()
            stats = stats + '📊 **This week I spent my time on** \n\n'
            stats = stats + '```text\n'
            if showTimeZone.lower() in ['true', '1', 't', 'y', 'yes']:
                timezone = data['data']['timezone']
                stats = stats + '⌚︎ Timezone: ' + timezone + '\n\n'

            if showLanguage.lower() in ['true', '1', 't', 'y', 'yes']:
                lang_list = make_list(data['data']['languages'])
                stats = stats + '💬 Languages: \n' + lang_list + '\n\n'

            if showEditors.lower() in ['true', '1', 't', 'y', 'yes']:
                edit_list = make_list(data['data']['editors'])
                stats = stats + '🔥 Editors: \n' + edit_list + '\n\n'

            if showProjects.lower() in ['true', '1', 't', 'y', 'yes']:
                project_list = make_list(data['data']['projects'])
                stats = stats + '🐱‍💻 Projects: \n' + project_list + '\n\n'

            if showOs.lower() in ['true', '1', 't', 'y', 'yes']:
                os_list = make_list(data['data']['operating_systems'])
                stats = stats + '💻 Operating Systems: \n' + os_list + '\n\n'

            stats = stats + '```\n\n'
        else:
            print("Waka Time Api Key Not Configured Properly")
    except Exception as e:
        print("Waka Time Api Key Not Configured" + str(e))

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
        g = Github(ghtoken)
        repo = g.get_repo(f"{user}/{user}")
        contents = repo.get_readme()
        headers = {"Authorization": "Bearer " + ghtoken}
        waka_stats = get_stats()
        rdmd = decode_readme(contents.content)
        new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
        if new_readme != rdmd:
            repo.update_file(path=contents.path, message='Updated with Dev Metrics',
                             content=new_readme, sha=contents.sha, branch='master')
    except Exception as e:
        print("Exception Occurred" + str(e))
