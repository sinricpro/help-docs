---
title: Color Capability
layout: post
---

The Color capability in SinricPro device templates provides dynamic control over the hue and saturation of compatible smart devices. This feature enables users to transform their environment by adjusting RGB values of color-changing light bulbs, LED strips, and other chromatic lighting fixtures to create personalized atmospheres for any occasion.

#### Supports
 - [x]  Alexa
 - [x]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

### Alexa 

This capabiliy is mapped to Alexa interface [ColorController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-colorcontroller.html)

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
    <p>Alexa, zet het licht op de veranda op blauw.</p>
    <p>Alexa, verander de keuken naar de kleur blauw.</p>
</div>

<div id="alexa-en-US" class="tabcontent"> 
    <p>Alexa, set the front porch light to blue.</p> 
    <p>Alexa, change the kitchen to the color blue.</p> 
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, règle la lumière du vestibule en bleu.</p>
    <p>Alexa, mets la cuisine en bleu.</p>    
</div>

<div id="alexa-de-DE" class="tabcontent"> 
   <p>Alexa, schalte das Wohnzimmerlicht hellblau.</p>
</div>

<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, फ्रंट पोर्च लाइट को ब्लू पर सेट करें।</p>
    <p>Alexa, किचन को नीले रंग में बदलें।</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, imposta la luce del portico anteriore su blu.</p>
    <p>Alexa, cambia la cucina con il colore blu.</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、寝室のライトを青にして</p>
    <p>アレクサ、キッチンをオレンジ色に変えて</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, coloque a luz da entrada em azul.</p>
    <p>Alexa, mude luz da entrada para azul.</p>
    <p>Alexa, coloque a luz da cozinha em vermelho.</p>
    <p>Alexa, mude luz da cozinha para vermelho.</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, pon la luz del porche delantero en azul.</p>
    <p>Alexa, cambia la cocina al color azul.</p>
</div>

### Google Home

This capability is mapped to Google Home [ColorSetting](https://developers.home.google.com/cloud-to-cloud/traits/colorsetting) trait

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
    <p>Stell die Farbe der Lampe auf blau</p>
    <p>Stelle die Farbtemperatur auf 3000 Kelvin ein.</p>
</div>

<div id="gh-en-US" class="tabcontent">
    <p>can you adjust my lights color to 4000 kelvins</p>
    <p>set the lights to blue</p>  
</div>

<div id="gh-es-ES" class="tabcontent">
    <p>pon azul la luz de la cocina</p>
    <p>pon la luz a 2000 k de temperatura de color</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
    <p>Allume la lampe de la chambre à 3500 kelvins.</p>
    <p>mets les lampes en rose dans la chambre</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
    <p>तुम लाइट को ब्लू कर दो</p>
    <p>लैम्प 2000 केल्विन पर लगाओ।</p>
</div>

<div id="gh-it-IT" class="tabcontent">
    <p>Imposta la lampada a 2000 K .</p>
    <p>metti la luce gialla</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
    <p>照明 の色を 青 にして</p>
    <p>照明 の色温度を 5000K にセットして</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
    <p>조명 색깔 흰색 으로 바꿔 줘</p>
    <p>주방 전등 색 온도를 5000 켈빈 으로 설정해</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
    <p>Zet de keukenlamp op 2000 Kelvin .</p>
    <p>maak het licht rood</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
    <p>Colocar a lâmpada em 2000 K .</p>
    <p>Define a lâmpada para 2000 K .</p>
    <p>colocar a luz da sala em azul</p>
    <p>põe a luz da sala a vermelho</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
    <p>Ställ in lampan på 2000 Kelvin</p>
    <p>tänd blått ljus i köket</p>
</div>

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)