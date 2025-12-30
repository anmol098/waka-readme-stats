<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# README 中的 Dev Metrics 与新增功能标志 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Awesome README Stats</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/language-python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99" alt="Star Badge"/>
</p>

<p align="center">
   你是一个早起的 🐤 还是夜猫子 🦉？
   <br/>
   你一天中什么时候最高效？
   <br/>
   你使用哪些编程语言？
   <br/>
   来看看你的个人资料的 README 吧！
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bug</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Feature</a>
  </p>

## 准备工作

1. 你需要更新 markdown 文件(`.md`) 中的 2 条注释。你可以参考 [这里](#update-your-readme) 来更新它。
2. 你需要一个 WakaTime API 密钥。你可以在 WakaTime 账户设置中获取它
    - 如果你是 WakaTime 的新用户，可以参考 [这里](#new-to-wakatime)。
3. 如果你运行操作来获取提交指标，你需要一个具有 `repo` 和 `user` 范围的 GitHub API 令牌，可以从 [这里](https://github.com/settings/tokens) 获取。
   - 你可以使用 [这个](#profile-repository) 示例来解决它。

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. 你需要将 WakaTime API Key 和 GitHub API Token 保存在仓库的 secrets 中。你可以在仓库的 Settings 中找到它们。 \
  确保将它们保存为以下格式：
    - WakaTime API Key 作为 `WAKATIME_API_KEY=<your wakatime API Key>`
    - GitHub 个人访问令牌 (PAT) 作为 `GH_TOKEN=<your github access token>`
2. 你可以根据你的需求启用或禁用功能标志。

此 GitHub Action 可以使用 `cron` 在你想要的任何时间运行。查看 [Crontab.guru](https://crontab.guru/) 和 [this](https://crontab.cronhub.io/) 网站来生成 `cron` 表达式。

## 更新你的 Readme

向你的 `README.md` 添加一个注释，如下所示：

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` 可以被替换为 `SECTION_NAME` 标志中指定的任何字符串，详见 [可用标志部分](#flags-available)。

这些行将是我们的开发指标入口点。

## 新手入门 WakaTime

WakaTime 可帮助您了解实际用于编码的时间。这有助于提高您的工作效率和竞争优势。

- 前往 <https://wakatime.com> 并创建一个账户。
- 从 WakaTime 的 [账户设置](https://wakatime.com/settings/account) 获取您的 WakaTime API 密钥。
- 在您最喜欢的编辑器 / IDE 中安装 [WakaTime 插件](https://wakatime.com/plugins)。
- 粘贴您的 API 密钥以开始分析。

### Profile Repository

您需要获取一个具有 `repo` 和 `user` 范围的 [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)，并将其保存在 Repo Secrets `GH_TOKEN = <Your GitHub Access Token>`

以下是一个运行它的示例工作流程文件：

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

- 现在你可以提交并等待其自动运行，或者你也可以现在触发运行以查看结果。只需前往你仓库中的 `Actions`，选择你的 `Profile Readme Development Stats` 工作流程并点击 `Run workflow`。现在等待一两分钟，你将会看到你的更改。

## Extras

如果你想在你的统计信息中添加其他信息，可以在工作流文件中添加多个 `FLAGS`。默认情况下所有标志都是启用的（除了代码行数标志，由于执行了繁重的操作）。

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

`LOCALE` 该标志可用于以您的语言显示统计信息。默认为英文。在标志变量中传递 Locale 的 [简写](https://saimana.com/list-of-country-locale-code/)。最终结果的示例可在此处找到 [here](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

`SECTION_NAME` 标志可以设置为任何字符串，并将替换 README 中的章节名称。

`COMMIT_BY_ME` 标志可以设置为 `True`，以使用您的姓名和电子邮件提交代码。

`COMMIT_MESSAGE` 标志可以设置为提交信息。默认为 "Updated with Dev Metrics"

`COMMIT_USERNAME` 标志可以设置为用户名以提交代码。默认为 "readme-bot"。

`COMMIT_EMAIL` 标志可以设置为电子邮件以提交代码。默认为 "41898282+github-actions[bot]@users.noreply.github.com"。

`SHOW_UPDATED_DATE` 标志可以设置为 `True`，以在段落末尾显示更新日期。

`UPDATED_DATE_FORMAT` 标志可以设置为将更新日期格式化。默认为 `"%d/%m/%Y %H:%M:%S"`。

`SHOW_LINES_OF_CODE` 标志可以设置为 `True`，以显示到目前为止编写的代码行数。

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` 标志可以设置为 `False` 以隐藏 *Code Time*。

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` 标志可以设置为 `False` 以隐藏 **Profile Views**

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` 标志可以设置为 `False` 以隐藏提交统计信息。

**我是一个早期的 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` 标志可以设置为 `False` 以隐藏一周中不同日子的提交。

📅 **我最高效的是在周日**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` 标志可以设置为 `False` 以隐藏您使用的编程语言。

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` 标志可以设置为 `False` 以隐藏您的操作系统详细信息。

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` 标志可以设置为 `False` 以隐藏所参与的项目。

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

`SHOW_EDITORS` 标志可以设置为 `False` 以隐藏所使用的代码编辑器/IDE 列表。

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` 标志可以设置为 `False` 以隐藏不同编程语言和框架中的仓库数量。

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

`SHOW_SHORT_INFO` 标志可以设置为 `False` 以隐藏用户的简短趣味信息。

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 我的 GitHub 数据**

> 🏆 2020 年 433 次贡献
 >
> 📦 使用了 GitHub 存储空间 292.3 kB
 >
> 💼 选择雇佣
 >
> 📜 25 个公开仓库
 >
> 🔑 15 个私有仓库

`SHOW_LOC_CHART` 标志可以设置为 `False` 以隐藏不同年份不同季度编写的代码行数。

`IGNORED_REPOS` 标志可以设置为 `"waka-readme-stats, my-first-repo"`（仅作为示例）以忽略一些您不想计入统计的仓库。

`SYMBOL_VERSION` 标志可以设置为进度条的符号（默认：`1`）。

| 版本 | 已完成块 | 空块 |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING` 标志可以设置为增加 GitHub Action 的输出详细程度，默认等于内部运行器调试属性

**时间线**

![图表未找到](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: 支持该项目

我尽可能开源所有内容，并努力回复所有需要帮助的人。显然，
这需要时间。你可以免费使用此服务。

然而，如果你正在使用此项目并且喜欢它，或者只是想鼓励我继续创造，你可以通过以下几种方式支持我 ：-

- 在你的 readme 中使用此操作时给予适当的署名，并链接回它 :D
- 给项目加星并分享 :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - 你可以通过 PayPal 进行一次性捐赠。我可能会买一些 ~~啤酒~~ 葡萄酒 🍷。

谢谢！:heart:

---

# 贡献

欢迎贡献 ♥! 请分享任何功能，并添加单元测试! 使用拉取请求和问题系统进行贡献。

# 选定的贡献者

1. [Anmol Pratap Singh](https://github.com/anmol098): 维护者
2. [Alexander Sergeev](https://github.com/pseusys): 维护者
3. [Aravind V. Nair](https://github.com/aravindvnair99): 维护者
4. [Prabhat Singh](https://github.com/prabhatdev): 为代码时间线图表 [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): 为 Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) 和 [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): 为 Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): 为 Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): 为 Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): 为 Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): 为添加支持自然句子写作用于翻译 [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- 而你！如果你现在正在使用它但不在列表中，请通过发送一个 [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) 问题告诉我们！:blush: \
  我们将很高兴将你添加到列表中。

用 :heart: 和 Python 🐍 制作。

# Inspired From

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### 这个项目需要你给一个 **star** ⭐ ♥

## 随时间变化的 Stargazers 数量

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

