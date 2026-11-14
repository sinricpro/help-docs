---
title: Google Home
layout: post
lang: en
description: Connect Sinric Pro to Google Home. Link the Sinric Pro action in the Google Home app and control your ESP32 and ESP8266 devices with Google Assistant.
---

Sinric Pro has an official **Google Home action**. Once it is linked to your Sinric Pro account, your devices appear in the Google Home app and can be controlled with Google Assistant, from the Google Home app and from Google Home automations.

### Link Sinric Pro in Google Home

* Open **Google Home** and click on **Add**.
* Select **Setup Device**.
* Select **Works with Google Home**.
* Search for [**Sinric Pro**](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en).
* Link your account.

Your Sinric Pro devices now appear in the Google Home app. Assign them to a room to control them by room name.

### Add more devices later

Create the device in the [Sinric Pro Portal](https://portal.sinric.pro), then say *"Hey Google, sync my devices"*.

### What you can say

*"Hey Google, turn on the Switch"*, *"Hey Google, set the Lamp to 50 percent"*.

See [Utterances]({{ site.github.url }}/pages/utterances.html) for the voice commands of each device type.

### Announcements and automations

- [How to send announcements to Google Home]({{ site.github.url }}/pages/tutorials/general/how-to-send-announcements-to-google-home.html)

### Troubleshooting

**The device does not appear in Google Home**

- Check that the device exists in the [Portal](https://portal.sinric.pro).
- Say *"Hey Google, sync my devices"*.
- Check that Google Home is linked to the same Sinric Pro account that owns the device.

**Google Home says the device is offline**

- Check in the Portal that the device is connected, and see the [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page.

### Get started

- [How to control an ESP32 or ESP8266 with Alexa and Google Home]({{ site.github.url }}/pages/tutorials/general/esp32-esp8266-alexa-google-home.html)
- [Quickstart tutorials]({{ site.github.url }}/pages/quickstarts.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
