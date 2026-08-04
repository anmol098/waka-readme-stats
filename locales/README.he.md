<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.he.md">🇮🇱 עברית</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> אנחנו מחפשים מתרגמים לפרויקט הזה. \
> כל עזרה תתקבל בברכה רבה. \
> אנא ראו את הנושא <https://github.com/anmol098/waka-readme-stats/issues/23> אם ברצונכם לעזור!

<div dir="rtl">

# מדדי פיתוח ב-README עם דגלי תכונות נוספים 🎌

</div>

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

<div dir="rtl">
<p align="center">
   האם אתה ציפור מוקדמת 🐤 או ינשוף לילה 🦉?
   <br/>
   מתי אתה הכי פרודוקטיבי במהלך היום?
   <br/>
   באילו שפות תכנות אתה כותב קוד?
   <br/>
   בואו נבדוק את זה ב-README של הפרופיל שלך!
</p>
</div>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">דיווח על באג</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">בקשת תכונה</a>
  </p>

<div dir="rtl">

## הכנות מקדימות

1. עליך לעדכן את קובץ ה-Markdown (`.md`) עם 2 הערות. תוכל לקרוא [כאן](#עדכון-ה-readme-שלך) איך לעשות זאת.
2. אתה צריך מפתח API של WakaTime. תוכל לקבל אותו מהגדרות חשבון WakaTime שלך.
    - תוכל לקרוא [כאן](#חדש-ב-wakatime) אם אתה חדש ב-WakaTime.
3. אם אתה רוצה להריץ את הפעולה כדי לקבל מדדי Commit, תצטרך טוקן API של GitHub עם הרשאות `repo` ו-`user` מ[כאן](https://github.com/settings/tokens)
   - תוכל להשתמש ב[דוגמה הזו](#מאגר-פרופיל) כדי להבין את זה.

> [!NOTE]
> הפעלת הרשאת ה-`repo` נראית **מסוכנת**, \
> אבל GitHub Action זה ניגש רק לחותמות הזמן של ה-Commits שלך ולמספר שורות הקוד שנוספו או נמחקו במאגרים שתרמת להם.

4. עליך לשמור את מפתח ה-API של WakaTime ואת טוקן ה-API של GitHub בסודות המאגר. תוכל למצוא את זה בהגדרות המאגר שלך. \
  הקפד לשמור אותם תחת השמות הבאים:
    - מפתח API של WakaTime כ-`WAKATIME_API_KEY=<מפתח ה-API שלך ב-WakaTime>`
    - GitHub Personal Access Token (PAT) כ-`GH_TOKEN=<טוקן הגישה שלך ב-GitHub>`
5. תוכל להפעיל ולכבות דגלי תכונות בהתאם לדרישות שלך.

ניתן להגדיר את GitHub Action הזה לרוץ בכל זמן שתרצה באמצעות `cron`. בדוק את [Crontab.guru](https://crontab.guru/) ואת [האתר הזה](https://crontab.cronhub.io/) כדי ליצור ביטויי `cron`.

## עדכון ה-README שלך

הוסף הערה ל-`README.md` שלך כך:

</div>

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

<div dir="rtl">

ניתן להחליף את `waka` בכל מחרוזת שתוגדר בדגל `SECTION_NAME`, כפי שמתואר ב[סעיף הדגלים הזמינים](#דגלים-זמינים).

שורות אלו יהיו נקודות הכניסה שלנו למדדי הפיתוח.

## חדש ב-WakaTime

WakaTime נותן לך תובנות על הזמן האמיתי שאתה מקדיש לתכנות. זה עוזר לך להגביר את הפרודוקטיביות ואת היתרון התחרותי שלך.

- גש ל-<https://wakatime.com> וצור חשבון.
- קבל את מפתח ה-API של WakaTime שלך מ[הגדרות החשבון ב-WakaTime](https://wakatime.com/settings/account).
- התקן את [תוסף WakaTime](https://wakatime.com/plugins) בעורך / IDE המועדף עליך.
- הזן את מפתח ה-API שלך כדי להתחיל את הניתוח.

### מאגר פרופיל

תצטרך [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) עם הרשאות `repo` ו-`user` ולשמור אותו בסודות המאגר `GH_TOKEN = <טוקן הגישה שלך ב-GitHub>`.

הנה קובץ Workflow לדוגמה להרצה:

</div>

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

<div dir="rtl">

- עכשיו תוכל לבצע Commit ולחכות שזה ירוץ אוטומטית, או שתוכל גם להפעיל אותו ידנית כדי לראות את התוצאה עכשיו. פשוט לך ל-`Actions` במאגר שלך, בחר את ה-Workflow של `Profile Readme Development Stats` ולחץ על `Run workflow`. עכשיו רק צריך לחכות דקה-שתיים ותראה את השינויים.

## תוספות

אם ברצונך להוסיף מידע נוסף לסטטיסטיקות שלך, תוכל להוסיף מספר `FLAGS` לקובץ ה-Workflow שלך. כברירת מחדל, כל הדגלים מופעלים (למעט הדגל עבור שורות קוד בגלל הפעולה האינטנסיבית שמבוצעת)

</div>

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

<div dir="rtl">

### דגלים זמינים

---

דגל `LOCALE` ניתן לשימוש כדי להציג סטטיסטיקות בשפה שלך. ברירת המחדל היא אנגלית. יש להעביר [קיצור מקומי](https://saimana.com/list-of-country-locale-code/) למשתנה הדגל. דוגמה לתוצאה סופית ניתן למצוא [כאן](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

דגל `SECTION_NAME` יכול להיות מוגדר לכל מחרוזת ויהיה שם הסעיף שיוחלף ב-README.

דגל `COMMIT_BY_ME` יכול להיות מוגדר ל-`True` כדי לבצע Commit עם השם וכתובת הדוא"ל שלך.

דגל `COMMIT_MESSAGE` יכול להיות מוגדר להודעת ה-Commit. ברירת המחדל היא "Updated with Dev Metrics".

דגל `COMMIT_USERNAME` יכול להיות מוגדר כשם המשתמש לביצוע ה-Commit. ברירת המחדל היא "readme-bot".

דגל `COMMIT_EMAIL` יכול להיות מוגדר לכתובת דוא"ל לביצוע ה-Commit. ברירת המחדל היא "41898282+github-actions[bot]@users.noreply.github.com".

דגל `SHOW_UPDATED_DATE` יכול להיות מוגדר ל-`True` כדי להציג את תאריך העדכון בסוף הפסקה.

דגל `UPDATED_DATE_FORMAT` יכול להיות מוגדר כדי להגדיר את פורמט תאריך העדכון. ברירת המחדל היא `"%d/%m/%Y %H:%M:%S"`.

דגל `SHOW_LINES_OF_CODE` יכול להיות מוגדר ל-`True` כדי להציג את מספר שורות הקוד שנכתבו עד היום.

</div>

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

<div dir="rtl">

דגל `SHOW_TOTAL_CODE_TIME` יכול להיות מוגדר ל-`False` כדי להסתיר את *זמן הקוד*.

</div>

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

<div dir="rtl">

דגל `SHOW_PROFILE_VIEWS` יכול להיות מוגדר ל-`False` כדי להסתיר **צפיות בפרופיל**.

</div>

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

<div dir="rtl">

דגל `SHOW_COMMIT` יכול להיות מוגדר ל-`False` כדי להסתיר את סטטיסטיקות ה-Commit.

**אני ציפור מוקדמת 🐤**

</div>

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

<div dir="rtl">

דגל `SHOW_DAYS_OF_WEEK` יכול להיות מוגדר ל-`False` כדי להסתיר את ה-Commits שבוצעו בימים שונים בשבוע.

📅 **אני הכי פרודוקטיבי בימי ראשון**

</div>

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

<div dir="rtl">

דגל `SHOW_LANGUAGE` יכול להיות מוגדר ל-`False` כדי להסתיר את שפות התכנות שבהן אתה משתמש.

</div>

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

<div dir="rtl">

דגל `SHOW_OS` יכול להיות מוגדר ל-`False` כדי להסתיר את פרטי מערכת ההפעלה שלך.

</div>

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

<div dir="rtl">

דגל `SHOW_PROJECTS` יכול להיות מוגדר ל-`False` כדי להסתיר את הפרויקטים שעבדת עליהם.

</div>

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

<div dir="rtl">

דגל `SHOW_TIMEZONE` יכול להיות מוגדר ל-`False` כדי להסתיר את אזור הזמן שבו אתה נמצא.

</div>

```text
⌚︎ Timezone: Asia/Calcutta
```

<div dir="rtl">

דגל `SHOW_EDITORS` יכול להיות מוגדר ל-`False` כדי להסתיר את רשימת עורכי הקוד / סביבות הפיתוח שבהם אתה משתמש.

</div>

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

<div dir="rtl">

דגל `SHOW_LANGUAGE_PER_REPO` יכול להיות מוגדר ל-`False` כדי להסתיר את מספר המאגרים בשפות תכנות ופריימוורקים שונים.

**אני כותב בעיקר ב-Vue**

</div>

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

<div dir="rtl">

דגל `SHOW_SHORT_INFO` יכול להיות מוגדר ל-`False` כדי להסתיר את המידע הקצר והמהנה על המשתמש.

> [!NOTE]
> סעיף זה דורש Personal Access Token (PAT) עם הרשאת `user`, אחרת הנתונים המוצגים כאן יהיו שגויים.

**🐱 נתוני ה-GitHub שלי**

> 🏆 433 תרומות בשנת 2020
 >
> 📦 292.3 ק"ב בשימוש באחסון GitHub
 >
> 💼 מחפש עבודה
 >
> 📜 25 מאגרים ציבוריים
 >
> 🔑 15 מאגרים פרטיים בבעלותי

דגל `SHOW_LOC_CHART` יכול להיות מוגדר ל-`False` כדי להסתיר את מספר שורות הקוד שנכתבו ברבעונים שונים בשנים שונות.

דגל `IGNORED_REPOS` יכול להיות מוגדר ל-`"waka-readme-stats, my-first-repo"` (רק דוגמה) כדי להתעלם ממאגרים מסוימים שלא צריכים להיספר.

דגל `SYMBOL_VERSION` יכול להיות מוגדר לסמל של סרגל ההתקדמות (ברירת מחדל: `1`).

</div>

| גרסה | בלוק מלא | בלוק ריק |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

<div dir="rtl">

דגל `DEBUG_LOGGING` יכול להיות מוגדר כדי להגביר את רמת הפלט של GitHub Action, כברירת מחדל הוא תואם למאפיין ה-Debug הפנימי של הרצה.

**ציר זמן**

</div>

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

<div dir="rtl">

## :sparkling_heart: תמיכה בפרויקט

אני מפתח בקוד פתוח כמעט כל מה שאני יכול, ומנסה להשיב לכל אחד שצריך עזרה בפרויקטים האלה. כמובן
שזה לוקח זמן. אתה יכול להשתמש בשירות הזה בחינם.

עם זאת, אם אתה משתמש בפרויקט הזה ומרוצה ממנו או סתם רוצה שאמשיך ליצור דברים, יש כמה דרכים לעשות זאת :-

- תן קרדיט מתאים כשאתה משתמש בפעולה הזו ב-README שלך, בבקשה הוסף קישור :D
- תן כוכב ושתף את הפרויקט :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - אתה יכול לבצע תשלום חד-פעמי דרך PayPal. כנראה שאקנה קצת ~~בירה~~ יין 🍷.

תודה! :heart:

# תרומות

תרומות יתקבלו בברכה ♥! אנא שתפו כל תכונה והוסיפו בדיקות יחידה! השתמשו במערכת ה-Pull Request וה-Issues כדי לתרום.

# תורמים נבחרים

</div>

1. [Anmol Pratap Singh](https://github.com/anmol098): Maintainer
2. [Alexander Sergeev](https://github.com/pseusys): Maintainer
3. [DataBoySu](https://github.com/DataBoySu): Maintainer
4. [okcoder1](https://github.com/ok-coder1): Maintainer
5. [Aravind V. Nair](https://github.com/aravindvnair99): Maintainer
6. [Prabhat Singh](https://github.com/prabhatdev): עבור גרף ציר הזמן של הקוד [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): עבור Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) ו-[#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): עבור Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): עבור Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): עבור Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): עבור Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): עבור הוספת תמיכה בניסוח משפטים טבעי בתרגום [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

<div dir="rtl">

- ואתה! אם אתה משתמש בזה עכשיו ולא נמצא ברשימה, אנא פנה אלינו על ידי יצירת Issue של [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose)! :blush:  
  נשמח להוסיף אותך לרשימה.

נוצר עם :heart: ו-Python 🐍.

# בהשראת

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### הפרויקט הזה צריך **כוכב** ⭐ ממך ♥

## Stargazers לאורך הזמן

</div>

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)
