---
title: Guida all'API
weight: 5
lang: it
description: Guida all'API REST di Sinric Pro. Crea una chiave API, autenticati, elenca i dispositivi e invia comandi ai tuoi dispositivi tramite HTTP.
---

SinricPro usa REST per la sua API. Questo significa che scambia i dati in formato JSON e segue le pratiche HTTP più comuni per la comunicazione.

### Autenticazione : 

Per interagire con l'API di SinricPro ti serve una chiave API. Puoi creare e gestire le tue chiavi API nella Dashboard di SinricPro, nella sezione Credentials. Per creare una nuova chiave API fai clic [qui](https://portal.sinric.pro/credential/new/apikey)


![Sinric Pro - Create a new API key]({{ site.github.url }}/public/img/sinricpro-create-new-api-key.png)
 

#### Ottenere tutti i dispositivi

*Richiesta*

```javascript
curl -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://api.sinric.pro/api/v1/devices
```


*Risposta*

```json
{
   "success":true,
   "devices":[{
      "name":"TV",
      ....
   }]
}
```


#### Ottenere un dispositivo

*Richiesta*

```javascript
curl -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://api.sinric.pro/api/v1/devices/{device_id}
```


*Risposta*

```json
{
   "success":true,
   "device":{
      "name":"TV",
      ....
   }
}
```


#### Accendere un dispositivo

*Richiesta*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setPowerState", "value": "{\"state\":\"On\"}" }'
```

Nota: `value` è una stringa. Usa `JSON.stringify()`

*Risposta*

```json
{
    "success": true,
    "message": "OK. Your message has been queued for processing."
}
```
 

#### Ascoltare i cambi di stato dei dispositivi

SinricPro dà priorità alla velocità ed evita le operazioni bloccanti. Tutte le richieste di comando vengono messe in coda e gestite in modo asincrono, quindi la risposta potrebbe non essere immediata. Per ricevere una conferma o monitorare in modo continuo lo stato dei dispositivi, iscriviti agli aggiornamenti tramite il nostro endpoint SSE (Server-Sent Events).

```javascript
curl -N --http2 -H "Accept:text/event-stream" -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://sse.sinric.pro/sse/stream
```


*Risposta*

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


#### Aprire la porta del garage 

*Richiesta*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setMode", "value": "{\"mode\":\"Open\"}" }'
```

Nota: `value` è una stringa. Usa `JSON.stringify()`

#### Aprire le tapparelle

*Richiesta*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setRangeValue", "value": "{\"rangeValue\": 100}" }'
```

Nota: `value` è una stringa. Usa `JSON.stringify()`

#### Attivare il campanello

*Richiesta*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "DoorbellPress", "value": "{\"state\": \"pressed\"}" }'
```

Nota: `value` è una stringa. Usa `JSON.stringify()`


#### Tipo di dispositivo personalizzato con Range o Mode

Nota: le capability come **Range** o **Mode** richiedono il parametro aggiuntivo `instanceId`

*Richiesta Range*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "rangeInstance1", "action": "setRangeValue", "value": "{\"rangeValue\":41}" }'
```

*Richiesta Mode*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "modeInstance1", "action": "setMode", "value": "{\"mode\":\"cool\"}" }'
```

Nota: `value` è una stringa. Usa `JSON.stringify()`

#### Trovare i dispositivi nel tuo account

*Richiesta*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devicess/find' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "name" : "TV" }'
```
 
*Risposta*

```json
{ "success":true,"devices": [ {"name": "TV"} ] }
```

L'elenco completo degli endpoint dell'API è disponibile [qui](https://apidocs.sinric.pro/)

Cerchi altri esempi?

 - [IFTTT]({{ site.github.url }}/it/pages/ifttt.it.html)  
 - [Apple Shortcuts]({{ site.github.url }}/it/pages/apple-shortcuts.it.html)
