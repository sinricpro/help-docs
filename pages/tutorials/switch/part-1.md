---
title: Switch Tutorial Part 1 - Turn on and off a Relay
layout: post
lang: en
---

In this section we’ll walk through creating a Sinric Pro **Switch** for **ESP32**, **ESP8266** or **Raspberry Pi Zero W** and then control via **Alexa, Google Home or SmartThings**.

### Prerequisites : 

1. ESP32, ESP8266 or RaspPi W x 1.
2. SPDT Relay controller x 1.
3. Jumper Wires.

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png) 
### Quick introduction to Relay

A relay is an electrically operated switch that can be turned on or off by a low-voltage signal. It is like a regular switch in that it allows current to flow through or not, but it can be controlled by a much smaller voltage. This makes relays ideal for MCUs where it is necessary to control a high-voltage circuit with a low-voltage signal.

#### How it works

The operation of a relay can vary depending on the manufacturer, the wiring, and the type of relay controller being used. Some relay controllers require a high-level signal from the MCU to activate the relay, while others require a low-level signal. It is important to check the specifications of the relay controller before using it to ensure that it is compatible with your MCU.

**High-level signal**: A high-level signal is a signal that is above a certain voltage threshold. For example, a 5V relay controller may require a signal that is above 3.3V to activate the relay.

```c++
digitalWrite(pin, HIGH);
```

**Low-level signal**: A low-level signal is a signal that is below a certain voltage threshold. For example, a 5V relay controller may require a signal that is below 0.8V to activate the relay.

```c++
digitalWrite(pin, LOW);
```

**High Voltage Connectors**
![High Voltage Connectors]({{ site.github.url }}/public/img/high_voltage_connectors.png) 


The relay module in the above has a single connector with three sockets: **Common (COM)**, **Normally Closed (NC)**, and **Normally Open (NO)**.

**Common (COM)**: COM is the common connection for both the NO and NC pins. Connect the high voltage device to the COM pin.

**Normally Closed (NC)**: The circuit is closed by default.

**Normally Open (NO)**: The circuit is open by default.

Normally open (NO) and normally closed (NC) contacts allow you to use one pin to control two separate circuits depending on your requirements. For example, you could use one pin to control the power to a light bulb and another pin to control the power to a motor. When the pin is high/low the light bulb will turn on otherwise the motor will turn on.

### Wiring

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-esp8266-relay-wired.png) 

| MCU       | Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    12 (D6)    |
| RaspPi W  |    6    |

Before we integrate with Sinric Pro, it is important to verify that the relay is wired correctly. You can use the following code to check whether the relay turns on and off every 5 seconds.  

<script src="https://gist.github.com/kakopappa/baf926bc8b0821f048fe53540e254212.js"></script>

### Step 1 : Create a new device in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **Switch**, description **My First Switch** and select the device type as **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Click **Next** the in the Notifications tab

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

To receive push notifications when your device goes online or offline, enable the **"Connect and Disconnect"** option in the Sinric Pro app. To receive push notifications when your device turns on or off, enable the **"On and Off"** option.


* Click Others and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Coding 

#### 2.1 Install Sinric Pro Library

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)


You can **generate the code** using **Zero Code** feature or write it by your self. If you do not have programming experice, we recommend to use Zero Code feature in the Portal to generate the code, download and flash.

#### 2.2 Complete Code

<script src="https://gist.github.com/kakopappa/0416a1f26b8398ce6dd9f71a6a70755a.js"></script>
 
Now you should be able to control the relay via Portal like in the below video. 

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-relay-on-off.mp4" type="video/mp4">
</video>

### Step 3 : Link [Sinric Pro](https://www.amazon.com/dp/B07ZT5VDT8) Alexa Skill with your account.

<div align="center">
  <table >
    <tr>
      <td>
        <p>&#x2022; Open your Amazon Alexa app.</p>
        <p>&#x2022; Goto Skills & Games.</p>
        <p>&#x2022; Search for <b>Sinric Pro</b>.</p>
        <p>&#x2022; Click ENABLE TO USE.</p>
        <p>&#x2022; Enter your <b>Sinric Pro</b> credentails in linking page.</p>
        <p>&#x2022; Ask Alexa to discover new devices.</p>
        <p>&#x2022; Ask Alexa to turn on the <b>Switch</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Step 4 : Link [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) Google Home action with your account.

<div align="center">
  <table >
    <tr>
      <td>
          <p>&#x2022; Open <b>Google Home</b> and click on <b>Add</b>. </p>
          <p>&#x2022; Select <b>Setup Device</b></p>
          <p>&#x2022; Select <b>Works with Google Home</b></p>
          <p>&#x2022; Search for <b>Sinric Pro</b>.</p>
          <p>&#x2022; Link your account. </p>
          <p>&#x2022; Discover new devices </p>
          <p>&#x2022; Ask Google Home to turn on the <b>Switch</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Step 5 : Link [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) SmartThings with your account.

<div align="center">
  <table >
    <tr>
      <td>
           <p>&#x2022; Open the SmartThings app and tap the <b>+</b> Icon</p>
           <p>&#x2022; Select Device</p>
           <p>&#x2022; Select Sinric Pro under <b>By Brand</b></p>
           <p>&#x2022; Link your account. </p>
           <p>&#x2022; Now you can turn on or off <b>Switch</b> from the dashboard</p> 
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div> 

Continue to [Part 2]({{ site.github.url }}/pages/tutorials/switch/part-2.html) of this article series to learn how to add a push button to toggle the relay.


### Troubleshooting
Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for possible solutions to your issue.



> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)