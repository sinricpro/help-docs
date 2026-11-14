---
title: 'Sensor de movimiento PIR con ESP32 o ESP8266 para Alexa: HC-SR501, HC-SR505, AM312'
layout: post
lang: es
description: Crea un sensor de movimiento PIR con un ESP32, ESP8266 o Pico W. Compara HC-SR501 vs HC-SR505 vs AM312 (HC-SR312), con cableado, ajuste de sensibilidad y código para Alexa.
---

En esta sección veremos cómo crear un **sensor de movimiento** PIR con **ESP32**, **ESP8266** o **Raspberry Pi Pico W** y cómo ver después los cambios de movimiento a través de **Alexa o SmartThings**.

### Requisitos previos : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.
2. HC-SR501, HC-SR505, Mini AM312, HC-SR312 x 1.
3. Cables puente.

| PIR       | Tensión de trabajo  | Tiempo de retardo | Tiempo de bloqueo | Activación       | Distancia
| --------- | -------          |-------     |-------        |-------        |-------
| HC-SR312  |2,7-12V           | 2 segundos  | 2 segundos     | Repetible    | 3-5 metros
| HC-SR505  |4,5-20V           | 2 segundos  | 2 segundos     | Repetible    | 3 metros
| HC-SR501  |4,5-20V           | Ajustable  | Ajustable    | Ajustable    | 3 a 7 metros

### HC-SR501 vs HC-SR505 vs AM312 (HC-SR312): ¿cuál elegir?

El HC-SR312 es el módulo PIR mini construido alrededor del sensor AM312, así que los dos nombres se refieren a la misma pieza.

- **HC-SR501**: el módulo más grande y el único que se puede ajustar. Tiene dos potenciómetros (sensibilidad y tiempo de retardo) y un jumper para activación única o repetible. Elígelo cuando necesites más alcance o quieras ajustar el comportamiento. Necesita al menos 4,5 V, así que alimenta desde 5V / VIN.
- **HC-SR505**: un módulo pequeño con ajustes fijos. Nada que ajustar. También necesita al menos 4,5 V.
- **AM312 / HC-SR312**: el módulo más pequeño, también con ajustes fijos. Funciona desde 2,7 V, así que se puede alimentar directamente desde el pin **3.3V**. Esto lo convierte en la mejor opción para placas ESP32 / ESP8266 y proyectos alimentados por batería.

Los tres tienen los mismos tres pines: **VCC**, **OUT** y **GND**. El orden de los pines es distinto en cada módulo, así que revisa las etiquetas de la placa antes de cablear. El mismo código funciona para los tres.

### Introducción rápida a los sensores de movimiento PIR

Los sensores de movimiento de infrarrojo pasivo (PIR) detectan la presencia de personas o animales midiendo cambios en la radiación infrarroja. Los sensores PIR funcionan detectando la radiación infrarroja emitida por todos los objetos con una temperatura por encima del cero absoluto. Cuando una persona o animal se mueve dentro del campo de visión de un sensor PIR, el sensor detecta un cambio en la cantidad de radiación infrarroja y activa una alarma u otra salida. Los sensores PIR son una forma versátil y económica de detectar movimiento. Son fáciles de usar y se pueden instalar en una gran variedad de ubicaciones.

La salida del sensor de movimiento PIR es:

- ``HIGH`` cuando se detecta un movimiento.
- ``LOW``  cuando no se detecta movimiento.

Para obtener mediciones precisas, **espera a que el sensor PIR se calibre correctamente; esto suele tardar entre 10 y 60 segundos** después de encenderlo.  
 
El HC-SR501 tiene configuraciones ajustables:

![Sinric Pro esp8266 HC-SR501 ]({{ site.github.url }}/public/img/sinric_pro_pir_sensor.png) 

###### Ajuste de sensibilidad

- La distancia de medición va de 3 a 7 metros.

- Girar en sentido horario o hacia la derecha: reduce la sensibilidad. Totalmente a la derecha, hasta 3 metros.

- Girar en sentido antihorario o hacia la izquierda: reduce la sensibilidad. Totalmente a la izquierda, unos 7 metros.

###### Ajuste del tiempo de retardo

- Tiempo de retardo que define cuánto tiempo permanece en ``HIGH`` la salida del HC-SR501 después de detectarse un movimiento. Se puede ajustar de 1 segundo a unos 5 minutos.

- Girar en sentido horario o hacia la derecha: aumenta el retardo. Totalmente a la derecha, hasta 5 minutos.

- Girar en sentido antihorario o hacia la izquierda: reduce el retardo. Totalmente a la izquierda, unos 3 segundos.


###### Selección con jumper

- **Modo de activación única (L)**: activa un solo movimiento. El potenciómetro de tiempo de retardo determina cuánto tiempo permanecerá el pin en ``HIGH``. Cualquier otra detección de movimiento queda bloqueada hasta que pasa a ``LOW``.

**Ejemplo**: el tiempo de retardo del detector de movimiento está fijado en 3 segundos, pero no puede detectar movimiento durante unos 6 segundos después de detectar un movimiento.

![Sinric Pro esp8266 PIR Single Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_single_trigger.png) 

- **Modo de activación múltiple (H)**: activa una serie de movimientos. El potenciómetro de tiempo de retardo determina cuánto tiempo permanecerá el pin en ``HIGH``. En el modo de activación múltiple, el tiempo de retardo se reinicia cada vez que se detecta movimiento, de modo que no se bloquea ninguna detección posterior.
 
**Ejemplo**: el tiempo de retardo es de 3 segundos. Tras detectarse movimiento, el periodo de tiempo de retardo se reinicia. Sin embargo, la detección sigue bloqueada durante 3 segundos después de que expire el tiempo de retardo. Este retardo de 3 segundos permite que el sensor descanse antes de volver a empezar a detectar movimiento.

![Sinric Pro esp8266 PIR Multiple Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_multi_trigger.png) 

### Cableado

![Sinric Pro esp8266 PIR wiring]({{ site.github.url }}/public/img/sinric_pro_pir_sensor_wiring.png) 


| MCU       | Pin PIR     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    5 (D1)    |
| Pico W    |    GP5  |

Vamos a comprobar que el sensor de movimiento está bien cableado y funciona. 

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/bc5a7152c02e4e692ca9ae6708fe6814)


El Monitor Serie de Arduino IDE mostrará las detecciones de movimiento así:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-motion-sensor-demo.mp4" type="video/mp4">
</video>

 
### Paso 1 : Crea un nuevo dispositivo en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, ve al menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Motion Sensor**, la descripción **My Motion Sensor** y selecciona el tipo de dispositivo **Motion Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Haz clic en **Next** en la pestaña Notifications

![Sinric Pro motion sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_motion_sensor_notifications.png)

Aquí puedes establecer el umbral para recibir una notificación push a través de la app de Sinric Pro cuando se detecte movimiento de **Día** o de **Noche**. Usa el Retrigger Time para fijar el retardo entre notificaciones push.

* Haz clic en la pestaña Others y luego en **Save**

* La siguiente pantalla mostrará las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Puedes **generar el código** usando la función **Zero Code** o escribirlo tú mismo. Si no tienes experiencia programando, te recomendamos usar la función Zero Code en el Portal para generar el código, descargarlo y flashearlo.

#### 2.2 Código completo
  

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/f4fd3d769144689f15cfc80d783e8c94)

 
Ahora deberías poder ver los movimientos a través de Alexa, SmartThings 
  
![Sinric Pro motions via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_contact_motion_home_alexa_smartthings.png)

a través del Portal

![Sinric Pro Portal motion sensor]({{ site.github.url }}/public/img/sinric_pro_contact_motion_portal.png)

Ten en cuenta que Google Home no es compatible.

### Solución de problemas

1. Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más detalles.

 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Sensor de contacto para puertas y ventanas]({{ site.github.url }}/es/pages/tutorials/contact-sensors/contact.es.html)
- [Timbre inteligente]({{ site.github.url }}/es/pages/tutorials/doorbell/doorbell.es.html)
- [Enviar anuncios a Alexa]({{ site.github.url }}/es/pages/tutorials/general/how-to-send-announcements-to-alexa.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)