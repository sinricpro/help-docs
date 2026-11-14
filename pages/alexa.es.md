---
title: Amazon Alexa
layout: post
lang: es
description: Conecta Sinric Pro con Amazon Alexa. Activa la skill de Sinric Pro, vincula tu cuenta, descubre tus dispositivos ESP32 y ESP8266 y contrólalos con la voz.
---

Sinric Pro tiene una **skill oficial de Alexa Smart Home**. Una vez vinculada la skill con tu cuenta de Sinric Pro, todos los dispositivos de tu cuenta aparecen en la app Alexa y se pueden controlar con la voz, desde la app Alexa y desde las rutinas de Alexa.

No necesitas escribir tu propia skill, y tu dispositivo no tiene que estar en la misma red que tu Echo.

### Vincula la skill de Sinric Pro

* Abre la app Amazon Alexa.
* Ve a **Skills y juegos**.
* Busca [**Sinric Pro**](https://www.amazon.es/dp/B07ZT5VDT8).
* Toca **PERMITIR SU USO**.
* Introduce tus credenciales de Sinric Pro en la página de vinculación.
* Pide a Alexa que busque dispositivos nuevos: *"Alexa, descubre dispositivos"*.

Tus dispositivos de Sinric Pro aparecen ahora en **Dispositivos** en la app Alexa.

### Añadir más dispositivos después

Crea el dispositivo en el [Portal de Sinric Pro](https://portal.sinric.pro) y vuelve a decir *"Alexa, descubre dispositivos"*. No tienes que vincular la skill otra vez.

El nombre del dispositivo en Sinric Pro es el nombre que Alexa reconoce. Elige un nombre fácil de pronunciar y distinto del de tus otros dispositivos.

### Qué puedes decir

*"Alexa, enciende Switch"*, *"Alexa, pon la lámpara al 50 por ciento"*, *"Alexa, ¿cuál es la temperatura del salón?"*

Los comandos de voz de cada tipo de dispositivo están en [Utterances]({{ site.github.url }}/pages/utterances.html) (en inglés).

### Rutinas y anuncios

Sensores como los de contacto, los de movimiento y los timbres pueden activar rutinas de Alexa:

- [Enviar anuncios a Alexa]({{ site.github.url }}/es/pages/tutorials/general/how-to-send-announcements-to-alexa.es.html)
- [Tutorial del timbre]({{ site.github.url }}/es/pages/tutorials/doorbell/doorbell.es.html)

### Solución de problemas

**Alexa no encuentra el dispositivo**

- Comprueba que el dispositivo existe en el [Portal](https://portal.sinric.pro).
- Comprueba que la skill está vinculada con la misma cuenta de Sinric Pro a la que pertenece el dispositivo.
- Vuelve a buscar: *"Alexa, descubre dispositivos"*.

**Alexa dice que el dispositivo no responde**

- El dispositivo está desconectado. Comprueba en el Portal que está conectado y consulta la página [Troubleshooting]({{ site.github.url }}/es/pages/troubleshooting.es.html).

**¿Usas Espalexa o fauxmoESP?**

Esas librerías emulan un puente Hue en tu red local y no forman parte de Sinric Pro. Consulta [¿Espalexa o fauxmoESP "Device Not Found"?]({{ site.github.url }}/es/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.es.html).

### Empezar

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Tutoriales de inicio rápido]({{ site.github.url }}/es/pages/quickstarts.es.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
