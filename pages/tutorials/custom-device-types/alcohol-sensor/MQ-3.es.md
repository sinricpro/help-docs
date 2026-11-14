---
title:  Cómo construir un sensor de gas para detectar alcohol, etanol y humo en el aire con un MQ-3 usando ESP32, ESP8266 o Raspberry Pi Pico W para Alexa
layout: post
lang: es
description: Construye un sensor de gas MQ-3 con un ESP32, ESP8266 o Raspberry Pi Pico W para detectar alcohol, etanol y humo, con Alexa y notificaciones push.
---

En esta sección te guiamos paso a paso para construir un sensor de gas con un **ESP32**, **Raspberry Pi Pico W** o **ESP8266**. Después podrás monitorizar la concentración de alcohol en el aire a través de **Amazon Alexa** y **recibir notificaciones push** mediante la app de Sinric Pro cuando el sensor detecte un determinado nivel.

### Requisitos previos : 

1. ESP32, ESP8266 x 1.
2. MQ-3 x 1.
3. Cables jumper.

![Sinric Pro MQ-3 alcohol gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-intro.jpg)

### Introducción rápida al MQ-3

El MQ-3 es un sensor de gas de semiconductor usado en una gran variedad de aplicaciones para detectar concentraciones de alcohol en el aire. Es un sensor de bajo costo, alta sensibilidad y fácil de usar. El MQ-3 se basa en el principio de detección de gas mediante un semiconductor de dióxido de estaño (SnO2). Cuando hay moléculas de alcohol en el aire, estas se adsorben en la superficie del SnO2. Esta adsorción hace que cambie la conductividad del SnO2, lo cual se puede medir como una señal eléctrica. El MQ-3 es sensible a un amplio rango de concentraciones de alcohol, desde 0,05 ppm hasta 5000 ppm. También es sensible a otros gases, como el amoníaco, el benceno y el tolueno, pero su mayor sensibilidad es al alcohol.

El sensor MQ3 requiere una alimentación de 5V y consume alrededor de 800mW de corriente. La salida digital se puede conectar a un ESP32, ESP8266 o Pico W para medir la concentración de alcohol.

**¿Cómo calibrar el sensor?**

Déjalo encendido durante 24-48 horas para que se estabilice (burn-in).

Hoja de especificaciones: [MQ-3](https://www.sparkfun.com/datasheets/Sensors/MQ-3.pdf)

### Cableado

![Sinric Pro esp8266 MQ-3 wiring]({{ site.github.url }}/public/img/sinricpro_mq3-wiring-diagram.png) 


| MCU       | Pin A0                    |  Pin VCC  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analógico ADC1_CH6)   |   5V      |
| ESP8266   |    A0                     |   5V/VIN  |
| Pico W    |    GP26 (ADC0)            |   5V      |
 


**Nota:** en el ESP32, el ADC2 (GPIO04, GPIO02, GPIO15) es inestable cuando se usa el Wi-Fi.

Comprobemos que el sensor está bien cableado y funciona. 


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/580e05d98109e36f6b4ace84bded1c7b)


Lectura sin exposición al alcohol (alrededor de 760):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-reading.png)

Al exponerlo al whisky Jack Daniel's Single Barrel Tennessee (alrededor de 850):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-jack-daniels-reading.png)

 
### Paso 1 : Conéctate a Sinric Pro 

#### Paso 1.1 : Crear un tipo de dispositivo personalizado para el sensor de gas.

Sinric Pro no tiene un tipo de dispositivo integrado para sensores de gas, así que vamos a crear un tipo de dispositivo personalizado para el sensor de gas usando la función Device Template.

1. Alcohol detectado/No detectado. 

**Nota**: Puedes usar la función de importación de plantillas de dispositivo mencionada más abajo para evitar crear la plantilla completa.

* [Inicia sesión](https://portal.sinric.pro/devicetemplates/new) en tu cuenta de Sinric Pro y ve a **Device Templates**

* Haz clic en **Add Device Template**. Escribe el nombre y la descripción como **Gas Sensor** y selecciona **Gas Sensor** como tipo de dispositivo

![Sinric Pro gas ensor device template]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-basic-info.png) 

* Haz clic en **Capabilities**. 

Aquí debemos seleccionar las funciones de nuestro sensor de gas. Queremos saber si el *alcohol* está *detectado o no detectado*. Así que arrastremos una capacidad **Mode** y una **Push Notification**.

![Sinric Pro custom device type for gas sensor]({{ site.github.url }}/public/img/gas-sensor-set-template-drop-range-mode.png) 

- ¿Qué es la capacidad Mode?

  La capacidad Mode se puede usar para representar un valor dentro de una lista de valores predefinidos. P. ej.: el ciclo de lavado actual de una lavadora.

- ¿Qué es la capacidad Push Notification?

  La capacidad Notification permite enviar un mensaje de notificación push desde el código.

Haz clic en el botón **Configure** y configura las dos capacidades como se muestra a continuación.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-mode.png)  

Haz clic en **Save** para guardar.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-template-range-and-mode-configured.png)  

Haz clic en **Save** para guardar la plantilla.

Ahora puedes ver la plantilla que acabamos de crear.


## ¿Importar una plantilla existente?

Si no te apetece configurar todos los valores de Modes, puedes usar la función de importación.

![Sinric Pro gas sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Pega esta plantilla:


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/9fdaaaa176a83414961756cf276b82d5)


* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, ve al menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).

* Escribe el nombre del dispositivo **Gas Sensor**, la descripción **Gas Sensor** y selecciona el tipo de dispositivo **Gas Sensor** desde **Your Device Templates**.


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-new-device-info.png)

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/e9d05233bc97f29a403a101810e36795)

 
Ahora deberías poder ver el estado de alcohol detectado y el nivel de agua a través de Alexa y la app de Sinric Pro

Alexa, ¿cuál es el alcohol (nombre del modo) en Gas Sensor (nombre del dispositivo)
 

![Sinric Pro Alexa gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-alexa.jpg)
 
![Sinric Pro Portal gas sensor portal]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-portal.png)
 
 ### Paso 3 : ¡Anuncios de voz!

✅ Cómo funciona:

1️⃣ Añade un Switch en SinricPro (¡tu disparador secreto!)

2️⃣ Crea una rutina de Alexa que diga tu mensaje, por ejemplo "¡El sensor de gas ha detectado gas!", cuando el Switch se encienda

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
- [Sensor de calidad del aire MQ135]({{ site.github.url }}/es/pages/tutorials/air-quality-sensors/mq135.es.html)
- [Sensor de humedad de suelo capacitivo (HW-390)]({{ site.github.url }}/es/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.es.html)
- [Sensor de fuga de agua, inundación y lluvia]({{ site.github.url }}/es/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea una [incidencia](https://github.com/sinricpro/help-docs)
