---
title: Open-Close Capability
layout: post
---

The Open-Close capability in SinricPro device templates supports devices that can open and close, including those with partial positioning or multi-directional movement functionality. For example, some blinds may open either to the left or to the right.

![Sinric Pro Device Template Start Stop]({{ site.github.url }}/public/img/device-templates-open-close.png)


#### Supports

- [ ] Alexa
- [x] Google Home
- [ ] SmartThings
- [x] SinricPro Portal
- [x] SinricPro App

### Alexa

Not Supported 

### Google Home

This capability is mapped to Google Home [OpenClose](https://developers.home.google.com/cloud-to-cloud/traits/openclose) trait

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
<p>Bitte öffne die Jalousien auf 30%</p>
<p>Fensterläden um 25 % schliessen</p>
<p>Ist die Jalousie zu?</p>
<p>Mach den Rollladen zu</p>
<p>Mach die Rollos auf</p>
<p>schließe die Rollläden ein bisschen mehr</p>
<p>Öffne die Jalousien um 25%</p>
</div>

<div id="gh-en-US" class="tabcontent">
<p>Are the blinds in the kitchen open</p>
<p>Close the blinds 25% in my room</p>
<p>Close the door more</p>
<p>Just close the front door</p>
<p>open the blinds in my room</p>
<p>open the blinds to 25%</p>
<p>open the door by 25%</p>
</div>

<div id="gh-es-ES" class="tabcontent">
<p>abre la ventana del salón</p>
<p>cerrar persianas del dormitorio un 20%</p>
<p>cierra la cortina del salón</p>
<p>cierra mucho más la ventana</p>
<p>está abierta la puerta</p>
<p>quiero que subas la persiana al 25%</p>
<p>sube un 20% las persianas</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
<p>baisse les stores de 10%</p>
<p>est-ce que la porte d'entrée est ouverte</p>
<p>ferme les stores</p>
<p>ferme un peu les stores</p>
<p>ouvre les stores</p>
<p>ouvre les stores de la chambre de 25%</p>
<p>ouvre les stores à 25%</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
<p>कृपया 25% पर्दे को खुला रखो</p>
<p>क्या मैंने सामने वाला दरवाजा खुला छोड दिया?</p>
<p>पर्दे को 25% बंद करोगे</p>
<p>पर्दे खोलो</p>
<p>ब्लाइंड 25% खुले पर सेट कर दीजिए</p>
<p>ब्लाइंड को थोड़ा और बंद कर दिजिए</p>
<p>ब्लाइंड बंद करें</p>
</div>

<div id="gh-it-IT" class="tabcontent">
<p>abbassa un po' di più le tapparelle</p>
<p>apri la serranda</p>
<p>apri la tapparella al 30%</p>
<p>apri le serrande del 30%</p>
<p>chiudi le serrande</p>
<p>chiudi le tende del 25%</p>
<p>è aperta la porta d'ingresso</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
<p>25% に ブラインド を開けて</p>
<p>25% ブラインド を閉めてください</p>
<p>25% ブラインド 開けて</p>
<p>ブラインド 閉めて</p>
<p>ブラインド 開けて</p>
<p>少し ブラインド を閉じて</p>
<p>玄関のドア は開いてますか</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
<p>문 살짝만 닫아 줘</p>
<p>블라인드 25% 열어 줘</p>
<p>블라인드 25% 까지 열어 줘</p>
<p>블라인드 30프로 닫아</p>
<p>블라인드 닫아 줘</p>
<p>블라인드 열어 줘</p>
<p>안방 문 열렸어</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
<p>doe de gordijnen 25% open</p>
<p>doe de jaloezieën voor 25% dicht</p>
<p>doe het raam ietsje meer dicht</p>
<p>is de voordeur open</p>
<p>open de gordijnen</p>
<p>sluit het gordijn</p>
<p>zet de luxaflex voor 50% open</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
<p>Abrir janela 50%</p>
<p>As cortinas estão abertas?</p>
<p>Fecha a persiana toda</p>
<p>Fechar a janela 10%</p>
<p>a cortina do quarto está aberta?</p>
<p>abra a persiana até 30%</p>
<p>abre as cortinas</p>
<p>abre as cortinas a 50%</p>
<p>abrir as cortinas</p>
<p>abrir as cortinas na sala em 30%</p>
<p>fecha a persiana por favor</p>
<p>fecha um bocado a janela</p>
<p>fechar as cortinas em 25%</p>
<p>fechar um pouco mais as cortinas</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
<p>Dra upp persiennerna</p>
<p>Dra upp persiennerna till 25%</p>
<p>stäng persiennen i mitt rum 25%</p>
<p>stäng persiennerna</p>
<p>är ytterdörren öppen?</p>
<p>öppna persiennerna med 25%</p>
</div>

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)