<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANTE]
> Estamos em busca de tradutores para este projeto.
> Qualquer tipo de ajuda será muito apreciada.
> Por favor, consulte o issue [aqui](https://github.com/anmol098/waka-readme-stats/issues/23) se desejar contribuir!

# Métricas de Desenvolvimento no README com recursos adicionais habilitados 🎌

![Pré-visualização do Projeto](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

# 📌✨ Estatísticas Incríveis do README

----

<p align="center">
   <img src="https://img.shields.io/badge/linguagem-Python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=Se+útil&style=flat&color=BC4E99" alt="Badge de Estrelas"/>
</p>

<p align="center">
   Você é uma gaivota matinal 🐤 ou uma coruja noturna 🦉?
   <br/>
   Em que horário do dia você é mais produtivo?
   <br/>
   Quais são as linguagens de programação que você usa?
   <br/>
   Vamos descobrir no seu README de perfil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Relatar Erro</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Solicitar Funcionalidade</a>
</p>

## Trabalho Prévio

1. Você precisa atualizar o arquivo Markdown (`.md`) com 2 comentários. Consulte [aqui](#update-your-readme) para instruções de atualização.
2. Você exigirá uma Chave de API do WakaTime. Você pode obter essa chave em suas Configurações da Conta do WakaTime.
   - Consulte [aqui](#new-to-wakatime) se você for novo no WakaTime.
3. Você precisará de um Token de API do GitHub com escopo `repo` e `user` a partir de [aqui](https://github.com/settings/tokens) se você estiver executando a ação para obter métricas de commit.
   - Utilize [este exemplo](#profile-repository) para configurá-lo.

> [!NOTA]
> Habilitar o escopo `repo` pode ser **PERIGOSO**,
> pois esta ação do GitHub apenas acessa os carimbos de data e hora dos commits e o número de linhas de código adicionadas ou excluídas nos repositórios aos quais você contribuiu.

1. Salve a Chave de API do WakaTime e o Token de Acesso Pessoal do GitHub (PAT) como segredos do repositório. Você pode encontrá-los nas Configurações do seu repositório.
   - Certifique-se de salvá-los da seguinte forma:
     - Chave de API do WakaTime como `WAKATIME_API_KEY=<sua chave de API do WakaTime>`
     - Token de Acesso Pessoal do GitHub (PAT) como `GH_TOKEN=<seu token de acesso do GitHub>`
2. Você pode ativar e desativar bandeiras de recurso com base em suas necessidades.

Esta ação do GitHub pode ser agendada para ser executada a qualquer momento desejado utilizando `cron`. Consulte [Crontab.guru](https://crontab.guru/) e [este](https://crontab.cronhub.io/) site para gerar expressões `cron`.

## Atualize o seu Readme

Adicione um comentário ao seu `README.md` da seguinte forma:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

O `waka` pode ser substituído por qualquer string especificada na bandeira `SECTION_NAME`, conforme descrito na seção [bandeiras disponíveis](#flags-disponíveis).

Estas linhas serão nossos pontos de entrada para as métricas de desenvolvimento.

## Novos no WakaTime

O WakaTime oferece uma visão clara do tempo realmente gasto na codificação, auxiliando no aumento da produtividade e na vantagem competitiva.

- Acesse **<https://wakatime.com>** e crie uma conta.
- Obtenha sua Chave de API do WakaTime em suas **[Configurações da Conta no WakaTime](https://wakatime.com/settings/account)**.
- Instale o **[Plugin WakaTime](https://wakatime.com/plugins)** em seu editor ou IDE preferido.
- Cole sua Chave de API para iniciar a análise.

### Repositório de Perfil

Você precisará obter um [Token de Acesso do GitHub](https://docs.github.com/en/actions/configurando-e-gerenciando-fluxos-de-trabalho/autenticando-com-o-token-do-github) com escopo `repo` e `user` e salvá-lo nos Segredos do Repositório `GH_TOKEN = <Seu Token de Acesso do GitHub>`

Aqui está um arquivo de fluxo de trabalho de exemplo para executá-lo:

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

- Agora você pode fazer o commit e aguardar a execução automática, ou também pode acionar manualmente para ver o resultado imediatamente. Basta ir para a seção `Ações` no seu repositório, selecionar o fluxo de trabalho `Perfil Readme Development Stats` e clicar em `Executar fluxo de trabalho`. Aguarde por um minuto ou dois e você verá as mudanças aplicadas.

## Extras

Se você deseja adicionar outras informações às suas estatísticas, pode incluir múltiplos `FLAGS` no arquivo de workflow. Por padrão, todas as bandeiras são ativadas (exceto a bandeira de linhas de código devido à operação pesada realizada).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Flags Disponíveis

---

`LOCALE` Esta bandeira pode ser utilizada para exibir as estatísticas no seu idioma. O padrão é o inglês. Códigos de localização abreviados [disponíveis aqui](https://saimana.com/list-of-country-locale-code/) para serem passados na variável da bandeira. Exemplo do resultado final pode ser encontrado [aqui](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

A bandeira `SECTION_NAME` pode ser definida como qualquer string, e será o nome da seção a ser substituída no README.

A bandeira `COMMIT_BY_ME` pode ser definida como `True` para realizar o commit do código com o seu nome e e-mail.

A bandeira `COMMIT_MESSAGE` pode ser definida para a mensagem do commit. O padrão é "Atualizado com Métricas de Desenvolvimento".

A bandeira `COMMIT_USERNAME` pode ser definida como um nome de usuário para realizar o commit do código. O padrão é "readme-bot".

A bandeira `COMMIT_EMAIL` pode ser definida para um e-mail para realizar o commit do código. O padrão é "41898282+github-actions[bot]@users.noreply.github.com".

A bandeira `SHOW_UPDATED_DATE` pode ser definida como `True` para exibir a data de atualização no final do parágrafo.

A bandeira `UPDATED_DATE_FORMAT` pode ser definida para formatar a data de atualização. O padrão é `"%d/%m/%Y %H:%M:%S"`.

A bandeira `SHOW_LINES_OF_CODE` pode ser definida como `True` para exibir o número de linhas de código escritas até a data.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

A flag `SHOW_TOTAL_CODE_TIME` pode ser definida como `False` para ocultar o *Tempo de Código*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

A flag `SHOW_PROFILE_VIEWS` pode ser definida como `False` para ocultar **Visualizações de Perfil**.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

A flag `SHOW_COMMIT` pode ser definida como `False` para ocultar as estatísticas de commit.

**Sou um pássaro precoce 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

A flag `SHOW_DAYS_OF_WEEK` pode ser definida como `False` para ocultar os commits feitos nos diferentes dias da semana.

📅 **Eu sou mais produtivo(a) aos domingos**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

A bandeira `SHOW_LANGUAGE` pode ser definida como `False` para ocultar as linguagens de programação que você utiliza.

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

A bandeira `SHOW_PROJECTS` pode ser definida como `False` para ocultar os projetos nos quais foi trabalhado.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

A bandeira `SHOW_TIMEZONE` pode ser definida como `False` para ocultar a zona horária em que você está.

```text
⌚︎ Timezone: Asia/Calcutta
```

A bandeira `SHOW_EDITORS` pode ser definida como `False` para ocultar a lista de editores de código/IDEs utilizados.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

A flag `SHOW_LANGUAGE_PER_REPO` pode ser definida como `False` para ocultar o número de repositórios em diferentes linguagens de programação e frameworks.

**Eu programo principalmente em Vue**

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

**🐱 My GitHub Data**

> 🏆 433 Contributions in year 2020
 >
> 📦 Used 292.3 kB in GitHub's Storage
 >
> 💼 Opted to Hire
 >
> 📜 25 Public Repository
 >
> 🔑 15 Owned Private Repository

The `SHOW_LOC_CHART` flag can be set to `False` to hide the lines of code written in different quarters of different years.

The `IGNORED_REPOS` flag can be set to `"waka-readme-stats, my-first-repo"` (just an example) to ignore some repos you don’t want to be counted.

The `SYMBOL_VERSION` flag can be set for the symbol for the progress bar (default: `1`).

| Version | Done block | Empty block |
|-------- | ---------- | ----------- |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

The `DEBUG_LOGGING` flag can be set to increase the GitHub Action's output verbosity, by default equals internal runner debug property

**Timeline**

![Chart not found](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :coração_explodindo: Apoie o projeto

Eu disponibilizo quase tudo o que posso em código aberto e me esforço para responder a todas as pessoas que precisam de ajuda usando esses projetos. Obviamente, isso leva tempo. Você pode usar este serviço gratuitamente.

No entanto, se você estiver utilizando este projeto e estiver satisfeito com ele ou simplesmente quiser me incentivar a continuar criando coisas, existem algumas maneiras de fazer isso:

- Dando o devido crédito quando usar esta ação no seu README, linkando de volta a ela :D
- Estrelando e compartilhando o projeto :foguete:
- **[Doar via PayPal](https://www.paypal.me/aapreneur)** - Você pode fazer doações únicas via PayPal. Provavelmente comprarei algumas ~~cervejas~~ vinhos 🍷.

Obrigado! :coração:

# Contribuição

Contribuições são bem-vindas ♥! Por favor, compartilhe quaisquer recursos e adicione testes unitários! Utilize os sistemas de solicitação de puxar (pull request) e de problemas (issue) para contribuir.

# Contribuidores Selecionados

1. [Anmol Pratap Singh](https://github.com/anmol098): Mantenedor
2. [Alexander Sergeev](https://github.com/pseusys): Mantenedor
3. [Aravind V. Nair](https://github.com/aravindvnair99): Mantenedor
4. [Prabhat Singh](https://github.com/prabhatdev): Para o gráfico de linha de código [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Para as Pull Requests [#34](https://github.com/anmol098/waka-readme-stats/pull/34) e [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Para a Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Para a Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Para a Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Para a Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): Por adicionar suporte para escrita de frases naturais para tradução [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- E você! Se estiver usando-o neste exato momento e não estiver na lista, por favor, nos informe enviando um [Mencão Especial](https://github.com/anmol098/waka-readme-stats/issues/new/choose)! :blush:
  Ficaremos felizes em adicioná-lo à lista.

Feito com :heart: e Python 🐍.

# Inspirado em

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists)
>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Este projeto precisa de um **estrela** ⭐ de você ♥

## Observadores ao longo do tempo

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

