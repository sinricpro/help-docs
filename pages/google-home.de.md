---
title: Google Home
layout: post
lang: de
description: Sinric Pro mit Google Home verbinden. Sinric Pro in der Google Home App verknüpfen und ESP32 und ESP8266 Geräte mit Google Assistant steuern.
---

Sinric Pro hat eine offizielle **Google Home Action**. Sobald sie mit deinem Sinric Pro Konto verknüpft ist, erscheinen deine Geräte in der Google Home App und lassen sich mit Google Assistant, über die Google Home App und über Google Home Automationen steuern.

### Sinric Pro in Google Home verknüpfen

* Öffne **Google Home** und tippe auf **Add** (Hinzufügen).
* Wähle **Setup Device** (Gerät einrichten).
* Wähle **Works with Google Home**.
* Suche nach [**Sinric Pro**](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=de).
* Verknüpfe dein Konto.

Die Bezeichnungen in der App können je nach Sprache leicht abweichen.

Deine Sinric Pro Geräte erscheinen jetzt in der Google Home App. Ordne sie einem Raum zu, um sie über den Raumnamen zu steuern.

### Später weitere Geräte hinzufügen

Lege das Gerät im [Sinric Pro Portal](https://portal.sinric.pro) an und sage dann *„Hey Google, synchronisiere meine Geräte“*.

### Was du sagen kannst

*„Hey Google, schalte Switch ein“*, *„Hey Google, stelle die Lampe auf 50 Prozent“*.

Die Sprachbefehle für jeden Gerätetyp stehen unter [Utterances]({{ site.github.url }}/pages/utterances.html) (auf Englisch).

### Ankündigungen und Automationen

- [Ankündigungen an Google Home senden]({{ site.github.url }}/de/pages/tutorials/general/how-to-send-announcements-to-google-home.de.html)

### Fehlerbehebung

**Das Gerät erscheint nicht in Google Home**

- Prüfe, ob das Gerät im [Portal](https://portal.sinric.pro) vorhanden ist.
- Sage *„Hey Google, synchronisiere meine Geräte“*.
- Prüfe, ob Google Home mit demselben Sinric Pro Konto verknüpft ist, dem das Gerät gehört.

**Google Home meldet, dass das Gerät offline ist**

- Prüfe im Portal, ob das Gerät verbunden ist, und sieh auf der Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html) nach.

### Loslegen

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Schnellstart-Tutorials]({{ site.github.url }}/de/pages/quickstarts.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
