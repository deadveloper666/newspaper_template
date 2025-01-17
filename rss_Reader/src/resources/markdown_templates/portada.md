---
title: <%= newspaper.title %> 
description: <%= newspaper.description %> 
cabecera: <%= newspaper.firstNotice %> 
threeNotices: <%= newspaper.threeNotice.title %> 
advertising: <%= newspaper.advertisingA.image %>
largeNoticeA: <%= newspaper.largeNoticeA %>
youtubeEmbedNotice: <%= newspaper.videoNotice %>
advertisingB: <%= newspaper.advertisingB.image %>
---
{% import 'portada.macros' as newspaper_macros %}

# {{description}}

{{newspaper_macros.createCabecera( cabecera )}}

---

{{newspaper_macros.treeHorizontal( threeNotices )}}

---

{{newspaper_macros.advertisingTypeA( advertising )}}

{{newspaper_macros.largeNoticeA( largeNoticeA )}}

---

{{newspaper_macros.advertisingTypeA( advertisingB )}}

---

{{newspaper_macros.youtubeVideo(youtubeEmbedNotice.videoId, youtubeEmbedNotice.videoTitle)}}

{{newspaper_macros.advertisingTypeA( advertising )}}
