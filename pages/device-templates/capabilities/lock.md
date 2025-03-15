---
title: Lock Capability
layout: post
---

The Brightness capability in SinricPro device templates allows you to lock and unlock lockable devices.

#### Supports
 - [x]  Alexa
 - [x]  Google Home
 - [ ]  SmartThings
 - [x]  SinricPro Portal
 - [x]  SinricPro App

### Alexa 

This capabiliy is mapped to Alexa interface [LockController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-lockcontroller.html)

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
<p>Alexa, doe de voordeur op slot.</p>
<p>Alexa, haal de achterdeur van het slot.</p>
<p>Alexa, is mijn deur op slot?</p>
<p>Alexa, is mijn deur van het slot?</p>
</div>

<div id="alexa-en-US" class="tabcontent"> 
<p>Alexa, lock my front door.</p>
<p>Alexa, unlock the back door.</p>
<p>Alexa, is my door locked?</p>
<p>Alexa, is my door unlocked?</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
<p>Alexa, verrouille la porte d'entrée.</p>
<p>Alexa, déverrouille la porte arrière.</p>
<p>Alexa, est-ce que la porte est verrouillée?</p>
<p>Alexa, est-ce que la porte est déverrouillée?</p>
</div>

<div id="alexa-de-DE" class="tabcontent"> 
<p>Alexa, schließe meine Haustür ab.</p>
<p>Alexa, entsperre die Hintertür.</p>
<p>Alexa, ist meine Tür verschlossen?</p>
<p>Alexa, ist meine Tür aufgeschlossen?</p>
</div>
 
<div id="alexa-hi-IN" class="tabcontent"> 
<p>Alexa, मेरे सामने के दरवाजे को बंद कर दो।</p>
<p>Alexa, पिछले दरवाजे को खोलो।</p>
<p>Alexa, क्या मेरा दरवाजा बंद है?</p>
<p>Alexa, क्या मेरा दरवाजा खुला है?</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
<p>Alexa, chiudi a chiave la mia porta d'ingresso.</p>
<p>Alexa, sblocca la porta sul retro.</p>
<p>Alexa, la mia porta è chiusa a chiave?</p>
<p>Alexa, la mia porta è aperta?</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
アレクサ、玄関をロックして</p>
アレクサ、裏口を開けて</p>
アレクサ、玄関の鍵は閉まっている？</p>
アレクサ、玄関の鍵は開いている？</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
<p>Alexa, tranque minha porta da frente.</p>
<p>Alexa, destranque a porta traseira.</p>
<p>Alexa, a minha porta está trancada?</p>
<p>Alexa, a minha porta está destrancada?</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
<p>Alexa, bloquea la puerta de mi casa.</p>
<p>Alexa, desbloquea la puerta trasera.</p>
<p>Alexa, ¿mi puerta está bloqueada?</p>
<p>Alexa, ¿mi puerta está desbloqueada?</p>
</div>

### Google Home

This capability is mapped to Google Home [LockUnlock](https://developers.home.google.com/cloud-to-cloud/traits/lockunlock) trait

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
<p>Bitte Eingangstür abschließen</p>
<p>Bitte schließ die Eingangstür auf</p>
</div>

<div id="gh-en-US" class="tabcontent">
<p>lock my doors</p>
<p>unlock study room</p>
</div>

<div id="gh-es-ES" class="tabcontent">
<p>cierra la puerta con llave</p>
<p>quitar el cerrojo de la puerta de entrad a</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
<p>déverrouille la porte d'entrée</p>
<p>verrouille la porte d'entrée</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
<p>फ़्रंट डोर अनलॉक करो</p>
<p>सामने के दरवाजे को लॉक करो</p>
</div>

<div id="gh-it-IT" class="tabcontent">
<p>apri la porta d'ingresso</p>
<p>puoi chiudere la porta d'ingresso a chiave</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
<p>玄関のドア を施錠して</p>
<p>玄関 開錠して</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
<p>도어락 잠가 줘</p>
<p>현관 도어락 열어 줄래</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
<p>Ontgrendel de voordeur</p>
<p>doe de voordeur op slot</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
<p>Tranca a porta do quarto .</p>
<p>destranca a porta da cozinha</p>
<p>destrancar a porta da frente</p>
<p>trancar a porta da frente</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
<p>lås upp ytterdörren</p>
<p>lås ytterdörren</p>
</div>


> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)