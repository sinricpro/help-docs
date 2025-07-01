---
title: Fan
layout: post
tag: fan
published: false
categories: 
    - "devices"
    - "fan"
---


Smart fan connects to your WiFi network and can control it using Sinric mobile app interface or with vocal commands using Alexa or Google Home

To create a Fan:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name: **fan** and description: **table fan**.
5. Select the device type as **Fan**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

![Sinric Pro alexa esp8266 esp32 fan]({{ site.github.url }}/public/img/sinricpro_alexa_fan_notification.jpg)

Cool!

Now let's complete the setup process. To do that, you must update the sample sketch with 
- WiFi credentials
- Copy the selected App key and App Secret in the Step 5 above.
- Copy the device's ID from Sinric -> Devices.

#### Tutorial
- Coming soon

#### Sinric Pro C++ SDK: 
Complete Arduino/ESP8266/ESP32 example is available [here](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Switch)

#### Sinric Pro Python SDK: 
Complete Python example is available [here](https://github.com/sinricpro/python-examples/tree/master/pro_switch_example) 
 
#### Supported Sinrc Pro actions and events
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [setRangeValue](https://github.com/sinricpro/sample_messages/tree/master/09_RangeValue/01_setRangeValue)
- [adjustRangeValue](https://github.com/sinricpro/sample_messages/tree/master/09_RangeValue/02_adjustRangeValue)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.RangeController](https://developer.amazon.com/docs/device-apis/alexa-rangeController.html)

**NOTE: Alexa.RangeController is available for English (US) only. Alexa app may or may not show this device type in your Alexa app if you are not using English (US).** For more information: https://developer.amazon.com/docs/device-apis/list-of-interfaces.html

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
