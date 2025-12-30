<!--START_SECTION:navbar-->

<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="../locales/README.de.md">🇩🇪 Deutsch</a> | <a href="../locales/README.es.md">🇪🇸 Español</a> | <a href="../locales/README.fr.md">🇫🇷 Français</a> | <a href="../locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="../locales/README.ja.md">🇯🇵 日本語</a> | <a href="../locales/README.ko.md">🇰🇷 한국어</a> | <a href="../locales/README.pt.md">🇵🇹 Português</a> | <a href="../locales/README.ru.md">🇷🇺 Русский</a> | <a href="../locales/README.zh.md">🇨🇳 中文</a>
</div>

<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Dev Metrics in README with added feature flags 🎌

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
   Are you an early 🐤 or a night 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   What are the languages that you code in?
   <br/>
   Let's check it out in your profile's README!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Bug melden</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Funktion anfordern</a>
  </p>

## Vorbereitung

1. Sie müssen die Markdown-Datei (`.md`) mit 2 Kommentaren aktualisieren. Sie können sich hierzu [hier](#update-your-readme) orientieren.
2. Sie benötigen einen WakaTime API-Schlüssel. Diesen erhalten Sie in den Einstellungen Ihres WakaTime-Kontos
    - Sie können sich [hier](#new-to-wakatime) orientieren, wenn Sie neu bei WakaTime sind.
3. Wenn Sie die Aktion zum Abrufen von Commit-Metriken ausführen, benötigen Sie einen GitHub API-Token mit den Bereichen `repo` und `user` von [hier](https://github.com/settings/tokens).
   - Sie können sich [diesem Beispiel](#profile-repository) entnehmen, wie Sie dies umsetzen können.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. Sie müssen den WakaTime API-Schlüssel und das GitHub API-Token in den Repository-Geheimnissen speichern. Sie finden dies im Einstellungen-Bereich Ihres Repositories. \
  Stellen Sie sicher, dass Sie diese wie folgt speichern:
    - WakaTime API-Schlüssel als `WAKATIME_API_KEY=<Ihr wakatime API-Schlüssel>`
    - GitHub-Persönlicher Zugriffstoken (PAT) als `GH_TOKEN=<Ihr github-Zugriffstoken>`
2. Sie können Feature-Flags basierend auf Ihren Anforderungen aktivieren und deaktivieren.

Diese GitHub-Action kann mit `cron` so eingestellt werden, dass sie zu einem beliebigen Zeitpunkt läuft. Siehe [Crontab.guru](https://crontab.guru/) und [dieses](https://crontab.cronhub.io/) Website, um `cron` Ausdrücke zu generieren.

 

## Update your Readme

Füge deinem `README.md` eine Kommentarzeile wie diese hinzu:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

 

„waka“ kann durch einen beliebigen String ersetzt werden, der im `SECTION_NAME`-Flag angegeben ist, wie in [der verfügbaren Flags-Sektion](#flags-available) beschrieben.

Diese Zeilen werden unsere Einstiegspunkte für die Entwicklermetriken sein.

## New zu WakaTime

WakaTime gibt Ihnen einen Einblick in die Zeit, die Sie wirklich für das Coden aufgewendet haben. Dies hilft Ihnen dabei, Ihre Produktivität und Ihren Wettbewerbsvorteil zu steigern.

- Besuchen Sie <https://wakatime.com> und erstellen Sie ein Konto.
- Holen Sie sich Ihren WakaTime API-Schlüssel über die [Kontoeinstellungen in WakaTime](https://wakatime.com/settings/account).
- Installieren Sie das [WakaTime-Plugin](https://wakatime.com/plugins) in Ihrem bevorzugten Editor / IDE.
- Fügen Sie Ihren API-Schlüssel ein, um die Analyse zu starten.

 

### Profil-Repository

Sie benötigen einen [GitHub-Zugriffstoken](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) mit den Bereichen `repo` und `user` und müssen ihn im Repo-Secrets-Store unter `GH_TOKEN = <Ihr GitHub-Zugriffstoken>` speichern

Hier ist eine Beispielworkflow-Datei zur Ausführung:

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

Jetzt können Sie commiten und warten, bis es automatisch läuft, oder Sie können es auch jetzt manuell auslösen, um das Ergebnis zu sehen. Gehen Sie einfach zu `Actions` in Ihrem Repository, wählen Sie Ihren Workflow `Profile Readme Development Stats` aus und klicken Sie auf `Run workflow`. Warten Sie nun eine Minute oder zwei und Sie werden Ihre Änderungen sehen.


</think>

## Extras

Wenn Sie andere Informationen zu Ihren Statistiken hinzufügen möchten, können Sie mehrere `FLAGS` in Ihrer Workflow-Datei hinzufügen. Standardmäßig sind alle Flags aktiviert (außer dem Flag für Zeilenanzahl aufgrund der schweren Operation).

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

`LOCALE`  Diese Flaggen können verwendet werden, um Statistiken in Ihrer Sprache anzuzeigen. Standardmäßig ist es Englisch. Lokalisation [Kurzform](https://saimana.com/list-of-country-locale-code/) wird im Flaggen-Variable übergeben. Ein Beispiel für das Endresultat finden Sie [hier](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

Die `SECTION_NAME`-Flagge kann auf jede Zeichenfolge gesetzt werden und wird der Name des Abschnitts sein, der in der README ersetzt wird.

Die `COMMIT_BY_ME`-Flagge kann auf `True` gesetzt werden, um den Code mit Ihrem Namen und E-Mail zu committen.

Die `COMMIT_MESSAGE`-Flagge kann für die Commit-Nachricht gesetzt werden. Der Standardwert ist "Updated with Dev Metrics".

Die `COMMIT_USERNAME`-Flagge kann als Benutzername zum Committen des Codes gesetzt werden. Der Standardwert ist "readme-bot".

Die `COMMIT_EMAIL`-Flagge kann auf eine E-Mailadresse gesetzt werden, um den Code zu commiten. Der Standardwert ist "41898282+github-actions[bot]@users.noreply.github.com".

Die `SHOW_UPDATED_DATE`-Flagge kann auf `True` gesetzt werden, um das aktualisierte Datum am Ende des Absatzes anzuzeigen.

Die `UPDATED_DATE_FORMAT`-Flagge kann gesetzt werden, um das aktualisierte Datum in ein Format zu bringen. Der Standardwert ist `"%d/%m/%Y %H:%M:%S"`.

Die `SHOW_LINES_OF_CODE`-Flagge kann auf `True` gesetzt werden, um die Anzahl der geschriebenen Zeilen bis dato anzuzeigen.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

Die `SHOW_TOTAL_CODE_TIME`-Flagge kann auf `False` gesetzt werden, um *Code Time* zu verstecken.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

Die `SHOW_PROFILE_VIEWS`-Flagge kann auf `False` gesetzt werden, um **Profile Views** zu verstecken.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

Die `SHOW_COMMIT`-Flagge kann auf `False` gesetzt werden, um die Commit-Statistiken zu verstecken.

**Ich bin ein Frühvogel 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Die Flagge `SHOW_DAYS_OF_WEEK` kann auf `False` gesetzt werden, um die Commits, die an verschiedenen Tagen der Woche vorgenommen wurden, zu verbergen.

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

Der Flag `SHOW_LANGUAGE` kann auf `False` gesetzt werden, um die von Ihnen verwendeten Programmiersprachen zu verbergen.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Der Flag `SHOW_OS` kann auf `False` gesetzt werden, um Ihre Betriebssystem-Details zu verbergen.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Der Flag `SHOW_PROJECTS` kann auf `False` gesetzt werden, um die bearbeiteten Projekte zu verbergen.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Der Flag `SHOW_TIMEZONE` kann auf `False` gesetzt werden, um die Zeitzone zu verbergen, in der Sie sich befinden.

```text
⌚︎ Timezone: Asia/Calcutta
```

Der Flag `SHOW_EDITORS` kann auf `False` gesetzt werden, um die Liste der verwendeten Code-Editoren/IDEs zu verbergen.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Die Flagge `SHOW_LANGUAGE_PER_REPO` kann auf `False` gesetzt werden, um die Anzahl der Repositories in verschiedenen Programmiersprachen und Frameworks zu verbergen.

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

Der Flag `SHOW_SHORT_INFO` kann auf `False` gesetzt werden, um die kurze interessante Info eines Benutzers zu verbergen.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 Meine GitHub-Daten**

> 🏆 433 Beiträge im Jahr 2020
 >
> 📦 292,3 kB in der GitHub-Speicherung verwendet
 >
> 💼 Auf Einstellung zur Rekrutierung gesetzt
 >
> 📜 25 öffentliche Repositorys
 >
> 🔑 15 private Repositorys, die ich besitze

Die `SHOW_LOC_CHART`-Flagge kann auf `False` gesetzt werden, um die Zeilenanzahl in verschiedenen Quartalen unterschiedlicher Jahre zu verbergen.

Die `IGNORED_REPOS`-Flagge kann auf `"waka-readme-stats, my-first-repo"` (nur ein Beispiel) gesetzt werden, um einige Repositorys zu ignorieren, die nicht gezählt werden sollen.

Die `SYMBOL_VERSION`-Flagge kann für das Symbol der Fortschrittsleiste gesetzt werden (Standard: `1`).

| Version | Erledigter Block | Leerer Block |
|-------- | ---------------- | ------------ |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

Die `DEBUG_LOGGING`-Flagge kann gesetzt werden, um die Ausgabemenge der GitHub-Aktion zu erhöhen. Standardmäßig entspricht sie der internen Debug-Eigenschaft des Laufwerks.

**Zeitleiste**

![Chart nicht gefunden](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Das Projekt unterstützen

Ich open-source fast alles, was ich kann, und versuche, auf alle Anfragen um Hilfe bezüglich dieser Projekte zu antworten. Selbstverständlich
nimmt das Zeit in Anspruch. Sie können diesen Service kostenlos nutzen.

Wenn Sie jedoch dieses Projekt verwenden und damit zufrieden sind oder einfach nur meine Arbeit weiterhin zu schaffen motivieren möchten, gibt es einige Möglichkeiten, dies zu tun :-

- Geben Sie bei der Verwendung dieser Aktion in Ihrem Readme die richtigen Credits, verlinken Sie zurück zu ihr :D
- Stern geben und das Projekt teilen :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Sie können über PayPal Einmal-Spenden tätigen. Ich werde wahrscheinlich etwas ~~Bier~~ Wein 🍷 kaufen.

Vielen Dank! :heart:

---

 

Beitragen

Beiträge sind willkommen ♥! Bitte teilen Sie uns jede Funktion mit und fügen Sie Unit-Tests hinzu! Nutzen Sie das Pull-Request- und Issues-System, um beizutragen.

# Ausgewählte Mitwirkende

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
4. [Prabhat Singh](https://github.com/prabhatdev): Für den Code-Zeitlinien-Graphen [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Für das Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) und [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Für das Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Für das Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Für das Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Für das Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): Für die Unterstützung der natürlichen Satzschreibweise für Übersetzungen [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

Und du! Wenn du es gerade jetzt verwendest und nicht in der Liste stehst, melde dich bitte per [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose)-Issue! :blush: \
Wir würden uns freuen, dich in die Liste aufzunehmen.

Erstellt mit :heart: und Python 🐍.

Inspired From

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

 

### Dieses Projekt benötigt ein **Stern** ⭐ von dir ♥

## Stargazer über die Zeit

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

