---
title: Dimmbarer Schalter mit YYAC-3S für ESP32
layout: post
lang: de
description: Baue einen dimmbaren Schalter mit einem ESP32 und einem YYAC-3S AC-Dimmermodul. Steuere die Helligkeit mit Alexa, Google Home oder SmartThings.
---

In diesem Abschnitt bauen wir einen **dimmbaren Schalter** mit dem **ESP32** und steuern anschließend die Helligkeit über **Amazon Alexa, Google Home oder SmartThings**.

### Voraussetzungen : 

1. ESP32.
2. YYAC-3S.
3. Dimmbare Glühlampe. 
3. Jumperkabel.


**Nicht alle Glühlampen sind dimmbar.** Prüfe das Etikett des Herstellers, um festzustellen, ob die Lampe dimmbar ist.

### Kurze Einführung zum YYAC-3S

Das YYAC-3S-Modul kann verwendet werden, um die AC-Stromversorgung per PWM von einem Arduino, ESP8266, ESP32 oder Pico W zu steuern. Es lässt sich zur Drehzahlregelung von AC-Motoren und zur Helligkeitssteuerung dimmbarer Glühlampen einsetzen. Die Schaltung besteht aus einem Thyristor (SCR) und einem Optokoppler auf der Eingangsseite. Das verhindert einen Rückfluss von Strom zum MCU und trennt ihn zudem von Masse, was die Nutzung sicher macht. Das Modul unterstützt einen PWM-Eingang von 0-255 und kann AC-Spannungen bis 220V mit maximal 3A steuern.


### Verdrahtung
  
  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_motion_dimmer_switch_wiring.png) 


Verbinde das YYAC-3S-Modul wie folgt mit dem Mikrocontroller:
- VCC-Pin mit dem 5V-Pin des Mikrocontrollers (3,3V scheint nicht zu funktionieren).
- GND-Pin mit dem GND-Pin des ESP32.
- PWM-Pin mit einem digitalen Pin 16 am Mikrocontroller.

| MCU       | YYAC-3S PWM Pin     |
| --------- | ------- |
| ESP32     |    16   |


Lass uns prüfen, ob das YYAC-3S-Modul korrekt verdrahtet ist und funktioniert. 


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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/b34693c62c679437fa3a7465a242d7f2)


Der Serial Monitor der Arduino IDE zeigt das Dimmen der Lampe so an:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-YYAC3S.mp4" type="video/mp4">
</video>

### Schritt 1 : Neues Gerät in Sinric Pro anlegen

* [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an, öffne links das Menü **Devices** und klicke auf **Add Device** (oben links).
* Gib als Gerätenamen **Dimmer**, als Beschreibung **Dimmer** ein und wähle als Gerätetyp **Switch With Dimming**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_dimmer_new_device.png)

* Klicke auf den Reiter Others und klicke auf **Save**

* Die nächste Seite zeigt die Zugangsdaten, die dein Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Vollständiger Code
  

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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/bb496b32ed359651d357d0769dd83695)

 
Jetzt solltest du die Helligkeit über Alexa, Google Home und die SmartThings App steuern können.
  
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-google-home-demo.mp4" type="video/mp4">
</video>

![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Fehlerbehebung

- Dimmt nicht? Prüfe das Etikett des Herstellers, um festzustellen, ob die Glühlampe dimmbar ist.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- PWM funktioniert nicht?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_pwm_YYAC-3S.png)

Die obige LED leuchtet, wenn das Modul das PWM-Signal vom MCU empfängt. 

- Weitere Informationen findest du auf unserer Seite [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html).

 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Dimmbarer Schalter mit einem RobotDyn AC-Dimmer]({{ site.github.url }}/de/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.de.html)
- [RGB LED-Streifen (5050)]({{ site.github.url }}/de/pages/tutorials/light/LED-Stripe-5050.de.html)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)