from base64 import b64encode
from os import environ, makedirs
from os.path import dirname, join
from random import choice
from re import sub
from shutil import copy, rmtree
from string import ascii_letters

from git import Repo, Actor
from github import Github, AuthenticatedUser, Repository

from manager_environment import EnvironmentManager as EM
from manager_file import FileManager as FM
from manager_debug import DebugManager as DBM


def init_github_manager():
    """
    Initialize GitHub manager.
    Current user, user readme repo and readme file are downloaded.
    """
    GitHubManager.prepare_github_env()
    DBM.i(f"Current user: {GitHubManager.USER.login}.")


class GitHubManager:
    USER: AuthenticatedUser
    REPO: Repo
    REMOTE: Repository

    _REMOTE_NAME: str
    _REMOTE_PATH: str
    _SINGLE_COMMIT_BRANCH = "latest_branch"

    _START_COMMENT = f"<!--START_SECTION:{EM.SECTION_NAME}-->"
    _END_COMMENT = f"<!--END_SECTION:{EM.SECTION_NAME}-->"
    _README_REGEX = f"{_START_COMMENT}[\\s\\S]+{_END_COMMENT}"

    @staticmethod
    def prepare_github_env():
        """
        Download and store for future use:
        - Current GitHub user.
        - Named repo of the user [username]/[username].
        - Clone of the named repo.
        """
        github = Github(EM.GH_TOKEN)
        clone_path = "repo"
        GitHubManager.USER = github.get_user()
        rmtree(clone_path, ignore_errors=True)

        GitHubManager._REMOTE_NAME = f"{GitHubManager.USER.login}/{GitHubManager.USER.login}"
        GitHubManager._REPO_PATH = f"https://{EM.GH_TOKEN}@github.com/{GitHubManager._REMOTE_NAME}.git"

        GitHubManager.REMOTE = github.get_repo(GitHubManager._REMOTE_NAME)
        GitHubManager.REPO = Repo.clone_from(GitHubManager._REPO_PATH, to_path=clone_path)

        if EM.COMMIT_SINGLE:
            GitHubManager.REPO.git.checkout(GitHubManager.branch(EM.PULL_BRANCH_NAME))
            GitHubManager.REPO.git.checkout("--orphan", GitHubManager._SINGLE_COMMIT_BRANCH)
        else:
            GitHubManager.REPO.git.checkout(GitHubManager.branch(EM.PUSH_BRANCH_NAME))

    @staticmethod
    def _get_author() -> Actor:
        """
        Gets GitHub commit author specified by environmental variables.
        It is the user himself or a 'readme-bot'.

        :returns: Commit author.
        """
        if EM.COMMIT_BY_ME:
            return Actor(EM.COMMIT_USERNAME or GitHubManager.USER.login, EM.COMMIT_EMAIL or GitHubManager.USER.email)
        else:
            return Actor(EM.COMMIT_USERNAME or "readme-bot", EM.COMMIT_EMAIL or "41898282+github-actions[bot]@users.noreply.github.com")

    @staticmethod
    def branch(requested_branch: str) -> str:
        """
        Gets requested branch name or the default branch name if requested branch wasn't found.
        The default branch name is regularly, 'main' or 'master'.

        :param requested_branch: Requested branch name.
        :returns: Commit author.
        """
        return GitHubManager.REMOTE.default_branch if requested_branch == "" else requested_branch

    @staticmethod
    def _copy_file_and_add_to_repo(src_path: str):
        """
        Copies file to repository folder, creating path if needed and adds file to git.
        The copied file relative to repository root path will be equal the source file relative to work directory path.

        :param src_path: Source file path.
        """
        dst_path = join(GitHubManager.REPO.working_tree_dir, src_path)
        makedirs(dirname(src_path), exist_ok=True)
        copy(dst_path, src_path)
        GitHubManager.REPO.git.add(dst_path)

    @staticmethod
    def update_readme(stats: str):
        """
        Updates readme with given data if necessary.
        Uses commit author, commit message and branch name specified by environmental variables.
        """
        DBM.i("Updating README...")
        readme_path = join(GitHubManager.REPO.working_tree_dir, GitHubManager.REMOTE.get_readme().path)

        with open(readme_path, "r") as readme_file:
            readme_contents = readme_file.read()
        readme_stats = f"{GitHubManager._START_COMMENT}\n{stats}\n{GitHubManager._END_COMMENT}"
        new_readme = sub(GitHubManager._README_REGEX, readme_stats, readme_contents)

        with open(readme_path, "w") as readme_file:
            readme_file.write(new_readme)

        GitHubManager.REPO.git.add(readme_path)
        DBM.g("README updated!")

    @staticmethod
    def update_chart(name: str, path: str) -> str:
        """
        Updates a chart.
        Inlines data into readme if in debug mode, commits otherwise.
        Uses commit author, commit message and branch name specified by environmental variables.

        :param name: Name of the chart to update.
        :param path: Path of the chart to update.
        :returns: String to add to README file.
        """
        output = str()
        DBM.i(f"Updating {name} chart...")
        if not EM.DEBUG_RUN:
            DBM.i("\tAdding chart to repo...")
            GitHubManager._copy_file_and_add_to_repo(path)
            chart_path = f"https://raw.githubusercontent.com/{GitHubManager._REMOTE_NAME}/{GitHubManager.branch(EM.PUSH_BRANCH_NAME)}/{path}"
            output += f"![{name} chart]({chart_path})\n\n"

        else:
            DBM.i("\tInlining chart...")
            hint = "You can use [this website](https://codebeautify.org/base64-to-image-converter) to view the generated base64 image."
            with open(path, "rb") as input_file:
                output += f"{hint}\n```\ndata:image/png;base64,{b64encode(input_file.read()).decode('utf-8')}\n```\n\n"
        return output

    @staticmethod
    def commit_update():
        """
        Commit update data to repository.
        """
        actor = GitHubManager._get_author()
        DBM.i("Committing files to repo...")
        GitHubManager.REPO.index.commit(EM.COMMIT_MESSAGE, author=actor, committer=actor)

        if EM.COMMIT_SINGLE:
            DBM.i("Pushing files to repo as a single commit...")
            refspec = f"{GitHubManager._SINGLE_COMMIT_BRANCH}:{GitHubManager.branch(EM.PUSH_BRANCH_NAME)}"
            headers = GitHubManager.REPO.remotes.origin.push(force=True, refspec=refspec)
        else:
            DBM.i("Pushing files to repo...")
            headers = GitHubManager.REPO.remotes.origin.push()

        if len(headers) == 0:
            DBM.i(f"Repository push error: {headers}!")
        else:
            DBM.i("Repository synchronized!")

    @staticmethod
    def set_github_output(stats: str):
        """
        Output readme data as current action output instead of committing it.

        :param stats: String representation of stats to output.
        """
        DBM.i("Setting README contents as action output...")
        if "GITHUB_OUTPUT" not in environ.keys():
            DBM.p("Not in GitHub environment, not setting action output!")
            return
        else:
            DBM.i("Outputting readme contents, check the latest comment for the generated stats.")

        prefix = "README stats current output:"
        eol = "".join(choice(ascii_letters) for _ in range(10))
        FM.write_file(environ["GITHUB_OUTPUT"], f"README_CONTENT<<{eol}\n{prefix}\n\n{stats}\n{eol}\n", append=True)

        DBM.g("Action output set!")
