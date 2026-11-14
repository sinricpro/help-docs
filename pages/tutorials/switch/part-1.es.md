---
title: Controla un relé con ESP32 o ESP8266 usando Alexa y Google Home (Tutorial de Switch, parte 1)
layout: post
lang: es
description: Controla un relé con un ESP32, ESP8266 o Raspberry Pi usando Alexa, Google Home o SmartThings. Cableado, código y vinculación de cuenta.
---

En esta sección veremos cómo crear un **Switch** de Sinric Pro para **ESP32**, **ESP8266** o **Raspberry Pi Zero W** y cómo controlarlo después con **Alexa, Google Home o SmartThings**.

### Requisitos previos : 

1. ESP32, ESP8266 o RaspPi W x 1.
2. Controlador de relé SPDT x 1.
3. Cables puente.

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png) 
### Introducción rápida al relé

Un relé es un interruptor accionado eléctricamente que se puede encender o apagar mediante una señal de bajo voltaje. Es similar a un interruptor normal en el sentido de que permite o no el paso de corriente, pero se puede controlar con un voltaje mucho menor. Esto hace que los relés sean ideales para MCU en los que es necesario controlar un circuito de alto voltaje con una señal de bajo voltaje.

#### Cómo funciona

El funcionamiento de un relé puede variar según el fabricante, el cableado y el tipo de controlador de relé que se use. Algunos controladores de relé requieren una señal de nivel alto del MCU para activar el relé, mientras que otros requieren una señal de nivel bajo. Es importante revisar las especificaciones del controlador de relé antes de usarlo, para asegurarte de que es compatible con tu MCU.

**Señal de nivel alto**: una señal de nivel alto es una señal que está por encima de un determinado umbral de voltaje. Por ejemplo, un controlador de relé de 5V puede requerir una señal superior a 3.3V para activar el relé.

```c++
digitalWrite(pin, HIGH);
```

**Señal de nivel bajo**: una señal de nivel bajo es una señal que está por debajo de un determinado umbral de voltaje. Por ejemplo, un controlador de relé de 5V puede requerir una señal inferior a 0.8V para activar el relé.

```c++
digitalWrite(pin, LOW);
```

**Conectores de alto voltaje**
![High Voltage Connectors]({{ site.github.url }}/public/img/high_voltage_connectors.png) 


El módulo de relé de la imagen anterior tiene un único conector con tres zócalos: **Común (COM)**, **Normalmente cerrado (NC)** y **Normalmente abierto (NO)**.

**Común (COM)**: COM es la conexión común para los pines NO y NC. Conecta el dispositivo de alto voltaje al pin COM.

**Normalmente cerrado (NC)**: el circuito está cerrado por defecto.

**Normalmente abierto (NO)**: el circuito está abierto por defecto.

Los contactos normalmente abiertos (NO) y normalmente cerrados (NC) te permiten usar un pin para controlar dos circuitos independientes según tus necesidades. Por ejemplo, podrías usar un pin para controlar la alimentación de una bombilla y otro pin para controlar la alimentación de un motor. Cuando el pin está en alto/bajo, la bombilla se encenderá; en caso contrario, se encenderá el motor.

### Cableado

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-esp8266-relay-wired.png) 

| MCU       | Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    12 (D6)    |
| RaspPi W  |    6    |

Antes de integrarlo con Sinric Pro, es importante comprobar que el relé está bien cableado. Puedes usar el siguiente código para comprobar si el relé se enciende y apaga cada 5 segundos.  


```cpp
#if defined(ESP8266)
  #define relay        12
#elif defined(ESP32) 
  #define relay        16
#elif (ARDUINO_ARCH_RP2040)
  #define relay        6
#endif

void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);
}

void loop() {
  Serial.println("Writing HIGH ..");
  digitalWrite(relay, HIGH);
  delay(5000); 
  
  Serial.println("Writing LOW ..");
  digitalWrite(relay, LOW);
  delay(5000);
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/baf926bc8b0821f048fe53540e254212)


### Paso 1 : Crea un nuevo dispositivo en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, ve al menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Switch**, la descripción **My First Switch** y selecciona el tipo de dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Haz clic en **Next** en la pestaña Notifications

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Para recibir notificaciones push cuando tu dispositivo se conecte o desconecte, activa la opción **"Connect and Disconnect"** en la app de Sinric Pro. Para recibir notificaciones push cuando tu dispositivo se encienda o apague, activa la opción **"On and Off"**.


* Haz clic en Others y luego en **Save**

* La siguiente pantalla mostrará las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Programación 

#### 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)


Puedes **generar el código** usando la función **Zero Code** o escribirlo tú mismo. Si no tienes experiencia programando, te recomendamos usar la función Zero Code en el Portal para generar el código, descargarlo y flashearlo.

#### 2.2 Código completo


```cpp
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProSwitch.h"

#define WIFI_SSID         ""  // Change WIFI_SSID to your WiFi Name.
#define WIFI_PASS         ""  // Change WIFI_PASS to your WiFi password.
#define APP_KEY           ""  // Paste App Key from above 
#define APP_SECRET        ""  // Paste App Secret from above 
#define SWITCH_ID_1       ""  // Paste Device Id from  above

#if defined(ESP8266)
  #define RELAYPIN_1        12
#elif defined(ESP32) 
  #define RELAYPIN_1        16
#elif (ARDUINO_ARCH_RP2040)
  #define RELAYPIN_1        6
#endif

#define BAUD_RATE         115200                // Change baudrate to your need

bool onPowerState1(const String &deviceId, bool &state) {
 Serial.printf("Device 1 turned %s", state?"on":"off");
 digitalWrite(RELAYPIN_1, state ? HIGH:LOW);
 
 /* If your relay is activated with low signal, change the above to below code
  digitalWrite(RELAYPIN_1, state ? LOW : HIGH); */

 return true; // request handled properly
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

  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
  // add devices and callbacks to SinricPro
  pinMode(RELAYPIN_1, OUTPUT);
    
  SinricProSwitch& mySwitch1 = SinricPro[SWITCH_ID_1];
  mySwitch1.onPowerState(onPowerState1);
    
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
   
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/0416a1f26b8398ce6dd9f71a6a70755a)

 
Ahora deberías poder controlar el relé a través del Portal como en el siguiente vídeo. 

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-relay-on-off.mp4" type="video/mp4">
</video>

### Paso 3 : Vincula la skill de Alexa de [Sinric Pro](https://www.amazon.com/dp/B07ZT5VDT8) con tu cuenta.

<div align="center">
  <table >
    <tr>
      <td>
        <p>&#x2022; Abre tu app de Amazon Alexa.</p>
        <p>&#x2022; Ve a Skills y juegos.</p>
        <p>&#x2022; Busca <b>Sinric Pro</b>.</p>
        <p>&#x2022; Haz clic en ENABLE TO USE.</p>
        <p>&#x2022; Introduce tus credenciales de <b>Sinric Pro</b> en la página de vinculación.</p>
        <p>&#x2022; Pide a Alexa que descubra dispositivos nuevos.</p>
        <p>&#x2022; Pide a Alexa que encienda el <b>Switch</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Paso 4 : Vincula la action de Google Home de [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) con tu cuenta.

<div align="center">
  <table >
    <tr>
      <td>
          <p>&#x2022; Abre <b>Google Home</b> y haz clic en <b>Añadir</b>. </p>
          <p>&#x2022; Selecciona <b>Configurar dispositivo</b></p>
          <p>&#x2022; Selecciona <b>Funciona con Google Home</b></p>
          <p>&#x2022; Busca <b>Sinric Pro</b>.</p>
          <p>&#x2022; Vincula tu cuenta. </p>
          <p>&#x2022; Descubre dispositivos nuevos </p>
          <p>&#x2022; Pide a Google Home que encienda el <b>Switch</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Paso 5 : Vincula [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) con SmartThings en tu cuenta.

<div align="center">
  <table >
    <tr>
      <td>
           <p>&#x2022; Abre la app de SmartThings y toca el icono <b>+</b></p>
           <p>&#x2022; Selecciona Dispositivo</p>
           <p>&#x2022; Selecciona Sinric Pro en <b>Por marca</b></p>
           <p>&#x2022; Vincula tu cuenta. </p>
           <p>&#x2022; Ahora puedes encender o apagar el <b>Switch</b> desde el panel</p> 
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div> 

Continúa con la [parte 2]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html) de esta serie de artículos para aprender a añadir un pulsador que controle el relé.


### Solución de problemas
Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para posibles soluciones a tu problema.

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Tutorial de Switch, parte 2: controla el relé con un pulsador]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html)
- [Tutorial de Switch, parte 3: varios relés y pulsadores]({{ site.github.url }}/es/pages/tutorials/switch/part-3.es.html)
- [Relé con MicroPython en ESP32]({{ site.github.url }}/es/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython.es.html)
- [Interruptor regulable con un regulador de luz AC RobotDyn]({{ site.github.url }}/es/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)