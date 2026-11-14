---
title: Alternativas a Sinric Pro - Cómo se compara Sinric Pro
layout: post
lang: es
description: Compara Sinric Pro con las alternativas para controlar un ESP32 o ESP8266 por voz - Espalexa y fauxmoESP, Tasmota, ESPHome con Home Assistant, otras nubes IoT y una skill de Alexa personalizada.
---

Hay varias formas de controlar un ESP32 o ESP8266 con Alexa, Google Home o un teléfono. Esta página describe los principales enfoques, en qué destaca cada uno y dónde se sitúa Sinric Pro.

### Las opciones de un vistazo

| Enfoque | Ejemplos | Ejecutas un servidor | Funciona fuera de casa | Mejor para |
| --- | --- | --- | --- | --- |
| Nube de smart home para dispositivos DIY | Sinric Pro | No | Sí | Control por voz y una app con poca configuración |
| Emulación local del dispositivo | Espalexa, fauxmoESP | No | No | Una prueba rápida solo con Alexa en tu propia red |
| Firmware de código abierto | Tasmota | Opcional | Con configuración adicional | Reflashear dispositivos comerciales, control local |
| Smart home autoalojado | ESPHome con Home Assistant | Sí | Con configuración adicional | Un hogar totalmente local que administras tú mismo |
| Paneles IoT generales | Blynk, Arduino Cloud | No | Sí | Paneles, gráficos y datos de sensores |
| Tu propia skill y backend | Skill de Alexa Smart Home con tu propio backend en la nube | Sí | Sí | Control total cuando tienes tiempo para construirlo |

### Emulación local del dispositivo (Espalexa, fauxmoESP)

Estas librerías hacen que la placa se haga pasar por un puente Philips Hue o un interruptor Belkin WeMo en tu red Wi-Fi. No hay cuenta ni nube.

- Funciona solo con Alexa, y solo en la misma red.
- Admite un conjunto reducido de tipos de dispositivo (encendido/apagado, brillo, color).
- El descubrimiento depende del modelo de Echo y de tu router. Consulta [¿Espalexa o fauxmoESP "Device Not Found"?]({{ site.github.url }}/es/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.es.html)

### Firmware de código abierto (Tasmota)

Tasmota es un firmware ya preparado que configuras en lugar de escribir código. Se controla de forma local a través de su interfaz web, HTTP o MQTT. Su soporte para Alexa también usa emulación de Hue y WeMo.

Elígelo cuando quieras reflashear un enchufe inteligente o una bombilla ya existentes y mantener todo dentro de tu propia red.

### Smart home autoalojado (ESPHome con Home Assistant)

ESPHome genera firmware a partir de un archivo de configuración, y Home Assistant es el servidor que controla los dispositivos. Todo puede ejecutarse de forma local en tu propio hardware.

Elígelo cuando quieras una configuración totalmente local y no te importe ejecutar y mantener un servidor. Los asistentes de voz y el acceso desde fuera de casa necesitan configuración adicional o una suscripción.

Sinric Pro y Home Assistant se pueden usar juntos: consulta la [integración con Home Assistant]({{ site.github.url }}/es/pages/home-assistant.es.html).

### Paneles IoT generales (Blynk, Arduino Cloud)

Estas plataformas se centran en paneles: widgets, gráficos y datos de tus dispositivos en un teléfono o una página web. Sus límites de dispositivos, precios y soporte de asistentes de voz difieren y cambian con el tiempo, así que consulta el sitio web de cada plataforma para ver los detalles actuales.

Elige una cuando tu proyecto trate principalmente de monitorizar y visualizar datos.

### Tu propia skill y backend de Alexa

Puedes crear tú mismo una skill de Alexa Smart Home, con tu propio backend en la nube, vinculación de cuenta y conexión de dispositivos. Esto te da control total. También es lo que requiere más trabajo, y tú mismo mantienes el backend.

Si quieres esto para un producto comercial sin construir el backend, consulta [Sinric Pro para empresas]({{ site.github.url }}/es/pages/for-business.es.html).

### Dónde se sitúa Sinric Pro

Sinric Pro está diseñado para una sola tarea: hacer que un dispositivo DIY se comporte como un producto de smart home.

- **Integraciones de voz oficiales**: una skill de Alexa Smart Home y una action de Google Home, sin emulación y sin tener que escribir ninguna skill.
- **Muchos tipos de dispositivo**: interruptores, luces, termostatos, televisores, cerraduras, ventiladores, persianas, cámaras y sensores, además de [tipos de dispositivo personalizados]({{ site.github.url }}/es/pages/custom-templates.es.html).
- **Sin servidor que ejecutar**: la placa se conecta hacia afuera a Sinric Pro, así que no hace falta redirigir puertos.
- **Más que voz**: app móvil, [automatizaciones]({{ site.github.url }}/es/pages/automations.es.html), notificaciones push, [actualizaciones OTA]({{ site.github.url }}/es/pages/ota.es.html), una [API]({{ site.github.url }}/es/pages/api-guide.es.html), e integraciones con SmartThings, HomeKit (Homebridge), Home Assistant, IFTTT y Node-RED.
- **Control local**: la app sigue funcionando por Wi-Fi [cuando no hay internet]({{ site.github.url }}/es/pages/local-control.es.html).
- **Gratis para empezar**: 3 dispositivos en el plan gratuito. Consulta [Precios]({{ site.github.url }}/es/pages/pricing.es.html).

### Cuándo otra opción es mejor

- Quieres **ninguna nube en absoluto**, incluso para el control por voz: usa ESPHome con Home Assistant, o Tasmota.
- Solo necesitas **Alexa en tu propia red** para una prueba rápida: Espalexa o fauxmoESP pueden ser suficientes.
- Quieres principalmente **gráficos y paneles** para datos de sensores: mira una plataforma de paneles.

### Prueba Sinric Pro

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Sinric Pro como plataforma IoT para ESP8266 y ESP32]({{ site.github.url }}/es/pages/tutorials/general/iot-platform-esp8266-esp32.es.html)
- [Crea una cuenta gratuita](https://portal.sinric.pro/register)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)
