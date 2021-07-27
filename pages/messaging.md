---
title: Messaging
weight: 2
---


**Overview**

The documentation covers the Sinric Pro WebSocket messaging protocol. All messages sent over the WebSocket protocol is in JSON format and they are signed using HMAC key  to guarante the authenticity of the request. Sample message definitions are available [here](https://github.com/sinricpro/sample_messages)

We recommend using one of the SDKs we have built since they properly handle authentication, connection, reconnection and many more feature for messaging layer. We have libraries written for `Arduino`, `ESP8266`, `ESP32`, `RaspberryPI`, and `PC`

-   [ESP8266/ESP32 SDK](https://github.com/sinricpro/esp8266-esp32-sdk) - [examples](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples)
-   [Python SDK](https://github.com/sinricpro/python-sdk)  - [examples](https://github.com/sinricpro/python-examples)

### Messaging

There are 3 types of messages in Sinric Pro platform. They are

 1. Request
 2. Respond
 3. Event

## Request
An act of doing something in will generate a **request** type message in the system. Eg: Alexa, turn on [device name] will generate a request message like below  
{% highlight json %}   
{
    "header": {
        "payloadVersion": 2,
        "signatureVersion": 1
    },
    "payload": {
        "action": "setPowerState",
        "clientId": "alexa-skill",
        "createdAt": 1567852244,
        "deviceAttributes": [],
        "deviceId": "5d737888aea17c30a056d759",
        "replyToken": "6ec1f778-e92f-487c-9818-bdbe3438f30e",
        "type": "request",
        "value": {
            "state": "On"
        }
    },
    "signature": {
        "HMAC": "jjrxa5b7fzXXml2+PxlfUYIUgLdHg33Cr2yWVuzlr/s="
    }
}
{% endhighlight %}
 
[Complete Message](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/01_Request.json)

## Response
 When you receive such a request in your IOT module, you must respond to it by sending a **response** type message. The correct response to above request should be

{% highlight json %}
{
    "header": {
        "payloadVersion": 2,
        "signatureVersion": 1
    },
    "payload": {
        "action": "setPowerState",
        "clientId": "alexa-skill",
        "createdAt": 1567860300,
        "deviceId": "5d737888aea17c30a056d759",
        "message": "OK",
        "replyToken": "6ec1f778-e92f-487c-9818-bdbe3438f30e",
        "success": true,
        "type": "response",
        "value": {
            "state": "On"
        }
    },
    "signature": {
        "HMAC": "xxxxxxxx"
    }
}
{% endhighlight %}

[Complete Message](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/02_Response.json)

**Notes:**

* **replyToken** in the request is being used to identify the message. It must be used when you create a "response" type message
* **createdAt** timestamp is the Unix time in seconds
* If you are using the SDK, the responses will be handled by the SDK internally

Upon receiving this message in the server, the server will update the interested parties about the status of the **request** .

## Event
Let's imagine you want to turn on the device by pushing a button or change the brightness level using a nob. Now you are interacting with the device physically and making changes to it. To notify the server about the changes you make, you can send an **event**  message to the server. Eg: Amazon Alexa cloud

{% highlight json %}   
{
    "header": {
        "payloadVersion": 2,
        "signatureVersion": 1
    },
    "payload": {
        "action": "setPowerState",
        "cause": {
            "type": "PHYSICAL_INTERACTION"
        },
        "createdAt": 1567852244,
        "deviceId": "5d737888aea17c30a056d759",
        "replyToken": "6ec1f778-e92f-487c-9818-bdbe3438f30e",
        "type": "event",
        "value": {
            "state": "On"
        }
    },
    "signature": {
        "HMAC": "xxxxx"
    }
}
 {% endhighlight %}
  
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)