---
title: Google Home
weight: 4
youtubeId: UHuVoE6kPB8
---

**How to integrate Sinric Pro + IFTTT + Google Home**

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