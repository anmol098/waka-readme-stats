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

# Métricas de desarrollo en el README con banderas de características añadidas 🎌

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
   ¿Eres un polluelo 🐤 o un búho 🦉?
   <br/>
   ¿Cuándo estás más productivo durante el día?
   <br/>
   ¿Cuáles son los lenguajes en los que codificas?
   <br/>
   ¡Vamos a verlo en tu README del perfil!
</p>

<p align="center">
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Report Bug</a>
    <a href="https://github.com/anmol098/waka-readme-stats/issues">Request Feature</a>
  </p>

## Prep Work

1. Debes actualizar el archivo markdown(`.md`) con 2 comentarios. Puedes referirte [aquí](#update-your-readme) para actualizarlo.
2. Necesitarás una clave de API de WakaTime. Puedes obtenerla desde la configuración de tu cuenta de WakaTime
    - Puedes referirte [aquí](#new-to-wakatime), si eres nuevo en WakaTime.
3. Necesitarás un token de API de GitHub con el alcance `repo` y `user` desde [aquí](https://github.com/settings/tokens) si estás ejecutando la acción para obtener métricas de commit.
   - Puedes usar [este](#profile-repository) ejemplo para resolverlo.

> [!NOTE]
> Enabling the `repo` scope seems **DANGEROUS**, \
> but this GitHub Action only accesses your commit timestamps and the number of lines of code added or deleted in repositories that you contributed to.

4. Debes guardar la clave de la API de WakaTime y el token de acceso personal de GitHub en los secretos del repositorio. Puedes encontrarlos en la configuración de tu repositorio. \
  Asegúrate de guardarlos de la siguiente manera:
    - Clave de API de WakaTime como `WAKATIME_API_KEY=<tu clave de API de wakatime>`
    - Token de acceso personal de GitHub (PAT) como `GH_TOKEN=<tu token de acceso de github>`
5. Puedes habilitar y deshabilitar banderas de características según tus requisitos.

Esta acción de GitHub se puede configurar para que se ejecute en cualquier momento que desees usando `cron`. Consulta [Crontab.guru](https://crontab.guru/) y [este](https://crontab.cronhub.io/) sitio web para generar expresiones `cron`.

## Actualiza tu Readme

Agrega un comentario a tu `README.md` así:

```md
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

`waka` puede reemplazarse por cualquier cadena especificada en la bandera `SECTION_NAME` según [la sección de banderas disponibles](#flags-available).

Estas líneas serán nuestros puntos de entrada para las métricas de desarrollo.

## Nuevo en WakaTime

WakaTime te da una idea del tiempo que realmente has dedicado a programar. Esto te ayuda a mejorar tu productividad y ventaja competitiva.

- Ve a <https://wakatime.com> y crea una cuenta.
- Obten tu clave de API de WakaTime desde tus [Configuraciones de cuenta en WakaTime](https://wakatime.com/settings/account).
- Instala el [plugin de WakaTime](https://wakatime.com/plugins) en tu editor / IDE favorito.
- Pega tu clave de API para comenzar el análisis.

### Repositorio de Perfil

Necesitarás obtener un [Token de Acceso de GitHub](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) con un alcance `repo` y `user` y guardarlo en el Secreto del Repositorio `GH_TOKEN = <Your GitHub Access Token>`

Aquí hay un archivo de flujo de trabajo de ejemplo para ejecutarlo:

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

- Ahora puedes hacer commit y esperar a que se ejecute automáticamente, o también puedes desencadenarlo para ver el resultado ahora. Solo ve a `Actions` en tu repositorio, selecciona tu flujo de trabajo `Profile Readme Development Stats` y haz clic en `Run workflow`. Ahora espera un minuto o dos y verás tus cambios.

## Extras

Si quieres agregar otra información a tus estadísticas, puedes agregar múltiples `FLAGS` en tu archivo de flujo de trabajo. Por defecto, todos los flags están habilitados (excepto el flag de líneas de código debido a la operación intensiva que se realiza)

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

`LOCALE` Esta bandera se puede utilizar para mostrar estadísticas en tu idioma. El valor predeterminado es inglés. El código de localización [abreviado](https://saimana.com/list-of-country-locale-code/) debe pasarse en la variable de la bandera. Un ejemplo del resultado final se puede encontrar [aquí](https://github.com/anmol098/anmol098/blob/master/Readme-fr.md)

La bandera `SECTION_NAME` se puede establecer en cualquier cadena y será el nombre de la sección para reemplazar en el README.

La bandera `COMMIT_BY_ME` se puede establecer en `True` para hacer el commit del código usando tu nombre y correo electrónico.

La bandera `COMMIT_MESSAGE` se puede establecer para el mensaje del commit. El valor predeterminado es "Actualizado con Dev Metrics".

La bandera `COMMIT_USERNAME` se puede establecer como un nombre de usuario para hacer el commit del código. El valor predeterminado es "readme-bot".

La bandera `COMMIT_EMAIL` se puede establecer en un correo electrónico para hacer el commit del código. El valor predeterminado es "41898282+github-actions[bot]@users.noreply.github.com".

La bandera `SHOW_UPDATED_DATE` se puede establecer en `True` para mostrar la fecha de actualización al final del párrafo.

La bandera `UPDATED_DATE_FORMAT` se puede establecer para poner la fecha de actualización en un formato. El valor predeterminado es `"%d/%m/%Y %H:%M:%S"`.

La bandera `SHOW_LINES_OF_CODE` se puede establecer en `True` para mostrar el número de líneas de código escritas hasta la fecha.

![Líneas de Código](https://img.shields.io/badge/From%20Hello%20World%20I've%20written-1.3%20million%20Lines%20of%20code-blue)

La bandera `SHOW_TOTAL_CODE_TIME` se puede establecer en `False` para ocultar *Code Time*.

![Code Time](http://img.shields.io/badge/Code%20Time-1%2C438%20hrs%2054%20mins-blue)

La bandera `SHOW_PROFILE_VIEWS` se puede establecer en `False` para ocultar **Profile Views**

![Profile Views](http://img.shields.io/badge/Profile%20Views-2189-blue)

La bandera `SHOW_COMMIT` se puede establecer en `False` para ocultar las estadísticas de commit.

**Soy un principiante 🐤**

```text
🌞 Morning    95 commits     ███████░░░░░░░░░░░░░░░░░░   30.55% 
🌆 Daytime    78 commits     ██████░░░░░░░░░░░░░░░░░░░   25.08% 
🌃 Evening    112 commits    █████████░░░░░░░░░░░░░░░░   36.01% 
🌙 Night      26 commits     ██░░░░░░░░░░░░░░░░░░░░░░░   8.36%

```

La bandera `SHOW_DAYS_OF_WEEK` se puede establecer en `False` para ocultar los commits realizados en los diferentes días de la semana.

📅 **Estoy más productivo los domingos**

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

La bandera `SHOW_OS` se puede establecer en `False` para ocultar los detalles de su sistema operativo.

```text
💻 Operating Systems:
Windows                  8 hrs 46 mins       █████████████████████████   100.0%
```

La bandera `SHOW_PROJECTS` se puede establecer en `False` para ocultar los proyectos en los que se ha trabajado.

```text
🐱‍💻 Projects:
ctx_connector            4 hrs 3 mins        ███████████░░░░░░░░░░░░░░   46.33%
NetSuite-Connector       1 hr 31 mins        ████░░░░░░░░░░░░░░░░░░░░░   17.29%
mango-web-master         1 hr 12 mins        ███░░░░░░░░░░░░░░░░░░░░░░   13.77%
cable                    54 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   10.41%
denAPI                   40 mins             ██░░░░░░░░░░░░░░░░░░░░░░░   7.66%
```

La bandera `SHOW_TIMEZONE` se puede establecer en `False` para ocultar la zona horaria en la que te encuentras.

```text
⌚︎ Timezone: Asia/Calcutta
```

La bandera `SHOW_EDITORS` se puede establecer en `False` para ocultar la lista de editores de código/IDE utilizados.

```text
🔥 Editors:
WebStorm                 6 hrs 47 mins       ███████████████████░░░░░░   77.43%
PhpStorm                 1 hr 35 mins        ████░░░░░░░░░░░░░░░░░░░░░   18.07%
PyCharm                  23 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   4.49%
```

La bandera `SHOW_LANGUAGE_PER_REPO` se puede establecer en `False` para ocultar el número de repositorios en diferentes lenguajes de programación y marcos.

**Principalmente codifico en Vue**

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0% 
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75% 
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38% 
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25% 
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%

```

La bandera `SHOW_SHORT_INFO` se puede establecer en `False` para ocultar la información breve de curiosidad de un usuario.

> [!NOTE]
> This section requires a Personal Access Token (PAT) with the `user` scope, otherwise the data shown here will be incorrect.

**🐱 Mis datos de GitHub**

> 🏆 433 Contribuciones en el año 2020
 >
> 📦 Usado 292.3 kB en el almacenamiento de GitHub
 >
> 💼 Optado para contratar
 >
> 📜 25 Repositorio público
 >
> 🔑 15 Repositorio privado propiedad

La bandera `SHOW_LOC_CHART` se puede establecer en `False` para ocultar las líneas de código escritas en diferentes trimestres de diferentes años.

La bandera `IGNORED_REPOS` se puede establecer en `"waka-readme-stats, my-first-repo"` (solo un ejemplo) para ignorar algunos repositorios que no desea que se cuenten.

La bandera `SYMBOL_VERSION` se puede establecer para el símbolo de la barra de progreso (por defecto: `1`).

| Versión | Bloque terminado | Bloque vacío |
|-------- | ---------------- | ------------ |
|    1    |      █     |       ░     |
|    2    |      ⣿     |       ⣀     |
|    3    |      ⬛    |       ⬜    |

**Barras de Progreso SVG**

Puede cambiar entre barras de texto Unicode y barras SVG coloridas con los siguientes flags:

- `BAR_STYLE` — Establézcalo en `"svg"` para habilitar barras SVG, o `"text"` (predeterminado) para barras Unicode
- `BAR_COLOR` — Color hexadecimal para la porción rellenada (predeterminado: `"#90CAF9"` azul claro)
- `BAR_TRACK_COLOR` — Color hexadecimal para la pista de fondo (predeterminado: `"#172f45"` azul oscuro)
- `BAR_RADIUS` — Radio de borde para esquinas redondeadas (predeterminado: `"0"` para cuadrado)
  - `"0"` = Bordes cuadrados agudos
  - `"4"` = Esquinas redondeadas sutiles
  - Cualquier número entero positivo funciona
- `TEXT_PRIMARY_COLOR` — Color hexadecimal para el texto principal de la lista SVG, como nombres de lenguajes/proyectos (predeterminado: `"#c9d1d9"`)
- `TEXT_SECONDARY_COLOR` — Color hexadecimal para el texto secundario de la lista SVG, como tiempos y porcentajes (predeterminado: `"#8b949e"`)

Ejemplo de flujo de trabajo con barras SVG habilitadas:

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

**Antes y después**

Barras Unicode predeterminadas (`BAR_STYLE: "text"`, u omitiendo `BAR_STYLE`):

```text
Vue          8 repos        ██████░░░░░░░░░░░░░░░░░░░   25.0%
Java         6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75%
JavaScript   6 repos        ████░░░░░░░░░░░░░░░░░░░░░   18.75%
PHP          3 repos        ██░░░░░░░░░░░░░░░░░░░░░░░   9.38%
Python       2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
Dart         2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
CSS          2 repos        █░░░░░░░░░░░░░░░░░░░░░░░░   6.25%
```

Barras SVG, esquinas cuadradas (`BAR_STYLE: "svg"`, `BAR_RADIUS: "0"`, `BAR_COLOR` / `BAR_TRACK_COLOR` predeterminados):

![Barras de progreso SVG (cuadradas)](https://i.imgur.com/eShKuJH.png)

Barras SVG, esquinas redondeadas (`BAR_STYLE: "svg"`, `BAR_RADIUS: "4"`):

![Barras de progreso SVG (redondeadas)](https://i.imgur.com/dYOgG6I.png)

La bandera `DEBUG_LOGGING` se puede establecer para aumentar la verbosidad de la salida de la acción de GitHub, por defecto es igual a la propiedad de depuración del ejecutor interno

**Línea de tiempo**

![Gráfico no encontrado](https://raw.githubusercontent.com/anmol098/anmol098/master/charts/bar_graph.png)

## :sparkling_heart: Apoya el proyecto

Abro-sourcing casi todo lo que puedo, y trato de responder a todos los que necesitan ayuda usando estos proyectos. Obviamente,
esto toma tiempo. Puedes usar este servicio gratis.

Sin embargo, si estás usando este proyecto y estás contento con él o simplemente quieres animarme a seguir creando cosas, hay algunas formas en las que puedes hacerlo :-

- Dando el crédito adecuado cuando uses esta acción en tu readme, vinculándote de vuelta a él :D
- Estrellando y compartiendo el proyecto :rocket:
- [![paypal.me/aapreneur](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/aapreneur) - Puedes hacer donaciones únicas a través de PayPal. Probablemente compraré algo ~~cerveza~~ vino 🍷.

¡Gracias! :heart:

# Contribuyendo

Las contribuciones son bienvenidas ♥! Por favor, comparta cualquier característica y agregue pruebas unitarias! Use los sistemas de solicitud de extracción y de problemas para contribuir.

# Contribuyentes Seleccionados

1. [Anmol Pratap Singh](https://github.com/anmol098): Mantenedor
2. [Alexander Sergeev](https://github.com/pseusys): Mantenedor
3. [DataBoySu](https://github.com/DataBoySu): Mantenedor
4. [okcoder1](https://github.com/ok-coder1): Mantenedor
5. [Aravind V. Nair](https://github.com/aravindvnair99): Mantenedor
6. [Prabhat Singh](https://github.com/prabhatdev): Por el gráfico de línea de código [#18](https://github.com/anmol098/waka-readme-stats/pull/18)
7. [Hedy Li](https://github.com/hedythedev): Por la solicitud de extracción [#34](https://github.com/anmol098/waka-readme-stats/pull/34) y [#23](https://github.com/anmol098/waka-readme-stats/pull/23)
8. [Pedro Torres](https://github.com/Corfucinas): Por la solicitud de extracción [#29](https://github.com/anmol098/waka-readme-stats/pull/29)
9. [Aaron Meese](https://github.com/ajmeese7): Por la solicitud de extracción [#45](https://github.com/anmol098/waka-readme-stats/pull/45)
10. [Arnav Jindal](https://github.com/Daggy1234): Por la solicitud de extracción [#48](https://github.com/anmol098/waka-readme-stats/pull/48)
11. [Daniel Rowe](https://github.com/DanRowe): Por la solicitud de extracción [#57](https://github.com/anmol098/waka-readme-stats/pull/57)
12. [Ss5h](https://github.com/tlatkdgus1): Por la adición del soporte para la escritura de oraciones naturales para la traducción [#136](https://github.com/anmol098/waka-readme-stats/pull/136)
13. [acheronx0577](https://github.com/acheronx0577): Por agregar el soporte de barras de progreso SVG con opciones de color y forma [#657](https://github.com/anmol098/waka-readme-stats/pull/657)

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

- ¡Y tú! Si estás usando esto ahora mismo y no estás en la lista, por favor háznoslo saber creando un problema de [Mención Especial](https://github.com/anmol098/waka-readme-stats/issues/new/choose) :blush: \
  Estaremos encantados de añadirte a la lista.

Hecho con :heart: y Python 🐍.

# Inspirado en

> [Awesome Pinned Gists](https://github.com/matchai/awesome-pinned-gists) <br/>
> [athul/waka-readme](https://github.com/athul/waka-readme)

### Este proyecto necesita una **estrella** ⭐ de tu parte ♥

## Stargazers a lo largo del tiempo

[![Stargazers over time](https://starchart.cc/anmol098/waka-readme-stats.svg)](https://starchart.cc/anmol098/waka-readme-stats)

