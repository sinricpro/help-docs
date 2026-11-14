---
title: Cámara ESP32 WebRTC (vista en directo en la app y el Portal de Sinric Pro)
layout: post
lang: es
description: Transmite vídeo en directo desde una cámara ESP32 a la app y al Portal de Sinric Pro desde cualquier lugar mediante WebRTC.
---

En esta sección te mostramos cómo transmitir vídeo en directo desde una cámara ESP32 a la **app Sinric Pro** y al **Portal de Sinric Pro**, desde cualquier lugar, mediante WebRTC.

### Requisitos previos :

1. Placa de cámara ESP32 o ESP32-S3 con PSRAM (por ejemplo AI-Thinker ESP32-CAM, XIAO ESP32S3 Sense, Freenove ESP32-S3).
2. Arduino IDE con el **core ESP32 3.3.10 o 3.3.11** (la librería WebRTC se distribuye precompilada para estas versiones).
3. Librerías: **SinricPro** (con soporte para WebRTC) y **SinricProWebRTC**.

### ¿Cómo funciona?

1. La app o el Portal de Sinric Pro crea una oferta WebRTC y la envía a tu cámara a través de Sinric Pro.
2. Sinric Pro añade servidores STUN/TURN a la solicitud para que se pueda acceder a la cámara desde fuera de tu red WiFi.
3. El ESP32 responde y el vídeo fluye **directamente entre la cámara y tu teléfono o navegador**. Cuando no es posible una ruta directa, se retransmite a través del servidor TURN de Sinric Pro.

### Paso 1: Crea el dispositivo de cámara

1. Ve a [portal.sinric.pro](https://portal.sinric.pro) → **Devices** → **Add Device** y selecciona el tipo de dispositivo **Camera**.
2. En **Camera Stream Configuration**, selecciona Board **ESP32** y Streaming Protocol **WebRTC**.
3. En un ESP32-S3, marca también **H.264 video track** si quieres que la cámara llegue a Amazon Alexa y Google Home. Consulta [Cámara ESP32-S3 H.264 para Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.es.html).
4. Guarda y anota el **Device Id**. Tu **App Key** y tu **App Secret** están en **Credentials**.

### Paso 2: Instala las librerías

En Arduino IDE, abre el **Gestor de bibliotecas** e instala **SinricPro** y **SinricProWebRTC**.

### Paso 3: Sube el ejemplo

1. Abre **Archivo → Ejemplos → SinricProWebRTC → SinricProCamera**.
2. En `Settings.h`, configura tu WiFi, App Key, App Secret, Device Id y `CAMERA_BOARD` (consulta `BoardProfiles.h`).
3. En **Herramientas**, activa **PSRAM** y selecciona un esquema de particiones con al menos 3 MB para la aplicación, como **Huge APP (3MB No OTA)**.
4. Sube el sketch y abre el Monitor serie a 115200 baudios. Deberías ver `Connected to SinricPro`.

### Paso 4: Ver la cámara

- **App**: abre la cámara desde la lista de dispositivos.
- **Portal**: haz clic en **Preview** en la tarjeta de la cámara.

Las capturas (**Take Snapshot**, **View Snapshots**) siguen funcionando junto con la vista en directo.

### Limitaciones

- Amazon Alexa y Google Home necesitan una pista de vídeo H.264, que solo el ESP32-S3 puede generar. En un ESP32 clásico, esta cámara solo funciona en la app y el Portal. Consulta [Cámara ESP32-S3 H.264 para Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.es.html).
- Un solo espectador a la vez: al abrir la cámara en otro dispositivo se sustituye al espectador actual.
- El vídeo empieza a 5 fotogramas por segundo en VGA (640 x 480). En el visor puedes cambiar la resolución y la velocidad de fotogramas, y activar o desactivar el flash (AI-Thinker ESP32-CAM), el volteo y el espejo.
- La calidad baja automáticamente en conexiones lentas; desactiva **Auto quality** para mantener fijos tus ajustes.
- El audio está disponible en la XIAO ESP32S3 Sense (micrófono integrado).
- Si el visor te pide que actualices el firmware de la cámara, vuelve a subirlo con el SDK SinricPro 5.1.0 o posterior.

### Solución de problemas

- `Camera init failed`: `CAMERA_BOARD` incorrecto o PSRAM desactivada.
- Se queda en "Connecting": busca `WebRTC answer failed` en el Monitor serie y asegúrate de que el core ESP32 sea 3.3.10 o 3.3.11.
- Funciona en casa pero no con datos móviles: esa red bloquea las conexiones directas, así que la transmisión debe retransmitirse a través de TURN; revisa el Monitor serie para confirmar que la oferta incluía servidores TURN.

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Cámara ESP32-S3 H.264 para Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.es.html)
- [Cámara WebRTC con Raspberry Pi]({{ site.github.url }}/es/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.es.html)
