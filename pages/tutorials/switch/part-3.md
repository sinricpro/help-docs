---
title: Switch Tutorial Part 3 - Multiple relays with multiple tactile (push) buttons
layout: post
---

In this section, we will continue from [Part 2]({{ site.github.url }}/pages/tutorials/switch/part-2.html) and add multiple relays and tactile buttons (aka push buttons)

### Prerequisites : 

Following components are required.

| Component    | Quantity |
| ---------                   | ------- |
| ESP32, ESP8266 or RaspPi W  |    1     |
| SPDT Relay controller       |    4     |
| Push button                 |    4     |
| 10K ohm resistor            |    4     | 
| Jumper Wires                |    4     | 
 
### Wiring
 
We are going to use Pull-Down method to wire our push button. If you are not sure what that means, please refer [Part 2]({{ site.github.url }}/pages/tutorials/switch/part-2.html) for more details.


| MCU       | Pin     | Component     |
| --------- | ------- | ------- |
| ESP8266   |    D1   |    Relay   |
| ESP8266   |    D2   |    Relay   |
| ESP8266   |    D3   |    Relay   |
| ESP8266   |    D4   |    Relay   |
| ESP8266   |    D5   |    Push Button   |
| ESP8266   |    D6   |    Push Button   |
| ESP8266   |    D7   |    Push Button   |
| ESP8266   |    D8   |    Push Button   |
| ESP32     |    16   |    Relay   |
| ESP32     |    17   |    Relay   |
| ESP32     |    18   |    Relay   |
| ESP32     |    19   |    Relay   |
| ESP32     |    25   |    Push Button   |
| ESP32     |    26   |    Push Button   |
| ESP32     |    27   |    Push Button   |
| ESP32     |    28   |    Push Button   |

![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/MultiSwitch_advance_tactile-button.png) 

Now let's complete sketch with push buttons and relays with Sinric Pro integration.

<script src="https://gist.github.com/kakopappa/4c23e8fa19ffe37730cb0995dc2e15a9.js"></script>
 
### Troubleshooting
Please refer to our [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page for possible solutions to your issue.


 
> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)