---
title: Doorbell
layout: post
tag: doorbell
categories: 
    - "devices"
    - "doorbell"
---

Sends a notification when a button is pressed. You can get the Amazon Alexa to announce and or chime when your doorbell is pressed.

To create a Doorbell:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Doorbell**
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
Complete Arduino/ESP8266/ESP32 example is available [here](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Doorbell)

#### Sinric Pro Python SDK: 
Complete Python example is available [here](https://github.com/sinricpro/python-examples/tree/master/pro_doorbell_example) 

Handle following actions **DoorbellPress, setPowerState**  in your IOT module if you are not using any of the SDKs we have built.

#### Supported Sinrc Pro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/tree/master/01_PowerState)
- [DoorbellPress](https://github.com/sinricpro/sample_messages/tree/master/06_Doorbell)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.DoorbellEventSource](https://developer.amazon.com/docs/device-apis/alexa-doorbelleventsource.html)

####  Supported Google Home Traits
-  N/A

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
