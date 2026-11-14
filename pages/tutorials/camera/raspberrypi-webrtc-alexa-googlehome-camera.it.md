---
title: Videocamera WebRTC con RaspberryPI per Alexa e Google Home
layout: post
lang: it
description: Costruisci una videocamera WebRTC con Raspberry Pi e guarda il video in diretta su Alexa Echo Show, display Google Nest, Chromecast e nell'app Sinric Pro.
---


In questa sezione ti mostreremo come creare una videocamera Sinric Pro e visualizzarne il flusso video su 

* Alexa Echo Show
* App Alexa
* Smart display Google Nest e dispositivi Chromecast con Google TV.
* App e Portale Sinric Pro.

### Prerequisiti : 

1. Raspberry Pi x 1 (bullseye o successivo).
2. Modulo videocamera x 1.

![Sinric Pro webrtc camera intro]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_intro.png)


### Che cos'è WebRTC?

WebRTC (Web Real-Time Communication) è una tecnologia che permette la comunicazione audio e video in tempo reale su internet senza bisogno di plugin o download. È supportata da tutti i principali browser, dalle app e dai dispositivi smart home come Amazon Eco Show, Chrome Cast e Google Nest, il che la rende uno strumento potente per realizzare applicazioni di comunicazione in tempo reale. WebRTC funziona usando la comunicazione peer-to-peer per trasmettere i dati audio e video. Questo significa che **il video/audio viene trasmesso direttamente tra i due dispositivi coinvolti nella comunicazione, senza passare dal server di Sinric Pro**. In questo modo si riduce la latenza e migliorano le prestazioni, soprattutto per le applicazioni usate su lunghe distanze.


### Come funziona il WebRTC di Alexa e Google Home con Sinric Pro ?


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_with_alexa_googlehome_sequnce_diagram.png)


### Passo 1: Configura il Raspberry Pi con il modulo videocamera

Per le istruzioni su come configurare il Raspberry Pi con il modulo videocamera, consulta l'ottimo articolo della Raspberry Pi Foundation [qui](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera)


### Passo 2: Configura MediaMTX (in precedenza rtsp-simple-server) per trasmettere il video della Pi Camera.

[MediaMTX](https://github.com/bluenviron/mediamtx) è un media server in tempo reale che ti permette di trasmettere video e audio in rete. Supporta molti protocolli di streaming, tra cui RTSP, HLS, SRT, WebRTC e RTMP. Dato che supporta nativamente la videocamera del Raspberry Pi, con MediaMTX possiamo trasmettere facilmente il video della Pi Camera tramite WebRTC.

Configuriamo MediaMTX.

Per Raspberry Pi arm64:

```shell
pi@pi3:~/Desktop/tutorial $ wget https://github.com/bluenviron/mediamtx/releases/download/v0.23.3/mediamtx_v0.23.3_linux_amd64.tar.gz
pi@pi3:~/Desktop/tutorial $ tar -xzvf mediamtx_v0.23.3_linux_amd64.tar.gz
pi@pi3:~/Desktop/tutorial $ rm mediamtx_v0.23.3_linux_amd64.tar.gz
```

Per Raspberry Pi arm64v8:

```shell
pi@pi3:~/Desktop/tutorial $ wget https://github.com/bluenviron/mediamtx/releases/download/v0.23.3/mediamtx_v0.23.3_linux_arm64v8.tar.gz
pi@pi3:~/Desktop/tutorial $ tar -xzvf mediamtx_v0.23.3_linux_arm64v8.tar.gz
pi@pi3:~/Desktop/tutorial $ rm mediamtx_v0.23.3_linux_arm64v8.tar.gz
```

Dopo aver estratto l'archivio vedrai 3 file. ``mediamtx`` ``mediamtx.yml`` ``license`` 

```shell
pi@pi3:~/Desktop/tutorial $ ls -l
total 36544
-rw-r--r-- 1 pi pi     1062 May 24 16:07 LICENSE
-rwxr-xr-x 1 pi pi 24859649 May 24 16:15 mediamtx
-rw-r--r-- 1 pi pi    19171 Sep 22 12:34 mediamtx.yml
```


Modifica ``mediamtx.yml`` per abilitare la videocamera del RaspberryPi:

```yml
paths:
  cam:
    source: rpiCamera
```

Salva ``mediamtx.yml`` e chiudi.

![Sinric Alexa Camera mediamtx config]({{ site.github.url }}/public/img/sinricpro_pi_camera_mediamtx_config.png) 

Avvia ``MediaMTX`` con: ``./mediamtx mediamtx.yml``

```shell
pi@pi3:~/Desktop/tutorial $ ./mediamtx mediamtx.yml

2023/09/22 12:34:58 INF MediaMTX / rtsp-simple-server v0.23.3
2023/09/22 12:34:58 INF [path cam] [rpicamera source] started
2023/09/22 12:34:58 INF [RTSP] listener opened on :8554 (TCP), :8000 (UDP/RTP), :8001 (UDP/RTCP)
2023/09/22 12:34:58 INF [RTMP] listener opened on :1935
2023/09/22 12:34:58 INF [HLS] listener opened on :8888
2023/09/22 12:34:58 INF [WebRTC] listener opened on :8889 (HTTP)
[0:26:13.822982709] [1457]  INFO Camera camera_manager.cpp:299 libcamera v0.0.4+22-923f5d70
[0:26:13.887593667] [1458]  INFO RPI raspberrypi.cpp:1476 Registered camera /base/soc/i2c0mux/i2c@1/ov5647@36 to Unicam device /dev/media2 and ISP device /dev/media0
[0:26:13.889176990] [1457]  INFO Camera camera.cpp:1028 configuring streams: (0) 1920x1080-YUV420
[0:26:13.889745371] [1458]  INFO RPI raspberrypi.cpp:851 Sensor: /base/soc/i2c0mux/i2c@1/ov5647@36 - Selected sensor format: 1920x1080-SGBRG10_1X10 - Selected unicam format: 1920x1080-pGAA
2023/09/22 12:34:59 INF [path cam] [rpicamera source] ready: 1 track (H264)

```

Il flusso della videocamera del RaspberryPI sarà disponibile al percorso http://hostname:8889/cam/. Controlla di riuscire ad accedere alla videocamera. Ad esempio:
``http://pi3:8889/cam/``


### Passo 3: Integrazione con Sinric Pro.

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, vai al menu **Devices** sulla sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Front Camera**, la descrizione **My First Camera** e seleziona **Camera** come tipo di dispositivo.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_device.png)

* Fai clic sulla scheda **Other**

![Sinric Pro webrtc camera]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_other_webrtc.png)

Seleziona **RaspPi or Other** e seleziona **WebRTC** come protocollo

* Fai clic su Others e poi su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo che hai appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_ready_to_connect.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni al sicuro questi valori. NON CONDIVIDERLI SUI FORUM PUBBLICI !***

### Passo 4: Il codice

Puoi usare l'SDK ``Python`` o ``NodeJS`` per gestire le richieste di offer/answer SDP tra Alexa/Google Home e MediaMTX.

Installa il nostro PythonSDK:
    ``pip install sinricpro --user``


```python
from sinric import SinricPro, SinricProConstants
import requests
import asyncio
import base64

APP_KEY = ""
APP_SECRET = ""
CAMERA_ID = ''

def get_webrtc_answer(device_id, offer):
    sdp_offer = base64.b64decode(offer)
    print('device_id: {} offer: {}'.format(device_id, offer))

    # PORT 8889 for WebRTC. eg: for PiCam, use http://<mediamtx-hostname>:8889/cam/whep
    mediamtx_url = "http://<mediamtx-hostname>:8889/cam/whep"  #TODO: Change <mediamtx-hostname> 
    headers = {"Content-Type": "application/sdp"}
    response = requests.post(mediamtx_url, headers=headers, data=sdp_offer)

    if response.status_code == 201:
        answer = base64.b64encode(response.content).decode("utf-8")
        return True, answer
    else:
        return False


def power_state(device_id, state):
    print('device_id: {} power state: {}'.format(device_id, state))
    return True, state

callbacks = {
    SinricProConstants.GET_WEBRTC_ANSWER: get_webrtc_answer,
    SinricProConstants.SET_POWER_STATE: power_state
}

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    client = SinricPro(APP_KEY, [CAMERA_ID], callbacks,
                       enable_log=False, restore_states=False, secret_key=APP_SECRET)
    loop.run_until_complete(client.connect())
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/3ce3f22b9c64a086415320078bd7dc95)


Installa il nostro SDK NodeJS:
    ``npm install sinricpro``


```javascript
const {
  SinricPro, startSinricPro, raiseEvent, eventNames,
} = require('sinricpro');

const fetch = require('node-fetch');

const APPKEY =  "";
const APPSECRET = "";
const cameraId = "";
const deviceIds = [cameraId];

async function mediamtx(offer) {
  /* 
    Get the answer from mediamtx `http://<hostname>:8889/<name>/whep`. eg: http://pi3:8889/cam/whep
  */
  const url = "http://<mediamtx-hostname>:8889/cam/whep";  // TODO: Change <mediamtx-hostname>.
  const response = await fetch(url, {
    headers: {
      "content-type": "application/sdp",
    },
    body: offer,
    method: "POST",
  });

  // eslint-disable-next-line no-return-await
  return await response.text();   
}

const getWebRTCAnswer = async (deviceid, base64Offer) => {
  // Alexa Eco needs camera stream answer
  const offer = Buffer.from(base64Offer, 'base64').toString();
  try {
    const answer = await mediamtx(offer);
    const answerInBase64 = Buffer.from(answer).toString('base64');
    return { success: true, answer: answerInBase64 };
  } catch (error) {
    console.error(error);
    return { success: false };
  }  
};

const setPowerState = async (deviceid, data) => {
  console.log(deviceid, data);
  return true;
};

const sinricpro = new SinricPro(APPKEY, deviceIds, APPSECRET, false);
const callbacks = { setPowerState, getWebRTCAnswer };

startSinricPro(sinricpro, callbacks);
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/d2659a68f70bb4760292d2362a066e3e)


### Passo 5: Demo

1. Chiedi ad Alexa o a Google Home di cercare nuovi dispositivi.
2. Alexa: Alexa, mostrami la **Font Camera**
3. Google Home: Mostrami la **Font Camera** su Working Room TV (il nome del tuo Chromecast con Google TV)

Alexa Echo Show:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/alexa-eco-show-webrtc-camera-demo.mp4" type="video/mp4">
</video>

Portale:
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-webrtc-camera-demo.mp4" type="video/mp4">
</video>

Google Home Chromecast con Google TV:

![Sinric Pro WebRTC Camera Google Home Chromecast with Google TV ]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_google_home_camera.jpg)


App Alexa:

![Sinric Pro WebRTC camera with Alexa app ]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_alexa_app_camera.jpg)


App Sinric Pro:
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-app-webrtc-camera-demo.mp4" type="video/mp4">
</video>


### Risoluzione dei problemi
1. L'anteprima della videocamera nella beta pubblica dell'app Google Home non funziona correttamente. 

2. Il WebRTC di Google Home è attualmente supportato sugli smart display Google Nest e sui dispositivi Chromecast con Google TV.

3. Puoi usare lo strumento WebRTC di Google per convalidare il payload. [https://smarthome-webrtc-validator.withgoogle.com/](https://smarthome-webrtc-validator.withgoogle.com/)

4. La videocamera non funziona ? 

Assicurati che sia collegata correttamente.

![Sinric Pro Pi camera how to connect]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_how_to_connect.png)


Consulta la nostra pagina [Troubleshooting]({{ site.github.url }}/it/pages/troubleshooting.it.html) per le possibili soluzioni al tuo problema.

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Videocamera H.264 con ESP32-S3 per Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.it.html)
- [Videocamera WebRTC con ESP32]({{ site.github.url }}/it/pages/tutorials/camera/esp32-webrtc-camera.it.html)
- [Campanello smart]({{ site.github.url }}/it/pages/tutorials/doorbell/doorbell.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)
