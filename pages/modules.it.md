---
title: Moduli
weight: 4
lang: it
description: Che cos'è un modulo in Sinric Pro e come una sola scheda ESP32 o ESP8266 può ospitare più dispositivi.
---

### Introduzione 

In SinricPro un modulo è un'unità fisica autonoma, ad esempio una scheda di sviluppo ESP32. I moduli sono pensati per svolgere diversi compiti, soprattutto legati alla connettività e alla comunicazione, come stabilire e mantenere le connessioni WiFi. **Un singolo modulo può ospitare uno o più dispositivi virtuali SinricPro**.

![what is a module]({{ site.github.url }}/public/img/sinricpro-what-is-a-module.png) 

Questo significa che una sola scheda fisica può gestire e controllare più dispositivi smart home, che compaiono singolarmente nell'ecosistema SinricPro e nelle piattaforme collegate come Amazon Alexa o Google Home. Ad esempio, un modulo ESP32 può comandare diversi relè, ognuno dei quali rappresenta un dispositivo "switch" distinto in SinricPro.

Non puoi creare un modulo come fai con un dispositivo virtuale. I moduli compaiono nel Portal non appena colleghi una scheda di sviluppo.

SinricPro offre le seguenti funzioni per i moduli

 1. [Impostare il WiFi primario o secondario](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)
 
 2. [Controllare lo stato del WiFi](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Health)

 3. [Impostare un IP fisso](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)

 4. [OTA](https://help.sinric.pro/pages/ota)
 
