from base64 import b64decode
from re import sub

from github import Github, AuthenticatedUser, Repository, ContentFile, InputGitAuthor, UnknownObjectException

from manager_environment import EnvironmentManager as EM


def init_github_manager():
    """
    """
    GitHubManager.prepare_github_env()
    print(f"Current user: {GitHubManager.USER.login}")


class GitHubManager:
    USER: AuthenticatedUser
    REPO: Repository
    README: ContentFile
    README_CONTENTS: str

    _START_COMMENT = f'<!--START_SECTION:{EM.SECTION_NAME}-->'
    _END_COMMENT = f'<!--END_SECTION:{EM.SECTION_NAME}-->'
    _README_REGEX = f"{_START_COMMENT}[\\s\\S]+{_END_COMMENT}"

    @staticmethod
    def prepare_github_env():
        """
        """
        github = Github(EM.GH_TOKEN)
        GitHubManager.USER = github.get_user()
        GitHubManager.REPO = github.get_repo(f"{GitHubManager.USER.login}/{GitHubManager.USER.login}")
        GitHubManager.README = GitHubManager.REPO.get_readme()
        GitHubManager.README_CONTENTS = str(b64decode(GitHubManager.README.content), 'utf-8')

    @staticmethod
    def _generate_new_readme(stats: str):
        """
        Generate a new Readme.md
        """
        readme_stats = f"{GitHubManager._START_COMMENT}\n{stats}\n{GitHubManager._END_COMMENT}"
        return sub(GitHubManager._README_REGEX, readme_stats, GitHubManager.README_CONTENTS)

    @staticmethod
    def _get_author():
        """
        """
        if EM.COMMIT_BY_ME:
            return InputGitAuthor(
                GitHubManager.USER.login or EM.COMMIT_USERNAME,
                GitHubManager.USER.email or EM.COMMIT_EMAIL
            )
        else:
            return InputGitAuthor(
                EM.COMMIT_USERNAME or 'readme-bot',
                EM.COMMIT_EMAIL or '41898282+github-actions[bot]@users.noreply.github.com'
            )

    @staticmethod
    def branch() -> str:
        return GitHubManager.REPO.default_branch if EM.BRANCH_NAME == "" else EM.BRANCH_NAME

    @staticmethod
    def update_readme(stats: str) -> bool:
        new_readme = GitHubManager._generate_new_readme(stats)
        if new_readme != GitHubManager.README_CONTENTS:
            GitHubManager.REPO.update_file(
                path=GitHubManager.README.path,
                message=EM.COMMIT_MESSAGE,
                content=new_readme,
                sha=GitHubManager.README.sha,
                branch=GitHubManager.branch(),
                committer=GitHubManager._get_author()
            )
            return True
        else:
            return False

    @staticmethod
    def update_chart(chart_path: str):
        with open(chart_path, "rb") as input_file:
            data = input_file.read()
        try:
            contents = GitHubManager.REPO.get_contents(chart_path)
            GitHubManager.REPO.update_file(contents.path, "Charts Updated", data, contents.sha, committer=GitHubManager._get_author())
        except UnknownObjectException:
            GitHubManager.REPO.create_file(chart_path, "Charts Added", data, committer=GitHubManager._get_author())
