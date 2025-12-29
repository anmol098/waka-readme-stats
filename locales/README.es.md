<!--START_SECTION:navbar-->

<div align="center">
  <a href="../README.md">🇺🇸 English</a> | <a href="../locales/README.de.md">🇩🇪 Deutsch</a> | <a href="../locales/README.es.md">🇪🇸 Español</a> | <a href="../locales/README.fr.md">🇫🇷 Français</a> | <a href="../locales/README.hi.md">🇮🇳 हिंदी</a> | <a href="../locales/README.ja.md">🇯🇵 日本語</a> | <a href="../locales/README.ko.md">🇰🇷 한국어</a> | <a href="../locales/README.pt.md">🇵🇹 Português</a> | <a href="../locales/README.ru.md">🇷🇺 Русский</a> | <a href="../locales/README.zh.md">🇨🇳 中文</a>
</div>

<!--END_SECTION:navbar-->

> [!IMPORTANT]
> We are looking for translators for this project. \
> Any kind of help would be greatly appreciated. \
> Please see issue <https://github.com/anmol098/waka-readme-stats/issues/23> if you would like to help!

# Métricas de Desarrollo en README con banderas de características agregadas 🎌

![Vista previa del proyecto](https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png)

<p align="center">

  ![Vista previa del proyecto](https://user-images.githubusercontent.com/15426564/88030180-8e1c4780-cb58-11ea-8a8b-b3576dd73652.png)

  <h3 align="center">📌✨Estadísticas de README Increíbles</h3>
</p>

----

<p align="center">
   <img src="https://img.shields.io/badge/lenguaje-python-blue?style"/>
   <img src="https://img.shields.io/github/license/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/stars/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/github/forks/anmol098/waka-readme-stats"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=Si+te+gusta&style=flat&color=BC4E99" alt="Badge de estrellas">
</p>

<p align="center">
   ¿Eres un pájaro temprano 🐤 o una lechuza nocturna 🦉?
   <br/>
   ¿Cuándo eres más productivo durante el día?
   <br/>
   ¿En qué lenguajes codificas?
   <br/>
   ¡Descúbrelo en tu README de perfil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Reportar error</a>
    ·
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Solicitar característica</a>
  </p>

## Trabajo Preliminar

1. Necesitas actualizar el archivo markdown (`.md`) con 2 comentarios. Puedes consultar [aquí](#update-your-readme) para actualizarlo.
2. Requerirás una API Key de WakaTime. Puedes obtenerla desde la Configuración de tu Cuenta de WakaTime
   - Puedes consultar [aquí](#new-to-wakatime), si eres nuevo en WakaTime.
3. Necesitarás un Token de GitHub API con alcance `repo` y `user` desde [aquí](https://github.com/settings/tokens) si ejecutas la acción para obtener métricas de confirmaciones.
   - Puedes usar [este](#profile-repository) ejemplo para configurarlo.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

1. Debes guardar la Clave de API de WakaTime y el Token de Acceso de GitHub (PAT) en los secretos del repositorio. Puedes encontrar esta opción en la configuración de tu repositorio. \
   Asegúrate de guardarlos de la siguiente manera:
   - La Clave de API de WakaTime como `WAKATIME_API_KEY=<tu clave de API de WakaTime>`
   - El Token de Acceso Personal de GitHub (PAT) como `GH_TOKEN=<tu token de acceso de GitHub>`

2. Puedes habilitar y deshabilitar banderas de características según tus necesidades.

Esta acción de GitHub se puede configurar para ejecutarse en cualquier momento que desees utilizando `cron`. Consulta [Crontab.guru](https://crontab.guru/) y [este](https://crontab.cronhub.io/) sitio web para generar expresiones `cron`.

## Actualiza tu Readme

Añade un comentario a tu `README.md` de la siguiente manera:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` se puede reemplazar por cualquier cadena especificada en la bandera `SECTION_NAME` según lo descrito en la sección de banderas disponibles.

Estas líneas serán nuestros puntos de entrada para las métricas de desarrollo.

## Nuevo en WakaTime

WakaTime te da una idea del tiempo real que dedicaste a codificar. Esto te ayuda a impulsar tu productividad y ventaja competitiva.

- Ve a <https://wakatime.com> y crea una cuenta.
- Obtén tu clave API de WakaTime desde tus [Configuraciones de la Cuenta en WakaTime](https://wakatime.com/settings/account).
- Instala el [complemento de WakaTime](https://wakatime.com/plugins) en tu editor o IDE favorito.
- Pega tu clave API para comenzar el análisis.

### Perfil de Repositorio

Necesitarás obtener un [Token de Acceso de GitHub](https://docs.github.com/en/acciones/configurando-y-gestionando-flujos-de-trabajo/autenticacion-con-el-token_de-github) con alcance `repo` y `user` y guardarlo en los Secretos del Repositorio `GH_TOKEN = <Tu Token de Acceso de GitHub>`

Aquí tienes un archivo de flujo de trabajo de ejemplo para ejecutarlo:

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

- Ahora puedes confirmar los cambios y esperar a que se ejecuten automáticamente, o también puedes desencadenar su ejecución para ver el resultado de inmediato. Simplemente ve a la sección `Acciones` en tu repositorio, selecciona el flujo de trabajo `Perfil Readme Development Stats` y haz clic en `Ejecutar flujo de trabajo`. Espera un minuto o dos y verás tus cambios aplicados.

## Extras

Si deseas agregar otra información a tus estadísticas, puedes añadir múltiples `FLAGS` en tu archivo de flujo de trabajo. Por defecto, todas las banderas están habilitadas (excepto la bandera de líneas de código debido a la operación pesada que se realiza).

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

`LOCALE`: Esta bandera se puede utilizar para mostrar estadísticas en tu idioma. El valor predeterminado es inglés. Se debe pasar el código de locale [corto](https://saimana.com/list-of-country-locale-code/) en la variable de la bandera. Un ejemplo del resultado final se puede encontrar [aquí](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md).

La bandera `SECTION_NAME` se puede configurar con cualquier cadena, y será el nombre de la sección que se reemplazará en el README.

La bandera `COMMIT_BY_ME` se puede establecer en `True` para realizar un commit del código con tu nombre y correo electrónico.

La bandera `COMMIT_MESSAGE` se puede personalizar para el mensaje del commit. El valor predeterminado es "Actualizado con Métricas de Desarrollo".

La bandera `COMMIT_USERNAME` se puede configurar como un nombre de usuario para realizar el commit del código. El valor predeterminado es "readme-bot".

La bandera `COMMIT_EMAIL` se puede establecer para proporcionar una dirección de correo electrónico para realizar el commit. El valor predeterminado es "41898282+github-actions[bot]@users.noreply.github.com".

La bandera `SHOW_UPDATED_DATE` se puede configurar en `True` para mostrar la fecha de actualización al final del párrafo.

La bandera `UPDATED_DATE_FORMAT` se puede personalizar para formatear la fecha de actualización. El valor predeterminado es `"%d/%m/%Y %H:%M:%S"`.

La bandera `SHOW_LINES_OF_CODE` se puede establecer en `True` para mostrar el número de líneas de código escritas hasta la fecha.

![Líneas de Código](https://img.shields.io/badge/Desde%20Hola%20Mundo%20He%20escrito-1.3%20millones%20de%20líneas%20de%20código-blue)

La bandera `SHOW_TOTAL_CODE_TIME` se puede configurar en `False` para ocultar *Tiempo de Código*.

![Tiempo de Código](http://img.shields.io/badge/Tiempo%20de%20Código-1%2C438%20hrs%2054%20mins-blue)

La bandera `SHOW_PROFILE_VIEWS` se puede establecer en `False` para ocultar **Vistas del Perfil**.

![Vistas del Perfil](http://img.shields.io/badge/Vistas%20del%20Perfil-2189-blue)

La bandera `SHOW_COMMIT` se puede configurar en `False` para ocultar las estadísticas de commit.

**Soy un pájaro temprano 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

La bandera `SHOW_DAYS_OF_WEEK` se puede configurar en `False` para ocultar los compromisos realizados en los diferentes días de la semana.

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

La bandera `SHOW_LANGUAGE` se puede establecer en `False` para ocultar los lenguajes de programación que utilizas.

```text
💬 Languages:
JavaScript               5 hrs 26 mins       ███████████████░░░░░░░░░░   61.97%
PHP                      1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
Markdown                 1 hr 9 mins         ███░░░░░░░░░░░░░░░░░░░░░░   13.3%
Python                   22 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.32%
XML                      8 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.62%
```

La bandera `SHOW_OS` puede configurarse en `False` para ocultar los detalles de tu sistema operativo.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

La bandera `SHOW_PROJECTS` puede configurarse en `False` para ocultar los proyectos trabajados.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

La bandera `SHOW_TIMEZONE` puede configurarse en `False` para ocultar la zona horaria en la que te encuentras.

```text
⌚︎ Timezone: Asia/Calcutta
```

La bandera `SHOW_EDITORS` puede configurarse en `False` para ocultar la lista de editores de código/IDE utilizados.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

La bandera `SHOW_LANGUAGE_PER_REPO` se puede establecer en `False` para ocultar la cantidad de repositorios en diferentes lenguajes de programación y marcos.

**Yo codifico principalmente en Vue**

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

**🐱 Mis datos de GitHub**

> 🏆 433 contribuciones en el año 2020
>
> 📦 Se utilizaron 292,3 kB de almacenamiento en GitHub
>
> 💼 Opción de contratación seleccionada
>
> 📜 25 repositorios públicos
>
> 🔑 15 repositorios privados propios

La bandera `SHOW_LOC_CHART` se puede establecer en `False` para ocultar las líneas de código escritas en diferentes trimestres de diferentes años.

La bandera `IGNORED_REPOS` se puede configurar con `"waka-readme-stats, my-first-repo"` (solo un ejemplo) para ignorar repositorios que no desees contar.

La bandera `SYMBOL_VERSION` se puede establecer para el símbolo del indicador de progreso (por defecto: `1`).

| Versión | Bloque realizado | Bloque vacío |
|-------- | ---------------- | ----------- |
| 1       | █                | ░           |
| 2       | ⣿               | ⣀           |
| 3       | ⬛               | ⬜           |

La bandera `DEBUG_LOGGING` se puede configurar para aumentar la verbosidad de la salida de GitHub Actions, por defecto igual a la propiedad de depuración del ejecutor interno.

**Cronograma**

![Gráfico no encontrado](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :corazón_estrellado: Apoya el proyecto

Abro en código abierto casi todo lo que puedo y trato de responder a todos los que necesitan ayuda con estos proyectos. Obviamente, esto lleva tiempo. Puedes usar este servicio gratis.

Sin embargo, si estás utilizando este proyecto y estás contento con él o simplemente quieres animarme a seguir creando cosas, hay algunas formas en las que puedes hacerlo:

- Dando el crédito adecuado cuando uses esta acción en tu README, enlazando de vuelta :D
- Estrellando y compartiendo el proyecto 🚀
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Puedes hacer donaciones únicas a través de PayPal. Probablemente compre algo de ~~cerveza~~ vino 🍷.

¡Gracias! :corazón:

# Contribución

¡Las contribuciones son bienvenidas ♥! Por favor, comparte cualquier característica y añade pruebas unitarias. Utiliza los sistemas de solicitudes de extracción e informes para contribuir.

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

- ¡Y tú! Si estás usándolo en este momento y no estás en la lista, por favor házmelo saber enviando un [Mencion Especial](https://github.com/anmol098/waka-readme-stats/issues/new/choose) ¡:sonrojado!
  Estaremos encantados de agregarte a la lista.

Hecho con :corazón: y Python 🐍.

# Inspirado en

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Este proyecto necesita un **estrella** ⭐ de tu parte 💖

## Stargazers a lo largo del tiempo

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

