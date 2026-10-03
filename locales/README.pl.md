<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pl.md">🇵🇱 Polski</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> Poszukujemy tłumaczy dla tego projektu. \
> Każda pomoc będzie ogromnie doceniona! \
> Zobacz zgłoszenie na GitHubie <https://github.com/anmol098/waka-readme-stats/issues/23>, jeśli chcesz pomóc!

# Statystyki deweloperskie w pliku README z obsługą flag funkcji 🎌

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
   Jesteś rannym ptaszkiem 🐤 czy nocnym markiem 🦉?
   <br/>
   W jakiej porze dnia jesteś najbardziej produktywny?
   <br/>
   W jakich językach programowania piszesz najczęściej?
   <br/>
   Sprawdźmy to w Twoim profilowym pliku README!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Zgłoś błąd</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Zaproponuj funkcję</a>
  </p>

## Prace przygotowawcze

1. Musisz zaktualizować swój plik markdown (`.md`) o 2 komentarze. Instrukcję znajdziesz w sekcji [Zaktualizuj swój plik Readme](#zaktualizuj-swój-plik-readme).
2. Potrzebujesz klucza API WakaTime. Możesz go pobrać z ustawień konta WakaTime.
    - Zobacz sekcję [Nowy w WakaTime](#nowy-w-wakatime), jeśli dopiero zaczynasz z WakaTime.
3. Potrzebujesz tokenu GitHub API z uprawnieniami `repo` oraz `user` z [tej strony](https://github.com/settings/tokens), jeśli uruchamiasz akcję w celu pobierania metryk commitów.
   - Możesz zapoznać się z przykładem [Repozytorium profilowe](#repozytorium-profilowe).

> [!NOTE]
> Włączenie uprawnienia `repo` może wydawać się **NIEBEZPIECZNE**, \
> ale ta akcja GitHub Actions uzyskuje dostęp jedynie do znaczników czasu Twoich commitów oraz liczby dodanych/usuniętych linii kodu w repozytoriach, do których wnosisz wkład.

4. Zapisz klucz API WakaTime oraz token API GitHub w sekcji Secrets w ustawieniach swojego repozytorium.
   Zapisz je odpowiednio jako:
    - Klucz API WakaTime: `WAKATIME_API_KEY=<Twój klucz API WakaTime>`
    - Osobisty Token Dostępu (PAT) GitHub: `GH_TOKEN=<Twój token dostępu GitHub>`
5. Możesz włączać i wyłączać opcjonalne flagi funkcji w zależności od swoich potrzeb.

Ta akcja GitHub Actions może być uruchamiana automatycznie o dowolnej porze za pomocą składni `cron`. Zobacz strony [Crontab.guru](https://crontab.guru/) oraz [Crontab.cronhub.io](https://crontab.cronhub.io/) do generowania wyrażeń `cron`.

## Zaktualizuj swój plik Readme

Dodaj komentarz w swoim pliku `README.md` w następujący sposób:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

Nazwa `waka` może zostać zastąpiona dowolnym ciągiem znaków określonym w fladze `SECTION_NAME`, jak opisano w sekcji [Dostępne flagi](#dostępne-flagi).

Te linie będą punktami wejścia dla generowanych metryk deweloperskich.

## Nowy w WakaTime

WakaTime daje wgląd w czas faktycznie spędzony na kodowaniu. Pomaga to zwiększyć produktywność i przewagę konkurencyjną.

- Przejdź na stronę <https://wakatime.com> i załóż konto.
- Pobierz swój klucz API WakaTime z [Ustawień Konta WakaTime](https://wakatime.com/settings/account).
- Zainstaluj [wtyczkę WakaTime](https://wakatime.com/plugins) w swoim ulubionym edytorze / IDE.
- Wklej swój klucz API, aby rozpocząć analizę.

### Repozytorium profilowe

Musisz utworzyć [Token Dostępu GitHub](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) z uprawnieniami `repo` oraz `user` i zapisać go w Repo Secrets jako `GH_TOKEN = <Twój Token Dostępu GitHub>`.

Przykładowy plik workflow do uruchamiania akcji:

```yml
name: Waka Readme

on:
  schedule:
    # Uruchamia się o 12am IST
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

- Teraz możesz wykonać commit i poczekać na automatyczne uruchomienie lub wywołać uruchomienie ręcznie w zakładce `Actions` swojego repozytorium, wybierając workflow `Profile Readme Development Stats` i klikając `Run workflow`. Poczekaj minutę lub dwie, a zobaczysz zmiany.

## Dodatki

Jeśli chcesz dodać więcej informacji do statystyk, możesz zdefiniować dodatkowe `FLAGI` w pliku workflow. Domyślnie wszystkie flagi są włączone (z wyjątkiem flagi linii kodu ze względu na złożoność operacji):

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Dostępne flagi

---

Flagę `LOCALE` można wykorzystać do wyświetlania statystyk w Twoim języku (np. `pl` dla języka polskiego). Domyślnie jest to język angielski. Należy przekazać kod [locale](https://saimana.com/list-of-country-locale-code/).

Flagę `SECTION_NAME` można ustawić na dowolny ciąg znaków — będzie to nazwa sekcji do zastąpienia w pliku README.

Flagę `COMMIT_BY_ME` można ustawić na `True`, aby wykonywać commit z użyciem Twojego imienia, nazwiska i adresu email.

Flagę `COMMIT_MESSAGE` można ustawić, aby dostosować treść wiadomości commita (domyślnie: "Updated with Dev Metrics").

Flagę `COMMIT_USERNAME` można ustawić jako nazwę użytkownika wykonującego commit (domyślnie: "readme-bot").

Flagę `COMMIT_EMAIL` można ustawić jako email wykonywania commita (domyślnie: "41898282+github-actions[bot]@users.noreply.github.com").

Flagę `SHOW_UPDATED_DATE` można ustawić na `True`, aby wyświetlać datę ostatniej aktualizacji.

Flagę `UPDATED_DATE_FORMAT` można zdefiniować do formatowania daty aktualizacji (domyślnie: `"%d/%m/%Y %H:%M:%S"`).

Flagę `SHOW_LINES_OF_CODE` można ustawić na `True`, aby wyświetlić sumaryczną liczbę napisanych linii kodu.

![Lines of Code](https://img.shields.io/badge/Od%20Hello%20World%20napisa%C5%82em-1.3%20miliona%20linii%20kodu-blue)

Flagę `SHOW_TOTAL_CODE_TIME` można ustawić na `False`, aby ukryć *Czas kodowania*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

> [!NOTE]
> Flagi `SHOW_AI_CODE_TIME` oraz `SHOW_AI_CODING` wymagają śledzenia aktywności AI w Twoim koncie WakaTime. Jeśli konto nie posiada danych AI, odznaka **AI Code Time** zostanie ukryta; jeśli brak danych dla bieżącego tygodnia, pojawi się komunikat "Brak zarejestrowanej aktywności kodowania z AI w tym tygodniu".

Flagę `SHOW_AI_CODE_TIME` można ustawić na `False`, aby ukryć odznakę **Czas kodowania z AI**.

![AI Code Time](http://img.shields.io/badge/AI%20Code%20Time-77%20hrs%2022%20mins-blue)

Flagę `SHOW_AI_CODING` można ustawić na `False`, aby ukryć cotygodniowy podział statystyk AI.

**🤖 Kodowanie z AI w tym tygodniu**

```text
⏱ Czas kodowania z AI: 1 hr 53 mins (3.59%)

✍️ 1,245 linii napisanych przez AI, 3,120 linii napisanych ręcznie (28.52% przez AI)

🔤 845,000 tokenów wejściowych, 21,000 tokenów wyjściowych

💵 Szacowany koszt AI w tym tygodniu: $12.48

🧠 5 sesji AI, 20 promptów AI

Sonnet                   1,200 lines         ██████████████████████░░░   89.96 %
GPT-4                    134 lines           ███░░░░░░░░░░░░░░░░░░░░░░   10.04 %

🔎 Statystyki kodowania z AI:
🧑‍💻 Głównie samodzielnie — 28.52% napisanych linii pochodziło z AI
📄 Szczegółowe prompty — średnio 925 znaków na prompt
🔁 Iteracyjne prompty — średnio 4 promptów na sesję
🔍 Dokładny recenzent — 73.29% zmienionych linii zedytowano ręcznie
```

Flagę `SHOW_PROFILE_VIEWS` można ustawić na `False`, aby ukryć **Wyświetlenia profilu**.

![Profile Views](http://img.shields.io/badge/Wy%C5%9Bwietlenia%20profilu-2189-blue)

Flagę `SHOW_COMMIT` można ustawić na `False`, aby ukryć statystyki commitów.

**Jestem rannym ptaszkiem 🐤**

```text
🌞 Rano         95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Południe     78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Wieczór      112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Noc          26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%
```

Flagę `SHOW_DAYS_OF_WEEK` można ustawić na `False`, aby ukryć podział na dni tygodnia.

📅 **Jestem najbardziej produktywny w Niedzielę**

```text
Poniedziałek 50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Wtorek       85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Środa        56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Czwartek     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Piątek       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Sobota       30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Niedziela    86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%
```

Flagę `SHOW_LANGUAGE` można ustawić na `False`, aby ukryć używane języki programowania.

Flagę `SHOW_OS` można ustawić na `False`, aby ukryć szczegóły systemu operacyjnego.

Flagę `SHOW_PROJECTS` można ustawić na `False`, aby ukryć rozwijane projekty.

Flagę `SHOW_TIMEZONE` można ustawić na `False`, aby ukryć strefę czasową.

Flagę `SHOW_EDITORS` można ustawić na `False`, aby ukryć listę edytorów kodu / IDE.

Flagę `SHOW_LANGUAGE_PER_REPO` można ustawić na `False`, aby ukryć liczbę repozytoriów w podziale na języki.

Flagę `SHOW_SHORT_INFO` można ustawić na `False`, aby ukryć skrótowe informacje z profilu GitHub.

**🐱 Mój GitHub**

> 🏆 433 kontrybucji w roku 2020
 >
> 📦 292.3 kB zajętego miejsca na GitHub
 >
> 💼 Szukam zatrudnienia
 >
> 📜 25 publicznych repozytoriów
 >
> 🔑 15 prywatnych repozytoriów

Flagę `SHOW_LOC_CHART` można ustawić na `False`, aby ukryć wykres napisanych linii kodu.

Flagę `IGNORED_REPOS` można zdefiniować np. jako `"waka-readme-stats, moje-pierwsze-repo"`, aby zignorować wybrane repozytoria.

Flagę `MAX_REPOS` można ustawić, aby ograniczyć liczbę repozytoriów pobieranych do analizy (domyślnie: `0` = bez limitu).

Paski postępu SVG można włączyć flagą `BAR_STYLE: "svg"`.

---

# Wkład w projekt (Contributing)

Wszelki wkład w rozwój projektu jest mile widziany ♥!

# Twórcy i wyróżnieni wspierający

Wszystkim kontrybutorom dziękujemy za pomoc w rozwoju projektu!

Stworzono z miłością :heart: i w Pythonie 🐍.
