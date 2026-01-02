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

# Метрики Dev в README с добавленными флагами функций 🎌

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
   Вы ранний 🐤 или ночной 🦉?
   <br/>
   Когда вы наиболее продуктивны в течение дня?
   <br/>
   Какие языки программирования вы используете?
   <br/>
   Посмотрим это в вашем README профиля!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bug</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Feature</a>
  </p>

## Подготовительные действия

1. Вам нужно обновить файл markdown (`.md`) с двумя комментариями. Вы можете обратиться [здесь](#update-your-readme) для обновления.
2. Вам понадобится API-ключ WakaTime. Вы можете получить его в настройках аккаунта WakaTime
    - Вы можете обратиться [здесь](#new-to-wakatime), если вы новичок в WakaTime.
3. Вам понадобится токен GitHub API с областью `repo` и `user` с [здесь](https://github.com/settings/tokens), если вы запускаете действие для получения метрик коммитов.
   - Вы можете использовать [этот](#profile-repository) пример, чтобы разобраться.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. Вам нужно сохранить ключ API WakaTime и токен API GitHub в секреты репозитория. Вы можете найти их в настройках вашего репозитория. \
  Убедитесь, что сохранили их следующим образом:
    - Ключ API WakaTime как `WAKATIME_API_KEY=<your wakatime API Key>`
    - Личный токен доступа GitHub (PAT) как `GH_TOKEN=<your github access token>`
5. Вы можете включать и отключать флаги функций в зависимости от ваших требований.

Эта GitHub Action может быть настроена для запуска в любое время, которое вы хотите, с использованием `cron`. Посмотрите [Crontab.guru](https://crontab.guru/) и [этот](https://crontab.cronhub.io/) сайт, чтобы сгенерировать выражения `cron`.

## Обновите ваш Readme

Добавьте комментарий в ваш `README.md` следующим образом:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` может быть заменен на любую строку, указанную в флаге `SECTION_NAME` согласно [доступным флагам](#flags-available).

Эти строки будут нашими точками входа для метрик разработчика.

## Новый пользователь WakaTime

WakaTime дает вам представление о времени, которое вы действительно потратили на программирование. Это помогает повысить вашу продуктивность и конкурентоспособность.

- Перейдите на <https://wakatime.com> и создайте учетную запись.
- Получите ваш WakaTime API Key в [Настройках учетной записи WakaTime](https://wakatime.com/settings/account).
- Установите [плагин WakaTime](https://wakatime.com/plugins) в вашем любимом редакторе / IDE.
- Вставьте ваш API-ключ, чтобы начать анализ.

### Профиль репозитория

Вам понадобится получить [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) с областью `repo` и `user` и сохранить его в секреты репозитория `GH_TOKEN = <Your GitHub Access Token>`

Вот пример файла рабочего процесса для его запуска:

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

- Теперь вы можете выполнить коммит и подождать, пока он запустится автоматически, или вы также можете запустить его вручную, чтобы увидеть результат сразу. Просто перейдите в `Actions` в вашем репозитории, выберите ваш рабочий процесс `Profile Readme Development Stats` и нажмите `Run workflow`. Теперь подождите одну или две минуты, и вы увидите ваши изменения.

## Дополнительно

Если вы хотите добавить дополнительную информацию в свои статистики, вы можете добавить несколько `FLAGS` в файл вашего рабочего процесса. По умолчанию все флаги включены (кроме флага количества строк кода из-за тяжелой операции, выполняемой)

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Доступные флаги

---

`LOCALE` Этот флаг можно использовать для отображения статистики на вашем языке. По умолчанию используется английский. Локаль [Short Hand](https://saimana.com/list-of-country-locale-code/) должна быть передана в переменной флага. Пример конечного результата можно найти [здесь](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

Флаг `SECTION_NAME` можно установить в любую строку, и он будет использоваться как имя раздела для замены в README.

Флаг `COMMIT_BY_ME` можно установить в `True`, чтобы внести изменения в код с использованием вашего имени и электронной почты.

Флаг `COMMIT_MESSAGE` можно установить для сообщения коммита. По умолчанию используется "Updated with Dev Metrics"

Флаг `COMMIT_USERNAME` можно установить в качестве имени пользователя для внесения изменений в код. По умолчанию используется "readme-bot".

Флаг `COMMIT_EMAIL` можно установить в электронную почту для внесения изменений в код. По умолчанию используется "41898282+github-actions[bot]@users.noreply.github.com".

Флаг `SHOW_UPDATED_DATE` можно установить в `True`, чтобы отобразить дату обновления в конце абзаца.

Флаг `UPDATED_DATE_FORMAT` можно установить, чтобы указать формат даты обновления. По умолчанию используется `"%d/%m/%Y %H:%M:%S"`.

Флаг `SHOW_LINES_OF_CODE` можно установить в `True`, чтобы отобразить количество строк кода, написанных до настоящего времени.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

Флаг `SHOW_TOTAL_CODE_TIME` можно установить в `False`, чтобы скрыть *Code Time*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

Флаг `SHOW_PROFILE_VIEWS` можно установить в `False`, чтобы скрыть **Profile Views**

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

Флаг `SHOW_COMMIT` можно установить в `False`, чтобы скрыть статистику коммитов.

**Я ранний 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

Флаг `SHOW_DAYS_OF_WEEK` можно установить в `False`, чтобы скрыть коммиты, сделанные в разные дни недели.

📅 **Я наиболее продуктивен в воскресенье**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

Флаг `SHOW_LANGUAGE` можно установить в `False`, чтобы скрыть языки программирования, которые вы используете.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

Флаг `SHOW_OS` можно установить в `False`, чтобы скрыть детали вашей ОС.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

Флаг `SHOW_PROJECTS` можно установить в `False`, чтобы скрыть проекты, над которыми работали.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

Флаг `SHOW_TIMEZONE` можно установить в `False`, чтобы скрыть часовой пояс, в котором вы находитесь.

```text
⌚︎ Timezone: Asia/Calcutta
```

Флаг `SHOW_EDITORS` можно установить в `False`, чтобы скрыть список используемых редакторов кода/IDE.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

Флаг `SHOW_LANGUAGE_PER_REPO` можно установить в `False`, чтобы скрыть количество репозиториев, написанных на различных языках программирования и фреймворках.

**Я в основном пишу на Vue**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

Флаг `SHOW_SHORT_INFO` можно установить в `False`, чтобы скрыть краткий забавный факт о пользователе.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 Мой GitHub Данные**

> 🏆 433 Вкладки в году 2020
 >
> 📦 Использовано 292,3 kB в хранилище GitHub
 >
> 💼 Выбрано для найма
 >
> 📜 25 Публичных репозиториев
 >
> 🔑 15 Приватных репозиториев, которыми владеют

Флаг `SHOW_LOC_CHART` может быть установлен в `False`, чтобы скрыть количество строк кода, написанных в разных кварталах разных лет.

Флаг `IGNORED_REPOS` может быть установлен в `"waka-readme-stats, my-first-repo"` (просто пример), чтобы игнорировать некоторые репозитории, которые вы не хотите учитывать.

Флаг `SYMBOL_VERSION` может быть установлен для символа прогресс-бара (по умолчанию: `1`).

| Версия | Блок выполнено | Блок пустой |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

Флаг `DEBUG_LOGGING` может быть установлен для увеличения подробности вывода GitHub Action, по умолчанию равен внутреннему свойству отладки исполнителя

**Таймлайн**

![График не найден](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Поддержите проект

Я делюсь открытым исходным кодом почти всем, что могу, и стараюсь отвечать всем, кто нуждается в помощи при использовании этих проектов. Очевидно,
это занимает время. Вы можете использовать этот сервис бесплатно.

Однако, если вы используете этот проект и довольны им или просто хотите поблагодарить меня за продолжение создания подобных проектов, есть несколько способов, которыми вы можете это сделать :-

- Указывайте правильные ссылки, когда используете этот action в вашем readme, возвращаясь к нему :D
- Добавьте звёздочку и делитесь проектом :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Вы можете сделать одноразовые пожертвования через PayPal. Я, вероятно, куплю немного ~~пива~~ вина 🍷.

Спасибо! :heart:

# Вклад

Вклад приветствуется ♥! Пожалуйста, делитесь любыми функциями и добавляйте тесты! Используйте системы pull request и issue для внесения вклада.

# Выбранные участники

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [DataBoySu](https://github.com/DataBoySu): Maintainer
4. [okcoder1](https://github.com/ok-coder1): Maintainer
5. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
6. [Prabhat Singh](https://github.com/prabhatdev): Для графика временной шкалы кода [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Для Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) и [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): Для Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): Для Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): Для Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): Для Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): Для добавления поддержки естественного написания предложений для перевода [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- И вы! Если вы сейчас используете его и не находитесь в списке, пожалуйста, сообщите нам, создав [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue! :blush: \
  Мы будем рады добавить вас в список.

Сделано с :heart: и Python 🐍.

# Вдохновлено

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Этот проект нуждается в **звёздочке** ⭐ от вас ♥

## Количество звёзд со временем

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

