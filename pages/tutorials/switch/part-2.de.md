---
title: Einen Taster an ein ESP32- oder ESP8266-Relais mit Alexa anschließen (Switch Tutorial Teil 2)
layout: post
lang: de
description: Füge einem ESP32- oder ESP8266-Relais einen Taster hinzu, damit es per Hand und per Alexa oder Google Home umgeschaltet werden kann, mit synchronisiertem Status.
---

In diesem Abschnitt setzen wir [Teil 1]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html) fort und fügen einen Taster hinzu, um das Relais ein- und auszuschalten. Außerdem aktualisieren wir den neuen Status des Relais auf dem Sinric Pro Server.


![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/sinric_pro_relay_push_button_esp8266.png) 
### Voraussetzungen : 


| Komponente    | Anzahl |
| ---------                   | ------- |
| ESP32, ESP8266 oder RaspPi W  |    1     |
| SPDT Relaismodul       |    1     |
| Taster                 |    1     |
| 10K Ohm Widerstand            |    1     | 
| Jumper-Kabel                |    1     | 

### Kurze Einführung in Taster & Entprellung

Taster können beim Drücken oft Fehlsignale erzeugen. Das liegt daran, dass der mechanische Schalter im Taster beim Drücken leicht prellen oder zittern kann. Dadurch kann der Taster mehrere Signale an den Mikrocontroller senden, obwohl er nur einmal gedrückt wurde. Der Vorgang, diese erzeugten Signale zu eliminieren, wird Entprellung (Debouncing) genannt. Um das Rauschen des Tasters zu eliminieren, können wir eine Statusänderung aufzeichnen und weitere Eingaben für ein paar Millisekunden ignorieren.

### Verdrahtung

Es gibt zwei Möglichkeiten, einen Taster zu verdrahten.

![Sinric Pro pull-up pull-down]({{ site.github.url }}/public/img/pull-up-pull-down.png) 

**Pull-Up** – Wenn der Schalter gedrückt wird, liest digitalRead ein LOW (0) Signal.

**Pull-Down** – Wenn der Schalter gedrückt wird, liest digitalRead ein HIGH (1) Signal.
 


| MCU       | Pin     | Komponente     |
| --------- | ------- | ------- |
| ESP32     |    16   |    Relais   |
| ESP32     |    17   |    Taster   |
| ESP8266   |    12 (D6)    |    Relais   |
| ESP8266   |    15 (D8)    |    Taster   |
| RaspPi W  |    6    |    Relais   |
| RaspPi W  |    7    |    Taster   |

Bevor wir das mit dem Sketch aus Teil 1 integrieren, müssen wir prüfen, ob der Taster korrekt verdrahtet ist und funktioniert. Mit folgendem Code kannst du prüfen, ob der Tasterdruck erkannt wird.  

Wir verwenden die **Pull-Down**-Methode, um unseren Taster zu verdrahten.


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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/23d95c1df56a7c2d2ec9aff1dcdf3a90)


![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png) 

Jetzt vervollständigen wir den Sketch mit Taster, Relaismodul und Sinric Pro Integration.


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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/86f6f4c65483d6b5c21ba33f9af48d87)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/relay-on-off-switch.mp4" type="video/mp4">
</video>

Fahre mit [Teil 3]({{ site.github.url }}/de/pages/tutorials/switch/part-2.de.html) dieser Artikelserie fort, um zu lernen, wie man mehrere Taster mit mehreren Relais steuert.


### Fehlerbehebung
Mögliche Lösungen für dein Problem findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).

 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Switch Tutorial Teil 1: ein Relais ein- und ausschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html)
- [Switch Tutorial Teil 3: mehrere Relais und Taster]({{ site.github.url }}/de/pages/tutorials/switch/part-3.de.html)
- [Smart Button]({{ site.github.url }}/de/pages/tutorials/custom-device-types/smart-button/push-button.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
