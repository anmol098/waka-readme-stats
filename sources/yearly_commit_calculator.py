from json import dumps
from re import search
from datetime import datetime
from typing import Dict

from manager_download import DownloadManager as DM
from manager_environment import EnvironmentManager as EM
from manager_github import GitHubManager as GHM
from manager_file import FileManager as FM
from manager_debug import DebugManager as DBM


async def calculate_yearly_commit_data(repositories: Dict) -> Dict:
    """
    Calculate commit data by years.
    Commit data includes difference between contribution additions and deletions in each quarter of each recorded year.

    :param repositories: user repositories info dictionary.
    :returns: Commit quarter yearly data dictionary.
    """
    DBM.i("Calculating yearly commit data...")
    yearly_data = dict()
    total = len(repositories["data"]["user"]["repositories"]["nodes"])

    for ind, repo in enumerate(repositories["data"]["user"]["repositories"]["nodes"]):
        if repo["name"] not in EM.IGNORED_REPOS:
            repo_name = "private" if repo["isPrivate"] else f"{repo['owner']['login']}/{repo['name']}"
            DBM.i(f"\t{ind + 1}/{total} Retrieving repo: {repo_name}")
            await update_yearly_data_with_commit_stats(repo, yearly_data)
    DBM.g("Yearly commit data calculated!")

    if EM.DEBUG_RUN:
        FM.write_file("yearly_data.json", dumps(yearly_data), assets=True)
    return yearly_data


async def update_yearly_data_with_commit_stats(repo_details: Dict, yearly_data: Dict):
    """
    Updates yearly commit data with commits from given repository.
    Skips update if the commit isn't related to any repository.

    :param repo_details: Dictionary with information about the given repository.
    :param yearly_data: Yearly data dictionary to update.
    """
    owner = repo_details["owner"]["login"]
    branch_data = await DM.get_remote_graphql("repo_branch_list", owner=owner, name=repo_details["name"])
    if branch_data["data"]["repository"] is None:
        DBM.w(f"\t\tSkipping repo: {repo_details['name']}")
        return dict()

    for branch in branch_data["data"]["repository"]["refs"]["nodes"]:
        commit_data = await DM.get_remote_graphql("repo_commit_list", owner=owner, name=repo_details["name"], branch=branch["name"], id=GHM.USER.node_id)
        for commit in commit_data["data"]["repository"]["ref"]["target"]["history"]["nodes"]:
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
                yearly_data[curr_year][quarter][repo_details["primaryLanguage"]["name"]] += commit["additions"] - commit["deletions"]
