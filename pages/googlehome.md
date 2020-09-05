---
title: Google Home
weight: 4
youtubeId: UHuVoE6kPB8
---

**How to integrate Sinric Pro + Google Home**

There are two ways to integrate your Sinric Pro devices with Google Home.

### 1. Via Samsung SmartThings (easy way)

1.1 Download the SmartThings app for [Android](https://play.google.com/store/apps/details?id=com.smartthings.android&hl=en) or [iOS](https://itunes.apple.com/us/app/smartthings-mobile/id590800740?mt=8) and create an account and login.

1.2 Link Sinric Pro [here]({{ site.github.url }}/pages/smartthings.html)

1.3. Open the Google Home app and tap the **+** Icon, Click Setup device, Select **Have something already set up?**, Select **SmartThings**

1.4. Link your SmartThings account and you can see all your SinricPro devices in Google Home now


![Sinric Pro Google Home SmartThings]({{ site.github.url }}/public/img/sinricpro-smartthings-googlehome.png)

### 2. Via IFTTT (hard way)

#### Please make sure you have configured [IFTTT]({{ site.github.url }}/pages/ifttt.html)  before starting this !

Goto  [**https://ifttt.com/create**](https://ifttt.com/create)

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_create_googlehome.png)

Select **Google Assistant**

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_select_google_assistant.png)

Choose a trigger  : **Say a simple phrase**
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_select_google_assistant_choose_trigger.png)

Complete the trigger : **Turn on the bedroom lights**
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_select_google_assistant_complete_trigger.png)

Select **that**
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_select_that.png)

Select **webhook**
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_select_webhook.png)

Select **make a web request**

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_select_make_a_web_request.png)

Complete **action fields**

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_complete_action_fields.png)

**URL:** https://ifttt.sinric.pro/v1/actions

**Method:** POST

**Content Type (optional) :** application/json

**Body:**

{% highlight json %}   
{
   "api_key":"API key from Portal -> Credentails -> API Key",
   "device_id":"device id from Portal -> Devices",
   "action":"setPowerState",
   "value":{
      "state":"On"
   }
}
{% endhighlight %}

Demo Google Home:
{% include youtubePlayer.html id=page.youtubeId %}


> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)