---
title:  Sensor de agua (también conocido como detector de fuga de agua, inundación o lluvia) para ESP8266, ESP32, Raspberry Pi Pico W para Alexa
layout: post
lang: es
description: Construye un sensor de fuga de agua, inundación o lluvia con un ESP32, ESP8266 o Raspberry Pi Pico W. Consulta el estado con Alexa y recibe notificaciones push.
---
 
En este tutorial construimos un sensor de agua que se puede conectar a un **ESP32**, **ESP8266** o **Raspberry Pi Pico W** y usarlo para detectar fugas de agua, inundaciones o lluvia. Con **Amazon Alexa**, puedes comprobar el estado de tu sensor de agua, pedir información sobre él y **recibir notificaciones push cuando se detecte agua**.

![Sinric Pro water leak sensor]({{ site.github.url }}/public/img/sinricpro-water-sensor-intro.png)

### Requisitos previos : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Sensor de agua x 1.
3. Cables jumper.

### Introducción rápida al sensor de agua

Un detector de agua, también conocido como sensor de agua, es un dispositivo que detecta la presencia de agua. Los detectores de agua funcionan de distintas formas. Algunos tipos comunes de detectores de agua son:

- **Detectores de conductividad**: Los detectores de conductividad funcionan midiendo la conductividad eléctrica del agua. Cuando el sensor entra en contacto con el agua, la conductividad eléctrica aumenta.

- **Detectores de capacitancia**: Los detectores de capacitancia funcionan midiendo la capacitancia del agua. Cuando el sensor entra en contacto con el agua, la capacitancia aumenta.

- **Detectores ópticos**: Los detectores ópticos funcionan detectando los cambios en el índice de refracción del agua. Cuando el sensor entra en contacto con el agua, el índice de refracción cambia.
 
**Nota:**  Los sensores de agua tienen una vida más corta porque están expuestos al agua. Esto puede hacer que el sensor se corroa rápidamente si está encendido mientras está sumergido en agua. Para evitarlo, vamos a encender el sensor solo al momento de tomar las lecturas.
  
### Cableado del sensor de agua

Conectemos el sensor de nivel de agua.

![Sinric Pro water sensor sensor wiring]({{ site.github.url }}/public/img/sinricpro_water_sensor_wiring.png) 

| MCU       | Pin S                     |  Pin VCC  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analógico ADC1_CH6)   |   17      |
| ESP8266   |    A0                     |   D2      |
| Pico W    |    GP26 (ADC0)            |   6       |
 


**Nota:** en el ESP32, el ADC2 (GPIO04, GPIO02, GPIO15) es inestable cuando se usa el Wi-Fi.

### Lectura del sensor de agua

Comprobemos que el sensor está bien cableado y funciona. 


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/7d45a826ba02203ab8571b735add45c9)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-sensor-demo.mp4" type="video/mp4">
</video>

![sinric pro water sensor arduino readings]({{ site.github.url }}/public/img/sinricpro-water-sensor-test-readings.png) 

### Detectando inundaciones


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/aff71487783487cbfbdef4006eaab809)


### Detectando el nivel de agua


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/a2dffb0f0c46585ed0b35aa902c2447e)


 
### Paso 1 : Conéctate a Sinric Pro 

#### Paso 1.1 : Crear un tipo de dispositivo personalizado para el sensor de agua.

Sinric Pro no tiene un tipo de dispositivo integrado para sensores de agua/inundación, así que vamos a crear un tipo de dispositivo personalizado para el sensor de agua usando la función Device Template.

1. Si hay inundación en el sótano o no. 

2. Nivel de agua.

**Nota**: Puedes usar la función de importación de plantillas de dispositivo mencionada más abajo para evitar crear la plantilla completa.

* [Inicia sesión](https://portal.sinric.pro/devicetemplates/new) en tu cuenta de Sinric Pro y ve a **Device Templates**

* Haz clic en **Add Device Template**. Escribe el nombre y la descripción como **Flood Sensor** y selecciona **Flood Sensor** como tipo de dispositivo

![Sinric Pro water sensor device template basic info]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-basic-info.png) 

* Haz clic en **Capabilities**. 

Aquí debemos seleccionar las funciones de nuestro sensor de humedad de suelo. Queremos saber si el *suelo está húmedo o seco* y el *nivel de humedad*. Así que arrastremos una capacidad **Range**, una **Mode** y una **Push Notification**.

![Sinric Pro custom device type for capacitive soil moisture sensor]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-set-template-drop-range-mode.png) 

- ¿Qué es la capacidad Range?

  La capacidad Range se puede usar para representar un número. P. ej.: la velocidad actual de una licuadora.

- ¿Qué es la capacidad Mode?

  La capacidad Mode se puede usar para representar un valor dentro de una lista de valores predefinidos. P. ej.: el ciclo de lavado actual de una lavadora.

- ¿Qué es la capacidad Push Notification?

  La capacidad Notification permite enviar un mensaje de notificación push desde el código.

Haz clic en el botón **Configure** y configura las dos capacidades como se muestra a continuación.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode.png)  

Haz clic en **Save** para guardar.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode-configured.png)  

Haz clic en **Save** para guardar la plantilla.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-saved.png)  

Ahora puedes ver la plantilla que acabamos de crear.


## ¿Importar una plantilla existente?

Si no te apetece configurar todos los valores de Modes y Range, puedes usar la función de importación.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Pega esta plantilla:


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/48649129dbed3021cda75a4d8ce94515)


* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, ve al menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).

* Escribe el nombre del dispositivo **Flood Sensor**, la descripción **My Flood Sensor** y selecciona el tipo de dispositivo **Flood Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-new-device-info.png)

* Haz clic en la pestaña Others y luego en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

* Haz clic en **Code Generator** para generar el código. Haz clic en **Download** para descargarlo.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código completo


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/6657119c2750c4cc662b674dba04a651)

 
Ahora deberías poder ver el estado de inundación y el nivel de agua a través de Alexa y la app de Sinric Pro

Alexa, ¿cuál es el estado de inundación (nombre del modo) en flood sensor (nombre del dispositivo)

Alexa, ¿cuál es el nivel de agua (nombre del range) en flood sensor (nombre del dispositivo)


![Sinric Pro water sensor in the Alexa app]({{ site.github.url }}/public/img/sinricpro-water-sensor-alexa.jpg)
 
![Sinric Pro water sensor in the Portal]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-portal.png)
 
### Paso 3 : ¡Anuncios de voz!

✅ Cómo funciona:

1️⃣ Añade un Switch en SinricPro (¡tu disparador secreto!)

2️⃣ Crea una rutina de Alexa que diga tu mensaje, por ejemplo "¡El sótano se está inundando!", cuando el Switch se encienda

3️⃣ Envía desde tu código un evento de estado de encendido para poner en ON ese switch

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
``` 

### Solución de problemas
1. Google Home y SmartThings no son compatibles.

2. Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más detalles.
 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Nivel de tanque de agua con un sensor ultrasónico HC-SR04]({{ site.github.url }}/es/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.es.html)
- [Sensor de humedad de suelo capacitivo (HW-390)]({{ site.github.url }}/es/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.es.html)
- [Sensor de calidad del aire MQ135]({{ site.github.url }}/es/pages/tutorials/air-quality-sensors/mq135.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea una [incidencia](https://github.com/sinricpro/help-docs)
