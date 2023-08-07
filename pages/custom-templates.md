---
title: Device Templates
weight: 2
youtubeId: QJVbSPSztwY
---

### Introduction 

Built-in device types are nice but sometimes they are just not what we want. In this walk though we will create a new custom device type
called **Washing Machine**, learn how to define differet wash modes like: Hot, Warm and Cold and generate the code it and control using Amazon Alexa.

### Step 1: Create Washing Machine device template

* [Login](http://portal.sinric.pro) to your Sinric Pro account.
* Go to **Device Templates** menu on left.
* Click **Add Device Template** button.
    * Template Name: **Washing Machine**
    * Description: **washing machine template** 
    * Device Type: **Other**. If the device type you are looking for is in the list, you can select it

![Sinric Pro device template]({{ site.github.url }}/public/img/sinric-pro-create-device-template-basic-info.png)

* Go to **Capabilities** tab.
* Now we must to drag and drop the capabilities supported by our washing machine. 
* Drag and drop **Power** because we want to turn on/off our Washing Machine. 
* Drag and drop **Mode** because we want to set the wash temperature to : **Hot**, **Warm** and **Cold**.

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-capabilities.png)

* Click on **Configure** button and define the three modes

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-modes.png)

* **InstanceId**: You can leave it as it is. We use InstanceId to uniquely identify a mode when you add multiple modes

* **Locale**: Choose **English (US)**

* **Mode name**: Enter **Wash Temperature**

* **Modes**: Enter following modes
    * Hot
    * Warm
    * Cold

* Click **Save** to save the modes

* Click **Save**  to save the template

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/create-device-template.gif)

   
### Step 2 : Creating Washing Machine Device

Now we are going to create a device out of the device template we created ealier.

* Go to **Devices** menu and click on **Add**. 

    * Device Name: **Washing Machine**
    * Description: **My washing machine at basement**
    * Device Type: Select **Washing Machine** under "Your Device Templates". This is the template we created ealier.
    * Device Access Key: Leave the default selection
    * Room: Leave the default selection
    * Click Next > Next > Next and **Save**.

![Sinric Pro create a device from template]({{ site.github.url }}/public/img/sinric-pro-create-device-from-template.png)

### Step 3 : Generating Code for Washing Machine Device

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generate-code.png)

* Click on **Code Generator** to generate the custom device code. 

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generated-code.png)

* Sinric Pro will generate custom device the code for ESP8266/ESP32. You can download the project as a zip file and unzip and run. Make sure you are using the
latest version of the Sinric Pro SDK (v2.9.0). Otherwise you may see compile errors in your IDE

![Sinric Pro create a device and generate code from template]({{ site.github.url }}/public/img/create-device-template-and-generate-code.gif)
 

{% include youtubePlayer.html id=page.youtubeId %}

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)