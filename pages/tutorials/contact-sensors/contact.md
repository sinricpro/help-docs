---
title: Contact Sensor (MC-38) Tutorial for ESP8266, ESP32, Raspberry Pi Pico W
layout: post
---
 
In this section, we will show you how to create a contact sensor (also known as a door sensor, entry sensor, or window sensor) using an **ESP32**, **ESP8266** or **Raspberry Pi Pico W**, and then view the open/close state in Alexa, Google Home, SmartThings, or the Sinric Pro app.

![Sinric Pro contact sensor tutorial]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_bg.jpg) 


### Prerequisites : 

1. ESP32, ESP8266 or Raspberry Pi Pico W x 1.
2. Contact Sensor (MC-38) x 1.
3. Jumper Wires.

### Quick introduction to Contact Sensor

A contact sensor is a device that detects whether a door, window, or other object is open or closed. A contact sensor comprises two components – a sensor and a magnet – used to determine the status of objects such as doors or windows, whether they are open or closed. 
 
![Sinric Pro Contact Sensor Reed Switch Open Close]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_open_close.png) 

The sensor is affixed to the frame of the sliding window, while the magnet is attached to the window itself. When the sliding window is shut, the magnet comes into proximity with the sensor, establishing a connection between the two components. Conversely, when the sliding window is opened, the magnet moves away from the sensor, breaking the connection between them.

### Wiring Contact Sensor

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_wiring.png) 

Note: We are using INPUT_PULLUP instead of connecting a 10kΩ resistor between the reed switch and GND.


| MCU       | GPIO Pin     |
| --------- | ------- |
| ESP32     |    19   |
| ESP8266   |    4 (D2)  |
| Pico W    |    GP5  |

Let's verify that contact sensor is wired correctly and working. 

 
<script src="https://gist.github.com/kakopappa/ce5b95c7618826005ef39bb1861cb6f1.js"></script>

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-contact-sensor-open-close.mp4" type="video/mp4">
</video>

### Step 1 : Create a new Contact Sensor in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **Front Door**, description **My Front Door** and select the device type as **Contact Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_new_device.png)

* Click **Next** the in the Notifications tab

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_notifications.png)

You can enable toggles for Open, Close here to receive a push notification via the Sinric Pro app when the contact sensor state change between **Open** or **Close**.

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
You can **generate the code** using **Zero Code** feature or write it by your self. If you do not have programming experice, we recommend to use Zero Code feature in the Portal to generate the code, download and flash.

#### 2.2 Complete Code

<script src="https://gist.github.com/kakopappa/2a027cb56a1f7762454d492d9e928b83.js"></script>
 
Now you should be able to see the contact state via Alexa, Google Home, SmartThings and Sinric Pro App

![Sinric Pro Alexa Contact Sensor]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_google_home_alexa_smartthings.jpg)
 
### Step 3 : Voice Announcements!

✅ How it works:

1️⃣ Add a Switch in SinricPro (your secret trigger!)

2️⃣ Create an Alexa Routine that speaks your message when a "Someone is at the door!" when Switch turned on

3️⃣ Send a power state event to turn ON that switch from your code

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
``` 

### Troubleshooting
1. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.
 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)