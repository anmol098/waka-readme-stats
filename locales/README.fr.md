<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> Nous recherchons des traducteurs pour ce projet.
> Toute aide serait grandement appréciée.
> Veuillez consulter l'issue <https://github.com/anmol098/waka-readme-stats/issues/23> si vous souhaitez aider !

# Métriques de développement dans le README avec ajout de drapeaux de fonctionnalités 🎌

![Aperçu du projet](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Aperçu du projet](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Statistiques incroyables pour votre README</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/langage-Python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=Si%20utile&style=flat&color=BC4E99" alt="Badge d'étoiles">
</p>

<p align="center">
   Êtes-vous un oiseau matinal 🐤 ou un nocturne 🦉 ?
   <br/>
   À quelle heure de la journée êtes-vous le plus productif ?
   <br/>
   Quels sont les langages de programmation que vous utilisez ?
   <br/>
   Découvrez-le dans votre README de profil !
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Signaler un bogue</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Demander une fonctionnalité</a>
  </p>

## Préparation

1. Vous devez mettre à jour le fichier Markdown (`.md`) avec 2 commentaires. Vous pouvez vous référer [ici](#mise-à-jour-de-votre-readme) pour le faire.
2. Vous aurez besoin d'une clé API WakaTime. Vous pouvez l'obtenir depuis les paramètres de votre compte WakaTime.
   - Vous pouvez vous référer [ici](#nouveau-sur-wakatime) si vous êtes nouveau sur WakaTime.
3. Vous aurez besoin d'un jeton API GitHub avec les étendues `repo` et `user` depuis [ce lien](https://github.com/settings/tokens) si vous exécutez l'action pour obtenir les métriques de commit.
   - Vous pouvez utiliser [cette](#profil-du-dépôt) exemple pour comprendre comment faire.

> **NOTE**
> L'activation de l'étendue `repo` peut être **DANGEREUSE**,
> car cette action GitHub n'accède qu'aux horodatages de vos commits et au nombre de lignes de code ajoutées ou supprimées dans les dépôts auxquels vous avez contribué.

1. Vous devez enregistrer la clé API WakaTime et le jeton d'accès personnel GitHub (PAT) dans les secrets du dépôt. Vous pouvez les trouver dans les paramètres de votre dépôt.
   - Enregistrez la clé API WakaTime comme `WAKATIME_API_KEY=<votre clé API WakaTime>`
   - Enregistrez le jeton d'accès personnel GitHub (PAT) comme `GH_TOKEN=<votre jeton d'accès GitHub>`
2. Vous pouvez activer et désactiver les drapeaux de fonctionnalité en fonction de vos besoins.

Cette action GitHub peut être configurée pour s'exécuter à tout moment souhaité en utilisant `cron`. Consultez [Crontab.guru](https://crontab.guru/) et [ce site](https://crontab.cronhub.io/) pour générer des expressions `cron`.

## Mettre à jour votre Readme

Ajouter un commentaire à votre `README.md` comme ceci :

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` peut être remplacé par n'importe quelle chaîne spécifiée dans le drapeau `SECTION_NAME` selon la section [les drapeaux disponibles](#flags-disponibles).

Ces lignes seront nos points d'entrée pour les métriques de développement.

## Nouveau(elle)s sur WakaTime

WakaTime vous donne une idée du temps réel que vous passez à coder. Cela vous aide à booster votre productivité et à prendre l'avantage sur vos concurrents.

- Rendez-vous sur <https://wakatime.com> et créez un compte.
- Récupérez votre clé API WakaTime depuis vos [paramètres de compte sur WakaTime](https://wakatime.com/settings/account).
- Installez le [plugin WakaTime](https://wakatime.com/plugins) dans votre éditeur ou IDE préféré.
- Collez votre clé API pour démarrer l'analyse.

### Répertoire de Profil

Vous devez obtenir un [Jeton d'Accès GitHub](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) avec une portée `repo` et `user` et le sauvegarder dans les Secrets du Répertoire `GH_TOKEN = <Votre Jeton d'Accès GitHub>`

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

- Maintenant, vous pouvez valider et attendre qu'il s'exécute automatiquement, ou vous pouvez également déclencher son exécution pour voir le résultat immédiatement. Allez simplement dans les `Actions` de votre dépôt, sélectionnez votre workflow `Profile Readme Development Stats` et cliquez sur `Exécuter le workflow`. Attendez une minute ou deux et vous verrez vos modifications appliquées.

## Extras

Si vous souhaitez ajouter les autres informations à vos statistiques, vous pouvez ajouter plusieurs `FLAGS` dans votre fichier de workflow. Par défaut, tous les flags sont activés (à l'exception du flag lignes de code en raison de l'opération lourde effectuée).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Drapeaux disponibles

---

`LOCALE`  Ce drapeau peut être utilisé pour afficher les statistiques dans votre langue. La valeur par défaut est l'anglais. Utilisez le code de localisation de pays [ici](https://saimana.com/list-of-country-locale-code/) à passer dans la variable du drapeau. Un exemple de résultat final se trouve [ici](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

Le drapeau `SECTION_NAME` peut être défini sur n'importe quelle chaîne, et sera le nom de la section à remplacer dans le README.

Le drapeau `COMMIT_BY_ME` peut être défini sur `True` pour commiter le code avec votre nom et adresse e-mail.

Le drapeau `COMMIT_MESSAGE` peut être personnalisé pour le message de commit. La valeur par défaut est "Mise à jour avec les métriques de développement".

Le drapeau `COMMIT_USERNAME` peut être défini comme un nom d'utilisateur pour commiter le code. La valeur par défaut est "readme-bot".

Le drapeau `COMMIT_EMAIL` peut être défini pour une adresse e-mail afin de commiter le code. La valeur par défaut est "41898282+github-actions[bot]@users.noreply.github.com".

Le drapeau `SHOW_UPDATED_DATE` peut être défini sur `True` pour afficher la date de mise à jour à la fin du paragraphe.

Le drapeau `UPDATED_DATE_FORMAT` peut être défini pour formater la date de mise à jour. La valeur par défaut est `"%d/%m/%Y %H:%M:%S"`.

Le drapeau `SHOW_LINES_OF_CODE` peut être défini sur `True` pour afficher le nombre de lignes de code écrites jusqu'à présent.

![Lignes de Code](https://img.shields.io/badge/De Bonjour le Monde J'ai Écrit-1,3 million de lignes de code-blue)

Le drapeau `SHOW_TOTAL_CODE_TIME` peut être défini sur `False` pour masquer *Code Time*.

![Code Time](http://img.shields.io/badge/Code Time-1,438 heures 54 minutes-blue)

Le drapeau `SHOW_PROFILE_VIEWS` peut être défini sur `False` pour masquer **Profil Views**.

![Profil Views](http://img.shields.io/badge/Profil Views-2189-blue)

Le drapeau `SHOW_COMMIT` peut être défini sur `False` pour masquer les statistiques de commit.

**Je suis un oiseau précoce 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Le drapeau `SHOW_DAYS_OF_WEEK` peut être défini sur `False` pour masquer les commits effectués les différents jours de la semaine.

📅 **Je suis le plus productif le dimanche**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

Le drapeau `SHOW_LANGUAGE` peut être défini sur `False` pour masquer les langages de programmation que vous utilisez.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Le drapeau `SHOW_OS` peut être défini sur `False` pour masquer les détails de votre système d'exploitation.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Le drapeau `SHOW_PROJECTS` peut être défini sur `False` pour masquer les projets sur lesquels on a travaillé.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Le drapeau `SHOW_TIMEZONE` peut être défini sur `False` pour masquer la zone horaire dans laquelle vous vous trouvez.

```text
⌚︎ Timezone: Asia/Calcutta
```

Le drapeau `SHOW_EDITORS` peut être défini sur `False` pour masquer la liste des éditeurs de code/IDEs utilisés.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Le drapeau `SHOW_LANGUAGE_PER_REPO` peut être défini sur `False` pour masquer le nombre de dépôts dans différents langages de programmation et frameworks.

**Je code principalement avec Vue**

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

## :coeur_éclatant: Soutenez le projet

Je mets presque tout en open source et je m'efforce de répondre à tous ceux qui ont besoin d'aide avec ces projets. Évidemment, cela prend du temps. Vous pouvez utiliser ce service gratuitement.

Cependant, si vous utilisez ce projet et que vous en êtes satisfait ou si vous souhaitez simplement m'encourager à continuer de créer des choses, voici quelques moyens de le faire :

- Donner le crédit approprié lorsque vous utilisez cette action dans votre fichier README, en liant vers celui-ci :D
- Mettre une étoile et partager le projet :fusée:
- **[Donation PayPal](https://www.paypal.me/aapreneur)** - Vous pouvez faire des dons ponctuels via PayPal. Je vais probablement acheter de la ~~bière~~ du vin 🍷.

Merci ! :coeur:

# Contributions

Les contributions sont les bienvenues ♥ ! Veuillez partager toute fonctionnalité et ajouter des tests unitaires ! Utilisez les systèmes de requêtes de tirage et d'issues pour contribuer.

# Contributeurs sélectionnés

1. [Anmol Pratap Singh](https://github.com/anmol098) : Maintaineur
2. [Alexander Sergeev](https://github.com/pseusys) : Maintaineur
3. [Aravind V. Nair](https://github.com/aravindvnair99) : Maintaineur
4. [Prabhat Singh](https://github.com/prabhatdev) : Pour le graphique de la chronologie du code [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev) : Pour les Pull Requests [#34](https://github.com/anmol098/waka-readme-stats/pull/34) et [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas) : Pour le Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7) : Pour le Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234) : Pour le Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe) : Pour le Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1) : Pour l'ajout de support pour l'écriture de phrases naturelles pour la traduction [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Et vous ! Si vous l'utilisez actuellement et que vous n'êtes pas sur la liste, n'hésitez pas à nous le faire savoir en créant une [mention spéciale](https://github.com/anmol098/waka-readme-stats/issues/new/choose) ! :blush: Nous serons ravis de vous ajouter à la liste.

Réalisé avec :heart: et Python 🐍.

# Inspiré par

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Ce projet a besoin d'une **étoile** ⭐ de votre part ♥

## Stargazers au fil du temps

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

