<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# README に開発メトリクスを追加し、機能フラグを導入 🎌

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
   あなたは早朝の🐤ですか、それとも夜型の🦉ですか？
   <br/>
   1日のうちで最も生産的な時間はいつですか？
   <br/>
   あなたがコードを書く言語は何ですか？
   <br/>
   プロフィールのREADMEで確認しましょう！
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">バグを報告</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">機能をリクエスト</a>
  </p>

## プリペアワーク

1. `.md`ファイルのマークダウンファイルを2つのコメントで更新する必要があります。更新方法は[こちら](#update-your-readme)を参照してください。
2. WakaTime APIキーが必要です。これはWakaTimeアカウント設定から取得できます。
    - WakaTimeに新規ユーザーの場合、[こちら](#new-to-wakatime)を参照してください。
3. コミットメトリクスを取得するアクションを実行する場合、[こちら](https://github.com/settings/tokens)から`repo`および`user`スコープを持つGitHub APIトークンが必要です。
   - これについては、[こちら](#profile-repository)の例を参照してください。

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. リポジトリのシークレットにWakaTime APIキーおよびGitHub APIトークンを保存する必要があります。リポジトリの「設定」で確認できます。  
  以下の通りに保存してください:
    - WakaTime APIキーを`WAKATIME_API_KEY=<your wakatime API Key>`として保存
    - GitHubパーソナルアクセストークン(PAT)を`GH_TOKEN=<your github access token>`として保存
5. ご要望に応じて、機能フラグを有効または無効にできます。

このGitHub Actionは、`cron`を使用していつでも実行できます。`cron`式を生成するには、[Crontab.guru](https://crontab.guru/)および[this](https://crontab.cronhub.io/)のウェブサイトをご覧ください。

## READMEを更新する

`README.md`にコメントを追加する例:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` は、[利用可能なフラグセクション](#flags-available) に記載されている `SECTION_NAME` フラグで指定された任意の文字列に置き換えることができます。

これらの行は、開発者メトリクスのエントリポイントとなります。

## WakaTimeに新規登録

WakaTimeは、実際にコーディングに費やした時間を把握するのに役立ちます。これにより、生産性と競争力を向上させることができます。

- <https://wakatime.com>にアクセスし、アカウントを作成してください。
- [WakaTimeのアカウント設定](https://wakatime.com/settings/account)からWakaTime APIキーを取得してください。
- お気に入りのエディタ/IDEに[WakaTimeプラグイン](https://wakatime.com/plugins)をインストールしてください。
- APIキーを貼り付け、分析を開始してください。

### プロファイル リポジトリ

`repo` および `user` スコープを持つ [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) を取得し、リポジトリシークレット `GH_TOKEN = <Your GitHub Access Token>` に保存する必要があります。

実行するためのサンプルワークフロー ファイルはこちらです:

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

- 今では、コミットして自動的に実行を待つことも、または今すぐ結果を確認するために手動で実行することもできます。リポジトリ内の `Actions` にアクセスし、`Profile Readme Development Stats` ワークフローを選択し、`Run workflow` をクリックしてください。1〜2分待つと、変更内容が表示されます。

## Extras

他の情報を統計に追加したい場合は、ワークフロー ファイルに複数の `FLAGS` を追加できます。デフォルトではすべてのフラグが有効になっています（コード行数フラグは、実行される処理が重いため、例外です）。

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

`LOCALE` このフラグは、自分の言語で統計を表示するために使用できます。デフォルトは英語です。フラグ変数にLocale [Short Hand](https://saimana.com/list-of-country-locale-code/) を渡してください。最終的な結果の例は [ここ](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md) にあります。

`SECTION_NAME` フラグは任意の文字列に設定でき、READMEに置き換えるセクションの名前になります。

`COMMIT_BY_ME` フラグを `True` に設定すると、自分の名前とメールアドレスを使用してコードをコミットできます。

`COMMIT_MESSAGE` フラグはコミットメッセージに設定できます。デフォルトは "Updated with Dev Metrics" です。

`COMMIT_USERNAME` フラグはコミットに使用するユーザー名として設定できます。デフォルトは "readme-bot" です。

`COMMIT_EMAIL` フラグはコミットに使用するメールアドレスとして設定できます。デフォルトは "41898282+github-actions[bot]@users.noreply.github.com" です。

`SHOW_UPDATED_DATE` フラグを `True` に設定すると、段落の終わりに更新日時を表示します。

`UPDATED_DATE_FORMAT` フラグは、更新日時をフォーマットするために設定できます。デフォルトは `"%d/%m/%Y %H:%M:%S"` です。

`SHOW_LINES_OF_CODE` フラグを `True` に設定すると、これまでに書かれたコードの行数を表示します。

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` フラグを `False` に設定すると、*Code Time* を非表示にします。

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` フラグを `False` に設定すると、**Profile Views** を非表示にします。

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` フラグを `False` に設定すると、コミット統計を非表示にします。

**私はまだ若手の 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` フラグを `False` に設定して、週の異なる日に作成されたコミットを非表示にできます。

📅 **日曜日に最も生産的です**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` フラグを `False` に設定して、使用するプログラミング言語を非表示にできます。

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` フラグを `False` に設定して、OSの詳細情報を隠すことができます。

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` フラグを `False` に設定して、作業したプロジェクトを非表示にできます。

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` フラグを `False` に設定して、現在いるタイムゾーンを非表示にできます。

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` フラグを `False` に設定して、使用されているコードエディタ/IDEのリストを非表示にできます。

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO`フラグを`False`に設定して、さまざまなプログラミング言語とフレームワークごとのリポジトリ数を非表示にできます。

**私は主にVueでコードを書きます**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO` フラグを `False` に設定して、ユーザーの短い面白い事実情報を非表示にできます。

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 My GitHub Data**

> 🏆 2020年における寄付 433
 >
> 📦 GitHubのストレージで 292.3 kB 使用
 >
> 💼 雇用を選択
 >
> 📜 公開リポジトリ 25
 >
> 🔑 所有プライベートリポジトリ 15

`SHOW_LOC_CHART` フラグを `False` に設定することで、異なる年ごとの四半期ごとのコード行数を表示する線を非表示にできます。

`IGNORED_REPOS` フラグを `"waka-readme-stats, my-first-repo"`（例）に設定することで、カウントされたくないリポジトリを無視できます。

`SYMBOL_VERSION` フラグは、進行状況バーの記号を設定するために使用できます（デフォルト: `1`）。

| バージョン | 完了ブロック | 空ブロック |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING` フラグを設定することで、GitHub Actionの出力の詳細度を増やすことができます。デフォルトでは内部ランナーのデバッグプロパティに等しくなります。

**タイムライン**

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: プロジェクトをサポートする

私はできる限りすべてをオープンソース化しており、これらのプロジェクトを使って助けが必要な人全員に返信しようと努力しています。明らかに、これは時間がかかります。このサービスは無料で利用できます。

しかし、このプロジェクトを使用していて満足している、またはただ継続して作成することを奨励したいだけでも、いくつかの方法があります :-

- このアクションを使用するときに readme で適切なクレジットを記載し、リンクを戻す :D
- プロジェクトをスター付きにし、共有する :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - PayPal を通じて一回限りの寄付を行うことができます。私はおそらく~~ビール~~ワイン 🍷を購入するでしょう。

ありがとう！:heart:

# 貢献

貢献は歓迎されます ♥! ご希望の機能や、ユニットテストをぜひご提供ください。プルリクエストやイシューのシステムをご利用ください。

# 選出された貢献者

1. [Anmol Pratap Singh](https://github.com/anmol098): メンテナ
2. [Alexander Sergeev](https://github.com/pseusys): メンテナ
3. [DataBoySu](https://github.com/DataBoySu): メンテナ
4. [okcoder1](https://github.com/ok-coder1): メンテナ
5. [Aravind V. Nair](https://github.com/aravindvnair99): メンテナ
6. [Prabhat Singh](https://github.com/prabhatdev): コードタイムライングラフの実装 [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): プルリクエスト [#34](https://github.com/anmol098/waka-readme-stats/pull/34) および [#23](https://github.com/anmol098/waka-readme-stats/pull/23) への貢献
8. [Pedro Torres](https://github.com/Corfucinas): プルリクエスト [#29](https://github.com/anmol098/waka-readme-stats/pull/29) への貢献
9. [Aaron Meese](https://github.com/ajmeese7): プルリクエスト [#45](https://github.com/anmol098/waka-readme-stats/pull/45) への貢献
10. [Arnav Jindal](https://github.com/Daggy1234): プルリクエスト [#48](https://github.com/anmol098/waka-readme-stats/pull/48) への貢献
11. [Daniel Rowe](https://github.com/DanRowe): プルリクエスト [#57](https://github.com/anmol098/waka-readme-stats/pull/57) への貢献
12. [Ss5h](https://github.com/tlatkdgus1): 翻訳用自然文の記述をサポート [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- そしてあなたも！もし今現在使用しているがリストに載っていない場合は、[Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) の issue を送って教えてください！:blush: \
  リストに加えてくれることを喜んでいます。

:heart: と Python 🐍 で作成されました。

# Inspired From

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### このプロジェクトは、あなたからの **star** ⭐ が必要です ♥

## 時間ごとのStargazers数

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

