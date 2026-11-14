---
title: Inviare annunci vocali tramite Alexa con SinricPro
layout: post
lang: it
description: Invia annunci vocali ad Alexa da un ESP32 o ESP8266 con Sinric Pro, usando un sensore di contatto e una routine Alexa.
---

L'API Smart Home di Amazon Alexa non supporta nativamente l'invio di annunci vocali arbitrari (cioè messaggi di sintesi vocale personalizzati). Puoi però ottenere questa funzionalità in modo indiretto, usando solo metodi supportati ufficialmente, combinando le **routine Alexa** con uno **Switch** in SinricPro.

## Metodo: routine Alexa + Switch SinricPro

Segui questi passi per abilitare gli annunci vocali di Alexa attivati dalla tua integrazione SinricPro:

1. **Crea una routine Alexa**  
   Nell'app Alexa, imposta una nuova routine che pronunci il messaggio che desideri. Configurala in modo che venga attivata da uno specifico evento della smart home, ad esempio “Quando un dispositivo smart si accende.”

2. **Aggiungi uno Switch in SinricPro**  
   Nella tua dashboard SinricPro, crea un nuovo dispositivo **Switch** (farà da trigger virtuale).

3. **Attiva l'annuncio**  
   Dalla tua applicazione o dal tuo server, invia un evento SinricPro `sendPowerStateEvent` per **accendere** lo switch virtuale. Questa azione attiva la routine Alexa, e Alexa pronuncia il tuo annuncio.

---

Codice di esempio per ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

> **Nota:** questo approccio sfrutta solo meccanismi approvati da Amazon e non richiede alcun espediente non ufficiale.
