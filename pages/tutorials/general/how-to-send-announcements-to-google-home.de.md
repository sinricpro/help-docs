---
title: Sprachansagen über Google Home mit SinricPro senden
layout: post
lang: de
description: Sende Sprachansagen von einem ESP32 oder ESP8266 mit Sinric Pro an Google Home, mithilfe von Google Home Automatisierungen.
---

Google Home **unterstützt keine beliebigen Text-to-Speech (TTS) Ansagen** über die Smart Home API für Drittanbieter-Integrationen wie SinricPro. Du kannst Sprachansagen aber **indirekt** umsetzen, indem du **Google Home Routinen** (in der Google Home App *„Routinen“* genannt) mit einem virtuellen Geräte-Trigger kombinierst.

---

## Methode: Google Home Routinen + SinricPro Switch

### Schritt für Schritt:

1. **Erstelle eine Google Home Routine**  
   - Öffne die **Google Home App**.  
   - Gehe zu **Routinen** → **+ Neue Routine erstellen**.  
   - Wähle unter **„Wenn dies passiert“** die Option **„Gerätestatus“** (z. B. „Wenn [Gerät] eingeschaltet wird“).  
   - Wähle unter **„Aktion hinzufügen“** **„Assistant-Stimme“** oder **„Antwort sprechen“** und gib deine individuelle Ansage ein (z. B. „Die Garagentür ist offen.“).  
   - Speichere die Routine.

2. **Füge in SinricPro einen Switch hinzu**  
   - Erstelle in deinem **SinricPro-Dashboard** ein neues **Switch**-Gerät.  
   - Gib ihm einen gut erkennbaren Namen (z. B. „Announcement Trigger“).

3. **Die Ansage auslösen**  
   - Sende aus deinem Code oder deinem Automatisierungssystem einen `sendPowerStateEvent` Befehl, um den Switch über SinricPro **einzuschalten**.  
   - Diese Statusänderung wird von Google Home erkannt und löst die zugehörige Routine aus, wodurch der Google Assistant deine Nachricht ausspricht.

---

Beispielcode für ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

### Einschränkung:
Dieser Ansatz unterstützt **nur vordefinierte Ansagen**. Wenn du **dynamische Nachrichten zur Laufzeit** senden musst (z. B. „Die aktuelle Temperatur beträgt 23 °C“), unterstützt Google Home **dies nicht** über die standardmäßigen Smart Home APIs. In solchen Fällen müsstest du auf alternative Lösungen wie **Broadcast-Benachrichtigungen auf Android-Geräten** oder **TTS-Lautsprecher von Drittanbietern** zurückgreifen, die außerhalb des offiziellen Google Smart Home Frameworks liegen.

---
