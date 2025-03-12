---
title: Range Capability
layout: post
---

The Range capability in SinricPro device templates allows you to control a setting of your device that can be represented by numbers within a minimum and maximum range. eg: speed setting on a fan.

#### Supports
 - [x]  Alexa
 - [ ]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

#### When to Use RangeController?

- When a device has a defined numerical range instead of fixed modes.
- If the control isn't best suited to percentages (e.g., temperature, fan speeds with specific levels).


![Sinric Pro device capabilities]({{ site.github.url }}/public/img/device-templates-range.png)

* **InstanceId**: You can leave it as it is. We use InstanceId to uniquely identify a mode when you add multiple modes

* **Minimum Value**: The minimum value for the range.

* **Maximum Value**: The maximum value for the range.

* **Precision**: The amount by which the values change when moving through the range. This also serves as the default when a user asks to change the value but doesn't specify by how much.

* **Unit Of Measure**: The unit of measure for the range.

* **Locale**: Choose your language 

* **Range Name**: Name of the mode. eg: Speed

* **Non Controllable**: The device can only be queried and cannot be controlled through commands.

* **Presets:** : Named options that users can specify instead of numbers, such as "medium" = 50 or "maximum" = 100 ect.


### Alexa 

This capabiliy is mapped to Alexa interface [RangeController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-rangecontroller.html)

#### Utterances

<!-- Alexa Language Tabs -->
<div class="tab">
  <button class="tablinks active" onclick="openLanguage(event, 'alexa-nl-NL')">Dutch</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-en-US')">English (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-fr-FR')">French (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-de-DE')">German</button>  
  <button class="tablinks" onclick="openLanguage(event, 'alexa-hi-IN')">Hindi</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-it-IT')">Italian</button>  
  <button class="tablinks" onclick="openLanguage(event, 'alexa-ja-JP')">Japanese</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-pt-BR')">Portuguese</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-es-ES')">Spanish (All)</button>
</div>

<div id="alexa-en-US" class="tabcontent"> 
    <p>Alexa, set the bedroom fan speed to 7.</p> 
    <p>Alexa, set the fan speed on the bedroom fan to maximum.</p> 
    <p>Alexa, turn up the bedroom fan speed.</p> 
    <p>Alexa, decrease the fan speed on the bedroom fan by 3.</p> 
    <p>Alexa, what's the bedroom fan speed?</p> 
</div>

<div id="alexa-de-DE" class="tabcontent"> 
    <p>Alexa, stelle die Lüftergeschwindigkeit im Schlafzimmer auf 7.</p>
    <p>Alexa, stelle die Lüftergeschwindigkeit auf dem Schlafzimmerventilator auf maximum.</p>
    <p>Alexa, erhöhe die Geschwindigkeit des Schlafzimmerlüfters.</p>
    <p>Alexa, verringere die Lüftergeschwindigkeit auf Schlafzimmerlüfter um drei.</p>
    <p>Alexa, was ist die Lüftergeschwindigkeit im Schlafzimmer?</p>
</div>

<div id="alexa-nl-NL" class="tabcontent" style="display: block;"> 
    <p>Alexa, zet de ventilator in de slaapkamer op snelheid 7.</p>
    <p>Alexa, zet de ventilator in de slaapkamer op maximale snelheid.</p>
    <p>Alexa, verhoog de snelheid van de ventilator in de slaapkamer.</p>
    <p>Alexa, verlaag de snelheid van de ventilator in de slaapkamer met 3.</p>
    <p>Alexa, wat is de snelheid van de ventilator in de slaapkamer?</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p></p>
</div>

<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, बेडरूम के पंखे की गति 7 पर सेट करें</p>
    <p>Alexa, बेडरूम के पंखे पर पंखे की गति को अधिकतम पर सेट करें</p>
    <p>Alexa, bedroom के पंखे की गति बढ़ाओ।</p>
    <p>Alexa,बेडरूम के पंखे पर पंखे की गति 3 कम करें</p>
    <p>Alexa,बेडरूम के पंखे की गति क्या है?</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, imposta la velocità della ventola della camera da letto su 7.</p>
    <p>Alexa, imposta al massimo la velocità della ventola della camera da letto.</p>
    <p>Alexa, aumenta la velocità della ventola della camera da letto.</p>
    <p>Alexa, riduci di 3 la velocità della ventola della camera da letto.</p>
    <p>Alexa, qual è la velocità della ventola della camera da letto?</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、扇風機の風量を7にして</p>
    <p>アレクサ、扇風機の風量を最大にして</p>
    <p>アレクサ、扇風機の風量を上げて</p>
    <p>アレクサ、扇風機の風量を3弱めて</p>
    <p>アレクサ、扇風機の風量は？</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, mude a velocidade do ventilador do quarto para 7.</p>
    <p>Alexa, coloque a velocidade do ventilador do quarto ao máximo.</p>
    <p>Alexa, aumente a velocidade do ventilador do quarto.</p>
    <p>Alexa, diminua a velocidade do ventilador do quarto em 3.</p>
    <p>Alexa, qual é a velocidade do ventilador do quarto?</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, pon la velocidad del ventilador del dormitorio en 7.</p>
    <p>Alexa, pon la velocidad del ventilador del dormitorio al máximo.</p>
    <p>Alexa, sube la velocidad del ventilador del dormitorio.</p>
    <p>Alexa, reduce la velocidad del ventilador del dormitorio en 3.</p>
    <p>Alexa, reduce la velocidad del ventilador del dormitorio a 3.</p>
    <p>Alexa, ¿cuál es la velocidad del ventilador del dormitorio?</p>
</div>

### Google Home

Not supported. You may be able to use OpenClose as an alternative.