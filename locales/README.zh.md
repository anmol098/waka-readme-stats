<!--START_SECTION:navbar-->
<div align="center">
  <a href="README.md">🇺🇸 English</a> | <a href="locales/README.de.md">🇩🇪 Deutsch</a> | <a href="locales/README.es.md">🇪🇸 Español</a> | <a href="locales/README.fr.md">🇫🇷 Français</a> | <a href="locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="locales/README.ja.md">🇯🇵 日本語</a> | <a href="locales/README.ko.md">🇰🇷 한국어</a> | <a href="locales/README.pt.md">🇵🇹 Português</a> | <a href="locales/README.ru.md">🇷🇺 Русский</a> | <a href="locales/README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

---
> [!IMPORTANT]
> 我们正为本计划寻找译者。\
> 欢迎你的热情相助。\
> 如果乐意帮忙，请见 https://github.com/anmol098/waka-readme-stats/issues/23 议题！

# 带额外特色标志的自述页开发统计数据 🎌

![项目预览](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![项目预览](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨炫酷自述统计</h3>
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
   你是早鸟 🐤 还是夜猫 🦉？
   <br/>
   白天什么时候最有干劲？
   <br/>
   你写的代码是什么语言？
   <br/>
   把它们在你的自述文件里展示出来吧！
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">反馈漏洞</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">请求功能</a>
  </p>

## 准备工作

1. 向 markdown（`.md`）文件中插入两行注释。可以参考[这里](#更新你的自述文件)的更新方法。
2. 你需要一个 WakaTime API 密钥。它可以在 WakaTime 账号设置中获取。
    - 如果你第一次用 WakaTime，你可以翻到[这里](#初入-wakatime)了解更多。
3. 如果你要通过 Action 获取 commit 数据，则应当在[这里](https://github.com/settings/tokens)创建 Github 的 `repo` 与 `user` API 令牌。
   - 你可以参考[这个](#用户页面)示例更好了解这些。

> [!NOTE]
> 启用 `repo` 范围虽然看起来**很危险**，\
> 但是这个 Github Action 只会获取你的 commit 时间戳和你在仓库里改动的代码行数。

4. 你需要将 WakaTime API 密钥和 Github API 令牌保存在仓库秘密设置中。
  确保你按如下格式保存：
    - WakaTime API 密钥，格式为 `WAKATIME_API_KEY=<你的 wakatime API 密钥>`
    - Github 个人访问令牌（PAT），格式为 `GH_TOKEN=<你的 Github 访问令牌>`
5. 根据你的需要显示或隐藏标志。

这个 Github Action 可以通过 `cron` 表达式设置为任何时间点。见 [Crontab.guru](https://crontab.guru/) 和[这个网站](https://crontab.cronhub.io/)生成 `cron` 表达式。

## 更新你的自述文件

像这样，把两行注释加入你的 `README.md` 文件中：

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` 可以换成任何 `SECTION_NAME` 标志中设置的字符串，使得它们可以单独显示[可用的标志](#可用标志)。

这几行文本就是我们着手添加开发统计的入口。

## 初入 WakaTime

WakaTime 可以帮你统计出你投身代码的时间长度。这可以帮你提高工作效率，增强竞争优势。

- 前往 <https://wakatime.com>，创建一个账户。
- 从 [WakaTime 账户设置](https://wakatime.com/settings/account)中获取你的 WakaTime API 密钥。
- 在你的编辑器 / 集成开发环境（IDE）中安装 [WakaTime 插件](https://wakatime.com/plugins)。
- 填入你的 API 密钥即可开始分析。

### 用户页面

你需要获取 `repo` 与 `user` 范围的 [Github 访问令牌](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)，在仓库秘密界面以 `GH_TOKEN = <你的 Github 访问令牌>` 的格式保存。

如下是一份运行用的示例工作流文件：

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

- 现在你就可以提交 commit，等它自动运行。你也可以手动触发查看结果。只需前往仓库的 `Actions` 部分，选择 `自述页开发统计` 工作流，点击 `Run workflow`，等待一两分钟即可看到变化。

## 额外内容

如果你想要往统计页面中加入其他信息，可以在工作流文件中加入多个 `FLAGS`。默认启用所有标志（除了代码改动行数，它对性能有较大影响）。

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### 可用标志

---

`LOCALE` 标志可以按你的语言显示统计数据。默认为英语。标志变量中需填入本地化[语言键缩写](https://saimana.com/list-of-country-locale-code/)。最终结果示例可以在[这里](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)找到。

`SCTION_NAME` 标志可以设置成任意字符串，是自述文件中替换部分的名称。

`COMMIT_BY_ME` 标志设置为 `True` 时会以你的名称与邮箱提交 commit。

`COMMIT_MESSAGE` 标志可以设置 commit 的附言。默认为“更新开发数据统计（Update with Dev Metrics）”。

`COMMIT_USERNAME` 标志决定了提交 commit 的用户名称。默认为“readme-bot”。

`COMMIT_EMAIL` 标志决定了提交 commit 的邮箱地址。默认为“41898282+github-actions[bot]@users.noreply.github.com”。

`SHOW_UPDATED_DATE` 标志设置为 `True` 时，展示图表的最后更新日期。

`UPDATED_DATE_FORMAT` 标志决定了更新日期的格式。默认为 `"%d/%m/%Y %H:%M:%S"`。

`SHOW_LINES_OF_CODE` 设置为 `True` 时，会显示截止今日的代码贡献行数。

![代码贡献行数](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` 标志设置为 `False` 时，可隐藏*编程时长统计*。

![编程时长统计](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` 标志设置为 `False` 时，可隐藏**资料页浏览量统计**。

![资料页浏览量统计](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` 标志设置为 `False` 时，可隐藏提交 commit 统计。

**我是早鸟 🐤** 

```text
🌞 早晨       95 次提交      ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 白天       78 次提交      ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 晚上       112 次提交     █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 夜间       26 次提交      ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` 标志设置为 `False` 时，可隐藏一周内每日 commit 量情况。

📅 **我周日时干劲最足** 

```text
周一         50 次提交      ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
周二         85 次提交      █████░░░░░░░░░░░░░░░░░░░░   22.43% 
周三         56 次提交      ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
周四         44 次提交      ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
周五         28 次提交      █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
周六         30 次提交      ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
周日         86 次提交      █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` 标志设置为 `False` 时，可隐藏你的编程语言使用情况。

```text
💬 语言：
JavaScript               5 时 26 分          ███████████████░░░░░░░░░░   61.97%
PHP                      1 时 35 分          ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 时 9 分           ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 分               █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 分                ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` 标志设置为 `False` 时，可隐藏你的系统使用情况。

```text
💻 操作系统：
Windows                  8 时 46 分          █████████████████████████   100.0%
```

`SHOW_PROJECTS` 标志设置为 `False` 时，可隐藏你正在研究的项目。

```text
🐱‍💻 项目：
ctx_connector            4 时 3 分           ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 时 31 分          ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 时 12 分          ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 分               ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 分               ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` 标志设置为 `False` 时，可隐藏你所处的时区。

```text
⌚︎ 时区：Asia/Calcutta
```

`SHOW_EDITORS` 标志设置为 `False` 时，可隐藏编辑器/集成开发环境（IDE）的使用情况。

```text
🔥 编辑器：
WebStorm                 6 时 47 分          ███████████████████░░░░░░   77.43%
PhpStorm                 1 时 35 分          ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 分               █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` 标志设置为 `False` 时，可隐藏不同编程语言与框架在各个仓库中的占比显示。

**我更常编写 Vue 代码** 

```text
Vue          8 个仓库        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 个仓库        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 个仓库        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 个仓库        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 个仓库        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 个仓库        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 个仓库        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO` 标志设置为 `False` 时可以隐藏用户的概述信息。

> [!NOTE]
> 该部分需要 `user` 范围的个人访问令牌（PAT），否则这里的数据不会正确显示。

**🐱 我的 Github 数据** 

> 🏆 在 2020 年贡献了 433 次
 > 
> 📦 使用了 292.3 kB GitHub 存储空间
 > 
> 💼 开放招聘
 > 
> 📜 25 个公开仓库
 > 
> 🔑 15 个私有仓库

`SHOW_LOC_CHART` 标志设置为 `False` 时，会隐藏不同年份不同季度的代码贡献行数。

`IGNORED_REPO` 标志可以设置为 `"waka-readme-stats, my-first-repo"`（仅为示例），去除你不想计入的仓库。

如果你用诸如 [wakapi](https://github.com/muety/wakapi) 等服务器自托管了兼容 wakatime 的服务，你可以设置 `WAKATIME_API_URL` 标志进行 API 对接。只需将链接按这样的格式填写即可： `https://your-own-wakapi.dev/api/`。

`SYMBOL_VERSION` 标志可以改变进度条的样式（默认为 `1`）。

|  版本   |   填充格   |    空格     |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING` 标志可以让 Github Action 的日志更长，默认情况下与内部运行调试设置同步。
`BADGE_STYLE` 标志决定了生成徽章的样式，可以设置为 `flat`, `flat-square`、`plastic`、`for-the-badge` 或者 `social`。
|    徽章样式    |                                             预览                                               |
| ----------------- | ------------------------------------------------------------------------------------------------- |
|       `flat`      | ![`flat` 徽章风格](https://img.shields.io/badge/Badge-Style-blue?style=flat)                   |
|   `flat-square`   | ![`flat-square` 徽章风格](https://img.shields.io/badge/Badge-Style-blue?style=flat-square)     |
|     `plastic`     | ![`plastic` 徽章风格](https://img.shields.io/badge/Badge-Style-blue?style=plastic)             |
|  `for-the-badge`  | ![`for-the-badge` 徽章风格](https://img.shields.io/badge/Badge-Style-blue?style=for-the-badge) |
|      `social`     | ![`social` 徽章风格](https://img.shields.io/badge/Badge-Style-blue?style=social)               |

**时间线**

![时间线表](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png) 

## :sparkling_heart: 支持项目

我尽可能开源我所创造的代码，并积极回复那些使用本项目时遇到问题的网友。
这得花上不少时间。享受这样的服务不用花一分钱。

如果你正在使用这个项目，觉得开心或想鼓励我创造更多好东西，你可以这样帮我：——

- 在你的自述文件上使用这个 Action，附上合适的署名，并贴上相关链接 :D
- 点亮星星，分享项目 :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - 你可以用 PayPal 进行单次捐赠。我会用它买点~~靓啤~~红酒 🍷 的。

谢谢！:heart:

---

# 贡献

欢迎你的贡献 ♥!

想到了什么新功能，或者想帮助我们进行测试？可以通过拉取请求和议题功帮我们把项目变得更好。

# 特定贡献者

1. [Anmol Pratap Singh](https://github.com/anmol098)：维护者
2. [Alexander Sergeev](https://github.com/pseusys)：维护者
3. [DataBoySu](https://github.com/DataBoySu)：维护者
4. [okcoder1](https://github.com/ok-coder1)：维护者
5. [Aravind V. Nair](https://github.com/aravindvnair99)：维护者
6. [Prabhat Singh](https://github.com/prabhatdev)：贡献了代码时间线图表 [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev)：贡献了合并请求 [#34](https://github.com/anmol098/waka-readme-stats/pull/34) and [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas)：贡献了合并请求 [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7)：贡献了合并请求 [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234)：贡献了合并请求 [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe)：贡献了合并请求 [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1)：添加了自然语言文本的翻译支持 [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

<details>

<summary>特别鸣谢这些装点了他们的资料页的用户们 :smile: :tada:</summary>

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

- 你也是！如果你正在使用它且未上榜，可以通过[特殊提及](https://github.com/anmol098/waka-readme-stats/issues/new/choose)议题告诉我！:blush: \
  我们很乐意让你上榜。

以 :heart: 与 Python 🐍 制作。

# 启发自

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### **漫天星辰** ⭐ 从你开始 ♥.

## 实时星星统计表

[![实时星星统计表](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)
