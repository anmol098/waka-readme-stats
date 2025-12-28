<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!重要]
> 我们正在寻找本项目的翻译人员。
> 任何帮助都会受到高度重视。
> 请参阅问题 <https://github.com/anmol098/waka-readme-stats/issues/23> 如果您想提供帮助！

# 开发指标在 README 中，添加了功能标志 🎌

![项目预览](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<div align="center">

![项目预览](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

</div>

# 📌✨ 项目统计

----

<p align="center">
   <img src="https://img.shields.io/badge/编程语言-Python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%E7%87%A2%E4%B9%9F&message=有用%3F&style=flat&color=BC4E99" alt="星标"/>
</p>

<p align="center">
   你是早起的鸟儿（🐤）还是夜猫子（🦉）？
   <br/>
   你一天中最有效率的时间段是什么时候？
   <br/>
   你主要使用哪些编程语言？
   <br/>
   让我们在你的个人资料 README 中看看！
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">报告错误</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">请求功能</a>
</p>

## 准备工作

1. 你需要更新 Markdown 文件（`.md`），并在其中添加两个注释。你可以参考 [这里](#update-your-readme) 进行更新。
2. 你需要一个 WakaTime API 密钥。你可以在 WakaTime 账户设置中获取它。
   - 如果你是 WakaTime 新手，可以参考 [这里](#new-to-wakatime)。
3. 如果你要运行获取提交指标的操作，则需要从 [GitHub 设置](https://github.com/settings/tokens) 中获取 GitHub API 令牌，并确保具有 `repo` 和 `user` 权限。
   - 你可以使用 [此示例](#profile-repository) 来完成操作。

> [!注意]
> 启用 `repo` 权限可能 **危险**，
> 但此 GitHub 操作仅访问你贡献的仓库中的提交时间戳和添加或删除的代码行数。

1. 你需要在仓库设置中保存 WakaTime API 密钥和 GitHub API 令牌。在仓库设置中找到“机密”部分。
   - 将 WakaTime API 密钥保存为 `WAKATIME_API_KEY=<你的 WakaTime API 密钥>`。
   - 将 GitHub 个人访问令牌（PAT）保存为 `GH_TOKEN=<你的 GitHub 访问令牌>`。
2. 根据需求，你可以启用和禁用功能开关。

可以根据需要使用 `cron` 来设置 GitHub 操作的运行时间。参考 [Crontab.guru](https://crontab.guru/) 和 [此网站](https://crontab.cronhub.io/) 生成 `cron` 表达式。

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` 可以根据 `SECTION_NAME` 标志中的任何指定字符串进行替换，详见[可用标志](#flags-available)部分。

这些行将成为我们开发指标的入口点。

## 新手使用 WakaTime

WakaTime 能让你了解你实际花在编码上的时间，帮助你提高生产力并提升竞争力。

- 访问 <https://wakatime.com> 并创建账户。
- 在 WakaTime 账户设置中获取你的 API 密钥 [WakaTime 账户设置](https://wakatime.com/settings/account)。
- 在你喜欢的编辑器/IDE 中安装 WakaTime 插件 [WakaTime 插件](https://wakatime.com/plugins)。
- 将 API 密钥粘贴进去开始分析。

### Profile Repository

You'll need to get a [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) with a `repo` and `user` scope and save it in the Repo Secrets `GH_TOKEN = <Your GitHub Access Token>`

Here is a sample workflow File for running it:

```yml
name: Waka Readme

on:
  schedule:
    # Runs at 12am IST
    - cron: '30 18 * * *'
  workflow_dispatch:
jobs:
  update-readme:
    name: Update Readme with Metrics
    runs-on: ubuntu-latest
    steps:
      - uses: anmol098/waka-readme-stats@master
        with:
          WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

- 现在你可以提交并等待自动运行，或者也可以触发运行以立即查看结果。只需前往你仓库的“操作”>选择“Profile Readme Development Stats”工作流>点击“运行工作流”。等待一分钟左右，你将看到更改。

## 额外信息

如果您想将其他信息添加到统计数据中，可以在工作流程文件中添加多个 `FLAGS`。默认情况下，所有标志都启用（除了代码行标志，因为它涉及到大量操作）。

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### 可用标志

---

`LOCALE`  此标志可用于以您的语言显示统计数据。默认值为英语。请通过标志变量传递国家/地区代码 [简写](https://saimana.com/list-of-country-locale-code/)。示例最终结果可参考 [此处](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)。

`SECTION_NAME`  可以设置为任何字符串，并将成为 README 中要替换的节名称。

`COMMIT_BY_ME`  可以设置为 `True`，以使用您的姓名和电子邮件提交代码。

`COMMIT_MESSAGE`  用于提交消息。默认值为“更新了开发指标”。

`COMMIT_USERNAME`  可以设置为提交代码的用户名。默认值为“readme-bot”。

`COMMIT_EMAIL`  可以设置为提交代码的电子邮件。默认值为“41898282+github-actions[bot]@users.noreply.github.com”。

`SHOW_UPDATED_DATE`  可以设置为 `True`，以在段落末尾显示更新日期。

`UPDATED_DATE_FORMAT`  可以设置以将更新日期格式化为指定格式。默认值为`"%d/%m/%Y %H:%M:%S"`。

`SHOW_LINES_OF_CODE`  可以设置为 `True`，以显示至今日期已编写的代码行数。

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` 标志可以设置为 `False` 以隐藏 *代码时间*。

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` 标志可以设置为 `False` 以隐藏 **Profile Views**。

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` 标志可以设置为 `False` 以隐藏提交统计信息。

**我是一个早期用户**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` 标志可以设置为 `False` 以隐藏不同工作日做的提交。

📅 **我周日最有效率**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

设置 `SHOW_LANGUAGE` 标志为 `False` 可以隐藏您使用的编程语言。

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

设置 `SHOW_OS` 标志为 `False` 可以隐藏您的操作系统细节。

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` 标志可以设置为 `False` 以隐藏已完成的工作项目。

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` 标志可以设置为 `False` 以隐藏您所在的时区。

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` 标志可以设置为 `False` 以隐藏使用的代码编辑器/IDE 列表。

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` 标志可以设置为 `False` 以隐藏不同编程语言和框架中仓库的数量。

**我主要使用 Vue 进行编码**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

The `SHOW_SHORT_INFO` flag can be set to `False` to hide the short fun fact info of a user.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 My GitHub Data**

> 🏆 433 Contributions in year 2020
 >
> 📦 Used 292.3 kB in GitHub's Storage
 >
> 💼 Opted to Hire
 >
> 📜 25 Public Repository
 >
> 🔑 15 Owned Private Repository

The `SHOW_LOC_CHART` flag can be set to `False` to hide the lines of code written in different quarters of different years.

The `IGNORED_REPOS` flag can be set to `"waka-readme-stats, my-first-repo"` (just an example) to ignore some repos you don’t want to be counted.

The `SYMBOL_VERSION` flag can be set for the symbol for the progress bar (default: `1`).

| Version | Done block | Empty block |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

The `DEBUG_LOGGING` flag can be set to increase the GitHub Action's output verbosity, by default equals internal runner debug property

**Timeline**

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :心形火花: 支持项目

我尽可能开源我所能开发的一切，并努力回复使用这些项目的每个人。显然，这需要时间。你可以免费使用这个服务。

然而，如果你在使用这个项目并感到满意，或者只是想鼓励我继续创造东西，有几种方式可以做到：

- 在你的 README 中正确引用并链接到这个项目：D
- 收藏并分享项目：火箭
-  **[PayPal](https://www.paypal.me/aapreneur)** - 一次性通过 PayPal 捐款。我可能会买一些 ~~啤酒~~ 葡萄酒 🍷。

感谢！：心：

# 贡献

贡献非常欢迎♥！请分享任何功能，并添加单元测试！使用拉取请求和问题系统进行贡献。

# 选定贡献者

1. [Anmol Pratap Singh](https://github.com/anmol098)：维护者
2. [Alexander Sergeev](https://github.com/pseusys)：维护者
3. [Aravind V. Nair](https://github.com/aravindvnair99)：维护者
4. [Prabhat Singh](https://github.com/prabhatdev)：为代码时间线图贡献 [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev)：为拉取请求 [#34](https://github.com/anmol098/waka-readme-stats/pull/34) 和 [#23](https://github.com/anmol098/waka-readme-stats/pull/23) 贡献
6. [Pedro Torres](https://github.com/Corfucinas)：为拉取请求 [#29](https://github.com/anmol098/waka-readme-stats/pull/29) 贡献
7. [Aaron Meese](https://github.com/ajmeese7)：为拉取请求 [#45](https://github.com/anmol098/waka-readme-stats/pull/45) 贡献
8. [Arnav Jindal](https://github.com/Daggy1234)：为拉取请求 [#48](https://github.com/anmol098/waka-readme-stats/pull/48) 贡献
9. [Daniel Rowe](https://github.com/DanRowe)：为拉取请求 [#57](https://github.com/anmol098/waka-readme-stats/pull/57) 贡献
10. [Ss5h](https://github.com/tlatkdgus1)：为自然句子写作的翻译支持添加 [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

<details>

<summary>Special mention for those who are currently making their profile readme more awesome :smile: :tada:</summary>

- [Stanislas](https://github.com/angristan)
  
- [Pratik Kumar](https://github.com/pr2tik1)
  
- [Vladimir](https://github.com/sergeev-vn)

- [Pedro Torres](https://github.com/Corfucinas)
  
- [leverglowh](https://github.com/leverglowh)
  
- [patdc](https://github.com/patdc)
  
- [极客挖掘机](https://github.com/meteor1993)
  
- [Fan()](https://github.com/Fanduzi)
  
- [Miller Camilo Vega](https://github.com/minoveaz)
  
- [XLor](https://github.com/yjl9903)
  
- [Jesse Okeya](https://github.com/jesseokeya)
  
- [anaiel](https://github.com/anaiel)
  
- [Dipto Mondal](https://github.com/diptomondal007)
  
- [Jerry F. Zhang](https://github.com/JerryFZhang)
  
- [Karan Singh](https://github.com/karan06126)
  
- [Erwin Lejeune](https://github.com/guilyx)
  
- [Manuel Cepeda](https://github.com/mecm1993)
  
- [Jonathan S](https://github.com/TGTGamer)
  
- [Tsotne Gvadzabia](https://github.com/RockiRider)
  
- [Miray](https://github.com/MirayXS)
  
- [Varad Patil](https://github.com/varadp2000)
  
- [Prabhat Singh](https://github.com/prabhatdev)
  
- [Nikhil](https://github.com/nikhilgorantla)
  
- [大白](https://github.com/2720851545)
  
- [Du Yizhuo](https://github.com/dyzdyz010)
  
- [Manas Talukdar](https://github.com/manastalukdar)
  
- [Simranjeet Singh](https://github.com/smrnjeet222)
  
- [Aaron Meese](https://github.com/ajmeese7)
  
- [Prasad Narkhede](https://github.com/p014ri5)
  
- [Manish Kushwaha](https://github.com/tzmanish)
  
- [Hedy Li](https://github.com/hedythedev)
  
- [SHIMIZU Taku](https://github.com/takuan-osho)
  
- [Jude Wilson](https://github.com/mr-winson)
  
- [Daniel Rowe](https://github.com/DanRowe)
  
- [Muhammad Hassan Ahmed](https://github.com/hassan11196)
  
- [Alessandro Maggio](https://github.com/Tkd-Alex)
  
- [Siddharth Gupta](https://github.com/siddg97)
  
- [Dev-Mehta](https://github.com/Dev-Mehta/)
  
- [> EdgyCoder ✌](https://github.com/edgycoder)
  
- [Korel Kashri](https://github.com/korelkashri)
  
- [Gustavo Barbosa](https://github.com/gusbdev)

- [eagleanurag](https://github.com/eagleanurag)
  
- [Aravind V. Nair](https://github.com/aravindvnair99)
  
- [Raman Preet Singh](https://github.com/raman08)
  
- [Hayat Tamboli](https://github.com/hayat-tamboli)
  
- [Henry Boisdequin](https://github.com/henryboisdequin)

- [Raman Preet Singh](https://github.com/raman08)
  
- [Aadit Kamat](https://github.com/aaditkamat)

- [Subhalingam D](https://github.com/subhalingamd)
  
- [Adil Akhmetov](https://github.com/weeebdev)
  
- [Isaac Maldonado](https://github.com/einjunge99)
  
- [Syed Faateh Sultan Kazmi](https://github.com/faatehsultan)

- [Shreyam Maity](https://github.com/ShreyamMaity)

- [Sufiane](https://github.com/sufiane)

- [Muhammad Bilal](https://github.com/BilalJaved15)

- [Waterdev](https://github.com/UnrealValentin)
  
- [Aditya Prasad S](https://github.com/adityaprasad502)
  
- [C. Vinicius Santos](https://github.com/c-viniciussantos)
  
- [James Tufarelli](https://github.com/Minituff)
  
- [Muhammad Bilal](https://github.com/BilalJaved15)

- [Wyatt Walsh](https://www.github.com/wyattowalsh)

- [Nithin Balaji](https://github.com/thenithinbalaji)

- [John Cortés](https://github.com/johncortes117)

- [Taha Parker](https://github.com/tahayparker/)

- [Yang An Yi](https://github.com/yanganyi)

- [Mamdud Hasan](https://github.com/n8fury)

- [Satyam Vyas](https://github.com/SatyamVyas04)

- [Yash Naravade](https://github.com/yashnaravade)

- [Luicen Loua](https://github.com/lucien-loua)

</details>

- 还有你！如果你此刻正在使用它，但并未在列表中，请通过发送 [特殊提及](https://github.com/anmol098/waka-readme-stats/issues/new/choose) 问题告诉我们！：脸红：我们很乐意将你添加到列表中。

用 :heart: 和 Python 🐍 打造。

# 灵感来源

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists)
> [athul/waka-readme](https://github.com/athul/waka-readme)

### 这个项目需要你给它一个 **星标** ⭐

## 随着时间的星标数量变化

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

