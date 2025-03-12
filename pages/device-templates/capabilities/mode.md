---
title: Mode Capability
layout: post
---

The Mode capability in SinricPro device templates allows you to control the mode settings of your device where a device can operate in different predefined modes instead of just ON/OFF states. 

For example, you can use Mode capability for:

- Fan speed settings (low, medium, high)
- Air conditioner modes (cool, heat, fan-only, auto)
- Washing machine modes (delicate, normal, heavy-duty)
- Smart light modes (reading, night, party)

Each mode has multiple possible settings, but only one can be selected at a time; eg: a dryer cannot be in "delicate," "normal," and "heavy duty" mode simultaneously

#### Supports
 - [x]  Alexa
 - [x]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/device-templates-modes.png)

* **InstanceId**: You can leave it as it is. We use InstanceId to uniquely identify a mode when you add multiple modes

* **Locale**: Choose your language 

* **Mode name**: Name of the mode. eg: Speed

* **Non Controllable**: The device can only be queried and cannot be controlled through commands.

* **Modes**: List of values for mode. eg: low, medium, high

### Alexa 

This capabiliy is mapped to Alexa interface [ModeController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-modecontroller.html)

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
    <p>Alexa, what's the wash setting on the washer?</p>
    <p>Alexa, set the wash cycle to cottons.</p>
    <p>Alexa, set the wash setting on the washer to normal.</p>
    <p>Alexa, increase the water temperature on the washer.</p>
    <p>Alexa, what's the current washer cycle?</p>
</div>

<div id="alexa-de-DE" class="tabcontent"> 
    <p>Alexa, welche Wascheinstellung ist auf der Waschmaschine?</p>
    <p>Alexa, stelle den Waschgang auf Baumwolle.</p>
    <p>Alexa, stelle die Wascheinstellung auf der Waschmaschine auf normal.</p>
    <p>Alexa, erhöhe die Wassertemperatur auf der Waschmaschine.</p>
</div>

<div id="alexa-nl-NL" class="tabcontent" style="display: block;"> 
    <p>Not Supported.</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, quel est le mode de lavage sur le lave-linge?</p>
    <p>Alexa, règle le lave-linge en mode coton.</p>
    <p>Alexa, règle les paramètres de lavage du lave-linge sur normal.</p>
    <p>Alexa, augmente la température de l'eau du lave-linge.</p>
</div>

<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, वॉशर पर वॉश सेटिंग क्या है?</p>
    <p>Alexa, वॉश साइकिल को कॉटन पर सेट करें।</p>
    <p>Alexa, वॉशर पर वॉश सेटिंग को सामान्य पर सेट करें।</p>
    <p>Alexa, वॉशर पर पानी का तापमान बढ़ाएं।</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, qual è l'impostazione di lavaggio della lavatrice?</p>
    <p>Alexa, imposta il ciclo di lavaggio su cotone.</p>
    <p>Alexa, imposta l'impostazione di lavaggio sulla lavatrice su normale.</p>
    <p>Alexa, aumenta la temperatura dell'acqua della lavatrice.</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、扇風機は何に設定されている？</p>
    <p>アレクサ、洗濯機をデリケートモードにして</p>
    <p>アレクサ、洗濯モードをドライに設定して</p>
    <p>アレクサ、洗濯機の水位を上げて</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, qual é o modo de lavagem na lavadora?</p>
    <p>Alexa, qual é o ajuste de lavagem na lavadora?</p>
    <p>Alexa, mude o ciclo de lavagem para algodão.</p>
    <p>Alexa, ajuste o ciclo de lavagem para algodão.</p>
    <p>Alexa, mude o modo de lavagem na lavadora para normal.</p>
    <p>Alexa, coloque o modo de lavagem na lavadora para normal.</p>
    <p>Alexa, aumente a temperatura da água na lavadora.</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, ¿cuál es la configuración de la lavadora?</p>
    <p>Alexa, configura el modo algodón en la lavadora.</p>
    <p>Alexa, pon la configuración de la lavadora en normal.</p>
    <p>Alexa, aumenta la temperatura en la lavadora.</p>
</div>

### Google Home

This capability is mapped to Google Home [modes](https://developers.home.google.com/cloud-to-cloud/traits/modes) trait

#### Utterances

<!-- Google Home Language Tabs -->
<div class="tab">
  <button class="tablinks active" onclick="openLanguage(event, 'gh-nl-NL')">Dutch</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-en-US')">English (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-fr-FR')">French (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-de-DE')">German</button>  
  <button class="tablinks" onclick="openLanguage(event, 'gh-hi-IN')">Hindi</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-it-IT')">Italian</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-ja-JP')">Japanese</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-ko-KR')">Korean</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-pt-BR')">Portuguese</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-es-ES')">Spanish (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'gh-sv-SE')">Swedish</button>
</div>

<div id="gh-de-DE" class="tabcontent"> 
    <p>Stelle den Staubsauger auf Ruhemodus</p>
</div>

<div id="gh-en-US" class="tabcontent">
    <p>set the vacuum to energy saver mode</p>  
</div>

<div id="gh-es-ES" class="tabcontent">
    <p>pon la lavadora en modo frío</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
    <p>mets l'aspirateur en silencieux</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
    <p>वैक्यूम पर कार्पेट मोड लगाएं</p>
</div>

<div id="gh-it-IT" class="tabcontent">
    <p>imposta l'aspirapolvere su silenzioso</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
    <p>掃除機 を 静音 モードに設定して</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
    <p>세탁기 세탁량 많음 으로 설정해</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
    <p>Not Supported</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
    <p>acionar a função autolimpeza do aspirador
    <p>ligar o modo de aquecimento</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
    <p>Not Supported</p>
</div>


 