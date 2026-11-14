---
title: Módulos
weight: 4
lang: pt
description: O que é um módulo no Sinric Pro e como uma única placa ESP32 ou ESP8266 pode hospedar vários dispositivos.
---

### Introdução 

No contexto do SinricPro, um módulo é uma unidade física independente, como uma placa de desenvolvimento ESP32. Esses módulos são projetados para lidar com várias tarefas, com foco principal em conectividade e comunicação, como estabelecer e manter conexões WiFi. **Um único módulo pode hospedar um ou mais dispositivos virtuais do SinricPro**.

![what is a module]({{ site.github.url }}/public/img/sinricpro-what-is-a-module.png) 

Isso significa que uma única placa física pode gerenciar e controlar vários dispositivos de casa inteligente, que aparecem individualmente no ecossistema SinricPro e em plataformas conectadas, como Amazon Alexa ou Google Home. Por exemplo, um módulo ESP32 pode ser usado para controlar vários relés, cada um representando um dispositivo "switch" distinto no SinricPro.

Você não pode criar um módulo como cria um dispositivo virtual. Assim que você conecta uma placa de desenvolvimento, ela aparece no Portal.

O SinricPro oferece os seguintes recursos de módulo

 1. [Definir o WiFi primário ou secundário](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)
 
 2. [Verificar a saúde do WiFi](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Health)

 3. [Definir IP fixo](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)

 4. [OTA](https://help.sinric.pro/pages/ota)
 
