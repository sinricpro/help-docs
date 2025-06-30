---
title: OTA Updates
weight: 4
lang: en
youtubeId: FxtsQuC9mn8
---

### Introduction 

OTA (Over-the-Air) updates allow you to load new firmware onto your module remotely, eliminating the need to connect it to your PC. This capability is particularly valuable when physical access to the ESP module is restricted or inconvenient.




### How to do an OTA Update

1. [Login](http://portal.sinric.pro) to your Sinric Pro account.

2. Go to **OTA Updates** menu on left.

3. Click **Add OTA Update** button.

4. Enter the the new firmware version. Select the OTA .bin file (Arduino IDE -> Sketch -> Export Compiled Binary) and the modules you want to apply the OTA update.

5. Click **Save**

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-upload.png">

Once you click the **Save** button, the server will broadcast an OTA update request to the selected modules. If your module is currently offline, it will receive the update the next time it connects to the server.

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-inprogress.png">

*Note: You need to be on SinricPro SDK v3.2.x or newer in order to use OTA*

You can find the complete example code here: 
[https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)


{% include youtubePlayer.html id=page.youtubeId %}

If you are looking for local WiFI OTA Update [here]({{ site.github.url }}/pages/ota-updates/local-wifi-ota-update.html)