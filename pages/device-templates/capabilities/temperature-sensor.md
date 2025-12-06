---
title: Temperature Sensor Capability
layout: post
---


The Temperature Sensor capability in SinricPro device templates allows devices to detect and report the current temperature, such as in temperature sensors and thermostats.

#### Supports
 - [x]  Alexa
 - [ ]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

### Alexa 

This capabiliy is mapped to Alexa interface [TemperatureSensor](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-temperaturesensor.html) and
[HumiditySensor](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-humiditysensor.html)

#### Utterances

<!-- Alexa Language Tabs -->
<div class="tab">
  <button class="tablinks active" onclick="openLanguage(event, 'alexa-nl-NL')">Dutch</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-ar-SA')">Arabic</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-en-US')">English (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-fr-FR')">French (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-de-DE')">German</button>  
  <button class="tablinks" onclick="openLanguage(event, 'alexa-hi-IN')">Hindi</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-it-IT')">Italian</button>  
  <button class="tablinks" onclick="openLanguage(event, 'alexa-ja-JP')">Japanese</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-pt-BR')">Portuguese</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-es-ES')">Spanish (All)</button>
</div>

<div id="alexa-nl-NL" class="tabcontent" style="display: block;"> 
    <p>Not Supported</p>
</div>

<div id="alexa-ar-SA" class="tabcontent"> 
    <p>أليكسا، ما هي درجة الحرارة في [اسم المستشعر أو الموقع]</p>
    <p>أليكسا، ما هي درجة الحرارة في غرفة المعيشة؟</p>
</div>


<div id="alexa-en-US" class="tabcontent"> 
    <p>Alexa, what's the temperature of the [sensor name or location]</p>
    <p>Alexa, what's the temperature the living room?</p>
    <p>Alexa, what's the humidity in the [room name]?</p>
    <p>Alexa, what's the humidity at the [sensor name]?</p>
    <p>Alexa, what's the humidity in the [group name]?</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, quelle est la température du [nom du capteur ou emplacement]</p>
    <p>Alexa, quelle est la température du salon?</p>
</div>

<div id="alexa-de-DE" class="tabcontent"> 
    <p>Alexa, wie ist die Temperatur von [Sensorname oder Standort]</p>
    <p>Alexa, wie ist die Temperatur im Wohnzimmer?</p>
</div>
 
<div id="alexa-hi-IN" class="tabcontent"> 
    <p>एलेक्सा, [सेंसर का नाम या स्थान] का तापमान क्या है</p>
    <p>एलेक्सा, लिविंग रूम का तापमान क्या है?</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, qual è la temperatura del [nome del sensore o posizione]</p>
    <p>Alexa, qual è la temperatura del soggiorno?</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、[センサー名または場所]の温度はいくらですか</p>
    <p>アレクサ、リビングルームの温度はいくらですか？</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, qual é a temperatura do [nome do sensor ou localização]</p>
    <p>Alexa, qual é a temperatura da sala de estar?</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, ¿cuál es la temperatura del [nombre del sensor o ubicación]</p>
    <p>Alexa, ¿cuál es la temperatura de la sala de estar?</p>
</div>

### Google Home

Not Supported

### Tutorials

- ##### [DHT11 and DHT22, AM2302, RHT03]({{ site.github.url }}/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.html)

- ##### [DS18B20 and DS1822, DS1820, MAX31820, MAX31850]({{ site.github.url }}/pages/tutorials/temperature-sensors/DS18B20.html)

- ##### [LM35 (LM35DZ), LM335 and LM34]({{ site.github.url }}/pages/tutorials/temperature-sensors/LMx.html)

- ##### [BME280]({{ site.github.url }}/pages/tutorials/temperature-sensors/BME280.html)

- ##### [BMP180]({{ site.github.url }}/pages/tutorials/temperature-sensors/BMP180.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)