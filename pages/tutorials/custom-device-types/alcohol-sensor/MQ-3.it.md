---
title:  Come costruire un sensore di gas per rilevare alcol, etanolo e fumo nell'aria con un MQ-3 e un ESP32, ESP8266 o Raspberry Pi Pico W per Alexa
layout: post
lang: it
description: Costruisci un sensore di gas MQ-3 con un ESP32, ESP8266 o Raspberry Pi Pico W per rilevare alcol, etanolo e fumo, con Alexa e notifiche push.
---

In questa sezione ti guidiamo nella costruzione di un sensore di gas con un **ESP32**, **Raspberry Pi Pico W** o **ESP8266**. Potrai poi monitorare la concentrazione di alcol nell'aria tramite **Amazon Alexa** e **ricevere notifiche push**  nell'app Sinric Pro quando il sensore rileva un determinato livello.

### Prerequisiti : 

1. ESP32, ESP8266 x 1.
2. MQ-3 x 1.
3. Cavetti jumper.

![Sinric Pro MQ-3 alcohol gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-intro.jpg)

### Breve introduzione all'MQ-3

L'MQ-3 è un sensore di gas a semiconduttore usato in svariate applicazioni per rilevare la concentrazione di alcol nell'aria. È un sensore economico, molto sensibile e facile da usare. L'MQ-3 si basa sul principio di rilevamento dei gas tramite il semiconduttore biossido di stagno (SnO2). Quando nell'aria sono presenti molecole di alcol, queste vengono adsorbite sulla superficie dell'SnO2. L'adsorbimento fa variare la conducibilità dell'SnO2, e questa variazione può essere misurata come segnale elettrico. L'MQ-3 è sensibile a un'ampia gamma di concentrazioni di alcol, da 0.05 ppm a 5000 ppm. È sensibile anche ad altri gas, come ammoniaca, benzene e toluene, ma soprattutto all'alcol.

Il sensore MQ3 richiede un'alimentazione a 5V e consuma circa 800mW. L'uscita digitale può essere collegata a un ESP32, ESP8266 o Pico W per misurare la concentrazione di alcol.

**Come si calibra il sensore ?**

Lascialo alimentato per 24-48 ore per il rodaggio e la stabilizzazione.

Scheda tecnica: [MQ-3](https://www.sparkfun.com/datasheets/Sensors/MQ-3.pdf)

### Cablaggio

![Sinric Pro esp8266 MQ-3 wiring]({{ site.github.url }}/public/img/sinricpro_mq3-wiring-diagram.png) 


| MCU       | Pin A0                    |  Pin VCC  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   5V      |
| ESP8266   |    A0                     |   5V/VIN  |
| Pico W    |    GP26 (ADC0)            |   5V      |
 


**Nota:** su ESP32, l'ADC2 (GPIO04, GPIO02, GPIO15) è instabile quando è in uso il Wi-Fi.

Verifichiamo che il sensore sia cablato correttamente e funzioni. 


```cpp
#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

int sensorVal;

void setup() {
 Serial.begin(9600);
 Serial.println("warming up for 20 seconds ..!");
 delay(20000);
}

void loop() {
 sensorVal = analogRead(adcPin);
 Serial.printf("value: %d\r\n", sensorVal);
 delay(2000); // delay 2s
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/580e05d98109e36f6b4ace84bded1c7b)


Lettura senza esposizione all'alcol (circa 760):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-reading.png)

Con esposizione a Jack Daniel's Single Barrel Tennessee Whiskey (circa 850):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-jack-daniels-reading.png)

 
### Passo 1 : Connettiti a Sinric Pro 

#### Passo 1.1 : Crea un tipo di dispositivo personalizzato per il sensore di gas.

Sinric Pro non ha un tipo di dispositivo predefinito per il sensore di gas, quindi ne creeremo uno personalizzato con la funzione Device Template.

1. Alcol rilevato/non rilevato. 

**Nota**: per evitare di creare l'intero modello puoi usare la funzione di importazione dei modelli di dispositivo descritta più sotto.

* [Accedi](https://portal.sinric.pro/devicetemplates/new) al tuo account Sinric Pro e vai su **Device Templates**

* Fai clic su **Add Device Template**. Inserisci **Gas Sensor** come nome e descrizione e seleziona **Gas Sensor** come tipo di dispositivo

![Sinric Pro gas ensor device template]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-basic-info.png) 

* Fai clic su **Capabilities**. 

Qui dobbiamo selezionare le funzioni del nostro sensore di gas. Vogliamo sapere se l'*alcol* è *rilevato o non rilevato*. Trasciniamo quindi una capability **Mode** e una **Push Notification**.

![Sinric Pro custom device type for gas sensor]({{ site.github.url }}/public/img/gas-sensor-set-template-drop-range-mode.png) 

- Che cos'è la capability Mode?

  La capability Mode serve a rappresentare un valore scelto da un elenco di valori predefiniti. Ad es.: il programma di lavaggio in corso di una lavatrice.

- Che cos'è la capability Push Notification?

  La capability Notification permette di inviare un messaggio di notifica push dal codice.

Fai clic sul pulsante **Configure** e imposta le due capability come qui sotto.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-mode.png)  

Fai clic su **Save** per salvare.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-template-range-and-mode-configured.png)  

Fai clic su **Save** per salvare il modello.

Ora puoi vedere il modello appena creato.


## Importare un modello esistente?

Se non hai voglia di impostare tutti i valori dei Mode, puoi usare la funzione di importazione.

![Sinric Pro gas sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Incolla questo modello:


```json
{
  "name": "Gas Sensor",
  "description": "Gas Sensor",
  "deviceTypeId": "654d7ef928f14e9ac82ad57d",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Alcohol",
        "nonControllable": true,
        "modeValues": [
          "Detected",
          "Not-Detected"
        ]
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/9fdaaaa176a83414961756cf276b82d5)


* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).

* Inserisci il nome del dispositivo **Gas Sensor**, la descrizione **Gas Sensor** e seleziona il tipo di dispositivo **Gas Sensor** da **Your Device Templates**.


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-new-device-info.png)

* Fai clic sulla scheda Others e poi su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret**. ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI!***

* Fai clic su **Code Generator** per generare il codice. Fai clic su **Download** per scaricarlo.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Passo 2 : Connettiti a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro 

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 

#### 2.2 Codice completo


**GasSensor.h**

```cpp
#ifndef _GASSENSOR_H_
#define _GASSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/PushNotification.h>

class GasSensor 
: public SinricProDevice
, public ModeController<GasSensor>
, public PushNotification<GasSensor> {
  friend class ModeController<GasSensor>;
  friend class PushNotification<GasSensor>;
public:
  GasSensor(const String &deviceId) : SinricProDevice(deviceId, "GasSensor") {};
};

#endif
```

**sinricpro-mq4-sensor.ino**

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
#include "GasSensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.

#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define DEVICE_ID         ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

const int GAS_DETECTED_THRESHOLD = 850;       // Change accordingly

GasSensor &gasSensor = SinricPro[DEVICE_ID];
int sensorVal;
String sensorState = "";
String lastSensorState = "";

// ModeController
void updateMode(String mode) {
  gasSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// PushNotificationController
void sendPushNotification(String notification) {
  gasSensor.sendPushNotification(notification);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

 void handleM3Sensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  sensorVal = analogRead(adcPin);
  Serial.printf("Sensor value: %d\r\n", sensorVal); 

  if (sensorVal > GAS_DETECTED_THRESHOLD) { // "Detected" or "Not-Detected" (from ModeController mode values)
    sensorState = "Detected"; 
  } else {
    sensorState = "Not-Detected";
  }

  if(sensorState != lastSensorState) {
    /* update server with "detected" / "Not-Detected" status */
    updateMode(sensorState); 

    /* send a push notification when gas detected */
    if(sensorState == "Detected") {
      sendPushNotification("Gas Detected!!!");
    }    
  } 

  lastSensorState = sensorState;  // save to compare next time.
}

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
  handleM3Sensor();
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/e9d05233bc97f29a403a101810e36795)

 
Ora dovresti vedere lo stato di rilevamento dell'alcol in Alexa e nell'app Sinric Pro

Alexa, qual è l'alcol (nome del mode) di Gas Sensor (nome del dispositivo)
 

![Sinric Pro Alexa gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-alexa.jpg)
 
![Sinric Pro Portal gas sensor portal]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-portal.png)
 
 ### Passo 3 : Annunci vocali!

✅ Come funziona:

1️⃣ Aggiungi uno Switch in SinricPro (il tuo trigger segreto!)

2️⃣ Crea una routine Alexa che pronuncia il tuo messaggio, ad esempio "Il sensore di gas ha rilevato del gas!", quando lo Switch viene acceso

3️⃣ Dal tuo codice, invia un evento di stato di alimentazione per accendere quello Switch

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
```

### Risoluzione dei problemi
1. Google Home e SmartThings non sono supportati.

2. Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).
 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di qualità dell'aria MQ135]({{ site.github.url }}/it/pages/tutorials/air-quality-sensors/mq135.it.html)
- [Sensore capacitivo di umidità del terreno (HW-390)]({{ site.github.url }}/it/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.it.html)
- [Sensore di perdite d'acqua, allagamento e pioggia]({{ site.github.url }}/it/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.it.html)

> Questo documento è open source. Hai trovato un errore? Crea una [issue](https://github.com/sinricpro/help-docs)