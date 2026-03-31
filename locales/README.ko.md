<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# README에 추가된 기능 플래그와 개발 메트릭스 🎌

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
   당신은 조기 🐤인가요, 밤 owl 🦉인가요?
   <br/>
   하루 중 언제가 가장 생산적인가요?
   <br/>
   어떤 언어로 코드를 작성하나요?
   <br/>
   프로필의 README에서 확인해 보세요!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">버그 신고</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">기능 요청</a>
  </p>

## 준비 작업

1. `.md` 파일의 마크다운 파일을 2개의 주석으로 업데이트해야 합니다. 업데이트 방법은 [여기](#update-your-readme)를 참조하십시오.
2. WakaTime API 키가 필요합니다. 이는 WakaTime 계정 설정에서 얻을 수 있습니다.
    - WakaTime에 새로 오셨다면 [여기](#new-to-wakatime)를 참조하십시오.
3. 커밋 메트릭을 얻기 위해 액션을 실행하는 경우, [여기](https://github.com/settings/tokens)에서 `repo` 및 `user` 범위를 가진 GitHub API 토큰이 필요합니다.
   - [이](#profile-repository) 예제를 사용하여 이를 설정할 수 있습니다.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. 저장소 비밀에 WakaTime API 키와 GitHub API 토큰을 저장해야 합니다. 이는 저장소의 설정에서 찾을 수 있습니다. \
  다음처럼 저장해야 합니다:
    - WakaTime API 키를 `WAKATIME_API_KEY=<your wakatime API Key>`로 저장
    - GitHub 개인 액세스 토큰(PAT)을 `GH_TOKEN=<your github access token>`로 저장
5. 요구사항에 따라 기능 플래그를 활성화하거나 비활성화할 수 있습니다.

이 GitHub Action은 원하는 시간에 `cron`을 사용하여 실행할 수 있습니다. `cron` 표현식을 생성하려면 [Crontab.guru](https://crontab.guru/) 및 [this](https://crontab.cronhub.io/) 웹사이트를 참조하세요.

## README 업데이트

`README.md`에 다음과 같은 주석을 추가하세요:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka`는 [사용 가능한 플래그 섹션](#flags-available)에 명시된 `SECTION_NAME` 플래그로 지정된 문자열로 대체될 수 있습니다.

이 줄들은 개발 메트릭스의 진입점이 될 것입니다.

## WakaTime을 처음 사용하는 경우

WakaTime은 실제로 코딩에 소요된 시간을 알려줍니다. 이는 생산성과 경쟁력을 높이는 데 도움이 됩니다.

- <https://wakatime.com>으로 이동하여 계정을 생성하십시오.
- [WakaTime의 계정 설정](https://wakatime.com/settings/account)에서 WakaTime API 키를 가져오십시오.
- 좋아하는 편집기 / IDE에 [WakaTime 플러그인](https://wakatime.com/plugins)을 설치하십시오.
- 분석을 시작하려면 API 키를 붙여넣으십시오.

### 프로필 저장소

GitHub Access Token을 가져와야 하며, `repo` 및 `user` 범위를 포함해야 하며, Repo Secrets에 `GH_TOKEN = <Your GitHub Access Token>`으로 저장해야 합니다.

다음은 이를 실행하는 샘플 워크플로우 파일입니다:

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

- 이제 커밋하고 자동으로 실행되기를 기다릴 수 있고, 즉시 결과를 확인하려면 `Actions`로 이동하여 `Profile Readme Development Stats` 워크플로우를 선택하고 `Run workflow`를 클릭하세요. 이제 1분 정도 기다리면 변경사항을 확인할 수 있습니다.

## Extras

기본적으로 모든 플래그는 활성화되어 있습니다(코드 줄 수 플래그는 수행되는 중간 작업이 많기 때문에 예외). 통계에 추가 정보를 추가하고 싶다면 워크플로우 파일에 여러 개의 `FLAGS`를 추가할 수 있습니다.

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### 사용 가능한 플래그

---

`LOCALE` 이 플래그는 사용자의 언어로 통계를 표시할 수 있습니다. 기본값은 영어입니다. 플래그 변수에 [Short Hand](https://saimana.com/list-of-country-locale-code/) 형식의 로케일 코드를 전달해야 합니다. 최종 결과 예시는 [여기](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)에서 확인할 수 있습니다.

`SECTION_NAME` 플래그는 임의의 문자열로 설정할 수 있으며, README에서 대체할 섹션의 이름이 됩니다.

`COMMIT_BY_ME` 플래그는 `True`로 설정하여 이름과 이메일을 사용하여 코드를 커밋할 수 있습니다.

`COMMIT_MESSAGE` 플래그는 커밋 메시지를 설정할 수 있습니다. 기본값은 "Updated with Dev Metrics"입니다.

`COMMIT_USERNAME` 플래그는 커밋에 사용할 사용자 이름을 설정할 수 있습니다. 기본값은 "readme-bot"입니다.

`COMMIT_EMAIL` 플래그는 커밋에 사용할 이메일을 설정할 수 있습니다. 기본값은 "41898282+github-actions[bot]@users.noreply.github.com"입니다.

`SHOW_UPDATED_DATE` 플래그는 `True`로 설정하여 단락의 끝에 업데이트된 날짜를 표시할 수 있습니다.

`UPDATED_DATE_FORMAT` 플래그는 업데이트된 날짜를 특정 형식으로 표시할 수 있습니다. 기본값은 `"%d/%m/%Y %H:%M:%S"`입니다.

`SHOW_LINES_OF_CODE` 플래그는 `True`로 설정하여 오늘까지 작성된 코드 줄 수를 표시할 수 있습니다.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` 플래그는 `False`로 설정하여 *Code Time*을 숨길 수 있습니다.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` 플래그는 `False`로 설정하여 **Profile Views**를 숨길 수 있습니다.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` 플래그는 `False`로 설정하여 커밋 통계를 숨길 수 있습니다.

**나는 초기 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` 플래그를 `False`로 설정하여 주간 각 날짜에 대한 커밋을 숨길 수 있습니다.

📅 **일요일에 가장 생산성이 높습니다**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` 플래그를 `False`로 설정하여 사용하는 프로그래밍 언어를 숨길 수 있습니다.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` 플래그를 `False`로 설정하여 OS 세부 정보를 숨길 수 있습니다.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` 플래그를 `False`로 설정하여 작업한 프로젝트를 숨길 수 있습니다.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` 플래그를 `False`로 설정하여 현재 시간대를 숨길 수 있습니다.

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` 플래그를 `False`로 설정하여 사용된 코드 편집기/IDE 목록을 숨길 수 있습니다.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` 플래그를 `False`로 설정하여 다양한 프로그래밍 언어 및 프레임워크별로 저장소 수를 숨길 수 있습니다.

**저는 주로 Vue로 코드를 작성합니다**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO` 플래그를 `False`로 설정하여 사용자의 짧은 재미있는 사실 정보를 숨길 수 있습니다.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 My GitHub Data**

> 🏆 2020년에 433 Contributions
 >
> 📦 GitHub 저장소에서 292.3 kB 사용
 >
> 💼 채용 선택
 >
> 📜 25개 공개 저장소
 >
> 🔑 15개 소유한 비공개 저장소

`SHOW_LOC_CHART` 플래그를 `False`로 설정하여 연도별로 분기별로 작성된 코드 줄 수를 숨길 수 있습니다.

`IGNORED_REPOS` 플래그를 `"waka-readme-stats, my-first-repo"`(예시)로 설정하여 일부 계산하지 않으려는 저장소를 무시할 수 있습니다.

`SYMBOL_VERSION` 플래그는 진행 표시줄의 기호를 위해 설정할 수 있으며, 기본값은 `1`입니다.

| 버전 | 완료 블록 | 빈 블록 |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING` 플래그를 설정하여 GitHub Action의 출력 세부 정보 수준을 높일 수 있으며, 기본값은 내부 실행자 디버그 속성과 같습니다.

**타임라인**

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: 프로젝트 지원

나는 할 수 있는 모든 것을 오픈소스로 공개하고, 이 프로젝트를 사용하여 도움이 필요한 사람들의 요청에 답하려고 노력하고 있다. 당연하게도,
이 모든 과정은 시간이 많이 걸린다. 이 서비스는 무료로 사용할 수 있다.

그러나, 이 프로젝트를 사용하고 있고 만족하거나, 계속해서 새로운 것을 만들기를 원한다면 몇 가지 방법으로 도움을 줄 수 있다 :-

- 이 액션을 사용할 때 readme에 적절한 인용을 하고, 다시 이 프로젝트로 연결해 주는 것 :D
- 프로젝트를 스타링하고 공유하는 것 :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - PayPal을 통해 일회성 기부를 할 수 있다. 아마도 ~~맥주~~ 와인 🍷를 사게 될 것이다.

감사합니다! :heart:

# 기여

기여는 환영합니다 ♥! 기능을 공유하고 단위 테스트를 추가해 주세요! pull request와 issue 시스템을 사용하여 기여해 주세요.

# 선택된 기여자

1. [Anmol Pratap Singh](https://github.com/anmol098): 유지자
2. [Alexander Sergeev](https://github.com/pseusys): 유지자
3. [DataBoySu](https://github.com/DataBoySu): 유지자
4. [okcoder1](https://github.com/ok-coder1): 유지자
5. [Aravind V. Nair](https://github.com/aravindvnair99): 유지자
6. [Prabhat Singh](https://github.com/prabhatdev): 코드 타임라인 그래프를 위한 기여 [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) 및 [#23](https://github.com/anmol098/waka-readme-stats/pull/23)을 위한 기여
8. [Pedro Torres](https://github.com/Corfucinas): Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)을 위한 기여
9. [Aaron Meese](https://github.com/ajmeese7): Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)을 위한 기여
10. [Arnav Jindal](https://github.com/Daggy1234): Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)을 위한 기여
11. [Daniel Rowe](https://github.com/DanRowe): Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)을 위한 기여
12. [Ss5h](https://github.com/tlatkdgus1): 번역을 위한 자연어 문장 작성 지원 추가 [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- 그리고 당신! 만약 지금 그것을 사용하고 있고 목록에 없으면 [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) 이슈를 보내서 알려주세요! :blush: \
  목록에 추가해 드릴 수 있어요.

:heart: 과 Python 🐍로 만들어졌습니다.

# 영감을 받은 출처

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### 이 프로젝트는 당신의 **star** ⭐ from you ♥가 필요합니다

## 시간에 따른 Stargazers 수

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

