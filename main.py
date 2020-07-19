'''
WakaTime progress visualizer
'''

import re
import os
import base64
import datetime
import pytz
import requests
from github import Github

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

print(showTimeZone + " " + showOs + " " + showProjects + " " + showEditors)


def this_week():
    '''Returns current week span'''
    week_number = datetime.date.today().isocalendar()[1]
    month = datetime.date.today().strftime('%B')
    week_start = datetime.datetime.today().day - datetime.datetime.today().weekday()
    week_end = week_start + 5
    return f"Week #{week_number} : {month} {week_start} - {week_end}"


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


def get_stats():
    '''Gets API data and returns markdown progress'''
    data = requests.get(
        f"https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key={waka_key}").json()

    stats = ''
    if showTimeZone.lower() in ['true', '1', 't', 'y', 'yes']:
        timezone = data['data']['timezone']
        stats = stats + '⌚︎ Timezone: ' + timezone + '\n\n'

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

    return '```text\n' + stats + '```'


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
    repo = g.get_repo(f"{user}/{user}")
    contents = repo.get_readme()
    waka_stats = get_stats()
    rdmd = decode_readme(contents.content)
    new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
    if new_readme != rdmd:
        repo.update_file(path=contents.path, message='Updated with Dev Metrics',
                         content=new_readme, sha=contents.sha, branch='master')
