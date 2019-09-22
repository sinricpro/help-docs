---
title: Amazon Alexa
weight: 4
---

**How Amazon Alexa works with Sinric Pro**

You can find the Alexa Smart Home skill here. We recommend you to do this before creating any devices in the system to see the magic.

Once you complete the skill linking process. Run the discovery command to discover all the devices connected to your account. 


### Request
1. The Amazon Alexa sends a message to the Sinric Pro IOT Platform. eg: Turn on [device name]
2. The Sinric Pro IoT platform creates a request type message with appropriate action (in this case setPowerState) and send it to your IoT hardware module.
3. Your IoT hardware module responds back to the Sinric Pro IOT Platform with success or failed status. 

   **If you fail to respond with in 8 seconds / or device is offline, then the request will timeout and Alexa will say "Device is unresponsive".**

4. The Sinric Pro IoT platform updates the device status according to your response and updates Alexa service. 

 
![Sinric Pro alexa]({{ site.github.url }}/public/img/sinricpro-alexa-data-flow.png)


### Event

Sinric Pro IOT platform will report any changes to Alexa as well. 

1.  The user change the device state physically. Eg: push a button to turn on the switch. 
2.  Your IOT module creates an event message and send it to Sinric Pro IOT Platform. (In this case setPowerState)
3.  The Sinric Pro IOT platform update the device status and update Alexa service

![Sinric Pro alexa event]({{ site.github.url }}/public/img/sinricpro-alexa-event.png)

