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

    def __init__(self, id, username, ghtoken, repositoryData):
        self.id = id
        self.username = username

        self.g = Github(ghtoken)
        self.headers = {"Authorization": "Bearer " + ghtoken}
        self.repositoryData = repositoryData

    def calculateLoc(self):
        result = self.repositoryData
        yearly_data = {}
        for repo in result['data']['user']['repositories']['edges']:
            self.getCommitStat(repo['node'], yearly_data)
            time.sleep(0.7)
        graph = BarGraph(yearly_data)
        graph_file = graph.build_graph()
        self.pushChart()

    def run_query_v3(self, nameWithOwner):
        endPoint = 'https://api.github.com/repos/' + nameWithOwner + '/stats/code_frequency'
        # print(endPoint)
        request = requests.get(endPoint, headers=self.headers)
        if request.status_code == 401:
            raise Exception("Invalid token {}. {}".format(request.status_code, nameWithOwner))
        elif request.status_code == 204:
            return []
        else:
            return request.json()

    def getQuarter(self, timeStamp):
        month = datetime.datetime.fromtimestamp(timeStamp).month
        if month >= 1 and month <= 4:
            return 1
        elif month >= 5 and month <= 8:
            return 2
        elif month >= 9 and month <= 12:
            return 3

    def getCommitStat(self, repoDetails, yearly_data):
        result = self.run_query_v3(repoDetails['nameWithOwner'])
        this_year = datetime.datetime.utcnow().year

        for i in range(len(result)):
            curr_year = datetime.datetime.fromtimestamp(result[i][0]).year
            # if  curr_year != this_year:
            quarter = self.getQuarter(result[i][0])
            if repoDetails['primaryLanguage'] is not None:

                if curr_year not in yearly_data:
                    yearly_data[curr_year] = {}
                if quarter not in yearly_data[curr_year]:
                    yearly_data[curr_year][quarter] = {}
                if repoDetails['primaryLanguage']['name'] not in yearly_data[curr_year][quarter]:
                    yearly_data[curr_year][quarter][repoDetails['primaryLanguage']['name']] = 0
                yearly_data[curr_year][quarter][repoDetails['primaryLanguage']['name']] += (result[i][1] + result[i][2])

                # to find total

                # if 'total' not in yearly_data[curr_year]:
                #   yearly_data[curr_year]['total']={}
                # if repoDetails['primaryLanguage']['name'] not in yearly_data[curr_year]['total']:
                #   yearly_data[curr_year]['total'][repoDetails['primaryLanguage']['name']]=0
                # yearly_data[curr_year]['total'][repoDetails['primaryLanguage']['name']]+=(result[i][1]+result[i][2])

    def pushChart(self):
        repo = self.g.get_repo(f"{self.username}/{self.username}")
        committer = InputGitAuthor('readme-bot', 'readme-bot@example.com')
        with open('bar_graph.png', 'rb') as input_file:
            data = input_file.read()
        try:
            contents = repo.get_contents("charts/bar_graph.png")
            repo.update_file(contents.path, "Charts Updated", data, contents.sha, committer=committer)
        except Exception as e:
            repo.create_file("charts/bar_graph.png", "Charts Added", data, committer=committer)
