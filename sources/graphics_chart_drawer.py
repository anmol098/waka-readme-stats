from typing import Dict

from numpy import arange, array, add, amax, zeros
import matplotlib.patches as mpatches
import matplotlib.pyplot as plt

from manager_download import DownloadManager as DM
from manager_file import FileManager as FM


MAX_LANGUAGES = 5  # Number of top languages to add to chart, for each year quarter
GRAPH_PATH = f"{FM.ASSETS_DIR}/bar_graph.png"  # Chart saving path.


async def create_loc_graph(yearly_data: Dict, save_path: str):
    """
    Draws graph of lines of code written by user by quarters of years.
    Picks top `MAX_LANGUAGES` languages from each quarter only.

    :param yearly_data: GitHub user yearly data.
    :param save_path: Path to save the graph file.
    """
    colors = await DM.get_remote_yaml("linguist")

    years = len(yearly_data.keys())
    year_indexes = arange(years)

    languages_all_loc = dict()
    for i, y in enumerate(sorted(yearly_data.keys())):
        for q in yearly_data[y].keys():
            langs = sorted(yearly_data[y][q].keys(), key=lambda n: yearly_data[y][q][n]["add"] + yearly_data[y][q][n]["del"], reverse=True)[0:MAX_LANGUAGES]

            for lang in langs:
                if lang not in languages_all_loc:
                    languages_all_loc[lang] = zeros((years, 4, 2), dtype=int)
                languages_all_loc[lang][i][q - 1] = array([yearly_data[y][q][lang]["add"], yearly_data[y][q][lang]["del"]])

    fig = plt.figure()
    ax = fig.add_axes([0, 0, 1.5, 1])

    language_handles = []
    cumulative = zeros((years, 4, 2), dtype=int)

    for key, value in languages_all_loc.items():
        color = colors[key].get("color", "tab:gray")
        language_handles += [mpatches.Patch(color=color, label=key)]

        for quarter in range(4):
            ax.bar(year_indexes + quarter * 0.21, value[:, quarter][:, 0], 0.2, bottom=cumulative[:, quarter][:, 0], color=color)
            ax.bar(year_indexes + quarter * 0.21, -value[:, quarter][:, 1], 0.2, bottom=-cumulative[:, quarter][:, 1], color=color)
            cumulative[:, quarter] = add(cumulative[:, quarter], value[:, quarter])
    ax.axhline(y=0.5, lw=0.5, snap=True, color="k")

    ax.set_ylabel("LOC added", fontdict=dict(weight="bold"))
    ax.set_xticks(array([arange(i, i + 0.84, step=0.21) for i in year_indexes]).flatten(), labels=["Q1", "Q2", "Q3", "Q4"] * years)

    sax = ax.secondary_xaxis("top")
    sax.set_xticks(year_indexes + 0.42, labels=sorted(yearly_data.keys()))
    sax.spines["top"].set_visible(False)

    ax.legend(title="Language", handles=language_handles, loc="upper left", bbox_to_anchor=(1, 1), framealpha=0, title_fontproperties=dict(weight="bold"))

    sax.tick_params(axis="both", length=0)
    sax.spines["top"].set_visible(False)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    max_offset = 0.05 * amax(cumulative.flatten())
    joined = cumulative.reshape(-1, cumulative.shape[-1])
    max_additions = amax(joined[:, 0])
    max_deletions = amax(joined[:, 1])
    plt.ylim(top=max_additions + max_offset, bottom=-max_deletions - max_offset)

    plt.savefig(save_path, bbox_inches="tight")
    plt.close(fig)
