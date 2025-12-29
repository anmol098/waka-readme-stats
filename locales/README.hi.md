<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# विकास मेट्रिक्स (Dev Metrics) README में जोड़े गए फीचर फ्लैग 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![प्रोजेक्ट पूर्वावलोकन](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨अद्भुत रीड्मी स्टेट्स</h3>
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
    <a href="https://github.com/anmol098/waka-readme-stats/issues">किसी बग की रिपोर्ट करें</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">फ़ीचर का अनुरोध करें</a>
</p>

## तैयारी का काम (Prep Work)

1. You need to update the markdown file(`.md`) with 2 comments. You can refer [here](#update-your-readme) for updating it.
2. You'll need a WakaTime API Key. You can get that from your WakaTime Account Settings
    - You can refer [here](#new-to-wakatime), if you're new to WakaTime.
3. You'll need a GitHub API Token with `repo` and `user` scope from [here](https://github.com/settings/tokens) if you're running the action to get commit metrics.
   - You can use [this](#profile-repository) example to work it out.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. आपको WakaTime API की कुंजी और GitHub API टोकन को रिपॉजिटरी के सीक्रेट्स में सहेजना होगा। आप इसे रिपॉजिटरी के सेटिंग्स में पा सकते हैं। सुनिश्चित करें कि आप उन्हें निम्नलिखित प्रकार से सहेजते हैं:
   - WakaTime API की कुंजी को `WAKATIME_API_KEY=<आपकी WakaTime API कुंजी>` के रूप में सहेजें।
   - GitHub के व्यक्तिगत एक्सेस टोकन (PAT) को `GH_TOKEN=<आपका GitHub एक्सेस टोकन>` के रूप में सहेजें।

2. आप अपनी आवश्यकताओं के अनुसार फीचर फ्लैग्स को सक्षम और निष्क्रिय कर सकते हैं।

इस GitHub एक्शन को `cron` का उपयोग करके किसी भी समय चलाया जा सकता है। [Crontab.guru](https://crontab.guru/) और [इस लिंक](https://crontab.cronhub.io/) का उपयोग करके `cron` एक्सप्रेशन जनरेट करें।

## अपना Readme अपडेट करें

अपने `README.md` फ़ाइल में इस प्रकार का टिप्पणी जोड़ें:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` को `SECTION_NAME` फ्लैग में निर्दिष्ट किसी भी स्ट्रिंग से बदला जा सकता है, जैसा कि [उपलब्ध फ्लैगों के अनुभाग](#flags-available) में बताया गया है।

ये पंक्तियाँ हमारे डेवलपर मेट्रिक्स के प्रवेश बिंदु होंगी।

## नए के लिए WakaTime

WakaTime आपको यह समझने में मदद करता है कि आप वास्तव में कोडिंग पर कितना समय बिताते हैं। यह आपकी उत्पादकता बढ़ाने और प्रतिस्पर्धी लाभ प्राप्त करने में आपकी सहायता करता है।

- [WakaTime](https://wakatime.com) पर जाएँ और एक खाता बनाएँ।
- अपने [WakaTime खाता सेटिंग्स](https://wakatime.com/settings/account) से WakaTime API कुंजी प्राप्त करें।
- अपने पसंदीदा एडिटर/IDE में [WakaTime प्लगइन](https://wakatime.com/plugins) स्थापित करें।
- API कुंजी पेस्ट करके विश्लेषण शुरू करें।

### प्रोफाइल रिपॉजिटरी

आपको [GitHub एक्सेस टोकन](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) प्राप्त करने की आवश्यकता होगी जिसमें `repo` और `user` स्कोप हो, और इसे रिपॉजिटरी सीक्रेट्स में सहेजें: `GH_TOKEN = <आपका GitHub एक्सेस टोकन>`

यहाँ एक नमूना वर्कफ़्लो फ़ाइल दी गई है जिसका उपयोग आप कर सकते हैं:

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

- अब आप इसे कमिट कर सकते हैं और यह स्वचालित रूप से चलेगा, या आप इसे ट्रिगर करके तुरंत देख सकते हैं परिणाम। बस अपने रिपो में `Actions` पर जाएं, अपने `Profile Readme Development Stats` वर्कफ़्लो का चयन करें और `वर्कफ़्लो चलाएँ` पर क्लिक करें। अब एक मिनट या दो का इंतज़ार करें और आप अपने बदलावों को देखेंगे।

## अतिरिक्त जानकारी

यदि आप अपनी सांख्यिकी में अन्य जानकारी जोड़ना चाहते हैं, तो आप अपने वर्कफ़्लो फ़ाइल में कई `FLAGS` जोड़ सकते हैं। डिफ़ॉल्ट रूप से, सभी फ्लैग सक्षम हैं (कोड की पंक्तियों का फ्लैग अपवाद के कारण जो भारी ऑपरेशन करता है)।

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### झंडे उपलब्ध हैं

---

`LOCALE`: इस झंडे का उपयोग अपनी भाषा में सांख्यिकी दिखाने के लिए किया जा सकता है। डिफ़ॉल्ट अंग्रेज़ी है। देश के स्थानीय कोड को पास करने के लिए झंडा चर में [संक्षिप्त हैंड](https://saimana.com/list-of-country-locale-code/) का उपयोग किया जा सकता है। [यहाँ](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md) अंतिम परिणाम का उदाहरण दिया गया है।

`SECTION_NAME`: इस झंडे को किसी भी स्ट्रिंग में सेट किया जा सकता है, और यह README में सेक्शन का नाम होगा जिसे बदला जाएगा।

`COMMIT_BY_ME`: इसे `True` सेट करके कोड को आपके नाम और ईमेल से कमिट किया जा सकता है।

`COMMIT_MESSAGE`: कमिट संदेश के लिए इसे सेट कर सकते हैं। डिफ़ॉल्ट "अपडेट किया गया डेवलपर मेट्रिक्स" है।

`COMMIT_USERNAME`: इसे एक उपयोगकर्ता नाम सेट करके कोड को कमिट किया जा सकता है। डिफ़ॉल्ट "readme-bot" है।

`COMMIT_EMAIL`: इसे कमिट कोड के लिए एक ईमेल सेट करके सेट किया जा सकता है। डिफ़ॉल्ट "41898282+github-actions[bot]@users.noreply.github.com" है।

`SHOW_UPDATED_DATE`: इसे `True` सेट करके अंत में अपडेट तिथि दिखाई देगी।

`UPDATED_DATE_FORMAT`: इसे सेट करके अपडेट तिथि को एक फ़ॉर्मेट में रखा जा सकता है। डिफ़ॉल्ट `"%d/%m/%Y %H:%M:%S"` है।

`SHOW_LINES_OF_CODE` को `True` सेट करके लिखे गए कोड की पंक्तियों की संख्या दिखाई देगी।

![लाइन्स ऑफ़ कोड](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` को `False` सेट करके *कोड टाइम* छिपाया जा सकता है।

![कोड टाइम](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` को `False` सेट करके **प्रोफ़ाइल व्यूज** छिपाए जा सकते हैं।

![प्रोफ़ाइल व्यूज](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` को `False` सेट करके कमिट सांख्यिकी छिपाई जा सकती है।

मैं एक शुरुआती 🐤 हूँ।

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` फ्लैग को `False` पर सेट किया जा सकता है ताकि सप्ताह के विभिन्न दिनों में किए गए कमिट्स को छिपाया जा सके।

📅 **मैं रविवार को सबसे उत्पादक हूँ**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` फ्लैग को `False` पर सेट किया जा सकता है ताकि उपयोग की जाने वाली प्रोग्रामिंग भाषाओं को छिपाया जा सके।

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` फ्लैग को `False` पर सेट किया जा सकता है ताकि आपके ऑपरेटिंग सिस्टम के विवरण छिपे रहें।

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` फ्लैग को `False` पर सेट किया जा सकता है ताकि उन पर काम किए गए प्रोजेक्ट्स को छिपाया जा सके।

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` फ्लैग को `False` पर सेट किया जा सकता है ताकि आपके यहाँ मौजूद समय क्षेत्र को छिपाया जा सके।

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` झंडा `False` पर सेट किया जा सकता है ताकि कोड एडिटर्स/IDEs की सूची छिपाई जा सके।

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` फ्लैग को `False` पर सेट किया जा सकता है ताकि विभिन्न प्रोग्रामिंग भाषाओं और फ्रेमवर्क में रिपॉजिटरी की संख्या छिपाई जा सके।

**मैं मुख्य रूप से Vue में कोड लिखता हूँ**

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

**🐱 मेरे GitHub डेटा**

> 🏆 2020 में 433 योगदान
>
> 📦 GitHub स्टोरेज में 292.3 केबी का उपयोग किया
>
> 💼 नियुक्ति के लिए चुना गया
>
> 📜 25 सार्वजनिक रिपॉजिटरी
>
> 🔑 15 निजी रिपॉजिटरी (स्वामित्व में)

`SHOW_LOC_CHART` फ्लैग को `False` पर सेट करके विभिन्न तिमाहियों और वर्षों में लिखे गए कोड की रेखाओं को छिपाया जा सकता है।

`IGNORED_REPOS` फ्लैग को `"waka-readme-stats, my-first-repo"` (केवल उदाहरण) जैसा सेट करके कुछ रिपॉजिटरी को अनदेखा किया जा सकता है जिन्हें आप गिने नहीं जाना चाहते।

`SYMBOL_VERSION` फ्लैग को संशोधित किया जा सकता है (डिफ़ॉल्ट: `1`) प्रगति बार के लिए संकेत के लिए।

| संस्करण | पूरा ब्लॉक | खाली ब्लॉक |
| -------- | ---------- | ----------- |
| 1        | █          | ░          |
| 2        | ⣿          | ⣀          |
| 3        | ⬛         | ⬜          |

`DEBUG_LOGGING` फ्लैग को बढ़ाकर GitHub एक्शन के आउटपुट की विस्तृतता को सेट किया जा सकता है, जो डिफ़ॉल्ट रूप से आंतरिक रनर डिबग प्रॉपर्टी पर निर्भर करता है।

**टाइमलाइन**

![चार्ट नहीं मिला](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: प्रोजेक्ट का समर्थन करें

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use this action on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - You can make one-time donations via PayPal. I'll probably buy some ~~beer~~ wine 🍷.

Thanks! :heart:

---

# योगदान

योगदान का स्वागत है ♥! कृपया किसी भी फ़ीचर्स को साझा करें और यूनिट टेस्ट जोड़ें! पुल रिक्वेस्ट और इश्यू सिस्टम का उपयोग करके योगदान करें।

# चुनिंदा योगदानकर्ता

1. [अनमोल प्रताप सिंह](https://github.com/anmol098): रखवाला
2. [अलेक्जेंडर सर्गेव](https://github.com/pseusys): रखवाला
3. [आराविंद वी. नायर](https://github.com/aravindvnair99): रखवाला
4. [प्रभात सिंह](https://github.com/prabhatdev): कोड टाइमलाइन ग्राफ के लिए [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [हेडी ली](https://github.com/hedythedev): पुल रिक्वेस्ट [#34](https://github.com/anmol098/waka-readme-stats/pull/34) और [#23](https://github.com/anmol098/waka-readme-stats/pull/23) के लिए
6. [पेड्रो टॉरेस](https://github.com/Corfucinas): पुल रिक्वेस्ट [#29](https://github.com/anmol098/waka-readme-stats/pull/29) के लिए
7. [आरॉन मीस](https://github.com/ajmeese7): पुल रिक्वेस्ट [#45](https://github.com/anmol098/waka-readme-stats/pull/45) के लिए
8. [अर्नव जिंदल](https://github.com/Daggy1234): पुल रिक्वेस्ट [#48](https://github.com/anmol098/waka-readme-stats/pull/48) के लिए
9. [डैनियल रोव](https://github.com/DanRowe): पुल रिक्वेस्ट [#57](https://github.com/anmol098/waka-readme-stats/pull/57) के लिए
10. [Ss5h](https://github.com/tlatkdgus1): प्राकृतिक वाक्य लेखन के लिए अनुवाद समर्थन जोड़ने के लिए [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- और आप! अगर आप इसे अभी सही तरीके से इस्तेमाल कर रहे हैं और आप सूची में नहीं हैं, तो कृपया हमें एक [विशेष उल्लेख](https://github.com/anmol098/waka-readme-stats/issues/new/choose) मुद्दा भेजकर बताएं! :blush: 
  हम आपको सूची में जोड़ने में खुशी महसूस करेंगे।

Python 🐍 के साथ बनाया गया है और :heart: के साथ।

# प्रेरणास्रोत

> [अद्भुत पिन किए गए गिस्ट्स](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### इस परियोजना के लिए आपका **तारा** ⭐ आपको देने की ज़रूरत है ♥

## समय के साथ स्टारगेज़र

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

