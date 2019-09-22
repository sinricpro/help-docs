---
title: Messaging
weight: 2
---


**Overview**

The documentation covers the Sinric Pro WebSocket messaging protocol. All messages sent over the WebSocket protocol is in JSON format and they are signed using HMAC key  to guarante the authenticity of the request. Sample message definitions are available [here](https://github.com/sinricpro/sample_messages)

We recommend using one of the SDKs we have built since they properly handle authentication, connection, reconnection and many more feature for messaging layer. We have libraries written for `Arduino`, `ESP8266`, `ESP32`, `RaspberryPI`, and `PC`

-   [ESP8266/ESP32 SDK](https://github.com/sinricpro/esp8266-esp32-sdk) - [examples](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples)
-   [Python SDK](https://github.com/sinricpro/python-sdk)  - [examples](https://github.com/sinricpro/python-examples)

### Connecting
Connect to the Websocket API at the following url.
`ws://ws.sinric.pro`

### Authentication
Each connection to the WebSocket API must be authenticated with an App Key in HTTP Header and subsequent requests must be signed using the App Secret.

#### Connect example

```js
let ws = new WebSocket('ws://ws.sinric.pro', {
    headers: { 
        appkey: "Your-app-key-here", 
        deviceids: "deviceid;deviceid" 
    }
});
```

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
 
[https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/01_Request.json](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/01_Request.json)

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

[https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/02_Response.json](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/02_Response.json)

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

## Signature calculation.
This is a signature calculation example in NodeJS. 

```js

const crypto = require('crypto'); // npm install crypto
const _ = require("lodash"); // npm install lodash
const header = { "payloadVersion": 2, "signatureVersion" : 1 };
const APP_SECRET = "a751abdb-e260-4bfd-a42c-60660561123d-3d8e6a30-0f39-42f0-a1ec-e47d47fb1392";

function sortKeys(obj) {
  if(_.isArray(obj)) {
    return obj.map(sortKeys);
  }
  if(_.isObject(obj)) {
    return _.fromPairs(_.keys(obj).sort().map(key => [key, sortKeys(obj[key])]));
  }
  return obj;
}

function getSignature(message, appsecert) {
    return crypto.createHmac('sha256', appsecert).update(message).digest('base64');
}
 
let payload = {
  "replyToken": "6ec1f778-e92f-487c-9818-bdbe3438f30e",
  "clientId": "alexa-skill",
  "createdAt": 1567852244,
  "deviceId": "5d737888aea17c30a056d759",
  "deviceAttributes": [],
  "type": "request",
  "action": "setPowerState",
  "value": {
	 "state": "On"
  }
}

// Sort the json by the keys first
payload = sortKeys(payload);

// Calculate HMAC
const HMAC = getSignature(JSON.stringify(payload), APP_SECRET);
const signature = { "HMAC": HMAC };
const event = { header: header, payload: payload, signature : signature };

console.log(event);
 

// Output:

/*
{ header: { payloadVersion: 2, signatureVersion: 1 },
  payload:
   { action: 'setPowerState',
     clientId: 'alexa-skill',
     createdAt: 1567852244,
     deviceAttributes: [],
     deviceId: '5d737888aea17c30a056d759',
     replyToken: '6ec1f778-e92f-487c-9818-bdbe3438f30e',
     type: 'request',
     value: { state: 'On' } },
  signature: { HMAC: '5aR5dHuVPOb1rYrWIzSbwqJX6mWMlH1EluQ2Pl7sPDg=' } }
*/
```

## Complete list of requests, responses and events

This is a complete list of requests, responses and events by the device type

| Device type               |Action |Event| 
|----------------|------|---------|------|
|**Smart Switch** | setPowerState | setPowerState 
|**Smart Light Bulb**  |setPowerState, adjustBrightness, setBrightness, setColor, decreaseColorTemperature, increaseColorTemperature, setColorTemperature, setPowerLevel, adjustPowerLevel|setPowerState, setPowerLevel, setColor, setColorTemperature|          
|**Smart Switch with Dimmer**|setPowerState, setPowerLevel adjustPowerLevel|setPowerState, setPowerLevel|
|**Doorbell**| setPowerState|DoorbellPress, setPowerState|
|**Temperature Sensor** |setPowerState|setPowerState, currentTemperature|
|**Thermostat**|setPowerState,targetTemperature, setThermostatMode|setPowerState, targetTemperature, setThermostatMode, currentTemperature|
|**Window AC Unit**|setPowerState, targetTemperature, setThermostatMode, setRangeValue, adjustRangeValue|setPowerState, targetTemperature, setThermostatMode, setRangeValue, currentTemperature|
|**Fan**|setPowerState, setRangeValue|setPowerState, setRangeValue|
|**Motion Sensor**|setPowerState|setPowerState, motion|
|**Contact Sensor**|setPowerState|setPowerState, setContactState|
|**TV**|setPowerState, setVolume, adjustVolume, setMute, mediaControl, selectInput, changeChannel, skipChannels|setPowerState, setVolume, setMute, mediaControl, selectInput, changeChannel, skipChannels|
|**Smart Speaker**|setPowerState, setVolume, adjustVolume, setMute, mediaControl, setBands, adjustBands, resetBands, setMode|setPowerState, setVolume, setMute, mediaControl, setBands, resetBands, setMode|
|**Smart Doorlock**|setLockState|setLockState| 

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)