---
title: Temperature Sensor
layout: post
tag: temperature-sensor
categories: 
    - "sensor"
    - "temperature-sensor"
---

Temperature sensor can detect the temperature. 

To create a Contact Sensor:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Temperature Sensor**
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

#### Sinric Pro C++ SDK: 
Complete Arduino/ESP8266/ESP32 example is available [here]()

#### Sinric Pro Python SDK: 
Complete Python example is available [here]() 

Handle following actions **setPowerState, setContactState**  in your IOT module if you are not using any of the SDKs we have built.

#### Supported Sinrc Pro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [currentTemperature](https://github.com/sinricpro/sample_messages/tree/master/07_Temperature/03_currentTemperature)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.ContactSensor](https://developer.amazon.com/docs/device-apis/alexa-contactSensor.html) 

####  Supported Google Home Traits
-  N/A

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
