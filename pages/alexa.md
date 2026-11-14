---
title: Amazon Alexa
layout: post
lang: en
description: Connect Sinric Pro to Amazon Alexa. Enable the Sinric Pro skill, link your account, discover your ESP32 and ESP8266 devices and control them by voice.
---

Sinric Pro has an official **Alexa Smart Home skill**. Once the skill is linked to your Sinric Pro account, every device in your account appears in the Alexa app and can be controlled by voice, from the Alexa app and from Alexa routines.

You do not need to write your own skill, and your device does not need to be on the same network as your Echo.

### Link the Sinric Pro skill

* Open your Amazon Alexa app.
* Go to **Skills & Games**.
* Search for [**Sinric Pro**](https://www.amazon.com/dp/B07ZT5VDT8).
* Click **ENABLE TO USE**.
* Enter your Sinric Pro credentials in the linking page.
* Ask Alexa to discover new devices: *"Alexa, discover devices"*.

Your Sinric Pro devices now appear under **Devices** in the Alexa app.

### Add more devices later

Create the device in the [Sinric Pro Portal](https://portal.sinric.pro), then say *"Alexa, discover devices"* again. You do not have to link the skill a second time.

The device name in Sinric Pro is the name Alexa listens for. Choose a name that is easy to pronounce and different from your other devices.

### What you can say

*"Alexa, turn on the Switch"*, *"Alexa, set the Lamp to 50 percent"*, *"Alexa, what is the temperature of the Living Room Sensor?"*

See [Utterances]({{ site.github.url }}/pages/utterances.html) for the voice commands of each device type.

### Routines and announcements

Sensors such as contact sensors, motion sensors and doorbells can trigger Alexa routines.

- [How to send announcements to Alexa]({{ site.github.url }}/pages/tutorials/general/how-to-send-announcements-to-alexa.html)
- [Doorbell tutorial]({{ site.github.url }}/pages/tutorials/doorbell/doorbell.html)

### Troubleshooting

**Alexa does not find the device**

- Check that the device exists in the [Portal](https://portal.sinric.pro).
- Check that the skill is linked to the same Sinric Pro account that owns the device.
- Run discovery again: *"Alexa, discover devices"*.

**Alexa says the device is not responding**

- The device is offline. Check in the Portal that it is connected, and see the [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page.

**Using Espalexa or fauxmoESP?**

Those libraries emulate a Hue bridge on your local network and are not part of Sinric Pro. See [Espalexa or fauxmoESP "Device Not Found"?]({{ site.github.url }}/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.html)

### Get started

- [How to control an ESP32 or ESP8266 with Alexa and Google Home]({{ site.github.url }}/pages/tutorials/general/esp32-esp8266-alexa-google-home.html)
- [Quickstart tutorials]({{ site.github.url }}/pages/quickstarts.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
