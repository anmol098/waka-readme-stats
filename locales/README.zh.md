<!--START_SECTION:navbar-->

<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="../locales/README.de.md">🇩🇪 Deutsch</a> | <a href="../locales/README.es.md">🇪🇸 Español</a> | <a href="../locales/README.fr.md">🇫🇷 Français</a> | <a href="../locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="../locales/README.ja.md">🇯🇵 日本語</a> | <a href="../locales/README.ko.md">🇰🇷 한국어</a> | <a href="../locales/README.pt.md">🇵🇹 Português</a> | <a href="../locales/README.ru.md">🇷🇺 Русский</a> | <a href="../locales/README.zh.md">🇨🇳 中文</a>
</div>

<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# 开发指标在README中，并添加了功能标志 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![项目预览](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨项目统计</h3>
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
  你是早鸟 🐤 还是夜猫 🦉？
  <br/>
  你一天中最有效率的时间段是什么时候？
  <br/>
  你用过哪些编程语言？
  <br/>
  让我们在你的个人资料 README 中看看！
</p>

<div align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">报告错误</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">请求功能</a>
</div>

## 准备工作

1. You need to update the markdown file(`.md`) with 2 comments. You can refer [here](#update-your-readme) for updating it.
2. You'll need a WakaTime API Key. You can get that from your WakaTime Account Settings
    - You can refer [here](#new-to-wakatime), if you're new to WakaTime.
3. You'll need a GitHub API Token with `repo` and `user` scope from [here](https://github.com/settings/tokens) if you're running the action to get commit metrics.
   - You can use [this](#profile-repository) example to work it out.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. You need to save the WakaTime API Key and the GitHub API Token in the repository secrets. You can find that in the Settings of your repository. \
  Be sure to save those as the following:
    - WakaTime API Key as `WAKATIME_API_KEY=<your wakatime API Key>`
    - GitHub Personal Access Token (PAT) as `GH_TOKEN=<your github access token>`
2. You can enable and disable feature flags based on your requirements.

This GitHub Action can be set to run at any time you want using `cron`. See [Crontab.guru](https://crontab.guru/) and [this](https://crontab.cronhub.io/) website to generate `cron` expressions.

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

根据 `[可用标志](#flags-available)` 部分，`waka` 可以被 `SECTION_NAME` 标志指定的任何字符串替换。

这些行将成为我们开发指标的入口点。

## 新手使用 WakaTime

WakaTime 能让你了解你真正花在编码上的时间，帮助你提高生产力并获得竞争优势。

- 访问 <https://wakatime.com> 并创建账户。
- 在 WakaTime 的 [账户设置](https://wakatime.com/settings/account) 中获取你的 API 密钥。
- 安装 WakaTime 插件到你喜欢的编辑器/IDE 中。
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

- 现在你可以提交并等待自动运行，或者也可以手动触发运行以立即查看结果。只需前往你的仓库的“操作”部分，选择“Profile Readme 开发统计”工作流程，然后点击“运行工作流程”。稍等一会儿（大约一两分钟），你将看到更改效果。

## 额外信息

如果你想将其他信息添加到统计数据中，可以在工作流文件中添加多个 `FLAGS`。默认情况下，所有标志都启用（除了代码行标志，因为它涉及到大量操作）。

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

`LOCALE` 此标志可用于以您的语言显示统计数据。默认值为英语。请参考 [国家/地区代码列表](https://saimana.com/list-of-country-locale-code/) 来传递标志变量中的简写。示例最终结果可参阅 [此处](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)。

`SECTION_NAME` 标志可以设置为任何字符串，并将作为 README 中要替换的节名称。

`COMMIT_BY_ME` 标志可设置为 `True`，以使用您的名字和电子邮件提交代码。

`COMMIT_MESSAGE` 标志用于提交消息。默认值为 "更新了开发指标"。

`COMMIT_USERNAME` 标志可设置为提交代码的用户名。默认值为 "readme-bot"。

`COMMIT_EMAIL` 标志可设置为提交代码的电子邮件地址。默认值为 "41898282+github-actions[bot]@users.noreply.github.com"。

`SHOW_UPDATED_DATE` 标志可设置为 `True`，以在段落末尾显示更新日期。

`UPDATED_DATE_FORMAT` 标志可用于将更新日期格式化为特定格式。默认值为 `"%d/%m/%Y %H:%M:%S"`。

`SHOW_LINES_OF_CODE` 标志可设置为 `True`，以显示截至日期已编写的代码行数。

![代码行数](https://img.shields.io/badge/从“Hello World”我已编写-130万行代码-blue)

`SHOW_TOTAL_CODE_TIME` 标志可设置为 `False`，以隐藏 *代码时间*。

![代码时间](http://img.shields.io/badge/代码时间-1天4小时54分钟-blue)

`SHOW_PROFILE_VIEWS` 标志可设置为 `False`，以隐藏 **个人资料浏览量**。

![个人资料浏览量](http://img.shields.io/badge/个人资料浏览量-2189次-blue)

`SHOW_COMMIT` 标志可设置为 `False`，以隐藏提交统计数据。

我是一个早期 🐤

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

设置 `SHOW_DAYS_OF_WEEK` 标志为 `False` 可以隐藏按周不同日期的提交。

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

设置 `SHOW_PROJECTS` 标志为 `False` 可隐藏已完成项目。

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

设置 `SHOW_TIMEZONE` 标志为 `False` 可以隐藏你所在的时区。

```text
⌚︎ Timezone: Asia/Calcutta
```

设置 `SHOW_EDITORS` 标志为 `False` 可隐藏显示使用的代码编辑器/IDE 列表。

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

设置 `SHOW_LANGUAGE_PER_REPO` 标志为 `False` 可以隐藏不同编程语言和框架的仓库数量。

我主要用 Vue 编写代码。

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

**🐱 我的 GitHub 数据**

> 🏆 2020 年贡献 433 次
>
> 📦 使用 GitHub 存储空间 292.3 kB
>
> 💼 选择雇佣
>
> 📜 25 个公开仓库
>
> 🔑 15 个私有仓库（所有者）

`SHOW_LOC_CHART` 标志可设置为 `False` 以隐藏不同年份和季度中不同代码行。

`IGNORED_REPOS` 标志可设置为 `"waka-readme-stats, my-first-repo"`（仅示例）以忽略不希望计入的仓库。

`SYMBOL_VERSION` 标志可用于自定义进度条符号（默认：`1`）。

| 版本 | 完成块 | 空白块 |
|------|----------|---------|
|    1  |      █    |       ░   |
|    2  |      ⣿    |       ⣀   |
|    3  |      ⬛   |       ⬜   |

`DEBUG_LOGGING` 标志可设置以增加 GitHub Action 的输出详细程度，默认值与内部运行程序调试属性相同。

**时间线**

![图表未找到](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: 支持项目

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy some ~~beer~~ wine 🍷.

Thanks! :heart:

---

# 贡献指南

欢迎贡献♥！请分享任何功能，并添加单元测试！使用拉取请求和问题系统进行贡献。

# 贡献者选择

* [Anmol Pratap Singh](https://github.com/anmol098): 维护者
* [Alexander Sergeev](https://github.com/pseusys): 维护者
* [Aravind V. Nair](https://github.com/aravindvnair99): 维护者
* [Prabhat Singh](https://github.com/prabhatdev): 用于代码时间线图 [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
* [Hedy Li](https://github.com/hedythedev): 用于拉取请求 [#34](https://github.com/anmol098/waka-readme-stats/pull/34) 和 [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
* [Pedro Torres](https://github.com/Corfucinas): 用于拉取请求 [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
* [Aaron Meese](https://github.com/ajmeese7): 用于拉取请求 [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
* [Arnav Jindal](https://github.com/Daggy1234): 用于拉取请求 [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
* [Daniel Rowe](https://github.com/DanRowe): 用于拉取请求 [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
* [Ss5h](https://github.com/tlatkdgus1): 添加自然句子写作支持翻译 [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- 你呢！如果你正在使用它，但尚未在列表中，请通过发送 [特殊提及](https://github.com/anmol098/waka-readme-stats/issues/new/choose) 问题告诉我们！😊 我们很乐意将你添加到列表中。

用 ❤️ 和 Python 🐍 编写。

# 灵感来源

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists)
>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### 这个项目需要你给它一个 **星标** 🌟

## 随时间变化的关注者数量

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

