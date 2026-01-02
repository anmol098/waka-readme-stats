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

# Métricas de Dev no README com bandeiras de recurso adicionadas 🎌

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
   Você é um 🐤 de manhã ou um 🦉 da noite?
   <br/>
   Quando você é mais produtivo durante o dia?
   <br/>
   Quais são os idiomas que você programa?
   <br/>
   Vamos verificar no README do seu perfil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Reportar Bug</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Solicitar Funcionalidade</a>
  </p>

## Trabalho de Preparação

1. Você precisa atualizar o arquivo markdown(`.md`) com 2 comentários. Você pode se referir [aqui](#update-your-readme) para atualizá-lo.
2. Você precisará de uma chave de API WakaTime. Você pode obtê-la nas Configurações da Conta WakaTime
    - Você pode se referir [aqui](#new-to-wakatime), se for novo no WakaTime.
3. Você precisará de um token de API do GitHub com escopo `repo` e `user` de [aqui](https://github.com/settings/tokens) se estiver executando a ação para obter métricas de commit.
   - Você pode usar [este](#profile-repository) exemplo para trabalhar nisso.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. Você precisa salvar a chave da API WakaTime e o token de acesso pessoal (PAT) do GitHub nos segredos do repositório. Você pode encontrá-los nas Configurações do seu repositório. \
  Certifique-se de salvá-los da seguinte forma:
    - Chave da API WakaTime como `WAKATIME_API_KEY=<sua chave da API WakaTime>`
    - Token de Acesso Pessoal (PAT) do GitHub como `GH_TOKEN=<seu token de acesso do github>`
5. Você pode habilitar e desabilitar bandeiras de recurso com base em suas necessidades.

Esta ação do GitHub pode ser configurada para executar em qualquer momento que você quiser usando `cron`. Veja [Crontab.guru](https://crontab.guru/) e [este](https://crontab.cronhub.io/) site para gerar expressões `cron`.

## Atualize seu Readme

Adicione um comentário ao seu `README.md` assim:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` pode ser substituído por qualquer string especificada na bandeira `SECTION_NAME` conforme [a seção de bandeiras disponível](#flags-available).

Essas linhas serão nossos pontos de entrada para as métricas de dev.

## Novo para WakaTime

WakaTime fornece uma ideia do tempo realmente gasto em codificação. Isso ajuda você a aumentar sua produtividade e vantagem competitiva.

- Vá para <https://wakatime.com> e crie uma conta.
- Obtenha sua chave de API WakaTime nas [Configurações da Conta no WakaTime](https://wakatime.com/settings/account).
- Instale o [plugin WakaTime](https://wakatime.com/plugins) em seu editor / IDE favorito.
- Cole sua chave de API para iniciar a análise.

### Repositório de Perfil

Você precisará obter um [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) com um escopo `repo` e `user` e salvá-lo nas Secrets do Repositório `GH_TOKEN = <Your GitHub Access Token>`

Aqui está um exemplo de arquivo de workflow para executá-lo:

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

- Agora você pode commitar e aguardar que ele execute automaticamente, ou também pode disparar para executar agora e ver o resultado. Basta ir até a `Actions` no seu repositório, selecione seu workflow `Profile Readme Development Stats` e clique em `Run workflow`. Agora aguarde um ou dois minutos e você verá suas alterações.

## Extras

Se você quiser adicionar outras informações aos seus stats, você pode adicionar múltiplos `FLAGS` no seu arquivo de workflow. Por padrão, todos os flags estão habilitados (exceto o flag de linhas de código devido à operação pesada realizada)

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Flags Available

---

`LOCALE`  Esta bandeira pode ser usada para mostrar estatísticas no seu idioma. O padrão é inglês. O código de localização [Abreviação](https://saimana.com/list-of-country-locale-code/) deve ser passado na variável da bandeira. Um exemplo do resultado final pode ser encontrado [aqui](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

A bandeira `SECTION_NAME` pode ser definida como qualquer string e será o nome da seção para substituir no README.

A bandeira `COMMIT_BY_ME` pode ser definida como `True` para commitar o código usando seu nome e e-mail.

A bandeira `COMMIT_MESSAGE` pode ser definida para a mensagem do commit. O padrão é "Atualizado com Dev Metrics"

A bandeira `COMMIT_USERNAME` pode ser definida como um nome de usuário para commitar o código. O padrão é "readme-bot".

A bandeira `COMMIT_EMAIL` pode ser definida como um e-mail para commitar o código. O padrão é "41898282+github-actions[bot]@users.noreply.github.com".

A bandeira `SHOW_UPDATED_DATE` pode ser definida como `True` para mostrar a data de atualização no final do parágrafo.

A bandeira `UPDATED_DATE_FORMAT` pode ser definida para colocar a data de atualização em um formato. O padrão é `"%d/%m/%Y %H:%M:%S"`.

A bandeira `SHOW_LINES_OF_CODE` pode ser definida como `True` para mostrar o número de linhas de código escritas até hoje.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

A bandeira `SHOW_TOTAL_CODE_TIME` pode ser definida como `False` para ocultar *Code Time*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

A bandeira `SHOW_PROFILE_VIEWS` pode ser definida como `False` para ocultar **Profile Views**

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

A bandeira `SHOW_COMMIT` pode ser definida como `False` para ocultar as estatísticas de commit.

**Sou um iniciante 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

O sinalizador `SHOW_DAYS_OF_WEEK` pode ser definido como `False` para ocultar as contribuições feitas nos diferentes dias da semana.

📅 **Estou Mais Produtivo nos Domingos**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

A bandeira `SHOW_LANGUAGE` pode ser definida como `False` para ocultar os idiomas de programação que você usa.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

A bandeira `SHOW_OS` pode ser definida como `False` para ocultar os detalhes do seu sistema operacional.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

A bandeira `SHOW_PROJECTS` pode ser definida como `False` para ocultar os projetos trabalhados.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

A bandeira `SHOW_TIMEZONE` pode ser definida como `False` para ocultar o fuso horário no qual você está.

```text
⌚︎ Timezone: Asia/Calcutta
```

A bandeira `SHOW_EDITORS` pode ser definida como `False` para ocultar a lista de editores de código/IDEs usados.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

A bandeira `SHOW_LANGUAGE_PER_REPO` pode ser definida como `False` para ocultar o número de repositórios em diferentes linguagens de programação e frameworks.

**Eu principalmente codifico em Vue**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

A bandeira `SHOW_SHORT_INFO` pode ser definida como `False` para ocultar a informação curta e divertida de um usuário.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 Meus Dados do GitHub**

> 🏆 433 Contribuições no ano de 2020
 >
> 📦 Usou 292.3 kB no armazenamento do GitHub
 >
> 💼 Optou por Contratar
 >
> 📜 25 Repositórios Públicos
 >
> 🔑 15 Repositórios Privados Proprietários

A bandeira `SHOW_LOC_CHART` pode ser definida como `False` para ocultar as linhas de código escritas em diferentes trimestres de diferentes anos.

A bandeira `IGNORED_REPOS` pode ser definida como `"waka-readme-stats, my-first-repo"` (apenas um exemplo) para ignorar alguns repositórios que você não deseja que sejam contados.

A bandeira `SYMBOL_VERSION` pode ser definida para o símbolo da barra de progresso (padrão: `1`).

| Versão | Bloco concluído | Bloco vazio |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

A bandeira `DEBUG_LOGGING` pode ser definida para aumentar a verbosidade da saída da Ação do GitHub, por padrão igual à propriedade de depuração do executor interno

**Linha do Tempo**

![Gráfico não encontrado](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Apoie o projeto

Eu open-source quase tudo que posso, e tento responder a todos que precisam de ajuda usando esses projetos. Obviamente,
isso leva tempo. Você pode usar esse serviço gratuitamente.

No entanto, se você está usando esse projeto e está feliz com ele ou apenas quer me incentivar a continuar criando coisas, há algumas formas que você pode fazer isso :-

- Dando o devido crédito quando usar essa ação no seu readme, vinculando de volta a ele :D
- Estrelando e compartilhando o projeto :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Você pode fazer doações únicas via PayPal. Eu provavelmente comprarei algum ~~cerveja~~ vinho 🍷.

Obrigado! :heart:

# Contribuindo

Contribuições são bem-vindas ♥! Por favor, compartilhe quaisquer funcionalidades e adicione testes unitários! Use os sistemas de pull request e de issues para contribuir.

# Contribuidores Selecionados

1. [Anmol Pratap Singh](https://github.com/anmol098): Mantenedor
2. [Alexander Sergeev](https://github.com/pseusys): Mantenedor
3. [DataBoySu](https://github.com/DataBoySu): Mantenedor
4. [okcoder1](https://github.com/ok-coder1): Mantenedor
5. [Aravind V. Nair](https://github.com/aravindvnair99): Mantenedor
6. [Prabhat Singh](https://github.com/prabhatdev): Por gráfico de linha do tempo do código [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Por Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) e [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): Por Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): Por Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): Por Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): Por Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): Por adicionar suporte para escrita de frase natural para tradução [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- E você! Se estiver usando ele agora e não estiver na lista, por favor nos avise criando um [Special Mention](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue! :blush: \
  Estaremos felizes em adicionar você na lista.

Feito com :heart: e Python 🐍.

# Inspirado em

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Este projeto precisa de uma **estrela** ⭐ de você ♥

## Stargazers ao longo do tempo

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

