---
title: Fehlerbehebung
weight: 4
lang: de
description: Häufige Sinric Pro Probleme auf ESP32 und ESP8266 beheben. Instabile Verbindung, Gerät offline, Alexa oder Google Home reagiert nicht.
---

### Tipps zur Fehlerbehebung 

### Verbindung ist instabil (Gerät wechselt im SinricPro Dashboard ständig zwischen „online“ und „offline“) 

Beim ESP32 / ESP8266 wirkt sich ein delay() (oder lang blockierender Code) direkt auf die Leistung und Stabilität des WLANs aus. Das liegt an der Funktionsweise des WLAN-Stacks. Kurze Verzögerungen (wenige ms) sind in der Regel unproblematisch. Lange Verzögerungen (> ~100ms) können dagegen zu WLAN-Timeouts, verlorenen Paketen oder Verbindungsabbrüchen führen.

Wenn in deiner loop()-Funktion ein langes delay(x); steht, musst du diese Stellen möglicherweise so umschreiben, dass sie nicht blockieren.

Beispiel (schlechter Code):


```c++
const int ledPin = 2;

void setup() {   
    pinMode(ledPin, OUTPUT);
}

void loop() {
    delay(5000) //!!!!!!!!!!! DO NOT DO THIS!!!!!!!!!
    digitalWrite(ledPin, !digitalRead(ledPin));
}
```

Beispiel (guter Code):

```c++
const int ledPin = 2;

// Variables to manage timing
unsigned long previousMillis = 0;  // Stores last time LED was updated
const long interval = 1000;        // Interval for blinking (milliseconds)

void setup() {
    // Initialize the LED pin as an output
    pinMode(ledPin, OUTPUT);
}

void loop() {
    // Get the current time
    unsigned long currentMillis = millis();

    // Check if the interval has passed
    if (currentMillis - previousMillis >= interval) {
        // Save the current time
        previousMillis = currentMillis;

        // Toggle the LED state
        digitalWrite(ledPin, !digitalRead(ledPin));
    }
}
```

### Bekanntes Problem: Instabiles WLAN auf ESP32/ESP8266 bei Verwendung von ADC-Pins

Wenn du mit **ESP32** oder **ESP8266** entwickelst und dein WLAN sich unberechenbar verhält, etwa mit häufigen Verbindungsabbrüchen, schwachem Signal oder fehlgeschlagenen Verbindungsversuchen, dann hast du es möglicherweise mit einer gut dokumentierten Eigenheit der Hardware zu tun: **instabiles WLAN, während Pins des Analog-Digital-Wandlers (ADC) verwendet werden**.

#### Was passiert da?

Sowohl der ESP32 als auch der ESP8266 nutzen für das WLAN-Funkmodul und den ADC-Betrieb gemeinsame interne Ressourcen. Wenn der ADC aktiv abtastet (vor allem mit hoher Frequenz oder bei kontinuierlichem Auslesen), kann das die HF-Schaltung stören, die für die WLAN-Kommunikation zuständig ist. Die Folgen:

- Abgebrochene WLAN-Verbindungen
- Höhere Latenz oder Paketverlust
- Probleme, die Verbindung zum Access Point aufrechtzuerhalten
- Im Extremfall ein kompletter WLAN-Ausfall bis zum Neustart

Das Problem fällt besonders auf, wenn du:

- Analoge Sensoren (z. B. Potentiometer, LDRs, analoge Joysticks) in engen Schleifen ausliest
- `analogRead()` häufig und ohne Verzögerungen aufrufst
- Am ADC des ESP32 mit hoher Auflösung oder Abtastrate misst

#### Workarounds und bewährte Vorgehensweisen

1. **Verzögerungen zwischen ADC-Messungen einfügen**  
   Vermeide kontinuierliches Polling. Füge zwischen den analogen Messungen kleine Verzögerungen ein (z. B. `delay(10)` oder `vTaskDelay()`), damit der WLAN-Stack Luft zum Atmen hat.

   ```cpp
   int sensorValue = analogRead(A0);
   delay(10); // Let WiFi recover

## Cannot connect to SinricPro

* Try starting a hotspot from your mobile phone and then connect your ESP to SinricPro via the hotspot. If you can connect to SinricPro via the hotspot, then the problem is with your WiFi network. 

* Try switching to a different WiFi network if possible.    

* Always start by trying our example sketches, changing only the credentials. They have been thoroughly tested and are known to work correctly.

#### Logging 

##### SinricPro SDK Logging

* Enable logging and check for errors, and disconnections. To enable logs Sinric Pro SDK logs, add ``#define ENABLE_DEBUG`` to top of the sketch.

##### ESP8266/ESP32 Core Logging

    * To enable ESP8266 logs, in Arduinio IDE:

        1. `Tools -> Debug Serial Port -> Serial`

        2. `Tools -> Debug Level -> SSL + HTTP_CLIENT`

    * To enable ESP32 logs, in Arduinio IDE:

        1. `Tools -> Core Debug Level -> Verbose`

#### Memory Limitation 

* Sometimes, due to memory limitations, the ESP chip may fail while trying to establish the SSL connection to the SinricPro server. In this case, you can try disabling the SSL feature by adding `#define SINRICPRO_NOSSL` to the **top of the sketch (before #include "SinricPro.h")**:

    ```c++
    #define SINRICPRO_NOSSL
    #include "SinricPro.h"
    ...
    ```


 
* Wenn dir nichts davon hilft, sieh im GitHub-Repository nach bestehenden [Issues](https://github.com/sinricpro/esp8266-esp32-sdk/issues) oder eröffne ein [neues](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)

* Komm zu SinricPro auf Discord : https://discord.gg/CqjBrkM6
