---
title: Videocamera ESP32-S3 H.264 per Alexa e Google Home
layout: post
lang: it
description: Trasmetti video H.264 in diretta da una videocamera ESP32-S3 ad Alexa Echo Show, ai display Google Nest, a Chromecast e all'app Sinric Pro.
---

In questa sezione ti mostriamo come trasmettere video in diretta da una videocamera **ESP32-S3** a

* Alexa Echo Show e l'app Alexa
* Smart display Google Nest e Chromecast con Google TV
* App e Portal Sinric Pro

usando una traccia video H.264 su WebRTC.

### Prerequisiti :

1. Una scheda videocamera **ESP32-S3** con PSRAM (ad esempio XIAO ESP32S3 Sense, Freenove ESP32-S3, ESP32-S3-WROOM CAM).
2. Arduino IDE con **ESP32 core 3.3.10 o 3.3.11**.
3. Librerie: **SinricPro** 5.1.0 o successiva e **SinricProWebRTC** 0.2.0 o successiva.

> Un ESP32 classico non può farlo. L'encoder H.264 è solo software ed è disponibile soltanto per l'S3, quindi una videocamera con ESP32 classico resta limitata ad App e Portal. Vedi [Videocamera ESP32 WebRTC]({{ site.github.url }}/it/pages/tutorials/camera/esp32-webrtc-camera.it.html).

### Perché H.264?

L'App e il Portal Sinric Pro possono mostrare qualunque cosa invii la videocamera, quindi per loro un ESP32 può semplicemente inviare immagini JPEG su un canale dati WebRTC. Alexa e Google Home no. Sono normali client WebRTC, si aspettano una vera **traccia video** e accettano solo un numero ristretto di codec:

| | Amazon Alexa | Google Home |
|---|---|---|
| Codec video | H.264 (da Baseline a High, livello ≤ 4.1) | H.264 o VP8 |
| Codec audio | Opus, PCMU o PCMA | Opus, G.711 o G.722 |
| Risoluzione | Da 480p a 1080p | Da 480p a 1080p |
| ICE | Niente trickle ICE, solo IPv4 | Niente trickle ICE |
| Answer | Entro 6 secondi | — |

Le due regole che contano di più per una scheda piccola sono **H.264** e **almeno 480p**. Nessuna delle due è negoziabile: per questo una videocamera che funziona benissimo nell'App Sinric Pro non compare su un Echo Show finché non riesce a codificare H.264 a 640 x 480.

### Come funziona?

La videocamera decide che cosa inviare **leggendo l'offer dello spettatore**, quindi un solo firmware va bene per tutto:

1. Uno spettatore crea un'offer WebRTC e Sinric Pro la inoltra alla tua videocamera, aggiungendo i server STUN e TURN in modo che la videocamera sia raggiungibile dall'esterno del tuo WiFi.
2. La videocamera esamina l'offer:
   * **L'offer contiene una traccia video che richiede H264** → la videocamera reinizializza il sensore in YUV422, codifica con `esp_h264` e invia H.264 su RTP. È ciò che inviano Alexa e Google Home.
   * **L'offer non contiene nessuna traccia video** → la videocamera continua a inviare immagini JPEG sul canale dati, esattamente come prima. È ciò che inviano le versioni meno recenti dell'App e del Portal.
3. La videocamera risponde con un'answer che contiene tutti i candidati ICE raccolti, dopodiché il video scorre **direttamente tra la videocamera e lo spettatore**, oppure attraverso il server TURN di Sinric Pro quando un percorso diretto non è possibile.

Poiché la scelta viene fatta per ogni sessione, aggiornare il firmware non compromette mai il funzionamento di un'App o di un Portal meno recenti.

#### Gli smart display ricevono automaticamente 640 x 480

L'App e il Portal aprono un **canale dati** accanto al video e lo usano per trasportare i controlli in JSON: risoluzione, frame rate, flash, capovolgimento, specchiatura. Alexa e Google Home non aprono alcun canale dati: vogliono soltanto i contenuti multimediali.

La videocamera usa questo fatto come segnale. **Un'offer senza canale dati è uno smart display**, quindi la sessione parte a 640 x 480 anziché alla dimensione configurata, perché qualsiasi risoluzione inferiore a 480p verrebbe rifiutata e non c'è un canale su cui lo spettatore potrebbe chiedere qualcosa di più grande.

#### Che cosa riesce a fare davvero l'encoder

`esp_h264` codifica via software sul secondo core. Non è veloce, e i numeri reali sono questi:

| Risoluzione | Frame rate | Indicativamente |
|---|---|---|
| 320 x 240 (QVGA) | 3 fps | 350 ms per frame |
| 640 x 480 (VGA) | 2 fps | 1 secondo per frame |

Misurato su una XIAO ESP32S3 Sense: 204 frame in 73 secondi a 320 x 240, senza nessun frame perso.

Ogni dimensione dichiara il frame rate che riesce davvero a mantenere, perché il ricevitore dimensiona il proprio jitter buffer in base a ciò che la videocamera promette nell'SDP. Promettere 10 fps e fornirne 2 peggiora l'immagine, non la migliora.

L'encoder occupa circa **272 KB di flash** e poco più di **1 MB di PSRAM** in QVGA, molto di più in VGA.

### Passo 1: Crea il dispositivo videocamera

1. [Accedi](https://portal.sinric.pro) al tuo account Sinric Pro, vai su **Devices** e fai clic su **Add Device**.
2. Inserisci un nome come **Front Camera** e seleziona il tipo di dispositivo **Camera**.
3. Apri la scheda **Other**. In **Camera Stream Configuration**, seleziona Board **ESP32** e Streaming Protocol **WebRTC**.
4. Spunta **H.264 video track**.
5. Fai clic su **Save**. La schermata successiva mostra **Device Id**, **App Key** e **App Secret**. ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI!***

### Passo 2: Installa le librerie

In Arduino IDE apri **Gestione librerie** e installa **SinricPro** e **SinricProWebRTC**.

### Passo 3: Carica l'esempio

1. Apri **File → Esempi → SinricProWebRTC → SinricProCamera**.
2. In `Settings.h`, imposta `WIFI_SSID`, `WIFI_PASS`, `APP_KEY`, `APP_SECRET`, `CAMERA_ID` e `CAMERA_BOARD` (scegli la tua scheda da `BoardProfiles.h`).
3. In **Strumenti**, abilita **PSRAM** e scegli uno schema di partizioni con almeno 3 MB per l'app, come **Huge APP (3MB No OTA)**.
4. Carica lo sketch, poi apri il Monitor seriale a 115200 baud. Dovresti vedere:

```
Camera: XIAO ESP32S3 Sense, PSRAM: 8388608 bytes
WiFi connected: 192.168.1.194
Connected to SinricPro
```

L'esempio attiva H.264 da solo quando viene compilato per un ESP32-S3:

```cpp
#if CONFIG_IDF_TARGET_ESP32S3
#define WEBRTC_H264 1
#else
#define WEBRTC_H264 0
#endif
```

e comunica a Sinric Pro che gli spettatori possono richiedere una traccia video:

```cpp
camera.enableWebRTCVideo(WEBRTC_H264);
```

### Passo 4: Demo

1. Chiedi ad Alexa o a Google Home di cercare nuovi dispositivi.
2. Alexa: *"Alexa, mostrami Front Camera"*
3. Google Home: *"Mostrami Front Camera su TV del soggiorno"* (il nome del tuo Chromecast con Google TV)

Quando il display si connette, nel Monitor seriale dovresti vedere `WebRTC offer ...` e `WebRTC answer sent`.

La videocamera si apre anche nell'app Alexa e nell'app Google Home sul tuo telefono.

App Alexa:

![Sinric Pro ESP32-S3 H.264 camera live in the Alexa app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_alexa_app_camera.jpg)

App Google Home:

![Sinric Pro ESP32-S3 H.264 camera live in the Google Home app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_google_home_app_camera.jpg)

### Limitazioni

- **Solo ESP32-S3.** Non esiste un encoder H.264 software per l'ESP32 classico.
- **Il frame rate è basso**: circa 3 fps a 320 x 240 e 2 fps a 640 x 480. Alexa e Google Home ricevono sempre 640 x 480, quindi lì aspettati circa 2 fps.
- **Uno spettatore alla volta.** Un nuovo spettatore sostituisce quello attuale.
- **La risoluzione è fissa per tutta la durata di una sessione H.264.** Il controllo della risoluzione dello spettatore è disattivato mentre è attiva una traccia video.
- **L'audio** è disponibile se la scheda ha un microfono, come la XIAO ESP32S3 Sense.
- Google Home WebRTC funziona solo sugli smart display Google Nest e su Chromecast con Google TV.

### Risoluzione dei problemi

- **La videocamera non compare mai sull'Echo Show.** Controlla che **H.264 video track** sia spuntato in Camera Stream Configuration e che il dispositivo sia un ESP32-S3. In caso contrario Sinric Pro non segnala affatto la videocamera ad Alexa.
- **`Camera init failed`**: `CAMERA_BOARD` errato, oppure la PSRAM è disabilitata in Strumenti.
- **"Live View isn't available right now"** su Alexa: guarda nel Monitor seriale. `WebRTC answer failed` significa che la videocamera non è riuscita a costruire un'answer in tempo; nessun messaggio di solito significa che l'offer non è mai arrivata.
- **Lo streaming funziona a casa ma non con la rete dati mobile**: quella rete blocca le connessioni dirette, quindi lo streaming deve passare attraverso TURN.
- Puoi convalidare il payload di Google con il [Google WebRTC validator](https://smarthome-webrtc-validator.withgoogle.com/).

Consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html) per le possibili soluzioni al tuo problema.

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Videocamera ESP32 WebRTC]({{ site.github.url }}/it/pages/tutorials/camera/esp32-webrtc-camera.it.html)
- [Videocamera Raspberry Pi WebRTC]({{ site.github.url }}/it/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)
