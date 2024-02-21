# newspaper_template
newspaper_template

# Algunas fuentes RSS
https://e00-marca.uecdn.es/rss/futbol/primera-division.xml


# Como obtener el channel Id de un canal por su nombre 

channel_name='@GolTelevision' 
curl --silent "https://www.youtube.com/c/@GolTelevision/videos" |\
    grep -o -P '(?<=canonical" href="https://www.youtube.com/channel/)[^"]*'
	
	UCWw6r_yGcl7fC0bShxOYhWg


# Source channels ya verificados:
GolTV resumentes de futbol: https://www.youtube.com/feeds/videos.xml?channel_id=UCWw6r_yGcl7fC0bShxOYhWg

	
# 1. COMO USAR ESTA HERRAMIENTA
La idea es hacer unas llamadas a servicios RSS y tras obtener esos datos, generar unas paginas estaticas a traves de la herramienta "mkdocs site"    

## 1.1. Obteniendo RSS
Utilizamos el script  generator.sh indicando cual es la url del feed y el archivo de salida (json)

generator.sh fetchRSS https://e00-marca.uecdn.es/rss/futbol/primera-division.xml myFeedFileConfiguration.json