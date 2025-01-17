---
title: soloboxeo.com 
description: Actualidad del mundo del boxeo 
cabecera: {"title":"Eddie Hearn reserva Wembley para el Joshua vs Fury","content":"<div class=\"tags\"><p>Eddie Hearn es un hombre de negocios, y ya tiene prácticamente hecho su próximo combate. El promotor de Matchroom Boxing reveló en <a href=\"https://as.com/masdeporte/polideportivo/usyk-el-mejor-boxeador-del-mundo-para-the-ring-n/\" target=\"_blank\">la entrega de premios de la revista The Ring</a> que<b> ha reservado el estadio de Wembley para un choque entre Anthony Joshua (28-4-0, 25 KO) y Tyson Fury (34-2-1, 24 KO). </b>Un pleito entre ambos es algo que lleva mucho tiempo sobre la mesa y podría realizarse finalmente este año.</p><p><a href=\"https://as.com/masdeporte/polideportivo/eddie-hearn-reserva-wembley-para-el-joshua-vs-fury-n/\" target=\"_blank\">Seguir leyendo</a></p></div>","image":"https://picsum.photos/200/300"} 
rowNotices: [{"title":"Eddie Hearn reserva Wembley para el Joshua vs Fury","content":"<div class=\"tags\"><p>Eddie Hearn es un hombre de negocios, y ya tiene prácticamente hecho su próximo combate. El promotor de Matchroom Boxing reveló en <a href=\"https://as.com/masdeporte/polideportivo/usyk-el-mejor-boxeador-del-mundo-para-the-ring-n/\" target=\"_blank\">la entrega de premios de la revista The Ring</a> que<b> ha reservado el estadio de Wembley para un choque entre Anthony Joshua (28-4-0, 25 KO) y Tyson Fury (34-2-1, 24 KO). </b>Un pleito entre ambos es algo que lleva mucho tiempo sobre la mesa y podría realizarse finalmente este año.</p><p><a href=\"https://as.com/masdeporte/polideportivo/eddie-hearn-reserva-wembley-para-el-joshua-vs-fury-n/\" target=\"_blank\">Seguir leyendo</a></p></div>","image":"https://picsum.photos/200/300"},{"title":"Khabib hace enfadar a todo un país con unas declaraciones explosivas","content":"<div class=\"tags\"><p></p></div>","image":"https://picsum.photos/200/300"}] 
rowNoticesSize: 2 
lastVideoNotices: [{"videoId":"cpA8z-xKAfs","videoTitle":"Figueroa vs Castro HIGHLIGHTS July 9, 2022 | PBC on Showtime"},{"videoId":"u3raDYKz2dY","videoTitle":"Naoya Inoue (Japan) vs Kohei Kono (Japan) | Boxing Fight Highlights HD"}] 
lastVideoNoticesSize: 2
advertising: {"image":"https://static-cse.canva.com/blob/946445/21tb800x0.jpg"}
largeNoticeA: {"title":"La sobrada de Maffeo cuando le preguntan por un combate de boxeo contra Vinicius va a encender al madridismo","content":"<div class=\"tags\"><p></p></div>","image":"https://picsum.photos/200/300"}
youtubeEmbedNotice: {"videoId":"kC1TjpSalzA","videoTitle":"Ryan Garcia (USA) vs Emmanuel Tagoe (Ghana) | Boxing Fight Highlights HD"}
advertisingB: {"image":"https://neilpatel.com/wp-content/uploads/2021/02/discovery-successful-banner-advertising-.png"}
---
{% import 'portada.macros' as newspaper_macros %}

# {{description}}

{{newspaper_macros.createCabecera( cabecera )}}

---

{{newspaper_macros.lastVideosRow(lastVideoNoticesSize,lastVideoNotices )}}

---

{{newspaper_macros.advertisingTypeA( advertising )}}
---

{{newspaper_macros.noticesRow( rowNoticesSize , rowNotices)}}

{{newspaper_macros.largeNoticeA( largeNoticeA )}}

---

{{newspaper_macros.advertisingTypeA( advertisingB )}}

---

{{newspaper_macros.youtubeVideo(youtubeEmbedNotice.videoId, youtubeEmbedNotice.videoTitle)}}

{{newspaper_macros.advertisingTypeA( advertising )}}
