# Media embeded

Tenemos 2 opciones

# 1. incluir directamente el html de embeded de you tube

Introducimos directamente el codigo html en el markdown donde queramos:

```html
<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/v_5bFeagYqs?si=Q0URMeSugtmUob3s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
```
Nos aseguramos de tener importado el css [embeded_media.css](../../runtime_assets/css/embeded_media/embeded_media.css) que incluye los estilos para que el iframe de youtube sea responsive. Lo importamos como extra_css en nuestro mkdocs.yaml

```yml
extra_css:
  - runtime_assets/css/embeded_media/embeded_media.css
```
Y obtenemos:
<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/v_5bFeagYqs?si=Q0URMeSugtmUob3s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

# 2. Usando import de MACROS dinamicas

Es decir tenemos el **directorio _includes/macros** que tiene macros definidas:

   [_include/macros/embeded_media.macros](../../_include/macros/embeded_media.macros)  

Las importamos (al principio del documento o donde sea)

```md
{% raw %}

{% from 'embeded_media.macros' import youtubeVideo %}

y luego en el documento la usamos asi , pasandole los argumentos:

{{youtubeVideo('BcJSsEekO-U?si=POEgTtopYQ4uddHp', 'Al son del macarron')}}


{% endraw %}
```

Resultado:

{% from 'embeded_media.macros' import youtubeVideo %}
{{youtubeVideo('BcJSsEekO-U?si=POEgTtopYQ4uddHp', 'Al son del macarron')}}


*No te olvides de incluir el embeded_media.css*

# Lo mismo para links Spotify

**Spotify Songs**
Codigo :
```md
{% raw %}

{% from 'embeded_media.macros' import spotifySong %}

y luego en el documento la usamos asi , pasandole los argumentos:

{{spotifySong('3aJymuSkVjznisc20MND55?si=6f1103ded6d140a4')}}


{% endraw %}
```

Resultado:

{% from 'embeded_media.macros' import spotifySong %}
{{spotifySong('3aJymuSkVjznisc20MND55?si=6f1103ded6d140a4')}}

Reutilizando la template importada

{{spotifySong('1daxKOGVnwvlnKqsPsqtrJ?si=b4c5428edef44d10')}}

**Listas de reproduccion Spotify**

Codigo:

```md
{% raw %}

{% from 'embeded_media.macros' import spotifyList %}

y luego en el documento la usamos asi , pasandole los argumentos:

{{spotifyList('0WjifMva8IEzE937TGqt9D?si=d4bd4aafcf244840')}}


{% endraw %}
```
Resultado:

{% from 'embeded_media.macros' import spotifyList %}
{{spotifyList('0WjifMva8IEzE937TGqt9D?si=d4bd4aafcf244840')}}

# Importando todas las macros de un archivo directametne

Podemos hacer esto y traer todas las macros de un archivo bajo un alias

```md
{% raw %}

{% import 'embeded_media.macros' as embeded_media_macros %}

y luego en el documento la usamos asi , pasandole los argumentos:

{{embeded_media_macros.spotifyList('0WjifMva8IEzE937TGqt9D?si=d4bd4aafcf244840')}}


{% endraw %}
```

Resultado:

{% import 'embeded_media.macros' as embeded_media_macros %}

{{embeded_media_macros.spotifyList('0WjifMva8IEzE937TGqt9D?si=d4bd4aafcf244840')}}