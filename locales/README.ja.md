<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Dev Metrics in README with added feature flags 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<div align="center">

![プロジェクトのプレビュー](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

</div>

### 📌✨素晴らしいリーディング統計

----

<p align="center">
   <img src="https://img.shields.io/badge/言語-Python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%E2%80%9C%E6%A3%AE%E3%81%8F%E2%80%9D&message=役に立ったら%E3%81%BE%E3%81%A7%E3%81%8F&style=flat&color=BC4E99" alt="スターバッジ"/>
</p>

<p align="center">
   早起き派ですか？それとも夜型ですか？
   <br/>
   一日のうち最も生産性が高い時間帯はいつですか？
   <br/>
   どの言語でコーディングをしていますか？
   <br/>
   プロフィールのリーディングファイルで確認してみましょう！
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">バグを報告する</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">機能をリクエストする</a>
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

「**waka**」は、[利用可能なフラグのセクション](#flags-available)で説明されているように、**SECTION_NAME**フラグで指定された任意の文字列に置き換えることができます。

これらの行は、開発メトリクスのためのエントリーポイントとなります。

## 新しいユーザー向け WakaTime

WakaTime は、実際のコード作成時間を可視化し、生産性向上と競争力の強化をサポートします。

-  <https://wakatime.com> にアクセスし、アカウントを作成してください。
- WakaTime アカウント設定ページ（<https://wakatime.com/settings/account>）から WakaTime API キーを取得してください。
- お好みのコードエディタ/IDEに [WakaTime プラグイン](https://wakatime.com/plugins)をインストールしてください。
- API キーを貼り付けて分析を開始します。

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

- 今後は、自動的に実行して待つことができます。または、結果をすぐに確認するためにトリガーすることも可能です。リポジトリの「Actions」に移動し、「Profile Readme Development Stats」ワークフローを選択し、「ワークフローを実行」をクリックしてください。数分待つと、変更内容が表示されます。

## 追加情報

統計に他の情報を追加したい場合は、ワークフローファイルに複数の `FLAGS` を追加できます。デフォルトでは、すべてのフラグが有効化されます（コード行のフラグは、処理の重さのため無効化されています）。

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### 利用可能なフラグ

---

`LOCALE` このフラグは、統計をあなたの言語で表示するために使用できます。デフォルトは英語です。国別コードの[ショートハンド](https://saimana.com/list-of-country-locale-code/)をフラグ変数にパスしてください。最終結果の例は[こちら](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)にあります。

`SECTION_NAME` このフラグは任意の文字列に設定でき、README内のセクション名を置き換えることができます。

`COMMIT_BY_ME` このフラグを`True`に設定すると、あなたの名前とメールアドレスでコードがコミットされます。

`COMMIT_MESSAGE` コミットメッセージを設定できます。デフォルトは「Dev Metricsで更新」です。

`COMMIT_USERNAME` コードをコミットするユーザー名を設定できます。デフォルトは「readme-bot」です。

`COMMIT_EMAIL` コードをコミットするメールアドレスを設定できます。デフォルトは「41898282+github-actions[bot]@users.noreply.github.com」です。

`SHOW_UPDATED_DATE` このフラグを`True`に設定すると、更新日が段落の最後に表示されます。

`UPDATED_DATE_FORMAT` 更新日を特定の形式で表示できます。デフォルトは「%d/%m/%Y %H:%M:%S」です。

`SHOW_LINES_OF_CODE` このフラグを`True`に設定すると、現在まで書かれたコード行数が表示されます。

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` フラグを `False` に設定することで、*コード時間* を非表示にすることができます。

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` フラグを `False` に設定することで、**プロフィールビュー** を非表示にすることができます。

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT`フラグを`False`に設定することで、コミット統計を非表示にすることができます。

**私は早期の鳥です。**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK`フラグを`False`に設定することで、週の異なる日にコミットされたものを非表示にすることができます。

📅 **日曜日が最も生産性の高い日です**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` フラグを `False` に設定することで、使用しているプログラミング言語を非表示にすることができます。

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` フラグを `False` に設定することで、OS の詳細を非表示にすることができます。

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` フラグを `False` に設定することで、取り組んだプロジェクトを非表示にすることができます。

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` フラグを `False` に設定することで、現在のタイムゾーンを非表示にすることができます。

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS`フラグを`False`に設定することで、使用されているコードエディタ/IDEのリストを非表示にすることができます。

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` フラグを `False` に設定すると、異なるプログラミング言語やフレームワークのリポジトリ数の表示が非表示になります。

**私は主に Vue でコードを書いています。**

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

## :sparkling_heart: Support the project

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy some ~~beer~~ wine 🍷.

Thanks! :heart:

---

# 貢献について

貢献をお待ちしています♥！機能の提案や、ユニットテストの追加をお願いします。プルリクエストと問題報告システムを利用してご貢献ください。

# 貢献者一覧

1. [Anmol Pratap Singh](https://github.com/anmol098): メンテナ
2. [Alexander Sergeev](https://github.com/pseusys): メンテナ
3. [Aravind V. Nair](https://github.com/aravindvnair99): メンテナ
4. [Prabhat Singh](https://github.com/prabhatdev): コードタイムライングラフ [#18](https://github.com/anmol098/waka-readme-stats/pull/18) 提供
5. [Hedy Li](https://github.com/hedythedev): プルリクエスト [#34](https://github.com/anmol098/waka-readme-stats/pull/34) と [#23](https://github.com/anmol098/waka-readme-stats/pull/23) 提出
6. [Pedro Torres](https://github.com/Corfucinas): プルリクエスト [#29](https://github.com/anmol098/waka-readme-stats/pull/29) 提出
7. [Aaron Meese](https://github.com/ajmeese7): プルリクエスト [#45](https://github.com/anmol098/waka-readme-stats/pull/45) 提出
8. [Arnav Jindal](https://github.com/Daggy1234): プルリクエスト [#48](https://github.com/anmol098/waka-readme-stats/pull/48) 提出
9. [Daniel Rowe](https://github.com/DanRowe): プルリクエスト [#57](https://github.com/anmol098/waka-readme-stats/pull/57) 提出
10. [Ss5h](https://github.com/tlatkdgus1): 自然文書き換えのためのサポート追加 [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- そしてあなた！今まさにこのプロジェクトを利用しており、リストに含まれていない場合は、[特別言及](https://github.com/anmol098/waka-readme-stats/issues/new/choose)の問題を送信してください！：顔を赤らめる：私たちは喜んであなたをリストに追加します。

Python 🐍 と愛をこめて作られました。

# インスピレーション元

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists)
>
> [athul/waka-readme](https://github.com/athul/waka-readme)

このプロジェクトには、あなたの**星**⭐が必要です。

## 時系列のスター

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

