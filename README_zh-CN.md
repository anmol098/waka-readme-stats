> 需要不同语言的翻译 & Locale  [#23](https://github.com/anmol098/waka-readme-stats/issues/23)

# 在 README 中使用 Dev Metrics 来添加个性化内容 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Awesome Readme Stats</h3>
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
   你是早起鸟 🐤 还是夜猫子 🦉？
   <br/>
   你一天中什么时候最有效率？
   <br/>
   你用什么语言编写代码？
   <br/>
   让我们看看你的 Profile README ！
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">报告错误</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">请求新功能</a>
  </p>

## 准备工作

1. 你需要用两条注释更新 markdown 文件(.md)。你可以参考[这里](#更新你的-readme)来更新它。
2. 你需要一个 WakaTime API 密钥。你可以从你的 WakaTime 帐户设置中获得。
   - 如果你不熟悉 WakaTime ，可以参考[这里](#第一次使用-wakatime)
3. 如果你正在运行获取提交指标的操作，你需要从[这里](https://github.com/settings/tokens)获取一个带有 `repo` 和 `user` 作用域的 GitHub API 令牌。
   > 启用 `repo` 作用域似乎**很危险**<br/>
但是这个 GitHub 操作只访问您的提交时间戳和在您贡献的仓库中添加或删除的代码行。
   - 你可以使用[这个](#个人资料仓库)示例来实现
4. 您需要将 WakaTime API 密钥和 GitHub API 令牌保存在仓库密钥中。您可以在仓库的设置中找到它。请确保将它们保存为以下内容。
   - WakaTime API 密钥为`WAKATIME_API_KEY=<您的WakaTime API密钥>`
   - GitHub 个人访问令牌为`GH_TOKEN=<你的GitHub访问令牌>`
5. 您可以根据需要启用和禁用 Flags 。


这个 Action 将在每天 00.00 IST 运行

## 更新你的 README

在你的 `README.md` 中添加注释，像这样：

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` 可以被替换为 `SECTION_NAME` 标志中指定的任何字符串，参见[可用的 Flags](#可用的-flags)

这些行将是我们获取 Dev Metrics 的起点。

## 第一次使用 WakaTime

WakaTime 让您了解您真正花在编码上的时间。这有助于提高你的生产力和竞争优势。

- 去 <https://wakatime.com> 创建一个账户。
- 从您的 [WakaTime 帐户设置](https://wakatime.com/settings/account)获取您的 WakaTime API 密钥。
- 在您最喜欢的编辑器或 IDE 中安装 [WakaTime 插件](https://wakatime.com/plugins)。
- 使用您的 API 密钥以开始分析。

### 个人资料仓库

你需要一个有 `repo` 和 `user` 权限的 [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) 并把它保存在仓库密钥 `GH_TOKEN = <Your GitHub Access Token>`

下面是运行它的工作流文件示例：

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
- 现在你可以提交并等待自动运行，但你也可以触发运行以查看结果。只需转到仓库中的 `Actions` 并选择您的 `Profile Readme Development Stats` 工作流，然后单击 `Run workflow` 。等待一两分钟，您将看到您的更改。

## 附加功能

1. 如果您想将其他信息添加到统计信息中，您可以在工作流文件中添加多个 `FLAGS` 。默认情况下，所有标志都是启用的。
> 除了 lines of code 标志，因为需要执行大量的操作。

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### 可用的 Flags

---

`LOCALE`        此 Flag 可用于在您的语言中显示统计结果，默认是英语，使用 Locale [简写](https://saimana.com/list-of-country-locale-code/)在标志变量中传递最终结果的示例可以在[这里](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)找到

`SECTION_NAME`        此 Flag 可以设置为任何字符串，并且将是 README 中要替换的部分的名称

`COMMIT_BY_ME`        此 Flag 可以设置为 `True` 以使用你的姓名和电子邮件提交代码

`COMMIT_MESSAGE`        此 Flag 可以设置为消息提交，默认为“Updated with Dev Metrics”

`COMMIT_USERNAME`        此 Flag 可以设置为username以提交代码，默认为"github-actions[bot]"

`COMMIT_EMAIL`        此 Flag 可以设置为电子邮件提交代码，默认为"41898282+github-actions[bot]@users.noreply.github.com"

`SHOW_UPDATED_DATE`        此 Flag 可以设置为 `True` 以在段落末尾显示更新的日期

`UPDATED_DATE_FORMAT`        此 Flag 设置以将更新日期转换格式，默认为` "%d/%m/%Y %H:% m:%S" `

`SHOW_LINES_OF_CODE`       此 Flag 可以设置为 `True` 以显示截止日期为止编写的代码行

![Lines of code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME`       此 Flag 可以设置为 `False` 来隐藏 **Code Time**

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS`       此 Flag 可以设置为 `False` 以隐藏 Profile Views

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)


`SHOW_COMMIT`       此 Flag 可以设置为 `False` 以隐藏提交统计信息

**I'm an early 🐤** 
```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK`       此 Flag 可以设置为 `False` ，以隐藏每周不同日期的提交

📅 **I'm Most Productive on Sundays** 

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE`       此 Flag 可以设置为 `False` 来隐藏你使用的编码语言

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```


`SHOW_OS`       此 Flag 可以设置为 `False` 来隐藏操作系统的详细信息

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS`       此 Flag 可以设置为 `False` 以隐藏正在进行的项目

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE`       此 Flag 可以设置为 `False` 来隐藏你所在的时区

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS`        此 Flag 可以设置为 `False` 以隐藏使用的代码编辑器列表

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO`        此 Flag 可以设置为 `False` ，以隐藏不同语言和框架中的存储库数量

**I mostly code in Vue** 

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO`       此 Flag 可以设置为 `False` ，以隐藏用户的简短有趣的事实信息
> 本节需要具有用户权限的个人访问令牌，否则此处显示的数据将是不正确的

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

`SHOW_LOC_CHART`        此 Flag 可以设置为 `False` ，以隐藏在不同年份不同季度编写的代码行

`IGNORED_REPOS`       此 Flag 可以设置为 `"waka-readme-stats, my-first-repo"` （只是一个例子）来忽略一些你不想被统计的仓库

`SYMBOL_VERSION`        此 Flag 可以设置进度条的标志（默认:` 1 `）
| Version |     达到    |     未达到    |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING`       此 Flag 可以设置为增加动作输出的详细程度，默认情况下等于内部运行程序调试属性

**时间线**

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png) 

## :sparkling_heart: 支持这个项目

我几乎开源了所有我能开源的东西，并且我尝试回复每个需要帮助使用这些项目的人。很明显，这需要时间。你可以免费使用这项服务。

然而，如果你正在使用这个项目，并对它感到满意，或者只是想鼓励我继续创建东西，有几个方法可以做到：

- 当您在自述文件上使用此操作时，给予适当的赞扬，并链接回它:D
- Star 和分享项目:rocket:
- [![PayPal. me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) 您可以通过 PayPal 进行一次性捐款。我可能会买点~~啤酒~~葡萄酒🍷

谢谢! :heart:

---

# 贡献

欢迎贡献！♥！请分享任何功能，并添加单元测试！使用 pull request 和 issue 来贡献。

# 特别贡献者

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
4. [Prabhat Singh](https://github.com/prabhatdev): For code timeline graph [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): For Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) and [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): For Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): For Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): For Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): For Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): For adding support for natural sentence writing for translation [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

<details>
<summary>特别提到那些目前正在使他们的 Profile README 更棒的人😄🎉</summary> 

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

  

</details>

- 你！如果您现在正在使用它，而您不在列表上，请通过发送 [Specisl Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) 问题告诉我们:blush:我们很高兴将您添加到列表中。


Made with :heart: and Python 🐍.

# 受启发于

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### 这个项目需要你 ♥ 的一个 **star** ⭐。


## Star 数-时间图

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)
