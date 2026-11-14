---
title: Mehrere Relais und Taster mit ESP32 oder ESP8266 und Alexa steuern (Switch Tutorial Teil 3)
layout: post
lang: de
description: Steuere mehrere Relais mit mehreren Tastern auf einem ESP32 oder ESP8266, mit Alexa und Google Home.
---

In diesem Abschnitt setzen wir [Teil 2]({{ site.github.url }}/de/pages/tutorials/switch/part-2.de.html) fort und fügen mehrere Relais und Taster hinzu

### Voraussetzungen : 

Folgende Komponenten werden benötigt.

| Komponente    | Anzahl |
| ---------                   | ------- |
| ESP32, ESP8266 oder RaspPi W  |    1     |
| SPDT Relaismodul       |    4     |
| Taster                 |    4     |
| 10K Ohm Widerstand            |    4     | 
| Jumper-Kabel                |    4     | 
 
### Verdrahtung
 
Wir verwenden die Pull-Down-Methode, um unsere Taster zu verdrahten. Wenn du nicht sicher bist, was das bedeutet, findest du weitere Details in [Teil 2]({{ site.github.url }}/de/pages/tutorials/switch/part-2.de.html).


| MCU       | Pin     | Komponente     |
| --------- | ------- | ------- |
| ESP8266   |    D1   |    Relais   |
| ESP8266   |    D2   |    Relais   |
| ESP8266   |    D3   |    Relais   |
| ESP8266   |    D4   |    Relais   |
| ESP8266   |    D5   |    Taster   |
| ESP8266   |    D6   |    Taster   |
| ESP8266   |    D7   |    Taster   |
| ESP8266   |    D8   |    Taster   |
| ESP32     |    16   |    Relais   |
| ESP32     |    17   |    Relais   |
| ESP32     |    18   |    Relais   |
| ESP32     |    19   |    Relais   |
| ESP32     |    25   |    Taster   |
| ESP32     |    26   |    Taster   |
| ESP32     |    27   |    Taster   |
| ESP32     |    28   |    Taster   |

![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/MultiSwitch_advance_tactile-button.png) 

Jetzt vervollständigen wir den Sketch mit Tastern und Relais mit Sinric Pro Integration.


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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/4c23e8fa19ffe37730cb0995dc2e15a9)

 
### Fehlerbehebung
Mögliche Lösungen für dein Problem findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).


 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Switch Tutorial Teil 1: ein Relais ein- und ausschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html)
- [Switch Tutorial Teil 2: das Relais mit einem Taster umschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-2.de.html)
- [Module: mehrere Geräte auf einer Platine]({{ site.github.url }}/de/pages/modules.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
