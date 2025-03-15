---
title: Power Capability
layout: post
---


The Power capability in SinricPro device templates allows you to control and monitor the power state of smart devices. With this capability, users can turn devices on or off through voice commands using popular voice assistants.

#### Supports
 - [x]  Alexa
 - [x]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

### Alexa 

This capabiliy is mapped to Alexa interface [PowerController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-powercontroller.html)

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
    <p>Alexa, turn on the vacuum.</p>
    <p>Alexa, turn off the lights.</p> 
</div>

<div id="alexa-de-DE" class="tabcontent"> 
    <p>Alexa, Staubsauger einschalten.</p>
    <p>Alexa, schalte das Licht aus.</p>
</div>

<div id="alexa-nl-NL" class="tabcontent" style="display: block;"> 
    <p>Alexa, zet de stofzuiger aan.</p>
    <p>Alexa, zet de lampen uit.</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, allume l'aspirateur.</p>
    <p>Alexa, éteins les lumières.</p>
</div>

<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, वैक्यूम चालू करें।</p>
    <p>Alexa, लाइट बंद कर दो।</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, accendi l'aspirapolvere.</p>
    <p>Alexa, spegni le luci.</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、＜device name＞をつけて</p>
    <p>アレクサ、＜device name＞を消して</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, ligue o aspirador.</p>
    <p>Alexa, apague as luzes.</p>
    <p>Alexa, desligue as luzes.</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, enciende la aspiradora.</p>
    <p>Alexa, apaga las luces.</p>
</div>

### Google Home

This capability is mapped to Google Home [OnOff](https://developers.home.google.com/cloud-to-cloud/traits/onoff) trait

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
    <p>Bitte Licht aus</p>
    <p>Bitte das Wohnzimmer einschalten</p>
    <p>Bitte die Küche ausstellen</p>
    <p>Ist der Staubsauger an</p>
    <p>Ist in der Küche noch was an</p>
    <p>Lampen an</p>
</div>

<div id="gh-en-US" class="tabcontent">
    <p>Turn off the AC</p>
    <p>Turn on my lights</p>
    <p>Are the lights off</p>
    <p>What is on in the kitchen?</p>  
</div>

<div id="gh-es-ES" class="tabcontent">
    <p>enciende el robot de limpieza</p>
    <p>enciéndeme el salón</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
    <p>Tu peux éteindre le salon ?</p>
    <p>allume la chambre</p>
    <p>allume les lumières</p>
    <p>est-ce que la lumière de la cuisine est éteinte</p>
    <p>qu'est-ce qui est allumé dans la cuisine</p>
    <p>éteins les lumières</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
    <p>किचन को ऑन करो</p>
    <p>किचन में कुछ ऑन है?</p>
    <p>बत्तियाँ जला दें</p>
    <p>बालकनी ऑफ कर दो</p>
    <p>लाइट आन है क्या</p>
    <p>लाइट ऑफ करो</p>
</div>

<div id="gh-it-IT" class="tabcontent">
    <p>Accendimi la luce in cucina</p>
    <p>Ho spento la luce in bagno ?</p>
    <p>accendere in cucina</p>
    <p>ho lasciato il bagno acceso?</p>
    <p>spegni la luce della camera</p>
    <p>spengi camera bimbi</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
    <p>エアコン はついてる</p>
    <p>キッチン で何がオンになっていますか</p>
    <p>ベッドルーム をつけて</p>
    <p>リビング をオフにして</p>
    <p>照明 をオンにして</p>
    <p>照明 を消して</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
    <p>거실 꺼 줘</p>
    <p>거실 에어컨 전원 켜</p>
    <p>거실 켜 줘</p>
    <p>불 켜져 있어</p>
    <p>에어컨 전원 꺼 줘</p>
    <p>주방 에 뭐 켜져 있어</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
    <p>babykamer aandoen</p>
    <p>doe het licht aan</p>
    <p>doe het licht uit</p>
    <p>staat de droger aan</p>
    <p>staat er iets aan in de keuken</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
    <p>Acender a luz.</p>
    <p>Apagar a luz.</p>
    <p>a sala está apagada?</p>
    <p>acender a sala</p>
    <p>eu apaguei luz do quarto?</p>
    <p>quero desligar o quarto</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
    <p>stäng av lampan</p>
    <p>sätt på ljuset</p>
    <p>vad är på i badrummet</p>
    <p>Är badrumslampan på?</p>
</div>


 
### Tutorials
- ##### [Part 1 - How to turn on and off a Relay]({{ site.github.url }}/pages/tutorials/switch/part-1.html)

- ##### [Part 2 - Add a push button to toggle the Relay]({{ site.github.url }}/pages/tutorials/switch/part-2.html)

- ##### [Part 3 - Multiple relays with multiple tactile (push) buttons]({{ site.github.url }}/pages/tutorials/switch/part-3.html)
 
 > This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)