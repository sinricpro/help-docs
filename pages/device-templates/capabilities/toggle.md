---
title: Toggle Capability
layout: post
---

The Toggle capability in SinricPro device templates lets you control binary settings that have exactly two possible states. These settings often represent physical on/off buttons or active/inactive functionality. For settings with more than two possible states, or those that can exist in a neutral state where neither binary option applies, the Modes trait provides a more appropriate representation.

#### Supports

- [x] Alexa
- [x] Google Home
- [ ] SmartThings
- [x] SinricPro Portal
- [x] SinricPro App

### Alexa

This capabiliy is mapped to Alexa interface [ToggleController](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-togglecontroller.html)

#### Utterances

<!-- Alexa Language Tabs -->
<div class="tab">
  <button class="tablinks active" onclick="openLanguage(event, 'alexa-nl-NL')">Dutch</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-en-US')">English (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-ar-SA')">Arabic</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-fr-FR')">French (All)</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-de-DE')">German</button>  
  <button class="tablinks" onclick="openLanguage(event, 'alexa-hi-IN')">Hindi</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-it-IT')">Italian</button>  
  <button class="tablinks" onclick="openLanguage(event, 'alexa-ja-JP')">Japanese</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-pt-BR')">Portuguese</button>
  <button class="tablinks" onclick="openLanguage(event, 'alexa-es-ES')">Spanish (All)</button>
</div>

<div id="alexa-nl-NL" class="tabcontent" style="display: block;"> 
    <p>Alexa, zet de ijsmachine aan.</p>
    <p>Alexa, eco modus uitschakelen.</p>
    <p>Alexa, staat oscilleren aan voor de torenventilator?</p>
    <p>Alexa, zet WiFi op het Gastnetwerk aan.</p>
    <p>Alexa, zet het Gastnetwerk aan.</p>
    <p>Alexa, zet WiFi op het Gastnetwerk uit.</p>
    <p>Alexa, zet het Gastnetwerk uit.</p>
    <p>Alexa, staat WiFi op het Gastnetwerk aan?</p>
    <p>Alexa, staat het Gastnetwerk aan?</p>
</div>

<div id="alexa-ar-SA" class="tabcontent"> 
    <p>-</p>
</div>

<div id="alexa-en-US" class="tabcontent" > 
    <p>Alexa, turn on the ice maker.</p>
    <p>Alexa, turn off eco mode.</p>
    <p>Alexa, is oscillate on for the tower fan?</p>
    <p>Alexa, turn on guest Wi-Fi.</p>
    <p>Alexa, turn on guest network.</p>
    <p>Alexa, turn off guest Wi-Fi.</p>
    <p>Alexa, turn off guest network.</p>
    <p>Alexa, is the guest Wi-Fi on?</p>
    <p>Alexa, is the guest network on?</p>
</div>

<div id="alexa-fr-FR" class="tabcontent"> 
    <p>Alexa, allume la machine à glaçons.</p>
    <p>Alexa, désactive le mode économique.</p>
    <p>Alexa, est-ce que l'oscillation est activée pour le ventilateur?</p>
    <p>Alexa, allume le Wi-Fi invité.</p>
    <p>Alexa, allume le réseau invité.</p>
    <p>Alexa, éteins le Wi-Fi invité.</p>
    <p>Alexa, éteins le réseau invité.</p>
    <p>Alexa, est-ce que le Wi-Fi invité est allumé?</p>
    <p>Alexa, est-ce que le réseau invité est allumé?</p>
</div>

<div id="alexa-de-DE" class="tabcontent"> 
   <p>Alexa, schalte die Eismaschine ein.</p>
    <p>Alexa, schalte den Eco-Modus aus.</p>
    <p>Alexa, ist Oszillieren auf dem Turmventilator an?</p>
    <p>Alexa, schalte Gast-WLAN ein.</p>
    <p>Alexa, schalte das Gastnetzwerk ein.</p>
    <p>Alexa, schalte das Gast-WLAN aus.</p>
    <p>Alexa, schalte das Gastnetzwerk aus.</p>
    <p>Alexa, ist das Gast-WLAN an?</p>
    <p>Alexa, ist das Gastnetzwerk an?</p>
</div>
 
<div id="alexa-hi-IN" class="tabcontent"> 
    <p>Alexa, आइस मेकर चालू करें।</p>
    <p>Alexa, ईको मोड बंद करें।</p>
    <p>Alexa, टावर फैन के लिए दोलन कर रही है?</p>
    <p>Alexa, अतिथि Wifi चालू करें</p>
    <p>Alexa, अतिथि Network चालू करें</p>
    <p>Alexa, अतिथि Wifi बंद करें</p>
    <p>Alexa, अतिथि नेटवर्क बंद करें</p>
    <p>Alexa, क्या अतिथि Wifi चालू है?</p>
    <p>Alexa, क्या अतिथि Network चालू है?</p>
</div>

<div id="alexa-it-IT" class="tabcontent"> 
    <p>Alexa, accendi la macchina del ghiaccio.</p>
    <p>Alexa, disattiva la modalità eco.</p>
    <p>Alexa, è attiva l'oscillazione per il ventilatore?</p>
    <p>Alexa, attiva WiFi Ospite.</p>
    <p>Alexa, attiva Rete Ospite.</p>
    <p>Alexa, disattiva WiFi Ospite.</p>
    <p>Alexa, disattiva Rete Ospite.</p>
    <p>Alexa, è attivo il WiFi Ospite?</p>
    <p>Alexa, è attiva la Rete Ospite?</p>
</div>

<div id="alexa-ja-JP" class="tabcontent"> 
    <p>アレクサ、コーヒーメーカーをつけて</p>
    <p>アレクサ、エコモードを消して</p>
    <p>アレクサ、扇風機の首振りはついている？</p>
    <p>アレクサ、ゲストWiFiをつけて</p>
    <p>アレクサ、ゲストネットワークをオンにして</p>
    <p>アレクサ、ゲストWiFiを消して</p>
    <p>アレクサ、ゲストネットワークをオフにして</p>
    <p>アレクサ、ゲストWiFiはオンになってる?</p>
    <p>アレクサ、ゲストネットワークはついている?</p>
</div>

<div id="alexa-pt-BR" class="tabcontent"> 
    <p>Alexa, ligue a máquina de gelo.</p>
    <p>Alexa, desligue o modo ecológico.</p>
    <p>Alexa, a oscilação está ativada no ventilador de torre?</p>
    <p>Alexa, ligue Wi-Fi para convidados.</p>
    <p>Alexa, ligue Rede de convidados.</p>
    <p>Alexa, desligue Wi-Fi para convidados.</p>
    <p>Alexa, desligue Rede de convidados.</p>
    <p>Alexa, o Wi-Fi para convidados está ligado?</p>
    <p>Alexa, o Rede de convidados está ligado?</p>
</div>

<div id="alexa-es-ES" class="tabcontent"> 
    <p>Alexa, enciende la máquina de hielo.</p>
    <p>Alexa, desactiva el modo ecológico.</p>
    <p>Alexa, ¿está activada la oscilación del ventilador?</p>
    <p>Alexa, enciende el Wifi de invitados.</p>
    <p>Alexa, enciende la Red de invitados.</p>
    <p>Alexa, apaga el Wifi de invitados.</p>
    <p>Alexa, apaga la Red de invitados.</p>
    <p>Alexa, ¿está encendido el Wifi de invitados?</p>
    <p>Alexa, ¿está encendida la Red de invitados?</p>
</div>

### Google Home

This capability is mapped to Google Home [Toggles](https://developers.home.google.com/cloud-to-cloud/traits/toggles) trait

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
<p>Bitte schalte Power Cool am Kühlschrank aus</p>
<p>stelle den Kühlschrank auf Power Cool</p>
</div>

<div id="gh-en-US" class="tabcontent">
<p>activate power freeze for the freezer</p>
<p>cancel power cool for the kitchen fridge</p>
</div>

<div id="gh-es-ES" class="tabcontent">
<p>pon el enfriamiento rápido en la nevera</p>
<p>quita el enfriamiento rápido</p>
</div>

<div id="gh-fr-FR" class="tabcontent">
<p>mets le mode power cool sur le réfrigérateur</p>
<p>Éteins le mode power freeze du réfrigérateur .</p>
</div>

<div id="gh-hi-IN" class="tabcontent">
<p>रेफ़्रिजरेटर का पावर कूल मोड बंद कर दो</p>
<p>रेफ़्रिजरेटर में पावर कूल मोड चालू करो</p>
</div>

<div id="gh-it-IT" class="tabcontent">
<p>disattiva il power freeze del freezer</p>
<p>imposta la funzione power freeze del surgelatore</p>
</div>

<div id="gh-ja-JP" class="tabcontent">
<p>冷蔵庫 の 急速冷凍 つけて</p>
<p>冷蔵庫 の 急速冷凍 を切ってくれる</p>
</div>

<div id="gh-ko-KR" class="tabcontent">
<p>냉장고 급속 냉장 해제해</p>
<p>냉장고 모드 급속 냉장 으로 바꿔</p>
</div>

<div id="gh-nl-NL" class="tabcontent" style="display: block;">
<p>Zet de power cool uit op de koelkast</p>
<p>zet de koelkast op superkoelen</p>
</div>

<div id="gh-pt-BR" class="tabcontent">
<p>Ativa a função power freeze no congelador .</p>
<p>Desativa o bloqueio infantil do forno .</p>
<p>desligar o power cool da geladeira</p>
<p>iniciar o modo power freeze do freezer</p>
</div>

<div id="gh-sv-SE" class="tabcontent">
<p>Stäng av power cool i kylskåpet</p>
<p>sätt på power freeze på frysen</p>
</div>


> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)