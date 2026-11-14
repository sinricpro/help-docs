---
title: Sinric Pro - Piattaforma cloud IoT per ESP8266, ESP32 e Raspberry Pi Pico W
layout: post
lang: it
description: Sinric Pro è una piattaforma cloud IoT per ESP8266, ESP32 e Raspberry Pi Pico W. Controlla i tuoi dispositivi con Alexa, Google Home, un'app mobile e un'API. 3 dispositivi gratis.
---

Sinric Pro è una piattaforma cloud che rende i tuoi progetti IoT fai-da-te compatibili con la smart home. Colleghi un **ESP8266**, un **ESP32** o un **Raspberry Pi Pico W** con poche righe di codice e lo controlli con comandi vocali, un'app mobile, automazioni o il tuo software.

Non devi gestire un server, aprire porte sul router o scrivere una skill Alexa.

### Cosa ottieni

| Funzionalità | Descrizione |
| --- | --- |
| Assistenti vocali | Amazon Alexa e Google Home, tramite la skill e la action ufficiali di Sinric Pro |
| App mobile | App Sinric Pro per Android e iPhone/iPad |
| Piattaforme smart home | Samsung SmartThings, [Homebridge (HomeKit)]({{ site.github.url }}/it/pages/homebridge.it.html), [Home Assistant]({{ site.github.url }}/it/pages/home-assistant.it.html), [IFTTT]({{ site.github.url }}/it/pages/ifttt.it.html), [Node-RED]({{ site.github.url }}/it/pages/node-red.it.html), [Comandi Rapidi di Apple]({{ site.github.url }}/it/pages/apple-shortcuts.it.html) |
| Tipi di dispositivo integrati | Interruttore, dimmer, luce, termostato, TV, altoparlante, serratura, ventilatore, tapparelle, porta del garage, campanello, videocamera e sensori di temperatura, movimento, contatto e qualità dell'aria |
| Tipi di dispositivo personalizzati | [Device template]({{ site.github.url }}/it/pages/custom-templates.it.html): trascina le capability per costruire il tuo tipo di dispositivo e generare il codice |
| Automazioni | [Automazioni]({{ site.github.url }}/it/pages/automations.it.html) create con il drag and drop |
| Notifiche push | Invia [notifiche push]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) dal tuo dispositivo al tuo telefono |
| Aggiornamenti OTA | [Aggiornamenti firmware over-the-air]({{ site.github.url }}/it/pages/ota.it.html) senza accesso fisico al dispositivo |
| Controllo locale | L'app continua a controllare i tuoi dispositivi via Wi-Fi [quando internet non funziona]({{ site.github.url }}/it/pages/local-control.it.html) |
| API | [API REST]({{ site.github.url }}/it/pages/api-guide.it.html) per creare le tue app e integrazioni |

### Hardware supportato

- **ESP8266** (NodeMCU, Wemos D1 mini, ESP-01 e altri)
- **ESP32** (compresi ESP32-S3 e le videocamere ESP32)
- **Raspberry Pi Pico W** (RP2040)
- **Arduino** UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010
- **Raspberry Pi** e qualsiasi computer su cui girino Python o NodeJS

Sono disponibili SDK per Arduino (C++), ESP-IDF, MicroPython, Python e NodeJS. Vedi l'[elenco degli SDK]({{ site.github.url }}/).

### Come funziona

1. Crea un dispositivo nel [Portale Sinric Pro](https://portal.sinric.pro) e copia le sue credenziali.
2. Aggiungi la libreria Sinric Pro al tuo sketch e carica il firmware sulla scheda.
3. La scheda si connette a Sinric Pro. Controllala dall'app, da Alexa, da Google Home o dall'API.

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>

bool onPowerState(const String &deviceId, bool &state) {
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true;
}

void setup() {
  // ... connect to Wi-Fi ...
  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

La guida completa è in [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html).

### Prezzi

- **Piano gratuito**: 3 dispositivi. Non serve la carta di credito.
- **Piani a pagamento**: per dispositivo all'anno, oppure dispositivi illimitati a un prezzo annuale fisso.

Vedi [Prezzi]({{ site.github.url }}/it/pages/pricing.it.html) per i prezzi aggiornati.

### Per prodotti e aziende

Se stai realizzando un prodotto da vendere, [Sinric Pro for Business]({{ site.github.url }}/it/pages/for-business.it.html) aggiunge provisioning dei dispositivi, gestione dei dispositivi e aggiornamenti OTA per le installazioni commerciali.

### Per iniziare

- [Crea un account gratuito](https://portal.sinric.pro/register)
- [Installa la libreria Sinric Pro]({{ site.github.url }}/it/pages/tutorials/general/install-sinricpro-library.it.html)
- [Tutorial di avvio rapido]({{ site.github.url }}/it/pages/quickstarts.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)
