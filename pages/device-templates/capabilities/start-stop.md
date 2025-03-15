---
title: Start-Stop Capability
layout: post
---

The Start-Stop capability in SinricPro device templates allows devices to start and stop operations. While similar to power on/off functionality, this capability addresses more complex operational states. For example, some washing machines can be powered on before actually starting their wash cycle.

Beyond simple starting and stopping, this capability can include pausing functionality, where a device temporarily halts operation while maintaining its current state. When resumed, the device continues from where it paused, unlike starting/restarting which begins operation from the beginning regardless of previous state.

![Sinric Pro Device Template Start Stop]({{ site.github.url }}/public/img/device-templates-start-stop-pause.png)


#### Supports

- [ ] Alexa
- [x] Google Home
- [ ] SmartThings
- [x] SinricPro Portal
- [x] SinricPro App

### Alexa

Not Supported 

### Google Home

This capability is mapped to Google Home [StartStop](https://developers.home.google.com/cloud-to-cloud/traits/startstop) trait

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
<p>Bitte starte den Staubsauger im Wohnzimmer .</p>
<p>Geschirrspüler wieder anstellen</p>
<p>Staubsauger abschalten</p>
<p>Staubsauger pausieren</p>
<p>bitte starte die Waschmaschine</p>
<p>ist die Waschmaschine fertig</p>
</div>

<div id="gh-en-US" class="tabcontent">
<p>I need my roomba to start running in the den</p>
<p>is the vacuum running</p>
<p>pause the dryer now</p>
<p>start the dryer now</p>
<p>stop the dishwasher</p>
<p>unpause the dishwasher</p>
</div>

<div id="gh-es-ES" class="tabcontent">
<p>dime si ha acabado el lavavajillas</p>
<p>parar la lavadora</p>
<p>pon el lavavajillas en pausa</p>
<p>quiero usar el friegaplatos</p>
<p>vuelve a encender la aspiradora</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
<p>Allumer l'aspirateur dans le salon .</p>
<p>Continuer l'aspirateur .</p>
<p>arrête l'aspirateur</p>
<p>est-ce que l'aspirateur est en marche</p>
<p>lance la machine à laver</p>
<p>mets l'aspirateur en pause</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
<p>कमरे में वैक्यूम चलाओगी</p>
<p>क्या वैक्यूम चल रहा है?</p>
<p>डिशवॉशर को कुछ देर रोको</p>
<p>वैक्यूम को अनपॉज़ करो</p>
<p>वैक्यूम को चालू कर दो</p>
<p>वैक्यूम को बंद कर दो</p>
</div>

<div id="gh-it-IT" class="tabcontent">
<p>Mi accendi l'aspirapolvere in cucina ?</p>
<p>fa' partire aspirapolvere</p>
<p>fai ripartire l'aspirapolvere</p>
<p>la lavatrice è in funzione</p>
<p>metti in pausa l'aspirapolvere</p>
<p>stoppa l'aspirapolvere</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
<p>お掃除ロボット を リビング で動かして</p>
<p>台所の食洗機 を一時停止してください</p>
<p>掃除機 は作動してる</p>
<p>掃除機 を停止して</p>
<p>掃除機 を再開してください</p>
<p>洗濯機 をスタートさせて</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
<p>거실 에서 청소기 돌려</p>
<p>건조기 돌아가고 있나</p>
<p>세탁기 좀 돌려 줘</p>
<p>식기 세척기 다시 시작해</p>
<p>청소기 일시 정지</p>
<p>청소기 작동 멈춰 줘</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
<p>De schoonmaakrobot inschakelen in de keuken .</p>
<p>Is de stofzuiger klaar</p>
<p>hervat de stofzuiger</p>
<p>pauzeer de stofzuiger</p>
<p>start mijn stofzuiger</p>
<p>stop de stofzuiger</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
<p>Inicia o aspersor no jardim</p>
<p>Iniciar o aspirador de pó na sala .</p>
<p>iniciar a máquina de lavar</p>
<p>o aspirador está parado?</p>
<p>parar a pausa na máquina de lavar roupa</p>
<p>parar o aspirador de pó</p>
<p>pausar o aspirador de pó</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
<p>Kör igång sprinklern på gräsmattan .</p>
<p>har dammsugaren i vardagsrummet startat?</p>
<p>kör igång dammsugaren igen</p>
<p>pausa dammsugaren</p>
<p>starta tvättmaskinen</p>
<p>stoppa dammsugaren</p>
</div>


> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)