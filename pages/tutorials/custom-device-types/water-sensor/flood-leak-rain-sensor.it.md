---
title:  Sensore d'acqua (detto anche rilevatore di perdite, allagamento o pioggia)  per ESP8266, ESP32, Raspberry Pi Pico W per Alexa
layout: post
lang: it
description: Costruisci un sensore di perdite d'acqua, allagamento o pioggia con un ESP32, ESP8266 o Raspberry Pi Pico W. Controlla lo stato con Alexa e ricevi notifiche push.
---
 
In questo tutorial costruiamo un sensore d'acqua da collegare a un **ESP32**, **ESP8266** o **Raspberry Pi Pico W** e lo usiamo per rilevare perdite d'acqua, allagamenti o pioggia. Con **Amazon Alexa** puoi controllare lo stato del sensore d'acqua, chiedere informazioni e **ricevere notifiche push quando viene rilevata dell'acqua**.

![Sinric Pro water leak sensor]({{ site.github.url }}/public/img/sinricpro-water-sensor-intro.png)

### Prerequisiti : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Sensore d'acqua x 1.
3. Cavetti jumper.

### Breve introduzione al sensore d'acqua

Un rilevatore d'acqua, detto anche sensore d'acqua, è un dispositivo che rileva la presenza di acqua. I rilevatori d'acqua funzionano in modi diversi. Tra i tipi più comuni ci sono:

- **Rilevatori a conducibilità**: misurano la conducibilità elettrica dell'acqua. Quando il sensore entra in contatto con l'acqua, la conducibilità elettrica aumenta.

- **Rilevatori capacitivi**: misurano la capacità dell'acqua. Quando il sensore entra in contatto con l'acqua, la capacità aumenta.

- **Rilevatori ottici**: rilevano le variazioni dell'indice di rifrazione dell'acqua. Quando il sensore entra in contatto con l'acqua, l'indice di rifrazione cambia.
 
**Nota:**  i sensori d'acqua hanno una vita più breve perché sono esposti all'acqua. Se il sensore resta alimentato mentre è immerso, si corrode rapidamente. Per evitarlo, lo accenderemo solo al momento di effettuare le letture.
  
### Cablaggio del sensore d'acqua

Colleghiamo il sensore di livello dell'acqua.

![Sinric Pro water sensor sensor wiring]({{ site.github.url }}/public/img/sinricpro_water_sensor_wiring.png) 

| MCU       | Pin S                     |  Pin VCC  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   17      |
| ESP8266   |    A0                     |   D2      |
| Pico W    |    GP26 (ADC0)            |   6       |
 


**Nota:** su ESP32, l'ADC2 (GPIO04, GPIO02, GPIO15) è instabile quando è in uso il Wi-Fi.

### Lettura del sensore d'acqua

Verifichiamo che il sensore sia cablato correttamente e funzioni. 


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(SIGNAL_PIN);   // make a reading from sensor
  digitalWrite(POWER_PIN, LOW);         // turn off the sensor
  Serial.printf("value: %d\n", value);  // print reading
  delay(1000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/7d45a826ba02203ab8571b735add45c9)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-sensor-demo.mp4" type="video/mp4">
</video>

![sinric pro water sensor arduino readings]({{ site.github.url }}/public/img/sinricpro-water-sensor-test-readings.png) 

### Rilevare un allagamento


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

const int FLOOD_THRESHOLD = 100;

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(sPin);   // make a reading from sensor
  digitalWrite(vccPin, LOW);         // turn off the sensor
  
  if (value > FLOOD_THRESHOLD) {
    Serial.print("Flooding detected");
  }

  delay(1000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/aff71487783487cbfbdef4006eaab809)


### Rilevare il livello dell'acqua


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

const int SENSOR_MAX = 560;
const int SENSOR_MIN = 1;

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(sPin);   // make a reading from sensor
  digitalWrite(vccPin, LOW);         // turn off the sensor
  
  int waterLevelHeightInCm = map(value, SENSOR_MIN, SENSOR_MAX, 0, 5); // Map sensor value between 0..5 levels (1 cm = 1 level)
  Serial.printf("Water level: %d\n", waterLevelHeightInCm);  // print reading

  delay(1000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/a2dffb0f0c46585ed0b35aa902c2447e)


 
### Passo 1 : Connettiti a Sinric Pro 

#### Passo 1.1 : Crea un tipo di dispositivo personalizzato per il sensore d'acqua.

Sinric Pro non ha un tipo di dispositivo predefinito per il sensore d'acqua/allagamento, quindi ne creeremo uno personalizzato con la funzione Device Template, per vedere:

1. Se il seminterrato è allagato oppure no .

2. Il livello dell'acqua.

**Nota**: per evitare di creare l'intero modello puoi usare la funzione di importazione dei modelli di dispositivo descritta più sotto.

* [Accedi](https://portal.sinric.pro/devicetemplates/new) al tuo account Sinric Pro e vai su **Device Templates**

* Fai clic su **Add Device Template**. Inserisci **Flood Sensor** come nome e descrizione e seleziona **Flood Sensor** come tipo di dispositivo

![Sinric Pro water sensor device template basic info]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-basic-info.png) 

* Fai clic su **Capabilities**. 

Qui dobbiamo selezionare le funzioni del nostro sensore di umidità del terreno. Vogliamo sapere se il *terreno è bagnato o asciutto* e il *livello di umidità*. Trasciniamo quindi una capability **Range**, una **Mode** e una **Push Notification**.

![Sinric Pro custom device type for capacitive soil moisture sensor]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-set-template-drop-range-mode.png) 

- Che cos'è la capability Range?

  La capability Range serve a rappresentare un numero. Ad es.: la velocità attuale di un frullatore.

- Che cos'è la capability Mode?

  La capability Mode serve a rappresentare un valore scelto da un elenco di valori predefiniti. Ad es.: il programma di lavaggio in corso di una lavatrice.

- Che cos'è la capability Push Notification?

  La capability Notification permette di inviare un messaggio di notifica push dal codice.

Fai clic sul pulsante **Configure** e imposta le due capability come qui sotto.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode.png)  

Fai clic su **Save** per salvare.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode-configured.png)  

Fai clic su **Save** per salvare il modello.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-saved.png)  

Ora puoi vedere il modello appena creato.


## Importare un modello esistente?

Se non hai voglia di impostare tutti i valori dei Mode e del Range, puoi usare la funzione di importazione.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Incolla questo modello:


```json
{
  "name": "Flood Sensor",
  "description": "Flood Sensor",
  "deviceTypeId": "65335c897dc29736db4272d2",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Flooding",
        "nonControllable": true,
        "modeValues": [
          "Yes",
          "No"
        ]
      }
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 0,
        "maximumValue": 10,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": true
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/48649129dbed3021cda75a4d8ce94515)


* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).

* Inserisci il nome del dispositivo **Flood Sensor**, la descrizione **My Flood Sensor** e seleziona il tipo di dispositivo **Flood Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-new-device-info.png)

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


**FloodSensor.h**

```cpp
#ifndef _FLOODSENSOR_H_
#define _FLOODSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/RangeController.h>
#include <Capabilities/PushNotification.h>

class FloodSensor 
: public SinricProDevice
, public ModeController<FloodSensor>
, public RangeController<FloodSensor>
, public PushNotification<FloodSensor> {
  friend class ModeController<FloodSensor>;
  friend class RangeController<FloodSensor>;
  friend class PushNotification<FloodSensor>;
public:
  FloodSensor(const String &deviceId) : SinricProDevice(deviceId, "FloodSensor") {};
};

#endif
```

**sinricpro-flood-sensor.ino**

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
#include "FloodSensor.h"
#include <math.h>

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE         115200
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

FloodSensor &floodSensor = SinricPro[DEVICE_ID];

const int FLOOD_THRESHOLD = 100;
const int SENSOR_MAX = 560;
const int SENSOR_MIN = 1;

int waterSensorValue = 0;
int lastWaterSensorValue = 0;
String lastIsFloodingStr = "";

// ModeController
void updateMode(String mode) {
  floodSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// RangeController
void updateRangeValue(float value) {
  floodSensor.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  floodSensor.sendPushNotification(notification);
}

float floatMap(float x, float a, float b, float c, float d) {
  float f=x/(b-a)*(d-c)+c;
  return f;
} 

float floatRound(float in_value, int decimal_place) {
 float multiplier = powf( 10.0f, decimal_place );
 in_value = roundf( in_value * multiplier ) / multiplier;
 return in_value;
}

void handleWaterSensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  digitalWrite(vccPin, HIGH);     // turn on the power for sensor.
  delay(100);                     // wait 100ms
  waterSensorValue = analogRead(sPin); // make a reading from sensor
  digitalWrite(vccPin, LOW);      // turn off the sensor

  Serial.printf("Water sensor value: %d\r\n", waterSensorValue); 
  
  if (waterSensorValue == lastWaterSensorValue) {
    Serial.printf("Water sensor did not changed. do nothing...!\r\n");
    return; 
  }

  /* determine whether flooding */
  String isFloodingStr = "";
  if(waterSensorValue > FLOOD_THRESHOLD) {
    isFloodingStr = "Yes"; // NOTE: must be Yes, No. This is from modes list in template.
  } else {
    isFloodingStr = "No";
  }

  /* Update Flooding label if changed */
  if(lastIsFloodingStr != isFloodingStr) {
    lastIsFloodingStr = isFloodingStr;
    updateMode(isFloodingStr);
  }
  
  delay(500);

  /* update Water Level label */
  float sensorValueToInches = floatMap(waterSensorValue, SENSOR_MIN, SENSOR_MAX, 0, 1.9); /* map the sensor value to inches */
  float roundedSensorValueToInches = floatRound(sensorValueToInches, 2); /* round the sensor value to 1 decimal point */
  Serial.printf("Water level height in inches: %f\r\n", roundedSensorValueToInches);
  updateRangeValue(roundedSensorValueToInches); 


  /* send a push notification when flooding is detected! */
  if(waterSensorValue > FLOOD_THRESHOLD) {
    sendPushNotification("Flooding detected in the basement!");
  } 

  lastWaterSensorValue = waterSensorValue;  // save to compare next time.
}


/********* 
 * Setup *
 *********/
void setupWaterSensor() {
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void setupSinricPro() {
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
  setupWaterSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleWaterSensor();
  SinricPro.handle();  
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/6657119c2750c4cc662b674dba04a651)

 
Ora dovresti vedere lo stato di allagamento e il livello dell'acqua in Alexa e nell'app Sinric Pro

Alexa, qual è l'allagamento (nome del mode) di Flood Sensor (nome del dispositivo)

Alexa, qual è il livello dell'acqua (nome del range) di Flood Sensor (nome del dispositivo)


![Sinric Pro water sensor in the Alexa app]({{ site.github.url }}/public/img/sinricpro-water-sensor-alexa.jpg)
 
![Sinric Pro water sensor in the Portal]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-portal.png)
 
### Passo 3 : Annunci vocali!

✅ Come funziona:

1️⃣ Aggiungi uno Switch in SinricPro (il tuo trigger segreto!)

2️⃣ Crea una routine Alexa che pronuncia il tuo messaggio, ad esempio "Il seminterrato si sta allagando!", quando lo Switch viene acceso

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
- [Livello di un serbatoio d'acqua con un sensore a ultrasuoni HC-SR04]({{ site.github.url }}/it/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.it.html)
- [Sensore capacitivo di umidità del terreno (HW-390)]({{ site.github.url }}/it/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.it.html)
- [Sensore di qualità dell'aria MQ135]({{ site.github.url }}/it/pages/tutorials/air-quality-sensors/mq135.it.html)

> Questo documento è open source. Hai trovato un errore? Crea una [issue](https://github.com/sinricpro/help-docs)
