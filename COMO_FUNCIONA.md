# COMO FUNCIONA
Se ejecuta una o 2 veces al dia.

1. Se ejecutan los webscraper o los rss, estos deben estar categorizados:

Las categorias, se pueden especificar a fuego si sabemos el canal RSS o la web desde la que se hace el scrapping, es decir se pueden poner en el sourceFeedsConfig.json



2. Los periodicos eligen que noticias quieren mostrar en funcion de las categorias a las que se subscriben

A parte pueden filtrar dentro de la categoria, palabras clave
Ejemplo de configuracion de periodico:
{
    "id":"GuadarramaNoticias.com",
    "secciones":{
        "Index":{
            "fromCategories": [
                {
                    categoryId: "Actualidad",
                    filterBy: "Guadarrama, Cercedilla",
                    maxNoticies: 5
                }
            ]
        },{
        "Actualidad":{
            "fromCategories": [
                {
                    categoryId: "Actualidad",
                    filterBy: "Guadarrama, Cercedilla",
                    maxNoticies: 5
                }
            ]
        },
        "Deportes":{
            "fromCategories": [
                {
                    categoryId: "Futbol",
                    filterBy: "Guadarrama, Real Madrid, Atletico, Barcelona, Rayo, Resumen",
                    maxNoticies: 5
                },
                {
                    categoryId: "Baloncesto",
                    filterBy: "Guadarrama, Real Madrid, Atletico, Barcelona, Rayo",
                    maxNoticies: 2
                },
                {
                    categoryId: "PingPong",
                    filterBy: "Guadarrama",
                    maxNoticies: 2
                }
            ]
        },
        "Tiempo":{
            "fromCategories": [
                {
                    categoryId: "Tiempo",
                    filterBy: "Guadarrama, Cercedilla",
                    maxNoticies: 1
                }
            ]
        }
    }

}



# RUTA
Todos los lectores de RSS o webscrapper deben generar la misma estructura de noticia que es ESTA:
{
    "noticeid": "https://youtubechannel/234dsasdfa/Identificador unico",
    "main_categories": "Futbol
    "categories": "Futbol,RealMadrid, Guadarrama, Actualidad, Internacional"
    "Title_large":
    "Title_short":
    "content_large":
    "content_short":
    "image_short":
    image_large":
    "generateOwnNews": "http://mynewspaeper/noticia0001detail.html"
}

- noticeId:"" //es un string con unico identificador para no repetir noticias, puede ser la url 
- Title_large: Titulo real
- title_short: Titulo corto con ellipsis o un titulo clickabit
- content_large: Contenido largo que seria el del detalle cuando la noticia es toda la pagina
- content_short: contenido preliminar o capcioso
- image_large: Imagen de cabecera para contenido largo
- image_short: imagen para contenido corto
- generateOwnNews: indica si debe generarse propia una pagina con el detalle de esa noticia