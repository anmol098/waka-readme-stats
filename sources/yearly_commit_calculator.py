from re import search
from datetime import datetime
from typing import Dict

from manager_download import DownloadManager as DM
from manager_environment import EnvironmentManager as EM
from manager_github import GitHubManager as GHM


GRAPH_PATH = "assets/bar_graph.png"


async def calculate_yearly_commit_data(repository_data: Dict) -> Dict:
    yearly_data = dict()
    total = len(repository_data["data"]["user"]["repositories"]["edges"])
    for ind, repo in enumerate(repository_data["data"]["user"]["repositories"]["edges"]):
        if repo["node"]["name"] not in EM.IGNORED_REPOS:
            print(f"{ind + 1}/{total}", "Retrieving repo:", repo["node"]["owner"]["login"], repo["node"]["name"])
            await update_yearly_data_with_commit_stats(repo["node"], yearly_data)
    return yearly_data


async def update_yearly_data_with_commit_stats(repo_details: Dict, yearly_data: Dict) -> Dict:
    commit_data = await DM.get_remote_graphql("repo_commit_list", owner=repo_details["owner"]["login"], name=repo_details["name"], id=GHM.USER.node_id)

    if commit_data["data"]["repository"] is None:
        print(f"\tSkipping repo: {repo_details['name']}")
        return dict()

    for commit in [commit["node"] for branch in commit_data["data"]["repository"]["refs"]["edges"] for commit in branch["node"]["target"]["history"]["edges"]]:
        date = search(r"\d+-\d+-\d+", commit["committedDate"]).group()
        curr_year = datetime.fromisoformat(date).year
        quarter = (datetime.fromisoformat(date).month - 1) // 3 + 1

        if repo_details["primaryLanguage"] is not None:
            if curr_year not in yearly_data:
                yearly_data[curr_year] = dict()
            if quarter not in yearly_data[curr_year]:
                yearly_data[curr_year][quarter] = dict()
            if repo_details["primaryLanguage"]["name"] not in yearly_data[curr_year][quarter]:
                yearly_data[curr_year][quarter][repo_details["primaryLanguage"]["name"]] = 0
            yearly_data[curr_year][quarter][repo_details["primaryLanguage"]["name"]] += (commit["additions"] - commit["deletions"])
