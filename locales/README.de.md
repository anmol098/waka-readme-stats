<!--START_SECTION:navbar-->

<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="../locales/README.de.md">🇩🇪 Deutsch</a> | <a href="../locales/README.es.md">🇪🇸 Español</a> | <a href="../locales/README.fr.md">🇫🇷 Français</a> | <a href="../locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="../locales/README.ja.md">🇯🇵 日本語</a> | <a href="../locales/README.ko.md">🇰🇷 한국어</a> | <a href="../locales/README.pt.md">🇵🇹 Português</a> | <a href="../locales/README.ru.md">🇷🇺 Русский</a> | <a href="../locales/README.zh.md">🇨🇳 中文</a>
</div>

<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Metriken für Entwickler in der README mit hinzugefügten Feature-Flags 🎌

![Projektvorschau](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Projektvorschau](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Ausgezeichnete README-Statistiken</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/Programmiersprache-Python-blue?style=for-the-badges" alt="Sprache: Python"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=Wenn+nützlich&style=flat&color=BC4E99" alt="Sternen-Badge">
</p>

<p align="center">
   Bist du ein früher Vogel 🐤 oder ein Nachtfalter 🦉?
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

## Vorbereitungsarbeit

Hier sind die Schritte, um dieses Projekt einzurichten:

1. **Aktualisiere die Markdown-Datei (.md)**: Füge zwei Kommentare hinzu, wie in der Sektion "[Update deine README](#update-your-readme)" beschrieben.

2. **Erhalte einen WakaTime API-Schlüssel**: Melde dich bei deinem WakaTime-Konto an und gehe zu den Einstellungen, um deinen API-Schlüssel zu erhalten. Weitere Informationen findest du unter "[Neues bei WakaTime?](#new-to-wakatime)".

3. **Erstelle ein GitHub API-Token**: Gehe zu [GitHub Settings > Tokens](https://github.com/settings/tokens) und erstelle ein Token mit den Berechtigungen `repo` und `user`. Du kannst das Beispiel unter "[Repository profilieren](#profile-repository)" verwenden, um die erforderlichen Berechtigungen zu verstehen.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

## Anleitung zur Konfiguration und Ausführung

**1. Speichern Sie API-Schlüssel in Repository-Geheimnissen:**

 - Navigieren Sie zu den Einstellungen Ihres GitHub-Repositories.
 - Gehen Sie zu **Secrets** und fügen Sie zwei neue Geheimnisse hinzu:
    - `WAKATIME_API_KEY`: Fügen Sie Ihren WakaTime API-Schlüssel ein.
    - `GH_TOKEN`: Fügen Sie Ihr GitHub Personal Access Token (PAT) ein.

**2. Aktivieren/Deaktivieren von Feature Flags:**

Konfigurieren Sie die gewünschten Feature Flags je nach Bedarf.

**3. Einrichten der GitHub Action:**

- Erstellen oder bearbeiten Sie das Workflow-Datei in Ihrem Repository (z.B. `.github/workflows/main.yml`).
- Fügen Sie einen Job hinzu, der Ihre Skripte oder Aktionen ausführt.
- Konfigurieren Sie den Job, um die GitHub Action zu einem gewünschten Zeitpunkt auszuführen. Dies kann mit `cron`-Ausdrücken erfolgen. 
- Besuchen Sie [Crontab.guru](https://crontab.guru/) oder [cronhub.io](https://crontab.cronhub.io/) für die Erstellung von `cron`-Ausdrücken.

**Beispiel für einen GitHub Action Workflow (main.yml):**

```yaml
name: WakaTime Integration

on:
  schedule:
    - cron: '0 0 * * *' # Ausführung täglich um Mitternacht

jobs:
  wakatime:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up WakaTime
        run: |
          # Hier Ihre WakaTime-Initialisierungskomandos

      - name: Track Time
        run: |
          # Hier Ihr Code zum Aufzeichnen der Arbeitszeit mit WakaTime
```

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` kann durch jeden String ersetzt werden, der im `SECTION_NAME`-Flag angegeben ist, gemäß der Sektion mit den **verfügbaren Flags**.

Diese Zeilen dienen als Einstiegspunkte für die Entwicklermetriken.

## Neu bei WakaTime

WakaTime gibt dir einen Einblick in die Zeit, die du tatsächlich am Codieren verbracht hast. Dies hilft dir, deine Produktivität zu steigern und deinen Wettbewerbsvorteil zu stärken.

- Besuche <https://wakatime.com> und erstelle ein Konto.
- Hole dir deinen WakaTime API-Schlüssel aus den [Kontoeinstellungen in WakaTime](https://wakatime.com/settings/account).
- Installiere das [WakaTime-Plugin](https://wakatime.com/plugins) in deiner bevorzugten Textbearbeitungs- oder IDE-Umgebung.
- Füge deinen API-Schlüssel ein, um die Analyse zu starten.

### Profil-Repository

Du benötigst ein [GitHub Access Token](https://docs.github.com/de/actions/konfigurieren-und-verwalten-von-workflows/authentifizierung-mit-dem-github_token), das mit den Berechtigungen `repo` und `user` ausgestattet ist, und speichere es als Geheimnis im Repository: `GH_TOKEN = <Dein GitHub Access Token>`

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

- Jetzt kannst du committen und warten, bis es automatisch ausgeführt wird, oder du kannst es auch manuell auslösen, um die Ergebnisse sofort zu sehen. Gehe einfach zu den `Aktionen` in deinem Repository, wähle den Workflow `Profile Readme Development Stats` aus und klicke auf `Workflow ausführen`. Warte nun ein paar Minuten und du wirst deine Änderungen sehen.

Wenn du weitere Informationen zu deinen Statistiken hinzufügen möchtest, kannst du in deiner Workflow-Datei mehrere `FLAGs` hinzufügen. Standardmäßig sind alle Flags aktiviert (außer dem Codezeilen-Flag aufgrund der intensiven Operation).

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

`LOCALE`: Diese Flagge kann verwendet werden, um die Statistiken in deiner Sprache anzuzeigen. Standardmäßig ist Englisch festgelegt. Lokale [Kurzkürzel](https://saimana.com/list-of-country-locale-code/) können in der Flaggenvariablen übergeben werden. Ein Beispiel für das endgültige Ergebnis kann [hier](https://github.com/anmol098/anmol098/blob/master/Readme-de.md) gefunden werden.

`SECTION_NAME`: Diese Flagge kann jeden Textstring sein und dient als Name der Sektion, die im README ersetzt wird.

`COMMIT_BY_ME`: Diese Flagge kann auf `True` gesetzt werden, um den Code mit deinem Namen und deiner E-Mail zu committen.

`COMMIT_MESSAGE`: Die Commit-Nachricht kann über diese Flagge festgelegt werden. Der Standardwert ist "Aktualisiert mit Entwicklermetriken".

`COMMIT_USERNAME`: Diese Flagge legt einen Benutzernamen für den Code-Commit fest. Der Standardwert ist "readme-bot".

`COMMIT_EMAIL`: Die E-Mail-Adresse für den Code-Commit kann über diese Flagge festgelegt werden. Der Standardwert ist "41898282+github-actions[bot]@users.noreply.github.com".

`SHOW_UPDATED_DATE`: Diese Flagge kann auf `True` gesetzt werden, um das Aktualisierungsdatum am Ende des Absatzes anzuzeigen.

`UPDATED_DATE_FORMAT`: Mit dieser Flagge kann das Format für das Aktualisierungsdatum festgelegt werden. Der Standardwert ist `"%d/%m/%Y %H:%M:%S"`.

`SHOW_LINES_OF_CODE`: Diese Flagge kann auf `True` gesetzt werden, um die Anzahl der bis heute geschriebenen Codezeilen anzuzeigen.

![Zeilen des Codes](https://img.shields.io/badge/Von%20Hallo%20Welt%20Ich%27ve%20geschrieben-1,3%20million%20Codezeilen-blue)

`SHOW_TOTAL_CODE_TIME`: Diese Flagge kann auf `False` gesetzt werden, um die *Code Time* zu verbergen.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20Stunden%2054%20Minuten-blue)

`SHOW_PROFILE_VIEWS`: Diese Flagge kann auf `False` gesetzt werden, um die **Profilaufrufe** zu verbergen.

![Profilaufrufe](http://img.shields.io/badge/Profilaufrufe-2189-blue)

`SHOW_COMMIT`: Diese Flagge kann auf `False` gesetzt werden, um die Commit-Statistiken zu verbergen.

Ich bin ein früher **Vogel** 🐤.

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Die `SHOW_DAYS_OF_WEEK`-Flag kann auf `False` gesetzt werden, um die an den verschiedenen Wochentagen vorgenommenen Commits zu verbergen.

📅 **Ich bin am produktivsten sonntags**

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

Der `SHOW_TIMEZONE`-Flag kann auf `False` gesetzt werden, um die Zeitzone, in der du dich befindest, zu verbergen.

```text
⌚︎ Timezone: Asia/Calcutta
```

Das Flagge `SHOW_EDITORS` kann auf `False` gesetzt werden, um die Liste der verwendeten Code-Editoren/IDEs zu verbergen.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Der Flagge `SHOW_LANGUAGE_PER_REPO` kann der Wert `False` zugewiesen werden, um die Anzahl der Repositories nach Programmiersprachen und Frameworks zu verbergen.

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

## Daten meines GitHub-Profils

> 🏆 Im Jahr 2020 habe ich 433 Beiträge geleistet.
>
> 📦 Auf GitHub wurden 292,3 kB Speicherplatz genutzt.
>
> 💼 Ich habe mich für die Einstellung entschieden.
>
> 📜 Es befinden sich 25 öffentliche Repositories.
>
> 🔑 Außerdem besitze ich 15 private Repositories.

Die `SHOW_LOC_CHART`-Flagge kann auf `False` gesetzt werden, um die Zeilencode-Aufschlüsselung nach Quartalen und Jahren zu verbergen.

Mit der `IGNORED_REPOS`-Flagge (z.B. `"waka-readme-stats, my-first-repo"`) können Repositories ausgeschlossen werden, die nicht berücksichtigt werden sollen.

Die `SYMBOL_VERSION`-Flagge kann für das Fortschrittsbalkensymbol festgelegt werden (Standard: `1`).

| Version | Abgeschlossene Blöcke | Leere Blöcke |
|-------- | -------------------- | ------------ |
| 1       | █                     | ░            |
| 2       | ⣿                     | ⣀            |
| 3       | ⬛                    | ⬜            |

Die `DEBUG_LOGGING`-Flagge kann gesetzt werden, um die Ausgabe der GitHub-Aktion zu erhöhen. Standardmäßig entspricht dies der internen Runner-Debug-Eigenschaft.

## Zeitachse

![Diagramm nicht gefunden](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Projekt unterstützen

Ich veröffentliche fast alles, was ich schaffe, und bemühe mich, jeder Person zu helfen, die diese Projekte nutzt. Natürlich kostet dies Zeit. Du kannst diesen Service kostenlos nutzen.

Allerdings gibt es einige Möglichkeiten, wie du das Projekt unterstützen kannst, wenn du es nützlich findest oder einfach nur motivieren möchtest, weiter kreative Dinge zu erschaffen:

- Gib bei der Verwendung dieses Tools in deiner README angemessene Anerkennung und verlinke zurück :D
- Starte das Projekt und teile es :rocket:
- [![PayPal](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Du kannst einmalige Spenden über PayPal leisten. Ich werde wahrscheinlich etwas ~~Bier~~ Wein 🍷 kaufen.

Vielen Dank! :heart:

# Beiträge

Beiträge sind herzlich willkommen ♥! Bitte teile alle neuen Funktionen und füge Unit-Tests hinzu! Nutze die Pull-Request- und Issue-Systeme, um deine Beiträge zu leisten.

# Ausgewählte Mitwirkende

1. [Anmol Pratap Singh](https://github.com/anmol098): Hauptverantwortlicher
2. [Alexander Sergeev](https://github.com/pseusys): Hauptverantwortlicher
3. [Aravind V. Nair](https://github.com/aravindvnair99): Hauptverantwortlicher
4. [Prabhat Singh](https://github.com/prabhatdev): Für den Code-Timeline-Graphen [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Für die Pull Requests [#34](https://github.com/anmol098/waka-readme-stats/pull/34) und [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Für die Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Für die Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Für die Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Für die Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): Für die Einführung der Unterstützung für natürliche Satzstrukturen bei der Übersetzung [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Und du! Wenn du es gerade verwendest und nicht auf der Liste bist, teile uns dies bitte mit, indem du ein [Spezial-Erwähnungs-Ticket](https://github.com/anmol098/waka-readme-stats/issues/new/choose) eröffnest! :blush: Wir freuen uns, dich auf der Liste hinzuzufügen.

Hergestellt mit :heart: und Python 🐍.

# Inspiriert von

> [Fantastische gepinnte Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Dieses Projekt braucht deine **Sterne** 🌟

## Stargazer-Entwicklung über die Zeit

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

