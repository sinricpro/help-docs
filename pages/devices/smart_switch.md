---
title: Smart Switch
layout: post
tag: smart-switch
categories: 
    - "devices"
    - "smart-switch"
---


Smart Switch is a power plug that combines with WI-FI technology. 

To create a Smart Switch:

1. Log into your  [SinricPro](https://sinric.pro/) account.
2. Click on **Devices**.
3. Click on **Add Device**.
4. Enter the device name and description.
5. Select the device type as **Smart Switch**
6. Select the **Room** where the device is located.
5. Select the **Device Access Key**. This is the credential your IOT device must use when connecting to SinricPro. 
6. Click **Save**

![Sinric Pro alexa event]({{ site.github.url }}/public/img/sinricpro-smart-switch.png)

That's it. 

If you have already linked the Amazon Alexa skill the app will show a popup in your mobile phone.

Cool!

Now let's complete the setup process. To do that, you must update the sample sketch with 
- WiFi credentials
- Copy the selected App key and App Secret in the Step 5 above.
- Copy the device's ID from Sinric -> Devices.

#### Tutorial
- Coming soon
 
#### Supported SinrcPro actions
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/01_Request.json)

#### Supported Alexa capabilities
-  [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)

####  Supported Google Home Traits
- Coming soon

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
