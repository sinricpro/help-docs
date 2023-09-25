---
title: Motion Sensor Tutorial for HC-SR501, HC-SR505, Mini AM312, HC-SR312 
layout: post
---

In this section we’ll walk through creating a PIR **Motion Sensor** using **ESP32**, **ESP8266** or **Raspberry Pi Pico W** and then view the motion changes via **Alexa or SmartThings**.

### Prerequisites : 

1. ESP32, ESP8266 or Raspberry Pi Pico W x 1.
2. HC-SR501, HC-SR505, Mini AM312, HC-SR312 x 1.
3. Jumper Wires.

| PIR       | Working voltage  | Delay time | Blocking time | Trigger       | Distance
| --------- | -------          |-------     |-------        |-------        |-------
| HC-SR312  |2.7-12V           | 2 seconds  | 2 seconds     | Repeatable    | 3-5 meters
| HC-SR505  |4.5-20V           | 2 seconds  | 2 seconds     | Repeatable    | 3 meters
| HC-SR501  |4.5-20V           | Adjustable  | Adjustable    | Adjustable    | 3 meters to 7 meters

### Quick introduction to PIR Motion Sensors

Passive infrared (PIR) motion sensors detect the presence of people or animals by measuring changes in infrared radiation. PIR sensors work by detecting the infrared radiation emitted by all objects that have a temperature above absolute zero. When a person or animal moves into the field of view of a PIR sensor, the sensor detects a change in the amount of infrared radiation and triggers an alarm or other output. PIR sensors are a versatile and cost-effective way to detect motion. They are easy to use and can be installed in a variety of locations.

The output of the PIR Motion Sensor is:

- ``HIGH`` when a movement is detected.
- ``LOW``  when no movement is detected.

To get accurate measurements, **wait for the PIR sensor to calibrate properly, this will normally take from 10 to 60 seconds** after turning it on.  
 
The HC-SR501 has adjustable configurations:

![Sinric Pro esp8266 HC-SR501 ]({{ site.github.url }}/public/img/sinric_pro_pir_sensor.png) 

###### Sensitivity Adjustment

- Measuring distance is between 3 and 7 meters.

- Turning clockwise or right - Decreases the sensivity. Fully right upto 3 meters.

- Counter Turning clockwise or left - Decreases the sensivity. Fully left about 7 meters.

###### Time-Delay Adjustment

- Delay time that defines how long the output of the HC-SR501 stays ``HIGH`` after a motion is detected. It can be adjusted from 1 second to about 5 minutes.

- Turning clockwise or right - Increase the delay. Fully right upto 5 mins.

- Counter Turning clockwise or left - Decreases the delay. Fully left about 3 seconds.


###### Jumper Set

- **Single Trigger Mode (L)**: Triggers a single motion. The time delay potentiometer determines how long the pin will stay ``HIGH``. Any further motion detection is blocked until turns to ``LOW``.

- **Multiple Trigger Mode (H)**: Triggers series of motions. The time delay potentiometer determines how long the pin will stay ``HIGH``. In multiple trigger mode, the time delay is reset each time motion is detected, so there is no blocking of further detection.
 
  

### Wiring

![Sinric Pro esp8266 PIR wiring]({{ site.github.url }}/public/img/sinric_pro_pir_sensor_wiring.png) 


| MCU       | PIR Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    5 (D1)    |
| Pico W    |    GP5  |

Let's verify that motion sensor is wired correctly and working. 
<script src="https://gist.github.com/kakopappa/bc5a7152c02e4e692ca9ae6708fe6814.js"></script>


Arduino IDE Serial Monitor will show the motion detections like this:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-motion-sensor-demo.mp4" type="video/mp4">
</video>

 
### Step 1 : Create a new device in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **Motion Sensor**, description **My Motion Sensor** and select the device type as **Motion Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Click **Next** the in the Notifications tab

![Sinric Pro motion sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_motion_sensor_notifications.png)

You can set the threshold here to receive a push notification via the Sinric Pro app when the motion is detected at **Daytime** or **Nighttime**. Use the Retrigger Time to set the delay between push notifications.

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

You can **generate the code** using **Zero Code** feature or write it by your self. If you do not have programming experice, we recommend to use Zero Code feature in the Portal to generate the code, download and flash.

#### 2.2 Complete Code
  
<script src="https://gist.github.com/kakopappa/f4fd3d769144689f15cfc80d783e8c94.js"></script>
 
Now you should be able to view the motions via Alexa, SmartThings 
  
![Sinric Pro motions via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_contact_motion_home_alexa_smartthings.png)

via Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_contact_motion_portal.png)

Please note that Google Home not supported.

### Troubleshooting

1. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.

 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)