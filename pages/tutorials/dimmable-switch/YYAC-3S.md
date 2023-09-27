---
title: Dimmable Switch Tutorial using YYAC-3S for ESP32
layout: post
---

In this section we’ll walk through creating a **Dimmable Switch** using **ESP32** and then control the light brightness via **Alexa, GoogleHome or SmartThings**.

### Prerequisites : 

1. ESP32.
2. YYAC-3S.
3. Dimmable Light Bulb. 
3. Jumper Wires.


**Not all the light bulbs are dimmable.** Please check the manufacturer's label to see if the bulb is dimmable.

### Quick introduction to YYAC-3S

YYAC-3S module can used to control the supply of AC electricity using PWM from an Arduino, ESP8266, ESP32 or Pico W. It can be used to control the speed of AC motors and the brightness of dimmable light bulbs. The circuit consists of an SCR and an optocoupler on the input side. This prevents current from flowing back to the MCU and also separates it from ground, making it safe to use. The module supports a PWM input of 0-255 and can control AC voltage up to 220V with a maximum current of 3A.


### Wiring
  
  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_motion_dimmer_switch_wiring.png) 



Connect the YYAC-3S module to the microcontroller as follows:
- VCC pin to the microcontroller's 5V pin (3.3V does not seems to work).
- GND pin to the ESP32's GND pin.
- PWM pin to a digital pin 16 on the microcontroller.

| MCU       | YYAC-3S PWM Pin     |
| --------- | ------- |
| ESP32     |    16   |


Let's verify that YYAC-3S module is wired correctly and working. 

<script src="https://gist.github.com/kakopappa/b34693c62c679437fa3a7465a242d7f2.js"></script>

Arduino IDE Serial Monitor will show the motion detections like this:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-YYAC3S.mp4" type="video/mp4">
</video>

### Step 1 : Create a new device in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **Dimmer**, description **Dimmer** and select the device type as **Switch With Dimming**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_dimmer_new_device.png)

* Click Others tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Connect to Sinric Pro 

#### Step 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Complete Code
  
<script src="https://gist.github.com/kakopappa/bb496b32ed359651d357d0769dd83695.js"></script>
 
Now you should be able to control the the brightness level via Alexa, Google Home and SmartThings apps
  
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-google-home-demo.mp4" type="video/mp4">
</video>

![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Troubleshooting

- Does not dim ? Please check the manufacturer’s label to see if the light bulb is dimmable.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- PWM not working ?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_pwm_YYAC-3S.png)

Above LED lights up when the module recevice the PWM signal from MCU. 

- Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for more details.

 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)