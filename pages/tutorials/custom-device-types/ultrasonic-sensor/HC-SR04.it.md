---
title: Indicatore di livello dell'acqua (serbatoio) con sensore a ultrasuoni (HC-SR04) per ESP8266, ESP32, Raspberry Pi Pico W e Alexa
layout: post
lang: it
description: Costruisci un indicatore di livello per serbatoi d'acqua con un sensore a ultrasuoni HC-SR04 e un ESP32, ESP8266 o Raspberry Pi Pico W. Cablaggio, codice e Alexa.
---
 
In questa parte ti guidiamo nella costruzione di un **indicatore di livello dell'acqua (detto anche indicatore per serbatoi)** con un **sensore a ultrasuoni** collegabile a un **ESP32, ESP8266 o Raspberry Pi Pico W**. Una volta configurato, potrai misurare il livello dell'acqua con Amazon Alexa, chiedere informazioni ad Alexa, tenerlo sotto controllo dall'app Sinric Pro e *ricevere una notifica push quando il livello dell'acqua è basso*.


![Sinric Pro HC-SR04 Ultrasonic Sensor ]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-intro.png)

### Prerequisiti : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Sensore a ultrasuoni (HC-SR04) x 1.
3. Pianta in vaso x 1.
4. Cavetti jumper.

 

### Breve introduzione al sensore a ultrasuoni
I sensori a ultrasuoni sono sensori economici e facili da usare, in grado di misurare le distanze. Funzionano emettendo un impulso di ultrasuoni e **misurando il tempo che l'eco impiega a tornare**. La distanza dall'oggetto viene poi calcolata in base alla velocità del suono.  

Il sensore è alimentato a 5V DC e ha quattro pin: **VCC, GND, TRIG ed ECHO**. Una volta collegato, puoi usarlo per misurare la distanza inviando un impulso al pin TRIG e misurando il tempo che il pin ECHO impiega a passare a livello alto. La distanza dall'oggetto si calcola quindi con la formula seguente:

> distance = (time * speed of sound) / 2

dove:

- `distance` è in centimetri.
- `time` è in microsecondi.
- `speed of sound` è 343 metri al secondo. 
 
Secondo le note del produttore, il sensore HC-SR04 **funziona al meglio** tra 2 cm e 400 cm (1" - 13ft) entro un cono di 30 gradi.  

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-practical-test.png) 

### Cablaggio del sensore a ultrasuoni

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-wiring.png) 


| Pin HC-SR04 | ESP8266 | ESP32    | Pico W |
| --------- | ------- | -------    | -------    |
| VCC       |    5V   | 5V         | 5V         |
| GND       |    GND  | GND        | GND        |
| TRIG      |    12 (D6)  | GPIO 5  | 15        |
| ECHO      |    14 (D5)  | GPIO 18 | 14        |


Verifichiamo che il sensore sia collegato correttamente e funzioni. 
 

```cpp
#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif
 
long duration;
float distanceInCm; 

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);

  // convert duration to CM 
  distanceInCm = duration/29 / 2;

  // inches 
  // distanceInInches = duration / 74 / 2;

  Serial.print("Distance (cm): ");
  Serial.println(distanceInCm); 
  
  delay(1000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/83febb46592b067c79a0dd55136405a6)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-test-readings.png) 

Proviamo ora a misurare il livello dell'acqua in percentuale. 
 

```cpp
#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif
 
long duration;
float distanceInCm; 
int waterLevelAsPer;

const int EMPTY_TANK_HEIGHT = 150; // Height when the tank is empty
const int FULL_TANK_HEIGHT  =  25; // Height when the tank is full

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   // Take a measurement
  distanceInCm = duration/29 / 2; // Convert to CM
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); // Convert to precentage value based on tank height
 
  // In inches ?
  // distanceInInches = duration / 74 / 2;

  Serial.print("As a precentage: ");
  Serial.println(waterLevelAsPer); 
  
  delay(1000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/175f772413b433241acaca6234257cf2)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-water-tank-measurements-as-precentage.png) 
 
### Passo 1 : Collegati a Sinric Pro 

#### Passo 1.1 : Creare un tipo di dispositivo personalizzato per l'indicatore di livello dell'acqua.

Sinric Pro non ha un tipo di dispositivo predefinito per l'indicatore di livello dell'acqua, quindi ne creeremo uno personalizzato con la funzione Device Template.

**Nota**: per evitare di creare l'intero template puoi usare la funzione di importazione dei template di dispositivo descritta più sotto.

* [Accedi](https://portal.sinric.pro/devicetemplates/new) al tuo account Sinric Pro e vai su **Device Templates**

* Fai clic su **Add Device Template**. Inserisci **Water Level Indicator** come nome e descrizione e seleziona **Water Tank** come tipo di dispositivo

![sinricpro water tank new device template basic info]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-basic-info.png) 

* Fai clic su **Capabilities**. 

Qui dobbiamo scegliere le funzionalità del nostro sensore. Vogliamo conoscere il *livello dell'acqua* in percentuale, quindi trasciniamo una capability **Range** e una **Push Notification**.

![sinricpro water tank new device template capabilities]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-capabilities.png) 

- Che cos'è la capability Range?

  La capability Range serve a rappresentare un numero, ad esempio la velocità attuale di un frullatore.

- Che cos'è la capability Push Notification?

  La capability Notification permette di inviare un messaggio di notifica push dal codice.

Fai clic sul pulsante **Configure** e imposta le due capability come qui sotto.

![sinricpro water tank device template range capability]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-range-capability.png)  

Fai clic su **Save** per salvare.

Fai clic su **Save** per salvare il template.

Ora puoi vedere il template appena creato.


## Importare un template esistente?

Se non hai voglia di farlo a mano, puoi usare la funzione di importazione.

![Sinric Pro import template json]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Incolla questo template:

```json
{
  "name": "Water Level Indicator",
  "description": "Water Level Indicator",
  "deviceTypeId": "621b9648f728ec974aac62f2",
  "capabilities": [
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 1,
        "maximumValue": 100,
        "precision": 1,
        "unitOfMeasure": "5ffbeefbfaa11451974c6bbd",
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

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/a04eef3577a55be6df4ad098ec8df031)


* Apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).

* Inserisci il nome del dispositivo **Water Tank**, la descrizione **Water Tank** e seleziona il tipo di dispositivo **Water Level Indicator**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-from-template.png)

* Apri la scheda Others e fai clic su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

* Fai clic su **Code Generator** per generare il codice. Fai clic su **Download** per scaricarlo.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-code-download.png)
 

### Passo 2 : Collegati a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Codice completo


**sinricpro-water-level-monitor.ino**

```cpp
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
#include "WaterLevelIndicator.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE  115200
#define EVENT_WAIT_TIME   60000 // send event every 60 seconds

#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif

const int EMPTY_TANK_HEIGHT = 150; // Height when the tank is empty
const int FULL_TANK_HEIGHT  =  25; // Height when the tank is full

WaterLevelIndicator &waterLevelIndicator = SinricPro[DEVICE_ID];

long duration;
float distanceInCm; 
int waterLevelAsPer;
int lastWaterLevelAsPer;
float lastDistanceInCm;

// RangeController
void updateRangeValue(int value) {
  waterLevelIndicator.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  waterLevelIndicator.sendPushNotification(notification);
}

void handleSensor() {
   if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return; // Wait untill 1 min
  last_millis = current_millis;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   
  distanceInCm = duration/29 / 2;
  
  if(distanceInCm <= 0) { 
    Serial.printf("Invalid reading: %f..\r\n", distanceInCm); 
    return;
  }
  
  if(lastDistanceInCm == distanceInCm) { 
    Serial.printf("Water level did not changed. do nothing...!\r\n");
    return;
  }
  
  int change = abs(lastDistanceInCm - distanceInCm);
  if(change < 2) {
    Serial.println("Too small change in water level (waves?). Ignore...");
    return;
  }
  
  lastDistanceInCm = distanceInCm;
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); 
  waterLevelAsPer = constrain(waterLevelAsPer, 1, 100);
  
  Serial.printf("Distance (cm): %f. %d%%\r\n", distanceInCm, waterLevelAsPer); 
  
  /* Update water level on server */  
  updateRangeValue(waterLevelAsPer);  

  /* Send a push notification if the water level is too low! */
  if(waterLevelAsPer < 5) { 
    sendPushNotification("Water level is too low!");
  } 
}

 

/********* 
 * Setup *
 *********/

void setupSensor() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
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
  setupSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleSensor();
  SinricPro.handle();
}
```

**WaterLevelIndicator.h**

```cpp
#ifndef _WATERLEVELINDICATOR_H_
#define _WATERLEVELINDICATOR_H_

#include <SinricProDevice.h>
#include <Capabilities/RangeController.h>
#include <Capabilities/PushNotification.h>

class WaterLevelIndicator 
: public SinricProDevice
, public RangeController<WaterLevelIndicator>
, public PushNotification<WaterLevelIndicator> {
  friend class RangeController<WaterLevelIndicator>;
  friend class PushNotification<WaterLevelIndicator>;
public:
  WaterLevelIndicator(const String &deviceId) : SinricProDevice(deviceId, "WaterLevelIndicator") {};
};

#endif
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/206044afbcaa9aca36fc6538f639688a)


 
Ora dovresti poter vedere il livello dell'acqua del serbatoio tramite Alexa e l'app Sinric Pro

Alexa, qual è il water level (nome del range) di water tank (nome del dispositivo)

![Sinric Pro Alexa HC-SR04 sensor]({{ site.github.url }}/public/img/sinricpro-water-tank-alexa.jpg)
 
![Sinric Pro Alexa HC-SR04 portal]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-portal.png)

![Sinric Pro water tank app]({{ site.github.url }}/public/img/sinricpro-water-tank-hc-sr04.png)

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-tank.mp4" type="video/mp4">
</video>

### Passo 3 : Rendere configurabili dall'interfaccia le altezze di serbatoio pieno e vuoto

#### 3.1 Aggiorna il template di dispositivo

Per rendere configurabili dall'interfaccia le altezze di serbatoio pieno e vuoto, dobbiamo tornare al template di dispositivo personalizzato e aggiungere altri due Range Controller, **Full Tank Height** ed **Empty Tank Height**, come qui sotto.

![Full Empty ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-empty-tank-height.png)

Il template di dispositivo completo si presenta così

![Full Template ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-template.png)

Ecco il template con le altezze di pieno e vuoto. Puoi importarlo nella sezione Device Template.


```json
{
  "name": "Water Level Indicator",
  "description": "Water Level Indicator",
  "deviceTypeId": "621b9648f728ec974aac62f2",
  "capabilities": [
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 1,
        "maximumValue": 100,
        "precision": 1,
        "unitOfMeasure": "5ffbeefbfaa11451974c6bbd",
        "presets": [],
        "nonControllable": true
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance2",
        "locale": "en-US",
        "rangeName": "Empty Tank Height",
        "minimumValue": 1,
        "maximumValue": 200,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": false
      }
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance3",
        "locale": "en-US",
        "rangeName": "Full Tank Height",
        "minimumValue": 1,
        "maximumValue": 200,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": false
      }
    }
  ]
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/0ca54644b4abbd05c164e2bdd3dcf052)


#### 3.2 Codice completo


```cpp
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
#include "WaterLevelIndicator.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE  115200
#define EVENT_WAIT_TIME   60000 // send event every 60 seconds

#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif

int EMPTY_TANK_HEIGHT = 150; // Variable for height when the tank is empty
int FULL_TANK_HEIGHT  =  25; // Variable for height when the tank is full

WaterLevelIndicator &waterLevelIndicator = SinricPro[DEVICE_ID];

long duration;
float distanceInCm; 
int waterLevelAsPer;
int lastWaterLevelAsPer;
float lastDistanceInCm;

// RangeController
void updateRangeValue(int value) {
  waterLevelIndicator.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  waterLevelIndicator.sendPushNotification(notification);
}

// RangeController

// Below function will trigger when you change the sliders
bool onRangeValue(const String &deviceId, const String& instance, int &rangeValue) {
  if(instance == "rangeInstance2") {
    EMPTY_TANK_HEIGHT = rangeValue;
    Serial.printf("Empty tank height changed to %d\r\n", rangeValue);
  } else if(instance == "rangeInstance3") { 
    FULL_TANK_HEIGHT = rangeValue;
    Serial.printf("Full tank height changed to %d\r\n", rangeValue);
  }
  
  return true;
}

bool onAdjustRangeValue(const String &deviceId, const String& instance, int &valueDelta) {
  if(instance == "rangeInstance2") {
    EMPTY_TANK_HEIGHT += valueDelta;
    Serial.printf("Empty tank height adjusted by %d\r\n", valueDelta);
  } else if(instance == "rangeInstance3") { 
    FULL_TANK_HEIGHT += valueDelta;
    Serial.printf("Full tank height adjusted by %d\r\n", valueDelta);
  }
  
  return true;
}

void handleSensor() {
   if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return; // Wait untill 1 min
  last_millis = current_millis;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   
  distanceInCm = duration/29 / 2;
  
  if(distanceInCm <= 0) { 
    Serial.printf("Invalid reading: %f..\r\n", distanceInCm); 
    return;
  }
  
  if(lastDistanceInCm == distanceInCm) { 
    Serial.printf("Water level did not changed. do nothing...!\r\n");
    return;
  }
  
  int change = abs(lastDistanceInCm - distanceInCm);
  if(change < 2) {
    Serial.println("Too small change in water level (waves?). Ignore...");
    return;
  }
  
  lastDistanceInCm = distanceInCm;
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); 
  waterLevelAsPer = constrain(waterLevelAsPer, 1, 100);
  
  Serial.printf("Distance (cm): %f. %d%%\r\n", distanceInCm, waterLevelAsPer); 
  
  /* Update water level on server */  
  updateRangeValue(waterLevelAsPer);  

  /* Send a push notification if the water level is too low! */
  if(waterLevelAsPer < 5) { 
    sendPushNotification("Water level is too low!");
  } 
}

 

/********* 
 * Setup *
 *********/

void setupSensor() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void setupSinricPro() {
  // RangeController
  
  // setup Empty tank slider
  waterLevelIndicator.onRangeValue("rangeInstance2", onRangeValue);
  waterLevelIndicator.onAdjustRangeValue("rangeInstance2", onAdjustRangeValue);

  // Setup Full tank slider.
  waterLevelIndicator.onRangeValue("rangeInstance3", onRangeValue);
  waterLevelIndicator.onAdjustRangeValue("rangeInstance3", onAdjustRangeValue);

  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
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
  setupSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleSensor();
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/2b20b0086bb0a6de500c08407acd3943)


![Tank control with Alexa and SinricPro App ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-alexa-sinricpro.jpg)

Tutto qui.

### Risoluzione dei problemi
1. Google Home e SmartThings non sono supportati.

2. Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).
 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di perdite d'acqua, allagamento e pioggia]({{ site.github.url }}/it/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.it.html)
- [Sensore capacitivo di umidità del terreno (HW-390)]({{ site.github.url }}/it/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
