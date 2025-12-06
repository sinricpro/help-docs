---
title:  Water Sensor (also known as Water leak, flood, or rain detector)  for ESP8266, ESP32, Raspberry Pi Pico W for Alexa
layout: post
---
 
In this tutorial, we'll build a water sensor that can be connected to an **ESP32**, **ESP8266**, or **Raspberry Pi Pico W** and use it to monitor for water leaks, floods, or rainfall. With **Amazon Alexa**, you can check the status of your water sensor, ask for information about it, and **receive push notifications when water is detected**.

![Sinric Pro HW-390 capacitive soil moisture sensor ]({{ site.github.url }}/public/img/sinricpro-water-sensor-intro.png)

### Prerequisites : 

1. ESP32, ESP8266 or Raspberry Pi Pico W x 1.
2. Water Sensor x 1.
3. Jumper Wires.

### Quick introduction to Water Sensor

A water detector, also known as a water sensor, is a device that detects the presence of water. Water detectors work in a variety of ways. Some common types of water detectors include:

- **Conductivity detectors**: Conductivity detectors work by measuring the electrical conductivity of the water. When the sensor comes into contact with water, the electrical conductivity increases.

- **Capacitance detectors**: Capacitance detectors work by measuring the capacitance of the water. When the sensor comes into contact with water, the capacitance increases.

- **Optical detectors**: Optical detectors work by detecting the changes in the refractive index of water. When the sensor comes into contact with water, the refractive index changes.
 
**Note:**  Water sensors have a shorter lifespan because they are exposed to water. This can cause the sensor to corrode quickly when it's powered on while immersed in water. To avoid this, it is we are going to only turn on the sensor when taking readings.
  
### Wiring Water Sensor

Let’s hook up the water level sensor.

![Sinric Pro water sensor sensor wiring]({{ site.github.url }}/public/img/sinricpro_water_sensor_wiring.png) 

| MCU       | S Pin                     |  VCC Pin  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   17      |
| ESP8266   |    A0                     |   D2      |
| Pico W    |    GP26 (ADC0)            |   6       |
 


**Note:** on ESP32, ADC2 (GPIO04, GPIO02, GPIO15) is unstable when Wi-Fi is being used.

### Reading from Water Sensor

Let's verify that sensor is wired correctly and working. 

<script src="https://gist.github.com/kakopappa/7d45a826ba02203ab8571b735add45c9.js"></script>

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-sensor-demo.mp4" type="video/mp4">
</video>

![sinric pro water sensor arduino readings]({{ site.github.url }}/public/img/sinricpro-water-sensor-test-readings.png) 

### Detecting flooding

<script src="https://gist.github.com/kakopappa/aff71487783487cbfbdef4006eaab809.js"></script>

### Detecting water level

<script src="https://gist.github.com/kakopappa/a2dffb0f0c46585ed0b35aa902c2447e.js"></script>

 
### Step 1 : Connect to Sinric Pro 

#### Step 1.1 : Creating a custom device type for Water Sensor.

Sinric Pro does not have a built-in device type for Water/Flood Sensor so we are going to create a custom device type for Water Sensor using Device Template feature to see.

1. Flooding in the basement or not .

2. Water level.

**Note**: You can use the device template import feature mentioned below to skip creating the full template.

* [Login](https://portal.sinric.pro/devicetemplates/new) to your Sinric Pro account and goto **Device Templates**

* Click **Add Device Template**. Enter name and description as **Flood Sensor** and select **Flood Sensor** as device type

![Sinric Pro capacitive soil moisture sensor device template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-basic-info.png) 

* Click **Capabilities**. 

Here we must select the features of our Soil Moisture Sensor. We want to know whether *Soil is Wet or Dry* and the *Moisture level*. So let's drag a **Range**, a **Mode** and **Push Notification** capability.

![Sinric Pro custom device type for capacitive soil moisture sensor]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-set-template-drop-range-mode.png) 

- What's Range capability?

  Range capability can be use to represents a number. eg: current speed of a blender.

- What's Mode capability?

  Mode capability can be use to represents a value out of list of predefined values. eg: current wash cycle mode of a washing machine.

- What's Push Notification capability?

  Notification capability provides the ability to send a push notification message from the code.

Click on **Configure** button and setup the two capabilities like below.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode.png)  

Click on **Save** to save.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode-configured.png)  

Click on **Save** to save the template.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-saved.png)  

Now you can see the template we just created.


## Import an existing template?

If you are feeling lazy setup all the Modes and Range values, you can use the import feature.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Paste this Template:

<script src="https://gist.github.com/kakopappa/48649129dbed3021cda75a4d8ce94515.js"></script>

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).

* Enter the device name **Flood Sensor**, description **My Flood Sensor** and select the device type as **Flood Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-new-device-info.png)

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

<script src="https://gist.github.com/kakopappa/6657119c2750c4cc662b674dba04a651.js"></script>
 
Now you should be able to see the flooding status and water level via Alexa, Sinric Pro App

Alexa, What's the flooding (mode name) in flood sensor(device name)

Alexa, What's the water level(range name) in flood sensor(device name)


![Sinric Pro Alexa capacitive soil moisture sensor]({{ site.github.url }}/public/img/sinricpro-water-sensor-alexa.jpg)
 
![Sinric Pro Alexa capacitive soil moisture sensor portal]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-portal.png)
 
### Step 3 : Voice Announcements!

✅ How it works:

1️⃣ Add a Switch in SinricPro (your secret trigger!)

2️⃣ Create an Alexa Routine that speaks your message when a "Basement is flooding!" when Switch turned on

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
 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)