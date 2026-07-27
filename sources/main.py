"""
Readme Development Metrics With waka time progress
"""

from asyncio import run
from datetime import datetime
from typing import Dict, List, Optional
from urllib.parse import quote

from humanize import intword, naturalsize, intcomma

from manager_download import init_download_manager, DownloadManager as DM
from manager_environment import EnvironmentManager as EM
from manager_github import init_github_manager, GitHubManager as GHM
from manager_file import init_localization_manager, FileManager as FM
from manager_debug import init_debug_manager, DebugManager as DBM
from graphics_chart_drawer import create_loc_graph, GRAPH_PATH
from yearly_commit_calculator import calculate_commit_data
from graphics_list_formatter import (
    make_list,
    make_commit_day_time_list,
    make_language_per_repo_list,
)


def find_category(categories: List[Dict], name: str) -> Optional[Dict]:
    """
    Find a WakaTime category entry (e.g. "AI Coding") by name in a stats response's `categories` list.

    :param categories: List of category dictionaries from a WakaTime stats response.
    :param name: Category name to look for.
    :returns: The matching category dictionary, or None if not found.
    """
    return next((category for category in categories if category["name"] == name), None)


def make_ai_coding_insights(ai_written_percent: float, prompt_length_avg: float, prompts_per_session: float, manual_touch_percent: float) -> str:
    """
    Deduce a few human-readable insight lines from the raw AI coding numbers:
    how AI-reliant the week was, prompting style (length), session style (one-shot vs. follow-ups),
    and how much of the changed code was still touched by hand (a proxy for manual review).
    All tiers are computed purely from ratios already present in the WakaTime response, no extra API calls.

    :param ai_written_percent: Share of added lines written by AI (0-100).
    :param prompt_length_avg: Average prompt length in characters.
    :param prompts_per_session: Average number of prompts per AI session.
    :param manual_touch_percent: Share of all changed lines (additions + deletions) that were human-made (0-100).
    :returns: String representation of the insight lines.
    """
    # Thresholds are heuristic tiers over continuous ratios, not WakaTime-defined categories.
    reliance_label = (
        FM.t("AI Reliance: AI-Driven")
        if ai_written_percent >= 66
        else FM.t("AI Reliance: Balanced") if ai_written_percent >= 33 else FM.t("AI Reliance: Hands-On")
    )
    prompt_style_label = (
        FM.t("Prompt Style: Verbose")
        if prompt_length_avg > 1500
        else FM.t("Prompt Style: Detailed") if prompt_length_avg >= 500 else FM.t("Prompt Style: Concise")
    )
    session_style_label = FM.t("Session Style: Iterative") if prompts_per_session > 1.5 else FM.t("Session Style: One-Shot")
    review_label = FM.t("Review Style: Hands-On Reviewer") if manual_touch_percent >= 50 else FM.t("Review Style: High AI Trust")

    insights = f"🔎 {FM.t('AI Coding Insights')}:\n"
    insights += f"{FM.t('AI Reliance Detail') % (reliance_label, round(ai_written_percent, 2))}\n"
    insights += f"{FM.t('Prompt Style Detail') % (prompt_style_label, intcomma(round(prompt_length_avg)))}\n"
    insights += f"{FM.t('Session Style Detail') % (session_style_label, round(prompts_per_session, 1))}\n"
    insights += f"{FM.t('Review Style Detail') % (review_label, round(manual_touch_percent, 2))}\n"
    return insights


def make_ai_coding_stats(data: Dict) -> str:
    """
    Build the weekly AI coding stats block: AI coding time, AI vs human written lines,
    token usage, estimated AI cost, sessions/prompts, per-model breakdown and deduced insights.
    Renders a "no activity" fallback (instead of hiding the section) if the account has no AI coding data this week.

    :param data: WakaTime weekly stats response (`waka_latest`).
    :returns: String representation of the AI coding stats.
    """
    ai_category = find_category(data["data"].get("categories", []), "AI Coding")
    ai_sessions = data["data"].get("ai_sessions", 0)

    stats = f"🤖 **{FM.t('AI Coding This Week')}** \n\n```text\n"

    if ai_category is None or not ai_sessions:
        stats += f"{FM.t('No AI Coding Activity Tracked This Week')}\n\n"
        return f"{stats[:-1]}```\n\n"

    ai_additions = data["data"].get("ai_additions", 0)
    ai_deletions = data["data"].get("ai_deletions", 0)
    human_additions = data["data"].get("human_additions", 0)
    human_deletions = data["data"].get("human_deletions", 0)
    ai_input_tokens = data["data"].get("ai_input_tokens", 0)
    ai_output_tokens = data["data"].get("ai_output_tokens", 0)
    ai_cost = data["data"].get("ai_model_total_cost", 0)
    ai_prompts = data["data"].get("ai_prompt_events_total", 0)
    prompt_length_avg = data["data"].get("ai_prompt_length_avg", 0)
    prompts_per_session = data["data"].get("ai_prompt_events_avg_per_session", 0)

    total_additions = ai_additions + human_additions
    ai_written_percent = (ai_additions / total_additions * 100) if total_additions else 0

    total_changes = ai_additions + ai_deletions + human_additions + human_deletions
    manual_touch_percent = ((human_additions + human_deletions) / total_changes * 100) if total_changes else 0

    stats += f"⏱ {FM.t('AI Coding Time')}: {ai_category['text']} ({ai_category['percent']}%)\n\n"
    stats += f"✍️ {FM.t('AI vs Human Lines') % (intcomma(ai_additions), intcomma(human_additions), round(ai_written_percent, 2))}\n\n"
    stats += f"🔤 {FM.t('AI Token Usage') % (intcomma(ai_input_tokens), intcomma(ai_output_tokens))}\n\n"
    stats += f"💵 {FM.t('Estimated AI Cost') % f'{ai_cost:.2f}'}\n\n"
    stats += f"🧠 {FM.t('AI Sessions and Prompts') % (ai_sessions, ai_prompts)}\n\n"

    ai_model_breakdown = data["data"].get("ai_model_breakdown", [])
    if ai_model_breakdown:
        total_lines = sum(model["lines"] for model in ai_model_breakdown) or 1
        names = [model["name"] for model in ai_model_breakdown]
        texts = [f"{intcomma(model['lines'])} lines" for model in ai_model_breakdown]
        percents = [round(model["lines"] / total_lines * 100, 2) for model in ai_model_breakdown]
        stats += f"{make_list(names=names, texts=texts, percents=percents)}\n\n"

    stats += f"{make_ai_coding_insights(ai_written_percent, prompt_length_avg, prompts_per_session, manual_touch_percent)}\n"

    return f"{stats[:-1]}```\n\n"


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
    if data is None:
        DBM.p("WakaTime data unavailable!")
        return stats
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

    if EM.SHOW_AI_CODING:
        DBM.i("Adding AI coding stats...")
        stats += make_ai_coding_stats(data)

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
    if data is None:
        DBM.p("GitHub contributions data unavailable!")
        return stats

    DBM.i("Adding contributions info...")
    if len(data["years"]) > 0:
        contributions = FM.t("Contributions in the year") % (
            intcomma(data["years"][0]["total"]),
            data["years"][0]["year"],
        )
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
    if EM.MAX_REPOS > 0:
        DBM.i(f"\tMAX_REPOS enabled: {EM.MAX_REPOS}")
    repositories = await DM.get_remote_graphql(
        "user_repository_list",
        username=GHM.USER.login,
        id=GHM.USER.node_id,
        _max_nodes=(EM.MAX_REPOS if EM.MAX_REPOS > 0 else None),
    )
    if EM.MAX_REPOS > 0:
        DBM.i(f"\tFetched {len(repositories)} repos out of MAX_REPOS={EM.MAX_REPOS}")
    if EM.MAX_REPOS > 0 and len(repositories) >= EM.MAX_REPOS:
        DBM.w(f"\tMAX_REPOS cap reached ({EM.MAX_REPOS}); skipping contributed repos.")
        return repositories[: EM.MAX_REPOS]
    repo_names = [repo["name"] for repo in repositories]
    DBM.g("\tUser repository list collected!")

    remaining = (EM.MAX_REPOS - len(repositories)) if EM.MAX_REPOS > 0 else None
    contributed = await DM.get_remote_graphql("repos_contributed_to", username=GHM.USER.login, _max_nodes=remaining)

    contributed_nodes = [repo for repo in contributed if repo is not None and repo["name"] not in repo_names and not repo["isFork"]]
    DBM.g("\tUser contributed to repository list collected!")

    combined = repositories + contributed_nodes
    if EM.MAX_REPOS > 0:
        if len(combined) < EM.MAX_REPOS:
            DBM.i(f"\tFetched repos < MAX_REPOS ({len(combined)} < {EM.MAX_REPOS}).")
        else:
            DBM.i(f"\tMAX_REPOS reached ({EM.MAX_REPOS}).")
        return combined[: EM.MAX_REPOS]
    return combined


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

    if EM.SHOW_TOTAL_CODE_TIME or EM.SHOW_AI_CODE_TIME:
        DBM.i("Adding total code time info...")
        data = await DM.get_remote_json("waka_all")
        if data is None:
            DBM.p("WakaTime data unavailable!")
        else:
            if EM.SHOW_TOTAL_CODE_TIME:
                stats += (
                    f"![Code Time](http://img.shields.io/badge/{quote('Code Time')}-"
                    f"{quote(str(data['data']['human_readable_total']))}-blue?style={quote(EM.BADGE_STYLE)})\n\n"
                )

            if EM.SHOW_AI_CODE_TIME:
                DBM.i("Adding AI code time info...")
                ai_category = find_category(data["data"].get("categories", []), "AI Coding")
                if ai_category is None:
                    DBM.w("No all-time AI coding data available, skipping AI Code Time badge.")
                else:
                    stats += (
                        f"![AI Code Time](http://img.shields.io/badge/{quote('AI Code Time')}-"
                        f"{quote(str(ai_category['text']))}-blue?style={quote(EM.BADGE_STYLE)})\n\n"
                    )

    if EM.SHOW_PROFILE_VIEWS:
        if EM.DEBUG_RUN or GHM.REMOTE is None:
            DBM.w("Profile views skipped in DEBUG_RUN mode.")
        else:
            DBM.i("Adding profile views info...")
            views_count = 0
            try:
                traffic = GHM.REMOTE.get_views_traffic(per="week")
            except Exception as e:
                DBM.w(f"Profile views unavailable, defaulting to 0: {e}")
            else:
                if isinstance(traffic, dict):
                    views_count = traffic.get("count")
                elif hasattr(traffic, "count"):
                    views_count = getattr(traffic, "count")
                elif isinstance(traffic, (list, tuple)):
                    first = traffic[0] if len(traffic) > 0 else None
                    if isinstance(first, dict):
                        views_count = first.get("count")
                    elif hasattr(first, "count"):
                        views_count = getattr(first, "count")
                    elif isinstance(first, list) and all(hasattr(v, "count") for v in first):
                        views_count = sum(getattr(v, "count") for v in first)
                    elif all(hasattr(v, "count") for v in traffic):
                        views_count = sum(getattr(v, "count") for v in traffic)

                if views_count is None:
                    DBM.w(f"Profile views returned unexpected type ({type(traffic)}), defaulting to 0.")
                    views_count = 0

            stats += f"![Profile Views](http://img.shields.io/badge/" f"{quote(FM.t('Profile Views'))}-{views_count}-blue?style={quote(EM.BADGE_STYLE)})\n\n"

    if EM.SHOW_LINES_OF_CODE:
        DBM.i("Adding lines of code info...")
        total_loc = sum([yearly_data[y][q][d]["add"] for y in yearly_data.keys() for q in yearly_data[y].keys() for d in yearly_data[y][q].keys()])
        data = f"{intword(total_loc, format='%.2f')} {FM.t('Lines of code')}"
        stats += (
            f"![Lines of code](https://img.shields.io/badge/"
            f"{quote(FM.t('From Hello World I have written'))}-{quote(data)}-blue?"
            f"style={quote(EM.BADGE_STYLE)})\n\n"
        )

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
