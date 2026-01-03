<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Dev-Metriken in README mit hinzugefügten Feature-Flags 🎌

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
   Bist du ein frühes 🐤 oder ein nächtliches 🦉?
   <br/>
   Wann bist du am produktivsten am Tag?
   <br/>
   Welche Sprachen codierst du?
   <br/>
   Schauen wir es in deinem Profil-README an!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Bug melden</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Funktion anfordern</a>
  </p>

## Vorbereitung

1. Du musst die Markdown-Datei(`.md`) mit 2 Kommentaren aktualisieren. Du kannst [hier](#update-your-readme) nachlesen, wie du das machen kannst.
2. Du benötigst einen WakaTime API-Schlüssel. Du kannst diesen in den Einstellungen deines WakaTime-Kontos abrufen
    - Du kannst [hier](#new-to-wakatime) nachlesen, wenn du neu bei WakaTime bist.
3. Wenn du die Aktion zum Abrufen von Commit-Metriken ausführst, benötigst du einen GitHub API-Token mit `repo` und `user` Bereich von [hier](https://github.com/settings/tokens)
   - Du kannst [dieses](#profile-repository) Beispiel verwenden, um es zu verstehen.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. Du musst den WakaTime API Key und den GitHub API Token in den Repository-Secrets speichern. Du kannst das in den Einstellungen deines Repositorys finden. \
  Stelle sicher, sie unter folgenden Namen zu speichern:
    - WakaTime API Key als `WAKATIME_API_KEY=<deiner wakatime API Key>`
    - GitHub Personal Access Token (PAT) als `GH_TOKEN=<dein github access token>`
5. Du kannst Feature-Flags basierend auf deinen Anforderungen aktivieren und deaktivieren.

Dieser GitHub Action kann so konfiguriert werden, dass er zu jedem Zeitpunkt, den du möchtest, mit `cron` läuft. Sieh dir [Crontab.guru](https://crontab.guru/) und [dieses](https://crontab.cronhub.io/) Website an, um `cron` Ausdrücke zu generieren.

## Update your Readme

Füge einem Kommentar zu deinem `README.md` wie diesem hinzu:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` kann durch jeden String ersetzt werden, der in der `SECTION_NAME`-Flag spezifiziert ist, wie in [der verfügbaren Flags-Sektion](#flags-available) beschrieben.

Diese Zeilen werden unsere Einstiegspunkte für die Entwickler-Metriken sein.

## Neu bei WakaTime

WakaTime gibt dir einen Einblick in die Zeit, die du wirklich für das Coden aufwendest. Dies hilft dir, deine Produktivität und dein Wettbewerbsvorteil zu steigern.

- Gehe zu <https://wakatime.com> und erstelle ein Konto.
- Hol dir deinen WakaTime API-Schlüssel in den [Kontoeinstellungen in WakaTime](https://wakatime.com/settings/account).
- Installiere das [WakaTime-Plugin](https://wakatime.com/plugins) in deinem bevorzugten Editor / IDE.
- Füge deinen API-Schlüssel ein, um die Analyse zu starten.

### Profil-Repository

Du wirst einen [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) mit einem `repo` und `user` Umfang benötigen und ihn im Repo Geheimnis `GH_TOKEN = <Dein GitHub Access Token>` speichern.

Hier ist eine Beispielworkflow-Datei zum Ausführen:

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

- Jetzt kannst du commiten und warten, bis es automatisch läuft, oder du kannst es auch manuell auslösen, um das Ergebnis jetzt zu sehen. Gehe einfach zu `Actions` in deinem Repo, wähle deinen `Profile Readme Development Stats` Workflow aus und klicke auf `Run workflow`. Jetzt musst du nur noch ein oder zwei Minuten warten und du wirst deine Änderungen sehen.

## Extras

Wenn du andere Informationen zu deinen Statistiken hinzufügen möchtest, kannst du mehrere `FLAGS` in deine Workflow-Datei einfügen. Standardmäßig sind alle Flags aktiviert (außer dem Flag für Zeilen von Code aufgrund der intensiven Operation, die durchgeführt wird)

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

`LOCALE`  Dieser Flag kann verwendet werden, um Statistiken in deiner Sprache anzuzeigen. Standard ist Englisch. Lokal [Kurzform](https://saimana.com/list-of-country-locale-code/) muss in der Flag-Variable übergeben werden. Ein Beispiel für das Endresultat kann [hier](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md) gefunden werden.

Der `SECTION_NAME`-Flag kann auf jeden String gesetzt werden und wird der Name des Abschnitts sein, der im README ersetzt wird.

Der `COMMIT_BY_ME`-Flag kann auf `True` gesetzt werden, um den Code mit deinem Namen und E-Mail-Adresse zu committen.

Der `COMMIT_MESSAGE`-Flag kann für die Commit-Nachricht gesetzt werden. Der Standard ist "Updated with Dev Metrics".

Der `COMMIT_USERNAME`-Flag kann als Benutzername gesetzt werden, um den Code zu committen. Der Standard ist "readme-bot".

Der `COMMIT_EMAIL`-Flag kann auf eine E-Mail-Adresse gesetzt werden, um den Code zu committen. Der Standard ist "41898282+github-actions[bot]@users.noreply.github.com".

Der `SHOW_UPDATED_DATE`-Flag kann auf `True` gesetzt werden, um das aktualisierte Datum am Ende des Absatzes anzuzeigen.

Der `UPDATED_DATE_FORMAT`-Flag kann gesetzt werden, um das aktualisierte Datum in ein Format zu setzen. Der Standard ist `"%d/%m/%Y %H:%M:%S"`.

Der `SHOW_LINES_OF_CODE`-Flag kann auf `True` gesetzt werden, um die Anzahl der geschriebenen Zeilen Code bis heute anzuzeigen.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

Der `SHOW_TOTAL_CODE_TIME`-Flag kann auf `False` gesetzt werden, um *Code Time* zu verbergen.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

Der `SHOW_PROFILE_VIEWS`-Flag kann auf `False` gesetzt werden, um **Profile Views** zu verbergen.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

Der `SHOW_COMMIT`-Flag kann auf `False` gesetzt werden, um die Commit-Statistiken zu verbergen.

**Ich bin ein frühes 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Die `SHOW_DAYS_OF_WEEK`-Flagge kann auf `False` gesetzt werden, um die Commits, die an verschiedenen Tagen der Woche vorgenommen wurden, zu verbergen.

📅 **Ich bin am produktivsten an Sonntagen**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

Die `SHOW_LANGUAGE`-Flagge kann auf `False` gesetzt werden, um die von dir verwendeten Programmiersprachen zu verbergen.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Die `SHOW_OS`-Flagge kann auf `False` gesetzt werden, um deine OS-Details zu verbergen.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Die `SHOW_PROJECTS`-Flagge kann auf `False` gesetzt werden, um die bearbeiteten Projekte zu verbergen.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Der `SHOW_TIMEZONE`-Flag kann auf `False` gesetzt werden, um die Zeitzone zu verbergen, in der du dich befindest.

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

Die `SHOW_LANGUAGE_PER_REPO`-Flagge kann auf `False` gesetzt werden, um die Anzahl der Repositories in verschiedenen Programmiersprachen und Frameworks zu verbergen.

**Ich codiere hauptsächlich in Vue**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

Der `SHOW_SHORT_INFO`-Flag kann auf `False` gesetzt werden, um die kurze, lustige Fakten-Info eines Benutzers zu verbergen.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 Meine GitHub-Daten**

> 🏆 433 Beiträge im Jahr 2020
 >
> 📦 292,3 kB in GitHub-Speicher verwendet
 >
> 💼 Auf Suche nach Arbeit
 >
> 📜 25 öffentliche Repositorys
 >
> 🔑 15 private Repositorys, die ich besitze

Der `SHOW_LOC_CHART`-Flag kann auf `False` gesetzt werden, um die Zeilenanzahl, die in verschiedenen Quartalen unterschiedlicher Jahre geschrieben wurden, zu verbergen.

Der `IGNORED_REPOS`-Flag kann auf `"waka-readme-stats, my-first-repo"` (nur ein Beispiel) gesetzt werden, um einige Repositorys zu ignorieren, die nicht gezählt werden sollen.

Der `SYMBOL_VERSION`-Flag kann für das Symbol der Fortschrittsleiste gesetzt werden (Standard: `1`).

| Version | Erledigter Block | Leerer Block |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

Der `DEBUG_LOGGING`-Flag kann gesetzt werden, um die Ausgabelautstärke der GitHub-Action zu erhöhen, standardmäßig entspricht er der internen Debug-Eigenschaft des Laufers.

**Zeitstrahl**

![Chart nicht gefunden](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Das Projekt unterstützen

Ich open-source fast alles, was ich kann, und versuche, auf jeden zu antworten, der Hilfe bei diesen Projekten benötigt. Offensichtlich
dauert das Zeit. Du kannst diesen Service kostenlos nutzen.

Allerdings, wenn du dieses Projekt verwendest und damit zufrieden bist oder einfach nur möchte, dass ich weiterhin Dinge erstelle, gibt es ein paar Möglichkeiten, das zu tun :-

- Gib bei Verwendung dieser Aktion in deinem Readme die richtige Quelle an und verlinke sie :D
- Stern und teile das Projekt :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Du kannst Einmalzahlungen über PayPal tätigen. Ich werde wahrscheinlich etwas ~~Bier~~ Wein 🍷 kaufen.

Danke! :heart:

# Beiträge

Beiträge sind willkommen ♥! Bitte teile jede Funktion und füge Unit-Tests hinzu! Nutze das Pull-Request- und Issues-System, um beizutragen.

# Ausgewählte Mitwirkende

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [DataBoySu](https://github.com/DataBoySu): Maintainer
4. [okcoder1](https://github.com/ok-coder1): Maintainer
5. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
6. [Prabhat Singh](https://github.com/prabhatdev): Für den Code-Zeitlinien-Graphen [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Für den Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) und [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): Für den Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): Für den Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): Für den Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): Für den Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): Für die Hinzufügung von Unterstützung für natürliche Satzformulierungen bei der Übersetzung [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Und du! Wenn du es gerade jetzt verwendest und nicht auf der Liste stehst, melde dich bitte, indem du ein [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose)-Issue erstellst! :blush:  
  Wir freuen uns, dich auf die Liste zu setzen.

Erstellt mit :heart: und Python 🐍.

# Inspiriert von

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Dieses Projekt benötigt ein **Stern** ⭐ von dir ♥

## Stargazers über die Zeit

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

