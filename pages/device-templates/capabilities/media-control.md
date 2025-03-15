---
title: Media Control Capability
layout: post
---

The Brightness capability in SinricPro device templates allows you to control devices that can play, stop, and navigate playback for audio or video content.

#### Supports
 - [x]  Alexa
 - [ ]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

### Alexa 

This capabiliy is mapped to Alexa interface [PlaybackController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-playbackcontroller.html)

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
    <p>Alexa, spoel vooruit op device.</p>
    <p>Alexa, volgende.</p>
    <p>Alexa, pauzeer device.</p>
    <p>Alexa, hervat device.</p>
    <p>Alexa, speel device.</p>
    <p>Alexa, vorige op device.</p>
    <p>Alexa, spoel terug op device.</p>
    <p>Alexa, start opnieuw.</p>
    <p>Alexa, stop device.</p>
</div>

<div id="alexa-ar-SA" class="tabcontent"> 
    <p>أليكسا، قدّمي على الجهاز</p>
    <p>أليكسا، اللي بعده</p>
    <p>أليكسا، وقفي</p>
    <p>أليكسا، إستمرّي</p>
    <p>أليكسا، شغّلي الجهاز</p>
    <p>أليكسا، اللي قبله على الجهاز</p>
    <p>أليكسا، رجّعي على الجهاز</p>
    <p>اليكسا، رجعي 40 ثانية</p>
    <p>أليكسا، ابدأي من البداية</p>
</div>

<div id="alexa-en-US" class="tabcontent"> 
    <p>Alexa, fast forward on device.</p>
    <p>Alexa, next.</p>
    <p>Alexa, pause device.</p>
    <p>Alexa, resume device.</p>
    <p>Alexa, play device.</p>
    <p>Alexa, previous on device.</p>
    <p>Alexa, rewind on device.</p>
    <p>Alexa, start over.</p>
    <p>Alexa, stop device.</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, avance surnom de l'appareil.</p>
    <p>Alexa, suivant€ sur nom de l'appareil.</p>
    <p>Alexa, mets sur pause.</p>
    <p>Alexa, joue sur nom de l'appareil.</p>
    <p>Alexa, précédent€.</p>
    <p>Alexa, rembobine.</p>
    <p>Alexa, recommence.</p>
    <p>Alexa, stop.</p>
</div>

<div id="alexa-de-DE" class="tabcontent"> 
    <p>Alexa, spul vor auf dem Gerät vor.</p>
    <p>Alexa, nächstes Lied/Video/Foto auf dem Gerät.</p>
    <p>Alexa, pause.</p>
    <p>Alexa, abspielen.</p>
    <p>Alexa, vorheriges.</p>
    <p>Alexa, fortsetzen.</p>
    <p>Alexa, spul zurück.</p>
    <p>Alexa, neu starten</p>
    <p>Alexa, stopp Gerät.</p>
</div>
 
<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, आगे बढ़ाओ</p>
    <p>Alexa, अगला</p>
    <p>Alexa, pause करो</p>
    <p>Alexa, चलाओ</p>
    <p>Alexa, पिछला</p>
    <p>Alexa, जारी रखो </p>
    <p>Alexa, rewind करना</p>
    <p>Alexa, फिर से चलाओ </p>
    <p>Alexa, stop करो</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, vai avanti.</p>
    <p>Alexa, metti in pausa.</p>
    <p>Alexa, riproduci.</p>
    <p>Alexa, torna indietro.</p>
    <p>Alexa, riprendi.</p>
    <p>Alexa, manda indietro.</p>
    <p>Alexa, ricomincia.</p>
    <p>Alexa, stop.</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、＜デバイス名＞を早送りにして</p>
    <p>アレクサ、＜デバイス名＞で次の曲/ビデオ/写真にして</p>
    <p>アレクサ、次</p>
    <p>アレクサ、＜デバイス名＞を止めて</p>
    <p>アレクサ、＜デバイス名＞を再開して</p>
    <p>アレクサ、＜デバイス名＞で再生して</p>
    <p>アレクサ、＜デバイス名＞を前にして</p>
    <p>アレクサ、＜デバイス名＞を巻き戻して</p>
    <p>アレクサ、＜デバイス名＞で最初から再生して</p>
    <p>アレクサ、＜デバイス名＞を止めて</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, avançar.</p>
    <p>Alexa, próximo.</p>
    <p>Alexa, pausar.</p>
    <p>Alexa, reproduzir.</p>
    <p>Alexa, anterior.</p>
    <p>Alexa, continuar.</p>
    <p>Alexa, voltar.</p>
    <p>Alexa, começar de novo.</p>
    <p>Alexa, parar.</p>
    <p>Alexa, ativa o modo de repetição contínua.</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, adelanta.</p>
    <p>Alexa, siguiente.</p>
    <p>Alexa, pausa.</p>
    <p>Alexa, pon.</p>
    <p>Alexa, anterior.</p>
    <p>Alexa, continúa.</p>
    <p>Alexa, rebobina.</p>
    <p>Alexa, empieza de nuevo.</p>
    <p>Alexa, para.</p>
</div>

### Google Home

Not Supported

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)