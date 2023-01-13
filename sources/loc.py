import re
import os
import base64
import requests
from github import Github, InputGitAuthor
import datetime
from string import Template
import matplotlib.pyplot as plt
from io import StringIO, BytesIO
from dotenv import load_dotenv
import time

from make_bar_graph import BarGraph


class LinesOfCode:

    def __init__(self, id, username, ghtoken, repositoryData, ignored_repos):
        self.id = id
        self.username = username

        self.g = Github(ghtoken)
        self.headers = {"Authorization": "Bearer " + ghtoken}
        self.repositoryData = repositoryData
        self.ignored_repos = ignored_repos

    def calculateLoc(self):
        result = self.repositoryData
        yearly_data = {}
        for repo in result['data']['user']['repositories']['edges']:
            if repo['node']['name'] not in self.ignored_repos:
                self.getCommitStat(repo['node'], yearly_data)
                time.sleep(0.7)
        return yearly_data

    def plotLoc(self, yearly_data):
        graph = BarGraph(yearly_data)
        graph.build_graph()
        self.pushChart()

    def run_query_v3(self, endPoint):
        # print(endPoint)
        request = requests.get(endPoint, headers=self.headers)
        if request.status_code == 401:
            raise Exception("Invalid token {}.".format(request.status_code))
        elif request.status_code == 204:
            return []
        else:
            return request.json()

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

    def getCommitStat(self, repoDetails, yearly_data):
        commitsURL = 'https://api.github.com/repos/' + repoDetails['nameWithOwner'] + '/commits'
        filteredCommitsEndPoint = commitsURL + '?author=' + self.username
        filteredCommitsResult = self.run_query_v3(filteredCommitsEndPoint)
        # This ignores the error message you get when you try to list commits for an empty repository
        if not type(filteredCommitsResult) == list:
            return
        this_year = datetime.datetime.utcnow().year

        for i in range(len(filteredCommitsResult)):
            iso_date = filteredCommitsResult[i]["commit"]["author"]["date"]
            date = re.search(r'\d+-\d+-\d+', iso_date).group(0)
            curr_year = datetime.datetime.fromisoformat(date).year
            # if  curr_year != this_year:

            individualCommitEndPoint = commitsURL + '/' + filteredCommitsResult[i]["sha"]
            individualCommitResult = self.run_query_v3(individualCommitEndPoint)

            quarter = self.getQuarter(date)
            if repoDetails['primaryLanguage'] is not None:

                if curr_year not in yearly_data:
                    yearly_data[curr_year] = {}
                if quarter not in yearly_data[curr_year]:
                    yearly_data[curr_year][quarter] = {}
                if repoDetails['primaryLanguage']['name'] not in yearly_data[curr_year][quarter]:
                    yearly_data[curr_year][quarter][repoDetails['primaryLanguage']['name']] = 0
                yearly_data[curr_year][quarter][repoDetails['primaryLanguage']['name']] += (individualCommitResult["stats"]["additions"] - individualCommitResult["stats"]['deletions'])

                # to find total

                # if 'total' not in yearly_data[curr_year]:
                #   yearly_data[curr_year]['total']={}
                # if repoDetails['primaryLanguage']['name'] not in yearly_data[curr_year]['total']:
                #   yearly_data[curr_year]['total'][repoDetails['primaryLanguage']['name']]=0
                # yearly_data[curr_year]['total'][repoDetails['primaryLanguage']['name']]+=(result[i][1]+result[i][2])

    def pushChart(self):
        repo = self.g.get_repo(f"{self.username}/{self.username}")
        committer = InputGitAuthor('readme-bot', '41898282+github-actions[bot]@users.noreply.github.com')
        with open('bar_graph.png', 'rb') as input_file:
            data = input_file.read()
        try:
            contents = repo.get_contents("charts/bar_graph.png")
            repo.update_file(contents.path, "Charts Updated", data, contents.sha, committer=committer)
        except Exception as e:
            repo.create_file("charts/bar_graph.png", "Charts Added", data, committer=committer)
