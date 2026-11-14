---
title: Sinric Pro - IoT Cloud Platform for ESP8266, ESP32 and Raspberry Pi Pico W
layout: post
lang: en
description: Sinric Pro is an IoT cloud platform for ESP8266, ESP32 and Raspberry Pi Pico W. Control your devices with Alexa, Google Home, a mobile app and an API. 3 devices free.
---

Sinric Pro is a cloud platform that makes your DIY IoT projects smart home compatible. You connect an **ESP8266**, **ESP32** or **Raspberry Pi Pico W** with a few lines of code, and control it with voice commands, a mobile app, automations or your own software.

You do not have to run a server, open ports on your router or write an Alexa skill.

### What you get

| Feature | Description |
| --- | --- |
| Voice assistants | Amazon Alexa and Google Home, through the official Sinric Pro skill and action |
| Mobile app | Sinric Pro app for Android and iPhone/iPad |
| Smart home platforms | Samsung SmartThings, [Homebridge (HomeKit)]({{ site.github.url }}/pages/homebridge.html), [Home Assistant]({{ site.github.url }}/pages/home-assistant.html), [IFTTT]({{ site.github.url }}/pages/ifttt.html), [Node-RED]({{ site.github.url }}/pages/node-red.html), [Apple Shortcuts]({{ site.github.url }}/pages/apple-shortcuts.html) |
| Built-in device types | Switch, dimmer, light, thermostat, TV, speaker, lock, fan, blinds, garage door, doorbell, camera, and temperature, motion, contact and air quality sensors |
| Custom device types | [Device templates]({{ site.github.url }}/pages/custom-templates.html): drag and drop capabilities to build your own device type and generate the code |
| Automations | [Automations]({{ site.github.url }}/pages/automations.html) created with drag and drop |
| Push notifications | Send [push notifications]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) from your device to your phone |
| OTA updates | [Firmware over-the-air updates]({{ site.github.url }}/pages/ota.html) without physical access to the device |
| Local control | The app keeps controlling your devices over Wi-Fi [when the internet is down]({{ site.github.url }}/pages/local-control.html) |
| API | [REST API]({{ site.github.url }}/pages/api-guide.html) to build your own apps and integrations |

### Supported hardware

- **ESP8266** (NodeMCU, Wemos D1 mini, ESP-01 and others)
- **ESP32** (including ESP32-S3 and ESP32 cameras)
- **Raspberry Pi Pico W** (RP2040)
- **Arduino** UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010
- **Raspberry Pi** and any computer that runs Python or NodeJS

SDKs are available for Arduino (C++), ESP-IDF, MicroPython, Python and NodeJS. See the [SDK list]({{ site.github.url }}/).

### How it works

1. Create a device in the [Sinric Pro Portal](https://portal.sinric.pro) and copy its credentials.
2. Add the Sinric Pro library to your sketch and flash your board.
3. The board connects to Sinric Pro. Control it from the app, Alexa, Google Home or the API.

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>

bool onPowerState(const String &deviceId, bool &state) {
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true;
}

void setup() {
  // ... connect to Wi-Fi ...
  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

The full walkthrough is in [How to control an ESP32 or ESP8266 with Alexa and Google Home]({{ site.github.url }}/pages/tutorials/general/esp32-esp8266-alexa-google-home.html).

### Pricing

- **Free plan**: 3 devices. No credit card required.
- **Paid plans**: per device per year, or unlimited devices for a fixed yearly price.

See [Pricing]({{ site.github.url }}/pages/pricing.html) for the current prices.

### For products and businesses

If you are building a product to sell, [Sinric Pro for Business]({{ site.github.url }}/pages/for-business.html) adds device provisioning, device management and OTA updates for commercial deployments.

### Get started

- [Create a free account](https://portal.sinric.pro/register)
- [Install the Sinric Pro library]({{ site.github.url }}/pages/tutorials/general/install-sinricpro-library.html)
- [Quickstart tutorials]({{ site.github.url }}/pages/quickstarts.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
