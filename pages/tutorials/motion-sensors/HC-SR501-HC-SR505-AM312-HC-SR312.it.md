---
title: 'Sensore di movimento PIR con ESP32 o ESP8266 per Alexa: HC-SR501, HC-SR505, AM312'
layout: post
lang: it
description: Realizza un sensore di movimento PIR con ESP32, ESP8266 o Pico W. Confronto tra HC-SR501, HC-SR505 e AM312 (HC-SR312), con cablaggio, regolazione della sensibilità e codice per Alexa.
---

In questa sezione vediamo come realizzare un **sensore di movimento** PIR con **ESP32**, **ESP8266** o **Raspberry Pi Pico W** e come visualizzare poi i movimenti rilevati tramite **Alexa o SmartThings**.

### Prerequisiti : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. HC-SR501, HC-SR505, Mini AM312, HC-SR312 x 1.
3. Cavetti jumper.

| PIR       | Tensione di lavoro  | Tempo di ritardo | Tempo di blocco | Trigger       | Distanza
| --------- | -------          |-------     |-------        |-------        |-------
| HC-SR312  |2.7-12V           | 2 secondi  | 2 secondi     | Ripetibile    | 3-5 metri
| HC-SR505  |4.5-20V           | 2 secondi  | 2 secondi     | Ripetibile    | 3 metri
| HC-SR501  |4.5-20V           | Regolabile  | Regolabile    | Regolabile    | da 3 a 7 metri

### HC-SR501, HC-SR505 o AM312 (HC-SR312): quale scegliere?

L'HC-SR312 è il modulo PIR mini costruito attorno al sensore AM312, quindi i due nomi indicano lo stesso componente.

- **HC-SR501**: il modulo più grande e l'unico regolabile. Ha due potenziometri (sensibilità e tempo di ritardo) e un jumper per il trigger singolo o ripetibile. Sceglilo quando ti serve una portata maggiore o vuoi mettere a punto il comportamento. Richiede almeno 4,5 V, quindi alimentalo da 5V / VIN.
- **HC-SR505**: un modulo piccolo con impostazioni fisse. Non c'è nulla da regolare. Anche questo richiede almeno 4,5 V.
- **AM312 / HC-SR312**: il modulo più piccolo, anch'esso con impostazioni fisse. Funziona a partire da 2,7 V, quindi può essere alimentato direttamente dal pin **3.3V**. Per questo è la scelta migliore per le schede ESP32 / ESP8266 e per i progetti a batteria.

Tutti e tre hanno gli stessi tre pin: **VCC**, **OUT** e **GND**. L'ordine dei pin cambia da un modulo all'altro, quindi controlla le etichette sulla scheda prima di fare i collegamenti. Lo stesso codice funziona con tutti.

### Breve introduzione ai sensori di movimento PIR

I sensori di movimento a infrarossi passivi (PIR) rilevano la presenza di persone o animali misurando le variazioni della radiazione infrarossa. I sensori PIR funzionano rilevando la radiazione infrarossa emessa da tutti gli oggetti con una temperatura superiore allo zero assoluto. Quando una persona o un animale entra nel campo visivo di un sensore PIR, il sensore rileva una variazione nella quantità di radiazione infrarossa e attiva un allarme o un'altra uscita. I sensori PIR sono un modo versatile ed economico per rilevare il movimento. Sono facili da usare e si possono installare in molti punti diversi.

L'uscita del sensore di movimento PIR è:

- ``HIGH`` quando viene rilevato un movimento.
- ``LOW``  quando non viene rilevato alcun movimento.

Per ottenere misure accurate, **attendi che il sensore PIR si calibri correttamente: di solito servono da 10 a 60 secondi** dopo l'accensione.  
 
L'HC-SR501 ha impostazioni regolabili:

![Sinric Pro esp8266 HC-SR501 ]({{ site.github.url }}/public/img/sinric_pro_pir_sensor.png) 

###### Regolazione della sensibilità

- La distanza di rilevamento è compresa tra 3 e 7 metri.

- Ruotando in senso orario o verso destra - La sensibilità diminuisce. Tutto a destra: fino a 3 metri.

- Ruotando in senso antiorario o verso sinistra - La sensibilità aumenta. Tutto a sinistra: circa 7 metri.

###### Regolazione del tempo di ritardo

- Il tempo di ritardo definisce per quanto tempo l'uscita dell'HC-SR501 resta ``HIGH`` dopo il rilevamento di un movimento. Si può regolare da 1 secondo a circa 5 minuti.

- Ruotando in senso orario o verso destra - Il ritardo aumenta. Tutto a destra: fino a 5 minuti.

- Ruotando in senso antiorario o verso sinistra - Il ritardo diminuisce. Tutto a sinistra: circa 3 secondi.


###### Impostazione del jumper

- **Modalità a trigger singolo (L)**: attiva l'uscita per un solo movimento. Il potenziometro del tempo di ritardo determina per quanto tempo il pin resta ``HIGH``. Ogni ulteriore rilevamento di movimento è bloccato finché il pin non torna ``LOW``.

**Esempio**: il tempo di ritardo del sensore di movimento è impostato a 3 secondi, ma il sensore non può rilevare movimenti per circa 6 secondi dopo averne rilevato uno.

![Sinric Pro esp8266 PIR Single Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_single_trigger.png) 

- **Modalità a trigger multiplo (H)**: attiva l'uscita per una serie di movimenti. Il potenziometro del tempo di ritardo determina per quanto tempo il pin resta ``HIGH``. In modalità a trigger multiplo il tempo di ritardo viene azzerato a ogni movimento rilevato, quindi i rilevamenti successivi non vengono bloccati.
 
**Esempio**: il tempo di ritardo è di 3 secondi. Dopo il rilevamento di un movimento, il tempo di ritardo riparte. Il rilevamento resta comunque bloccato per 3 secondi dopo la scadenza del tempo di ritardo. Questa pausa di 3 secondi permette al sensore di riposare prima di ricominciare a rilevare il movimento.

![Sinric Pro esp8266 PIR Multiple Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_multi_trigger.png) 

### Cablaggio

![Sinric Pro esp8266 PIR wiring]({{ site.github.url }}/public/img/sinric_pro_pir_sensor_wiring.png) 


| MCU       | Pin PIR     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    5 (D1)    |
| Pico W    |    GP5  |

Verifichiamo che il sensore di movimento sia collegato correttamente e funzioni. 

```cpp
#if defined(ESP8266)
  #define SENSOR_PIN        D1
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

int newState;
int oldState;

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
  
  Serial.printf("Wait 10 secs for the PIR sensor to calibrate properly\r\n");
  delay(1000 * 10);
  oldState = digitalRead(SENSOR_PIN); // read the starting state
}

void loop() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Movement detected!");
    } else {
      Serial.println("Movement not detected!");
    }
    oldState = newState;
  }  
   delay(100);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/bc5a7152c02e4e692ca9ae6708fe6814)


Il Monitor seriale di Arduino IDE mostrerà i movimenti rilevati in questo modo:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-motion-sensor-demo.mp4" type="video/mp4">
</video>

 
### Passo 1 : Crea un nuovo dispositivo in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Motion Sensor**, la descrizione **My Motion Sensor** e seleziona il tipo di dispositivo **Motion Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Fai clic su **Next** per passare alla scheda Notifications

![Sinric Pro motion sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_motion_sensor_notifications.png)

Qui puoi impostare la soglia per ricevere una notifica push tramite l'app Sinric Pro quando viene rilevato un movimento durante il giorno (**Daytime**) o la notte (**Nighttime**). Usa Retrigger Time per impostare l'intervallo tra una notifica push e la successiva.

* Fai clic sulla scheda Others e poi su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

### Passo 2 : Connessione a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Puoi **generare il codice** con la funzione **Zero Code** oppure scriverlo da solo. Se non hai esperienza di programmazione, ti consigliamo di usare la funzione Zero Code del Portale per generare il codice, scaricarlo e caricarlo sulla scheda.

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
#include "SinricProMotionsensor.h" 

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define MOTION_SENSOR_ID  ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
 
#if defined(ESP8266)
  #define SENSOR_PIN        D1
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif 

int newState;
int oldState;

void handleMotionSensor() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Movement detected!");
    } else {
      Serial.println("Movement not detected!");
    }

    // newState == true (HIGH) : if motion has been detected 
    // newState == false (LOW): if no motion has been detected

    SinricProMotionsensor &myMotionsensor = SinricPro[MOTION_SENSOR_ID]; // get motion sensor device
    myMotionsensor.sendMotionEvent(newState);

    oldState = newState;
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
 
// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProMotionsensor &mySensor = SinricPro[MOTION_SENSOR_ID];
   
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  //SinricPro.restoreDeviceStates(true); // Uncomment to restore the last known state from the server.
  SinricPro.begin(APP_KEY, APP_SECRET);  
}

void setupMotionSensor() {
  pinMode(SENSOR_PIN, INPUT);
  Serial.printf("Wait 10 secs for the PIR sensor to calibrate properly\r\n");
  delay(1000 * 10);  
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  
  setupMotionSensor();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
  handleMotionSensor();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/f4fd3d769144689f15cfc80d783e8c94)

 
Ora dovresti poter vedere i movimenti tramite Alexa, SmartThings 
  
![Sinric Pro motions via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_contact_motion_home_alexa_smartthings.png)

tramite il Portale

![Sinric Pro Portal motion sensor]({{ site.github.url }}/public/img/sinric_pro_contact_motion_portal.png)

Tieni presente che Google Home non è supportato.

### Risoluzione dei problemi

1. Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).

 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di contatto per porte e finestre]({{ site.github.url }}/it/pages/tutorials/contact-sensors/contact.it.html)
- [Campanello smart]({{ site.github.url }}/it/pages/tutorials/doorbell/doorbell.it.html)
- [Inviare annunci ad Alexa]({{ site.github.url }}/it/pages/tutorials/general/how-to-send-announcements-to-alexa.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
