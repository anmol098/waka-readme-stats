<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!WICHTIG]
> Wir suchen Übersetzerinnen und Übersetzer für dieses Projekt.
> Jede Unterstützung wäre sehr willkommen.
> Bitte sehen Sie sich das Issue [hier](https://github.com/anmol098/waka-readme-stats/issues/23) an, wenn Sie helfen möchten!

# Entwicklermetriken in der README mit hinzugefügten Feature-Flags 🎌

![Projektvorschau](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

![Projektvorschau](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

# 📌✨ Hervorragende Projektstatistiken

----

# 🌐 Technologische Details

- **Programmiersprache:** Python
- **Lizenz:** GitHub-Lizenz
- **Sterne:** [Anzahl der Sterne](https://github.com/anmol098/waka-readme-stats/stargazers)
- **Forks:** [Anzahl der Forks](https://github.com/anmol098/waka-readme-stats/forks)

# 🦜 Zeitpräferenzen

Sind Sie ein **Frühaufsteher** oder ein **Nachteule**?

Wann sind Sie am produktivsten während des Tages?

# 🖥️ Programmiersprachen

Entdecken Sie die Programmiersprachen, mit denen Sie arbeiten!

Erkunden Sie diese Informationen in Ihrer Profil-README!

# 📢 Unterstützung

Falls Sie einen Fehler feststellen oder eine Funktion vorschlagen möchten, öffnen Sie bitte ein Issue:

- [Bug melden](https://github.com/anmol098/waka-readme-stats/issues)
- [Funktionswunsch einreichen](https://github.com/anmol098/waka-readme-stats/issues)

## Vorbereitende Arbeiten

**1. Aktualisierung der Markdown-Datei (.md)**

Fügen Sie der Markdown-Datei zwei Kommentare hinzu. Sie finden Anweisungen zur Aktualisierung der Datei [hier](#update-your-readme).

**2. WakaTime API-Schlüssel**

Sie benötigen einen API-Schlüssel von WakaTime. Dieser ist in Ihrem WakaTime-Konto unter den Einstellungen verfügbar. [Hier](#new-to-wakatime) finden Sie eine Anleitung für Neulinge bei WakaTime.

**3. GitHub API-Token**

Für die Ausführung der Aktion zur Erfassung von Commit-Metriken benötigen Sie ein GitHub API-Token mit `repo` und `user` Berechtigungen. Erstellen Sie ein Token unter [diesen](https://github.com/settings/tokens) Link. Sie können [dieses Beispiel](#profile-repository) verwenden, um es einzurichten.

> [!WICHTIG]
> Die Berechtigung `repo` kann **GEFÄHRLICH** sein. Diese GitHub-Aktion greift nur auf Ihre Commit-Zeitstempel und die Anzahl der hinzugefügten oder gelöschten Codezeilen in Repositories zu, an denen Sie mitgewirkt haben, zu.

**4. Speichern der API-Schlüssel und des GitHub-Tokens**

Speichern Sie den WakaTime API-Schlüssel und das GitHub-Token als Geheimnisse im Repository. Dies finden Sie in den Einstellungen Ihres Repositorys. Verwenden Sie folgende Formate:

- WakaTime API-Schlüssel: `WAKATIME_API_KEY=<Ihr WakaTime-API-Schlüssel>`
- GitHub-Personal-Access-Token (PAT): `GH_TOKEN=<Ihr GitHub-Zugangstoken>`

**5. Aktivierung und Deaktivierung von Feature-Flags**

Sie können Feature-Flags je nach Bedarf aktivieren und deaktivieren.

**6. Zeitgesteuerte Ausführung**

Diese GitHub-Aktion kann zu jeder gewünschten Zeit mithilfe von `cron` ausgeführt werden. Besuchen Sie [Crontab.guru](https://crontab.guru/) und [diesen](https://crontab.cronhub.io/) Link, um `cron`-Ausdrücke zu generieren.

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` kann durch jeden String ersetzt werden, der in der `SECTION_NAME`-Flagge gemäß dem Abschnitt [verfügbare Flags](#flags-verfügbar) angegeben ist.

Diese Zeilen dienen als Einstiegspunkte für die Entwicklermetriken.

## Neu bei WakaTime

WakaTime gibt Ihnen einen Überblick darüber, wie viel Zeit Sie tatsächlich am Codieren verbringen. Dies hilft Ihnen, Ihre Produktivität zu steigern und Ihren Wettbewerbsvorteil zu stärken.

- Besuchen Sie **<https://wakatime.com>** und erstellen Sie ein Konto.
- Holen Sie sich Ihren WakaTime API-Schlüssel aus Ihren **[Kontoeinstellungen in WakaTime](https://wakatime.com/settings/account)**.
- Installieren Sie das **[WakaTime-Plugin](https://wakatime.com/plugins)** in Ihrer bevorzugten Textbearbeitungs- oder IDE-Umgebung.
- Fügen Sie Ihren API-Schlüssel ein, um die Analyse zu starten.

### Profil-Repository

Sie benötigen ein [GitHub Access Token](https://docs.github.com/de/actions/konfigurieren-und-verwalten-von-workflows/authentifizierung-mit-dem-github_token), das über die Berechtigungen `repo` und `user` verfügt, und speichern Sie es als Geheimnis des Repositories unter `GH_TOKEN = <Ihr GitHub Access Token>`.

Hier ist ein Beispiel für eine Workflow-Datei zur Ausführung:

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

- Sie können nun einen Commit durchführen und warten, bis er automatisch ausgeführt wird, oder Sie können ihn manuell auslösen, um das Ergebnis sofort zu sehen. Gehen Sie dazu in Ihrem Repository zu den `Aktionen`, wählen Sie den Workflow `Profile Readme Development Stats` aus und klicken Sie auf `Workflow ausführen`. Warten Sie nun etwa eine Minute oder zwei, und Sie werden Ihre Änderungen sehen.

Wenn Sie weitere Informationen zu Ihren Statistiken hinzufügen möchten, können Sie in Ihrer Workflow-Datei mehrere `FLAGS` hinzufügen. Standardmäßig sind alle Flags aktiviert (mit Ausnahme des Flags für die Zeilen von Code aufgrund der intensiven Operation).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Flags verfügbar

---

`LOCALE` Dieses Flag kann verwendet werden, um Statistiken in Ihrer Sprache anzuzeigen. Standardmäßig ist die Sprache Englisch. Lokale Abkürzungen (Short Hand) gemäß [diesem Link](https://saimana.com/list-of-country-locale-code/) sind in der Flagge zu übergeben. Ein Beispiel für das Endergebnis finden Sie [hier](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

Das `SECTION_NAME`-Flag kann auf jeden beliebigen String gesetzt werden und dient als Name der Sektion, die im README ersetzt werden soll.

Das `COMMIT_BY_ME`-Flag kann auf `True` gesetzt werden, um den Code mit Ihrem Namen und Ihrer E-Mail zu committen.

Das `COMMIT_MESSAGE`-Flag kann für die Commit-Nachricht festgelegt werden. Standardmäßig lautet diese "Aktualisiert mit Entwicklermetriken".

Das `COMMIT_USERNAME`-Flag kann als Benutzername zum Committen des Codes gesetzt werden. Standardmäßig ist dies "readme-bot".

Das `COMMIT_EMAIL`-Flag kann eine E-Mail zum Committen des Codes festgelegt werden. Standardmäßig ist dies "41898282+github-actions[bot]@users.noreply.github.com".

Das `SHOW_UPDATED_DATE`-Flag kann auf `True` gesetzt werden, um das Aktualisierungsdatum am Ende des Absatzes anzuzeigen.

Das `UPDATED_DATE_FORMAT`-Flag kann verwendet werden, um das Aktualisierungsdatum in einem bestimmten Format anzuzeigen. Standardmäßig ist dies `"%d/%m/%Y %H:%M:%S"`.

Das `SHOW_LINES_OF_CODE`-Flag kann auf `True` gesetzt werden, um die Anzahl der bis heute geschriebenen Codezeilen anzuzeigen.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

Die Flagge `SHOW_TOTAL_CODE_TIME` kann auf `False` gesetzt werden, um die *Codezeit* zu verbergen.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

Der `SHOW_PROFILE_VIEWS`-Flag kann auf `False` gesetzt werden, um **Profilansichten** auszublenden.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

Das Flag `SHOW_COMMIT` kann auf `False` gesetzt werden, um die Commit-Statistiken auszublenden.

**Ich bin ein Frühaufsteher.**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Die `SHOW_DAYS_OF_WEEK`-Flagge kann auf `False` gesetzt werden, um die an den verschiedenen Wochentagen vorgenommenen Commits zu verbergen.

📅 **Ich bin an Sonntagen am produktivsten**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

Das Flagg `SHOW_LANGUAGE` kann auf `False` gesetzt werden, um die Programmiersprachen, die Sie verwenden, zu verbergen.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Die `SHOW_OS`-Flag kann auf `False` gesetzt werden, um die Details Ihres Betriebssystems zu verbergen.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Das Flag `SHOW_PROJECTS` kann auf `False` gesetzt werden, um die bearbeiteten Projekte zu verbergen.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Die `SHOW_TIMEZONE`-Flagg kann auf `False` gesetzt werden, um die Zeitzone, in der Sie sich befinden, zu verbergen.

```text
⌚︎ Timezone: Asia/Calcutta
```

Die Flagge `SHOW_EDITORS` kann auf `False` gesetzt werden, um die Liste der verwendeten Code-Editoren/IDEs zu verbergen.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Das Flagge `SHOW_LANGUAGE_PER_REPO` kann auf `False` gesetzt werden, um die Anzahl der Repositories in verschiedenen Programmiersprachen und Frameworks zu verbergen.

**Ich programme hauptsächlich mit Vue.**

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

## :sparkling_heart: Projekt unterstützen

Ich veröffentliche fast alles, was ich entwickle, als Open-Source-Software und bemühe mich, allen zu helfen, die diese Projekte nutzen. Natürlich kostet dies Zeit. Dieser Service ist kostenlos nutzbar.

Wenn Sie dieses Projekt jedoch nutzen und damit zufrieden sind oder mich einfach dazu ermutigen möchten, weiterhin kreative Dinge zu entwickeln, gibt es einige Möglichkeiten, wie Sie dies tun können:

- Geben Sie bei der Verwendung dieses Tools in Ihrer README-Datei die entsprechende Anerkennung, und verlinken Sie zurück :D
- Sternen und teilen Sie das Projekt :rocket:
- **[PayPal](https://www.paypal.me/aapreneur)** - Sie können einmalige Spenden über PayPal leisten. Ich werde wahrscheinlich ein paar ~~Bier~~ Weine kaufen 🍷.

Vielen Dank! :heart:

# Beiträge

Beiträge sind herzlich willkommen ♥! Bitte teilen Sie alle Funktionen und fügen Sie Unit-Tests hinzu! Nutzen Sie die Pull-Request- und Issue-Systeme, um beizutragen.

# Ausgewählte Mitwirkende

1. [Anmol Pratap Singh](https://github.com/anmol098): Unterhalter
2. [Alexander Sergeev](https://github.com/pseusys): Unterhalter
3. [Aravind V. Nair](https://github.com/aravindvnair99): Unterhalter
4. [Prabhat Singh](https://github.com/prabhatdev): Für den Code-Zeitraumgraphen [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Für die Pull-Requests [#34](https://github.com/anmol098/waka-readme-stats/pull/34) und [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Für die Pull-Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Für die Pull-Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Für die Pull-Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Für die Pull-Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): Für die Einführung der Unterstützung für natürliche Satzschreibung für die Übersetzung [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Und Sie! Wenn Sie es gerade nutzen und nicht auf der Liste stehen, teilen Sie es uns bitte über ein [Spezial-Erwähnungs-Ticket](https://github.com/anmol098/waka-readme-stats/issues/new/choose) mit! :blush: 
  Wir würden uns freuen, Sie auf der Liste hinzuzufügen.

Hergestellt mit :heart: und Python 🐍.

# Inspiriert von

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists)
>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Dieses Projekt benötigt ein **Sternchen** ⭐ von Ihnen ♥

## Sternchen-Beobachter im Zeitverlauf

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

