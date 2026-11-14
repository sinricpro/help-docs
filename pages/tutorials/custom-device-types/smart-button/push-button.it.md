---
title:  Gestire lo Smart Button di Sinric Pro
layout: post
lang: it
description: Aggiungi all'app Sinric Pro un pulsante che avvia un'azione sul tuo ESP32, ESP8266 o Raspberry Pi Pico W.
---

Vuoi controllare i tuoi progetti fai da te con un semplice tocco sul telefono? La funzione Smart Button di Sinric Pro è la soluzione perfetta. Crea nell'app dei pulsanti capaci di avviare qualsiasi azione sul tuo microcontrollore: dall'accensione di LED al controllo di motori o sensori.
Questa guida ti accompagna nella configurazione della funzione Smart Button su ESP32, ESP8266 o Raspberry Pi Pico W. Imparerai a gestire tutti i tipi di interazione con il pulsante:

* Pressione singola
* Doppia pressione
* Pressione prolungata

### Prerequisiti : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.

### Passo 1 : Collegati a Sinric Pro 

#### Passo 1.1 : Crea un tipo di dispositivo personalizzato per lo Smart Button.

Sinric Pro non ha un tipo di dispositivo predefinito per il pulsante, quindi ne creeremo uno personalizzato.

**Nota**: per evitare di creare l'intero template puoi usare la funzione di importazione dei template di dispositivo descritta più sotto.

* [Accedi](https://portal.sinric.pro/devicetemplates/new) al tuo account Sinric Pro e vai su **Device Templates**

* Fai clic su **Add Device Template**. Inserisci **SmartButton** come nome e descrizione e seleziona **Smart Button** come tipo di dispositivo

![Sinric Pro smart button template]({{ site.github.url }}/public/img/smart-button-set-template-name-desc-type.png) 

* Fai clic su **Capabilities** e trascina una capability **Smart Button**.

![Sinric Pro custom device type for push button]({{ site.github.url }}/public/img/smart-button-set-template-drop-smart-button.png) 

Fai clic su **Save** per salvare.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/smart-button-saved-template.png)  

Ora puoi vedere il template appena creato.


## Importare un template esistente?

Se non hai voglia di configurare tutti i valori di Mode e Range, puoi usare la funzione di importazione.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Incolla questo template:

```c++
{
  "name": "SmartButton",
  "description": "SmartButton",
  "deviceTypeId": "672a3b2c96ec80395518f2fe",
  "capabilities": [
    {
      "id": "672a3fbd96ec8039551901eb"
    }
  ]
}
```
 

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).

* Inserisci il nome del dispositivo **SmartButton**, la descrizione **SmartButton** e seleziona il tipo di dispositivo **SmartButton**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/smart-button-save-device.png)

* Apri la scheda Others e fai clic su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

* Fai clic su **Code Generator** per generare il codice. Fai clic su **Download** per scaricarlo.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Passo 2 : Collegati a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Codice completo


**SmartButton.h**

```cpp
#ifndef _SMARTBUTTON_H_
#define _SMARTBUTTON_H_

#include <SinricProDevice.h>
#include <Capabilities/SmartButtonStateController.h>

class SmartButton 
: public SinricProDevice
, public SmartButtonStateController<SmartButton> {
  friend class SmartButtonStateController<SmartButton>;
public:
  SmartButton(const String &deviceId) : SinricProDevice(deviceId, "SmartButton") {};
};

#endif
```

**SmartButton.ino**

```cpp
// Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>
#ifdef ESP8266
  #include <ESP8266WiFi.h>
#endif
#ifdef ESP32
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include "SmartButton.h"

#define APP_KEY    "APP_KEY"
#define APP_SECRET "APP_SECRET"
#define DEVICE_ID  "DEVICE_ID"

#define SSID       "YOUR_WIFI_SSID"
#define PASS       "YOUR_WIFI_PASS"

#define BAUD_RATE  115200

SmartButton &smartButton = SinricPro[DEVICE_ID];


/*************
 * Callbacks *
 *************/

// SmartButtonStateController
bool onSinglePress(const String &deviceId) {
  // Triggers when you press the "SmartButton" on the app
  
  return true; // request handled properly
}

bool onDoublePress(const String &deviceId) {
  // Triggers when you double press the "SmartButton" on the app
  
  return true; // request handled properly
}

bool onLongPress(const String &deviceId) {
  // Triggers when you long press the "SmartButton" on the app
  
  return true; // request handled properly
}


/********* 
 * Setup *
 *********/

void setupSinricPro() {

// SmartButtonStateController
 smartButton.onSinglePress(onSinglePress);
 smartButton.onDoublePress(onDoublePress);
 smartButton.onLongPress(onLongPress);

  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
};

void setupWiFi() {
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(SSID, PASS);
  Serial.printf("[WiFi]: Connecting to %s", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf("connected\r\n");
}

void setup() {
  Serial.begin(BAUD_RATE);
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/5de59e34522c7ea21e3eef72c2e2bcd7)


![Sinric Pro smart button in portal]({{ site.github.url }}/public/img/smart-button-portal-dashboard.png)

![Sinric Pro smart button in app]({{ site.github.url }}/public/img/smart-button-app.png)

### Risoluzione dei problemi
1. Gli Smart Button sono supportati solo nell'app SinricPro. Alexa, Google Home e SmartThings non sono supportati.

2. Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).
 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Tutorial Switch parte 2: comanda il relè con un pulsante]({{ site.github.url }}/it/pages/tutorials/switch/part-2.it.html)
- [Template di dispositivo: crea il tuo tipo di dispositivo]({{ site.github.url }}/it/pages/custom-templates.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
