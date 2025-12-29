<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# 開発者向けメトリクス（READMEに追加機能フラグ付き）

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<div align="center">

  <img src="https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png" alt="Project Preview">

  <h3 align="center">📌✨素晴らしいリーディング統計</h3>
</div>

----

<p align="center">
   <img src="https://img.shields.io/badge/language-python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99" alt="Star Badge"/>
</p>

<div align="center">
   早起き派？夜型派？
   <br/>
   一日の最も生産性が高い時間帯はいつですか？
   <br/>
   コードを書く言語は何ですか？
   <br/>
   プロフィールのリポジトリのREADMEで確認しましょう！
</div>

<div align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">バグを報告する</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">機能を要望する</a>
</div>

## 準備作業

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

`waka` は、`SECTION_NAME` フラグで指定された任意の文字列に置き換えることができます。[利用可能なフラグのセクション](#flags-available)を参照してください。

これらの行がデバッグメトリクスのエントリーポイントとなります。

## 新しいユーザー向け WakaTime

WakaTime は、実際のコード作成時間を可視化し、生産性向上と競争力の強化をサポートします。

- <https://wakatime.com> にアクセスし、アカウントを作成してください。
- WakaTime アカウント設定ページ（[こちら](https://wakatime.com/settings/account)）から WakaTime API キーを取得してください。
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

- 今はコミットして自動的に実行を待つか、または結果をすぐに確認するためにトリガーして実行することもできます。リポジトリの「アクション」に移動し、「プロフィールリーダーミルストーン開発統計」ワークフローを選択し、「ワークフローを実行」をクリックしてください。数分待つと、変更が表示されます。

## エクストラ

統計情報に他の情報を追加したい場合は、ワークフローファイルに複数の `FLAGS` を追加できます。デフォルトでは、すべてのフラグが有効化されます（コード行フラグは、重い処理が行われるため非有効化されています）。

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

`LOCALE` このフラグは、統計をあなたの言語で表示するために使用できます。デフォルトは英語です。国別ローカコードのショートハンドは[こちら](https://saimana.com/list-of-country-locale-code/)を参照してください。最終結果の例は[こちら](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)にあります。

`SECTION_NAME` このフラグは任意の文字列に設定でき、README内のセクション名を置き換えることができます。

`COMMIT_BY_ME` このフラグを `True` に設定すると、あなたの名前とメールアドレスでコードをコミットできます。

`COMMIT_MESSAGE` コミットメッセージを設定するためのフラグです。デフォルトは "Updated with Dev Metrics" です。

`COMMIT_USERNAME` コードをコミットするユーザー名を設定するためのフラグです。デフォルトは "readme-bot" です。

`COMMIT_EMAIL` コードをコミットするメールアドレスを設定するためのフラグです。デフォルトは "41898282+github-actions[bot]@users.noreply.github.com" です。

`SHOW_UPDATED_DATE` このフラグを `True` に設定すると、段落の最後に更新日が表示されます。

`UPDATED_DATE_FORMAT` 更新日を指定の形式で表示するためのフラグです。デフォルトは `"%d/%m/%Y %H:%M:%S"` です。

`SHOW_LINES_OF_CODE` このフラグを `True` に設定すると、その時点で書かれたコード行数のカウントが表示されます。

![コード行数](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` このフラグを `False` に設定すると、*Code Time* が非表示になります。

![コード時間](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` このフラグを `False` に設定すると、**Profile Views** が非表示になります。

![プロフィールビュー](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` このフラグを `False` に設定すると、コミット統計が非表示になります。

私は早起き派？夜型派？

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

週の日付を隠すために、`SHOW_DAYS_OF_WEEK` フラグを `False` に設定できます。

早起き派？夜型派？ **日曜日が最も生産性の高い日です**

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

`SHOW_PROJECTS`フラグを`False`に設定することで、取り組んだプロジェクトを非表示にすることができます。

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

`SHOW_LANGUAGE_PER_REPO` フラグを `False` に設定することで、異なるプログラミング言語やフレームワークのリポジトリ数の表示を非表示にできます。

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

**🐱 GitHub データ**

> 🏆 2020年には433回の貢献がありました。
>
> 📦 GitHub ストレージとして292.3 KBを使用しています。
>
> 💼 採用を選択しました。
>
> 📜 25の公開リポジトリ
>
> 🔑 15のプライベートリポジトリ（所有）

`SHOW_LOC_CHART` フラグを `False` に設定すると、異なる四半期や異なる年の間で書かれたコードの行を非表示にできます。

`IGNORED_REPOS` フラグは `"waka-readme-stats, my-first-repo"` (例)などのリポジトリを非表示にするために設定できます。

`SYMBOL_VERSION` フラグは進捗バー用のシンボルを指定できます（デフォルトは `1` です）。

| バージョン | 完了ブロック | 空ブロック |
| -------- | ---------- | ----------- |
|    1      |      █     |       ░     |
|    2      |      ⣿     |       ⣀     |
|    3      |      ⬛    |       ⬜    |

`DEBUG_LOGGING` フラグは、GitHub アクションの出力の詳細度を増加させるために設定できます。デフォルトは内部ランナーのデバッグプロパティに等しいです。

**タイムライン**

![チャートが見つかりませんでした](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: プロジェクトをサポートしてください。

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy some ~~beer~~ wine 🍷.

Thanks! :heart:

---

# 貢献について

貢献をお待ちしています♥！機能の追加やユニットテストの作成をお願いします！プルリクエストと問題報告システムを利用して貢献してください。

# 貢献者一覧

1. [Anmol Pratap Singh](https://github.com/anmol098): メンテナ
2. [Alexander Sergeev](https://github.com/pseusys): メンテナ
3. [Aravind V. Nair](https://github.com/aravindvnair99): メンテナ
4. [Prabhat Singh](https://github.com/prabhatdev): コードタイムライングラフ [#18](https://github.com/anmol098/waka-readme-stats/pull/18) への貢献
5. [Hedy Li](https://github.com/hedythedev): プルリクエスト [#34](https://github.com/anmol098/waka-readme-stats/pull/34) と [#23](https://github.com/anmol098/waka-readme-stats/pull/23) への貢献
6. [Pedro Torres](https://github.com/Corfucinas): プルリクエスト [#29](https://github.com/anmol098/waka-readme-stats/pull/29) への貢献
7. [Aaron Meese](https://github.com/ajmeese7): プルリクエスト [#45](https://github.com/anmol098/waka-readme-stats/pull/45) への貢献
8. [Arnav Jindal](https://github.com/Daggy1234): プルリクエスト [#48](https://github.com/anmol098/waka-readme-stats/pull/48) への貢献
9. [Daniel Rowe](https://github.com/DanRowe): プルリクエスト [#57](https://github.com/anmol098/waka-readme-stats/pull/57) への貢献
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

- And you! If ever you are using it right now and you are not on the list please tell us by sending a [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue! :blush: \
  We will be glad to add you in the list.

Made with :heart: and Python 🐍.

# インスピレーション元

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists)
> [athul/waka-readme](https://github.com/athul/waka-readme)

### このプロジェクトにはあなたの **星** ⭐ が必要です ♥

## 時系列のスター

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

