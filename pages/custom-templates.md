---
title: Device Templates
weight: 2
youtubeId: QJVbSPSztwY
---

### Introduction 

Device Templates in SinricPro allows you to make your own device type by draging and droping capabilities that describes the features of your IoT device. They serve as blueprints for creating custom device types in the SinricPro. You can create your own device type by bundling together the following capabilities.

| Capabilities | | |
|----------|----------|----------|
| [Brightness]({{ site.github.url }}/pages/device-templates/capabilities/brightness.html) | [Channel]({{ site.github.url }}/pages/device-templates/capabilities/channel.html) | [Color]({{ site.github.url }}/pages/device-templates/capabilities/color.html) |
| [Color Temperature]({{ site.github.url }}/pages/device-templates/capabilities/color-temperature.html) | [Contact Sensor]({{ site.github.url }}/pages/device-templates/capabilities/contact-sensor.html) | [Doorbell]({{ site.github.url }}/pages/device-templates/capabilities/doorbell.html) |
| [Equalizer]({{ site.github.url }}/pages/device-templates/capabilities/equalizer.html) | [Input Control]({{ site.github.url }}/pages/device-templates/capabilities/input-control.html) | [Lock]({{ site.github.url }}/pages/device-templates/capabilities/lock.html) |
| [Media Control]({{ site.github.url }}/pages/device-templates/capabilities/media-control.html) | [Mode]({{ site.github.url }}/pages/device-templates/capabilities/mode.html) | [Motion Sensor]({{ site.github.url }}/pages/device-templates/capabilities/motion-sensor.html) |
| [Open Close]({{ site.github.url }}/pages/device-templates/capabilities/open-close.html) | [Percentage]({{ site.github.url }}/pages/device-templates/capabilities/percentage.html) | [Power]({{ site.github.url }}/pages/device-templates/capabilities/power.html) |
| [Power Level]({{ site.github.url }}/pages/device-templates/capabilities/power-level.html) | [Push Notification]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) | [Range]({{ site.github.url }}/pages/device-templates/capabilities/range.html) |
| [Setting]({{ site.github.url }}/pages/device-templates/capabilities/setting.html) | [Smart Button]({{ site.github.url }}/pages/device-templates/capabilities/smart-button.html) | [Start Stop]({{ site.github.url }}/pages/device-templates/capabilities/start-stop.html) |
| [Temperature Sensor]({{ site.github.url }}/pages/device-templates/capabilities/temperature-sensor.html) | [Thermostat]({{ site.github.url }}/pages/device-templates/capabilities/thermostat.html) | [Toggle]({{ site.github.url }}/pages/device-templates/capabilities/toggle.html) |
| [Volume]({{ site.github.url }}/pages/device-templates/capabilities/volume.html) | | |

### How to make a custom device type? 

Let's create a custom device type called **Washing Machine**, learn how to define differet wash modes like: *Hot, Warm and Cold* and generate the code it and control using Amazon Alexa and Goole Home.

##### More Tutorials: [Soil Moisture]({{ site.github.url }}/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.html), [Water Level Indicator]({{ site.github.url }}/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.html), [Water Sensor]({{ site.github.url }}/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.html), [Air Quality Sensor: MQ135]({{ site.github.url }}/pages/tutorials/air-quality-sensors/mq135.html), [Gas Sensor]({{ site.github.url }}/pages/tutorials/custom-device-types/alcohol-sensor/MQ-3.html)

### Step 1: Create Washing Machine device template

* [Login](http://portal.sinric.pro) to your Sinric Pro account.

* Go to **Device Templates** menu on left.

* Click **Add Device Template** button.
    * Template Name: **Washing Machine**

    * Description: **washing machine template** 

    * Device Type: **Other**
    
    *Note*: Select the device type that best matches your hardware and your target voice assistant ecosystem. While Alexa is compatible with all device types, Google Home has limited compatibility. If you don't see your intended device type listed, please reach out to our support team.

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
 
When you descover the devices in Alexa, Google,  Washing Machine device will show

{% include youtubePlayer.html id=page.youtubeId %}

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)