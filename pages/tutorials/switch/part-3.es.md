---
title: Controla varios relés y pulsadores con ESP32 o ESP8266 y Alexa (tutorial de Switch, parte 3)
layout: post
lang: es
description: Controla varios relés con varios pulsadores en un solo ESP32 o ESP8266, con Alexa y Google Home.
---

En esta sección continuamos desde la [Parte 2]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html) y añadimos varios relés y botones táctiles (también llamados pulsadores)

### Requisitos previos : 

Se necesitan los siguientes componentes.

| Componente    | Cantidad |
| ---------                   | ------- |
| ESP32, ESP8266 o RaspPi W  |    1     |
| Controlador de relé SPDT       |    4     |
| Pulsador                 |    4     |
| Resistencia de 10K ohm            |    4     | 
| Cables jumper                |    4     | 
 
### Cableado
 
Vamos a usar el método Pull-Down para cablear nuestro pulsador. Si no estás seguro de qué significa eso, consulta la [Parte 2]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html) para más detalles.


| MCU       | Pin     | Componente     |
| --------- | ------- | ------- |
| ESP8266   |    D1   |    Relé   |
| ESP8266   |    D2   |    Relé   |
| ESP8266   |    D3   |    Relé   |
| ESP8266   |    D4   |    Relé   |
| ESP8266   |    D5   |    Pulsador   |
| ESP8266   |    D6   |    Pulsador   |
| ESP8266   |    D7   |    Pulsador   |
| ESP8266   |    D8   |    Pulsador   |
| ESP32     |    16   |    Relé   |
| ESP32     |    17   |    Relé   |
| ESP32     |    18   |    Relé   |
| ESP32     |    19   |    Relé   |
| ESP32     |    25   |    Pulsador   |
| ESP32     |    26   |    Pulsador   |
| ESP32     |    27   |    Pulsador   |
| ESP32     |    28   |    Pulsador   |

![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/MultiSwitch_advance_tactile-button.png) 

Ahora completemos el sketch con los pulsadores y relés integrados con Sinric Pro.


```cpp
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProSwitch.h"

#include <map>

#define WIFI_SSID         "YOUR-WIFI-SSID"    
#define WIFI_PASS         "YOUR-WIFI-PASSWORD"
#define APP_KEY           "YOUR-APP-KEY"      // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        "YOUR-APP-SECRET"   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"

// comment the following line if you use a toggle switches instead of tactile buttons
#define TACTILE_BUTTON 1

#define BAUD_RATE   9600

#define DEBOUNCE_TIME 250

#if defined(ESP8266)
  #define RELAYPIN_1 D1
  #define RELAYPIN_2 D2
  #define RELAYPIN_3 D3
  #define RELAYPIN_4 D4
  #define SWITCHPIN_1 D8
  #define SWITCHPIN_2 D7
  #define SWITCHPIN_3 D6
  #define SWITCHPIN_4 D5
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #define LED_BUILTIN 2

  #define RELAYPIN_1 16
  #define RELAYPIN_2 17
  #define RELAYPIN_3 18
  #define RELAYPIN_4 19
  #define SWITCHPIN_1 25
  #define SWITCHPIN_2 26
  #define SWITCHPIN_3 22
  #define SWITCHPIN_4 21
#endif

typedef struct {      // struct for the std::map below
  int relayPIN;
  int flipSwitchPIN;
} deviceConfig_t;


// this is the main configuration
// please put in your deviceId, the PIN for Relay and PIN for flipSwitch
// this can be up to N devices...depending on how much pin's available on your device ;)
// right now we have 4 devicesIds going to 4 relays and 4 flip switches to switch the relay manually
std::map<String, deviceConfig_t> devices = {
    //{deviceId, {relayPIN,  flipSwitchPIN}}
    {"SWITCH_ID_NO_1_HERE", {  RELAYPIN_1, SWITCHPIN_1 }},
    {"SWITCH_ID_NO_2_HERE", {  RELAYPIN_2, SWITCHPIN_2 }},
    {"SWITCH_ID_NO_3_HERE", {  RELAYPIN_3, SWITCHPIN_3 }},
    {"SWITCH_ID_NO_4_HERE", {  RELAYPIN_4, SWITCHPIN_4 }}      
};

typedef struct {      // struct for the std::map below
  String deviceId;
  bool lastFlipSwitchState;
  unsigned long lastFlipSwitchChange;
} flipSwitchConfig_t;

std::map<int, flipSwitchConfig_t> flipSwitches;    // this map is used to map flipSwitch PINs to deviceId and handling debounce and last flipSwitch state checks
                                                  // it will be setup in "setupFlipSwitches" function, using informations from devices map

void setupRelays() { 
  for (auto &device : devices) {           // for each device (relay, flipSwitch combination)
    int relayPIN = device.second.relayPIN; // get the relay pin
    pinMode(relayPIN, OUTPUT);             // set relay pin to OUTPUT
  }
}

void setupFlipSwitches() {
  for (auto &device : devices)  {                     // for each device (relay / flipSwitch combination)
    flipSwitchConfig_t flipSwitchConfig;              // create a new flipSwitch configuration

    flipSwitchConfig.deviceId = device.first;         // set the deviceId
    flipSwitchConfig.lastFlipSwitchChange = 0;        // set debounce time
    flipSwitchConfig.lastFlipSwitchState = false;     // set lastFlipSwitchState to false (LOW)

    int flipSwitchPIN = device.second.flipSwitchPIN;  // get the flipSwitchPIN

    flipSwitches[flipSwitchPIN] = flipSwitchConfig;   // save the flipSwitch config to flipSwitches map
    pinMode(flipSwitchPIN, INPUT);                   // set the flipSwitch pin to INPUT
  }
}

bool onPowerState(String deviceId, bool &state)
{
  Serial.printf("%s: %s\r\n", deviceId.c_str(), state ? "on" : "off");
  int relayPIN = devices[deviceId].relayPIN; // get the relay pin for corresponding device
  digitalWrite(relayPIN, state);             // set the new relay state

   /* If your relay is activated with low signal, change the above to below code
  digitalWrite(RELAYPIN_1, !state); */

  return true;
}

void handleFlipSwitches() {
  unsigned long actualMillis = millis();                                          // get actual millis
  for (auto &flipSwitch : flipSwitches) {                                         // for each flipSwitch in flipSwitches map
    unsigned long lastFlipSwitchChange = flipSwitch.second.lastFlipSwitchChange;  // get the timestamp when flipSwitch was pressed last time (used to debounce / limit events)

    if (actualMillis - lastFlipSwitchChange > DEBOUNCE_TIME) {                    // if time is > debounce time...

      int flipSwitchPIN = flipSwitch.first;                                       // get the flipSwitch pin from configuration
      bool lastFlipSwitchState = flipSwitch.second.lastFlipSwitchState;           // get the lastFlipSwitchState
      bool flipSwitchState = digitalRead(flipSwitchPIN);                          // read the current flipSwitch state
      if (flipSwitchState != lastFlipSwitchState) {                               // if the flipSwitchState has changed...
#ifdef TACTILE_BUTTON
        if (flipSwitchState) {                                                    // if the tactile button is pressed 
#endif      
          flipSwitch.second.lastFlipSwitchChange = actualMillis;                  // update lastFlipSwitchChange time
          String deviceId = flipSwitch.second.deviceId;                           // get the deviceId from config
          int relayPIN = devices[deviceId].relayPIN;                              // get the relayPIN from config
          bool newRelayState = !digitalRead(relayPIN);                            // set the new relay State
          digitalWrite(relayPIN, newRelayState);                                  // set the trelay to the new state

          SinricProSwitch &mySwitch = SinricPro[deviceId];                        // get Switch device from SinricPro
          mySwitch.sendPowerStateEvent(newRelayState);                            // send the event
#ifdef TACTILE_BUTTON
        }
#endif      
        flipSwitch.second.lastFlipSwitchState = flipSwitchState;                  // update lastFlipSwitchState
      }
    }
  }
}

void setupWiFi()
{
  Serial.printf("\r\n[Wifi]: Connecting");
  
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.printf(".");
    delay(250);
  }
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

void setupSinricPro()
{
  for (auto &device : devices)
  {
    const char *deviceId = device.first.c_str();
    SinricProSwitch &mySwitch = SinricPro[deviceId];
    mySwitch.onPowerState(onPowerState);
  }

  //SinricPro.restoreDeviceStates(true); // Uncomment to restore the last known state from the server.
  SinricPro.begin(APP_KEY, APP_SECRET);  
}

void setup()
{
  Serial.begin(BAUD_RATE);
  setupRelays();
  setupFlipSwitches();
  setupWiFi();
  setupSinricPro();
}

void loop()
{
  SinricPro.handle();
  handleFlipSwitches();
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/4c23e8fa19ffe37730cb0995dc2e15a9)

 
### Solución de problemas
Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para posibles soluciones a tu problema.


 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Tutorial de Switch, parte 1: encender y apagar un relé]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html)
- [Tutorial de Switch, parte 2: controlar el relé con un pulsador]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html)
- [Módulos: varios dispositivos en una sola placa]({{ site.github.url }}/es/pages/modules.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea una [incidencia](https://github.com/sinricpro/help-docs)
