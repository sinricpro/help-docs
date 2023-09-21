---
title: Temperature Sensor tutorial for DHT11, DHT22, AM2302, RHT03
layout: post
---

In this section we’ll walk through creating a **Temperature Sensor** using **ESP32**, **ESP8266** and then view the temperature via **Alexa, Google Home or SmartThings**.

### Prerequisites : 

1. ESP32, ESP8266 x 1.
2. DHT11 or DHT22, AM2302, RHT03 x 1.
3. Jumper Wires.

### Quick introduction to Temperature Sensor

The DHT and AM series are low-cost digital sensor for sensing temperature and humidity. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air and then spits out a digital signal on the data pin. 


### Wiring

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial.png) 

Note: Some DHT22 sensors do not come with a pull-up resistor, so you may need to connect one yourself. A 10k resistor is typically used, and it should be connected from the data pin of the sensor to the +3.3V or +5V power supply. 



| MCU       | DHT Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    14 (D5)    |

Let's verify that temperature is wired correctly and working. 

<script src="https://gist.github.com/kakopappa/08c5cd5bbee8da13e6ca081afd017974.js"></script>

Arduino IDE Serial Monitor will show the current temperature like this

![Sinric Pro DHT Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_sensor_readings.png)

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
  
<script src="https://gist.github.com/kakopappa/a6574e1e0c57a5cdcb46d357a5dd6ee3.js"></script>
 
Now you should be able to view the temperature via Sinric Pro App
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Charts via Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_portal_temperature_sensor.png)

Alexa, Google Home and SmartThings

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_alexa_googlehome_smartthings_temperature_sensor.png)

Please note that Google Home App shows the temperature sensor as a Thermostat due to Google Home limitations.

### Troubleshooting

1. error: no matching function for call to 'DHT::DHT()' or error: 'class DHT' has no member named 'getMinimumSamplingPeriod'

    **Solution**: Please make sure correct DHT library is installed. This example was made with https://github.com/markruys/arduino-DHT.  Remove any other DHT libraries you may have previously installed eg: https://github.com/adafruit/DHT-sensor-library

2. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.

 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)