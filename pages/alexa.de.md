---
title: Amazon Alexa
layout: post
lang: de
description: Sinric Pro mit Amazon Alexa verbinden. Sinric Pro Skill aktivieren, Konto verknüpfen, ESP32 und ESP8266 Geräte suchen und per Sprache steuern.
---

Sinric Pro hat einen offiziellen **Alexa Smart Home Skill**. Sobald der Skill mit deinem Sinric Pro Konto verknüpft ist, erscheint jedes Gerät aus deinem Konto in der Alexa App und lässt sich per Sprache, über die Alexa App und über Alexa Routinen steuern.

Du musst keinen eigenen Skill schreiben, und dein Gerät muss nicht im selben Netzwerk wie dein Echo sein.

### Sinric Pro Skill verknüpfen

* Öffne die Amazon Alexa App.
* Gehe zu **Skills und Spiele**.
* Suche nach [**Sinric Pro**](https://www.amazon.de/dp/B07ZT5VDT8).
* Tippe auf **ZUR VERWENDUNG AKTIVIEREN**.
* Gib auf der Verknüpfungsseite deine Sinric Pro Zugangsdaten ein.
* Bitte Alexa, neue Geräte zu suchen: *„Alexa, suche neue Geräte“*.

Deine Sinric Pro Geräte erscheinen jetzt in der Alexa App unter **Geräte**.

### Später weitere Geräte hinzufügen

Lege das Gerät im [Sinric Pro Portal](https://portal.sinric.pro) an und sage dann erneut *„Alexa, suche neue Geräte“*. Du musst den Skill nicht noch einmal verknüpfen.

Der Gerätename in Sinric Pro ist der Name, auf den Alexa hört. Wähle einen Namen, der sich leicht aussprechen lässt und sich von deinen anderen Geräten unterscheidet.

### Was du sagen kannst

*„Alexa, schalte Switch ein“*, *„Alexa, stelle die Lampe auf 50 Prozent“*, *„Alexa, wie ist die Temperatur im Wohnzimmer?“*

Die Sprachbefehle für jeden Gerätetyp stehen unter [Utterances]({{ site.github.url }}/pages/utterances.html) (auf Englisch).

### Routinen und Ankündigungen

Sensoren wie Kontaktsensoren, Bewegungsmelder und Türklingeln können Alexa Routinen auslösen:

- [Ankündigungen an Alexa senden]({{ site.github.url }}/de/pages/tutorials/general/how-to-send-announcements-to-alexa.de.html)
- [Türklingel-Tutorial]({{ site.github.url }}/de/pages/tutorials/doorbell/doorbell.de.html)

### Fehlerbehebung

**Alexa findet das Gerät nicht**

- Prüfe, ob das Gerät im [Portal](https://portal.sinric.pro) vorhanden ist.
- Prüfe, ob der Skill mit demselben Sinric Pro Konto verknüpft ist, dem das Gerät gehört.
- Starte die Suche erneut: *„Alexa, suche neue Geräte“*.

**Alexa sagt, das Gerät reagiert nicht**

- Das Gerät ist offline. Prüfe im Portal, ob es verbunden ist, und sieh auf der Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html) nach.

**Du verwendest Espalexa oder fauxmoESP?**

Diese Bibliotheken emulieren eine Hue Bridge in deinem lokalen Netzwerk und gehören nicht zu Sinric Pro. Siehe [Espalexa oder fauxmoESP „Device Not Found“?]({{ site.github.url }}/de/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.de.html).

### Loslegen

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Schnellstart-Tutorials]({{ site.github.url }}/de/pages/quickstarts.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
