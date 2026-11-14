---
title: Cámara H.264 con ESP32-S3 para Alexa y Google Home
layout: post
lang: es
description: Transmite vídeo H.264 en directo desde una cámara ESP32-S3 a Alexa Echo Show, pantallas Google Nest, Chromecast y la app de Sinric Pro.
---

En esta sección te mostramos cómo transmitir vídeo en directo desde una cámara **ESP32-S3** a

* Alexa Echo Show y la app Alexa
* Pantallas inteligentes Google Nest y Chromecast con Google TV
* La app y el Portal de Sinric Pro

mediante una pista de vídeo H.264 sobre WebRTC.

### Requisitos previos :

1. Una placa de cámara **ESP32-S3** con PSRAM (por ejemplo XIAO ESP32S3 Sense, Freenove ESP32-S3, ESP32-S3-WROOM CAM).
2. Arduino IDE con el **core de ESP32 3.3.10 o 3.3.11**.
3. Librerías: **SinricPro** 5.1.0 o posterior y **SinricProWebRTC** 0.2.0 o posterior.

> Un ESP32 clásico no puede hacerlo. El codificador H.264 es solo por software y únicamente está disponible para el S3, así que una cámara con ESP32 clásico se queda solo en la app y el Portal. Consulta [ESP32 WebRTC Camera]({{ site.github.url }}/es/pages/tutorials/camera/esp32-webrtc-camera.es.html).

### ¿Por qué H.264?

La app y el Portal de Sinric Pro pueden mostrar cualquier cosa que envíe la cámara, así que para ellos un ESP32 puede limitarse a enviar imágenes JPEG por un canal de datos WebRTC. Alexa y Google Home no pueden. Son clientes WebRTC corrientes y esperan una **pista de vídeo** de verdad, y solo aceptan un conjunto reducido de códecs:

| | Amazon Alexa | Google Home |
|---|---|---|
| Códec de vídeo | H.264 (de Baseline a High, nivel ≤ 4.1) | H.264 o VP8 |
| Códec de audio | Opus, PCMU o PCMA | Opus, G.711 o G.722 |
| Resolución | De 480p a 1080p | De 480p a 1080p |
| ICE | Sin trickle ICE, solo IPv4 | Sin trickle ICE |
| Respuesta | En menos de 6 segundos | — |

Las dos reglas que más pesan en una placa pequeña son **H.264** y **al menos 480p**. Ninguna de las dos es negociable, y por eso una cámara que funciona de maravilla en la app de Sinric Pro no aparece en un Echo Show hasta que es capaz de codificar H.264 a 640 x 480.

### ¿Cómo funciona?

La cámara decide qué enviar **leyendo la oferta del espectador**, de modo que un mismo firmware sirve para todo:

1. Un espectador crea una oferta WebRTC y Sinric Pro la reenvía a tu cámara, añadiendo servidores STUN y TURN para que la cámara sea accesible desde fuera de tu WiFi.
2. La cámara examina la oferta:
   * **La oferta contiene una pista de vídeo que pide H264** → la cámara reinicializa el sensor en YUV422, codifica con `esp_h264` y envía H.264 sobre RTP. Es lo que envían Alexa y Google Home.
   * **La oferta no contiene ninguna pista de vídeo** → la cámara sigue enviando imágenes JPEG por el canal de datos, exactamente igual que antes. Es lo que envían las versiones antiguas de la app y del Portal.
3. La cámara responde con una respuesta que contiene todos los candidatos ICE que ha reunido, y a partir de ahí el vídeo fluye **directamente entre la cámara y el espectador**, o a través del servidor TURN de Sinric Pro cuando no es posible una ruta directa.

Como la elección se hace en cada sesión, actualizar el firmware nunca deja sin funcionar una app o un Portal antiguos.

#### Las pantallas inteligentes reciben 640 x 480 automáticamente

La app y el Portal abren un **canal de datos** junto al vídeo y lo usan para transportar controles en JSON: resolución, fotogramas por segundo, flash, volteo, espejo. Alexa y Google Home no abren ningún canal de datos: solo quieren el contenido multimedia.

La cámara lo usa como señal. **Una oferta sin canal de datos es una pantalla inteligente**, así que la sesión empieza a 640 x 480 en lugar del tamaño configurado, porque cualquier resolución inferior a 480p se rechazaría y no hay ningún canal por el que el espectador pueda pedir una mayor.

#### Lo que el codificador puede hacer de verdad

`esp_h264` codifica por software en el segundo núcleo. No es rápido, y las cifras reales son estas:

| Resolución | Fotogramas por segundo | Aproximadamente |
|---|---|---|
| 320 x 240 (QVGA) | 3 fps | 350 ms por fotograma |
| 640 x 480 (VGA) | 2 fps | 1 segundo por fotograma |

Medido en una XIAO ESP32S3 Sense: 204 fotogramas en 73 segundos a 320 x 240, sin perder ninguno.

Cada tamaño declara la tasa que realmente puede mantener, porque el receptor dimensiona su búfer de jitter a partir de lo que la cámara promete en el SDP. Prometer 10 fps y entregar 2 empeora la imagen, no la mejora.

El codificador ocupa unos **272 KB de flash** y algo más de **1 MB de PSRAM** en QVGA, y bastante más en VGA.

### Paso 1: Crea el dispositivo de cámara

1. [Inicia sesión](https://portal.sinric.pro) en tu cuenta de Sinric Pro, ve a **Devices** y haz clic en **Add Device**.
2. Escribe un nombre como **Front Camera** y selecciona el tipo de dispositivo **Camera**.
3. Abre la pestaña **Other**. En **Camera Stream Configuration**, selecciona Board **ESP32** y Streaming Protocol **WebRTC**.
4. Marca **H.264 video track**.
5. Haz clic en **Save**. La siguiente pantalla muestra **Device Id**, **App Key** y **App Secret**. ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2: Instala las librerías

En Arduino IDE abre el **Gestor de bibliotecas** e instala **SinricPro** y **SinricProWebRTC**.

### Paso 3: Graba el ejemplo

1. Abre **Archivo → Ejemplos → SinricProWebRTC → SinricProCamera**.
2. En `Settings.h`, define `WIFI_SSID`, `WIFI_PASS`, `APP_KEY`, `APP_SECRET`, `CAMERA_ID` y `CAMERA_BOARD` (elige tu placa en `BoardProfiles.h`).
3. En **Herramientas**, activa **PSRAM** y elige un esquema de particiones con al menos 3 MB para la aplicación, como **Huge APP (3MB No OTA)**.
4. Sube el sketch y abre el Monitor serie a 115200 baudios. Deberías ver:

```
Camera: XIAO ESP32S3 Sense, PSRAM: 8388608 bytes
WiFi connected: 192.168.1.194
Connected to SinricPro
```

El ejemplo activa H.264 por sí solo cuando se compila para un ESP32-S3:

```cpp
#if CONFIG_IDF_TARGET_ESP32S3
#define WEBRTC_H264 1
#else
#define WEBRTC_H264 0
#endif
```

e indica a Sinric Pro que los espectadores pueden pedir una pista de vídeo:

```cpp
camera.enableWebRTCVideo(WEBRTC_H264);
```

### Paso 4: Demostración

1. Pide a Alexa o a Google Home que busque dispositivos nuevos.
2. Alexa: *"Alexa, muéstrame Front Camera"*
3. Google Home: *"Muéstrame Front Camera en Living Room TV"* (el nombre de tu Chromecast con Google TV)

Deberías ver `WebRTC offer ...` y `WebRTC answer sent` en el Monitor serie cuando la pantalla se conecte.

La cámara también se abre en la app Alexa y en la app Google Home de tu teléfono.

App Alexa:

![Sinric Pro ESP32-S3 H.264 camera live in the Alexa app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_alexa_app_camera.jpg)

App Google Home:

![Sinric Pro ESP32-S3 H.264 camera live in the Google Home app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_google_home_app_camera.jpg)

### Limitaciones

- **Solo ESP32-S3.** No existe un codificador H.264 por software para el ESP32 clásico.
- **La tasa de fotogramas es baja**: unos 3 fps a 320 x 240 y 2 fps a 640 x 480. Alexa y Google Home siempre reciben 640 x 480, así que ahí cuenta con unos 2 fps.
- **Un solo espectador a la vez.** Un espectador nuevo sustituye al actual.
- **La resolución es fija durante toda la sesión H.264.** El control de resolución del espectador queda desactivado mientras hay una pista de vídeo en marcha.
- **El audio** está disponible cuando la placa tiene micrófono, como la XIAO ESP32S3 Sense.
- WebRTC de Google Home solo funciona en pantallas inteligentes Google Nest y en Chromecast con Google TV.

### Solución de problemas

- **La cámara nunca aparece en el Echo Show.** Comprueba que **H.264 video track** está marcado en Camera Stream Configuration y que el dispositivo es un ESP32-S3. Sin esa opción, Sinric Pro ni siquiera anuncia la cámara a Alexa.
- **`Camera init failed`**: `CAMERA_BOARD` incorrecto, o PSRAM está desactivada en Herramientas.
- **"Live View isn't available right now"** en Alexa: mira el Monitor serie. `WebRTC answer failed` significa que la cámara no pudo generar una respuesta a tiempo; si no aparece ningún mensaje, normalmente es que la oferta no llegó.
- **Transmite en casa pero no con datos móviles**: esa red bloquea las conexiones directas, así que la transmisión tiene que retransmitirse a través de TURN.
- Puedes validar el payload de Google con el [validador WebRTC de Google](https://smarthome-webrtc-validator.withgoogle.com/).

Consulta nuestra página [Troubleshooting]({{ site.github.url }}/es/pages/troubleshooting.es.html) para ver posibles soluciones a tu problema.

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Cámara WebRTC con ESP32]({{ site.github.url }}/es/pages/tutorials/camera/esp32-webrtc-camera.es.html)
- [Cámara WebRTC con Raspberry Pi]({{ site.github.url }}/es/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)
