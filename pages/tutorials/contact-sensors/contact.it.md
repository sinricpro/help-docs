---
title: Tutorial sensore di contatto (MC-38) per ESP8266, ESP32, Raspberry Pi Pico W
layout: post
lang: it
description: Costruisci un sensore di contatto per porte e finestre con un interruttore reed MC-38 e un ESP32, ESP8266 o Raspberry Pi Pico W. Visualizza lo stato aperto/chiuso in Alexa.
---
 
In questa sezione ti mostriamo come creare un sensore di contatto (detto anche sensore per porte, sensore d'ingresso o sensore per finestre) con un **ESP32**, **ESP8266** o **Raspberry Pi Pico W**, e come visualizzarne lo stato aperto/chiuso in Alexa, Google Home, SmartThings o nell'app Sinric Pro.

![Sinric Pro contact sensor tutorial]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_bg.jpg) 


### Prerequisiti : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Sensore di contatto (MC-38) x 1.
3. Cavetti jumper.

### Breve introduzione al sensore di contatto

Un sensore di contatto è un dispositivo che rileva se una porta, una finestra o un altro oggetto è aperto o chiuso. È composto da due elementi, un sensore e un magnete, usati per determinare lo stato di oggetti come porte o finestre, cioè se sono aperti o chiusi. 
 
![Sinric Pro Contact Sensor Reed Switch Open Close]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_open_close.png) 

Il sensore è fissato al telaio della finestra scorrevole, mentre il magnete è applicato all'anta. Quando la finestra scorrevole è chiusa, il magnete si trova vicino al sensore e si stabilisce il contatto tra i due elementi. Quando invece la finestra viene aperta, il magnete si allontana dal sensore e il contatto si interrompe.

### Cablaggio del sensore di contatto

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_wiring.png) 

Nota: usiamo INPUT_PULLUP invece di collegare una resistenza da 10kΩ tra l'interruttore reed e GND.


| MCU       | Pin GPIO     |
| --------- | ------- |
| ESP32     |    19   |
| ESP8266   |    4 (D2)  |
| Pico W    |    GP5  |

Verifichiamo che il sensore di contatto sia cablato correttamente e funzioni. 

 

```cpp
#if defined(ESP8266)
  #define SENSOR_PIN        D2
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

int newState;
int oldState;

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT_PULLUP);

  oldState = digitalRead(SENSOR_PIN); // read the starting state
}

void loop() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Sliding window is open");
    } else {
      Serial.println("Sliding window is closed");
    }
    oldState = newState;
  }  
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/ce5b95c7618826005ef39bb1861cb6f1)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-contact-sensor-open-close.mp4" type="video/mp4">
</video>

### Passo 1 : Crea un nuovo Contact Sensor in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Front Door**, la descrizione **My Front Door** e seleziona il tipo di dispositivo **Contact Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_new_device.png)

* Fai clic su **Next** per passare alla scheda Notifications

![Sinric Pro contact sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_notifications.png)

Qui puoi attivare gli interruttori Open e Close per ricevere una notifica push nell'app Sinric Pro quando lo stato del sensore di contatto passa a **Open** o a **Close**.

* Fai clic sulla scheda Others e poi su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret**. ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI!***

### Passo 2 : Connettiti a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
Puoi **generare il codice** con la funzione **Zero Code** oppure scriverlo da te. Se non hai esperienza di programmazione, ti consigliamo di usare la funzione Zero Code del Portale per generare il codice, scaricarlo e caricarlo sulla scheda.

#### 2.2 Codice completo


```cpp
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

#if defined(ESP8266)
  #define SENSOR_PIN        D2
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

#include "SinricPro.h"
#include "SinricProContactsensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define CONTACT_ID        ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)

int actualContactState;
int lastContactState;
 
void handleContactSensor() {
  actualContactState = digitalRead(SENSOR_PIN); // read current state
  // If inverted change to !digitalRead(SENSOR_PIN)

  if (actualContactState != lastContactState) {         // if state has changed
    Serial.printf("Contact Sensor is %s now\r\n", actualContactState ? "open":"closed");
    lastContactState = actualContactState;              // update last known state
    
    SinricProContactsensor &myContact = SinricPro[CONTACT_ID]; // get contact sensor device

    // actualContactState == true then contact is closed 
    // actualContactState == false then contact is open 
    myContact.sendContactEvent(!actualContactState);      // send event with actual state
  }
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
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/2a027cb56a1f7762454d492d9e928b83)

 
Ora dovresti vedere lo stato del contatto in Alexa, Google Home, SmartThings e nell'app Sinric Pro

![Sinric Pro Alexa Contact Sensor]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_google_home_alexa_smartthings.jpg)
 
### Passo 3 : Annunci vocali!

✅ Come funziona:

1️⃣ Aggiungi uno Switch in SinricPro (il tuo trigger segreto!)

2️⃣ Crea una routine Alexa che pronuncia il tuo messaggio, ad esempio "C'è qualcuno alla porta!", quando lo Switch viene acceso

3️⃣ Dal tuo codice, invia un evento di stato di alimentazione per accendere quello Switch

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
``` 

### Risoluzione dei problemi
1. Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).
 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di movimento PIR (HC-SR501, HC-SR505, AM312)]({{ site.github.url }}/it/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.it.html)
- [Campanello smart]({{ site.github.url }}/it/pages/tutorials/doorbell/doorbell.it.html)
- [Inviare annunci ad Alexa]({{ site.github.url }}/it/pages/tutorials/general/how-to-send-announcements-to-alexa.it.html)

> Questo documento è open source. Hai trovato un errore? Crea una [issue](https://github.com/sinricpro/help-docs)