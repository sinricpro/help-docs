---
title: Sinric Pro Alternatives - How Sinric Pro Compares
layout: post
lang: en
description: Compare Sinric Pro with the alternatives for controlling an ESP32 or ESP8266 by voice - Espalexa and fauxmoESP, Tasmota, ESPHome with Home Assistant, other IoT clouds and a custom Alexa skill.
---

There are several ways to control an ESP32 or ESP8266 with Alexa, Google Home or a phone. This page describes the main approaches, what each one is good at, and where Sinric Pro fits.

### The options at a glance

| Approach | Examples | You run a server | Works away from home | Best for |
| --- | --- | --- | --- | --- |
| Smart home cloud for DIY devices | Sinric Pro | No | Yes | Voice control and an app with little setup |
| Local device emulation | Espalexa, fauxmoESP | No | No | A quick Alexa-only test on your own network |
| Open-source firmware | Tasmota | Optional | With extra setup | Reflashing off-the-shelf devices, local control |
| Self-hosted smart home | ESPHome with Home Assistant | Yes | With extra setup | A fully local home that you manage yourself |
| General IoT dashboards | Blynk, Arduino Cloud | No | Yes | Dashboards, charts and data from sensors |
| Your own skill and backend | Alexa Smart Home skill with your own cloud backend | Yes | Yes | Full control when you have the time to build it |

### Local device emulation (Espalexa, fauxmoESP)

These libraries make the board pretend to be a Philips Hue bridge or a Belkin WeMo switch on your Wi-Fi network. There is no account and no cloud.

- Works with Alexa only, and only on the same network.
- Supports a small set of device types (on/off, brightness, colour).
- Discovery depends on the Echo model and on your router. See [Espalexa or fauxmoESP "Device Not Found"?]({{ site.github.url }}/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.html)

### Open-source firmware (Tasmota)

Tasmota is ready-made firmware that you configure instead of writing code. It is controlled locally through its web interface, HTTP or MQTT. Its Alexa support also uses Hue and WeMo emulation.

Choose it when you want to reflash an existing smart plug or bulb and keep everything on your own network.

### Self-hosted smart home (ESPHome with Home Assistant)

ESPHome generates firmware from a configuration file, and Home Assistant is the server that controls the devices. Everything can run locally on your own hardware.

Choose it when you want a fully local setup and are happy to run and maintain a server. Voice assistants and access from outside your home need additional setup or a subscription.

Sinric Pro and Home Assistant can be used together: see the [Home Assistant integration]({{ site.github.url }}/pages/home-assistant.html).

### General IoT dashboards (Blynk, Arduino Cloud)

These platforms focus on dashboards: widgets, charts and data from your devices on a phone or web page. Their device limits, pricing and voice assistant support differ and change over time, so check each platform's website for the current details.

Choose one when your project is mainly about monitoring and visualising data.

### Your own Alexa skill and backend

You can build an Alexa Smart Home skill yourself, with your own cloud backend, account linking and device connection. This gives you full control. It is also the most work, and you maintain the backend yourself.

If you want this for a commercial product without building the backend, see [Sinric Pro for Business]({{ site.github.url }}/pages/for-business.html).

### Where Sinric Pro fits

Sinric Pro is built for one job: making a DIY device behave like a smart home product.

- **Official voice integrations**: an Alexa Smart Home skill and a Google Home action, so there is no emulation and no skill to write.
- **Many device types**: switches, lights, thermostats, TVs, locks, fans, blinds, cameras and sensors, plus [custom device types]({{ site.github.url }}/pages/custom-templates.html).
- **No server to run**: the board connects out to Sinric Pro, so there is no port forwarding.
- **More than voice**: mobile app, [automations]({{ site.github.url }}/pages/automations.html), push notifications, [OTA updates]({{ site.github.url }}/pages/ota.html), an [API]({{ site.github.url }}/pages/api-guide.html), and integrations with SmartThings, HomeKit (Homebridge), Home Assistant, IFTTT and Node-RED.
- **Local control**: the app keeps working over Wi-Fi [when the internet is down]({{ site.github.url }}/pages/local-control.html).
- **Free to start**: 3 devices on the free plan. See [Pricing]({{ site.github.url }}/pages/pricing.html).

### When another option is a better fit

- You want **no cloud at all**, including for voice control: use ESPHome with Home Assistant, or Tasmota.
- You only need **Alexa on your own network** for a quick test: Espalexa or fauxmoESP may be enough.
- You mainly want **charts and dashboards** for sensor data: look at a dashboard platform.

### Try Sinric Pro

- [How to control an ESP32 or ESP8266 with Alexa and Google Home]({{ site.github.url }}/pages/tutorials/general/esp32-esp8266-alexa-google-home.html)
- [Sinric Pro as an IoT platform for ESP8266 and ESP32]({{ site.github.url }}/pages/tutorials/general/iot-platform-esp8266-esp32.html)
- [Create a free account](https://portal.sinric.pro/register)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
