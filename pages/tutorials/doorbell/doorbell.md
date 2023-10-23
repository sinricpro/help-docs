---
title: Smart Doorbell using  ESP32, ESP8266 or Raspberry Pi Pico W for Alexa, Google Home
layout: post
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
---

In this section we’ll walk through creating a **Doorbell** using a push (tactile) button connected to a **ESP32**, **ESP8266** or **Raspberry Pi Pico W** and then get a notification in Alexa, Google Home, or the Sinric Pro app.

### Prerequisites : 

1. ESP32, ESP8266 or Raspberry Pi Pico W x 1.
2. Push button x 1.
3. 1K ~ 10K resistor x 1
3. Jumper Wires.

### Wiring Doorbell button

We are going to use Pull-Down approach to wire our button. When the button is pressed, digitalRead reads HIGH (1) signal.

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_doorbell-wiring-diagram.png) 

| MCU       | GPIO Pin     |
| --------- | ------- |
| ESP32     |    34   |
| ESP8266   |    4 (D2)  |
| Pico W    |    7    |

### Reading button state

Let's verify that sensor is wired correctly and working. 

<script src="https://gist.github.com/kakopappa/b8db56b3315c83be6bda1069e9b6a5c8.js"></script>

![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png)

### Step 1 : Connect to Sinric Pro 

#### Create a new device: doorbell

* [Login](http://portal.sinric.pro) to your Sinric Pro account and go to **Devices** menu on your left.

* Click **Add Device** button (On top left).

* Enter the device name **doorbell**, description **smart doorbell** and select the type as **Doorbell**.

* Click **Save** to create the device

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-doorbell-create-device.png)

Once you click on the save button Amazon Alexa will automatically detect the device we just created (If you have linked our Alexa skill before).

![Sinric Pro alexa doorbell notification]({{ site.github.url }}/public/img/sinricpro_alexa_doorbell_push_notification.jpg)

If you did not get the push notification, just ask Alexa to device devices

#### Step 1.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Complete Code

<script src="https://gist.github.com/kakopappa/f5853e57b534d08fbc1df2d299c71265.js"></script>

**Note:** **Alexa doorbell notifications are turned off by default**. You must enable it by openning the app to recevice the DingDong notification in Alexa.

![Sinric Pro Alexa enable doorbell notification settings]({{ site.github.url }}/public/img/sinricpro-alexa-doorbell-settings.jpg)

{% include youtubePlayer.html id=page.youtubeId %}

{% include youtubePlayer.html id=page.youtubeId2 %}

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)