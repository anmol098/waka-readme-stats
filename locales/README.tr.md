<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.tr.md">🇹🇷 Türkçe</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

---

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Dev Metrics in README with added feature flags 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Harika README İstatistikleri</h3>
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
   Erken bir 🐤 misin yoksa gece bir 🦉 misin?
   <br/>
   Gün içinde en üretken olduğun saatler hangileri?
   <br/>
   Hangi dillerde kod yazarsın?
   <br/>
   Profilin README'sinde bunları inceleyelim!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Hata Bildir</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Özellik Talep Et</a>
  </p>

## Hazırlık Çalışmaları

1. `.md` uzantılı markdown dosyasını 2 yorumla güncellemeniz gerekir. Bu konuda [buraya](#update-your-readme) bakabilirsiniz.
2. WakaTime API Anahtarı'na ihtiyacınız olacak. Bu anahtarı WakaTime Hesap Ayarlarınızdan alabilirsiniz
    - WakaTime'a yeniyseniz [buraya](#new-to-wakatime) bakabilirsiniz.
3. Commit metriklerini almak için eylemi çalıştırıyorsanız, [buradan](https://github.com/settings/tokens) `repo` ve `user` kapsamına sahip bir GitHub API Token'ına ihtiyacınız olacak.
   - Bunun nasıl yapılacağını görmek için [buraya](#profile-repository) örnek kullanabilirsiniz.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. WakaTime API Anahtarını ve GitHub API Token'ını depo gizli bilgilerinde kaydetmeniz gerekir. Bu, depo ayarlarınızda bulabilirsiniz. \
  Aşağıdaki şekilde bunları kaydetmekten emin olun:
    - WakaTime API Anahtarını `WAKATIME_API_KEY=<your wakatime API Key>` olarak
    - GitHub Kişisel Erişim Token'ını (PAT) `GH_TOKEN=<your github access token>` olarak
5. Gereksinimlerinize göre özellik bayraklarını etkinleştirebilir ve devre dışı bırakabilirsiniz.

Bu GitHub Eylemi, isterseniz `cron` kullanarak herhangi bir zaman da çalıştırılabilir. `cron` ifadeleri oluşturmak için [Crontab.guru](https://crontab.guru/) ve [bu](https://crontab.cronhub.io/) web sitesine bakın.

## Readme'nizi Güncelleyin

`README.md` dosyanıza şu şekilde bir yorum ekleyin:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` `SECTION_NAME` bayrağı ile belirtilen herhangi bir dize ile değiştirilebilir. Daha fazla bilgi için [mevcut bayraklar bölümüne](#flags-available) bakın.

Bu satırlar, geliştirici metriklerimiz için giriş noktalarımız olacaktır.

## WakaTime'a Yeni Misiniz

WakaTime, kodlama üzerinde gerçekten harcadığınız süreyi size gösterir. Bu, üretkenliğinizi ve rekabet avantajınızı artırmada size yardımcı olur.

- <https://wakatime.com> adresine gidin ve bir hesap oluşturun.
- WakaTime API Anahtarınıza erişmek için [WakaTime'daki Hesap Ayarlarınıza](https://wakatime.com/settings/account) gidin.
- Favori düzenleyicinizde / IDE'de [WakaTime eklentisini](https://wakatime.com/plugins) yükleyin.
- Analizi başlatmak için API anahtarınızı yapıştırın.

### Profil Depo

Bir [GitHub Erişim Tokenı](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) almanız gerekir ve `repo` ve `user` kapsamına sahip olmalıdır ve `GH_TOKEN = <Your GitHub Access Token>` Depo Gizliliklerinde kaydetmelisiniz.

Bunu çalıştırmak için örnek bir workflow Dosyası aşağıdadır:

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

- Şimdi commit yapabilir ve otomatik olarak çalışmasını bekleyebilirsiniz, ya da sonuçları hemen görmek için çalıştırma işlemini manuel olarak da tetikleyebilirsiniz. Sadece repo'nuzdaki `Actions` bölümüne gidin, `Profile Readme Development Stats` iş akışınızı seçin ve `Run workflow`'a tıklayın. Bir ya da iki dakika bekleyin ve değişikliklerinizi göreceksiniz.

## Ekstra Bilgiler

İstatistiklerinize diğer bilgileri eklemek isterseniz, iş akış dosyanıza birden fazla `FLAGS` ekleyebilirsiniz. Varsayılan olarak tüm bayraklar etkinleştirilir (satır sayısı bayrağı hariç, çünkü bu işlem yoğun bir işlemdir).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Kullanılabilir Bayraklar

---

`LOCALE`  Bu bayrak, istatistikleri kendi dilinizde göstermek için kullanılabilir. Varsayılan olarak İngilizcedir. Locale [Kısa Form](https://saimana.com/list-of-country-locale-code/) bayrak değişkenine aktarılmalıdır. Sonuçta elde edilecek örnek [burada](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md) bulunabilir.

`SECTION_NAME` bayrağı herhangi bir string olarak ayarlanabilir ve README'de değiştirilecek bölümün adı olacaktır.

`COMMIT_BY_ME` bayrağı `True` olarak ayarlanarak kodu kendi adınız ve e-posta adresinizle commit edebilirsiniz.

`COMMIT_MESSAGE` bayrağı commit mesajı için ayarlanabilir. Varsayılan "Updated with Dev Metrics" dir.

`COMMIT_USERNAME` bayrağı, kodu commit etmek için bir kullanıcı adı olarak ayarlanabilir. Varsayılan "readme-bot" dur.

`COMMIT_EMAIL` bayrağı, kodu commit etmek için bir e-posta olarak ayarlanabilir. Varsayılan "41898282+github-actions[bot]@users.noreply.github.com" dir.

`SHOW_UPDATED_DATE` bayrağı `True` olarak ayarlanarak paragrafın sonunda güncellenme tarihi gösterilebilir.

`UPDATED_DATE_FORMAT` bayrağı, güncellenme tarihini bir formatla göstermek için ayarlanabilir. Varsayılan `"%d/%m/%Y %H:%M:%S"` dir.

`SHOW_LINES_OF_CODE` bayrağı `True` olarak ayarlanarak bugüne kadar yazılan satır sayısının gösterilmesi sağlanabilir.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

`SHOW_TOTAL_CODE_TIME` bayrağı `False` olarak ayarlanarak *Code Time* gizlenebilir.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

`SHOW_PROFILE_VIEWS` bayrağı `False` olarak ayarlanarak **Profile Views** gizlenebilir.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

`SHOW_COMMIT` bayrağı `False` olarak ayarlanarak commit istatistikleri gizlenebilir.

**Ben erken bir 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK` bayrağı, haftanın farklı günlerinde yapılan değişiklikleri gizlemek için `False` olarak ayarlanabilir.

📅 **Hafta Sonu En Üretken Günüm**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE` bayrağı, kullandığınız programlama dillerini gizlemek için `False` olarak ayarlanabilir.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

`SHOW_OS` bayrağı `False` olarak ayarlanarak işletim sisteminiz hakkında detaylar gizlenebilir.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` bayrağı, çalışılan projeleri gizlemek için `False` olarak ayarlanabilir.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` bayrağı, bulunduğunuz zaman dilimini gizlemek için `False` olarak ayarlanabilir.

```text
⌚︎ Timezone: Asia/Calcutta
```

`SHOW_EDITORS` bayrağı, kod editörleri/IDE'lerin listesini gizlemek için `False` olarak ayarlanabilir.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO` bayrağı, farklı programlama dilleri ve çerçevelerdeki depo sayısını gizlemek için `False` olarak ayarlanabilir.

**Vue'de çoğunlukla kod yazıyorum**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO` bayrağı, bir kullanıcının kısa eğlenceli bilgi bilgisini gizlemek için `False` olarak ayarlanabilir.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 GitHub Verilerim**

> 🏆 2020 Yılında 433 Katkı
 >
> 📦 GitHub Depolama Alanında 292.3 kB Kullanıldı
 >
> 💼 İşe Alım için Seçildi
 >
> 📜 25 Kamuoyu Repository
 >
> 🔑 15 Sahipli Özel Repository

`SHOW_LOC_CHART` bayrağı, farklı yılların farklı çeyreklerinde yazılan satır sayısını gizlemek için `False` olarak ayarlanabilir.

`IGNORED_REPOS` bayrağı, saymamak istediğiniz bazı reposları atlamak için `"waka-readme-stats, my-first-repo"` (sadece bir örnek) olarak ayarlanabilir.

`MAX_REPOS` bayrağı, analiz için alınan GitHub reposu sayısını sınırlamak için ayarlanabilir (varsayılan: `0` = sınırsız). Bu, birçok repo ile hesaplar için çalışmayı hızlandırabilir.

`MAX_CAP` kullanımlarını görürseniz, bu `MAX_REPOS` için eski bir takma adıdır.

`WAKATIME_API_URL` bayrağı, kendi wakatime uyumlu arka uç sunucunuzu barındırıyorsanız ayarlanabilir, örneğin [wakapi](https://github.com/muety/wakapi). Sadece temel URL'nizi sağlamanız yeterlidir, örneğin `https://your-own-wakapi.dev/api/`

`SYMBOL_VERSION` bayrağı, ilerleme çubuğu sembolü için ayarlanabilir (varsayılan: `1`).

| Sürüm | Yapılan Blok | Boş Blok |
| ------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

`DEBUG_LOGGING` bayrağı, GitHub Eylemi çıktısının yoğunluğunu artırmak için ayarlanabilir. Varsayılan, iç runner'ın hata ayıklama özelliğidir.
`BADGE_STYLE` bayrağı, oluşturulan levhaların tarzını tanımlar ve `flat`, `flat-square`, `plastic`, `for-the-badge` veya `social` olarak ayarlanabilir.
|    Levha Tarzı    | Önizleme |
| ----------------- |- |
|       `flat`      | ![Levha Tarzı `flat`](https://img.shields.io/badge/Badge-Style-blue?style=flat)                   |
|   `flat-square`   | ![Levha Tarzı `flat-square`](https://img.shields.io/badge/Badge-Style-blue?style=flat-square)     |
|     `plastic`     | ![Levha Tarzı `plastic`](https://img.shields.io/badge/Badge-Style-blue?style=plastic)             |
|  `for-the-badge`  | ![Levha Tarzı `for-the-badge`](https://img.shields.io/badge/Badge-Style-blue?style=for-the-badge) |
|      `social`     | ![Levha Tarzı `social`](https://img.shields.io/badge/Badge-Style-blue?style=social)               |

**Zaman Çizelgesi**

![Zaman Çizelgesi](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Proje destekleyin

İşlemi açık kaynaklı hale getirmeye çalışıyorum ve bu projelerle ilgili yardım isteyen herkese cevap vermeye çalışıyorum. Elbette,
bu zaman alır. Bu hizmeti ücretsiz olarak kullanabilirsiniz.

Ancak, bu projeyi kullanıyorsanız ve ondan memnunsanız veya sadece devam ederek şey yaratmamı teşvik etmek istiyorsanız, bunu yapabileceğiniz birkaç yol vardır :-

- Bu eylemi readme dosyanızda kullandığınızda uygun şekilde atıf yapın ve buraya geri dönmeyi unutmayın :D
- Projeyi yıldızla ve paylaşın :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - PayPal üzerinden tek seferlik bağışlar yapabilirsiniz. Muhtemelen bir ~~bira~~ şarap 🍷 alırım.

Teşekkürler! :heart:

# Katkıda Bulunma

Katkılar hoştur ♥!

Lütfen herhangi bir özellik paylaşın ve birim testleri ekleyin! Katkıda bulunmak için çekme istekleri ve sorun sistemlerini kullanın.

# Seçilen Katkıda Bulunanlar

1. [Anmol Pratap Singh](https://github.com/anmol098): Bakım
2. [Alexander Sergeev](https://github.com/pseusys): Bakım
3. [DataBoySu](https://github.com/DataBoySu): Bakım
4. [okcoder1](https://github.com/ok-coder1): Bakım
5. [Aravind V. Nair](https://github.com/aravindvnair99): Bakım
6. [Prabhat Singh](https://github.com/prabhatdev): Kod zaman çizelgesi grafiği için [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) ve [#23](https://github.com/anmol098/waka-readme-stats/pull/23) için
8. [Pedro Torres](https://github.com/Corfucinas): Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29) için
9. [Aaron Meese](https://github.com/ajmeese7): Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45) için
10. [Arnav Jindal](https://github.com/Daggy1234): Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48) için
11. [Daniel Rowe](https://github.com/DanRowe): Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57) için
12. [Ss5h](https://github.com/tlatkdgus1): Çeviri için doğal cümle yazımı desteği eklemek için [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- Ve sen! Eğer şu anda kullanıyorsan ve listede değilse lütfen bize bir [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) konusu göndererek bildir! :blush: \
  Listeye ekmemiz için memnuniyetle oluruz.

:heart: ve Python 🐍 ile yapıldı.

# Ilham Alan Kaynaklar

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Bu proje sizden bir **yıldız** ⭐ istiyor ♥

## Zaman içinde yıldız verenler

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

