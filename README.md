<!--START_SECTION:navbar-->
<div align="center">
  <a href="README.md">🇺🇸 English</a> | <a href="locales/README.de.md">🇩🇪 Deutsch</a> | <a href="locales/README.es.md">🇪🇸 Español</a> | <a href="locales/README.fr.md">🇫🇷 Français</a> | <a href="locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="locales/README.ja.md">🇯🇵 日本語</a> | <a href="locales/README.ko.md">🇰🇷 한국어</a> | <a href="locales/README.pt.md">🇵🇹 Português</a> | <a href="locales/README.ru.md">🇷🇺 Русский</a> | <a href="locales/README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Dev Metrics in README with added feature flags 🎌

<p align="center">
  <picture>
    <source
      srcset="https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
    />
    <source
      srcset="https://github.com/user-attachments/assets/984f227c-b331-425d-9d34-15a8414dc11d"
      media="(prefers-color-scheme: dark)"
    />
    <img title="Project Preview" alt="Project Preview" src="https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png">
  </picture>
</p>

<p align="center">
  <picture>
    <source
      srcset="https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
    />
    <source
      srcset="https://github.com/user-attachments/assets/2133b6bb-7c3e-4f94-9381-1e41379378b3"
      media="(prefers-color-scheme: dark)"
    />
    <img title="Project Preview" alt="Project Preview" src="https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png">
  </picture>
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
   Are you an early bird 🐤 or a night owl 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   What are the languages that you code in?
   <br/>
   Check it out in your profile's README!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bugs</a> · <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Features</a>
  </p>

## Prep Work

1. You need to update the README Markdown file (`README.md`) with 2 comments. You can refer to [Updating your README](#update-your-readme) for updating it.
2. You'll need a WakaTime API Key. You can get that from your WakaTime Account Settings.
    - Please refer to [New to WakaTime](#new-to-wakatime), if you're new to WakaTime.
3. You'll need a GitHub API Token with `repo` and `user` scope from [here](https://github.com/settings/tokens) if you're running the action to get commit metrics.
   - You can use [this](#profile-repository) example to work it out.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. You need to save the WakaTime API Key and the GitHub API Token in the repository secrets. You can find that in the Settings of your repository. \
  Be sure to save those as the following:
    - WakaTime API Key as `WAKATIME_API_KEY=<Your WakaTime API Key>`
    - GitHub Personal Access Token (PAT) as `GH_TOKEN=<Your GitHub Personal Access Token>`
5. You can enable and disable feature flags based on your requirements.

This GitHub Action can be set to run at any time you want using `cron`. See [Crontab.guru](https://crontab.guru/) and [this website](https://crontab.cronhub.io/) to generate `cron` expressions.

## Update your README

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` can be replaced by any string specified in the `SECTION_NAME` flag as per [Available Flags](#available-flags).

These lines will be our entry-points for the dev metrics.

## New to WakaTime

WakaTime gives you an idea of the time you really spent on coding. This helps you boost your productivity and competitive edge.

- Head over to <https://wakatime.com> and create an account.
- Get your WakaTime API Key from your [Account Settings in WakaTime](https://wakatime.com/settings/account).
- Install the [WakaTime plugin](https://wakatime.com/plugins) in your favourite editor / IDE.
- Paste in your API key to start the analysis.

### Profile Repository

You'll need to get a [GitHub Personal Access Token (PAT)](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) with the `repo` and `user` scopes and save it in the repository's secrets as `GH_TOKEN`.

Here is a sample workflow for running it:

```yml title="update-readme.yml"
name: Waka Readme

on:
  schedule:
    # Runs at 12 AM IST
    - cron: '30 18 * * *'
    # Runs at 12 AM UTC
    - cron: '0 0 * * *'
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

- Now you can commit and wait for it to run automatically, or you can also trigger to run it to see the result now. Just go to the `Actions` in your repo, select your `Profile Readme Development Stats` workflow and click `Run workflow`. Now wait for a minute or two and you will see your statistics added to your README.

## Extras

If you want to add the other info to your stats, you can add multiple [flags](#available-flags) in your workflow. By default, all flags are enabled (except the lines of code flag due to the heavy operation performed).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

## Available Flags

|    Flag           |                                                                               Description                                                                      |  Default                                            | Example |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|---------|
| `LOCALE`          | This flag can be used to show stats in your language. Locale [Short Hand](https://saimana.com/list-of-country-locale-code/) to be passed in the flag variable. | `en` (English)                                      | [Example](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)                                                                                                                                                                                      |
| `WAKATIME_API_URL`| This flag can be set if you are hosting your own wakatime compliant backend like [wakapi](https://github.com/muety/wakapi).                                    | `https://wakatime.com/api/v1/`                      | `https://your-own-wakapi.dev/api/v1/`                                                                                                                                                                                                                |
| `SECTION_NAME`    | This flag can be set to any string, and will be the name of the section to replace in the README.                                                              | `waka`                                              | N/A     |
| `COMMIT_BY_ME`    | This flag can be set to `True` to commit the code using your name and email.                                                                                   | `False`                                             | N/A     |
| `COMMIT_MESSAGE`  | This flag can be set for the commit message.                                                                                                                   | `Updated with Dev Metrics`                          | <img title="Updated with Dev Metrics" src="https://github.com/user-attachments/assets/54cf4304-6f96-4a34-a94a-dea7db7859f7" />                                                                                                                            |
| `COMMIT_USERNAME` | This flag can be set as a username to commit the code.                                                                                                         | `readme-bot`                                        | `waka-stats`                                                                                                                                                                                                                                               |
| `COMMIT_EMAIL`    | This flag can be set to an email to commit the code.                                                                                                           | `41898282+github-actions[bot]@users.noreply.github.com` | N/A |
| `SHOW_UPDATED_DATE` | This flag can be used to show the updated date in end of paragraph.                                                                                          | `True`                                                  | <img title="Show updated date" alt="Show updated date" src="https://github.com/user-attachments/assets/e3a9d332-6f63-4d05-b521-029bbb1b6a62" />                                           | `True`                                                  |     |
| `UPDATED_DATE_FORMAT` | This flag can be set to put the updated date into a format.                                                                                                | `%d/%m/%Y %H:%M:%S`                                     | `%m/%d/%y %H:%M`                                                                                                                                                                                                                                     |
| `SHOW_LINES_OF_CODE`  | This flag can be used to show the number of lines of code writen till date.                                                                                | `False`                                                 | ![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)                                                                                                                           |
| `SHOW_TOTAL_CODE_TIME` | This flag can be used to show **Code Time**.                                                                                                              | `True`                                                  | ![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)                                                                                                                                                                  |
| `SHOW_PROFILE_VIEWS`   | This flag can be used to show **Profile Views**.                                                                                                          | `True`                                                  | ![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)                                                                                                                                                                               |
| `SHOW_COMMIT`          | This flag can be used to show the commit stats.                                                                                                           | `True`                                                  | **I'm an early 🐤** <br> <pre> 🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% <br> 🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% <br> 🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% <br> 🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%</pre>                                                                                                                                                                                    |
| `SHOW_DAYS_OF_WEEK`    | This flag can be used to show the commits made on different days of the week.                                                                             | `True`                                                  | 📅 **I'm Most Productive on Sundays** <br> <pre> Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% <br> Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% <br> Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% <br> Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% <br> Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% <br> Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% <br> Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%</pre>                                                                                                                                                                                                             |
| `SHOW_LANGUAGE`        | This flag can be used to show what programming languages you use.                                                                                         | `True`                                                  | <img width="1033" height="169" alt="Screen Shot 2026-01-16 at 11 12 45 PM" src="https://github.com/user-attachments/assets/5b7e8a93-0577-4b2e-a90c-b03ff8402f8d" />                                                                                       |
| `SHOW_OS`              | This flag can be used to show what OS you use.                                                                                                            | `True`                                                  | <img width="1058" height="94" alt="Screen Shot 2026-01-16 at 11 12 53 PM" src="https://github.com/user-attachments/assets/98950d41-7f27-4590-b5a5-b595853ae25a" />                                                                                        |
| `SHOW_PROJECTS`        | This flag can be used to show the projects worked on.                                                                                                     | `True`                                                  | <img width="1044" height="165" alt="Screen Shot 2026-01-16 at 11 12 58 PM" src="https://github.com/user-attachments/assets/32e82108-be20-41f6-a0fc-fd3067e17cbe" />                                                                                       |
| `SHOW_TIMEZONE`        | This flag can be used to show the timezone you are in.                                                                                                    | `True`                                                  | <img width="1036" height="66" alt="Screen Shot 2026-01-16 at 11 13 04 PM" src="https://github.com/user-attachments/assets/b5bcd3b5-2257-415e-95e6-e6718f6653ff" />                                                                                        |
| `SHOW_EDITORS`         | This flag can be used to show the IDEs/code editors used.                                                                                                 | `True`                                                  | <img width="1043" height="123" alt="Screen Shot 2026-01-16 at 11 13 11 PM" src="https://github.com/user-attachments/assets/7ac755cd-9f98-4bd8-a019-70243cf4a1a7" />                                                                                       |
| `SHOW_LANGUAGE_PER_REPO` | This flag can be used to show the number of repositories in different programming languages and frameworks.                                             | `True`                                                  | <img width="880" height="254" alt="Screen Shot 2026-01-16 at 11 25 53 PM" src="https://github.com/user-attachments/assets/fa3eb47b-0108-450c-8a96-53908eb282a4" />                                                                                        |
| `SHOW_SHORT_INFO`        | This flag can be used to show a short info of the GitHub data of a user. **NOTE:** This section requires a Personal Access Token (PAT) with the `user` scope. | `True`                                            | <img width="403" height="245" alt="Screen Shot 2026-01-16 at 11 30 20 PM" src="https://github.com/user-attachments/assets/18654722-a8d1-4fda-9cef-dde5cec78c01" />                                                                                        |
| `SHOW_LOC_CHART`         | This flag can be used to show the lines of code written in different quarters of different years.                                                             | `True`                                            | ![Timeline Chart](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)                                                                                                                                                    |
| `IGNORED_REPOS`          | This flag can be set to ignore some repositories you do not want to be counted.                                                                               | N/A                                               | `waka-readme-stats, my-first-repo`                                                                                                                                                                                                                   |
| `MAX_REPOS`              | This flag can be set to limit how many GitHub repositories are fetched for analysis. This can be useful to speed up runs for accounts with many repositories. | `0` (unlimited)                                   | N/A |
| `MAX_CAP`                | <ins><mark>***DEPRECATED***</mark></ins>: Alias for `MAX_REPOS`                                                                                               | N/A                                               | N/A |
| `SYMBOL_VERSION`         | This flag can be set for the symbol of the progress bar.                                                                                                      | `1`                                               | <img width="336" height="166" alt="Screen Shot 2026-01-16 at 11 13 45 PM" src="https://github.com/user-attachments/assets/af1a39ae-2ed7-4855-b0a2-181e7ba4a7ef" />                                                                                        |
| `BADGE_STYLE`            | This flag defines the style for the generated badges.                                                                                                         | `flat`                                            | <img width="302" height="240" alt="Screen Shot 2026-01-16 at 11 37 50 PM" src="https://github.com/user-attachments/assets/d9e8c9cb-8998-466b-85cf-cbfc47f933d4" />                                                                                        |
| `DEBUG_LOGGING`          | This flag can be set to increase the GitHub Action's output verbosity.                                                                                        | Runner debug property                             | N/A |

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
