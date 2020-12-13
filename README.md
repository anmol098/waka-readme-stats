> Buscando por Traduções em diferentes linguas & locais  [#23](https://github.com/anmol098/waka-readme-stats/issues/23)

# Métricas de Desenvolvimento no Readme com feature flags adicionáveis 🎌

![Project Preview](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">
  
  ![Project Preview](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)
  
  <h3 align="center">📌✨Incríveis Estatísticas no Readme</h3>
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
   Você é diurno 🐤 ou noturno 🦉?
   <br/>
   Quando você é mais produtivo durante o dia?
   <br/>
   Quais são as linguagens com que você programa?
   <br/>
   Vamos ver isso em seu perfil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Reporte Bug</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Solicite Funcionalidades</a>
  </p>

## Configuração Prévia

1. Você precisa atualizar o arquivo markdown(.md) com 2 comentários. Verifique [aqui](#atualize-seu-readme) como fazer isso.
2. Você vai precisar de uma API Key do WakaTime. Você pode conseguir isso nas configurações da conta do Wakatime
    - Você pode verificar [aqui](#novo-no-wakatime), caso seja novo no WakaTime
3. Você vai precisar de um API Token do GitHub com escopo de `repo` e `user` que poderá ser encontrado [aqui](https://github.com/settings/tokens) caso esteja usando o Action para pegar as métricas de commits
   > habilitar o escopo de `repo` parece **PERIGOSO**<br/>
   > mas esse GitHub Action apenas acessa a data e hora do seu commit e as linhas de códigos adicionadas ou deletadas no repositório que você contribuiu.
   - Você pode usar [esse](#perfil-do-repositório) exemplo como modelo
4. Você precisa salvar a API Key do Wakatime e o API Token do GitHub no secrets do repositório. Você pode encontrar isso nas configurações do seu repositório. Certifique-se de salva-los como mostra no exemplo abaixo.
    - API Key do WakaTime como `WAKATIME_API_KEY=<your wakatime API Key>`
    - Token de Acesso Pessoal do GitHub como `GH_TOKEN=<your github access token>`
5. Você pode habilitar e desabilitar as feature flags baseando-se em seus requerimentos.


Essa Ação será executada todos os dias às 00.00 IST

## Atualize seu Readme

Adicione um comentário igual a esse em seu `README.md`:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

Estas linhas serão nosso ponto de entrada para as métricas de desenvolvimento.

## Novo no WakaTime

WakaTime te dá uma ideia do tempo que você realmente gastou programando. Isso te ajuda a dar um boost na sua produtividade e no seu lado competitivo.

- Vá para <https://wakatime.com> e crie uma conta.
- Gere sua API Key do WakaTime em [Account Settings in WakaTime](https://wakatime.com/settings/account).
- Instale o [WakaTime plugin](https://wakatime.com/plugins) no seu editor favorito / IDE.
- Cole sua API key para iniciar suas alálises.

### Perfil do Repositório

Você vai precisar de um [GitHub Access Token](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) com escopo de `repo` e `user` e salva-lo no Secrets do repositório `GH_TOKEN = <Your GitHub Access Token>`

Aqui está um exemplo do arquivo com o Workflow para executa-lo:

```yml
name: Waka Readme

on:
  schedule:
    # Runs at 12am IST
    - cron: '30 18 * * *'

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
## Extras

1. Caso queira adicionar outras informações em suas estatísticas, você pode adicionar multiplas `FLAGS` no arquivo de workflow. Por padrão, todas as flags estão habilitadas 
>Exceto a flag de linhas de códigos devido ao peso de seu processamento

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

`LOCALE`  Essa Flag pode ser usada para mostrar as estatísticas em sua língua, o padrão é Inglês, use Locale [Forma Abreviada](https://saimana.com/list-of-country-locale-code/) para atribuir a variável na flag. Um exemplo do resultado final pode ser econtrado [aqui](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)


`SHOW_LINES_OF_CODE`       essa flag pode ser configurada para `True` para mostrar as linhas de códigos escritas até a data atual

![Linhas de Códigos](https://img.shields.io/badge/Desde%20o%20Hello%20World%20Eu%20Escrevi-1.3%20milhões%20de%20Linhas%20de%20Código-blue)

`SHOW_PROFILE_VIEWS`       essa flag pode ser configurada para `False` para ocultar as Vizualizações do Perfil

![Vizualizações do Perfil](http://img.shields.io/badge/Vizualizações%20do%20Perfil-2189-blue)


`SHOW_COMMIT`       essa flag pode ser configurada para `False` para ocultar as estatísticas de commits

**Eu sou Diurno 🐤** 
```text
🌞 Manhã    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Tarde    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Noite    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Madrugada      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

`SHOW_DAYS_OF_WEEK`       essa flag pode ser configurada para `False` para ocultar os commits feitos em diferentes dias da semana

📅 **Eu Sou Mais Produtivo aos Domingos** 

```text
Segunda-Feira       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Terça-Feira      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Quarta-Feira    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Quinta-Feira     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Sexta-Feira       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Sábado     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Domingo       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

`SHOW_LANGUAGE`       essa flag pode ser configurada para `False` para ocultar as linguagens de programação que você usa

```text
💬 Linguagens de Programação:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```


`SHOW_OS`       essa flag pode ser configurada para `False` para ocultar os detalhes do sistema operacional

```text
💻 Sistemas Operacionais:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

`SHOW_PROJECTS` essa flag pode ser configurada para `False` para ocultar os Projetos que você trabalhou

```text
🐱‍💻 Projetos:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

`SHOW_TIMEZONE` essa flag pode ser configurada para `False` para ocultar o fuso horário em que você está

```text
⌚︎ Fuso horário: America/Sao_Paulo
```

`SHOW_EDITORS`  essa flag pode ser configurada para `False` para ocultar os editores de códigos usados

```text
🔥 Editores:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

`SHOW_LANGUAGE_PER_REPO`  essa flag pode ser configurada para `False` para ocultar o número de repositórios com linguagens e frameworks diferentes

**Eu geralmente programo em Vue** 

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

`SHOW_SHORT_INFO`  essa flag pode ser configurada para `False` para ocultar pequenas informações sobre o usuário
>Essa seção requer um token pessoal de acesso com permissão de usuário, caso contrário, os dados mostrados aqui estarão incorretos

**🐱 Meus Dados no GitHub** 

> 🏆 433 Contribuições no ano de 2020
 > 
> 📦 Usado 292.3 kB no armazenamento do GitHub 
 > 
> 💼 Aberto para contratação
 > 
> 📜 25 Repositórios Públicos 
 > 
> 🔑 15 Repositórios Privados 

`SHOW_LOC_CHART`  essa flag pode ser configurada para `False` para ocultar as linhas de códigos escritas em diferentes trimestres do ano

**Linha do Tempo**

![Gráfico não Encontrado](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png) 

## :sparkling_heart: Apoie o Projeto

Eu uso código aberto em quase tudo que eu posso, e eu tento responder a todos que estão precisando de ajuda usando esse projeto. Óbvio que isso demanda tempo. Você pode usar esse serviço de graça.

Entretanto, caso você esteja usando esse projeto e esteja feliz com isso ou apenas quer me incentivar a continuar criando soluções, tem algumas maneiras em que você pode fazer isso:-

- Dando créditos a mim quando usar essa ação no seu readme, e linkando-o de volta para esse repositório :D
- Dando uma star e compartilhando o projeto :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Você pode fazer uma doação via PayPal. Eu provávelmente irei comprar ~~cerveja~~ vinho 🍷

Obrigado! :heart:

---

# Contribuições

Contribuições são bem vindas! ♥! Por favor compartilhe qualquer funcionalidade e adicione testes unitários! Use o sistema de pull request e issue para contribuir.

# Contribuidores Selecionados

1. [Anmol Pratap Singh](https://github.com/anmol098): Mantenedor
2. [Prabhat Singh](https://github.com/prabhatdev): Pelo gráfico de linha do tempo de código [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
3. [Hedy Li](https://github.com/hedythedev): Pelo Pull Request [#34](https://github.com/anmol098/waka-readme-stats/pull/34) e [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
4. [Pedro Torres](https://github.com/Corfucinas): Pelo Pull Request [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
5. [Aaron Meese](https://github.com/ajmeese7): Pelo Pull Request [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
6. [Arnav Jindal](https://github.com/Daggy1234): Pelo Pull Request [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
7. [Daniel Rowe](https://github.com/DanRowe): Pelo Pull Request [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
8. [Ss5h](https://github.com/tlatkdgus1): Por adicionar suporte de escrita de frase natural para tradução [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

<details>
<summary>Menção especial para aqueles que estão atualmente deixando seus readmes mais incríveis :smile: :tada:</summary>

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
  
  - [> EdgyCoder ✌](https://github.com/edgycoder)
  
  - [Korel Kashri](https://github.com/korelkashri)
  
  - [Gustavo Barbosa](https://github.com/gusbdev)

  - [eagleanurag](https://github.com/eagleanurag)
  
  - [Aravind V. Nair](https://github.com/aravindvnair99)
  
  - [Raman Preet Singh](https://github.com/raman08)
  
  - [Hayat Tamboli](https://github.com/hayat-tamboli)
  
  - [Henry Boisdequin](https://github.com/henryboisdequin)
   
  - [Raman Preet Singh](https://github.com/raman08)

  

</details>

- E você! Caso esteja usando isso agora e seu nome não esteja na lista, por favor contacte-nos enviando um [Menção Especial](https://github.com/anmol098/waka-readme-stats/issues/new/choose) issue :blush: nós ficaremos gratos em adicionar você na lista.


Feito com :heart: e Python 🐍.

# Inspirado por

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Esse projeto precisa de uma **star** ⭐ sua ♥.
