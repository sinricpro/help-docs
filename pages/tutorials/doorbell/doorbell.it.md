---
title: Campanello smart con ESP32, ESP8266 o Raspberry Pi Pico W per Alexa e Google Home
layout: post
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
lang: it
description: Costruisci un campanello smart con un pulsante e un ESP32, ESP8266 o Raspberry Pi Pico W. Ricevi le notifiche in Alexa, Google Home e nell'app Sinric Pro.
---

In questa sezione vedremo come creare un **campanello** usando un pulsante (tattile) collegato a un **ESP32**, **ESP8266** o **Raspberry Pi Pico W**, per poi ricevere una notifica in Alexa, Google Home o nell'app Sinric Pro.

### Prerequisiti : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Pulsante x 1.
3. Resistenza da 1K ~ 10K x 1
3. Cavetti jumper.

### Cablaggio del pulsante del campanello

Per collegare il nostro pulsante useremo la configurazione pull-down. Quando il pulsante viene premuto, digitalRead legge il segnale HIGH (1).

![Sinric Pro doorbell push button wiring diagram]({{ site.github.url }}/public/img/sinricpro_pi_doorbell-wiring-diagram.png) 

| MCU       | Pin GPIO     |
| --------- | ------- |
| ESP32     |    34   |
| ESP8266   |    4 (D2)  |
| Pico W    |    7    |

### Leggere lo stato del pulsante

Verifichiamo che il pulsante sia collegato correttamente e funzioni. 


```cpp
#if defined(ESP8266)
  #define BUTTON_PIN        D4
#elif defined(ESP32) 
  #define BUTTON_PIN        34
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        7
#endif

int button_state;
int lastbutton_state = LOW;

unsigned long last_debounce_time = 0;
unsigned long debounce_delay = 50; // increase if needed.

void setup() {
  Serial.begin(115200);	
  pinMode(BUTTON_PIN, INPUT);
}

void handle_button_press() {
  int reading = digitalRead(BUTTON_PIN);  
  if (reading != lastbutton_state) {
    last_debounce_time = millis();
  }

  if ((millis() - last_debounce_time) > debounce_delay) {
    if (reading != button_state) {
      button_state = reading;
      
      if (button_state == HIGH) {
        Serial.printf("Pressed!\r\n");
      }
    }
  }
  
  lastbutton_state = reading;
}

void loop() {
  handle_button_press();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/b8db56b3315c83be6bda1069e9b6a5c8)


![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png)

### Passo 1 : Collegati a Sinric Pro 

#### Crea un nuovo dispositivo: doorbell

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro e vai al menu **Devices** sulla sinistra.

* Fai clic sul pulsante **Add Device** (in alto a sinistra).

* Inserisci il nome del dispositivo **doorbell**, la descrizione **smart doorbell** e seleziona **Doorbell** come tipo.

* Fai clic su **Save** per creare il dispositivo

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-doorbell-create-device.png)

Appena fai clic sul pulsante di salvataggio, Amazon Alexa rileva automaticamente il dispositivo che abbiamo appena creato (se hai già collegato la nostra skill Alexa).

![Sinric Pro alexa doorbell notification]({{ site.github.url }}/public/img/sinricpro_alexa_doorbell_push_notification.jpg)

Se non hai ricevuto la notifica push, chiedi semplicemente ad Alexa di cercare i dispositivi

#### Passo 1.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Codice completo


```cpp
// Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif 

#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProDoorbell.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DOORBELL_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password 

#define BAUD_RATE         115200                // Change baudrate to your need

#if defined(ESP8266)
  #define BUTTON_PIN        D4
#elif defined(ESP32) 
  #define BUTTON_PIN        34
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        7
#endif

int button_state;
int lastbutton_state = LOW;

unsigned long last_debounce_time = 0;
unsigned long debounce_delay = 50; // increase if needed.
SinricProDoorbell& myDoorbell = SinricPro[DOORBELL_ID];

void handleButtonPress() {
  int reading = digitalRead(BUTTON_PIN);  
  if (reading != lastbutton_state) {
    last_debounce_time = millis();
  }

  if ((millis() - last_debounce_time) > debounce_delay) {
    if (reading != button_state) {
      button_state = reading;
      
      if (button_state == HIGH) {
        Serial.printf("[handleButtonPress()]: Button pressed!\r\n");
        bool success = myDoorbell.sendDoorbellEvent();
        if(!success) {
          Serial.printf("[handleButtonPress()]: Something went wrong...could not send Event to server!\r\n");
        }        
      }
    }
  }
  
  lastbutton_state = reading;
}
 
void setupWiFi() {
  Serial.printf("\r\n[setupWiFi()]: Connecting");

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
  Serial.printf("connected!\r\n[setupWiFi()]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}
 
void setupSinricPro() {
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupButton() {
  pinMode(BUTTON_PIN, INPUT);
}

void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupButton();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  handleButtonPress();
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/f5853e57b534d08fbc1df2d299c71265)


**Nota:** **le notifiche del campanello di Alexa sono disattivate per impostazione predefinita**. Devi abilitarle aprendo l'app per ricevere la notifica DingDong in Alexa.

![Sinric Pro Alexa enable doorbell notification settings]({{ site.github.url }}/public/img/sinricpro-alexa-doorbell-settings.jpg)

{% include youtubePlayer.html id=page.youtubeId %}

{% include youtubePlayer.html id=page.youtubeId2 %}

### Risoluzione dei problemi

- Il pulsante è troppo sensibile? Puoi regolare `debounce_delay` o provare la soluzione proposta in [issues/346](https://github.com/sinricpro/esp8266-esp32-sdk/issues/346)

- Consulta la nostra pagina [Troubleshooting]({{ site.github.url }}/it/pages/troubleshooting.it.html) per le possibili soluzioni al tuo problema.

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di contatto per porte e finestre]({{ site.github.url }}/it/pages/tutorials/contact-sensors/contact.it.html)
- [Sensore di movimento PIR (HC-SR501, HC-SR505, AM312)]({{ site.github.url }}/it/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.it.html)
- [Videocamera WebRTC con Raspberry Pi]({{ site.github.url }}/it/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)
