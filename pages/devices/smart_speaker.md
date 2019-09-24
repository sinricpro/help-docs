---
title: Smart Speaker
layout: post
tag: smart-light-bulb
categories: 
    - "devices"
    - "smart-speaker"
---


To create a Smart Speaker:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Smart Speaker**
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

Handle following actions **setPowerState, setVolume, adjustVolume, setMute, mediaControl, setBands, adjustBands, resetBands,setMode**  in your IOT module if you are not using any of the SDKs we have built.

#### Supported Sinrc Pro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/)
- [setVolume](https://github.com/sinricpro/sample_messages/tree/master/12_SetVolume)
- [adjustVolume](https://github.com/sinricpro/sample_messages/tree/master/13_AdjustVolume)
- [setMute](https://github.com/sinricpro/sample_messages/tree/master/23_SetMute)
- [setBands](https://github.com/sinricpro/sample_messages/tree/master/18_SetBands)
- [adjustBands](https://github.com/sinricpro/sample_messages/tree/master/19_AdjustBands)
- [resetBands](https://github.com/sinricpro/sample_messages/tree/master/20_ResetBands)
- [setMode](https://github.com/sinricpro/sample_messages/tree/master/21_SetMode)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.Speaker](https://developer.amazon.com/docs/device-apis/alexa-speaker.html)
- [Alexa.PlaybackController](https://developer.amazon.com/docs/device-apis/alexa-playbackController.html)
- [Alexa.EqualizerController](https://developer.amazon.com/docs/device-apis/alexa-equalizerController.html)
- [Alexa.InputController](https://developer.amazon.com/docs/device-apis/alexa-inputController.html)

####  Supported Google Home Traits
-  N/A

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
