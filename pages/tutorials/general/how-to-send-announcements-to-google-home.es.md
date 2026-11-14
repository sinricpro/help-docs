---
title: Enviar anuncios de voz a través de Google Home usando SinricPro
layout: post
lang: es
description: Envía anuncios de voz a Google Home desde un ESP32 o ESP8266 con Sinric Pro, usando automatizaciones de Google Home.
---

Google Home **no admite anuncios de texto a voz (TTS) arbitrarios** a través de la Smart Home API para integraciones de terceros como SinricPro. Sin embargo, puedes lograr anuncios de voz **de forma indirecta** usando **Google Home Routines** (llamadas *"Rutinas"* en la app de Google Home) combinadas con un disparador de dispositivo virtual.

---

## Método: Rutinas de Google Home + Switch de SinricPro

### Paso a paso:

1. **Crea una rutina de Google Home**  
   - Abre la app de **Google Home**.  
   - Ve a **Routines** → **+ Create new routine**.  
   - En **"When this happens"**, elige **"Device state"** (p. ej., "When [Device] turns on").  
   - En **"Add action"**, selecciona **"Assistant voice"** o **"Speak response"**, y escribe tu anuncio personalizado (p. ej., "La puerta del garaje está abierta.").  
   - Guarda la rutina.

2. **Añade un Switch en SinricPro**  
   - En tu **panel de SinricPro**, crea un nuevo dispositivo **Switch**.  
   - Dale un nombre reconocible (p. ej., "Announcement Trigger").

3. **Dispara el anuncio**  
   - Desde tu código o sistema de automatización, envía un comando `sendPowerStateEvent` para encender el Switch a través de SinricPro.  
   - Google Home detecta este cambio de estado y activa la rutina asociada, haciendo que el Asistente de Google diga tu mensaje.

---

Código de ejemplo para ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

### Limitación:
Este enfoque solo admite **anuncios predefinidos**. Si necesitas enviar **mensajes dinámicos/en tiempo de ejecución** (p. ej., "La temperatura actual es de 23 °C"), Google Home **no lo admite** a través de las APIs estándar de Smart Home. En esos casos, tendrías que explorar soluciones alternativas como las **notificaciones de difusión en dispositivos Android** o **altavoces TTS de terceros**, que quedan fuera del marco oficial de Google Smart Home.

---
