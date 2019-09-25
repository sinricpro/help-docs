---
title: Switch With Dimmer
layout: post
tag: smart-switch-with-dimmer
categories: 
    - "devices"
    - "switch-with-dimmer"
---

Smart switch that has a built in dimming functionality

To create a Switch with dimmer:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Switch with Dimming**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

Cool!

Now let's complete the setup process. To do that, you must update the sample sketch with 
- WiFi credentials
- Copy the selected App key and App Secret in the Step 5 above.
- Copy the device's ID from Sinric -> Devices.

#### Tutorial
- Coming soon

#### Sinric Pro C++ SDK: 
Complete Arduino/ESP8266/ESP32 example is available [here]()

#### Sinric Pro Python SDK: 
Complete Python example is available [here]() 

#### Supported Sinrc Pro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [setPowerLevel](https://github.com/sinricpro/sample_messages/tree/master/02_PowerLevel/01_setPowerLevel)
- [adjustPowerLevel](https://github.com/sinricpro/sample_messages/tree/master/02_PowerLevel/02_adjustPowerLevel)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.PowerLevelController](https://developer.amazon.com/docs/device-apis/alexa-powerLevelController.html)
- [Alexa.PercentageController](https://developer.amazon.com/docs/device-apis/alexa-percentageController.html)

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
