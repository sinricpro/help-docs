---
title: Smart Light Bulb
layout: post
tag: smart-light-bulb
categories: 
    - "devices"
    - "smart-light-bulb"
---

Smart Light Bulb is a LED light bulb that allows lighting to be customized using RGB color code and can be controlled remotely using WiFi. 

To create a Smart Light Bulb:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name: **kitchen light** and description: **my kitchen lights**.
5. Select the device type as **Smart Light Bulb**
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
Complete Arduino/ESP8266/ESP32 example is available [here](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Light)

#### Sinric Pro Python SDK: 
Complete Python example is available [here](https://github.com/sinricpro/python-examples/tree/master/pro_light_example/app.py) 

#### Supported Sinrc Pro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [setBrightness](https://github.com/sinricpro/sample_messages/tree/master/03_Brightness/01_setBrightness)
- [adjustBrightness](https://github.com/sinricpro/sample_messages/tree/master/03_Brightness/02_adjustBrightness)
- [setColor](https://github.com/sinricpro/sample_messages/tree/master/04_Color/01_setColor)
- [setColorTemperature](https://github.com/sinricpro/sample_messages/tree/master/05_ColorTemperature/01_setColorTemperature)
- [increaseColorTemperature](https://github.com/sinricpro/sample_messages/tree/master/05_ColorTemperature/02_increaseColorTemperature)
- [decreaseColorTemperature](https://github.com/sinricpro/sample_messages/tree/master/05_ColorTemperature/03_decreaseColorTemperature)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.BrightnessController](https://developer.amazon.com/docs/device-apis/alexa-brightnesscontroller.html)
- [Alexa.ColorController](https://developer.amazon.com/docs/device-apis/alexa-colorcontroller.html)
- [Alexa.ColorTemperatureController](https://developer.amazon.com/docs/device-apis/alexa-colortemperaturecontroller.html)
- [Alexa.BrightnessController](https://developer.amazon.com/docs/device-apis/alexa-brightnesscontroller.html)

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
