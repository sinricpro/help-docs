---
title: Atajos de Apple
weight: 4
lang: es
description: Crea un atajo de Apple que enciende y apaga un relé conectado a un ESP32, ESP8266 o Raspberry Pi mediante la API de Sinric Pro.
---

### Introducción 

En este tutorial vamos a crear un atajo de Apple para encender y apagar un relé conectado a un ESP8266, ESP32 o Raspberry Pi mediante la API de Sinric Pro. 

### Requisitos previos : 

Completa primero el [Tutorial: encender y apagar un relé](https://help.sinric.pro/pages/tutorials/switch/part-1) para aprender a conectar tu ESP o tu Pi a Sinric Pro.

####  Paso 1: Crea una nueva clave de API en Sinric Pro

Inicia sesión en el [Portal de Sinric](https://portal.sinric.pro), selecciona **Credentials** y haz clic en **New API Key**; después haz clic en **save** y en **Copy** para copiar la clave de API recién creada

<img src="{{ site.github.url }}/public/img/apple-shortcut-api-create3.gif" alt="gif">

Puedes usar `curl` para enviar una solicitud de prueba a este endpoint de la API.

```curl
curl --location --request POST 'https://apple.sinric.pro/v1/shortcuts/actions' \
--header 'Content-Type: application/json' \
--data-raw '{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerState", "value": { "state" : "On"} }'
```
 

####  Paso 2: Crea el atajo de Apple

1. Crea un atajo nuevo y añade la acción Obtener contenido de URL.
2. En el campo URL, introduce la URL: `https://apple.sinric.pro/v1/shortcuts/actions`
3. Toca el campo Método y selecciona `POST`.
4. Toca el campo Cuerpo de la solicitud y añade el cuerpo de tu solicitud POST.

| Clave       |Tipo de entrada| Texto    |
| --------- | ------- | ------- |
| api_key   | Texto |    Tu clave de API del paso anterior.   |
| device_id | Texto |    El id de tu dispositivo, tomado del [Portal de Sinric Pro](https://portal.sinric.pro).  |
| action    | Texto |    Acción que se va a ejecutar. Ponla en `setPowerState`. Más abajo tienes otros ejemplos.  |
| value     | Diccionario |  Introduce `state` como clave y `On` u `Off` como valor.  |

¡Toca el botón de reproducción de abajo para probar la solicitud!

![Sinric Pro Apple shortcut]({{ site.github.url }}/public/img/sinricpro-apple-shortcut.png) 
 
Ahora puedes controlar tu ESP8266, ESP32 o Raspberry Pi con un atajo de Apple desde la pantalla de inicio.

####  Más ejemplos

Encender o apagar:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerState", "value": { "state" : "On"} }
```

Abrir o cerrar la puerta del garaje:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setMode", "value": { "mode" : "Open"} }
```

Abrir o cerrar las persianas:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setRangeValue", "value": { "rangeValue" : 100} }
```

Cambiar el nivel de potencia:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerLevel", "value": { "powerLevel": 50 } }
```

Cambiar el brillo:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setBrightness", "value": { "brightness": 50 } }
```

Activar el timbre:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "DoorbellPress", "value": {  "state": "pressed" } }
```

Establecer la temperatura objetivo:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "targetTemperature", "value": {  "temperature": 18 } }
```

Cambiar el color:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setColor", "value": {  "color": { "b": 0, "g": 0, "r": 0 } } }
```

Cambiar la temperatura de color:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setColorTemperature", "value": {"colorTemperature":2700} }
```




Más ejemplos : [https://github.com/sinricpro/sample_messages](https://github.com/sinricpro/sample_messages)
