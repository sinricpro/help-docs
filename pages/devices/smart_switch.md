---
title: Smart Switch
layout: post
tag: smart-switch
categories: 
    - "devices"
    - "smart-switch"
---


Smart Switch is a power plug that combines with WI-FI technology. 

To create a Smart Switch:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Smart Switch**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

![Sinric Pro alexa event]({{ site.github.url }}/public/img/sinricpro-smart-switch.png)

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

Cool!

Now let's complete the setup process. To do that, you must update the sample sketch with 
- WiFi credentials
- Copy the selected App key and App Secret in the Step 5 above.
- Copy the device's ID from Sinric -> Devices.

and handle the **setPowerState** action in your IOT module 

#### If you are using the Sinric Pro C++ SDK: 
```c++
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <SinricPro.h>

#define SSID "YOUR WIFI-SSID HERE"
#define PASS "YOUR WIFI-PASS HERE"
#define API_KEY "YOUR-SINRIC-PRO-API-KEY-HERE"
#define SWITCH_ID "YOUR-SWITCH-DEVICE-ID-HERE"
...

bool onPowerState(const char* deviceId, PowerState_t& state) {
 Serial.printf("Device %s turned ", deviceId);
 switch (state) {
 case power_OFF : 
  Serial.printf("off"); 
  break;
 case power_ON : 
  Serial.printf("on"); 
  break;
}
 return true;
}
.....
```
Complete Arduino/ESP8266/ESP32 example is available [here](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Switch)

#### If you are using the SinricPro Python SDK: 
Update the credentails in [credentials.py](https://github.com/sinricpro/python-examples/blob/master/pro_switch_example/credentials.py), then update the code

```python
def power_state(did, state):
print(did, state['state'])
return True, state['state']
```
Complete Python example is available [here](https://github.com/sinricpro/python-pxamples/blob/master/pro_switch_example/app.py) 

#### Supported SinrcPro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/01_Request.json)

#### Supported Alexa capabilities
-  [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)

####  Supported Google Home Traits
-  action.devices.traits.OnOff

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)