---
title: IFTTT
weight: 4
youtubeId: UHuVoE6kPB8
---

**How to integrate IFTTT Webhooks with Sinric Pro**

### Sending events to IFTTT

Login to your IFTTT account. Get the API Key under the **Documentation** link in the top right of the [Webhooks service page](https://ifttt.com/maker_webhooks/).

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_how_to_get_api_key.png)

Copy your IFTTT API Key and paste it in Menu -> Integrations -> IFTTT Webhooks
  
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_save_key.png)
Now, Sinric Pro is able to send **events** coming from your IoT development board (such as ESP8266, ESP32, RaspPi) to IFTTT.

Requests made to IFTTT from Sinric Pro will have the below format
https://maker.ifttt.com/trigger/**{event}**/with/key/**{key}**

**{event}** is the action (eg: setPowerState). You can see the the complete payload [here](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/03_Event.json) 

**{key}** is your IFTTT API Key

When constructing the body, The Sinric Pro will extract the data sent in your event like below 

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_iftt_payload_explained.png)

With the following data is used as payload

**value1** = value from the event. Eg: { "state": "On" }

**value2** = action name from the event "setPowerState"

**value3** = deviceId the device id from the message
 
### From IFTTT to Sinric Pro

Sending an action to Sinric Pro is easy. 

1. Create a new API Key in Sinric Pro
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_new_api_key.png)


2. Now, create a new Applet in IFTTT

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinricpro-iftt-request.png)

URL:
**https://ifttt.sinric.pro/ifttt/v1/actions**

Method:
**POST**

Content Type (optional) :
**application/json**

Body:

{% highlight json %}   
{
   "api_key":"API key from step 1",
   "device_id":"device id from portal",
   "action":"setPowerState",
   "value":{
      "state":"On"
   }
}
{% endhighlight %}


> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)