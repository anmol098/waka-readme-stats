<!--START_SECTION:navbar-->
<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="README.de.md">🇩🇪 Deutsch</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.hi.md">🇮🇳 हिंदी</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.pt.md">🇵🇹 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.zh.md">🇨🇳 中文</a>
</div>
<!--END_SECTION:navbar-->

> [!IMPORTANTE]
> Estamos buscando traductores para este proyecto.
> Cualquier tipo de ayuda sería muy apreciada.
> Por favor, consulte el problema <https://github.com/anmol098/waka-readme-stats/issues/23> si desea ayudar.

# Métricas de Desarrollo en README con banderas de características agregadas 🎌

![Vista previa del proyecto](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

![Proyecto Previsualización](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

<h3 align="center">📌✨Estadísticas de README Increíbles</h3>

----

<p align="center">
   <img src="https://img.shields.io/badge/lenguaje-python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=Si+útil&style=flat&color=BC4E99" alt="Badge de Estrellas"/>
</p>

<p align="center">
   ¿Eres un pájaro matutino o un búho nocturno?
   <br/>
   ¿En qué momento del día eres más productivo?
   <br/>
   ¿Qué lenguajes de programación utilizas?
   <br/>
   ¡Descúbrelo en tu archivo README!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Reportar Error</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Solicitar Característica</a>
</p>

## Trabajo previo

1. Debe actualizar el archivo Markdown (`.md`) con 2 comentarios. Puede consultar [aquí](#actualizar-su-readme) para obtener instrucciones de actualización.
2. Necesitará una clave de API de WakaTime. Puede obtenerla desde la configuración de su cuenta de WakaTime.
   - Consulte [aquí](#nuevo-en-wakatime) si es nuevo en WakaTime.
3. Necesitará un token de acceso de GitHub con alcance `repo` y `user` desde [aquí](https://github.com/settings/tokens) si está ejecutando la acción para obtener métricas de confirmaciones.
   - Puede utilizar [este ejemplo](#perfil-de-repositorio) para configurarlo.

> [!NOTA]
> Habilitar el alcance `repo` puede ser **PELIGROSO**,
> ya que esta acción de GitHub solo accede a los marcadores de tiempo de confirmación y al número de líneas de código agregadas o eliminadas en repositorios a los que haya contribuido.

1. Debe guardar la clave de API de WakaTime y el token de acceso de GitHub en los secretos del repositorio. Puede encontrar esta opción en la configuración de su repositorio.
   - Guarde esos secretos con los siguientes formatos:
     - Clave de API de WakaTime como `WAKATIME_API_KEY=<su clave de API de WakaTime>`
     - Token de acceso personal de GitHub (PAT) como `GH_TOKEN=<su token de acceso de GitHub>`
2. Puede habilitar y deshabilitar banderas de características según sus necesidades.

Esta acción de GitHub se puede configurar para ejecutarse en cualquier momento utilizando `cron`. Consulte [Crontab.guru](https://crontab.guru/) y [este](https://crontab.cronhub.io/) sitio web para generar expresiones `cron`.

## Actualice su Readme

Agregue un comentario a su archivo `README.md` de la siguiente manera:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` puede ser reemplazado por cualquier cadena especificada en la bandera `SECTION_NAME` según la sección de banderas disponibles.

Estas líneas serán nuestros puntos de entrada para las métricas de desarrollo.

## Nuevo en WakaTime

WakaTime le proporciona una idea del tiempo real que dedicó a la programación. Esto le ayuda a mejorar su productividad y su ventaja competitiva.

- Visite <https://wakatime.com> y cree una cuenta.
- Obtenga su clave API de WakaTime desde sus [Configuraciones de Cuenta en WakaTime](https://wakatime.com/settings/account).
- Instale el [complemento de WakaTime](https://wakatime.com/plugins) en su editor o IDE favorito.
- Pegue su clave API para iniciar el análisis.

### Repositorio de Perfil

Necesitará obtener un [Token de Acceso de GitHub](https://docs.github.com/es/acciones/configurando-y-gestionando-flujos-de-trabajo/autenticacion-con-el-token_de-github) con un alcance `repo` y `user`, y guardarlo en los Secretos del Repositorio `GH_TOKEN = <Su Token de Acceso de GitHub>`.

Aquí tiene un archivo de flujo de trabajo de ejemplo para ejecutarlo:

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

Ahora puede realizar un commit y esperar a que se ejecute automáticamente, o también puede desencadenar su ejecución para ver el resultado de inmediato. Simplemente vaya a la sección `Acciones` de su repositorio, seleccione el flujo de trabajo `Perfil Readme Development Stats` y haga clic en `Ejecutar flujo de trabajo`. Espere un minuto o dos y verá sus cambios.

## Extras

Si desea agregar otra información a sus estadísticas, puede incluir múltiples `FLAGS` en su archivo de flujo de trabajo. Por defecto, todas las banderas están habilitadas (excepto la bandera de líneas de código debido a la operación intensiva que implica).

```yml
- uses: anmol098/waka-readme-stats@master
  with:
      WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      SHOW_OS: "False"
      SHOW_PROJECTS: "False"
```

### Banderas Disponibles

---

`LOCALE` Esta bandera se puede utilizar para mostrar estadísticas en su idioma. El valor predeterminado es inglés. Código de idioma abreviado [corto](https://saimana.com/lista-de-códigos-de-idioma-país/) para pasar en la variable de bandera. Un ejemplo del resultado final se puede encontrar [aquí](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

La bandera `SECCIÓN_NOMBRE` se puede establecer en cualquier cadena, y será el nombre de la sección para reemplazar en el README.

La bandera `COMMIT_POR_MI` se puede establecer en `True` para comprometer el código con su nombre y correo electrónico.

La bandera `COMMIT_MENSAJE` se puede configurar para el mensaje de compromiso. El valor predeterminado es "Actualizado con Métricas de Desarrollo".

La bandera `COMMIT_USUARIO` se puede establecer como un nombre de usuario para comprometer el código. El valor predeterminado es "readme-bot".

La bandera `COMMIT_CORREO` se puede establecer para un correo electrónico para comprometer el código. El valor predeterminado es "41898282+github-actions[bot]@users.noreply.github.com".

La bandera `MOSTRAR_FECHA_ACTUALIZACIÓN` se puede establecer en `True` para mostrar la fecha de actualización al final del párrafo.

La bandera `FORMATO_FECHA_ACTUALIZACIÓN` se puede establecer para colocar la fecha de actualización en un formato. El valor predeterminado es `"%d/%m/%Y %H:%M:%S"`.

La bandera `MOSTRAR_LINEAS_CÓDIGO` se puede establecer en `True` para mostrar el número de líneas de código escritas hasta la fecha.

![Lines of Code](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

La bandera `SHOW_TOTAL_CODE_TIME` puede configurarse en `False` para ocultar *Tiempo de Código*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

La bandera `SHOW_PROFILE_VIEWS` puede configurarse en `False` para ocultar **Vistas de Perfil**.

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

La bandera `SHOW_COMMIT` puede configurarse en `False` para ocultar las estadísticas del commit.

**Soy un pájaro temprano 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

La bandera `SHOW_DAYS_OF_WEEK` puede configurarse en `False` para ocultar los compromisos realizados en los diferentes días de la semana.

📅 **Soy más productivo los domingos**

```text
Monday       50 commits     ███░░░░░░░░░░░░░░░░░░░░░░   13.19% 
Tuesday      85 commits     █████░░░░░░░░░░░░░░░░░░░░   22.43% 
Wednesday    56 commits     ███░░░░░░░░░░░░░░░░░░░░░░   14.78% 
Thursday     44 commits     ███░░░░░░░░░░░░░░░░░░░░░░   11.61% 
Friday       28 commits     █░░░░░░░░░░░░░░░░░░░░░░░░   7.39% 
Saturday     30 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   7.92% 
Sunday       86 commits     █████░░░░░░░░░░░░░░░░░░░░   22.69%

```

La bandera `SHOW_LANGUAGE` puede configurarse en `False` para ocultar los lenguajes de programación que utiliza.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

La bandera `SHOW_OS` puede configurarse en `False` para ocultar los detalles de su sistema operativo.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

La bandera `SHOW_PROJECTS` puede configurarse en `False` para ocultar los proyectos en los que se ha trabajado.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

La bandera `SHOW_TIMEZONE` puede configurarse en `False` para ocultar la zona horaria en la que se encuentra.

```text
⌚︎ Timezone: Asia/Calcutta
```

La bandera `SHOW_EDITORS` puede configurarse en `False` para ocultar la lista de editores de código/IDEs utilizados.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

La bandera `SHOW_LANGUAGE_PER_REPO` puede configurarse en `False` para ocultar el número de repositorios en diferentes lenguajes de programación y frameworks.

**Yo programo principalmente en Vue**

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

## :corazón_destellante: Apoye el proyecto

Abro al código fuente de casi todo lo que puedo y trato de responder a todos los que necesitan ayuda utilizando estos proyectos. Obviamente, esto toma tiempo. Puede utilizar este servicio de forma gratuita.

Sin embargo, si está utilizando este proyecto y está satisfecho con él o simplemente desea animarme a seguir creando cosas, hay algunas formas de hacerlo:

- **Dando el crédito adecuado** cuando utilice esta acción en su archivo README, vinculando de vuelta a él. 😊
- **Estreando y compartiendo el proyecto** 🚀.
- **[!Donación PayPal](https://www.paypal.me/aapreneur)** - Puede realizar donaciones únicas a través de PayPal. Probablemente compre algo de ~~cerveza~~ vino 🍷.

¡Gracias! 💖

# Contribuciones

Se aceptan contribuciones ♥ ¡Por favor, comparta cualquier característica y agregue pruebas unitarias! Utilice los sistemas de solicitudes de extracción e informes de problemas para contribuir.

# Contribuyentes Seleccionados

1. [Anmol Pratap Singh](https://github.com/anmol098): Mantenedor
2. [Alexander Sergeev](https://github.com/pseusys): Mantenedor
3. [Aravind V. Nair](https://github.com/aravindvnair99): Mantenedor
4. [Prabhat Singh](https://github.com/prabhatdev): Por el gráfico de línea de código [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
5. [Hedy Li](https://github.com/hedythedev): Por las solicitudes de extracción [#34](https://github.com/anmol098/waka-readme-stats/pull/34) y [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
6. [Pedro Torres](https://github.com/Corfucinas): Por la solicitud de extracción [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
7. [Aaron Meese](https://github.com/ajmeese7): Por la solicitud de extracción [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
8. [Arnav Jindal](https://github.com/Daggy1234): Por la solicitud de extracción [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
9. [Daniel Rowe](https://github.com/DanRowe): Por la solicitud de extracción [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
10. [Ss5h](https://github.com/tlatkdgus1): Por agregar soporte para escritura de oraciones naturales para traducción [#136](https://github.com/anmol098/waka-readme-stats/pull/136)

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

- ¡Y usted! Si está utilizándolo en este momento y no figura en la lista, infórmenos enviando un [Mencion Especial](https://github.com/anmol098/waka-readme-stats/issues/new/choose) ¡:sonrojado:!
  Estaremos encantados de agregarlo a la lista.

Hecho con :corazón: y Python 🐍.

# Inspirado en

> [Awesome Gists Pinados](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Este proyecto necesita **una estrella** ⭐ de su parte.

## Observadores a lo largo del tiempo

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

