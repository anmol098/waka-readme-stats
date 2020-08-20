> Looking For Translation to different languages & Locale  [#23](https://github.com/anmol098/waka-readme-stats/issues/23)

# Dev Metrics in Readme with added feature flags 🎌

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
   Are you an early 🐤 or a night 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   What are languages you code in?
   <br/>
   Let's check out in your profile readme!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bug</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Feature</a>
  </p>

## Prep Work

1. You need to update the markdown file(.md) with 2 comments. You can refer [here](#update-your-readme) for updating it.
2. You'll need a WakaTime API Key. You can get that from your WakaTime Account Settings
    - You can refer [here](#new-to-wakatime), if you're new to WakaTime
3. You'll need a GitHub API Token with `repo` and `user` scope from [here](https://github.com/settings/tokens) if you're running the action to get commit metrics
   > enabling the `repo` scope seems **DANGEROUS**<br/>
   > but this GitHub Action only accesses your commit timestamp and lines of code added or deleted in repository you contributed.
   - You can use [this](#profile-repository) example to work it out
4. You need to save the WakaTime API Key and the GitHub API Token in the repository secrets. You can find that in the Settings of your repository. Be sure to save those as the following.
    - WakaTime API Key as `WAKATIME_API_KEY=<your wakatime API Key>`
    - GitHub Personal Access Token as `GH_TOKEN=<your github access token>`
5. You can enable and disable feature flags based on requirements.


This Action will run everyday at 00.00 IST

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

These lines will be our entry-points for the dev metrics.

## New to WakaTime

WakaTime gives you an idea of the time you really spent on coding. This helps you boost your productivity and competitive edge.

- Head over to <https://wakatime.com> and create an account.
- Get your WakaTime API Key from your [Account Settings in WakaTime](https://wakatime.com/settings/account).
- Install the [WakaTime plugin](https://wakatime.com/plugins) in your favourite editor / IDE.
- Paste in your API key to start the analysis.

### Profile Repository

You'll need to get a [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) with a `repo` and `user` scope and save it in the Repo Secrets `GH_TOKEN = <Your GitHub Access Token>`

Here is Sample Workflow File for running it:

```yml
name: Waka Readme

on:
  schedule:
    # Runs at 12am IST
    - cron: '30 18 * * *'

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
## Extras

1. If you want to add the other info to your stats, you can add multiple `FLAGS` in your workflow file by default all flags are enabled 
>except the lines of code flag due to heavy operation performed

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

`LOCALE`  This Flag can be used to show stats in your language default is english uses Locale [Short Hand](https://saimana.com/list-of-country-locale-code/) to be passed in the flag variable example of the final result can be found [here](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)


`SHOW_LINES_OF_CODE`       flag can be set to `True` to show the Lines of code writen till date

![Lines of code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_PROFILE_VIEWS`       flag can be set to `False` to hide the Profile views

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)


`SHOW_COMMIT`       flag can be set to `False` to hide the commit stats

**I'm an early 🐤** 
```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK`       flag can be set to `False` to hide the commits made on different days of week

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

`SHOW_LANGUAGE`       flag can be set to `False` to hide the Coding Language You use

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```


`SHOW_OS`       flag can be set to `False` to hide the OS details

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` flag can be set to `False` to hide the Projects worked on

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` flag can be set to `False` to hide the time zone you are in

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS`  flag can be set to `False` to hide the list of code-editors used

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO`  flag can be set to `False` to hide the Number of repository in different language and frameworks

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

`SHOW_SHORT_INFO`  flag can be set to `False` to hide the short fun fact info of user
>This section requires personal access token with user permission otherwise data shown will be incorrect here

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

`SHOW_LOC_CHART`  flag can be set to `False` to hide the Lines of code written in different quarters of different year

**Timeline**

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png) 

## :sparkling_heart: Support the project

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy a ~~beer~~ wine 🍷

Thanks! :heart:

---

# Contributing

Contributions are welcome! ♥! Please share any features, and add unit tests! Use the pull request and issue systems to contribute.

# Selected Contributors

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Prabhat Singh](https://github.com/prabhatdev): For code timeline graph [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
3. [Hedy Li](https://github.com/hedythedev): For Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) and [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
4. [Pedro Torres](https://github.com/Corfucinas): For Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
5. [Aaron Meese](https://github.com/ajmeese7): For Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
6. [Arnav Jindal](https://github.com/Daggy1234): For Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
7. [Daniel Rowe](https://github.com/DanRowe1): For Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)

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
  
  - [Daniel Rowe](https://github.com/DanRowe1)
  
  - [Muhammad Hassan Ahmed](https://github.com/hassan11196)
  
  - [Alessandro Maggio](https://github.com/Tkd-Alex)
  

</details>

- And you! If ever you are using it right now and you are not on the list please tell us by sending a [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue :blush: we are glad to add you in the list.


Made with :heart: and Python 🐍.

# Inspired From

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### This project need a **star** ⭐ from you ♥.
