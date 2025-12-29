<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Métriques de développement dans le README avec drapeaux de fonctionnalités ajoutés 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Aperçu du projet](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Statistiques incroyables pour votre README</h3>
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
   Êtes-vous un lève-tôt ou un couche-tard ?
   <br/>
   À quelle heure de la journée êtes-vous le plus productif ?
   <br/>
   Quelles sont les langues de programmation que vous maîtrisez ?
   <br/>
   Découvrons-le dans votre fichier README !
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Signaler un bug</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Demander une fonctionnalité</a>
</p>

## Préparation

1. You need to update the markdown file(`.md`) with 2 comments. You can refer [here](#update-your-readme) for updating it.
2. You'll need a WakaTime API Key. You can get that from your WakaTime Account Settings
    - You can refer [here](#new-to-wakatime), if you're new to WakaTime.
3. You'll need a GitHub API Token with `repo` and `user` scope from [here](https://github.com/settings/tokens) if you're running the action to get commit metrics.
   - You can use [this](#profile-repository) example to work it out.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. Vous devez sauvegarder la clé API de WakaTime et le jeton d'accès GitHub dans les secrets du dépôt. Vous pouvez y accéder dans les paramètres de votre dépôt. \
   Assurez-vous de les enregistrer comme suit :
   - Clé API de WakaTime sous `WAKATIME_API_KEY=<votre clé API WakaTime>`
   - Jeton d'accès personnel GitHub (PAT) sous `GH_TOKEN=<votre jeton d'accès GitHub>`

2. Vous pouvez activer et désactiver les drapeaux de fonctionnalité en fonction de vos besoins.

Cette action GitHub peut être configurée pour s'exécuter à tout moment grâce à `cron`. Consultez [Crontab.guru](https://crontab.guru/) et [ce site](https://crontab.cronhub.io/) pour générer des expressions cron.

## Mettez à jour votre Readme

Ajoutez un commentaire à votre `README.md` comme suit :

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` peut être remplacé par n'importe quelle chaîne spécifiée dans le drapeau `SECTION_NAME` selon la section [les drapeaux disponibles](#flags-disponibles).

Ces lignes seront nos points d'entrée pour les métriques de développement.

## Nouveau(elle) sur WakaTime

WakaTime vous donne une idée du temps réel que vous passez à coder. Cela vous aide à booster votre productivité et à rester en avance sur la concurrence.

- Rendez-vous sur <https://wakatime.com> et créez un compte.
- Récupérez votre clé API WakaTime depuis vos [paramètres de compte sur WakaTime](https://wakatime.com/settings/account).
- Installez le [plugin WakaTime](https://wakatime.com/plugins) dans votre éditeur ou IDE préféré.
- Collez votre clé API pour démarrer l'analyse.

### Profil de dépôt

Vous devez obtenir un [jeton d'accès GitHub](https://docs.github.com/en/actions/configurant-et-gérant-les-flux-de-travail/authentification-avec-le-jeton_github) avec une portée `repo` et `user` et l'enregistrer dans les secrets du dépôt `GH_TOKEN = <Votre jeton d'accès GitHub>`.

Voici un exemple de fichier de flux de travail pour l'exécuter :

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

- Maintenant, vous pouvez valider et attendre qu'elle s'exécute automatiquement, ou vous pouvez également déclencher son exécution pour voir le résultat immédiatement. Allez simplement dans les `Actions` de votre dépôt, sélectionnez votre workflow `Profile Readme Development Stats` et cliquez sur `Exécuter le workflow`. Attendez une minute ou deux, et vous verrez vos modifications appliquées.

## Extras

Si vous souhaitez ajouter d'autres informations à vos statistiques, vous pouvez ajouter plusieurs `FLAGS` dans votre fichier de workflow. Par défaut, tous les flags sont activés (à l'exception du flag sur le nombre de lignes de code en raison de l'opération lourde effectuée).

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

`LOCALE` Ce drapeau peut être utilisé pour afficher les statistiques dans votre langue. La valeur par défaut est l'anglais. Code de localisation [court](https://saimana.com/list-of-country-locale-code/) à passer dans la variable du drapeau. Un exemple du résultat final se trouve [ici](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

Le drapeau `SECTION_NAME` peut être défini sur n'importe quelle chaîne, et sera le nom de la section à remplacer dans le README.

Le drapeau `COMMIT_BY_ME` peut être défini sur `True` pour commettre le code avec votre nom et adresse e-mail.

Le drapeau `COMMIT_MESSAGE` peut être personnalisé pour le message de commit. La valeur par défaut est "Mise à jour avec les métriques de développement".

Le drapeau `COMMIT_USERNAME` peut être défini comme un nom d'utilisateur pour commettre le code. La valeur par défaut est "readme-bot".

Le drapeau `COMMIT_EMAIL` peut être défini pour une adresse e-mail afin de commettre le code. La valeur par défaut est "41898282+github-actions[bot]@users.noreply.github.com".

Le drapeau `SHOW_UPDATED_DATE` peut être défini sur `True` pour afficher la date de mise à jour à la fin du paragraphe.

Le drapeau `UPDATED_DATE_FORMAT` peut être défini pour formater la date de mise à jour. La valeur par défaut est `"%d/%m/%Y %H:%M:%S"`.

Le drapeau `SHOW_LINES_OF_CODE` peut être défini sur `True` pour afficher le nombre de lignes de code écrites jusqu'à présent.

![Lignes de code](https://img.shields.io/badge/De Bonjour le Monde à 1,3 million de lignes de code-blue)

Le drapeau `SHOW_TOTAL_CODE_TIME` peut être défini sur `False` pour masquer *Code Time*.

![Code Time](http://img.shields.io/badge/Code Time-1 438 h 54 min-blue)

Le drapeau `SHOW_PROFILE_VIEWS` peut être défini sur `False` pour masquer **Profil Views**.

![Profil Views](http://img.shields.io/badge/Profil Views-2189-blue)

Le drapeau `SHOW_COMMIT` peut être défini sur `False` pour masquer les statistiques de commit.

**Je suis un oiseau matinal 🐤**

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

The `SHOW_SHORT_INFO` flag can be set to `False` to hide the short fun fact info of a user.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

# Données GitHub de 🐱

- **🏆 433 Contributions** en 2020
- **📦 292,3 Ko utilisés** dans le stockage GitHub
- **💼 Option d'embauche**
- **📜 25 Répertoires publics**
- **🔑 15 Répertoires privés**

Le drapeau `SHOW_LOC_CHART` peut être défini sur `False` pour masquer les lignes de code écrites au cours des différents trimestres des différentes années.

Le drapeau `IGNORED_REPOS` peut être défini sur `"waka-readme-stats, my-first-repo"` (à titre d'exemple) pour ignorer certains répertoires que vous ne souhaitez pas voir pris en compte.

Le drapeau `SYMBOL_VERSION` peut être défini pour personnaliser le symbole de la barre de progression (par défaut : `1`).

| Version | Bloc réalisé | Bloc vide |
| --- | --- | --- |
| 1 | █ | ░ |
| 2 | ⣿ | ⣀ |
| 3 | ⬛ | ⬜ |

Le drapeau `DEBUG_LOGGING` peut être activé pour augmenter la verbosité de la sortie de l'action GitHub, avec une valeur par défaut égale à la propriété de débogage du runner interne.

**Chronologie**

![Graphique non trouvé](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :cœur_faisant_fuseau: Soutenez le projet

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy some ~~beer~~ wine 🍷.

Thanks! :heart:

---

# Contributions

Les contributions sont les bienvenues ♥ ! N'hésitez pas à partager toute nouvelle fonctionnalité et à ajouter des tests unitaires ! Utilisez les systèmes de requêtes de tirage et d'issues pour contribuer.

# Contributeurs sélectionnés

- [Anmol Pratap Singh](https://github.com/anmol098) : Maintaineur
- [Alexander Sergeev](https://github.com/pseusys) : Maintaineur
- [Aravind V. Nair](https://github.com/aravindvnair99) : Maintaineur
- [Prabhat Singh](https://github.com/prabhatdev) : Pour le graphique de la chronologie du code [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
- [Hedy Li](https://github.com/hedythedev) : Pour les Pull Requests [#34](https://github.com/anmol098/waka-readme-stats/pull/34) et [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
- [Pedro Torres](https://github.com/Corfucinas) : Pour le Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
- [Aaron Meese](https://github.com/ajmeese7) : Pour le Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
- [Arnav Jindal](https://github.com/Daggy1234) : Pour le Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
- [Daniel Rowe](https://github.com/DanRowe) : Pour le Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
- [Ss5h](https://github.com/tlatkdgus1) : Pour l'ajout de la prise en charge de l'écriture de phrases naturelles pour la traduction [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Et vous ! Si vous l'utilisez actuellement et que vous n'êtes pas sur la liste, veuillez nous le faire savoir en envoyant un [Mention Spéciale](https://github.com/anmol098/waka-readme-stats/issues/new/choose) ! :blush: Nous serons ravis de vous ajouter à la liste.

Réalisé avec :heart: et Python 🐍.

# Inspiré par

> [Awesome Gists Épinglés](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Ce projet a besoin d'une **étoile** ⭐ de votre part ♥

## Observateurs au fil du temps

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

