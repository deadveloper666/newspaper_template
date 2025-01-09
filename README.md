# newspaper_template
newspaper_template

# Algunas fuentes RSS
https://e00-marca.uecdn.es/rss/futbol/primera-division.xml


# Como obtener el channel Id de un canal por su nombre 

channel_name='@GolTelevision' 
curl --silent "https://www.youtube.com/c/@GolTelevision/videos" |\
    grep -o -P '(?<=canonical" href="https://www.youtube.com/channel/)[^"]*'
	
y el id del channel es ->	UCWw6r_yGcl7fC0bShxOYhWg

Este es otro ejemplo con el canal de la @NBA
curl --silent "https://www.youtube.com/c/@NBA/videos" |\
    grep -o -P '(?<=canonical" href="https://www.youtube.com/channel/)[^"]*'

y el id es UCWJ2lWNubArHWmf3FIHbfcQ

(ahora puedo meterlo como entrada en el sourceFeedsConfig.json y se procesara)

# Source channels ya verificados:
GolTV resumentes de futbol: https://www.youtube.com/feeds/videos.xml?channel_id=UCWw6r_yGcl7fC0bShxOYhWg

	
# 1. COMO USAR ESTA HERRAMIENTA
La idea es hacer unas llamadas a servicios RSS y tras obtener esos datos, generar unas paginas estaticas a traves de la herramienta "mkdocs site"    

## 1.1. Obteniendo RSS
Utilizamos el script  generator.sh indicando cual es la url del feed y el archivo de salida (json)

./generator.sh fetchRSS 

## 1.2 Generando los MD
A partir de los json que se han generado a partir de la info de la fuente RSS, podemos generar el MD correspondiente.

./generator.sh generateMD 

En este paso habremos obtenido los MD en la carpeta build_tmp/md , podemos coger cualquier archivo MD generado y meterlo dentro del mkdocs site.

Si queremos hacerlo todo, podemos utilizar el siguiente comando

# Moviendo los Md generados al mkdocs source

Esto movera los md generados que esta en data dentro del directorio de trabajo de mkdocs/docs

./generator.sh acceptMDtoMkdocs

# GENERANDO EL SITE ESTATICO 
Ahora podemos usar el script 

cd mkdocs
./documentationServer.sh assemble para generar la carpeta /site