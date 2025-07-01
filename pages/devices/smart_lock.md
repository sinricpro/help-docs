---
title: Smart Lock
layout: post
tag: smart-lock
published: false
categories: 
    - "devices"
    - "smart-lock"
---


To create a Smart Lock:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name: **front door** and description: **front door lock**.
5. Select the device type as **Smart Lock**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

![Sinric Pro alexa arduino esp8266 esp32 smart lock]({{ site.github.url }}/public/img/sinricpro_alexa_doorlock_notification.jpg)

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
Complete Python example is available [here]https://github.com/sinricpro/python-examples/tree/master/pro_smart_lock_example) 

Handle following actions **setLockState**  in your IOT module if you are not using any of the SDKs we have built.

#### Supported Sinrc Pro actions and events
- [setLockState](https://github.com/sinricpro/sample_messages/tree/master/22_SetLockState)

#### Supported Alexa capabilities
- [Alexa.LockController](https://developer.amazon.com/docs/device-apis/alexa-lockController.html)


####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
