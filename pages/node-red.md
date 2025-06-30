---
title: Node-RED
weight: 4
lang: en
youtubeId: YYjxLY7zioo
---

With our Node-RED plugin, now you can receive commands from Amazon Alexa, Google Home or SmartThings in Node-RED.

**Installtion**

Click on the hamburger menu in the top-right corner and select Manage palette, select Install, type [**@sinricpro/node-red-contrib-sinric-pro**](https://flows.nodered.org/node/@sinricpro/node-red-contrib-sinric-pro) and click the install button.

Please make sure Git command line tools are installed.  If you are on a Debian-based distribution, such as Ubuntu, try apt:

```
sudo apt install git-all
```

Otherwise please refer Git documentation

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


![Sinric Pro Node-RED installtion]({{ site.github.url }}/public/img/sinricpro_node_red_install.png)

After the installation is complete a new set of nodes shoud appear under **sinricpro** category

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinricpro_node_red_nodes.png)

**How to use**

* Go to Sinric Pro [**here**](https://sinric.pro)

* Create an account or login using your email address.

* Create a new device and click Save. 

Copy the Device Id, App Key and App Secret from the last page. 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Create a new flow or use existing one and add a device node.

* Edit the device node. Enter the app credential and enter the device details.

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinric_pro_nodered_app_credential.png)

Once the device node is configured, voice commands related to above device in SinricPro will be forward to this Node-RED node. 

* You can add another node (function) to process this output. 

![Sinric Pro Node-RED function node]({{ site.github.url }}/public/img/sinric_pro_nodered_function_node.png)

* Add a **response** node to send the response back to Sinric Pro server.

![Sinric Pro Node-RED response node]({{ site.github.url }}/public/img/sinric_pro_node_red_response.png)

{% include youtubePlayer.html id=page.youtubeId %}
 
Checkout the  [**example**](https://github.com/sinricpro/node-red-contrib-sinric-pro/tree/main/examples) repo for more examples.