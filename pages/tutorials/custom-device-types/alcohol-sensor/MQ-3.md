---
title:  How to Build a Gas Sensor to detect alcohol, ethanol, smoke in the air using a MQ-3 using ESP32, ESP8266 or Raspberry Pi Pico W for Alexa
layout: post
description: Build an MQ-3 gas sensor with an ESP32, ESP8266 or Raspberry Pi Pico W to detect alcohol, ethanol and smoke, with Alexa and push notifications.
---

In this section, we'll guide you through building an gas sensor using an **ESP32**, **Raspberry Pi Pico W** or **ESP8266**. You'll then be able to monitor the alcohol concentration in the air through **Amazon Alexa** and **receive push notifications**  via the Sinric Pro app when the sensor detects a certain level.

### Prerequisites : 

1. ESP32, ESP8266 x 1.
2. MQ-3 x 1.
3. Jumper Wires.

![Sinric Pro MQ-3 alcohol gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-intro.jpg)

### Quick introduction to MQ-3

The MQ-3 is a semiconductor gas sensor used in a variety of applications to detect alcohol concentrations in air. It is a low-cost, high-sensitivity sensor that is easy to use. The MQ-3 is based on the principle of tin dioxide (SnO2) semiconductor gas sensing. When alcohol molecules are present in the air, they are adsorbed onto the surface of the SnO2. This adsorption causes the conductivity of the SnO2 to change, which can be measured as an electrical signal. The MQ-3 is sensitive to a wide range of alcohol concentrations, from 0.05 ppm to 5000 ppm. It is also sensitive to other gases, such as ammonia, benzene, and toluene, but it is most sensitive to alcohol.

The MQ3 sensor requires a power supply of 5V and consumes about 800mW of current. The digital output can be connected to a ESP32, ESP8266 or Pico W to measure the alcohol concentration.

**How to calibrate the sensor ?**

Leave it powered on for 24-48 hours to burn it in and stabilize.

Specification sheet: [MQ-3](https://www.sparkfun.com/datasheets/Sensors/MQ-3.pdf)

### Wiring

![Sinric Pro esp8266 MQ-3 wiring]({{ site.github.url }}/public/img/sinricpro_mq3-wiring-diagram.png) 


| MCU       | A0 Pin                    |  VCC Pin  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   5V      |
| ESP8266   |    A0                     |   5V/VIN  |
| Pico W    |    GP26 (ADC0)            |   5V      |
 


**Note:** on ESP32, ADC2 (GPIO04, GPIO02, GPIO15) is unstable when Wi-Fi is being used.

Let's verify that the sensor is wired correctly and working. 


```cpp
#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

int sensorVal;

void setup() {
 Serial.begin(9600);
 Serial.println("warming up for 20 seconds ..!");
 delay(20000);
}

void loop() {
 sensorVal = analogRead(adcPin);
 Serial.printf("value: %d\r\n", sensorVal);
 delay(2000); // delay 2s
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/580e05d98109e36f6b4ace84bded1c7b)


Reading when not exposed to alcohol (around 760):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-reading.png)

When exposed to Jack Daniel's Single Barrel Tennessee Whiskey (around 850):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-jack-daniels-reading.png)

 
### Step 1 : Connect to Sinric Pro 

#### Step 1.1 : Creating a custom device type for Gas Sensor.

Sinric Pro does not have a built-in device type for Gas Sensor so we are going to create a custom device type for Gas Sensor using Device Template feature.

1. Alcohol Detected/Not Detected. 

**Note**: You can use the device template import feature mentioned below to skip creating the full template.

* [Login](https://portal.sinric.pro/devicetemplates/new) to your Sinric Pro account and goto **Device Templates**

* Click **Add Device Template**. Enter name and description as **Gas Sensor** and select **Gas Sensor** as device type

![Sinric Pro gas ensor device template]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-basic-info.png) 

* Click **Capabilities**. 

Here we must select the features of our Gas Sensor. We want to know whether *Alcohol* is *Detected, Not-Detected*. So let's drag a **Mode** and **Push Notification** capability.

![Sinric Pro custom device type for gas sensor]({{ site.github.url }}/public/img/gas-sensor-set-template-drop-range-mode.png) 

- What's Mode capability?

  Mode capability can be use to represents a value out of list of predefined values. eg: current wash cycle mode of a washing machine.

- What's Push Notification capability?

  Notification capability provides the ability to send a push notification message from the code.

Click on **Configure** button and setup the two capabilities like below.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-mode.png)  

Click on **Save** to save.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-template-range-and-mode-configured.png)  

Click on **Save** to save the template.

Now you can see the template we just created.


## Import an existing template?

If you are feeling lazy setup all the Modes values, you can use the import feature.

![Sinric Pro gas sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Paste this Template:


```json
{
  "name": "Gas Sensor",
  "description": "Gas Sensor",
  "deviceTypeId": "654d7ef928f14e9ac82ad57d",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Alcohol",
        "nonControllable": true,
        "modeValues": [
          "Detected",
          "Not-Detected"
        ]
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/9fdaaaa176a83414961756cf276b82d5)


* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).

* Enter the device name **Gas Sensor**, description **Gas Sensor** and select the device type as **Gas Sensor** from **Your Device Templates**.


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-new-device-info.png)

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

* Click on **Code Generator** to Generate the code. Click on **Download** to download the code.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library 

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 

#### 2.2 Complete Code


**GasSensor.h**

```cpp
#ifndef _GASSENSOR_H_
#define _GASSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/PushNotification.h>

class GasSensor 
: public SinricProDevice
, public ModeController<GasSensor>
, public PushNotification<GasSensor> {
  friend class ModeController<GasSensor>;
  friend class PushNotification<GasSensor>;
public:
  GasSensor(const String &deviceId) : SinricProDevice(deviceId, "GasSensor") {};
};

#endif
```

**sinricpro-mq4-sensor.ino**

```cpp
// Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>
#ifdef ESP8266
  #include <ESP8266WiFi.h>
#endif
#ifdef ESP32
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include "GasSensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.

#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define DEVICE_ID         ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

const int GAS_DETECTED_THRESHOLD = 850;       // Change accordingly

GasSensor &gasSensor = SinricPro[DEVICE_ID];
int sensorVal;
String sensorState = "";
String lastSensorState = "";

// ModeController
void updateMode(String mode) {
  gasSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// PushNotificationController
void sendPushNotification(String notification) {
  gasSensor.sendPushNotification(notification);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

 void handleM3Sensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  sensorVal = analogRead(adcPin);
  Serial.printf("Sensor value: %d\r\n", sensorVal); 

  if (sensorVal > GAS_DETECTED_THRESHOLD) { // "Detected" or "Not-Detected" (from ModeController mode values)
    sensorState = "Detected"; 
  } else {
    sensorState = "Not-Detected";
  }

  if(sensorState != lastSensorState) {
    /* update server with "detected" / "Not-Detected" status */
    updateMode(sensorState); 

    /* send a push notification when gas detected */
    if(sensorState == "Detected") {
      sendPushNotification("Gas Detected!!!");
    }    
  } 

  lastSensorState = sensorState;  // save to compare next time.
}

void setupWiFi() {
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(SSID, PASS);
  Serial.printf("[WiFi]: Connecting to %s", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf("connected\r\n");
}

void setup() {
  Serial.begin(BAUD_RATE);
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleM3Sensor();
  SinricPro.handle();
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/e9d05233bc97f29a403a101810e36795)

 
Now you should be able to see the alcholol detected status and water level via Alexa, Sinric Pro App

Alexa, What's the alcholol (mode name) in Gas Sensor (device name)
 

![Sinric Pro Alexa gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-alexa.jpg)
 
![Sinric Pro Portal gas sensor portal]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-portal.png)
 
 ### Step 3 : Voice Announcements!

✅ How it works:

1️⃣ Add a Switch in SinricPro (your secret trigger!)

2️⃣ Create an Alexa Routine that speaks your message when a "Gas sensor detects gas!" when Switch turned on

3️⃣ Send a power state event to turn ON that switch from your code

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
```

### Troubleshooting
1. Google Home or SmartThings are not Supported.

2. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.
 

### Related tutorials

- [How to control an ESP32 or ESP8266 with Alexa and Google Home]({{ site.github.url }}/pages/tutorials/general/esp32-esp8266-alexa-google-home.html)
- [MQ135 air quality sensor]({{ site.github.url }}/pages/tutorials/air-quality-sensors/mq135.html)
- [Capacitive soil moisture sensor (HW-390)]({{ site.github.url }}/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.html)
- [Water leak, flood and rain sensor]({{ site.github.url }}/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)