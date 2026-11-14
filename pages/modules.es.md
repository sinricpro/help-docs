---
title: Módulos
weight: 4
lang: es
description: Qué es un módulo en Sinric Pro y cómo una sola placa ESP32 o ESP8266 puede alojar varios dispositivos.
---

### Introducción 

En SinricPro, un módulo es una unidad física autónoma, como una placa de desarrollo ESP32. Estos módulos se encargan de varias tareas, sobre todo de la conectividad y la comunicación, como establecer y mantener la conexión WiFi. **Un solo módulo puede alojar uno o varios dispositivos virtuales de SinricPro**.

![what is a module]({{ site.github.url }}/public/img/sinricpro-what-is-a-module.png) 

Esto significa que una sola placa física puede gestionar y controlar varios dispositivos domóticos, que aparecen por separado en el ecosistema de SinricPro y en las plataformas conectadas, como Amazon Alexa o Google Home. Por ejemplo, un módulo ESP32 puede controlar varios relés, y cada uno representa un dispositivo "switch" distinto en SinricPro.

Un módulo no se puede crear como se crea un dispositivo virtual. Cuando conectas una placa de desarrollo, aparece en el Portal.

SinricPro ofrece las siguientes funciones de módulo

 1. [Configurar la WiFi principal o secundaria](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)
 
 2. [Comprobar el estado de la WiFi](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Health)

 3. [Configurar una IP fija](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)

 4. [OTA](https://help.sinric.pro/pages/ota)
