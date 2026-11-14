---
title: Enviar anuncios de voz a través de Alexa con SinricPro
layout: post
lang: es
description: Envía anuncios de voz a Alexa desde un ESP32 o ESP8266 con Sinric Pro, usando un sensor de contacto y una rutina de Alexa.
---

La API Smart Home de Amazon Alexa no permite de forma nativa enviar anuncios de voz arbitrarios (es decir, mensajes personalizados de texto a voz). Sin embargo, puedes conseguir esta función de manera indirecta, usando únicamente métodos con soporte oficial, combinando las **rutinas de Alexa** con un **Switch** en SinricPro.

## Método: rutinas de Alexa + Switch de SinricPro

Sigue estos pasos para activar anuncios de voz de Alexa desde tu integración con SinricPro:

1. **Crea una rutina de Alexa**  
   En la app Alexa, configura una rutina nueva que diga el mensaje que quieras. Configúrala para que se active con un evento concreto del hogar inteligente, como "Cuando se enciende un dispositivo inteligente".

2. **Añade un Switch en SinricPro**  
   En tu panel de SinricPro, crea un nuevo dispositivo **Switch** (hará de activador virtual).

3. **Activa el anuncio**  
   Desde tu aplicación o servidor, envía un evento `sendPowerStateEvent` de SinricPro para **encender** el interruptor virtual. Esta acción activará la rutina de Alexa y hará que Alexa diga tu anuncio.

---

Código de ejemplo para ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

> **Nota:** este método usa únicamente mecanismos aprobados por Amazon y no requiere ninguna solución no oficial.
