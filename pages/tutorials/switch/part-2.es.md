---
title: Añade un pulsador a un relé ESP32 o ESP8266 con Alexa (tutorial de Switch, parte 2)
layout: post
lang: es
description: Añade un pulsador a un relé ESP32 o ESP8266 para poder encenderlo tanto a mano como con Alexa o Google Home, manteniendo el estado sincronizado.
---

En esta sección continuamos desde la [Parte 1]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html) y añadimos un pulsador para encender y apagar el relé. También actualizaremos el nuevo estado del relé en el servidor de Sinric Pro.


![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/sinric_pro_relay_push_button_esp8266.png) 
### Requisitos previos : 


| Componente    | Cantidad |
| ---------                   | ------- |
| ESP32, ESP8266 o RaspPi W  |    1     |
| Controlador de relé SPDT       |    1     |
| Pulsador                 |    1     |
| Resistencia de 10K ohm            |    1     | 
| Cables jumper                |    1     | 

### Introducción rápida al pulsador y al antirrebote

Los pulsadores pueden generar señales falsas al pulsarlos. Esto ocurre porque el interruptor mecánico que forma el botón puede rebotar o vibrar ligeramente al pulsarse. Esto puede provocar que el botón envíe varias señales al MCU, aunque solo se haya pulsado una vez. El proceso para eliminar estas señales generadas se llama antirrebote (debouncing). Para eliminar el ruido del pulsador, podemos registrar un cambio de estado y luego ignorar cualquier entrada adicional durante unos milisegundos.

### Cableado

Hay dos formas de cablear un pulsador.

![Sinric Pro pull-up pull-down]({{ site.github.url }}/public/img/pull-up-pull-down.png) 

**Pull-Up** - Cuando se pulsa el interruptor, digitalRead lee una señal LOW (0).

**Pull-Down** - Cuando se pulsa el interruptor, digitalRead lee una señal HIGH (1).
 


| MCU       | Pin     | Componente     |
| --------- | ------- | ------- |
| ESP32     |    16   |    Relé   |
| ESP32     |    17   |    Botón   |
| ESP8266   |    12 (D6)    |    Relé   |
| ESP8266   |    15 (D8)    |    Botón   |
| RaspPi W  |    6    |    Relé   |
| RaspPi W  |    7    |    Botón   |

Antes de integrarlo con el sketch de la parte 1, es importante verificar que el botón está bien cableado y funciona. Puedes usar el siguiente código para comprobar si se detecta la pulsación del botón.  

Vamos a usar el método **Pull-Down** para cablear nuestro pulsador.


```cpp
#if defined(ESP8266)
  #define BUTTON_PIN        12
#elif defined(ESP32) 
  #define BUTTON_PIN        16
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        6
#endif

int button_state;
int lastbutton_state = LOW;

unsigned long last_debounce_time = 0;
unsigned long debounce_delay = 50; // increase if needed.

void setup() {
  Serial.begin(115200);	
  pinMode(BUTTON_PIN, INPUT);
}

void handle_button_press() {
  int reading = digitalRead(BUTTON_PIN);  
  if (reading != lastbutton_state) {
    last_debounce_time = millis();
  }

  if ((millis() - last_debounce_time) > debounce_delay) {
    if (reading != button_state) {
      button_state = reading;
      
      if (button_state == HIGH) {
        Serial.printf("Pressed!\r\n");
      }
    }
  }
  
  lastbutton_state = reading;
}

void loop() {
  handle_button_press();
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/23d95c1df56a7c2d2ec9aff1dcdf3a90)


![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png) 

Ahora completemos el sketch con el pulsador y el controlador de relé integrado con Sinric Pro.


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
#define APP_KEY           ""  // App Key
#define APP_SECRET        ""  // App Secret
#define SWITCH_ID_1       ""  // Device Id

#define BAUD_RATE         115200              // Change baudrate to your need

#if defined(ESP8266)
  #define BUTTON_PIN        15
  #define RELAYPIN_1        12
#elif defined(ESP32) 
  #define BUTTON_PIN        17
  #define RELAYPIN_1        16
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        7
  #define RELAYPIN_1        6
#endif

bool myPowerState = false;
unsigned long lastBtnPress = 0;

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s (via SinricPro) \r\n", deviceId.c_str(), state?"on":"off");
  
  digitalWrite(RELAYPIN_1, state ? HIGH:LOW);
  
   /* If your relay is activated with low signal, change the above to below code
  digitalWrite(RELAYPIN_1, state ? LOW : HIGH); */

  myPowerState = state;
  return true; // request handled properly
}

void handleButtonPress() {
  unsigned long actualMillis = millis();
  if (digitalRead(BUTTON_PIN) == HIGH && actualMillis - lastBtnPress > 1000)  {
    if (myPowerState) {
      myPowerState = false;
    } else {
      myPowerState = true;
    }
	
    // get Switch device back
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID_1];
    
    // send powerstate event to server
    mySwitch.sendPowerStateEvent(myPowerState); // send the new powerState to SinricPro server
    Serial.printf("Device %s turned %s (manually via button)\r\n", mySwitch.getDeviceId().c_str(), myPowerState?"on":"off");

    // set relay status  
    digitalWrite(RELAYPIN_1, myPowerState ? HIGH:LOW);
	 
    lastBtnPress = actualMillis;  // update last button press variable
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
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID_1];

  // set callback function to device
  mySwitch.onPowerState(onPowerState);

  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}


void setup() {
  pinMode(BUTTON_PIN, INPUT);
  pinMode(RELAYPIN_1, OUTPUT);
  
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  handleButtonPress();
  SinricPro.handle();
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/86f6f4c65483d6b5c21ba33f9af48d87)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/relay-on-off-switch.mp4" type="video/mp4">
</video>

Continúa con la [Parte 3]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html) de esta serie de artículos para aprender a controlar varios pulsadores con varios relés.


### Solución de problemas
Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para posibles soluciones a tu problema.

 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Tutorial de Switch, parte 1: encender y apagar un relé]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html)
- [Tutorial de Switch, parte 3: varios relés y pulsadores]({{ site.github.url }}/es/pages/tutorials/switch/part-3.es.html)
- [Botón inteligente]({{ site.github.url }}/es/pages/tutorials/custom-device-types/smart-button/push-button.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea una [incidencia](https://github.com/sinricpro/help-docs)
