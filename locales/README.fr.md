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

# Métriques de développement dans le README avec les drapeaux de fonctionnalités ajoutés 🎌

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
   Êtes-vous un très tôt 🐤 ou un nocturne 🦉?
   <br/>
   À quel moment de la journée êtes-vous le plus productif?
   <br/>
   Quelles sont les langues dans lesquelles vous codez?
   <br/>
   Découvrez-le dans votre README de profil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Signaler un bug</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Demander une fonctionnalité</a>
  </p>

## Travail préparatoire

1. Vous devez mettre à jour le fichier markdown (`.md`) avec 2 commentaires. Vous pouvez vous référer [ici](#update-your-readme) pour le mettre à jour.
2. Vous aurez besoin d'une clé API WakaTime. Vous pouvez l'obtenir depuis les paramètres du compte WakaTime
    - Vous pouvez vous référer [ici](#new-to-wakatime), si vous êtes nouveau sur WakaTime.
3. Vous aurez besoin d'un jeton API GitHub avec les portées `repo` et `user` depuis [ici](https://github.com/settings/tokens) si vous exécutez l'action pour obtenir les métriques de commit.
   - Vous pouvez utiliser [cet exemple](#profile-repository) pour vous y retrouver.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. Vous devez enregistrer la clé API WakaTime et le jeton d'accès personnel (PAT) GitHub dans les secrets du dépôt. Vous pouvez les trouver dans les Paramètres de votre dépôt. \
  Assurez-vous de les enregistrer comme suit :
    - Clé API WakaTime comme `WAKATIME_API_KEY=<votre clé API WakaTime>`
    - Jeton d'accès personnel (PAT) GitHub comme `GH_TOKEN=<votre jeton d'accès GitHub>`
5. Vous pouvez activer et désactiver les drapeaux de fonctionnalité selon vos besoins.

Cette action GitHub peut être configurée pour s'exécuter à tout moment souhaité à l'aide de `cron`. Consultez [Crontab.guru](https://crontab.guru/) et [celui-ci](https://crontab.cronhub.io/) pour générer des expressions `cron`.

## Mettez à jour votre Readme

Ajoutez un commentaire à votre `README.md` comme ceci :

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` peut être remplacé par toute chaîne spécifiée dans le drapeau `SECTION_NAME` selon [la section des drapeaux disponibles](#flags-available).

Ces lignes seront nos points d'entrée pour les métriques de développement.

## Nouveau sur WakaTime

WakaTime vous donne une idée du temps réellement passé à coder. Cela vous aide à améliorer votre productivité et votre avantage concurrentiel.

- Allez sur <https://wakatime.com> et créez un compte.
- Obtenez votre clé API WakaTime depuis vos [Paramètres du compte sur WakaTime](https://wakatime.com/settings/account).
- Installez le [plugin WakaTime](https://wakatime.com/plugins) dans votre éditeur / IDE préféré.
- Collez votre clé API pour commencer l'analyse.

### Répertoire de profil

Vous devrez obtenir un [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) avec une portée `repo` et `user` et le sauvegarder dans les Secrets du Répertoire `GH_TOKEN = <Your GitHub Access Token>`

Voici un exemple de fichier de workflow pour l'exécuter :

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

- Maintenant, vous pouvez commiter et attendre qu'il s'exécute automatiquement, ou vous pouvez également le déclencher pour voir le résultat maintenant. Allez simplement dans `Actions` dans votre dépôt, sélectionnez votre workflow `Profile Readme Development Stats` et cliquez sur `Run workflow`. Maintenant, attendez une minute ou deux et vous verrez vos modifications.

## Extras

Si vous souhaitez ajouter d'autres informations à vos statistiques, vous pouvez ajouter plusieurs `FLAGS` dans votre fichier de workflow. Par défaut, tous les drapeaux sont activés (sauf le drapeau du nombre de lignes de code en raison de l'opération lourde effectuée)

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Drapeaux Disponibles

---

`LOCALE` Ce drapeau peut être utilisé pour afficher les statistiques dans votre langue. La valeur par défaut est l'anglais. Le code de localisation [abrégé](https://saimana.com/list-of-country-locale-code/) doit être transmis dans la variable du drapeau. Un exemple du résultat final peut être trouvé [ici](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

Le drapeau `SECTION_NAME` peut être défini à n'importe quelle chaîne, et sera le nom de la section à remplacer dans le README.

Le drapeau `COMMIT_BY_ME` peut être défini à `True` pour commiter le code en utilisant votre nom et votre adresse e-mail.

Le drapeau `COMMIT_MESSAGE` peut être défini pour le message de commit. La valeur par défaut est "Updated with Dev Metrics"

Le drapeau `COMMIT_USERNAME` peut être défini comme un nom d'utilisateur pour commiter le code. La valeur par défaut est "readme-bot".

Le drapeau `COMMIT_EMAIL` peut être défini à une adresse e-mail pour commiter le code. La valeur par défaut est "41898282+github-actions[bot]@users.noreply.github.com".

Le drapeau `SHOW_UPDATED_DATE` peut être défini à `True` pour afficher la date de mise à jour à la fin du paragraphe.

Le drapeau `UPDATED_DATE_FORMAT` peut être défini pour mettre la date de mise à jour dans un format. La valeur par défaut est `"%d/%m/%Y %H:%M:%S"`.

Le drapeau `SHOW_LINES_OF_CODE` peut être défini à `True` pour afficher le nombre de lignes de code écrites jusqu'à présent.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

Le drapeau `SHOW_TOTAL_CODE_TIME` peut être défini à `False` pour cacher *Code Time*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

Le drapeau `SHOW_PROFILE_VIEWS` peut être défini à `False` pour cacher **Profile Views**

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

Le drapeau `SHOW_COMMIT` peut être défini à `False` pour cacher les statistiques de commit.

**Je suis un débutant 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Le drapeau `SHOW_DAYS_OF_WEEK` peut être défini à `False` pour cacher les commits effectués les différents jours de la semaine.

📅 **Je suis le plus productif les dimanches**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

Le drapeau `SHOW_LANGUAGE` peut être défini à `False` pour cacher les langages de programmation que vous utilisez.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Le drapeau `SHOW_OS` peut être défini à `False` pour cacher vos détails d'OS.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Le drapeau `SHOW_PROJECTS` peut être défini à `False` pour cacher les projets sur lesquels on a travaillé.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Le drapeau `SHOW_TIMEZONE` peut être défini à `False` pour cacher le fuseau horaire auquel vous appartenez.

```text
⌚︎ Timezone: Asia/Calcutta
```

Le drapeau `SHOW_EDITORS` peut être défini sur `False` pour cacher la liste des éditeurs de code/IDE utilisés.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Le drapeau `SHOW_LANGUAGE_PER_REPO` peut être défini à `False` pour cacher le nombre de dépôts dans différents langages de programmation et cadres.

**Je code principalement en Vue**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

Le drapeau `SHOW_SHORT_INFO` peut être défini sur `False` pour cacher l'information amusante courte d'un utilisateur.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 Mes données GitHub**

> 🏆 433 Contributions en 2020
 >
> 📦 Utilisé 292,3 kB dans le stockage de GitHub
 >
> 💼 Opté pour l'embauche
 >
> 📜 25 Répertoires publics
 >
> 🔑 15 Répertoires privés appartenant

Le drapeau `SHOW_LOC_CHART` peut être défini à `False` pour cacher les lignes de code écrites dans différents trimestres de différentes années.

Le drapeau `IGNORED_REPOS` peut être défini à `"waka-readme-stats, my-first-repo"` (juste un exemple) pour ignorer certains répertoires que vous ne souhaitez pas compter.

Le drapeau `SYMBOL_VERSION` peut être défini pour le symbole de la barre de progression (par défaut : `1`).

| Version | Bloc terminé | Bloc vide |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

**Barres de Progression SVG**

Vous pouvez passer des barres de texte Unicode aux barres SVG colorées avec les drapeaux suivants :

- `BAR_STYLE` — Définissez sur `"svg"` pour activer les barres SVG, ou `"text"` (par défaut) pour les barres Unicode
- `BAR_COLOR` — Couleur hexadécimale pour la portion remplie (par défaut: `"#90CAF9"` bleu clair)
- `BAR_TRACK_COLOR` — Couleur hexadécimale pour la piste d'arrière-plan (par défaut: `"#172f45"` bleu foncé)
- `BAR_RADIUS` — Rayon de bordure pour les coins arrondis (par défaut: `"0"` pour carré)
  - `"0"` = Bords carrés nets
  - `"4"` = Coins légèrement arrondis
  - Tout nombre entier positif fonctionne
- `TEXT_PRIMARY_COLOR` — Couleur hexadécimale pour le texte principal de la liste SVG, comme les noms de langages/projets (par défaut : `"#c9d1d9"`)
- `TEXT_SECONDARY_COLOR` — Couleur hexadécimale pour le texte secondaire de la liste SVG, comme les durées et pourcentages (par défaut : `"#8b949e"`)

Exemple de flux de travail avec barres SVG activées :

```yaml
- uses: anmol098/waka-readme-stats@master
  with:
    WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
    GH_TOKEN: ${{ secrets.GH_TOKEN }}
    BAR_STYLE: "svg"
    BAR_COLOR: "#90CAF9"
    BAR_TRACK_COLOR: "#172f45"
    BAR_RADIUS: "4"
    TEXT_PRIMARY_COLOR: "#c9d1d9"
    TEXT_SECONDARY_COLOR: "#8b949e"
```

**Avant / après**

Barres Unicode par défaut (`BAR_STYLE: "text"`, ou en omettant `BAR_STYLE`) :

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0%
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75%
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75%
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38%
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
```

Barres SVG, angles carrés (`BAR_STYLE: "svg"`, `BAR_RADIUS: "0"`, `BAR_COLOR` / `BAR_TRACK_COLOR` par défaut) :

![Barres de progression SVG (carrées)](https://i.imgur.com/eShKuJH.png)

Barres SVG, angles arrondis (`BAR_STYLE: "svg"`, `BAR_RADIUS: "4"`) :

![Barres de progression SVG (arrondies)](https://i.imgur.com/dYOgG6I.png)

Le drapeau `DEBUG_LOGGING` peut être défini pour augmenter la verbosité de la sortie de l'action GitHub, par défaut égal à la propriété de débogage interne du runner

**Chronologie**

![Graphique non trouvé](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Soutenez le projet

J'open-source presque tout ce que je peux, et j'essaie de répondre à tout le monde qui a besoin d'aide en utilisant ces projets. Évidemment,
cela prend du temps. Vous pouvez utiliser ce service gratuitement.

Cependant, si vous utilisez ce projet et que vous êtes satisfait ou que vous souhaitez simplement me encourager à continuer à créer des choses, il y a quelques façons de le faire :-

- Donner le crédit approprié lorsque vous utilisez cette action dans votre readme, en y faisant un lien de retour :D
- Étoiler et partager le projet :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Vous pouvez faire des dons uniques via PayPal. Je vais probablement acheter un peu de ~~bière~~ vin 🍷.

Merci ! :heart:

# Contribution

Les contributions sont les bienvenues ♥ ! Veuillez partager toute fonctionnalité, et ajouter des tests unitaires ! Utilisez les systèmes de demande de tirage et de problèmes pour contribuer.

# Contributeurs sélectionnés

1. [Anmol Pratap Singh](https://github.com/anmol098): Mainteneur
2. [Alexander Sergeev](https://github.com/pseusys): Mainteneur
3. [DataBoySu](https://github.com/DataBoySu): Mainteneur
4. [okcoder1](https://github.com/ok-coder1): Mainteneur
5. [Aravind V. Nair](https://github.com/aravindvnair99): Mainteneur
6. [Prabhat Singh](https://github.com/prabhatdev): Pour le graphique du chronogramme du code [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Pour la demande de tirage [#34](https://github.com/anmol098/waka-readme-stats/pull/34) et [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): Pour la demande de tirage [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): Pour la demande de tirage [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): Pour la demande de tirage [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): Pour la demande de tirage [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): Pour l'ajout de la prise en charge de l'écriture de phrases naturelles pour la traduction [#136](https://github.com/anmol098/waka-readme-stats/pull/136)
13. [acheronx0577](https://github.com/acheronx0577): Pour l'ajout de la prise en charge des barres de progression SVG avec des options de couleur et de forme [#657](https://github.com/anmol098/waka-readme-stats/pull/657)

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

- [AcheronX.](https://github.com/acheronx0577)

</details>

- Et vous ! Si jamais vous l'utilisez actuellement et que vous n'êtes pas sur la liste, veuillez nous le faire savoir en envoyant un [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) ! :blush: \
  Nous serons ravis de vous ajouter à la liste.

Créé avec :heart: et Python 🐍.

# Inspiré de

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Ce projet a besoin d'une **étoile** ⭐ de votre part ♥

## Stargazers au fil du temps

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

