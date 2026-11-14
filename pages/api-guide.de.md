---
title: API-Leitfaden
weight: 5
lang: de
description: Leitfaden zur Sinric Pro REST API. API-Schlüssel erstellen, authentifizieren, Geräte auflisten und Befehle per HTTP an deine Geräte senden.
---

SinricPro verwendet REST für seine API. Das heißt, die Daten werden als JSON ausgetauscht, und die Kommunikation folgt den üblichen HTTP-Konventionen.

### Authentifizierung: 

Um mit der SinricPro API zu arbeiten, brauchst du einen API-Schlüssel. Du kannst deine API-Schlüssel im SinricPro Dashboard im Bereich Credentials erstellen und verwalten. Um einen neuen API-Schlüssel zu erstellen, klicke [hier](https://portal.sinric.pro/credential/new/apikey)


![Sinric Pro - Create a new API key]({{ site.github.url }}/public/img/sinricpro-create-new-api-key.png)
 

#### Alle Geräte abrufen

*Anfrage*

```javascript
curl -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://api.sinric.pro/api/v1/devices
```


*Antwort*

```json
{
   "success":true,
   "devices":[{
      "name":"TV",
      ....
   }]
}
```


#### Ein Gerät abrufen

*Anfrage*

```javascript
curl -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://api.sinric.pro/api/v1/devices/{device_id}
```


*Antwort*

```json
{
   "success":true,
   "device":{
      "name":"TV",
      ....
   }
}
```


#### Ein Gerät einschalten

*Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setPowerState", "value": "{\"state\":\"On\"}" }'
```

Hinweis: `value` ist ein String. Verwende `JSON.stringify()`

*Antwort*

```json
{
    "success": true,
    "message": "OK. Your message has been queued for processing."
}
```
 

#### Auf Zustandsänderungen eines Geräts lauschen

SinricPro ist auf Geschwindigkeit ausgelegt und vermeidet Blockierungen. Alle Befehlsanfragen kommen in eine Warteschlange und werden asynchron verarbeitet, die Antwort kommt also unter Umständen nicht sofort. Um eine Bestätigung zu erhalten oder den Gerätestatus laufend zu überwachen, abonniere die Aktualisierungen über unseren SSE-Endpunkt (Server-Sent Events).

```javascript
curl -N --http2 -H "Accept:text/event-stream" -H "X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}" https://sse.sinric.pro/sse/stream
```


*Antwort*

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


#### Garagentor öffnen 

*Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setMode", "value": "{\"mode\":\"Open\"}" }'
```

Hinweis: `value` ist ein String. Verwende `JSON.stringify()`

#### Jalousien öffnen

*Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setRangeValue", "value": "{\"rangeValue\": 100}" }'
```

Hinweis: `value` ist ein String. Verwende `JSON.stringify()`

#### Türklingel auslösen

*Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "DoorbellPress", "value": "{\"state\": \"pressed\"}" }'
```

Hinweis: `value` ist ein String. Verwende `JSON.stringify()`


#### Benutzerdefinierter Gerätetyp mit Range oder Mode

Hinweis: Fähigkeiten wie **Range** oder **Mode** benötigen zusätzlich den Parameter `instanceId`

*Range-Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "rangeInstance1", "action": "setRangeValue", "value": "{\"rangeValue\":41}" }'
```

*Mode-Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "modeInstance1", "action": "setMode", "value": "{\"mode\":\"cool\"}" }'
```

Hinweis: `value` ist ein String. Verwende `JSON.stringify()`

#### Geräte in deinem Konto finden

*Anfrage*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devicess/find' \
--header 'X-SINRIC-API-KEY: {YOUR-API-KEY-HERE}' \
--header 'Content-Type: application/json' \
--data '{ "name" : "TV" }'
```
 
*Antwort*

```json
{ "success":true,"devices": [ {"name": "TV"} ] }
```

Alle API-Endpunkte findest du [hier](https://apidocs.sinric.pro/)

Du suchst weitere Beispiele?

 - [IFTTT]({{ site.github.url }}/de/pages/ifttt.de.html)  
 - [Apple Shortcuts]({{ site.github.url }}/de/pages/apple-shortcuts.de.html)
