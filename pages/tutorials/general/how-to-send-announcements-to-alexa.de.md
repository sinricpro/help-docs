---
title: Sprachansagen über Alexa mit SinricPro senden
layout: post
lang: de
description: Sende Sprachansagen an Alexa von einem ESP32 oder ESP8266 mit Sinric Pro, über einen Kontaktsensor und eine Alexa Routine.
---

Die Amazon Alexa Smart Home API unterstützt das Senden beliebiger Sprachansagen (also benutzerdefinierter Text-zu-Sprache-Nachrichten) nicht nativ. Du kannst diese Funktion jedoch indirekt und ausschließlich mit offiziell unterstützten Methoden erreichen, indem du **Alexa Routinen** mit einem **Switch** in SinricPro kombinierst.

## Methode: Alexa Routinen + SinricPro Switch

Folge diesen Schritten, um Alexa Sprachansagen zu aktivieren, die von deiner SinricPro Integration ausgelöst werden:

1. **Eine Alexa Routine erstellen**  
   Richte in der Alexa App eine neue Routine ein, die deine gewünschte Nachricht spricht. Konfiguriere sie so, dass sie durch ein bestimmtes Smart-Home-Ereignis ausgelöst wird – etwa „Wenn ein Smart-Home-Gerät eingeschaltet wird“.

2. **Einen Switch in SinricPro hinzufügen**  
   Lege in deinem SinricPro Dashboard ein neues **Switch**-Gerät an (das als dein virtueller Auslöser dient).

3. **Die Ansage auslösen**  
   Sende von deiner Anwendung oder deinem Server aus ein SinricPro `sendPowerStateEvent`-Event, um den virtuellen Switch **ein**zuschalten. Dadurch wird die Alexa Routine aktiviert, und Alexa spricht deine Ansage.

---

Beispielcode für ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

> **Hinweis:** Dieser Ansatz nutzt ausschließlich von Amazon genehmigte Mechanismen und erfordert keine inoffiziellen Workarounds.
