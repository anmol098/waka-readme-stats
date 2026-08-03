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

# README में विकास संबंधी मेट्रिक्स और अतिरिक्त फ़ीचर फ़्लैग शामिल 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨अद्भुत README स्टैट्स</h3>
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
   क्या आप एक प्रारंभिक 🐤 या रात का 🦉 हैं?
   <br/>
   दिन में आपके उत्पादकता का समय कब होता है?
   <br/>
   आप किन भाषाओं में कोड लिखते हैं?
   <br/>
   अपने प्रोफ़ाइल के README में इसकी जांच करें!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bug</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Feature</a>
  </p>

## प्रीप वर्क

1. आपको मार्कडाउन फ़ाइल(`.md`) को 2 कमेंट से अपडेट करना होगा। आप इसे अपडेट करने के लिए [यहां](#update-your-readme) देख सकते हैं।
2. आपको एक WakaTime API की आवश्यकता होगी। आप अपने WakaTime अकाउंट सेटिंग्स से इसे प्राप्त कर सकते हैं
    - यदि आप WakaTime के नए हैं, तो [यहां](#new-to-wakatime) देख सकते हैं।
3. आपको आवश्यकता होगी एक GitHub API टोकन जो `repo` और `user` के स्कोप के साथ हो, यदि आप कमिट मेट्रिक्स प्राप्त करने के लिए एक्शन चला रहे हैं।
   - आप [इस](#profile-repository) उदाहरण का उपयोग कर सकते हैं।

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. आपको WakaTime API कुंजी और GitHub API टोकन को रिपॉजिटरी सीक्रेट्स में सेव करना होगा। आप इसे अपनी रिपॉजिटरी के सेटिंग्स में पाएंगे। \
  इन्हें निम्नानुसार सेव करने सुनिश्चित करें:
    - WakaTime API कुंजी के रूप में `WAKATIME_API_KEY=<your wakatime API Key>`
    - GitHub प्राइवेट एक्सेस टोकन (PAT) के रूप में `GH_TOKEN=<your github access token>`
5. आप अपनी आवश्यकताओं के आधार पर फीचर फ्लैग्स को एनेबल या डिसेबल कर सकते हैं।

यह GitHub Action किसी भी समय चलाया जा सकता है `cron` का उपयोग करके। [Crontab.guru](https://crontab.guru/) और [this](https://crontab.cronhub.io/) वेबसाइट देखें `cron` अभिव्यक्ति उत्पन्न करने के लिए।

## अपने Readme को अपडेट करें

अपने `README.md` में ऐसा टिप्पणी जोड़ें:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` को `SECTION_NAME` फ्लैग में निर्दिष्ट किसी भी स्ट्रिंग से बदला जा सकता है जैसा कि [उपलब्ध फ्लैग्स खंड](#flags-available) में बताया गया है।

ये लाइनें हमारे डेव मीट्रिक्स के प्रवेश-बिंदु होंगे।

## नए WakaTime के लिए

WakaTime आपको बताता है कि आपने कोडिंग पर वास्तव में कितना समय खर्च किया। यह आपकी उत्पादकता और प्रतिस्पर्धी बढ़त को बढ़ाने में मदद करता है।

- <https://wakatime.com> पर जाएं और एक खाता बनाएं।
- अपने [WakaTime में खाता सेटिंग्स](https://wakatime.com/settings/account) से WakaTime API कुंजी प्राप्त करें।
- अपने पसंदीदा संपादक / IDE में [WakaTime प्लगइन](https://wakatime.com/plugins) को इंस्टॉल करें।
- विश्लेषण शुरू करने के लिए अपनी API कुंजी पेस्ट करें।

### प्रोफ़ाइल रिपॉजिटरी

आपको एक [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) के साथ `repo` और `user` के स्कोप के साथ प्राप्त करने की आवश्यकता होगी और इसे Repo Secrets में `GH_TOKEN = <Your GitHub Access Token>` में सहेजना होगा

यहाँ इसे चलाने के लिए एक नमूना वर्कफ़्लो फ़ाइल है:

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

- अब आप कमिट कर सकते हैं और इसके ऑटोमेटिक रन होने के लिए इंतजार कर सकते हैं, या आप अब इसे रन करके अपने रिजल्ट को देखना भी चाह सकते हैं। बस अपने रिपो में `Actions` जाएं, अपने `Profile Readme Development Stats` वर्कफ़्लो का चयन करें और `Run workflow` पर क्लिक करें। अब एक मिनट या दो मिनट तक इंतजार करें और आप अपने बदलाव देखेंगे।

## एक्स्ट्रा

अगर आप अपने स्टैट्स में अन्य जानकारी जोड़ना चाहते हैं, तो आप अपने वर्कफ़्लो फ़ाइल में कई `FLAGS` जोड़ सकते हैं। डिफ़ॉल्ट रूप से सभी फ़्लैग्स एनेबल होते हैं (लाइन्स ऑफ़ कोड फ़्लैग के अपवाद के रूप में क्योंकि इसमें काफ़ी भारी ऑपरेशन किया जाता है)

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### उपलब्ध फ्लैग्स

---

`LOCALE` यह फ्लैग आपकी भाषा में स्टैट्स दिखाने के लिए उपयोग किया जा सकता है। डिफ़ॉल्ट अंग्रेजी है। लोकेल [संक्षिप्त रूप](https://saimana.com/list-of-country-locale-code/) फ्लैग चर वेरिएबल में पास किया जाना चाहिए। अंतिम परिणाम के उदाहरण [यहाँ](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md) पाए जा सकते हैं

`SECTION_NAME` फ्लैग को किसी भी स्ट्रिंग के रूप में सेट किया जा सकता है, और यह रीडमी में बदले जाने वाले खंड का नाम होगा।

`COMMIT_BY_ME` फ्लैग को `True` सेट करके अपने नाम और ईमेल के साथ कोड कमिट कर सकते हैं।

`COMMIT_MESSAGE` फ्लैग कमिट मैसेज के लिए सेट किया जा सकता है। डिफ़ॉल्ट "Updated with Dev Metrics" है।

`COMMIT_USERNAME` फ्लैग कमिट करने के लिए एक उपयोगकर्ता नाम के रूप में सेट किया जा सकता है। डिफ़ॉल्ट "readme-bot" है।

`COMMIT_EMAIL` फ्लैग को कोड कमिट करने के लिए ईमेल के रूप में सेट किया जा सकता है। डिफ़ॉल्ट "41898282+github-actions[bot]@users.noreply.github.com" है।

`SHOW_UPDATED_DATE` फ्लैग को `True` सेट करके पैराग्राफ के अंत में अपडेट की गई तारीख दिखाई जा सकती है।

`UPDATED_DATE_FORMAT` फ्लैग को अपडेट की गई तारीख को एक फॉर्मेट में रखने के लिए सेट किया जा सकता है। डिफ़ॉल्ट `"%d/%m/%Y %H:%M:%S"` है।

`SHOW_LINES_OF_CODE` फ्लैग को `True` सेट करके अब तक लिखे गए कोड की पंक्तियों की संख्या दिखाई जा सकती है।

![कोड की पंक्तियाँ](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` फ्लैग को `False` सेट करके *कोड समय* छिपा सकते हैं।

![कोड समय](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` फ्लैग को `False` सेट करके **प्रोफ़ाइल दृश्य** छिपा सकते हैं।

![प्रोफ़ाइल दृश्य](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` फ्लैग को `False` सेट करके कमिट स्टैट्स छिपा सकते हैं।

**मैं एक छोटा 🐤 हूँ**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` फ्लैग को `False` पर सेट करके अपने सप्ताह के विभिन्न दिनों पर किए गए कमिट्स को छिपा सकते हैं।

📅 **मैं सोमवार को सबसे अधिक उत्पादक होता हूं**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` फ्लैग को `False` पर सेट करके आप अपने द्वारा उपयोग किए गए प्रोग्रामिंग भाषाओं को छिपा सकते हैं।

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` फ्लैग को `False` सेट करके आप अपने OS विवरण को छिपा सकते हैं।

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` फ्लैग को `False` पर सेट करके काम किए गए प्रोजेक्ट्स को छिपा सकते हैं।

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` फ्लैग को `False` पर सेट करके आप अपने टाइम जोन को छिपा सकते हैं।

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` फ्लैग को `False` पर सेट करके कोड एडिटर/IDEs की सूची छिपा सकते हैं।

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` फ्लैग को `False` पर सेट करके विभिन्न कार्यक्रमित भाषाओं और फ्रेमवर्क में रिपॉजिटरी की संख्या छिपा सकते हैं।

**मैं अधिकतर व्यू में कोड लिखता हूं**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO` फ्लैग को `False` पर सेट करके एक उपयोगकर्ता के छोटे मजेदार तथ्य जानकारी को छिपा सकते हैं।

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 मेरा GitHub डेटा**

> 🏆 2020 में 433 योगदान
 >
> 📦 GitHub के स्टोरेज में 292.3 kB का उपयोग किया
 >
> 💼 नियुक्ति के लिए चुना गया
 >
> 📜 25 सार्वजनिक रिपॉजिटरी
 >
> 🔑 15 स्वामित्व वाले निजी रिपॉजिटरी

`SHOW_LOC_CHART` फ्लैग को `False` सेट करके विभिन्न वर्षों के विभिन्न तिमाही में लिखे गए कोड की लाइनों को छिपा सकते हैं।

`IGNORED_REPOS` फ्लैग को `"waka-readme-stats, my-first-repo"` (केवल एक उदाहरण) सेट करके कुछ रिपॉजिटरी को गिने जाने से छोड़ सकते हैं जिनकी आपको गिने जाने की आवश्यकता नहीं है।

`SYMBOL_VERSION` फ्लैग के लिए प्रगति बार के लिए संकेत के लिए सेट किया जा सकता है (डिफ़ॉल्ट: `1`).

| संस्करण | किया गया ब्लॉक | खाली ब्लॉक |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

**SVG प्रोग्रेस बार**

आप निम्नलिखित फ्लैग का उपयोग करके Unicode टेक्स्ट बार से रंगीन SVG बार में स्विच कर सकते हैं:

- `BAR_STYLE` — SVG बार सक्षम करने के लिए `"svg"` पर सेट करें, या Unicode बार के लिए `"text"` (डिफ़ॉल्ट)
- `BAR_COLOR` — भरे हुए भाग के लिए हेक्स रंग (डिफ़ॉल्ट: `"#90CAF9"` हल्का नीला)
- `BAR_TRACK_COLOR` — पृष्ठभूमि ट्रैक के लिए हेक्स रंग (डिफ़ॉल्ट: `"#172f45"` गहरा नीला)
- `BAR_RADIUS` — गोल कोनों के लिए सीमा त्रिज्या (डिफ़ॉल्ट: `"0"` वर्ग के लिए)
  - `"0"` = तीक्ष्ण वर्गाकार किनारे
  - `"4"` = सूक्ष्मता से गोल कोने
  - कोई भी सकारात्मक पूर्णांक काम करता है
- `TEXT_PRIMARY_COLOR` — SVG सूची के प्राथमिक टेक्स्ट (जैसे भाषा/प्रोजेक्ट नाम) के लिए हेक्स रंग (डिफ़ॉल्ट: `"#c9d1d9"`)
- `TEXT_SECONDARY_COLOR` — SVG सूची के द्वितीयक टेक्स्ट (जैसे समय और प्रतिशत) के लिए हेक्स रंग (डिफ़ॉल्ट: `"#8b949e"`)

SVG बार सक्षम वर्कफ़्लो उदाहरण:

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

**पहले / बाद में**

डिफ़ॉल्ट Unicode बार (`BAR_STYLE: "text"`, या `BAR_STYLE` छोड़ने पर):

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0%
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75%
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75%
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38%
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
```

SVG बार, चौकोर कोने (`BAR_STYLE: "svg"`, `BAR_RADIUS: "0"`, डिफ़ॉल्ट `BAR_COLOR` / `BAR_TRACK_COLOR`):

![SVG प्रगति बार (चौकोर)](https://i.imgur.com/eShKuJH.png)

SVG बार, गोल कोने (`BAR_STYLE: "svg"`, `BAR_RADIUS: "4"`):

![SVG प्रगति बार (गोल कोने)](https://i.imgur.com/dYOgG6I.png)

`DEBUG_LOGGING` फ्लैग को सेट करके GitHub Action के आउटपुट के विवरण को बढ़ाया जा सकता है, डिफ़ॉल्ट रूप से आंतरिक रनर डिबग संपत्ति के बराबर है

**टाइमलाइन**

![चार्ट नहीं मिला](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: प्रोजेक्ट का समर्थन करें

मैं अपने कर सकने वाले लगभग सभी चीजों को ओपन सोर्स करता हूं, और मैं इन प्रोजेक्ट्स के उपयोग से मदद चाहने वाले लोगों के साथ बातचीत करने की कोशिश करता हूं। बेशक,
यह समय लेता है। आप इस सेवा का उपयोग निःशुल्क कर सकते हैं।

हालांकि, यदि आप इस प्रोजेक्ट का उपयोग कर रहे हैं और इससे खुश हैं या बस मुझे जारी रखने के लिए प्रेरित करना चाहते हैं, तो आप कुछ तरीकों से इसका समर्थन कर सकते हैं :-

- जब आप अपने रीडमे में इस कार्रवाई का उपयोग करते हैं तो इसका उचित श्रेय दें और इसे लिंक करें :D
- प्रोजेक्ट को स्टार दें और इसे साझा करें :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - आप पेपॉल के माध्यम से एक बार के दान कर सकते हैं। मैं शायद कुछ ~~बीयर~~ वाइन 🍷 खरीदूंगा।

धन्यवाद! :heart:

# योगदान

योगदान स्वागत है ♥! कृपया कोई भी विशेषताओं के बारे में साझा करें, और यूनिट टेस्ट जोड़ें! पुल रिक्वेस्ट और इश्यू सिस्टम का उपयोग करके योगदान दें।

# चुने गए सहयोगी

1. [अनमोल प्रताप सिंह](https://github.com/anmol098): संभालने वाला
2. [अलेक्जेंडर सर्जेएव](https://github.com/pseusys): संभालने वाला
3. [डेटा बॉय सु](https://github.com/DataBoySu): संभालने वाला
4. [ओक कोडर 1](https://github.com/ok-coder1): संभालने वाला
5. [अरविंद वी. नेयर](https://github.com/aravindvnair99): संभालने वाला
6. [प्रभात सिंह](https://github.com/prabhatdev): कोड टाइमलाइन ग्राफ के लिए [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [हेडी ली](https://github.com/hedythedev): पुल रिक्वेस्ट के लिए [#34](https://github.com/anmol098/waka-readme-stats/pull/34) और [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [पेड्रो टोरेस](https://github.com/Corfucinas): पुल रिक्वेस्ट के लिए [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [एरॉन मीस](https://github.com/ajmeese7): पुल रिक्वेस्ट के लिए [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [अर्नव जिंदल](https://github.com/Daggy1234): पुल रिक्वेस्ट के लिए [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [डैनियल रोवे](https://github.com/DanRowe): पुल रिक्वेस्ट के लिए [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [एसएस 5एच](https://github.com/tlatkdgus1): प्राकृतिक वाक्य लेखन के लिए अनुवाद के समर्थन के लिए [#136](https://github.com/anmol098/waka-readme-stats/pull/136)
13. [acheronx0577](https://github.com/acheronx0577): रंग और आकार विकल्पों के साथ SVG प्रगति बार समर्थन जोड़ने के लिए [#657](https://github.com/anmol098/waka-readme-stats/pull/657)

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

- और आप! अगर आप इसका वर्तमान में उपयोग कर रहे हैं और सूची में नहीं हैं तो कृपया हमें एक [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) समस्या भेजकर बताएं! :blush: \
  हम आपको सूची में जोड़ने के लिए खुश होंगे।

:heart: और Python 🐍 के साथ बनाया गया।

# प्रेरित

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### इस प्रोजेक्ट को आपके द्वारा एक **star** ⭐ की आवश्यकता है ♥

## समय के साथ स्टारगेजर्स

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

