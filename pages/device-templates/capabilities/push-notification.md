---
title: Push Notification Capability
layout: post
description: How to send a push notification from an ESP32, ESP8266 or Raspberry Pi Pico W to your phone with the Sinric Pro SDK, using sendPushNotification().
---

The Push Notification capability in SinricPro device templates gives you the capability to send a push notification message from your device.

### How to send a push notification with the Sinric Pro SDK

Call `sendPushNotification()` on your device from your ESP32, ESP8266 or Raspberry Pi Pico W sketch. The message is delivered to the Sinric Pro app on your phone and shown in the Sinric Pro Portal.

{% highlight c %}   
SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
String notification = "Hello SinricPro";
bool success = mySwitch.sendPushNotification(notification);
{% endhighlight %}


In order to work this correctly, you must enable **Alerts** from **Notifications** in device settings.

![Sinric Pro Device Template Setting capabilities]({{ site.github.url }}/public/img/device-templates-device-push-notification-alerts-enabled.png)

[Documentation](https://sinricpro.github.io/esp8266-esp32-sdk-documentation/class_s_i_n_r_i_c_p_r_o__3__5__0_1_1_push_notification.html)


#### Supports

- [ ] Alexa
- [ ] Google Home
- [ ] SmartThings
- [x] SinricPro Portal
- [x] SinricPro App

### Alexa

Not Supported
 
### Google Home

Not Supported


> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)