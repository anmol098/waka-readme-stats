import re
from asyncio import sleep

from github import Github, InputGitAuthor, AuthenticatedUser
import datetime

from download_manager import DownloadManager
from make_bar_graph import BarGraph


class LinesOfCode:

    def __init__(self, user: AuthenticatedUser, ghtoken, repositoryData, ignored_repos):
        self.g = Github(ghtoken)
        self.user = user
        self.repositoryData = repositoryData
        self.ignored_repos = ignored_repos

    async def calculateLoc(self):
        result = self.repositoryData
        yearly_data = {}
        total = len(result['data']['user']['repositories']['edges'])
        for ind, repo in enumerate(result['data']['user']['repositories']['edges']):
            if repo['node']['name'] not in self.ignored_repos:
                print(f"{ind}/{total}", "Retrieving repo:", repo['node']["owner"]["login"], repo['node']['name'])
                await self.getCommitStat(repo['node'], yearly_data)
                await sleep(0.7)
        return yearly_data

    async def plotLoc(self, yearly_data):
        graph = BarGraph(yearly_data)
        await graph.build_graph()
        self.pushChart()

    def getQuarter(self, timeStamp):
        month = datetime.datetime.fromisoformat(timeStamp).month
        if month >= 1 and month <= 3:
            return 1
        elif month >= 4 and month <= 6:
            return 2
        elif month >= 7 and month <= 9:
            return 3
        elif month >= 10 and month <= 12:
            return 4

    async def getCommitStat(self, repoDetails, yearly_data):
        commit_data = await DownloadManager.get_remote_graphql("repository_commit_list", owner=repoDetails["owner"]["login"], name=repoDetails['name'], id=self.user.node_id)

        if commit_data["data"]["repository"] is None:
            print("\tSkipping:", repoDetails['name'])
            return

        for commit in [commit["node"] for branch in commit_data["data"]["repository"]["refs"]["edges"] for commit in branch["node"]["target"]["history"]["edges"]]:
            date = re.search(r'\d+-\d+-\d+', commit["committedDate"]).group(0)
            curr_year = datetime.datetime.fromisoformat(date).year
            quarter = self.getQuarter(date)

            if repoDetails['primaryLanguage'] is not None:
                if curr_year not in yearly_data:
                    yearly_data[curr_year] = {}
                if quarter not in yearly_data[curr_year]:
                    yearly_data[curr_year][quarter] = {}
                if repoDetails['primaryLanguage']['name'] not in yearly_data[curr_year][quarter]:
                    yearly_data[curr_year][quarter][repoDetails['primaryLanguage']['name']] = 0
                yearly_data[curr_year][quarter][repoDetails['primaryLanguage']['name']] += (commit["additions"] - commit["deletions"])


    def pushChart(self):
        repo = self.g.get_repo(f"{self.user.login}/{self.user.login}")
        committer = InputGitAuthor('readme-bot', '41898282+github-actions[bot]@users.noreply.github.com')
        with open('bar_graph.png', 'rb') as input_file:
            data = input_file.read()
        try:
            contents = repo.get_contents("charts/bar_graph.png")
            repo.update_file(contents.path, "Charts Updated", data, contents.sha, committer=committer)
        except Exception as e:
            repo.create_file("charts/bar_graph.png", "Charts Added", data, committer=committer)
