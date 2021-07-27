---
title: Smart Switch
layout: post
---

In this section we’ll walk through creating a **Smart Switch** and controlling it using Amazon Alexa.

### Step 1 : Create a Sinric Pro account

* Visit [http://portal.sinric.pro/register](http://portal.sinric.pro/register) and sign up for a new account


### Step 2 : Link your Amazon Alexa account

* Open your Amazon Alexa app.
* Goto Skills & Games.
* Search for **Sinric Pro**.
* Click **ENABLE TO USE**.
* Enter the credentails you created in step 1.

### Step 3 : Create a new device: Switch

* [Login](http://portal.sinric.pro) to your Sinric Pro account.
* Go to **Devices** menu on your left.
* Click **Add Device** button (On top left).
* Enter the device name **SwitchOne**, description **My First Switch** and select the type as **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Click **Next**

* Select appropreate notifications if you wish to receive push notification via Sinric Pro app.

![Sinric Pro push notifications]({{ site.github.url }}/public/img/sinric-pro-create-device-notification.png)

* Click **Next**

* The timer can be configured to turn ON or OFF after a certain amount of seconds. eg: automatically switch off your iron after an hour once turned it on.

![Sinric Pro push notifications]({{ site.github.url }}/public/img/sinric-pro-create-device-timers.png)

* Click **Next**

* Sinric Pro And Alexa (US) supports energy estimates. If you know how much electricity your connected appliance uses, you can enter it here.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-other.png)

* Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret**


* ***Keep these values secure.  Sharing them will likely suspend your account.***

Once you click on the save button Alexa should automatically detect the device we just created (If you completed Step 2). You should see a push notification like below in your phone. 

![Sinric Pro alexa switch notification]({{ site.github.url }}/public/img/sinricpro_switch_pushNotification.png)

If you did not get the push notification, you can either ask,  "Alexa, discover devices", or use the Add Device workflow in the alexa app.

### Step 4 : Build A smart switch
#### 4.1 Example below assumes a WeMos D1 Mini and associated relay shield.  
* Any MCU capable of running C++ code (NodeMCU, ESP-8266, ESP-32, Arduino) can be used.   
* For this example power is provided via USB
* Details such as converting line voltage to 3.3V or 5V DC are not covered here.

![Sinric Pro alexa switch on D1 Mini]({{ site.github.url }}/public/img/sinricpro_d1-mini-switch.png)

### Step 5 : Program your device.
* SinricPro can be used from the Arduino IDE or any modern C/C++ IDE
* SinricPro works with PlatformIO - tested on VSCode and Jetbrains CLion.
* Download the demo code from here 
    * [Arduino Sketch Example](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Switch/Switch)
    * [PlatformIO Example](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Switch/Switch)
    * [Full SDK documentation - All Devices](https://github.com/sinricpro/esp8266-esp32-sdk#examples)
* Update the *APP_KEY* with your *App Key*
* Update the *APP_SECRET* with your *App Secret*
* Update the *SWITCH_ID* with your *Device ID*
* Upload the code to your ESP module.
* Toggle 'SwitchOne' in your Alexa App.
* Each time you toggle the switch you should hear the relay click.
 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)