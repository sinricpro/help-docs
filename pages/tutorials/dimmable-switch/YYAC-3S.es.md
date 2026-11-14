---
title: Tutorial de interruptor regulable con YYAC-3S para ESP32
layout: post
lang: es
description: Construye un interruptor regulable con un ESP32 y un módulo dimmer AC YYAC-3S. Controla el brillo de la luz con Alexa, Google Home o SmartThings.
---

En esta sección te mostramos cómo crear un **interruptor regulable** con un **ESP32** y controlar después el brillo de la luz con **Amazon Alexa, GoogleHome o SmartThings**.

### Requisitos previos : 

1. ESP32.
2. YYAC-3S.
3. Bombilla regulable. 
3. Cables jumper.


**No todas las bombillas son regulables.** Revisa la etiqueta del fabricante para comprobar si la bombilla es regulable.

### Breve introducción al YYAC-3S

El módulo YYAC-3S permite controlar el suministro de corriente alterna mediante PWM desde un Arduino, ESP8266, ESP32 o Pico W. Se puede usar para controlar la velocidad de motores de CA y el brillo de bombillas regulables. El circuito consta de un SCR y un optoacoplador en el lado de entrada. Esto impide que la corriente retorne al MCU y además lo aísla de tierra, lo que hace que su uso sea seguro. El módulo admite una entrada PWM de 0-255 y puede controlar tensión alterna de hasta 220 V con una corriente máxima de 3 A.


### Cableado
  
  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_motion_dimmer_switch_wiring.png) 


Conecta el módulo YYAC-3S al microcontrolador de la siguiente manera:
- Pin VCC al pin de 5V del microcontrolador (con 3,3 V no parece funcionar).
- Pin GND al pin GND del ESP32.
- Pin PWM al pin digital 16 del microcontrolador.

| MCU       | Pin PWM del YYAC-3S     |
| --------- | ------- |
| ESP32     |    16   |


Vamos a comprobar que el módulo YYAC-3S está bien cableado y funciona. 


```cpp
const int pwmPin = 16;  // 16 corresponds to GPIO16 of ESP32

// setting PWM properties
const int freq = 1000; // 1KHz
const int ledChannel = 0;
const int resolution = 8;
 
void setup(){
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(pwmPin, ledChannel);
}
 
void loop(){
  
   /* dutyCycle between 0 to 115 does not seems to have an any effect on the bulb. */

  // increase the brightness. 
  for(int dutyCycle = 115; dutyCycle <= 255; dutyCycle++){   
    ledcWrite(ledChannel, dutyCycle);
    delay(15);
  }

  // decrease the brightness
  for(int dutyCycle = 255; dutyCycle >= 115; dutyCycle--){
    ledcWrite(ledChannel, dutyCycle);   
    delay(15);
  } 
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/b34693c62c679437fa3a7465a242d7f2)


El Monitor serie de Arduino IDE mostrará la regulación de la bombilla así:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-YYAC3S.mp4" type="video/mp4">
</video>

### Paso 1 : Crea un dispositivo nuevo en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, abre el menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Dimmer**, la descripción **Dimmer** y selecciona el tipo de dispositivo **Switch With Dimming**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_dimmer_new_device.png)

* Haz clic en la pestaña Others y luego en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret**. ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código completo
  

```cpp
//Uncomment the following line to enable serial debug output
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
#include "SinricProDimSwitch.h"

#define WIFI_SSID         ""    
#define WIFI_PASS         ""
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DIMSWITCH_ID      ""   // Should look like "5dc1564130xxxxxxxxxxxxxx"
#define BAUD_RATE         9600                // Change baudrate to your need

// we use a struct to store all states and values for our dimmable switch
struct {
  bool powerState = false;
  int powerLevel = 0;
} device_state;

// the PWM Pin
const int pwmPin = 16;  // 16 corresponds to GPIO16

// setting PWM properties
const int freq = 1000; // 1KHz
const int ledChannel = 0;
const int resolution = 8;
 
void setPWM(int powerLevel) {
   int dutyCycle = map(powerLevel, 0, 100, 115, 255); // Map power level from 0 to 100, to a value between 115 to 255
   ledcWrite(ledChannel, dutyCycle);
   delay(30);
}

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s power turned %s \r\n", deviceId.c_str(), state?"on":"off");
  device_state.powerState = state;  
  setPWM(state ? 100: 0);
  return true; // request handled properly
}

bool onPowerLevel(const String &deviceId, int &powerLevel) {
  device_state.powerLevel = powerLevel; 
  setPWM(powerLevel);
  Serial.printf("Device %s power level changed to %d\r\n", deviceId.c_str(), device_state.powerLevel);
  return true;
}

bool onAdjustPowerLevel(const String &deviceId, int &levelDelta) {
  device_state.powerLevel += levelDelta;
  Serial.printf("Device %s power level changed about %i to %d\r\n", deviceId.c_str(), levelDelta, device_state.powerLevel);
  levelDelta = device_state.powerLevel;
  setPWM(levelDelta);
  return true;
}

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

void setupSinricPro() {
  SinricProDimSwitch &myDimSwitch = SinricPro[DIMSWITCH_ID];

  // set callback function to device
  myDimSwitch.onPowerState(onPowerState);
  myDimSwitch.onPowerLevel(onPowerLevel);
  myDimSwitch.onAdjustPowerLevel(onAdjustPowerLevel);

  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupYYAC3S(){
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(pwmPin, ledChannel);
} 

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupYYAC3S();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/bb496b32ed359651d357d0769dd83695)

 
Ahora deberías poder controlar el nivel de brillo desde las apps de Alexa, Google Home y SmartThings
  
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-google-home-demo.mp4" type="video/mp4">
</video>

![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Solución de problemas

- ¿No se regula? Revisa la etiqueta del fabricante para comprobar si la bombilla es regulable.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- ¿El PWM no funciona?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_pwm_YYAC-3S.png)

El LED de arriba se enciende cuando el módulo recibe la señal PWM del MCU. 

- Consulta nuestra página [Troubleshooting]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más detalles.

 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Interruptor regulable con un dimmer AC RobotDyn]({{ site.github.url }}/es/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.es.html)
- [Tira LED RGB (5050)]({{ site.github.url }}/es/pages/tutorials/light/LED-Stripe-5050.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)
