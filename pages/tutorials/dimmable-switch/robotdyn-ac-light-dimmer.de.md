---
title: RobotDyn AC-Dimmer mit ESP32 oder ESP8266 für Alexa und Google Home
layout: post
lang: de
description: Verdrahte ein RobotDyn AC-Dimmermodul mit einem ESP32 oder ESP8266. Behandelt die RBDdimmer Bibliothek, die Parameter des dimmerLamp-Konstruktors, Zero-Cross- und PWM-Pins sowie die Steuerung über Alexa und Google Home.
---

In diesem Abschnitt bauen wir einen **Lichtdimmer mit RobotDyn** und steuern anschließend die Helligkeit über **Alexa, Google Home oder SmartThings**.

### Voraussetzungen : 

1. ESP32 oder ESP8266 x 1.
2. RobotDyn AC-Dimmer.
3. Dimmbare Glühlampe. 
3. Jumperkabel.


**Nicht alle Glühlampen sind dimmbar.** Prüfe das Etikett des Herstellers, um festzustellen, ob die Lampe dimmbar ist.

### Kurze Einführung zum RobotDyn AC-Dimmermodul

Das RobotDyn AC-Dimmermodul ist ein Gerät, mit dem du die Helligkeit von AC-Leuchtmitteln über einen Mikrocontroller steuern kannst. Es ist ein kleines und einfach zu nutzendes Modul, das mit Mikrocontrollern wie dem ESP8266 oder ESP32 verwendet werden kann. Das Modul arbeitet mit einem Triac, um den Stromfluss zur Lampe zu steuern. Der Triac ist ein Halbleiterbauteil, mit dem sich AC-Strom ein- und ausschalten lässt. Das RobotDyn AC-Dimmermodul nutzt ein PWM-Signal, um den Triac zu steuern, der wiederum die Helligkeit der Lampe regelt.

### Verdrahtung des RobotDyn AC-Dimmers

Mit der folgenden Pin-Zuordnungstabelle kannst du deinen ESP32/ESP8266 mit dem RobotDyn AC-Dimmermodul verbinden.

 ```
 *  +---------------+-------------------------+-------------------------+
 *  |   Board       | INPUT Pin               | OUTPUT Pin              |
 *  |               | Zero-Cross              | PWM                     |
 *  +---------------+-------------------------+-------------------------+
 *  | ESP8266       | D1(IO5),    D2(IO4),    | D0(IO16),   D1(IO5),    |
 *  |               | D5(IO14),   D6(IO12),   | D2(IO4),    D5(IO14),   |
 *  |               | D7(IO13),   D8(IO15),   | D6(IO12),   D7(IO13),   |
 *  |               |                         | D8(IO15)                |
 *  +---------------+-------------------------+-------------------------+
 *  | ESP32         | 4(GPI36),   6(GPI34),   | 8(GPO32),   9(GP033),   |
 *  |               | 5(GPI39),   7(GPI35),   | 10(GPIO25), 11(GPIO26), |
 *  |               | 8(GPO32),   9(GP033),   | 12(GPIO27), 13(GPIO14), |
 *  |               | 10(GPI025), 11(GPIO26), | 14(GPIO12), 16(GPIO13), |
 *  |               | 12(GPIO27), 13(GPIO14), | 23(GPIO15), 24(GPIO2),  |
 *  |               | 14(GPIO12), 16(GPIO13), | 25(GPIO0),  26(GPIO4),  |
 *  |               | 21(GPIO7),  23(GPIO15), | 27(GPIO16), 28(GPIO17), |
 *  |               | 24(GPIO2),  25(GPIO0),  | 29(GPIO5),  30(GPIO18), |
 *  |               | 26(GPIO4),  27(GPIO16), | 31(GPIO19), 33(GPIO21), |
 *  |               | 28(GPIO17), 29(GPIO5),  | 34(GPIO3),  35(GPIO1),  |
 *  |               | 30(GPIO18), 31(GPIO19), | 36(GPIO22), 37(GPIO23), |
 *  |               | 33(GPIO21), 35(GPIO1),  |                         |
 *  |               | 36(GPIO22), 37(GPIO23), |                         |
 *  +---------------+-------------------------+-------------------------+
```

  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_switch_wiring.png) 


Verbinde das RobotDyn-Modul wie folgt mit dem Mikrocontroller:
- VCC-Pin mit dem 5V-Pin des Mikrocontrollers (3,3V scheint nicht zu funktionieren).
- GND-Pin mit dem GND-Pin des ESP32.
- PWM-Pin mit einem digitalen Pin 2 am Mikrocontroller.
- Z-C-Pin mit einem digitalen Pin 4 am Mikrocontroller.

| MCU       | Zero Cross Pin    | PWM/ADC Pin    |
| --------- | -------           | -------        |
| ESP32     |    4              | 2


### RBDdimmer Bibliothek (RBDdimmer.h)

Der Code in diesem Tutorial nutzt die [RBDdimmer](https://github.com/RobotDynOfficial/RBDDimmer) Bibliothek von RobotDyn. Lade sie als ZIP-Datei von GitHub herunter und füge sie in der Arduino IDE über **Sketch > Include Library > Add .ZIP Library** hinzu.

#### Parameter des dimmerLamp-Konstruktors

```c++
#include <RBDdimmer.h>

// ESP32, ESP8266, Arduino Due: you choose both pins
dimmerLamp dimmer(outputPin, zeroCrossPin);

// Arduino UNO, Nano, Mega, Leonardo, M0/Zero: the zero-cross pin is fixed
dimmerLamp dimmer(outputPin);
```

| Parameter | Beschreibung |
| --- | --- |
| `outputPin` | GPIO, der mit dem **PWM**-Pin (DIM/PSM) des Moduls verbunden ist |
| `zeroCrossPin` | GPIO, der mit dem **Z-C**-Pin des Moduls verbunden ist. Nur auf Boards, bei denen der Zero-Cross-Pin geändert werden kann (ESP32, ESP8266, Arduino Due). Bei UNO, Nano und Mega ist er fest auf D2, bei Leonardo und M0/Zero auf D7 |

Auf einem ESP32 sind die GPIOs 34, 35, 36 und 39 reine Eingänge. Sie können für den Zero-Cross-Pin genutzt werden, aber nicht für den PWM-Ausgangspin.

#### Funktionen

| Funktion | Beschreibung |
| --- | --- |
| `begin(NORMAL_MODE, ON)` | Startet den Dimmer. Erster Parameter: `NORMAL_MODE` oder `TOGGLE_MODE`. Zweiter Parameter: `ON` oder `OFF` |
| `setPower(int power)` | Setzt die Helligkeit von 0 bis 100 (%) |
| `getPower()` | Gibt die aktuelle Helligkeit zurück (0 bis 100) |
| `setState(ON)` / `setState(OFF)` | Schaltet den Ausgang ein oder aus |
| `getState()` | Gibt den aktuellen Zustand zurück |
| `changeState()` | Wechselt in den entgegengesetzten Zustand |
| `setMode(NORMAL_MODE)` / `getMode()` | Setzt oder liest den Arbeitsmodus |
| `toggleSettings(int minValue, int maxValue)` | Lässt im `TOGGLE_MODE` die Helligkeit zwischen den beiden Werten auf- und abblenden |

Beispiel:

```c++
#include <RBDdimmer.h>

#define PWM_PIN        2
#define ZERO_CROSS_PIN 4

dimmerLamp dimmer(PWM_PIN, ZERO_CROSS_PIN);

void setup() {
  dimmer.begin(NORMAL_MODE, ON);
  dimmer.setPower(50); // 50% brightness
}

void loop() {}
```

Lass uns prüfen, ob das RobotDyn AC-Dimmermodul korrekt verdrahtet ist und funktioniert.


```cpp
#include <RBDdimmer.h> //https://github.com/RobotDynOfficial/RBDDimmer

const int ZC_PIN  = 0;
const int PWM_PIN  = 2;

int MIN_POWER  = 0;
int MAX_POWER  = 80;
int POWER_STEP  = 2;
int power  = 0;

dimmerLamp acd(PWM_PIN, ZC_PIN);

void setup(){
    Serial.begin(115200);
    delay(100);
    acd.begin(NORMAL_MODE, ON);
}

void loop(){
  for(power=MIN_POWER;power<=MAX_POWER;power+=POWER_STEP){
    acd.setPower(power);      
    delay(100);
  }

  for(power=MAX_POWER;power>=MIN_POWER;power-=POWER_STEP){
    acd.setPower(power);
    delay(100);
  }
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/b19a35476ee6086b8dcf605caf43d6da)


Der Serial Monitor der Arduino IDE zeigt das Dimmen so an:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-RobotDyn.mp4" type="video/mp4">
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

#include <RBDdimmer.h> //https://github.com/RobotDynOfficial/RBDDimmer

#include "SinricPro.h"
#include "SinricProDimSwitch.h"

#define WIFI_SSID         ""    
#define WIFI_PASS         ""
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DIMSWITCH_ID      ""   // Should look like "5dc1564130xxxxxxxxxxxxxx"
#define BAUD_RATE         115200                // Change baudrate to your need

const int ZC_PIN  = 4;
const int PWM_PIN  = 2;
const int MIN_POWER  = 0;
const int MAX_POWER  = 80;
int power  = 0;

dimmerLamp acd(PWM_PIN, ZC_PIN);

// we use a struct to store all states and values for our dimmable switch
struct {
  bool powerState = false;
  int powerLevel = 0;
} device_state;

void setPWM(int powerLevel) {
   int power = map(powerLevel, 0, 100, MIN_POWER, MAX_POWER); // Map power level from 0 to 100, to a value between 0 to 80
   acd.setPower(power);     
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

void setupRBDdimmer(){
   acd.begin(NORMAL_MODE, ON);
} 

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupRBDdimmer();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/e968bee3afd66401b1fb7020e591dd3d)


 
 
![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Fehlerbehebung

- Dimmt nicht? Prüfe das Etikett des Herstellers, um festzustellen, ob die Glühlampe dimmbar ist.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- PWM funktioniert nicht?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_pwm_indicator.jpg)

Die obige LED leuchtet, wenn das Modul das PWM-Signal vom MCU empfängt. 

- Weitere Informationen findest du auf unserer Seite [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html).

 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Dimmbarer Schalter mit einem YYAC-3S-Modul]({{ site.github.url }}/de/pages/tutorials/dimmable-switch/YYAC-3S.de.html)
- [RGB LED-Streifen (5050)]({{ site.github.url }}/de/pages/tutorials/light/LED-Stripe-5050.de.html)
- [Switch Tutorial Teil 1: ein Relais ein- und ausschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)