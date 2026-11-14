---
title: Come controllare un ESP32 o ESP8266 con Alexa e Google Home
layout: post
lang: it
locale: it_IT
description: Collega un ESP32 o ESP8266 ad Amazon Alexa e Google Home con Sinric Pro. Guida passo passo con codice Arduino, senza creare una skill Alexa e senza aprire porte sul router.
---

Questa guida mostra come collegare un **ESP32** o **ESP8266** (NodeMCU, Wemos D1 mini) ad **Amazon Alexa** e **Google Home**, per accendere e spegnere con la voce un relè, una luce o qualsiasi altra uscita.

Non devi scrivere una skill Alexa o una action Google Home, e non devi aprire nessuna porta sul router.

### Come funziona

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png)

1. Il tuo ESP32 o ESP8266 esegue la libreria Sinric Pro e mantiene aperta una connessione sicura con il server Sinric Pro.
2. Colleghi una sola volta la skill Alexa o la action Google Home **Sinric Pro** al tuo account Sinric Pro.
3. Quando dici *"Alexa, accendi l'interruttore"*, Alexa invia il comando a Sinric Pro, e Sinric Pro lo inoltra alla tua scheda.

Poiché è la scheda a connettersi al server, funziona da qualsiasi luogo e su qualsiasi rete domestica.

Sinric Pro è una skill Alexa Smart Home e una action Google Home ufficiale. Non usa l'emulazione di dispositivi. Se arrivi da Espalexa o fauxmoESP, leggi [Espalexa o fauxmoESP "Device Not Found"?]({{ site.github.url }}/it/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.it.html).

### Cosa ti serve

1. Una scheda di sviluppo ESP32 o ESP8266.
2. Un modulo relè o un LED da comandare.
3. Arduino IDE o PlatformIO.
4. Un [account Sinric Pro](https://portal.sinric.pro/register) gratuito. I limiti del piano gratuito sono indicati nella pagina dei [prezzi]({{ site.github.url }}/it/pages/pricing.it.html).

### Passo 1: Crea un dispositivo in Sinric Pro

* [Accedi](https://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic su **Add Device**.
* Inserisci il nome del dispositivo **Switch**, la descrizione **My First Switch** e seleziona il tipo di dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Fai clic su **Save**.
* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret**. ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI!***

Il nome del dispositivo è quello che dirai ad Alexa o Google Home, quindi scegli un nome facile da pronunciare.

### Passo 2: Installa la libreria Sinric Pro

In Arduino IDE apri **Strumenti > Gestione librerie**, cerca **SinricPro** e fai clic su **Installa**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Per PlatformIO, dipendenze ed errori comuni, vedi [How to install the Sinric Pro library]({{ site.github.url }}/it/pages/tutorials/general/install-sinricpro-library.it.html).

### Passo 3: Carica il codice

Lo stesso sketch funziona su ESP32 ed ESP8266. Inserisci i dati del tuo Wi-Fi e i tre valori del Passo 1.

```c++
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32)
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include <SinricProSwitch.h>

#define WIFI_SSID   "YOUR-WIFI-SSID"
#define WIFI_PASS   "YOUR-WIFI-PASSWORD"
#define APP_KEY     "YOUR-APP-KEY"
#define APP_SECRET  "YOUR-APP-SECRET"
#define SWITCH_ID   "YOUR-DEVICE-ID"

#if defined(ESP8266)
  #define RELAY_PIN 12   // D6
#elif defined(ESP32)
  #define RELAY_PIN 16
#endif

// called when Alexa, Google Home or the Sinric Pro app turns the switch on or off
bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s\r\n", deviceId.c_str(), state ? "on" : "off");
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true; // request handled
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }

  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);

  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

Se non vuoi scrivere codice, la funzione **Zero Code** del Portale può generare lo sketch per te.

Quando la scheda si connette, il dispositivo risulta online nel [Portale](https://portal.sinric.pro) e puoi accenderlo e spegnerlo da lì. Per il cablaggio di un relè, vedi [Switch Tutorial Part 1]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html).

### Passo 4: Collega Amazon Alexa

* Apri l'app Amazon Alexa.
* Vai su **Skill e giochi**.
* Cerca [**Sinric Pro**](https://www.amazon.it/dp/B07ZT5VDT8).
* Tocca **ABILITA ALL'USO**.
* Inserisci le credenziali Sinric Pro nella pagina di collegamento.
* Chiedi ad Alexa di cercare nuovi dispositivi: *"Alexa, trova i miei dispositivi"*.
* Di' *"Alexa, accendi Switch"*.

Altre informazioni su ricerca dei dispositivi, routine e risoluzione dei problemi: [Amazon Alexa]({{ site.github.url }}/it/pages/alexa.it.html).

### Passo 5: Collega Google Home

* Apri **Google Home** e tocca **Add** (Aggiungi).
* Seleziona **Setup Device** (Configura dispositivo).
* Seleziona **Works with Google Home**.
* Cerca [**Sinric Pro**](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=it).
* Collega il tuo account.
* Di' *"Hey Google, accendi Switch"*.

I nomi delle voci nell'app possono variare leggermente in base alla lingua.

Altre informazioni: [Google Home]({{ site.github.url }}/it/pages/google-home.it.html).

### Samsung SmartThings

* Apri l'app SmartThings e tocca l'icona **+**.
* Seleziona **Dispositivo**.
* Seleziona **Sinric Pro** tra le marche.
* Collega il tuo account.
* Ora puoi accendere e spegnere **Switch** dalla dashboard.

Altre informazioni: [Samsung SmartThings]({{ site.github.url }}/it/pages/smartthings.it.html).

### Cos'altro puoi costruire?

Un interruttore è solo il punto di partenza. Gli stessi passi valgono per altri tipi di dispositivo:

- [Luce dimmerabile con dimmer AC RobotDyn]({{ site.github.url }}/it/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.it.html)
- [Striscia LED RGB]({{ site.github.url }}/it/pages/tutorials/light/LED-Stripe-5050.it.html)
- [Sensore di temperatura (DHT11, DHT22)]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.it.html)
- [Sensore di movimento]({{ site.github.url }}/it/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.it.html)
- [Sensore di contatto (porta / finestra)]({{ site.github.url }}/it/pages/tutorials/contact-sensors/contact.it.html)
- [Campanello]({{ site.github.url }}/it/pages/tutorials/doorbell/doorbell.it.html)
- [Telecomando TV con transceiver IR]({{ site.github.url }}/it/pages/tutorials/tv/ir-transceiver-esp8285.it.html)
- [Tutti i tutorial di avvio rapido]({{ site.github.url }}/it/pages/quickstarts.it.html)

### Domande frequenti

**Devo creare una mia skill Alexa?**

No. Abiliti la skill Sinric Pro esistente e colleghi il tuo account.

**Funziona con schede diverse da ESP32 ed ESP8266?**

Sì. Esistono SDK per Raspberry Pi Pico W, Arduino UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010, MicroPython, Python e NodeJS. Vedi l'[elenco degli SDK]({{ site.github.url }}/).

**Posso controllare più dispositivi con una sola scheda?**

Sì. Un ESP32 o ESP8266 può ospitare più dispositivi Sinric Pro, per esempio una scheda relè a 4 canali. Vedi [Modules]({{ site.github.url }}/it/pages/modules.it.html) e la [Parte 3 del tutorial sugli interruttori]({{ site.github.url }}/it/pages/tutorials/switch/part-3.it.html).

**Posso usarlo con Apple HomeKit o Home Assistant?**

Sì. Vedi [Homebridge (HomeKit)]({{ site.github.url }}/it/pages/homebridge.it.html) e [Home Assistant]({{ site.github.url }}/it/pages/home-assistant.it.html).

### Risoluzione dei problemi

Consulta la pagina [Troubleshooting]({{ site.github.url }}/it/pages/troubleshooting.it.html) per le possibili soluzioni.

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
