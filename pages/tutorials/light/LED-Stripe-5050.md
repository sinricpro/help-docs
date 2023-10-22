---
title: Light Tutorial for LED Light Strip RGB 5050
layout: post
---

In this section we’ll walk through creating a LED Light Strip using **ESP32**, **ESP8266** and then control it via **Amazon Alexa, Google Home or SmartThings**.

### Prerequisites : 

1. ESP32, ESP8266 x 1.
2. IRF540N MOSFET, STP16nF06L MOSFET, S8050 NPN transistor or BC337 NPN transistor x 3 
3. 1k resistor x 3
4. Jumper Wires.

In this tutorial we are going to use BC337 NPN transistors.

![Sinric Pro light strip 5050 wiring]({{ site.github.url }}/public/img/sinric_pro_light_5050-led-strip-wiring.jpg) 

### Quick introduction to 5050 LED strips
5050 LED strips are a type of LED strip that is made up of individual LEDs that are grouped together in sets of three. Each set of three LEDs is known as a pixel. The pixels are arranged in a long, thin strip, and they can be cut to length to fit your needs. 5050 LED strips are available in a variety of colors, including red, green, blue, white, and yellow. They can also be purchased in different brightness levels. 5050 LED strips are affordable LED strips that look similar to more expensive Neopixel strips. However, the LEDs in 5050 LED strips cannot be controlled individually. This means that you can only use one color for the entire strip at a time.


Here is a table that summarizes the key differences between 5050 LED strips and Neopixel strips:


| Feature   | 5050 LED strips       | Neopixel strips
| --------- | -------               | ---------
| Price     |    Affordable         | More expensive
| Individually addressable LEDs     |    No                                       | Yes
| Animations|    Limited to common animations such as color changing and dimming  | Complex animations with individual LEDs are possible
 

### Wiring

![Sinric Pro light strip 5050 wiring]({{ site.github.url }}/public/img/sinric_pro_light_5050-led-strip.png) 
![Sinric Pro light strip 5050 wiring]({{ site.github.url }}/public/img/sinric_pro_light_5050-led-strip-wiring-without-strip.jpg) 
 
| Strip     | ESP32 PIN     
| --------- | ------- 
| 5V        |    5V   
| R         |    14  
| G         |    12  
| B         |    27  

Let's verify LED Strip is wired correctly and working. 

<script src="https://gist.github.com/kakopappa/22bb8d2cf157df07724fc9571edd7764.js"></script>

LED Strip will change the colors like this:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-light-5050-led-strip-demo.mp4" type="video/mp4">
</video>

 
### Step 1 : Create a new device in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **LED strip**, description **My LED strip** and select the device type as **Smart Light Bulb**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_light_new_device.png)

* Click **Next** the in the Notifications tab

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Complete Code
  
<script src="https://gist.github.com/kakopappa/11e904fec925af8e35b459a7a73fc26e.js"></script>
 
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-light-5050-led-strip-sinricpro-portal-demo.mp4" type="video/mp4">
</video>

Now you should be able to control via Alexa, GoogleHome and SmartThings as well.
 


### Troubleshooting

1. Use a power supply that can provide enough current for the LED strip. LED strips can consume a lot of current, so it is important to use a power supply that can provide enough current to meet the needs of the strip.

2. Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.

 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)