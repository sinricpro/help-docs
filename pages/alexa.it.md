---
title: Amazon Alexa
layout: post
lang: it
description: Collega Sinric Pro ad Amazon Alexa. Abilita la skill Sinric Pro, collega il tuo account, trova i tuoi dispositivi ESP32 ed ESP8266 e controllali con la voce.
---

Sinric Pro ha una **skill Alexa Smart Home** ufficiale. Una volta collegata la skill al tuo account Sinric Pro, ogni dispositivo del tuo account compare nell'app Alexa e può essere controllato con la voce, dall'app Alexa e dalle routine Alexa.

Non devi scrivere una tua skill, e il dispositivo non deve trovarsi sulla stessa rete del tuo Echo.

### Collega la skill Sinric Pro

* Apri l'app Amazon Alexa.
* Vai su **Skill e giochi**.
* Cerca [**Sinric Pro**](https://www.amazon.it/dp/B07ZT5VDT8).
* Tocca **ABILITA ALL'USO**.
* Inserisci le credenziali Sinric Pro nella pagina di collegamento.
* Chiedi ad Alexa di cercare nuovi dispositivi: *"Alexa, trova i miei dispositivi"*.

I tuoi dispositivi Sinric Pro ora compaiono nella sezione **Dispositivi** dell'app Alexa.

### Aggiungere altri dispositivi in seguito

Crea il dispositivo nel [Portale Sinric Pro](https://portal.sinric.pro), poi di' di nuovo *"Alexa, trova i miei dispositivi"*. Non devi collegare la skill una seconda volta.

Il nome del dispositivo in Sinric Pro è il nome che Alexa riconosce. Scegli un nome facile da pronunciare e diverso da quello degli altri tuoi dispositivi.

### Cosa puoi dire

*"Alexa, accendi Switch"*, *"Alexa, imposta la lampada al 50 percento"*, *"Alexa, qual è la temperatura del soggiorno?"*

I comandi vocali per ogni tipo di dispositivo sono in [Utterances]({{ site.github.url }}/pages/utterances.html) (in inglese).

### Routine e annunci

Sensori come sensori di contatto, sensori di movimento e campanelli possono attivare le routine Alexa:

- [Inviare annunci ad Alexa]({{ site.github.url }}/it/pages/tutorials/general/how-to-send-announcements-to-alexa.it.html)
- [Tutorial sul campanello]({{ site.github.url }}/it/pages/tutorials/doorbell/doorbell.it.html)

### Risoluzione dei problemi

**Alexa non trova il dispositivo**

- Controlla che il dispositivo esista nel [Portale](https://portal.sinric.pro).
- Controlla che la skill sia collegata allo stesso account Sinric Pro a cui appartiene il dispositivo.
- Avvia di nuovo la ricerca: *"Alexa, trova i miei dispositivi"*.

**Alexa dice che il dispositivo non risponde**

- Il dispositivo è offline. Controlla nel Portale che sia connesso e consulta la pagina [Troubleshooting]({{ site.github.url }}/it/pages/troubleshooting.it.html).

**Usi Espalexa o fauxmoESP?**

Queste librerie emulano un bridge Hue sulla tua rete locale e non fanno parte di Sinric Pro. Vedi [Espalexa o fauxmoESP "Device Not Found"?]({{ site.github.url }}/it/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.it.html).

### Per iniziare

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Tutorial di avvio rapido]({{ site.github.url }}/it/pages/quickstarts.it.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
