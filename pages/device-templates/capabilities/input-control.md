---
title: Input Control Capability
layout: post
---

The Input Control capability in SinricPro device templates allows you to control the input of an entertainment device..

#### Supports
 - [x]  Alexa
 - [ ]  Google Home
 - [x]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

### Alexa 

This capabiliy is mapped to Alexa interface [InputController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-inputcontroller.html)

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

<div id="alexa-nl-NL" class="tabcontent" style="display: block;"> 
    <p>Alexa, verander de input van de woonkamertv naar dvd.</p>
    <p>Alexa, switch naar HDMI twee op de woonkamertv.</p>
    <p>Alexa, switch naar AnyCompany TV op de keukentv.</p>
</div>

<div id="alexa-en-US" class="tabcontent"> 
    <p>Alexa, change the input to DVD on the Living Room TV.</p> 
    <p>Alexa, switch to HDMI two on the Living Room TV.</p> 
    <p>Alexa, switch to AnyCompany TV on the Kitchen TV.</p> 
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, change le port d'entrée sur DVD dans le salon.</p>
    <p>Alexa, change la télé du salon à HDMI 2.</p>
    <p>Alexa, change à France 2 sur la télé.</p>
</div>

<div id="alexa-de-DE" class="tabcontent"> 
    <p>Alexa, ändere den Eingang am Fernseher im Wohnzimmer auf DVD.</p>
    <p>Alexa, schalte auf dem Fernseher im Wohnzimmer auf HDMI zwei um.</p>
    <p>Alexa, wechsle auf dem Küchenfernseher zu Arte.</p>
</div>
 
<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, लिविंग रूम टीवी पर इनपुट को DVD में बदलें।</p>
    <p>Alexa, लिविंग रूम टीवी पर HDMI दो पर स्विच करें</p>
    <p>Alexa, किचन टीवी पर AnyCompany TV पर स्विच करें।</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, cambia l'ingresso in DVD sulla TV del soggiorno.</p>
    <p>Alexa, passa a HDMI due sulla TV del soggiorno.</p>
    <p>Alexa, passa a Rai 1 sulla TV.</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、リビングのテレビの入力をDVDに変えて</p>
    <p>アレクサ、リビングのテレビの入力をHDMI2に切り替えて</p>
    <p>アレクサ、キッチンのテレビをNHKに切り替えて</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, mude a entrada para DVD na TV da sala de estar.</p>
    <p>Alexa, mude a entrada para HDMI dois na TV da sala de estar.</p>
    <p>Alexa, mude para Band na TV da cozinha.</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, cambia la entrada a DVD en el televisor de la sala.</p>
    <p>Alexa, cambia a HDMI dos en el televisor de la sala.</p>
    <p>Alexa, cambia a Discovery en la tele de la cocina.</p>
</div>

### Google Home

This capability is mapped to Google Home [InputSelector](https://developers.home.google.com/cloud-to-cloud/traits/inputselector) trait

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
    <p>Ändere den Eingangskanal auf AUX .</p>
</div>

<div id="gh-en-US" class="tabcontent">
    <p>change input mode to HDMI 1</p>  
</div>

<div id="gh-es-ES" class="tabcontent">
    <p>cambia a hdmi 1</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
    <p>Activation du mode HDMI1 .</p>
    <p>Mets la télé sur HDMI 1 .</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
    <p>टीवी की इनपुट HDMI 1 में स्विच करो</p>
</div>

<div id="gh-it-IT" class="tabcontent">
    <p>metti ingresso aux sulla tv</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
    <p>テレビ HDMI1 にして</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
    <p>TV HDMI 1 로 바꿔 줘</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
    <p>zet de TV op bluetooth</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
    <p>Muda a entrada da TV para HDMI2 .</p>
    <p>mudar a entrada para AUX</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
    <p>Sätt på hdmi 1</p>
</div>
 