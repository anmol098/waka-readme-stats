<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANTE]
> Estamos em busca de tradutores para este projeto.
> Qualquer tipo de ajuda será muito bem-vinda.
> Por favor, consulte o issue [https://github.com/anmol098/waka-readme-stats/issues/23](https://github.com/anmol098/waka-readme-stats/issues/23) se desejar contribuir!

# Métricas de Desenvolvimento no README com recursos adicionais 🌟

![Pré-visualização do Projeto](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Pré-visualização do Projeto](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨ Estatísticas Incríveis do README</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/linguagem-Python-blue?style=for-the-badge" />
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=Se+ajudar&style=flat&color=BC4E99" alt="Badge de Estrelas" />
</p>

<p align="center">
   Você é um pássaro da manhã ou uma coruja da noite?
   <br/>
   Em que horário do dia você é mais produtivo?
   <br/>
   Quais são as linguagens de programação que você usa?
   <br/>
   Vamos descobrir no seu README de perfil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Relatar Bug</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Solicitar Recurso</a>
  </p>

## Preparação Inicial

1. **Atualize o arquivo Markdown (.md)**: Adicione dois comentários ao arquivo, conforme orientado [aqui](#update-your-readme).
2. **Obtenha uma Chave de API do WakaTime**: Acesse sua conta do WakaTime e obtenha a Chave de API. Para novos usuários, consulte [aqui](#new-to-wakatime).
3. **Crie um Token de Acesso do GitHub**: Gere um token de acesso com escopo `repo` e `user` na página de tokens do GitHub [aqui](https://github.com/settings/tokens). Utilize o exemplo [deste](#profile-repository) guia para facilitar o processo.

> **NOTA**: O escopo `repo` pode ser **PERIGOSO**. Esta ação do GitHub apenas acessa os carimbos de data e hora dos commits e o número de linhas de código adicionadas ou excluídas nos repositórios aos quais você contribuiu.

1. **Salve as Chaves de API e o Token de Acesso no Repositório**: Adicione as seguintes variáveis de ambiente no repositório:
    - Chave de API do WakaTime: `WAKATIME_API_KEY=<sua chave de API do WakaTime>`
    - Token de Acesso Pessoal do GitHub (PAT): `GH_TOKEN=<seu token de acesso>`
2. **Ative e desative bandeiras de recursos conforme necessário**.

A ação do GitHub pode ser agendada para execução em momentos específicos utilizando `cron`. Consulte [Crontab.guru](https://crontab.guru/) e [este](https://crontab.cronhub.io/) site para gerar expressões `cron`.

## Update your Readme

Add a comment to your `README.md` like this:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

O `waka` pode ser substituído por qualquer string especificada na bandeira `SECTION_NAME`, conforme descrito na seção [bandeiras disponíveis](#flags-disponíveis).

Estas linhas serão nossos pontos de entrada para as métricas de desenvolvimento.

## Novo no WakaTime

O WakaTime oferece uma visão clara do tempo real que você dedicou à codificação. Isso ajuda a aumentar sua produtividade e vantagem competitiva.

- Acesse **<https://wakatime.com>** e crie uma conta.
- Obtenha sua Chave de API WakaTime nas [Configurações da Conta no WakaTime](https://wakatime.com/settings/account).
- Instale o plugin WakaTime em seu editor ou IDE favorito.
- Cole sua Chave de API para iniciar a análise.

### Perfil do Repositório

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

- Agora você pode fazer o commit e aguardar a execução automática, ou também pode acionar manualmente para ver o resultado imediatamente. Basta ir para a seção `Ações` no seu repositório, selecionar o fluxo de trabalho `Profile Readme Development Stats` e clicar em `Executar fluxo de trabalho`. Aguarde um minuto ou dois e você verá as mudanças aplicadas.

## Extras

Se você deseja adicionar outras informações às suas estatísticas, pode incluir vários `FLAGS` no arquivo de workflow. Por padrão, todas as bandeiras são ativadas (exceto a bandeira de linhas de código devido à operação pesada realizada).

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

`LOCALE` Esta flag pode ser utilizada para exibir as estatísticas no seu idioma. O padrão é o inglês. [Código de Localização](https://saimana.com/list-of-country-locale-code/) a ser passado na variável da flag. Exemplo do resultado final pode ser encontrado [aqui](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

A flag `SECTION_NAME` pode ser definida como qualquer string, e será o nome da seção a ser substituída no README.

A flag `COMMIT_BY_ME` pode ser definida como `True` para realizar o commit do código com o seu nome e e-mail.

A flag `COMMIT_MESSAGE` pode ser personalizada para a mensagem de commit. O padrão é "Atualizado com Métricas de Desenvolvimento".

A flag `COMMIT_USERNAME` pode ser definida como um nome de usuário para realizar o commit do código. O padrão é "readme-bot".

A flag `COMMIT_EMAIL` pode ser definida para um e-mail para realizar o commit do código. O padrão é "41898282+github-actions[bot]@users.noreply.github.com".

A flag `SHOW_UPDATED_DATE` pode ser definida como `True` para exibir a data de atualização no final do parágrafo.

A flag `UPDATED_DATE_FORMAT` pode ser definida para formatar a data de atualização. O padrão é `"%d/%m/%Y %H:%M:%S"`.

A flag `SHOW_LINES_OF_CODE` pode ser definida como `True` para exibir o número de linhas de código escritas até a data.

![Linhas de Código](https://img.shields.io/badge/De%20Olá%20Mundo%20Eu%20escrevi-1,3%20milhões%20de%20linhas%20de%20código-blue)

A flag `SHOW_TOTAL_CODE_TIME` pode ser definida como `False` para ocultar *Tempo de Código*.

![Tempo de Código](http://img.shields.io/badge/Tempo%20de%20Código-1%2C438%20hrs%2054%20mins-blue)

A flag `SHOW_PROFILE_VIEWS` pode ser definida como `False` para ocultar **Visualizações de Perfil**.

![Visualizações de Perfil](http://img.shields.io/badge/Visualizações%20de%20Perfil-2189-blue)

A flag `SHOW_COMMIT` pode ser definida como `False` para ocultar as estatísticas de commit.

**Sou um pássaro precoce 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

A flag `SHOW_DAYS_OF_WEEK` pode ser configurada para `False` para ocultar os commits realizados nos diferentes dias da semana.

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

A flag `SHOW_LANGUAGE` pode ser definida como `False` para ocultar as linguagens de programação utilizadas.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

A flag `SHOW_OS` pode ser definida como `False` para ocultar os detalhes do seu sistema operacional.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

A flag `SHOW_PROJECTS` pode ser definida como `False` para ocultar os projetos em que se trabalhou.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

A flag `SHOW_TIMEZONE` pode ser definida como `False` para ocultar a zona horária em que você está.

```text
⌚︎ Timezone: Asia/Calcutta
```

A flag `SHOW_EDITORS` pode ser definida como `False` para ocultar a lista de editores/IDEs de código utilizados.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

A flag `SHOW_LANGUAGE_PER_REPO` pode ser definida como `False` para ocultar a quantidade de repositórios em diferentes linguagens de programação e frameworks.

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

Eu abro quase tudo que posso em código aberto e tento responder a todos que precisam de ajuda usando esses projetos. Obviamente, isso leva tempo. Você pode usar este serviço de graça.

No entanto, se você estiver usando este projeto e estiver satisfeito com ele ou simplesmente quiser me incentivar a continuar criando coisas, existem algumas maneiras de fazer isso:

- Dando o crédito adequado quando usar esta ação no seu README, linkando de volta a ela :D
- Estrelando e compartilhando o projeto :foguete:
- **[Doar via PayPal](https://www.paypal.me/aapreneur)** - Você pode fazer doações únicas via PayPal. Provavelmente comprarei algumas ~~cervejas~~ vinhos 🍷.

Obrigado! :coração:

# Contribuição

Contribuições são bem-vindas ♥! Por favor, compartilhe quaisquer recursos e adicione testes unitários! Utilize os sistemas de pull request e issue para contribuir.

# Contribuidores Selecionados

1. [Anmol Pratap Singh](https://github.com/anmol098): Mantenedor
2. [Alexander Sergeev](https://github.com/pseusys): Mantenedor
3. [Aravind V. Nair](https://github.com/aravindvnair99): Mantenedor
4. [Prabhat Singh](https://github.com/prabhatdev): Por gráfico de linha de código [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Por Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) e [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Por Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Por Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Por Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Por Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
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
  Teremos prazer em adicioná-lo à lista.

Feito com :heart: e Python 🐍.

# Inspirado em

> [Awesome Gists Pinados](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Este projeto precisa de um **estrela** ⭐ de você ♥

## Observadores ao longo do tempo

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

