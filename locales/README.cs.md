<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a> | <a href="README.cs.md">🇨🇿 Čeština</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> Hledáme překladatele pro tento projekt. \
> Jakákoli pomoc je vítaná. \
> Podívej se prosím na <https://github.com/anmol098/waka-readme-stats/issues/23>, zda bys rád pomohl!

# Vývojářské statistiky v README s přidanými feature flagy 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Překrásné README statistiky</h3>
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
   Jsi ranní 🐤 nebo noční 🦉?
   <br/>
   Kdy jsi nejvíce produktivní během dne?
   <br/>
   V jakých jazycích píšeš?
   <br/>
   Podívej se do svého profilového README
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Nahlas chybu</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Návrh na funkci</a>
  </p>

## Příprava

1. Musíš si zaktualizovat svůj markdown soubor (`.md`) o 2 komentáře. Návod na aktualizaci najdeš [zde](#aktualizace-tvého-readme).
2. Budeš potřebovat WakaTime API klíč. Ten získáš ve svém [nastavení WakaTime účtu](https://wakatime.com/settings/account).
    - Pokud s WakaTime začínáš, návod je [zde](#začínáme-s-wakatime).
3. Potřebuješ GitHub API Token s `repo` a `user` rozsahem (scope), který získáš [zde](https://github.com/settings/tokens), pokud ti běží action na získání statistik commitů.
   - Pro inspiraci můžeš využít [tento](#profilový-repozitář) příklad.

> [!NOTE]
> Povolení `repo` rozsahu může vypadat **NEBEZPEČNĚ**, \
> ale tahle GitHub Action přistupuje pouze k časovým údajům commitů a k počtu řádků, které jsi přidal nebo odebral v repozitářích, do kterých jsi přispěl.

4. API klíč a GitHub API Token si musíš uložit do `secrets`. Najdeš je v nastavení svého repozitáře. \
  Ujisti se, že je ukládáš pod těmito názvy:
    - WakaTime API klíč jako `WAKATIME_API_KEY=<tvůj WakaTime API klíč>`
    - GitHub Personal Access Token (PAT) jako `GH_TOKEN=<tvůj GitHub access token>`
5. Můžeš si povolit a zakázat jednotlivé přepínače (flags) podle svých potřeb.

Tahle GitHub Action může být nastavena na tvůj zvolený čas pomocí `cron`. Podívej se na [Crontab.guru](https://crontab.guru/) a na [tuhle](https://crontab.cronhub.io/) webovou stránku pro vygenerování `cron` výrazů.

## Aktualizace tvého README

Přidej do svého `README.md` tyto komentáře:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` může být nahrazeno jakýmkoli textem definovaným v `SECTION_NAME` ([sekce s dostupnými flagy](#dostupné-flags)).

Tyto řádky budou naše vstupní body pro vývojářské statistiky.

## Začínáme s WakaTime

WakaTime ti dá přehled o čase, který skutečně trávíš programováním. To ti může zvýšit tvou produktivitu a náskok před konkurencí.

- Běž na <https://wakatime.com> a vytvoř si účet.
- Získej svůj WakaTime API klíč ve svém [nastavení WakaTime účtu](https://wakatime.com/settings/account).
- Nainstaluj si [WakaTime plugin](https://wakatime.com/plugins) ve svém oblíbeném editoru / IDE.
- Vlož svůj API klíč pro spuštění analýzy.

### Profilový repozitář

Budeš potřebovat [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) s rozsahem `repo` a `user` a uložit `GH_TOKEN = <Tvůj GitHub Access Token>` do Secrets ve svém repozitáři.

Zde je příklad workflow souboru pro spuštění:

```yml
name: Waka Readme

on:
  schedule:
    # Spustí se o půlnoci IST
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

- Teď můžeš provést commit a počkat, až se to spustí automaticky, nebo to můžeš spustit ručně a vidět výsledky hned. Stačí jít do `Actions` ve svém repozitáři, vybrat workflow `Waka Readme` a kliknout na `Run workflow`. Teď stačí chvíli počkat a uvidíš své změny.

## Bonus

Pokud chceš přidat další informace do svých statistik, můžeš přidat několik `FLAGS` do svého workflow souboru. Ve výchozím nastavení jsou všechny flagy zapnuté (kromě řádků kódu, které jsou náročné na výkon).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Dostupné Flags

---

`LOCALE` flag slouží k tomu, aby sis mohl statistiky zobrazit ve svém jazyce. Výchozí je angličtina. Do proměnné vložíš [zkratku lokalizace](https://saimana.com/list-of-country-locale-code/). Příklad konečného výsledku najdeš [zde](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

`SECTION_NAME` flag může být nastavena na libovolný řetězec a určí název sekce, která bude nahrazena v README.

`COMMIT_BY_ME` flag lze nastavit na `True`, aby kód byl commitován pod tvým jménem a e-mailem.

`COMMIT_MESSAGE` flag slouží k nastavení textu commitu. Výchozí je "Updated with Dev Metrics".

`COMMIT_USERNAME` flag nastavuje uživatelské jméno commitu. Výchozí je "readme-bot".

`COMMIT_EMAIL` flag nastavuje uživatelský e-mail commitu. Výchozí je "41898282+github-actions[bot]@users.noreply.github.com".

`SHOW_UPDATED_DATE` flag lze nastavit na `True` pro zobrazení data aktualizace na konci odstavce.

`UPDATED_DATE_FORMAT` flag slouží k nastavení formátu data. Výchozí je `"%d/%m/%Y %H:%M:%S"`.

`SHOW_LINES_OF_CODE` flag lze nastavit na `True` pro zobrazení celkového počtu napsaných řádků kódu k dnešnímu datu.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` flag lze nastavit na `False` pro skrytí času *stráveného programováním*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` flag lze nastavit na `False` pro skrytí počtu **zobrazení profilu**.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` flag lze nastavit na `False` pro skrytí statistik commitů.

**Jsem ranní 🐤**

```text
🌞 Ráno         95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Během dne    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Večer        112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Noc          26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%
```

`SHOW_DAYS_OF_WEEK` flag lze nastavit na `False` pro skrytí statistik podle dnů v týdnu.

📅 **Nejvíc jsem produktivní v neděli**

```text
Pondělí       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Úterý         85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Středa        56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Čtvrtek       44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Pátek         28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Sobota        30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Neděle        86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` flag lze nastavit na `False` pro skrytí programovacích jazyků, které používáš.

```text
💬 Jazyky:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` flag lze nastavit na `False` pro skrytí detailů o tvém OS.

```text
💻 Operační systémy:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` flag lze nastavit na `False` pro skrytí projektů, na kterých jsi pracoval.

```text
🐱‍💻 Projekty:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` flag lze nastavit na `False` pro skrytí tvého časového pásma.

```text
⌚︎ Časové pásmo: Asia/Calcutta
```

`SHOW_EDITORS` flag lze nastavit na `False` pro skrytí tvých editorů/IDE.

```text
🔥 Editory:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` flag lze nastavit na `False` pro skrytí počtu repozitářů v různých jazycích a frameworcích.

**Nejvíc píšu ve Vue**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO` flag lze nastavit na `False` pro skrytí krátkých zajímavostí o uživateli.

> [!NOTE]
> Tato sekce vyžaduje Personal Access Token (PAT) s `user` rozsahem, jinak zobrazená data budou chybná.

**🐱 Moje GitHub data**

> 🏆 433 příspěvků v roce 2020
 >
> 📦 Využito 292,3 kB v GitHub úložišti
 >
> 💼 Otevřen pracovním nabídkám
 >
> 📜 25 veřejných repozitářů
 >
> 🔑 15 vlastněných soukromých repozitářů

`SHOW_LOC_CHART` flag lze nastavit na `False` pro skrytí řádků kódu v jednotlivých čtvrtletích.

`IGNORED_REPOS` flag lze použít jako `"waka-readme-stats, muj-prvni-repo"` pro ignorování repozitářů, které nechceš počítat.

`MAX_REPOS` flag omezuje počet načítaných repozitářů pro analýzu (výchozí: `0` = neomezeno). Užitečné pro účty s mnoha repozitáři.

Pokud uvidíš příklad používající `MAX_CAP`, jde o zastaralý název `MAX_REPOS`.

`WAKATIME_API_URL` flag slouží k nastavení, pokud si hostuješ vlastní backend kompatibilní s WakaTime, jako je [wakapi](https://github.com/muety/wakapi). Stačí zadat základní URL, např. `https://your-own-wakapi.dev/api/`.

`SYMBOL_VERSION` flag určuje styl ukazatele v grafu (výchozí: `1`).

| Verze | Plný blok | Prázdný blok |
| ------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING` flag slouží pro vypsání podrobnějšího výstupu z GitHub Action. Výchozí hodnota je `debug` u vnitřního runneru.

`BADGE_STYLE` flag definuje styl generovaných odznaků (badges): `flat`, `flat-square`, `plastic`, `for-the-badge` nebo `social`.

|    Styl odznaku   |                                             Náhled                                               |
| ----------------- | ------------------------------------------------------------------------------------------------- |
|       `flat`      | ![Badge Style `flat`](https://img.shields.io/badge/Badge-Style-blue?style=flat)                   |
|   `flat-square`   | ![Badge Style `flat-square`](https://img.shields.io/badge/Badge-Style-blue?style=flat-square)     |
|     `plastic`     | ![Badge Style `plastic`](https://img.shields.io/badge/Badge-Style-blue?style=plastic)             |
|  `for-the-badge`  | ![Badge Style `for-the-badge`](https://img.shields.io/badge/Badge-Style-blue?style=for-the-badge) |
|      `social`     | ![Badge Style `social`](https://img.shields.io/badge/Badge-Style-blue?style=social)               |

**Časová osa**

![Timeline Chart](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Podpoř projekt

Téměř vše, co dělám, je open-source a snažím se odpovídat každému, kdo potřebuje s těmito projekty pomoci. To samozřejmě stojí čas. Tuto službu můžeš využívat zdarma.

Pokud však tento projekt používáš a jsi s ním spokojen, nebo mě jen chceš podpořit v dalším tvoření, existuje několik způsobů, jak to udělat:

- Uvedením kreditu v README s odkazem na tento projekt. :D
- Udělením hvězdičky a sdílením projektu. :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Můžeš poslat jednorázový dar přes PayPal. Pravděpodobně si koupím nějaké ~~pivo~~ víno 🍷.

Díky! :heart:

---

# Přispívání

Přispívání je vítáno ♥!

Sdílej jakékoli nové funkce a přidávej unit testy! Pro přispívání využij pull requesty a issues.

# Vybraní přispěvatelé

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [DataBoySu](https://github.com/DataBoySu): Maintainer
4. [okcoder1](https://github.com/ok-coder1): Maintainer
5. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
6. [Prabhat Singh](https://github.com/prabhatdev): Za graf časové osy kódu [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedyhli): Za Pull Requesty [#34](https://github.com/anmol098/waka-readme-stats/pull/34) a [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): Za Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): Za Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): Za Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): Za Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): Pro podporu přirozeného psaní vět při překladu [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

<details>

<summary>Speciální zmínka pro ty, kteří už WakaTime používají :smile: :tada:</summary>

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

- A ty taky! Pokud projekt právě používáš a nejsi na seznamu, dej nám prosím vědět zasláním [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue! :blush: \
  Rádi tě přidáme na seznam.

Vytvořeno s :heart: a Pythonem 🐍.

# Inspirace z

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Tenhle projekt od tebe ♥ potřebuje **hvězdičku** ⭐

## Jak přibývaly hvězdičky v čase

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)
