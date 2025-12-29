<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# 개발 메트릭스: README에 추가된 기능 플래그 🎌

![프로젝트 미리보기](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![프로젝트 미리보기](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨멋진 README 통계</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/언어-Python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=만약%20유용하다면&style=flat&color=BC4E99" alt="스타 배지"/>
</p>

<p align="center">
   조기 참새 🐤인가요, 아니면 밤늦게 활동하는 올빼미 🦉인가요?
   <br/>
   하루 중 언제 가장 생산적인가요?
   <br/>
   주로 어떤 언어로 코딩을 하나요?
   <br/>
   프로필의 README에서 확인해 보세요!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">버그 보고</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">기능 요청</a>
  </p>

## 준비 작업

1. 마크다운 파일(`.md`)에 2개의 주석을 추가해야 합니다. 업데이트 방법은 [여기](#update-your-readme)를 참조하세요.
2. WakaTime API 키가 필요합니다. WakaTime 계정 설정에서 얻을 수 있습니다.
   - 새로운 사용자라면 [여기](#new-to-wakatime)를 참조하세요.
3. 커밋 메트릭을 얻기 위해 GitHub 액션을 실행한다면, `repo`와 `user` 권한을 가진 GitHub API 토큰이 필요합니다. [여기](https://github.com/settings/tokens)에서 생성할 수 있습니다.
   - 예시는 [여기](#profile-repository)를 참조하세요.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. WakaTime API 키와 GitHub API 토큰을 저장소 비밀(repository secrets)에 저장해야 합니다. 저장소의 설정(Settings)에서 이를 찾을 수 있습니다. 다음 형식으로 저장하세요:
   - WakaTime API 키는 `WAKATIME_API_KEY=<당신의 WakaTime API 키>`로 저장
   - GitHub 개인 액세스 토큰(PAT)은 `GH_TOKEN=<당신의 GitHub 액세스 토큰>`으로 저장

2. 요구 사항에 따라 기능 플래그(feature flags)를 활성화하거나 비활성화할 수 있습니다.

이 GitHub 액션은 원하는 시간에 실행되도록 `cron`으로 설정할 수 있습니다. `cron` 표현식을 생성하려면 [Crontab.guru](https://crontab.guru/)와 [이 사이트](https://crontab.cronhub.io/)를 참조하세요.

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka`는 `SECTION_NAME` 플래그에서 지정한 어떤 문자열로도 대체될 수 있습니다. 

이 줄들은 개발 메트릭스의 진입점이 될 것입니다.

## 와카타임에 처음 오신 분들을 위한 안내

와카타임은 실제 코딩에 투자한 시간을 알려줌으로써 생산성을 높이고 경쟁력을 강화하는 데 도움을 줍니다.

- <https://wakatime.com>으로 이동하여 계정을 만드세요.
- 와카타임 계정 [설정](https://wakatime.com/settings/account)에서 와카타임 API 키를 확인하세요.
- 선호하는 코드 편집기/IDE에 [와카타임 플러그인](https://wakatime.com/plugins)을 설치하세요.
- 분석을 시작하기 위해 API 키를 플러그인에 붙여넣으세요.

### 프로필 저장소

GitHub 액세스 토큰을 받아야 합니다. [GitHub 액세스 토큰 문서](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)를 참고하여 `repo`와 `user` 권한을 가진 토큰을 생성하고, 저장소의 비밀 키 `GH_TOKEN`에 저장하세요.

다음은 실행 예시 워크플로우 파일입니다.

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

- 이제 커밋하고 자동으로 실행되기를 기다릴 수 있습니다. 또는 즉시 실행하여 결과를 확인할 수도 있습니다. 단순히 저장소의 `Actions`로 이동하고, `Profile Readme Development Stats` 워크플로우를 선택한 후 `워크플로우 실행`을 클릭하세요. 이제 한두 분 정도 기다리면 변경 사항이 반영됩니다.

## 추가 정보

통계 정보에 다른 정보를 추가하고 싶다면, 워크플로 파일에서 여러 개의 `FLAGS`를 추가할 수 있습니다. 기본적으로 모든 플래그는 활성화됩니다(코드 줄 플래그는 수행되는 작업의 무게 때문에 비활성화됩니다).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### 플래그 사용법

---

`LOCALE`  이 플래그는 언어 설정을 변경하여 통계 결과를 모국어로 표시하는 데 사용됩니다. 기본값은 영어입니다. 국가 코드 목록은 [여기](https://saimana.com/list-of-country-locale-code/)에서 확인할 수 있습니다. 결과 예시는 [여기](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)에서 확인하세요.

`SECTION_NAME` 이 플래그는 문자열로 설정할 수 있으며, README 파일의 섹션 이름을 대체하는 데 사용됩니다.

`COMMIT_BY_ME` 이 플래그는 참(True)으로 설정하면 코드 커밋 시 작성자의 이름과 이메일을 사용합니다.

`COMMIT_MESSAGE` 커밋 메시지를 설정하는 데 사용됩니다. 기본값은 "개발 메트릭 업데이트"입니다.

`COMMIT_USERNAME` 코드 커밋 시 사용할 사용자 이름을 설정합니다. 기본값은 "readme-bot"입니다.

`COMMIT_EMAIL` 코드 커밋 시 사용할 이메일을 설정합니다. 기본값은 "41898282+github-actions[bot]@users.noreply.github.com"입니다.

`SHOW_UPDATED_DATE` 이 플래그는 업데이트 날짜를 문단에 표시하도록 설정합니다.

`UPDATED_DATE_FORMAT` 업데이트 날짜를 특정 형식으로 표시하도록 설정합니다. 기본값은 `"%d/%m/%Y %H:%M:%S"`입니다.

`SHOW_LINES_OF_CODE` 이 플래그는 작성한 코드 줄 수를 표시하도록 설정합니다.

![코드 줄 수](https://img.shields.io/badge/안녕 세상부터 시작-130만 줄의 코드-blue)

`SHOW_TOTAL_CODE_TIME` 이 플래그는 *코드 시간* 표시를 비활성화합니다.

![코드 시간](http://img.shields.io/badge/코드 시간-1,438시간 54분-blue)

`SHOW_PROFILE_VIEWS` 이 플래그는 **프로필 조회수**를 숨깁니다.

![프로필 조회수](http://img.shields.io/badge/프로필 조회수-2189회-blue)

`SHOW_COMMIT` 이 플래그는 커밋 통계 표시를 비활성화합니다.

저는 초기 단계입니다. 🐤

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

주(주말)별 커밋을 숨기기 위해 `SHOW_DAYS_OF_WEEK` 플래그를 `False`로 설정할 수 있습니다.

📅 **일요일에 가장 생산적입니다.**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` 플래그를 `False`로 설정하면 사용하는 프로그래밍 언어를 숨길 수 있습니다.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` 플래그를 `False`로 설정하면 운영체제 세부 정보가 숨겨집니다.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` 플래그를 `False`로 설정하면 작업한 프로젝트가 숨겨집니다.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` 플래그를 `False`로 설정하면 현재 시간대에 대한 정보가 숨겨집니다.

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` 플래그를 `False`로 설정하면 코드 편집기/IDE 목록이 숨겨집니다.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` 플래그를 `False`로 설정하면 다양한 프로그래밍 언어와 프레임워크의 저장소 수를 숨길 수 있습니다.

**저는 주로 Vue로 코딩합니다.**

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

**🐱 내 GitHub 데이터**

> 🏆 2020년에 433건의 기여
>
> 📦 GitHub 저장소에 292.3kB 사용
>
> 💼 채용 옵션 선택
>
> 📜 25개의 공개 저장소
>
> 🔑 15개의 개인 저장소 (소유)

`SHOW_LOC_CHART` 플래그를 `False`로 설정하면 다양한 연도의 각 사분기에 작성된 코드 행을 숨길 수 있습니다.

`IGNORED_REPOS` 플래그를 `"waka-readme-stats, my-first-repo"` (예시)로 설정하면 원하지 않는 저장소를 제외할 수 있습니다.

`SYMBOL_VERSION` 플래그를 설정하여 진행 표시줄의 기호 (기본값: `1`)를 변경할 수 있습니다.

| 버전 | 완료 블록 | 비어 있는 블록 |
|------|------------|--------------|
| 1    | █          | ░           |
| 2    | ⣿          | ⣀           |
| 3    | ⬛         | ⬜           |

`DEBUG_LOGGING` 플래그를 설정하여 GitHub Action의 출력 정확도를 높일 수 있습니다. 기본값은 내부 러너의 디버깅 속성입니다.

**시간선**

![차트 미찾음](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: 프로젝트를 지원해 주세요

저는 가능한 한 많은 것을 오픈 소스로 공개하고, 이러한 프로젝트를 사용하는 모든 분의 도움을 응원하기 위해 노력합니다. 물론, 이는 많은 시간과 노력이 필요합니다. 이 서비스를 무료로 이용하실 수 있습니다.

하지만 이 프로젝트를 사용하고 계시거나, 이 프로젝트를 좋아하시거나, 제가 계속해서 콘텐츠를 제작하도록 격려하고 싶으시다면, 다음과 같은 방법으로 지원해 주세요 :-

- 사용하신 경우, 리메드에 적절한 신용을 표시하고 링크를 연결해 주세요 :D
- 스타를 하고 프로젝트를 공유하세요 :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - 페이팔을 통해 일회성 기부를 하실 수 있습니다. 아마도 ~~맥주~~ 와인을 사겠습니다 🍷.

감사합니다! :heart:

# 기여 방법

기여 환영합니다 ♥! 기능 제안 및 유닛 테스트 추가 부탁드립니다! 기여는 풀 리퀘스트 및 이슈 시스템을 통해 해주시기 바랍니다.

# 선정된 기여자

1. [Anmol Pratap Singh](https://github.com/anmol098): 유지보수자
2. [Alexander Sergeev](https://github.com/pseusys): 유지보수자
3. [Aravind V. Nair](https://github.com/aravindvnair99): 유지보수자
4. [Prabhat Singh](https://github.com/prabhatdev): 코드 타임라인 그래프에 대한 [#18](https://github.com/anmol098/waka-readme-stats/pull/18) 기여
5. [Hedy Li](https://github.com/hedythedev): [#34](https://github.com/anmol098/waka-readme-stats/pull/34) 및 [#23](https://github.com/anmol098/waka-readme-stats/pull/23) 풀 리퀘스트에 대한 기여
6. [Pedro Torres](https://github.com/Corfucinas): [#29](https://github.com/anmol098/waka-readme-stats/pull/29) 풀 리퀘스트에 대한 기여
7. [Aaron Meese](https://github.com/ajmeese7): [#45](https://github.com/anmol098/waka-readme-stats/pull/45) 풀 리퀘스트에 대한 기여
8. [Arnav Jindal](https://github.com/Daggy1234): [#48](https://github.com/anmol098/waka-readme-stats/pull/48) 풀 리퀘스트에 대한 기여
9. [Daniel Rowe](https://github.com/DanRowe): [#57](https://github.com/anmol098/waka-readme-stats/pull/57) 풀 리퀘스트에 대한 기여
10. [Ss5h](https://github.com/tlatkdgus1): 자연 문장 작성 번역 기능 추가에 대한 [#136](https://github.com/anmol098/waka-readme-stats/pull/136) 기여

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

- 그리고 당신! 만약 지금 이 문서를 사용하고 있고 목록에 없다면, [특별 언급](https://github.com/anmol098/waka-readme-stats/issues/new/choose) 이슈를 보내주세요! 😊 
  우리는 기꺼이 당신을 목록에 추가해 드릴 것입니다.

Python 🐍와 사랑으로 만들어졌습니다.

# 영감의 원천

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### 이 프로젝트는 여러분의 **별** ⭐을 필요로 합니다 ♥

## 별을 따라온 스타가수들

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

