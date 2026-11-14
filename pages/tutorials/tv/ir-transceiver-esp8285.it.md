---
title: Tutorial TV - Ricetrasmettitore IR
layout: post
lang: it
description: Controlla la tua TV con Alexa e Google Home usando un modulo ricetrasmettitore IR ESP8285 ESP-01M e Sinric Pro. Cablaggio e codice.
---


In questa sezione vedremo come controllare la tua TV con un ricetrasmettitore IR e come comandarla poi con la voce tramite **Alexa, Google Home o SmartThings**.

### Prerequisiti : 

1. Ricetrasmettitore IR ESP8285 ESP-01M x1. 

In questo tutorial useremo il ricetrasmettitore IR ESP8285 ESP-01M, un modulo molto diffuso e facile da trovare [online](https://www.google.com/search?q=esp8285+esp-01m+ir+transceiver). Anche se ci concentreremo su questo modulo specifico, gli stessi concetti valgono anche per altri trasmettitori a infrarossi a 38KHz.

![Sinric Pro ir transceiver]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285.png) 

### Breve introduzione al ricetrasmettitore IR ESP8285 ESP-01M

Un modulo ricetrasmettitore WIFI wireless a infrarossi ESP8285 è una scheda che riunisce due funzioni:

**Ricetrasmettitore a infrarossi (IR):** questa parte permette al modulo di trasmettere e ricevere segnali a infrarossi. Il trasmettitore IR è collegato a `GPIO4` e il ricevitore IR è collegato a `GPIO14`

**Modulo Wi-Fi ESP8285:** è un chip separato sulla scheda che permette al modulo di connettersi a una rete Wi-Fi. L'ESP8285 è un ESP8266 con 1M di Flash, in grado di sopportare temperature elevate fino a 125 gradi Celsius.

**Per caricare il firmware** : collega con il jumper `GPIO01` e `GND`.

**Per eseguire il firmware** : rimuovi il jumper e ricollega il programmatore USB

### Cablaggio

![Sinric Pro ESP8285 ESP-01M IR transceiver wiring]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285-wiring.png) 

| ESP8285   | TTL     |
| --------- | ------- |
| 5V        |    5V   |
| GND       |    GND  |
| TX        |    RX   |
| RX        |    TX   |


Prima di passare all'integrazione con Sinric Pro, è importante verificare che il relè sia cablato correttamente e che tu riesca a registrare i segnali IR. 

### Passo 1: Registrare i segnali IR

1. Installa [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266) 

    * Fai clic sulle voci di menu "Sketch" -> "Include Library" -> "Manage Libraries...".

    * Scrivi `IRremoteESP8266` nella casella di ricerca "Filter your search..." in alto a destra.

    * Fai clic sul risultato `IRremoteESP8266` della ricerca.

    * Seleziona la versione che vuoi installare e fai clic su `Install`.

2. Collega con il jumper `GPIO0` a `GND` per caricare il firmware.

3. Carica lo sketch [IRrecvDumpV3](https://github.com/crankyoldgit/IRremoteESP8266/blob/master/examples/IRrecvDumpV3/IRrecvDumpV3.ino) Non serve modificare lo sketch. Usa già i pin GPIO corretti.

![transceiver esp8285 flash]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285-flash.png) 

4. Rimuovi il jumper che collega `GPIO0` a `GND`  e ricollega il programmatore USB. Ora il chip ESP eseguirà lo sketch `IRrecvDumpV3`. Imposta il baud rate del monitor seriale di Arduino su `115200` per vedere i log.
  
6. È il momento di registrare il tasto di **accensione** del telecomando della tua TV.

![record tv remote esp82266]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-record-tv-remote.png) 

Nel monitor seriale di Arduino compariranno i codici IR, come nell'esempio qui sotto. 

Copia l'array **rawData**

![record tv remote esp82266 arduino serial]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-record-tv-remote-serial-arduino.png) 


### Passo 2: Inviare i segnali IR

```c++
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

const uint16_t kIrLed = 4;

IRsend irsend(kIrLed);

uint16_t rawData[3] = {9004, 2218,  586};  // TODO: Change this to your remote control power button

void setup() {
  irsend.begin();
  Serial.begin(115200);
}

void loop() {
  Serial.println("a rawData capture from dump");
  irsend.sendRaw(rawData, 3 /* IR len */, 38 /* kHz */);  // TODO: adjust IR len according to rawData length.
  delay(2000);
}

```

**Carica lo sketch qui sopra e rimuovi il jumper per eseguire il firmware.**

Quando lo sketch invia il segnale, la TV dovrebbe accendersi o spegnersi. Ora puoi ripetere la procedura per registrare altri tasti, come volume su, volume giù, muto ecc.

### Passo 3 : Crea un nuovo dispositivo TV in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).

* Inserisci il nome del dispositivo **TV**, la descrizione **TV** e seleziona il tipo di dispositivo **TV**.

* Apri Others e fai clic su **Save**

![record tv remote esp82266 arduino serial]({{ site.github.url }}/public/img/sinricpro-tv-new-device.png) 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys-no-hilight.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

### Passo 2 : Scrittura del codice 

#### 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Codice completo

Ora possiamo completare lo sketch SinricPro per la TV con i codici IR.


```cpp
// #define ENABLE_DEBUG
#define SINRICPRO_NOSSL
 
#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif 

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

#include "SinricPro.h"
#include "SinricProTV.h"

#define WIFI_SSID         "YOUR-WIFI-SSID"    
#define WIFI_PASS         "YOUR-WIFI-PASSWORD"
#define APP_KEY           "YOUR-APP-KEY"      // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        "YOUR-APP-SECRET"   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define TV_ID             "YOUR-DEVICE-ID"    // Should look like "5dc1564130xxxxxxxxxxxxxx"
#define BAUD_RATE         115200

const uint16_t kIrLed = 4;
IRsend irsend(kIrLed);

bool tvPowerState;

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("TV turned %s\r\n", state?"on":"off");
  tvPowerState = state; // set powerState

  /*
    Protocol  : NEC
    Code      : 0x20DF10EF (32 Bits)
    uint16_t rawData[71] = {9032, 4476,  582, 544,  582, 546,  582, 1652,  582, 546,  582, 544,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 544,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 546,  582, 544,  584, 544,  582, 1654,  582, 546,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 1652,  582, 546,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 41158,  9004, 2222,  582};  // NEC 20DF10EF
    uint32_t address = 0x4;
    uint32_t command = 0x8;
    uint64_t data = 0x20DF10EF;
  */
  
  uint16_t rawData[71] = {9032, 4476,  582, 544,  582, 546,  582, 1652,  582, 546,  582, 544,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 544,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 546,  582, 544,  584, 544,  582, 1654,  582, 546,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 1652,  582, 546,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 41158,  9004, 2222,  582};  // NEC 20DF10EF
  irsend.sendRaw(rawData, 71 /* IR len */, 38 /* kHz */);
  
  return true; 
} 

// setup function for WiFi connection
void setupWiFi() {
  Serial.printf("\r\n[Wifi]: Connecting");

  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(WIFI_SSID, WIFI_PASS); 

  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  IPAddress localIP = WiFi.localIP();
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}

// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProTV& myTV = SinricPro[TV_ID];

  // set callback functions to device
  myTV.onPowerState(onPowerState);

  // For other https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/TV/TV.ino
  // myTV.onAdjustVolume(onAdjustVolume);
  // myTV.onChangeChannel(onChangeChannel);
  // myTV.onChangeChannelNumber(onChangeChannelNumber);
  // myTV.onMediaControl(onMediaControl);
  // myTV.onMute(onMute);  
  // myTV.onSelectInput(onSelectInput);
  // myTV.onSetVolume(onSetVolume);
  // myTV.onSkipChannels(onSkipChannels);

  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupIR() {
  irsend.begin();
}

// main setup function
void setup() {
  setupIR();
  
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");

  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/7fa62119ea71ce381fde92711dc82bc3)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-ir-tv-demo.mp4" type="video/mp4">
</video>

Ora dovresti riuscire a controllare la TV anche tramite l'app Sinric Pro, Google Home e Alexa.

### Risoluzione dei problemi
Consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html) per trovare possibili soluzioni al tuo problema.

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Dispositivi RF a 433MHz con un trasmettitore RF]({{ site.github.url }}/it/pages/tutorials/general/rf-transmitter-with-sinricpro.it.html)
- [Tutorial Switch parte 1: accendere e spegnere un relè]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)
