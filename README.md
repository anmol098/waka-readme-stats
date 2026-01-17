<!--START_SECTION:navbar-->
<div align="center">
  <a href="README.md">🇺🇸 English</a> | <a href="locales/README.de.md">🇩🇪 Deutsch</a> | <a href="locales/README.es.md">🇪🇸 Español</a> | <a href="locales/README.fr.md">🇫🇷 Français</a> | <a href="locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="locales/README.ja.md">🇯🇵 日本語</a> | <a href="locales/README.ko.md">🇰🇷 한국어</a> | <a href="locales/README.pt.md">🇵🇹 Português</a> | <a href="locales/README.ru.md">🇷🇺 Русский</a> | <a href="locales/README.zh.md">🇨🇳 中文</a>  | <a href="locales/README.ne.md">🇳🇵 नेपाली</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Dev Metrics in README with added feature flags 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Awesome README Stats</h3>
</p>

---

<p align="center">
   <img src="https://img.shields.io/badge/language-python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99" alt="Star Badge"/>
</p>

<p align="center">
   Are you an early 🐤 or a night 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   What are the languages that you code in?
   <br/>
   Let's check it out in your profile's README!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bug</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Feature</a>
  </p>

## Prep Work

1. You need to update the markdown file(`.md`) with 2 comments. You can refer [here](#update-your-readme) for updating it.
2. You'll need a WakaTime API Key. You can get that from your WakaTime Account Settings
    - You can refer [here](#new-to-wakatime), if you're new to WakaTime.
3. You'll need a GitHub API Token with `repo` and `user` scope from [here](https://github.com/settings/tokens) if you're running the action to get commit metrics.
   - You can use [this](#profile-repository) example to work it out.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. You need to save the WakaTime API Key and the GitHub API Token in the repository secrets. You can find that in the Settings of your repository. \
  Be sure to save those as the following:
    - WakaTime API Key as `WAKATIME_API_KEY=<your wakatime API Key>`
    - GitHub Personal Access Token (PAT) as `GH_TOKEN=<your github access token>`
5. You can enable and disable feature flags based on your requirements.

This GitHub Action can be set to run at any time you want using `cron`. See [Crontab.guru](https://crontab.guru/) and [this](https://crontab.cronhub.io/) website to generate `cron` expressions.

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` can be replaced by any string specified in the `SECTION_NAME` flag as per [the available flags section](#flags-available).

These lines will be our entry-points for the dev metrics.

## New to WakaTime

WakaTime gives you an idea of the time you really spent on coding. This helps you boost your productivity and competitive edge.

- Head over to <https://wakatime.com> and create an account.
- Get your WakaTime API Key from your [Account Settings in WakaTime](https://wakatime.com/settings/account).
- Install the [WakaTime plugin](https://wakatime.com/plugins) in your favourite editor / IDE.
- Paste in your API key to start the analysis.

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

- Now you can commit and wait for it to run automatically, or you can also trigger to run it to see the result now. Just go to the `Actions` in your repo, select your `Profile Readme Development Stats` workflow and click `Run workflow`. Now wait for a minute or two and you will see your changes.

## Extras

If you want to add the other info to your stats, you can add multiple `FLAGS` in your workflow file. By default all flags are enabled (except the lines of code flag due to the heavy operation performed)

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Flags Available

---

`LOCALE`  This flag can be used to show stats in your language. Default is English. Locale [Short Hand](https://saimana.com/list-of-country-locale-code/) to be passed in the flag variable. Example of the final result can be found [here](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

The `SECTION_NAME` flag can be set to any string, and will be the name of the section to replace in the README.

The `COMMIT_BY_ME` flag can be set to `True` to commit the code using your name and email.

The `COMMIT_MESSAGE` flag can be set for the commit message. The default is "Updated with Dev Metrics"

The `COMMIT_USERNAME` flag can be set as a username to commit the code. The default is "readme-bot".

The `COMMIT_EMAIL` flag can be set to an email to commit the code. The default is "41898282+github-actions[bot]@users.noreply.github.com".

The `SHOW_UPDATED_DATE` flag can be set to `True` to show the updated date in end of paragraph.

The `UPDATED_DATE_FORMAT` flag can be set to put the updated date into a format. The default is `"%d/%m/%Y %H:%M:%S"`.

The `SHOW_LINES_OF_CODE` flag can be set to `True` to show the number of lines of code writen till date.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

The `SHOW_TOTAL_CODE_TIME` flag can be set to `False` to hide *Code Time*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

The `SHOW_PROFILE_VIEWS` flag can be set to `False` to hide **Profile Views**

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

The `SHOW_COMMIT` flag can be set to `False` to hide the commit stats.

**I'm an early 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

The `SHOW_DAYS_OF_WEEK` flag can be set to `False` to hide the commits made on the different days of the week.

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

The `SHOW_LANGUAGE` flag can be set to `False` to hide the programming languages you use.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

The `SHOW_OS` flag can be set to `False` to hide your OS details.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

The `SHOW_PROJECTS` flag can be set to `False` to hide the projects worked on.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

The `SHOW_TIMEZONE` flag can be set to `False` to hide the time zone you are in.

```text
⌚︎ Timezone: Asia/Calcutta
```

The `SHOW_EDITORS` flag can be set to `False` to hide the list of code editors/IDEs used.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

The `SHOW_LANGUAGE_PER_REPO` flag can be set to `False` to hide the number of repositories in different programming languages and frameworks.

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

The `MAX_REPOS` flag can be set to limit how many GitHub repositories are fetched for analysis (default: `0` = unlimited). This can be useful to speed up runs for accounts with many repos.

If you see examples using `MAX_CAP`, that is a deprecated alias for `MAX_REPOS`.

The `WAKATIME_API_URL` flag can be set if you are hosting your own wakatime compliant backend like [wakapi](https://github.com/muety/wakapi). You only have to supply your base url like so `https://your-own-wakapi.dev/api/`

The `SYMBOL_VERSION` flag can be set for the symbol for the progress bar (default: `1`).

| Version | Done block | Empty block |
| ------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

The `DEBUG_LOGGING` flag can be set to increase the GitHub Action's output verbosity, The default is the internal runner's debug property.
The `BADGE_STYLE` flag defines the style for the generated badges and can be set to `flat`, `flat-square`, `plastic`, `for-the-badge`, or `social`.
|    Badge Style    |                                             Preview                                               |
| ----------------- | ------------------------------------------------------------------------------------------------- |
|       `flat`      | ![Badge Style `flat`](https://img.shields.io/badge/Badge-Style-blue?style=flat)                   |
|   `flat-square`   | ![Badge Style `flat-square`](https://img.shields.io/badge/Badge-Style-blue?style=flat-square)     |
|     `plastic`     | ![Badge Style `plastic`](https://img.shields.io/badge/Badge-Style-blue?style=plastic)             |
|  `for-the-badge`  | ![Badge Style `for-the-badge`](https://img.shields.io/badge/Badge-Style-blue?style=for-the-badge) |
|      `social`     | ![Badge Style `social`](https://img.shields.io/badge/Badge-Style-blue?style=social)               |

**Timeline**

![Timeline Chart](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Support the project

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy some ~~beer~~ wine 🍷.

Thanks! :heart:

---

# Contributing

Contributions are welcome ♥!

Please share any features, and add unit tests! Use the pull request and issue systems to contribute.

# Selected Contributors

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [DataBoySu](https://github.com/DataBoySu): Maintainer
4. [okcoder1](https://github.com/ok-coder1): Maintainer
5. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
6. [Prabhat Singh](https://github.com/prabhatdev): For code timeline graph [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): For Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) and [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): For Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): For Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): For Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): For Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): For adding support for natural sentence writing for translation [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- [DataBoySu](https://github.com/DataBoySu)

</details>

- And you! If ever you are using it right now and you are not on the list please tell us by sending a [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue! :blush: \
  We will be glad to add you in the list.

Made with :heart: and Python 🐍.

# Inspired From

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### This project needs a **star** ⭐ from you ♥

## Stargazers over time

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)
