---
title: Indicador de nivel de agua (depósito de agua) con sensor ultrasónico (HC-SR04) para ESP8266, ESP32 y Raspberry Pi Pico W con Alexa
layout: post
lang: es
description: Construye un indicador de nivel para un depósito de agua con un sensor ultrasónico HC-SR04 y un ESP32, ESP8266 o Raspberry Pi Pico W. Cableado, código y Alexa.
---
 
En esta parte te guiamos para construir un **indicador de nivel de agua (también conocido como indicador de depósito de agua)** con un **sensor ultrasónico** que se puede conectar a un **ESP32, ESP8266 o Raspberry Pi Pico W**. Una vez configurado, podrás medir el nivel de agua con Amazon Alexa, preguntarle a Alexa por él, supervisarlo desde la app Sinric Pro y *recibir una notificación push cuando el nivel de agua sea bajo*.


![Sinric Pro HC-SR04 Ultrasonic Sensor ]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-intro.png)

### Requisitos previos : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Sensor ultrasónico (HC-SR04) x 1.
3. Planta con maceta x 1.
4. Cables jumper.

 

### Breve introducción al sensor ultrasónico
Los sensores ultrasónicos son sensores de bajo coste y fáciles de usar que permiten medir distancias. Funcionan emitiendo una ráfaga de ultrasonidos y **midiendo el tiempo que tarda en volver el eco**. La distancia al objeto se calcula después a partir de la velocidad del sonido.  

Se alimenta con una fuente de 5 V CC y tiene cuatro pines: **VCC, GND, TRIG y ECHO**. Una vez conectado el sensor, puedes usarlo para medir distancias enviando un pulso al pin TRIG y midiendo el tiempo que tarda el pin ECHO en pasar a nivel alto. La distancia al objeto se puede calcular entonces con la siguiente fórmula:

> distancia = (tiempo * velocidad del sonido) / 2

donde:

- `distance` (distancia) se expresa en centímetros.
- `time` (tiempo) se expresa en microsegundos.
- `speed of sound` (velocidad del sonido) es de 343 metros por segundo. 
 
Según las notas del fabricante, el sensor HC-SR04 **funciona mejor** entre 2 cm y 400 cm (1" - 13 ft) dentro de un cono de 30 grados.  

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-practical-test.png) 

### Cableado del sensor ultrasónico

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-wiring.png) 


| Pin del HC-SR04 | ESP8266 | ESP32    | Pico W |
| --------- | ------- | -------    | -------    |
| VCC       |    5V   | 5V         | 5V         |
| GND       |    GND  | GND        | GND        |
| TRIG      |    12 (D6)  | GPIO 5  | 15        |
| ECHO      |    14 (D5)  | GPIO 18 | 14        |


Vamos a comprobar que el sensor está bien cableado y funciona. 
 

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/83febb46592b067c79a0dd55136405a6)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-test-readings.png) 

Ahora vamos a medir el nivel de agua como porcentaje. 
 

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/175f772413b433241acaca6234257cf2)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-water-tank-measurements-as-precentage.png) 
 
### Paso 1 : Conéctate a Sinric Pro 

#### Paso 1.1 : Crea un tipo de dispositivo personalizado para el indicador de nivel de agua.

Sinric Pro no tiene un tipo de dispositivo integrado para un indicador de nivel de agua, así que vamos a crear un tipo de dispositivo personalizado que lo muestre mediante la función Device Template.

**Nota**: Puedes usar la función de importación de plantillas de dispositivo que se menciona más abajo para no tener que crear la plantilla completa.

* [Inicia sesión](https://portal.sinric.pro/devicetemplates/new) en tu cuenta de Sinric Pro y ve a **Device Templates**

* Haz clic en **Add Device Template**. Introduce **Water Level Indicator** como nombre y descripción y selecciona **Water Tank** como tipo de dispositivo

![sinricpro water tank new device template basic info]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-basic-info.png) 

* Haz clic en **Capabilities**. 

Aquí debemos seleccionar las funciones de nuestro sensor. Queremos conocer el *nivel de agua* como porcentaje, así que arrastra una capacidad **Range** y una **Push Notification**.

![sinricpro water tank new device template capabilities]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-capabilities.png) 

- ¿Qué es la capacidad Range?

  La capacidad Range sirve para representar un número, p. ej.: la velocidad actual de una batidora.

- ¿Qué es la capacidad Push Notification?

  La capacidad Notification permite enviar un mensaje de notificación push desde el código.

Haz clic en el botón **Configure** y configura las dos capacidades como se muestra a continuación.

![sinricpro water tank device template range capability]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-range-capability.png)  

Haz clic en **Save** para guardar.

Haz clic en **Save** para guardar la plantilla.

Ahora puedes ver la plantilla que acabamos de crear.


## ¿Importar una plantilla existente?

Si te da pereza, puedes usar la función de importación.

![Sinric Pro import template json]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Pega esta plantilla:

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/a04eef3577a55be6df4ad098ec8df031)


* Abre el menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).

* Escribe el nombre del dispositivo **Water Tank**, la descripción **Water Tank** y selecciona el tipo de dispositivo **Water Level Indicator**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-from-template.png)

* Haz clic en la pestaña Others y luego en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret**. ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

* Haz clic en **Code Generator** para generar el código. Haz clic en **Download** para descargarlo.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-code-download.png)
 

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código completo


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/206044afbcaa9aca36fc6538f639688a)


 
Ahora deberías poder ver el nivel de agua del depósito con Alexa y la app Sinric Pro

Alexa, ¿cuál es el water level (nombre del rango) de water tank (nombre del dispositivo)?

![Sinric Pro Alexa HC-SR04 sensor]({{ site.github.url }}/public/img/sinricpro-water-tank-alexa.jpg)
 
![Sinric Pro Alexa HC-SR04 portal]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-portal.png)

![Sinric Pro water tank app]({{ site.github.url }}/public/img/sinricpro-water-tank-hc-sr04.png)

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-tank.mp4" type="video/mp4">
</video>

### Paso 3 : Haz configurables desde la interfaz las alturas de depósito lleno y vacío

#### 3.1 Actualiza la plantilla de dispositivo

Para que las alturas de depósito lleno y vacío se puedan configurar desde la interfaz, tenemos que volver a la plantilla de dispositivo personalizada y añadir dos Range Controller más, **Full Tank Height** y **Empty Tank Height**, como se muestra a continuación.

![Full Empty ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-empty-tank-height.png)

La plantilla de dispositivo completa queda así

![Full Template ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-template.png)

Esta es la plantilla con las alturas de lleno y vacío. Puedes importarla en la sección Device Template.


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/0ca54644b4abbd05c164e2bdd3dcf052)


#### 3.2 Código completo


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/2b20b0086bb0a6de500c08407acd3943)


![Tank control with Alexa and SinricPro App ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-alexa-sinricpro.jpg)

Eso es todo.

### Solución de problemas
1. Google Home y SmartThings no son compatibles.

2. Consulta nuestra página [Troubleshooting]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más detalles.
 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Sensor de fugas de agua, inundación y lluvia]({{ site.github.url }}/es/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.es.html)
- [Sensor capacitivo de humedad del suelo (HW-390)]({{ site.github.url }}/es/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)
