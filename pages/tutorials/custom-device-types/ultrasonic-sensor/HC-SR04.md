---
title: Water Level Indicator using Ultrasonic Sensor (HC-SR04) for ESP8266, ESP32, Raspberry Pi Pico W
layout: post
---
 
In this part, we'll guide you on building a **Water Level Indicator (also known as Water Tank Indicator)** using a **Ultrasonic Sensor** that can be connected to either an **ESP32, ESP8266, or Raspberry Pi Pico W**. Once it's set up, you'll be able to measure water levels using Alexa, ask Alexa for information about it, and also monitor it through the Sinric Pro app and *receive a push notification when water level is low*.


![Sinric Pro HC-SR04 Ultrasonic Sensor ]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-intro.png)

### Prerequisites : 

1. ESP32, ESP8266 or Raspberry Pi Pico W x 1.
2. Ultrasonic Sensor (HC-SR04) x 1.
3. Plant with a pot x 1.
4. Jumper Wires.

 

### Quick introduction to Ultrasonic Sensor
The ultrasonic sensors are low-cost, easy-to-use sensor that can measure distance. It works by sending out a burst of ultrasonic sound and then **measuring the time it takes for the echo to return**. The distance to the object is then calculated based on the speed of sound.  

It is powered by a 5V DC power supply and has four pins: **VCC, GND, TRIG, and ECHO**. Once the sensor is connected, you can use it to measure distance by sending a pulse to the TRIG pin and then measuring the time it takes for the ECHO pin to go high. The distance to the object can then be calculated using the following formula:

> distance = (time * speed of sound) / 2

where:

- `distance` is in centimeters.
- `time` is in microseconds.
- `speed of sound` is 343 meters per second. 
 
According to the manufacturer notes, the HC-SR04 sensor **works best** between 2cm – 400 cm (1" - 13ft) within a 30 degree cone.  

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-practical-test.png) 

### Wiring Ultrasonic Sensor

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-wiring.png) 


| HC-SR04 Pin | ESP8266 | ESP32    | Pico W |
| --------- | ------- | -------    | -------    |
| VCC       |    5V   | 5V         | 5V         |
| GND       |    GND  | GND        | GND        |
| TRIG      |    12 (D6)  | GPIO 5  | 15        |
| ECHO      |    14 (D5)  | GPIO 18 | 14        |



Let's verify that sensor is wired correctly and working. 
 
<script src="https://gist.github.com/kakopappa/83febb46592b067c79a0dd55136405a6.js"></script>

![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-test-readings.png) 

Let's try measuring the water level as a precentage. 
 
<script src="https://gist.github.com/kakopappa/175f772413b433241acaca6234257cf2.js"></script>

![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-water-tank-measurements-as-precentage.png) 
 
### Step 1 : Connect to Sinric Pro 

#### Step 1.1 : Creating a custom device type for Water Level Indicator.

Sinric Pro does not have a built-in device type for Water Level Indicator so we are going to create a custom device type to support showing Water Level Indicator using Device Template feature.

**Note**: You can use the device template import feature mentioned below to skip creating the full template.

* [Login](https://testportal.sinric.pro/devicetemplates/new) to your Sinric Pro account and goto **Device Templates**

* Click **Add Device Template**. Enter name and description as **Water Level Indicator** and select **Water Tank** as device type

![sinricpro water tank new device template basic info]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-basic-info.png) 

* Click **Capabilities**. 

Here we must select the features of our Sensor. We want to know the *Water level* as a precentage. So let's drag a **Range** and **Push Notification** capability.

![sinricpro water tank new device template capabilities]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-capabilities.png) 

- What's Range capability?

  Range capability can be use to represents a number. eg: current speed of a blender.

- What's Push Notification capability?

  Notification capability provides the ability to send a push notification message from the code.

Click on **Configure** button and setup the two capabilities like below.

![sinricpro water tank device template range capability]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-range-capability.png)  

Click on **Save** to save.

Click on **Save** to save the template.

Now you can see the template we just created.


## Import an existing template?

If you are feeling lazy, you can use the import feature.

![Sinric Pro import template json]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Paste this Template:
<script src="https://gist.github.com/kakopappa/a04eef3577a55be6df4ad098ec8df031.js"></script>

* Go to **Devices** menu on your left and click **Add Device** button (On top left).

* Enter the device name **Water Tank**, description **Water Tank** and select the device type as **Water Level Indicator**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-from-template.png)

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

* Click on **Code Generator** to Generate the code. Click on **Download** to download the code.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-code-download.png)
 

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Complete Code

<script src="https://gist.github.com/kakopappa/206044afbcaa9aca36fc6538f639688a.js"></script>

 
Now you should be able to see the tank water level via Alexa, Sinric Pro App

Alexa, What's the water level(range name) in water tank(device name)

![Sinric Pro Alexa HC-SR04 sensor]({{ site.github.url }}/public/img/sinricpro-water-tank-alexa.jpg)
 
![Sinric Pro Alexa HC-SR04 portal]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-portal.png)
 

### Troubleshooting
1. Google Home or SmartThings are not supproted.

2. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.
 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)