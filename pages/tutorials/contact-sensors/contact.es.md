---
title: Tutorial del sensor de contacto (MC-38) para ESP8266, ESP32 y Raspberry Pi Pico W
layout: post
lang: es
description: Construye un sensor de contacto para puertas y ventanas con un interruptor reed MC-38 y un ESP32, ESP8266 o Raspberry Pi Pico W. Consulta el estado abierto/cerrado en Alexa.
---
 
En esta sección te mostramos cómo crear un sensor de contacto (también conocido como sensor de puerta, sensor de entrada o sensor de ventana) con un **ESP32**, **ESP8266** o **Raspberry Pi Pico W**, y cómo ver después el estado abierto/cerrado en Alexa, Google Home, SmartThings o la app de Sinric Pro.

![Sinric Pro contact sensor tutorial]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_bg.jpg) 


### Requisitos previos : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. Sensor de contacto (MC-38) x 1.
3. Cables jumper.

### Introducción rápida al sensor de contacto

Un sensor de contacto es un dispositivo que detecta si una puerta, una ventana u otro objeto está abierto o cerrado. Consta de dos componentes – un sensor y un imán – que se usan para determinar el estado de objetos como puertas o ventanas, es decir, si están abiertos o cerrados. 
 
![Sinric Pro Contact Sensor Reed Switch Open Close]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_open_close.png) 

El sensor se fija al marco de la ventana corredera, mientras que el imán se coloca en la propia ventana. Cuando la ventana corredera está cerrada, el imán queda cerca del sensor y se establece una conexión entre los dos componentes. En cambio, cuando la ventana se abre, el imán se aleja del sensor y la conexión entre ellos se interrumpe.

### Cableado del sensor de contacto

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_wiring.png) 

Nota: Usamos INPUT_PULLUP en lugar de conectar una resistencia de 10 kΩ entre el interruptor reed y GND.


| MCU       | Pin GPIO     |
| --------- | ------- |
| ESP32     |    19   |
| ESP8266   |    4 (D2)  |
| Pico W    |    GP5  |

Comprobemos que el sensor de contacto está bien cableado y funciona. 

 

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/ce5b95c7618826005ef39bb1861cb6f1)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-contact-sensor-open-close.mp4" type="video/mp4">
</video>

### Paso 1 : Crea un nuevo sensor de contacto en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, ve al menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Front Door**, la descripción **My Front Door** y selecciona el tipo de dispositivo **Contact Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_new_device.png)

* Haz clic en **Next** en la pestaña Notifications

![Sinric Pro contact sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_notifications.png)

Aquí puedes activar los interruptores de Open y Close para recibir una notificación push en la app de Sinric Pro cuando el estado del sensor de contacto cambie entre **Open** y **Close**.

* Haz clic en la pestaña Others y luego en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
Puedes **generar el código** con la función **Zero Code** o escribirlo tú mismo. Si no tienes experiencia en programación, te recomendamos usar la función Zero Code del Portal para generar el código, descargarlo y grabarlo en la placa.

#### 2.2 Código completo


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/2a027cb56a1f7762454d492d9e928b83)

 
Ahora deberías poder ver el estado del contacto en Alexa, Google Home, SmartThings y la app de Sinric Pro

![Sinric Pro Alexa Contact Sensor]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_google_home_alexa_smartthings.jpg)
 
### Paso 3 : ¡Anuncios de voz!

✅ Cómo funciona:

1️⃣ Añade un Switch en SinricPro (¡tu disparador secreto!)

2️⃣ Crea una rutina de Alexa que diga tu mensaje, por ejemplo "¡Hay alguien en la puerta!", cuando el Switch se encienda

3️⃣ Envía desde tu código un evento de estado de encendido para poner en ON ese switch

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
``` 

### Solución de problemas
1. Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más detalles.
 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Sensor de movimiento PIR (HC-SR501, HC-SR505, AM312)]({{ site.github.url }}/es/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.es.html)
- [Timbre inteligente]({{ site.github.url }}/es/pages/tutorials/doorbell/doorbell.es.html)
- [Enviar anuncios a Alexa]({{ site.github.url }}/es/pages/tutorials/general/how-to-send-announcements-to-alexa.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea una [incidencia](https://github.com/sinricpro/help-docs)
