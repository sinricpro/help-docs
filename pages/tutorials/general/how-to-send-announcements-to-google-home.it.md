---
title: Inviare annunci vocali tramite Google Home con SinricPro
layout: post
lang: it
description: Invia annunci vocali a Google Home da un ESP32 o ESP8266 con Sinric Pro, usando le automazioni di Google Home.
---

Google Home **non supporta annunci di sintesi vocale (TTS) con testo arbitrario** tramite la Smart Home API per integrazioni di terze parti come SinricPro. Puoi però ottenere annunci vocali **in modo indiretto** usando le **routine di Google Home** (chiamate *“Routine”* nell'app Google Home) insieme a un dispositivo virtuale che fa da trigger.

---

## Metodo: routine di Google Home + Switch SinricPro

### Passo dopo passo:

1. **Crea una routine di Google Home**  
   - Apri l'**app Google Home**.  
   - Vai su **Routine** → **+ Crea nuova routine**.  
   - In **“Quando succede questo”**, scegli **“Stato del dispositivo”** (ad es. “Quando [Dispositivo] si accende”).  
   - In **“Aggiungi azione”**, seleziona **“Voce dell'assistente”** o **“Pronuncia risposta”** e inserisci il tuo annuncio personalizzato (ad es. “La porta del garage è aperta.”).  
   - Salva la routine.

2. **Aggiungi uno Switch in SinricPro**  
   - Nella tua **dashboard SinricPro**, crea un nuovo dispositivo **Switch**.  
   - Dagli un nome riconoscibile (ad es. “Announcement Trigger”).

3. **Attiva l'annuncio**  
   - Dal tuo codice o dal tuo sistema di automazione, invia un comando `sendPowerStateEvent` per **accendere** lo Switch tramite SinricPro.  
   - Google Home rileva questo cambio di stato e avvia la routine associata, così l'Assistente Google pronuncia il tuo messaggio.

---

Codice di esempio per ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

### Limitazione:
Questo approccio supporta **solo annunci predefiniti**. Se devi inviare **messaggi dinamici generati a runtime** (ad es. “La temperatura attuale è di 23°C”), Google Home **non lo supporta** tramite le Smart Home API standard. In questi casi dovrai valutare soluzioni alternative, come le **notifiche broadcast sui dispositivi Android** o gli **altoparlanti TTS di terze parti**, che esulano dal framework ufficiale Google Smart Home.

---
