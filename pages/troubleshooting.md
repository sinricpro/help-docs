---
title: Troubleshooting
weight: 4
lang: en
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
---

### Troubleshooting tips 

#### Connection is unstable 

* There's a known issue on ESP32 and ESP8266 WiFi being unstable when ADC pins are used.

* Device cycles between "online" and "offline" on SinricPro dashboard. 

    In ESP32 / ESP8266, adding a delay() (or long blocking code) directly affects Wi-Fi performance and stability, because of how the Wi-Fi stack works. So short delays (few ms) are usually safe. But long delays (> ~100ms) can cause Wi-Fi timeouts, missed packets, or disconnects.

    If you have any long delay(x); in the loop() function, you may need to rewrite  them to use them in a non-blocking manner.

Example:

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
#### Cannot connect to SinricPro

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


 
* If none of above works for you, check for existing [issues](https://github.com/sinricpro/esp8266-esp32-sdk/issues) in GitHub repo or open a [new one](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)

* Join the SinricPro on Discord : https://discord.gg/CqjBrkM6
