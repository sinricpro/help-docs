---
title: Thermostat
layout: post
tag: thermostat
categories: 
    - "devices"
    - "thermostat"
---

Thermostat. 

To create a Thermostat:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Thermostat**
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


#### Sinric Pro C++ SDK: 
Complete Arduino/ESP8266/ESP32 example is available [here]()

#### Sinric Pro Python SDK: 
Complete Python example is available [here]() 

Handle following actions **setPowerState, targetTemperature, setThermostatMode, currentTemperature**  in your IOT module if you are not using any of the SDKs we have built.

#### Supported Sinrc Pro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [targetTemperature](https://github.com/sinricpro/sample_messages/tree/master/03_Brightness/01_setBrightness)
- [setThermostatMode](https://github.com/sinricpro/sample_messages/tree/master/03_Brightness/02_adjustBrightness)
- [currentTemperature](https://github.com/sinricpro/sample_messages/tree/master/04_Color/01_setColor)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.TemperatureSensor](https://developer.amazon.com/docs/device-apis/alexa-temperatureSensor.html)
- [Alexa.ThermostatController](https://developer.amazon.com/docs/device-apis/alexa-thermostatController.html)

####  Supported Google Home Traits
-  N/A

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
