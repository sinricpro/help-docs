---
title: Videocamera ESP32 WebRTC (visione in diretta nell'app e nel Portale Sinric Pro)
layout: post
lang: it
description: Trasmetti video in diretta da una videocamera ESP32 all'app e al Portale Sinric Pro, da qualsiasi luogo, tramite WebRTC.
---

In questa sezione ti mostriamo come trasmettere video in diretta da una videocamera ESP32 all'**app Sinric Pro** e al **Portale Sinric Pro**, da qualsiasi luogo, tramite WebRTC.

### Prerequisiti :

1. Scheda videocamera ESP32 o ESP32-S3 con PSRAM (ad esempio AI-Thinker ESP32-CAM, XIAO ESP32S3 Sense, Freenove ESP32-S3).
2. Arduino IDE con **core ESP32 3.3.10 o 3.3.11** (la libreria WebRTC viene distribuita precompilata per queste versioni).
3. Librerie: **SinricPro** (con supporto WebRTC) e **SinricProWebRTC**.

### Come funziona?

1. L'app o il Portale Sinric Pro crea un'offerta WebRTC e la invia alla tua videocamera tramite Sinric Pro.
2. Sinric Pro aggiunge alla richiesta i server STUN/TURN, in modo che la videocamera sia raggiungibile dall'esterno della tua rete WiFi.
3. L'ESP32 risponde e il video scorre **direttamente tra la videocamera e il tuo telefono o browser**. Quando un percorso diretto non è possibile, viene inoltrato tramite il server TURN di Sinric Pro.

### Passo 1: Crea il dispositivo videocamera

1. Vai su [portal.sinric.pro](https://portal.sinric.pro) → **Devices** → **Add Device** e seleziona il tipo di dispositivo **Camera**.
2. In **Camera Stream Configuration** seleziona Board **ESP32** e Streaming Protocol **WebRTC**.
3. Su un ESP32-S3 spunta anche **H.264 video track** se vuoi che la videocamera sia disponibile in Amazon Alexa e Google Home. Vedi [Videocamera ESP32-S3 H.264 per Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.it.html).
4. Salva e annota il **Device Id**. **App Key** e **App Secret** si trovano in **Credentials**.

### Passo 2: Installa le librerie

In Arduino IDE apri **Gestione librerie** e installa **SinricPro** e **SinricProWebRTC**.

### Passo 3: Carica l'esempio

1. Apri **File → Esempi → SinricProWebRTC → SinricProCamera**.
2. In `Settings.h` imposta WiFi, App Key, App Secret, Device Id e `CAMERA_BOARD` (vedi `BoardProfiles.h`).
3. In **Strumenti** abilita **PSRAM** e seleziona uno schema di partizioni con almeno 3 MB per l'app, ad esempio **Huge APP (3MB No OTA)**.
4. Carica lo sketch, poi apri il Monitor seriale a 115200 baud. Dovresti vedere `Connected to SinricPro`.

### Passo 4: Guarda la videocamera

- **App**: apri la videocamera dall'elenco dei dispositivi.
- **Portale**: fai clic su **Preview** nella scheda della videocamera.

Le istantanee (**Take Snapshot**, **View Snapshots**) continuano a funzionare insieme alla visione in diretta.

### Limitazioni

- Amazon Alexa e Google Home richiedono una traccia video H.264, che solo l'ESP32-S3 è in grado di produrre. Su un ESP32 classico questa videocamera resta disponibile solo nell'app e nel Portale. Vedi [Videocamera ESP32-S3 H.264 per Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.it.html).
- Un solo spettatore alla volta: aprire la videocamera su un altro dispositivo sostituisce lo spettatore attuale.
- Il video parte a 5 fotogrammi al secondo in VGA (640 x 480). Nel visualizzatore puoi cambiare risoluzione e frequenza dei fotogrammi, e attivare o disattivare flash (AI-Thinker ESP32-CAM), capovolgimento e specchiatura.
- La qualità si riduce automaticamente sulle connessioni lente; disattiva **Auto quality** per mantenere fisse le tue impostazioni.
- L'audio è disponibile sulla XIAO ESP32S3 Sense (microfono integrato).
- Se il visualizzatore ti chiede di aggiornare il firmware della videocamera, caricalo di nuovo con SinricPro SDK 5.1.0 o successivo.

### Risoluzione dei problemi

- `Camera init failed`: `CAMERA_BOARD` errato, oppure la PSRAM è disabilitata.
- Bloccato su "Connecting": cerca `WebRTC answer failed` nel Monitor seriale e assicurati che il core ESP32 sia 3.3.10 o 3.3.11.
- Funziona a casa ma non con la rete dati mobile: quella rete blocca le connessioni dirette, quindi lo stream deve essere inoltrato tramite TURN; controlla nel Monitor seriale che l'offerta includesse i server TURN.

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Videocamera ESP32-S3 H.264 per Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.it.html)
- [Videocamera WebRTC con Raspberry Pi]({{ site.github.url }}/it/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.it.html)

