---
title: Window AC Unit
layout: post
tag: windowacunit
categories: 
    - "devices"
    - "windowacunit"
---

Window AC Unit is a portable heating and/or air conditioning unit.

To create a Window AC Unit:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Window AC Unit**
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

#### Supported Sinrc Pro actions and events
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [targetTemperature](https://github.com/sinricpro/sample_messages/tree/master/07_Temperature/01_targetTemperature)
- [adjustTemperature](https://github.com/sinricpro/sample_messages/tree/master/07_Temperature/02_adjustTemperature)
- [currentTemperature](https://github.com/sinricpro/sample_messages/tree/master/07_Temperature/03_currentTemperature)
- [setThermostatMode](https://github.com/sinricpro/sample_messages/tree/master/08_ThermostatMode)
- [setRangeValue](https://github.com/sinricpro/sample_messages/tree/master/09_RangeValue/01_setRangeValue)
- [adjustRangeValue](https://github.com/sinricpro/sample_messages/tree/master/09_RangeValue/02_adjustRangeValue)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.TemperatureSensor](https://developer.amazon.com/docs/device-apis/alexa-temperatureSensor.html)
- [Alexa.ThermostatController](https://developer.amazon.com/docs/device-apis/alexa-thermostatController.html)

**NOTE: Alexa.RangeController is available for English (US) only. Alexa app may or may not show this device type in your Alexa app if you are not using English (US).** For more information: https://developer.amazon.com/docs/device-apis/list-of-interfaces.html

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
