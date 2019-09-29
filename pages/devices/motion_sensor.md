---
title: Motion Sensor
layout: post
tag: doorbell
categories: 
    - "devices"
    - "motionsensor"
    - "sensor"
---

Motion sensors are used to detect movement in an area.

To create a Motion Sensor:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name: **bedroom motion** and description: **bedroom room motion sensor**.
5. Select the device type as **Motion Sensor**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

![Sinric Pro alexa arduino esp8266 esp32 motion sensor]({{ site.github.url }}/public/img/sinricpro_alexa_motion-sensor_notification.jpg)


Cool!

Now let's complete the setup process. To do that, you must update the sample sketch with 
- WiFi credentials
- Copy the selected App key and App Secret in the Step 5 above.
- Copy the device's ID from Sinric -> Devices.


#### Tutorial: 
- Coming soon

#### Sinric Pro C++ SDK: 
Complete Arduino/ESP8266/ESP32 example is available [here]()

#### Sinric Pro Python SDK: 
Complete Python example is available [here]() 

#### Supported Sinrc Pro actions and events
- [setPowerState](https://github.com/sinricpro/sample_messages/tree/master/01_PowerState)
- [motionDetected](https://github.com/sinricpro/sample_messages/tree/master/10_Motion)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.MotionSensor](https://developer.amazon.com/docs/device-apis/alexa-motionSensor.html)

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
