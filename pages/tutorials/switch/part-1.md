---
title: Switch Tutorial Part 1 - Turn on and off a Relay
layout: post
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

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-esp8266-relay-wired.png) 

| MCU       | Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    12 (D6)    |
| RaspPi W  |    6    |

Before we integrate with Sinric Pro, it is important to verify that the relay is wired correctly. You can use the following code to check whether the relay turns on and off every 5 seconds.  

```c++
#if defined(ESP8266)
  #define relay        12
#elif defined(ESP32) 
  #define relay        16
#elif (ARDUINO_ARCH_RP2040)
  #define relay        6
#endif

void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);
}

void loop() {
  Serial.println("Writing HIGH ..");
  digitalWrite(relay, HIGH);
  delay(5000); 
  
  Serial.println("Writing LOW ..");
  digitalWrite(relay, LOW);
  delay(5000);
}
```

### Step 1 : Create a new device in Sinric Pro

* [Login](http://portal.sinric.pro) to your Sinric Pro account, go to **Devices** menu on your left and click **Add Device** button (On top left).
* Enter the device name **Switch**, description **My First Switch** and select the device type as **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Click **Next** the in the Notifications tab, Timers tab and Click **Save**

* Next screen will show the credentials required to connect the device you just created.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copy the **Device Id**, **App Key** and **App Secret** ***Keep these values secure. DO NOT SHARE THEM ON PUBLIC FORUMS !***

### Step 2 : Coding 
 
You can generate the code using Zero Code feature or write it by your self. If you do not have programming experice, we recommend to use Zero Code feature.
 

```c++
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProSwitch.h"

#define WIFI_SSID         ""  // Change WIFI_SSID to your WiFi Name.
#define WIFI_PASS         ""  // Change WIFI_PASS to your WiFi password.
#define APP_KEY           ""  // Paste App Key from above 
#define APP_SECRET        ""  // Paste App Secret from above 
#define SWITCH_ID_1       ""  // Paste Device Id from  above

#if defined(ESP8266)
  #define RELAYPIN_1        12
#elif defined(ESP32) 
  #define RELAYPIN_1        16
#elif (ARDUINO_ARCH_RP2040)
  #define RELAYPIN_1        6
#endif

#define BAUD_RATE         115200                // Change baudrate to your need

bool onPowerState1(const String &deviceId, bool &state) {
 Serial.printf("Device 1 turned %s", state?"on":"off");
 digitalWrite(RELAYPIN_1, state ? HIGH:LOW);
 return true; // request handled properly
}

// setup function for WiFi connection
void setupWiFi() {
  Serial.printf("\r\n[Wifi]: Connecting");

  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }

  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
  // add devices and callbacks to SinricPro
  pinMode(RELAYPIN_1, OUTPUT);
    
  SinricProSwitch& mySwitch1 = SinricPro[SWITCH_ID_1];
  mySwitch1.onPowerState(onPowerState1);
    
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
   
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```
 
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


### Troubleshooting

#### Can not connect to Sinric Pro ? 

* Always try our example sketches without making any changes. They have been thoroughly tested and are known to work correctly.

* Enable logging and check for errors, disconnections.

    * To enable logs Sinric Pro SDK logs, add ``#define ENABLE_DEBUG`` to top of the sketch.

        * To enable ESP8266 logs, in Arduinio IDE:

        1. `Tools -> Debug Serial Port -> Serial`

        2. `Tools -> Debug Level -> SSL + HTTP_CLIENT`

        * To enable ESP32 logs, in Arduinio IDE:

            `Tools -> Core Debug Level -> Verbose`


* Try starting a hotspot from your mobile phone and then connect your ESP to SinricPro via the hotspot. If you can connect to SinricPro via the hotspot, then the problem is with your WiFi network. 

* Try switching to a different WiFi network if possible.

* Sometimes, due to memory limitations, the ESP chip may fail while trying to establish the SSL connection to the SinricPro server. In this case, you can try disabling the SSL feature by adding the following line to the **top of the sketch**:

    ```#define SINRICPRO_NOSSL```

* If you have any long delay(x); in the loop() function, you may need to remove them.
 
* Check for existing [issues](https://github.com/sinricpro/esp8266-esp32-sdk/issues) in GitHub repo or open a [new one](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)

 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)