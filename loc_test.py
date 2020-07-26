import re
import os
import base64
import requests
from github import Github
import datetime
from string import Template
import matplotlib.pyplot as plt
from io import StringIO,BytesIO

username = ''
waka_key = '1647f145-ce70-4172-9f4c-aa9143300891'
ghtoken = '20c2809f702a3db2cbe2350dd160e4e34302889e'

userInfoQuery = """
{
    viewer {
      login
      id
    }
}
"""

repositoryListQuery = Template("""
{
  user(login: "$username") {
    repositories(orderBy: {field: CREATED_AT, direction: ASC}, first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
      totalCount
      edges {
        node {
          object(expression:"master") {
                ... on Commit {
                history {
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


def getLoc():
	result = run_query(repositoryListQuery.substitute(username=username))
    # for repo in result['data']['user']['repositories']['edges']:
    # 	print(repo)




if __name__ == '__main__':
    try:
        g = Github(ghtoken)
        headers = {"Authorization": "Bearer " + ghtoken}
        user_data = run_query(userInfoQuery)  # Execute the query
        username = user_data["data"]["viewer"]["login"]
        id = user_data["data"]["viewer"]["id"]
        print("user {} id {}".format(username, id))
        
        getLoc()

        # repo = g.get_repo(f"{username}/{username}")
        # contents = repo.get_readme()
        # waka_stats = get_stats()
        # rdmd = decode_readme(contents.content)
        # new_readme = generate_new_readme(stats=waka_stats, readme=rdmd)
        # print(new_readme)
        # # if new_readme != rdmd:
        #     repo.update_file(path=contents.path, message='Updated with Dev Metrics',
        #                      content=new_readme, sha=contents.sha, branch='master')
        # print("Readme updated")
    except Exception as e:
        print("Exception Occurred" + str(e))