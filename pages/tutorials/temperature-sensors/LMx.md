---
title: Temperature Sensor Tutorial for LM35 (LM35DZ), LM335 and LM34
layout: post
---

In this section we’ll walk through creating a **Temperature Sensor** using **ESP32**, **ESP8266** and then view the temperature via **Alexa, Google Home or SmartThings**.

### Prerequisites : 

1. ESP32, ESP8266 x 1.
2. LM35, LM335 and LM34 x 1.
3. Jumper Wires.

### Quick introduction to Temperature Sensor

The LM35/LM34 temperature sensors are a linear integrated circuit temperature sensor that works by measuring the voltage drop between the base and emitter of a diode-connected transistor. The voltage drop between the base and emitter of a diode-connected transistor decreases at a known rate as the temperature increases.  

- LM35 provides temperature measurements in Celsius (°C)

- LM32 provides temperature measurements in Fahrenheit (ºF). 

- LM335 provides temperature measurements in Kelvin (ºK)

### Wiring for LM35 or LM34 with ESP8266

![Sinric Pro LM35 or LM34 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM35-and-LM34_Wiring.png) 

### Wiring for LM335 with ESP8266

![Sinric Pro LM335 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM335_Wiring.png) 

**Pull-up via 2.2k Ohm resistor** 

| MCU       | GPIO Pin     |
| --------- | ------- |
| ESP32     |    36 (ADC0)  |
| ESP8266   |    A0 (ADC0)  |

Let's verify that temperature is wired correctly and working. 

<script src="https://gist.github.com/kakopappa/35beffd648f962299c7df485b7f13124.js"></script>
 
### Step 1 : Create a new device in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **Temperature Sensor**, description **My Temperature Sensor** and select the device type as **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Click **Next** the in the Notifications tab

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

You can set the threshold here to receive a push notification via the Sinric Pro app when the temperature goes **below** or **above** a certain temperature. Use the Retrigger Time to set the delay between notifications.

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
You can **generate the code** using **Zero Code** feature or write it by your self. If you do not have programming experice, we recommend to use Zero Code feature in the Portal to generate the code, download and flash.

#### 2.2 Complete Code
  
<script src="https://gist.github.com/kakopappa/8806b5eeb0203252c5aed42849bd1481.js"></script>
 
Now you should be able to view the temperature via Sinric Pro App
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Please note that Google Home App shows the temperature sensor as a Thermostat due to Google Home limitations.

### Troubleshooting
1. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.
 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)