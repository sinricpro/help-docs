---
title: TV
layout: post
tag: tv
published: false
categories: 
    - "devices"
    - "tv"
---

Smart TV is an internet connected television which allows users to control using voice, stream music and videos.

To create a TV:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name: **tv** and description: **living room tv**.
5. Select the device type as **TV**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

![Sinric Pro alexa arduino esp8266 esp32 tv]({{ site.github.url }}/public/img/sinricpro_alexa_tv_notification.jpg)

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
- [setVolume](https://github.com/sinricpro/sample_messages/tree/master/12_SetVolume)
- [adjustVolume](https://github.com/sinricpro/sample_messages/tree/master/13_AdjustVolume)
- [setMute](https://github.com/sinricpro/sample_messages/tree/master/23_SetMute)
- [mediaControl](https://github.com/sinricpro/sample_messages/tree/master/15_MediaControl)
- [selectInput](https://github.com/sinricpro/sample_messages/tree/master/14_SelectInput)
- [changeChannel](https://github.com/sinricpro/sample_messages/tree/master/16_ChangeChannel)
- [skipChannels](https://github.com/sinricpro/sample_messages/tree/master/17_SkipChannels)

#### Supported Alexa capabilities
- [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)
- [Alexa.Speaker](https://developer.amazon.com/docs/device-apis/alexa-speaker.html)
- [Alexa.PlaybackController](https://developer.amazon.com/docs/device-apis/alexa-playbackController.html)
- [Alexa.InputController](https://developer.amazon.com/docs/device-apis/alexa-inputController.html)
- [Alexa.ChannelController](https://developer.amazon.com/docs/device-apis/alexa-channelController.html)

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
