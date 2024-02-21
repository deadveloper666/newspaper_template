---
title: Macros 
description: Explicacion de las macros

variableA: mi super value A
variableList: ["valorA", "valorB", "valorC"]
variableListObjects: [{"name":"Luis"}, {"name":"Juan"}, {"name":"Maria"}]
---

# Macros

[Documentacion oficial](https://mkdocs-macros-plugin.readthedocs.io/en/latest/advanced/)
Un macro es un fragmento de codigo parametrizado que podemos usar como una template.

Necesitamos instalar el plugin macros:
```sh
pip install mkdocs-macros-plugin
```

Lo configuramos en mkdocs.yml indicando cual es la carpeta absoluta que incluye nuestras macros:
```yaml
plugins:
  - search:
      separator: '[\s\-,:!=\[\]()"`/]+|\.(?!\d)|&[lg]t;|(?!\b)(?=[A-Z][a-z])' 
  - macros:
      include_dir: docs/_include/macros   # https://mkdocs-macros-plugin.readthedocs.io/en/latest/advanced/
```

# Definiendo una macro
Creamos un archivo dentro y definimos una macro usando las directivas :

```md
{% raw %}

{% macro youtubeVideo(videoId, videoTitle) %}
<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/{{ videoId }}" title="{{ videoTitle }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
{% endmacro %}


{% endraw %}
```

# Importando la macro
En cualquiera de nuestros markdown podemos importar la macro

```md
{% raw %}

{% from 'embeded_media.macros' import youtubeVideo %}

{% endraw %}
```
y la usamos posteriormente invocandola indincando los argumentos, esto renderizara el contenido de la template  en nuestro fichero markdown

```md
{% raw %}

{{youtubeVideo('BcJSsEekO-U?si=POEgTtopYQ4uddHp', 'Al son del macarron')}}

{% endraw %}
```

O podemos importar todas las macros de un archivo y tenerlas bajo un prefijo para su uso:

```md
{% raw %}

{% import 'embeded_media.macros' as embeded_media_macros %}

y luego en el documento la usamos asi , pasandole los argumentos:

{{embeded_media_macros.spotifyList('0WjifMva8IEzE937TGqt9D?si=d4bd4aafcf244840')}}


{% endraw %}
```

# Variables en las macros

A nivel de pagina podemos definir variables globales para el documento, añadiendo en el encabezado:

```md
---
title: Macros 
description: Explicacion de las macros

variableA: valueA
variableList: ["valorA", "valorB", "valorC"]
variableListObjects: [{"name":"Luis"}, {"name":"Juan"}, {"name":"Maria"}]
---
```
Podemos usar esas variables asi:
```md
{% raw %}
La variable A es {{ variableA }}
{% endraw %}
```
Resultado:

La variable A es {{ variableA }}



y blucles for:
```md
<ul>
{% raw %}
{% for variable in variableList %}
    <li>{{ variable|e }}</li>
{% else %}
    <li><em>no users found</em></li>
{% endfor %}
</ul>
{% endraw %}
```
<ul>
{% for variable in variableList %}
    <li>{{ variable|e }}</li>
{% else %}
    <li><em>no users found</em></li>
{% endfor %}
</ul>


Bucles con objetos
```md
{% raw %}
<ul>
{% for person in variableListObjects %}
    <li>{{ person.name|e }}</li>
{% else %}
    <li><em>no persons found</em></li>
{% endfor %}
</ul>
{% endraw %}
```

<ul>
{% for person in variableListObjects %}
    <li>{{ person.name|e }}</li>
{% else %}
    <li><em>no persons found</em></li>
{% endfor %}
</ul>

# Definiendo macros en ficheros externos
Importamos todas las funciones de la macro bajo el alias simple_macros
```md
{% raw %}
{% import 'simple.macros' as simple_macros %}

{{simple_macros.createTable([{"name":"Pedri"}, {"name":"Maribel"}, {"name":"Marisa"}])}}
{% endraw %}
```
Resultado:

{% import 'simple.macros' as simple_macros %}

{{simple_macros.createTable([{"name":"Pedri"}, {"name":"Maribel"}, {"name":"Marisa"}])}}

# Podemos utilizar los plugins de mkdocs en nuestra macros
Importamos todas las funciones de la macro bajo el alias simple_macros
```md
{% raw %}
Creamos una nueva macro que haga uso de tabs

{% macro createPersonsTabs(persons) %}
    {% for person in persons %}
=== "{{ person.name }}"

    My name is {{ person.name|e }} .
    {% if person.name == 'Pedri' %}
    :man_raising_hand: I like {{ person.hobbies|e }}
    {% elif person.name == 'Maribel' %}
    :grinning: I like {{ person.hobbies|e }}
    {% else %}
    I like {{ person.hobbies|e }} and hate other persons.
    {% endif %}

    {% endfor %}
{% endmacro %}


La importamos 

{% import 'simple.macros' as simple_macros %}

La usamos

{{simple_macros.createPersonsTabs([{"name":"Pedri", "hobbies":"sing, jump"}, {"name":"Maribel", "hobbies":"Play Guitar"}, {"name":"Marisa", "hobbies":"Listen to Judas Priest"}])}}
{% endraw %}
```
Resultado:

{% import 'simple.macros' as simple_macros %}

{{simple_macros.createPersonsTabs([{"name":"Pedri", "hobbies":"sing, jump"}, {"name":"Maribel", "hobbies":"Play Guitar"}, {"name":"Marisa", "hobbies":"Listen to Judas Priest"}])}}


# Ejemplo usando PieChart
```md
{% raw %}

{% macro createPersonsChartPie(persons) %}
    ```mermaid
    pie title How are the best voted person?
        {% for person in persons %}
        "{{ person.name|e }}" : {{ person.voted|e }}
        {% endfor %}
    ```
{% endmacro %}

{% import 'simple.macros' as simple_macros %}

{{simple_macros.createPersonsChartPie([{"name":"Pedri", "voted":15}, {"name":"Maribel", "voted":65}, {"name":"Marisa", "voted":20}])}}


{% endraw %}
```
Resultado:

{% import 'simple.macros' as simple_macros %}

{{simple_macros.createPersonsChartPie([{"name":"Pedri", "voted":15}, {"name":"Maribel", "voted":65}, {"name":"Marisa", "voted":20}])}}
