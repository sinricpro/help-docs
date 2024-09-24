---
title: Troubleshooting
weight: 4
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
---

### Troubleshooting tips 

* Always start by trying our example sketches, changing only the credentials. They have been thoroughly tested and are known to work correctly.

* There's a known issue on ESP32 and ESP8266 WiFi being unstable when ADC is used.

* Enable logging and check for errors, and disconnections. To enable logs Sinric Pro SDK logs, add ``#define ENABLE_DEBUG`` to top of the sketch.

    * To enable ESP8266 logs, in Arduinio IDE:

        1. `Tools -> Debug Serial Port -> Serial`

        2. `Tools -> Debug Level -> SSL + HTTP_CLIENT`

    * To enable ESP32 logs, in Arduinio IDE:

        1. `Tools -> Core Debug Level -> Verbose`


* Try starting a hotspot from your mobile phone and then connect your ESP to SinricPro via the hotspot. If you can connect to SinricPro via the hotspot, then the problem is with your WiFi network. 

* Try switching to a different WiFi network if possible.

* Sometimes, due to memory limitations, the ESP chip may fail while trying to establish the SSL connection to the SinricPro server. In this case, you can try disabling the SSL feature by adding the following line to the **top of the sketch**:

    ```#define SINRICPRO_NOSSL```

* If you have any long delay(x); in the loop() function, you may need to remove them.
 
* If none of above works for you, check for existing [issues](https://github.com/sinricpro/esp8266-esp32-sdk/issues) in GitHub repo or open a [new one](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)
