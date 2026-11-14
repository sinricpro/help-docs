---
title: Guía de la API
weight: 5
lang: es
description: Guía de la API REST de Sinric Pro. Crea una clave de API, autentícate, lista tus dispositivos y envíales comandos por HTTP.
---

SinricPro usa REST para su API. Esto significa que intercambia los datos en JSON y sigue las prácticas habituales de HTTP para la comunicación.

### Autenticación : 

Para interactuar con la API de SinricPro necesitas una clave de API. Puedes crear y gestionar tus claves de API en el panel de SinricPro, dentro de la sección Credentials. Para crear una nueva clave de API, haz clic [aquí](https://portal.sinric.pro/credential/new/apikey)


![Sinric Pro - Create a new API key]({{ site.github.url }}/public/img/sinricpro-create-new-api-key.png)
 

#### Obtener todos los dispositivos

*Solicitud*

```javascript
curl -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://api.sinric.pro/api/v1/devices
```


*Respuesta*

```json
{
   "success":true,
   "devices":[{
      "name":"TV",
      ....
   }]
}
```


#### Obtener un dispositivo

*Solicitud*

```javascript
curl -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://api.sinric.pro/api/v1/devices/{device_id}
```


*Respuesta*

```json
{
   "success":true,
   "device":{
      "name":"TV",
      ....
   }
}
```


#### Encender un dispositivo

*Solicitud*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setPowerState", "value": "{\"state\":\"On\"}" }'
```

Nota: `value` es una cadena de texto. Usa `JSON.stringify()`

*Respuesta*

```json
{
    "success": true,
    "message": "OK. Your message has been queued for processing."
}
```
 

#### Escuchar los cambios de estado de un dispositivo

SinricPro da prioridad a la velocidad y evita los bloqueos. Todas las solicitudes de comandos se ponen en cola y se procesan de forma asíncrona, por lo que la respuesta puede no ser inmediata. Para recibir la confirmación o supervisar de forma continua el estado de un dispositivo, suscríbete a las actualizaciones a través de nuestro endpoint SSE (Server-Sent Events).

```javascript
curl -N --http2 -H "Accept:text/event-stream" -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://sse.sinric.pro/sse/stream
```


*Respuesta*

```
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:05 --:--:--     0
{"event":"deviceConnected","device":{"name":"lightbulb","id":"660a7edf061ee8c78078c5ab"}}
....
{"event":"deviceDisconnected","device":{"name":"switch2","id":"660a6c3d061ee8c78078bf3e"}}
...
{"event":"deviceMessageArrived","device": {"name":"switch2","id":"660a6c3d061ee8c78078bf3e","powerState":"On"}}
```


#### Abrir la puerta del garaje 

*Solicitud*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setMode", "value": "{\"mode\":\"Open\"}" }'
```

Nota: `value` es una cadena de texto. Usa `JSON.stringify()`

#### Abrir las persianas

*Solicitud*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setRangeValue", "value": "{\"rangeValue\": 100}" }'
```

Nota: `value` es una cadena de texto. Usa `JSON.stringify()`

#### Activar el timbre

*Solicitud*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "DoorbellPress", "value": "{\"state\": \"pressed\"}" }'
```

Nota: `value` es una cadena de texto. Usa `JSON.stringify()`


#### Tipo de dispositivo personalizado con Range o Mode

Nota: las capacidades como **Range** o **Mode** requieren el parámetro adicional `instanceId`

*Solicitud de Range*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "rangeInstance1", "action": "setRangeValue", "value": "{\"rangeValue\":41}" }'
```

*Solicitud de Mode*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "modeInstance1", "action": "setMode", "value": "{\"mode\":\"cool\"}" }'
```

Nota: `value` es una cadena de texto. Usa `JSON.stringify()`

#### Buscar dispositivos en tu cuenta

*Solicitud*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devicess/find' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "name" : "TV" }'
```
 
*Respuesta*

```json
{ "success":true,"devices": [ {"name": "TV"} ] }
```

La lista completa de endpoints de la API está disponible [aquí](https://apidocs.sinric.pro/)

¿Buscas más ejemplos?

 - [IFTTT]({{ site.github.url }}/es/pages/ifttt.es.html)  
 - [Apple Shortcuts]({{ site.github.url }}/es/pages/apple-shortcuts.es.html)
