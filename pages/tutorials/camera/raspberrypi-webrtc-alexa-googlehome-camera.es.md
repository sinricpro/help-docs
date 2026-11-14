---
title: Cámara WebRTC con RaspberryPI para Alexa y Google Home
layout: post
lang: es
description: Construye una cámara WebRTC con Raspberry Pi y ve la imagen en directo en Alexa Echo Show, pantallas Google Nest, Chromecast y la app Sinric Pro.
---


En esta sección te mostramos cómo crear una cámara de Sinric Pro y ver su imagen en 

* Alexa Echo Show
* La app Alexa
* Pantallas inteligentes Google Nest y dispositivos Chromecast con Google TV.
* La app y el Portal de Sinric Pro.

### Requisitos previos : 

1. Raspberry Pi x 1 (bullseye o posterior).
2. Controlador de cámara x 1.

![Sinric Pro webrtc camera intro]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_intro.png)


### ¿Qué es WebRTC?

WebRTC (Web Real-Time Communication) es una tecnología que permite la comunicación de audio y vídeo en tiempo real por internet sin necesidad de plugins ni descargas. Es compatible con los principales navegadores, apps y dispositivos de hogar inteligente, como Amazon Eco Show, Chrome Cast y Google Nest, lo que la convierte en una herramienta muy potente para crear aplicaciones de comunicación en tiempo real. WebRTC transmite los datos de audio y vídeo mediante comunicación entre pares (peer-to-peer). Esto significa que **el vídeo y el audio se transmiten directamente entre los dos dispositivos que participan en la comunicación, sin pasar por el servidor de Sinric Pro**. Así se reduce la latencia y mejora el rendimiento, sobre todo en aplicaciones que se usan a larga distancia.


### ¿Cómo funciona WebRTC de Alexa y Google Home con Sinric Pro?


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_with_alexa_googlehome_sequnce_diagram.png)


### Paso 1: Configura la Raspberry Pi con el módulo de cámara

Para ver cómo configurar la Raspberry Pi con el módulo de cámara, consulta el excelente artículo de la Raspberry Pi Foundation [aquí](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera)


### Paso 2: Configura MediaMTX (antes rtsp-simple-server) para transmitir la cámara de la Pi.

[MediaMTX](https://github.com/bluenviron/mediamtx) es un servidor multimedia en tiempo real que permite transmitir vídeo y audio por la red. Admite muchos protocolos de streaming, entre ellos RTSP, HLS, SRT, WebRTC y RTMP. Como es compatible de forma nativa con la cámara de la Raspberry Pi, podemos transmitir fácilmente el vídeo de la cámara de la Pi por WebRTC con MediaMTX.

Vamos a configurar MediaMTX.

Para Raspberry Pi arm64:

```shell
pi@pi3:~/Desktop/tutorial $ wget https://github.com/bluenviron/mediamtx/releases/download/v0.23.3/mediamtx_v0.23.3_linux_amd64.tar.gz
pi@pi3:~/Desktop/tutorial $ tar -xzvf mediamtx_v0.23.3_linux_amd64.tar.gz
pi@pi3:~/Desktop/tutorial $ rm mediamtx_v0.23.3_linux_amd64.tar.gz
```

Para Raspberry Pi arm64v8:

```shell
pi@pi3:~/Desktop/tutorial $ wget https://github.com/bluenviron/mediamtx/releases/download/v0.23.3/mediamtx_v0.23.3_linux_arm64v8.tar.gz
pi@pi3:~/Desktop/tutorial $ tar -xzvf mediamtx_v0.23.3_linux_arm64v8.tar.gz
pi@pi3:~/Desktop/tutorial $ rm mediamtx_v0.23.3_linux_arm64v8.tar.gz
```

Al extraer el archivo verás 3 ficheros. ``mediamtx`` ``mediamtx.yml`` ``license`` 

```shell
pi@pi3:~/Desktop/tutorial $ ls -l
total 36544
-rw-r--r-- 1 pi pi     1062 May 24 16:07 LICENSE
-rwxr-xr-x 1 pi pi 24859649 May 24 16:15 mediamtx
-rw-r--r-- 1 pi pi    19171 Sep 22 12:34 mediamtx.yml
```


Edita ``mediamtx.yml`` para activar la cámara de la RaspberryPi:

```yml
paths:
  cam:
    source: rpiCamera
```

Guarda ``mediamtx.yml`` y ciérralo.

![Sinric Alexa Camera mediamtx config]({{ site.github.url }}/public/img/sinricpro_pi_camera_mediamtx_config.png) 

Inicia ``MediaMTX`` con: ``./mediamtx mediamtx.yml``

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

La transmisión de la cámara de la RaspberryPI estará disponible en la ruta http://hostname:8889/cam/. Comprueba que puedes acceder a la cámara. Por ejemplo:
``http://pi3:8889/cam/``


### Paso 3: Integración con Sinric Pro.

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, abre el menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Front Camera**, la descripción **My First Camera** y selecciona el tipo de dispositivo **Camera**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_device.png)

* Haz clic en la pestaña **Other**

![Sinric Pro webrtc camera]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_other_webrtc.png)

Selecciona **RaspPi or Other** y elige **WebRTC** como protocolo

* Haz clic en Others y después en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_ready_to_connect.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 4: Programación

Puedes usar el SDK de ``Python`` o el de ``NodeJS`` para gestionar las solicitudes de oferta/respuesta SDP entre Alexa/Google Home y MediaMTX.

Instala nuestro PythonSDK:
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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/3ce3f22b9c64a086415320078bd7dc95)


Instala nuestro SDK de NodeJS:
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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/d2659a68f70bb4760292d2362a066e3e)


### Paso 5: Demostración

1. Pide a Alexa o a Google Home que busque dispositivos nuevos.
2. Alexa: Alexa, muéstrame **Font Camera**
3. Google Home: Muéstrame **Font Camera** en Working Room TV (el nombre de tu Chromecast con Google TV)

Alexa Show Echo:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/alexa-eco-show-webrtc-camera-demo.mp4" type="video/mp4">
</video>

Portal:
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


### Solución de problemas
1. La vista previa de cámara de la beta pública de la app Google Home no funciona correctamente. 

2. Por ahora, WebRTC de Google Home es compatible con las pantallas inteligentes Google Nest y los dispositivos Chromecast con Google TV.

3. Puedes usar la herramienta WebRTC de Google para validar el payload. [https://smarthome-webrtc-validator.withgoogle.com/](https://smarthome-webrtc-validator.withgoogle.com/)

4. ¿La cámara no funciona? 

Comprueba que está bien conectada.

![Sinric Pro Pi camera how to connect]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_how_to_connect.png)


Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para ver posibles soluciones a tu problema.

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Cámara H.264 con ESP32-S3 para Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.es.html)
- [Cámara WebRTC con ESP32]({{ site.github.url }}/es/pages/tutorials/camera/esp32-webrtc-camera.es.html)
- [Timbre inteligente]({{ site.github.url }}/es/pages/tutorials/doorbell/doorbell.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)
