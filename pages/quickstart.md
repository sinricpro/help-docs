---
title: Quickstart
weight: 1
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
---


In this section we’ll walk through creating a **Smart Doorbell** and controlling it using Amazon Alexa.


### Step 1 : Create a Sinric Pro account

* Visit [http://portal.sinric.pro/register](http://portal.sinric.pro/register) and sign up for a new account


### Step 2 : Link your Amazon Alexa account

* 2.1 Open your Amazon Alexa app.
* 2.2 Goto Skills & Games.
* 2.3 Search for **Sinric Pro**.
* 2.4 Click **ENABLE TO USE**.
* 2.5 Enter the credentails you created in step 1.

### Step 3 : Create a new device: doorbell

* 3.1 [Login](http://portal.sinric.pro) to your Sinric Pro account.
* 3.2 Go to **Devices** menu on your left.
* 3.3 Click **Add Device** button (On top left).
* 3.4 Enter the device name **doorbell**, description **smart doorbell** and select the type as **Doorbell**.
* 3.5 Select Device Access Key (default) and Room (Living Room). 
* 3.6 Click **Save** to create the device

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-device.png)

Once you click on the save button Amazon Alexa will automatically detect the device we just created (If you completed Step 2). You should see a push notification like below in your phone. 

![Sinric Pro alexa doorbell notification]({{ site.github.url }}/public/img/sinricpro_alexa_doorbell_push_notification.jpg)

If you did not get the push notification, just ask Alexa to device devices

### Step 4 : Schematics

An external switch circuit:
```js
     3.3V
    --+--
      |
     +-+
     | | 1K ~ 10K
     +-+
      |
      +--> D2 (for ESP8266, ex: GPIO33 in case of ESP32)
      |
    | O
  --+
    | O
      |
    --+--
     GND
```

![Sinric Pro alexa doorbell notification]({{ site.github.url }}/public/img/alexa-doorbell-sinric-pro-schematics.png)



### Step 4 : Connect ESP8266 or ESP32
* 4.1 Go to **Credentials** menu on your left. 
* 4.2 Copy the **App Key** and **App Secret**



![SinricPro credentials]({{ site.github.url }}/public/img/sinricpro-credentials.png)

* 4.3 Download the demo code from here 
    * [ESP8266/ESP32 Example](https://github.com/sinricpro/SinricPro/tree/master/examples/Doorbell)
    * [RaspberryPi/Python Example](https://github.com/sinricpro/SinricPro/tree/master/examples/Doorbell)
* 4.4 Update the App Key and App Secret.
* 4.5 Upload the code to your ESP module.
* 4.6 Turn On 'Doorbell Press' in Alexa App.
* 4.7 When you send the [DoorbellPress](https://github.com/sinricpro/sample_messages/blob/master/06_Doorbell/03_Event.json) Alexa will let you know.

Demo ESP8266/ESP32:
{% include youtubePlayer.html id=page.youtubeId %}


Demo RaspberryPI + Python:
{% include youtubePlayer.html id=page.youtubeId2 %}

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)