<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.fr.md">🇫🇷 Français</a>
</div>
<!--END_SECTION:navbar-->

> [!WICHTIG]
> Wir suchen Übersetzer für dieses Projekt.
> Jede Art von Unterstützung wäre sehr willkommen.
> Bitte sieh dir das Issue https://github.com/anmol098/waka-readme-stats/issues/23 an, wenn du helfen möchtest!

# Entwicklermetriken in der README mit hinzugefügten Feature-Flags 🎌

![Projektvorschau](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Projektvorschau](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Fantastische Statistiken in der README</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/Programmiersprache-Python-blue?style=for-the-badge" alt="Python-Badge"/>
   <img src="https://img.shields.io/github/lizenz/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%E2%80%9CVogel%E2%80%9D%20oder%20%E2%80%9CNachtfalter%E2%80%9D?message=Wann%20bist%20du%20am%20produktivsten?&style=flat&color=BC4E99" alt="Produktivitäts-Badge"/>
</p>
<p align="center">
   Bist du ein früher Vogel oder ein Nachtfalter?
   <br/>
   Zu welcher Tageszeit bist du am produktivsten?
   <br/>
   In welchen Programmiersprachen programmierst du?
   <br/>
   Lass uns es in deiner Profil-README herausfinden!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Bug melden</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Feature anfordern</a>
  </p>

## Vorbereitungen

**1. Aktualisiere die Markdown-Datei (.md)**

Füge zwei Kommentare in die Markdown-Datei ein. Sieh dir [diesen Abschnitt](#update-your-readme) an, um zu erfahren, wie du das machst.

**2. Hole dir einen WakaTime API-Schlüssel**

Erhalte deinen WakaTime API-Schlüssel aus deinem WakaTime-Konto-Einstellungen. 
[Hier](#new-to-wakatime) findest du eine Anleitung, falls du WakaTime neu nutzt.

**3. Erstelle ein GitHub API-Token**

Erstelle ein GitHub API-Token mit `repo` und `user` Berechtigungen unter [GitHub Settings](https://github.com/settings/tokens).

Verwende [diese Anleitung](#profile-repository) als Beispiel.

**Hinweis:** Die `repo` Berechtigung kann **gefährlich** sein. Dieses GitHub-Action greift nur auf deine Commit-Zeitstempel und die Anzahl der hinzugefügten oder gelöschten Codezeilen in Repositories zu, an denen du mitgewirkt hast zu.

**4. Speichere API-Schlüssel und GitHub-Token als Geheimnisse im Repository**

Speichere deinen WakaTime API-Schlüssel und dein GitHub Personal Access Token (PAT) als Geheimnisse in den Einstellungen deines Repositories.

* WakaTime API-Schlüssel: `WAKATIME_API_KEY=<dein WakaTime API-Schlüssel>`
* GitHub Personal Access Token: `GH_TOKEN=<dein GitHub-Token>`

**5. Aktiviere und deaktiviere Feature-Flags nach Bedarf**

Du kannst dieses GitHub-Action zu jedem gewünschten Zeitpunkt mit `cron` ausführen. Besuche 
[Crontab.guru](https://crontab.guru/) und [diesen Link](https://crontab.cronhub.io/) für die Erstellung von `cron`-Ausdrücken.

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` kann durch jeden String ersetzt werden, der in der `SECTION_NAME`-Flagge gemäß der [Abschnitt-Verfügbaren Flags](#flags-verfügbar) angegeben ist.

Diese Zeilen dienen als Einstiegspunkte für die Entwicklermetriken.

## Neu bei WakaTime

WakaTime gibt dir einen Überblick darüber, wie viel Zeit du tatsächlich am Codieren verbringst. Dies hilft dir, deine Produktivität zu steigern und deinen Wettbewerbsvorteil zu stärken.

- Besuche **<https://wakatime.com>** und erstelle ein Konto.
- Hole dir deinen WakaTime API-Schlüssel aus den **[Kontoeinstellungen in WakaTime](https://wakatime.com/settings/account)**.
- Installiere das **[WakaTime-Plugin](https://wakatime.com/plugins)** in deiner bevorzugten Textbearbeitungs- oder IDE-Umgebung.
- Füge deinen API-Schlüssel ein, um die Analyse zu starten.

### Profil-Repository

Du benötigst ein [GitHub Access Token](https://docs.github.com/de/actions/konfigurieren-und-verwalten-von-workflows/authentifizierung-mit-dem-github_token), das über die Berechtigungen `repo` und `user` verfügt, und speichere es als Geheimnis im Repository: `GH_TOKEN = <Dein GitHub Access Token>`.

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

- Jetzt kannst du committen und warten, bis es automatisch ausgeführt wird, oder du kannst es auch manuell auslösen, um das Ergebnis sofort zu sehen. Gehe einfach zu den `Aktionen` in deinem Repository, wähle den Workflow `Profile Readme Development Stats` aus und klicke auf `Workflow ausführen`. Warte nun etwa eine Minute oder zwei, und du wirst deine Änderungen sehen.

## Zusätzliche Informationen

Wenn du weitere Daten zu deinen Statistiken hinzufügen möchtest, kannst du in deiner Workflow-Datei mehrere `FLAGS` hinzufügen. Standardmäßig sind alle Flags aktiviert (mit Ausnahme des Flags für die Zeilen von Code aufgrund der intensiven Berechnung).

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

`LOCALE`: Diese Flagge kann verwendet werden, um Statistiken in deiner Sprache anzuzeigen. Standard ist Englisch. Lokale [Kurzbeschreibungen](https://saimana.com/list-of-country-locale-code/) können über die Flaggenvariablen übergeben werden. Ein Beispiel für das Endergebnis findest du [hier](https://github.com/anmol098/anmol098/blob/master/Readme-de.md).

`SECTION_NAME`: Diese Flagge kann jeden Textstring als Namen der zu ersetzenden Sektion im README setzen.

`COMMIT_BY_ME`: Diese Flagge kann auf `True` gesetzt werden, um den Code mit deinem Namen und deiner E-Mail zu committen.

`COMMIT_MESSAGE`: Die Commit-Nachricht kann über diese Flagge festgelegt werden. Standard ist "Aktualisiert mit Entwicklermetriken".

`COMMIT_USERNAME`: Diese Flagge kann einen Benutzernamen zum Committen des Codes setzen. Standard ist "readme-bot".

`COMMIT_EMAIL`: Diese Flagge kann eine E-Mail zum Committen des Codes angeben. Standard ist "41898282+github-actions[bot]@users.noreply.github.com".

`SHOW_UPDATED_DATE`: Diese Flagge kann auf `True` gesetzt werden, um das Aktualisierungsdatum am Ende des Abschnitts anzuzeigen.

`UPDATED_DATE_FORMAT`: Diese Flagge kann das Format für das Aktualisierungsdatum festlegen. Standard ist `"%d/%m/%Y %H:%M:%S"`.

`SHOW_LINES_OF_CODE`: Diese Flagge kann auf `True` gesetzt werden, um die Anzahl der bis heute geschriebenen Codezeilen anzuzeigen.

![Zeilen des Codes](https://img.shields.io/badge/Von%20Hallo%20Welt%20bis%20hier%20geschrieben-1,3%20Millionen%20Codezeilen-blue)

`SHOW_TOTAL_CODE_TIME`: Diese Flagge kann auf `False` gesetzt werden, um die *Code Time* zu verbergen.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20Stunden%2054%20Minuten-blue)

`SHOW_PROFILE_VIEWS`: Diese Flagge kann auf `False` gesetzt werden, um die **Profile-Aufrufe** zu verbergen.

![Profile-Aufrufe](http://img.shields.io/badge/Profile%20Aufrufe-2189-blue)

`SHOW_COMMIT`: Diese Flagge kann auf `False` gesetzt werden, um die Commit-Statistiken zu verbergen.

**Ich bin ein früher Vogel 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Das `SHOW_DAYS_OF_WEEK`-Flag kann auf `False` gesetzt werden, um die Commits, die an den verschiedenen Wochentagen erstellt wurden, zu verbergen.

📅 **Ich bin sonntags am produktivsten**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

Der `SHOW_LANGUAGE`-Flag kann auf `False` gesetzt werden, um die Programmiersprachen, die du verwendest, zu verbergen.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Das `SHOW_OS`-Flag kann auf `False` gesetzt werden, um die Details deines Betriebssystems zu verbergen.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Das Flagge `SHOW_PROJECTS` kann auf `False` gesetzt werden, um die bearbeiteten Projekte zu verbergen.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Die `SHOW_TIMEZONE`-Flagg kann auf `False` gesetzt werden, um die Zeitzone, in der du dich befindest, zu verbergen.

```text
⌚︎ Timezone: Asia/Calcutta
```

Der `SHOW_EDITORS`-Flag kann auf `False` gesetzt werden, um die Liste der verwendeten Code-Editoren/IDEs zu verbergen.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Der `SHOW_LANGUAGE_PER_REPO`-Flag kann auf `False` gesetzt werden, um die Anzahl der Repositories nach verschiedenen Programmiersprachen und Frameworks zu verbergen.

**Ich programmieren hauptsächlich mit Vue.**

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

Ich veröffentliche fast alles, was ich schaffe, und bemühe mich, jeder Person, die Hilfe bei der Nutzung dieser Projekte benötigt, zu antworten. Natürlich kostet dies Zeit. Du kannst diese Dienstleistung kostenlos nutzen.

Wenn du jedoch dieses Projekt verwendest und zufrieden bist oder einfach nur motivieren möchtest, dass ich weiterhin kreative Dinge schaffe, gibt es einige Möglichkeiten, wie du dies tun kannst:

- Gib bei der Verwendung dieses Tools in deiner README angemessene Anerkennung und verlinke zurück :D
- Starte das Projekt und teile es :rocket:
- **[PayPal](https://www.paypal.me/aapreneur)** - Du kannst einmalige Spenden über PayPal leisten. Ich werde wahrscheinlich ein paar ~~Bier~~ Weine 🍷 kaufen.

Vielen Dank! :heart:

# Beiträge

Wir freuen uns über Beiträge ♥! Bitte teile neue Funktionen mit und füge Unit-Tests hinzu! Nutze die Pull-Request- und Issue-Systeme, um mitzuwirken.

# Ausgewählte Mitwirkende

1. [Anmol Pratap Singh](https://github.com/anmol098): Hauptverantwortlicher
2. [Alexander Sergeev](https://github.com/pseusys): Hauptverantwortlicher
3. [Aravind V. Nair](https://github.com/aravindvnair99): Hauptverantwortlicher
4. [Prabhat Singh](https://github.com/prabhatdev): Für den Code-Zeitlinien-Graphen [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Für die Pull Requests [#34](https://github.com/anmol098/waka-readme-stats/pull/34) und [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Für die Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Für die Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Für die Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Für die Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): Für die Einführung der Unterstützung für natürliche Satzstrukturen für die Übersetzung [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Und du! Wenn du es gerade verwendest und nicht auf der Liste bist, teile es uns bitte über ein [Spezial-Erwähnungs-Ticket](https://github.com/anmol098/waka-readme-stats/issues/new/choose) mit! :blush: Wir freuen uns, dich hinzuzufügen.

Erstellt mit :heart: und Python 🐍.

# Inspired From

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Dieses Projekt benötigt deine **Sterne** ⭐ von dir ♥.

## Stargazer-Entwicklung über die Zeit

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

