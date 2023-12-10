---
title: Homebridge (Homekit)
weight: 4
youtubeId: 3YI87iWlgDM
---

With our Homebridge-SinricPro plugin, now you can expose your devices to Homekit.

**1. Get an API Key**

If you do not have a API Key, Login to [Portal](https://portal.sinric.pro) and click **Credentials** or [click here](https://portal.sinric.pro/credential/new/apikey) to generate a new API key.

![Homebridge-SinricPro plugin new API key]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key.png)

Click Save

![Homebridge-SinricPro plugin new API saved]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key-generated.png)

Copy API Key

**1. Install Homebridge-SinricPro plugin**

Click on the Plugins and type [**Sinricpro**](https://www.npmjs.com/package/homebridge-sinricpro).

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-search.png)

Click **Install**. Once the installation completes, it popup this dialog. Enter above API Key

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-settings.png)

Click Save. 

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-install.png)

**Now you must restart Homebridge !!**

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-device-discovert.png)

On start-up Homebridge will discover all your devices and now they are available in Apple HomeKit app.

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-homekit-app.png)


Demo:

{% include youtubePlayer.html id=page.youtubeId %}