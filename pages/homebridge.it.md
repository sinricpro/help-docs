---
title: Homebridge (Homekit)
weight: 4
lang: it
youtubeId: 3YI87iWlgDM
description: Rendi disponibili i tuoi dispositivi Sinric Pro in Apple HomeKit con il plugin Homebridge SinricPro. Installa il plugin e aggiungi la tua chiave API.
---

Con il nostro plugin Homebridge-SinricPro ora puoi rendere disponibili i tuoi dispositivi in Homekit.

**1. Ottieni una chiave API**

Se non hai una chiave API, accedi al [Portale](https://portal.sinric.pro) e fai clic su **Credentials**, oppure [fai clic qui](https://portal.sinric.pro/credential/new/apikey) per generare una nuova chiave API.

![Homebridge-SinricPro plugin new API key]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key.png)

Fai clic su Save

![Homebridge-SinricPro plugin new API saved]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key-generated.png)

Copia la chiave API

**1. Installa il plugin Homebridge-SinricPro**

Fai clic su Plugins e digita [**Sinricpro**](https://www.npmjs.com/package/homebridge-sinricpro).

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-search.png)

Fai clic su **Install**. Al termine dell'installazione compare questa finestra di dialogo. Inserisci la chiave API ottenuta sopra

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-settings.png)

Fai clic su Save. 

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-install.png)

**Ora devi riavviare Homebridge !!**

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-device-discovert.png)

All'avvio Homebridge rileva tutti i tuoi dispositivi, che ora sono disponibili nell'app Apple HomeKit.

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-homekit-app.png)


Demo:

{% include youtubePlayer.html id=page.youtubeId %}
