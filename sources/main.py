"""
Readme Development Metrics With waka time progress
"""
from asyncio import run
from datetime import datetime
from typing import Dict
from urllib.parse import quote

from humanize import intword, naturalsize, intcomma

from manager_download import init_download_manager, DownloadManager as DM
from manager_environment import EnvironmentManager as EM
from manager_github import init_github_manager, GitHubManager as GHM
from manager_file import init_localization_manager, FileManager as FM
from manager_debug import init_debug_manager, DebugManager as DBM
from graphics_chart_drawer import create_loc_graph, GRAPH_PATH
from yearly_commit_calculator import calculate_commit_data
from graphics_list_formatter import make_list, make_commit_day_time_list, make_language_per_repo_list


async def get_waka_time_stats(repositories: Dict, commit_dates: Dict) -> str:
    """
    Collects user info from wakatime.
    Info includes most common commit time, timezone, language, editors, projects and OSs.

    :param repositories: User repositories list.
    :param commit_dates: User commit data list.
    :returns: String representation of the info.
    """
    DBM.i("Adding short WakaTime stats...")
    stats = str()

    data = await DM.get_remote_json("waka_latest")
    if EM.SHOW_COMMIT or EM.SHOW_DAYS_OF_WEEK:  # if any on flag is turned on then we need to calculate the data and print accordingly
        DBM.i("Adding user commit day time info...")
        stats += f"{await make_commit_day_time_list(data['data']['timezone'], repositories, commit_dates)}\n\n"

    if EM.SHOW_TIMEZONE or EM.SHOW_LANGUAGE or EM.SHOW_EDITORS or EM.SHOW_PROJECTS or EM.SHOW_OS:
        no_activity = FM.t("No Activity Tracked This Week")
        stats += f"📊 **{FM.t('This Week I Spend My Time On')}** \n\n```text\n"

        if EM.SHOW_TIMEZONE:
            DBM.i("Adding user timezone info...")
            time_zone = data["data"]["timezone"]
            stats += f"🕑︎ {FM.t('Timezone')}: {time_zone}\n\n"

        if EM.SHOW_LANGUAGE:
            DBM.i("Adding user top languages info...")
            lang_list = no_activity if len(data["data"]["languages"]) == 0 else make_list(data["data"]["languages"])
            stats += f"💬 {FM.t('Languages')}: \n{lang_list}\n\n"

        if EM.SHOW_EDITORS:
            DBM.i("Adding user editors info...")
            edit_list = no_activity if len(data["data"]["editors"]) == 0 else make_list(data["data"]["editors"])
            stats += f"🔥 {FM.t('Editors')}: \n{edit_list}\n\n"

        if EM.SHOW_PROJECTS:
            DBM.i("Adding user projects info...")
            project_list = no_activity if len(data["data"]["projects"]) == 0 else make_list(data["data"]["projects"])
            stats += f"🐱‍💻 {FM.t('Projects')}: \n{project_list}\n\n"

        if EM.SHOW_OS:
            DBM.i("Adding user operating systems info...")
            os_list = no_activity if len(data["data"]["operating_systems"]) == 0 else make_list(data["data"]["operating_systems"])
            stats += f"💻 {FM.t('operating system')}: \n{os_list}\n\n"

        stats = f"{stats[:-1]}```\n\n"

    DBM.g("WakaTime stats added!")
    return stats


async def get_short_github_info() -> str:
    """
    Collects user info from GitHub public profile.
    The stats include: disk usage, contributions number, whether the user has opted to hire, public and private repositories number.

    :returns: String representation of the info.
    """
    DBM.i("Adding short GitHub info...")
    stats = f"**🐱 {FM.t('My GitHub Data')}** \n\n"

    DBM.i("Adding user disk usage info...")
    if GHM.USER.disk_usage is None:
        disk_usage = FM.t("Used in GitHub's Storage") % "?"
        DBM.p("Please add new github personal access token with user permission!")
    else:
        disk_usage = FM.t("Used in GitHub's Storage") % naturalsize(GHM.USER.disk_usage)
    stats += f"> 📦 {disk_usage} \n > \n"

    data = await DM.get_remote_json("github_stats")
    DBM.i("Adding contributions info...")
    if len(data["years"]) > 0:
        contributions = FM.t("Contributions in the year") % (intcomma(data["years"][0]["total"]), data["years"][0]["year"])
        stats += f"> 🏆 {contributions}\n > \n"
    else:
        DBM.p("GitHub contributions data unavailable!")

    DBM.i("Adding opted for hire info...")
    opted_to_hire = GHM.USER.hireable
    if opted_to_hire:
        stats += f"> 💼 {FM.t('Opted to Hire')}\n > \n"
    else:
        stats += f"> 🚫 {FM.t('Not Opted to Hire')}\n > \n"

    DBM.i("Adding public repositories info...")
    public_repo = GHM.USER.public_repos
    if public_repo != 1:
        stats += f"> 📜 {FM.t('public repositories') % public_repo} \n > \n"
    else:
        stats += f"> 📜 {FM.t('public repository') % public_repo} \n > \n"

    DBM.i("Adding private repositories info...")
    private_repo = GHM.USER.owned_private_repos if GHM.USER.owned_private_repos is not None else 0
    if public_repo != 1:
        stats += f"> 🔑 {FM.t('private repositories') % private_repo} \n > \n"
    else:
        stats += f"> 🔑 {FM.t('private repository') % private_repo} \n > \n"

    DBM.g("Short GitHub info added!")
    return stats


async def collect_user_repositories() -> Dict:
    """
    Collects information about all the user repositories available.

    :returns: Complete list of user repositories.
    """
    DBM.i("Getting user repositories list...")
    repositories = await DM.get_remote_graphql("user_repository_list", username=GHM.USER.login, id=GHM.USER.node_id)
    repo_names = [repo["name"] for repo in repositories["data"]["user"]["repositories"]["nodes"]]
    DBM.g("\tUser repository list collected!")

    contributed = await DM.get_remote_graphql("repos_contributed_to", username=GHM.USER.login)
    contributed_nodes = [r for r in contributed["data"]["user"]["repositoriesContributedTo"]["nodes"] if r["name"] not in repo_names and not r["isFork"]]
    DBM.g("\tUser contributed to repository list collected!")

    repositories["data"]["user"]["repositories"]["nodes"] += contributed_nodes
    return repositories


async def get_stats() -> str:
    """
    Creates new README.md content from all the acquired statistics from all places.
    The readme includes data from wakatime, contributed lines of code number, GitHub profile info and last updated date.

    :returns: String representation of README.md contents.
    """
    DBM.i("Collecting stats for README...")

    stats = str()
    repositories = await collect_user_repositories()

    if EM.SHOW_LINES_OF_CODE or EM.SHOW_LOC_CHART or EM.SHOW_COMMIT or EM.SHOW_DAYS_OF_WEEK:  # calculate commit data if any one of these is enabled
        yearly_data, commit_data = await calculate_commit_data(repositories)
    else:
        yearly_data, commit_data = dict(), dict()
        DBM.w("User yearly data not needed, skipped.")

    if EM.SHOW_TOTAL_CODE_TIME:
        DBM.i("Adding total code time info...")
        data = await DM.get_remote_json("waka_all")
        stats += f"![Code Time](http://img.shields.io/badge/{quote('Code Time')}-{quote(str(data['data']['text']))}-blue)\n\n"

    if EM.SHOW_PROFILE_VIEWS:
        DBM.i("Adding profile views info...")
        data = GHM.REMOTE.get_views_traffic(per="week")
        stats += f"![Profile Views](http://img.shields.io/badge/{quote(FM.t('Profile Views'))}-{data['count']}-blue)\n\n"

    if EM.SHOW_LINES_OF_CODE:
        DBM.i("Adding lines of code info...")
        total_loc = sum([yearly_data[y][q][d]["add"] for y in yearly_data.keys() for q in yearly_data[y].keys() for d in yearly_data[y][q].keys()])
        data = f"{intword(total_loc)} {FM.t('Lines of code')}"
        stats += f"![Lines of code](https://img.shields.io/badge/{quote(FM.t('From Hello World I have written'))}-{quote(data)}-blue)\n\n"

    if EM.SHOW_SHORT_INFO:
        stats += await get_short_github_info()

    stats += await get_waka_time_stats(repositories, commit_data)

    if EM.SHOW_LANGUAGE_PER_REPO:
        DBM.i("Adding language per repository info...")
        stats += f"{make_language_per_repo_list(repositories)}\n\n"

    if EM.SHOW_LOC_CHART:
        await create_loc_graph(yearly_data, GRAPH_PATH)
        stats += f"**{FM.t('Timeline')}**\n\n{GHM.update_chart('Lines of Code', GRAPH_PATH)}"

    if EM.SHOW_UPDATED_DATE:
        DBM.i("Adding last updated time...")
        stats += f"\n Last Updated on {datetime.now().strftime(EM.UPDATED_DATE_FORMAT)} UTC"

    DBM.g("Stats for README collected!")
    return stats


async def main():
    """
    Application main function.
    Initializes all managers, collects user info and updates README.md if necessary.
    """
    init_github_manager()
    await init_download_manager(GHM.USER.login)
    init_localization_manager()
    DBM.i("Managers initialized.")

    stats = await get_stats()
    if not EM.DEBUG_RUN:
        GHM.update_readme(stats)
        GHM.commit_update()
    else:
        GHM.set_github_output(stats)
    await DM.close_remote_resources()


if __name__ == "__main__":
    init_debug_manager()
    start_time = datetime.now()
    DBM.g("Program execution started at $date.", date=start_time)
    run(main())
    end_time = datetime.now()
    DBM.g("Program execution finished at $date.", date=end_time)
    DBM.p("Program finished in $time.", time=end_time - start_time)
