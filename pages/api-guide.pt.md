---
title: Guia da API
weight: 5
lang: pt
---

SinricPro usa REST para sua API. Isso significa que usa JSON para troca de dados e segue práticas HTTP comuns para comunicação.

### Autenticação:

Para interagir com a API do SinricPro, você precisará de uma chave de API. Você pode criar e gerenciar suas chaves de API dentro do Painel SinricPro na seção Credenciais. Para criar uma nova Chave de API clique [aqui](https://portal.sinric.pro/credential/new/apikey)

![Sinric Pro - Create a new API key]({{ site.github.url }}/public/img/sinricpro-create-new-api-key.png)

*Solicitação*

```javascript
curl -X POST 'https://api.sinric.pro/api/v1/auth' --header 'x-sinric-api-key: a614xxxx-xxxx-xxxx-xxxx-xxxxxxxx'
```

*Resposta*

```json
 {
    "success": true,
    "message": "OK.",
    "accessToken": "eyJhbG.xxxxxxxxx.xxxxxxxxxxxxxxx...",
    "refreshToken": "9i4GV2Llpsl87FoT1HvQcxaybP3xxxxxxxxxxxxxxxx..",
    "expiresIn": 604800
}
```

`access Token` é seu token de acesso. O token de acesso concede autorização para futuras chamadas de API. Lembre-se, ele expirará após `604800` segundos.

### Casos de uso comuns da API:

#### Obter todos os dispositivos

*Solicitação*

```javascript
curl -X GET 'https://api.sinric.pro/api/v1/devices' --header 'Authorization: Bearer {accessToken}'
```

*Resposta*

```json
{
   "success":true,
   "devices":[
      {
         "name":"TV"
      }
   ]
}
```

#### Obter um dispositivo

*Solicitação*

```javascript
curl -X GET 'https://api.sinric.pro/api/v1/devices/{device_id}' --header 'Authorization: Bearer {accessToken}'
```

*Resposta*

```json
{
   "success":true,
   "device":{
         "name":"TV"
    }
}
```

#### Ligar um dispositivo

*Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setPowerState", "value": "{\"state\":\"On\"}" }'
```

Nota: `value` é uma string. Use `JSON.stringify()`

*Resposta*

```json
{
    "success": true,
    "message": "OK. Your message has been queued for processing."
}
```

#### Tipo de dispositivo personalizado com alcance ou modo

*Range Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "rangeInstance1", "action": "setRangeValue", "value": "{\"rangeValue\":41}" }'
```

*Mode Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "instanceId" : "modeInstance1", "action": "setMode", "value": "{\"mode\":\"cool\"}" }'
```

Nota: `value` é uma string. Use `JSON.stringify()`

Se você preferir **uma única chamada de API** para controlar seus dispositivos, explore exemplos em [IFTTT]({{ site.github.url }}/pt/pages/ifttt.html) ou [Apple Shortcuts]({{ site.github.url }}/pt/pages/apple-shortcuts.html). Estes podem fornecer uma abordagem mais amigável para controle básico.

#### Ouvindo mudanças de estado do dispositivo

SinricPro prioriza velocidade e evita bloqueios. Todas as solicitações de comando são enfileiradas e tratadas de forma assíncrona, significando que a resposta pode não ser imediata. Para receber confirmação ou monitorar continuamente o status do dispositivo, inscreva-se em atualizações através do nosso endpoint SSE (Server-Sent Events).

```javascript
curl -N --http2 -H "Accept:text/event-stream" https://portal.sinric.pro/sse/stream?accessToken={accessToken}
```

*Resposta*

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

#### Abrir porta da garagem

*Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setMode", "value": "{\"mode\":\"Open\"}" }'
```

Nota: `value` é uma string. Use `JSON.stringify()`

#### Abrir persianas

*Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "setRangeValue", "value": "{\"rangeValue\": 100}" }'
```

Nota: `value` é uma string. Use `JSON.stringify()`

#### Acionar campainha

*Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devices/{device_id}/action' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "type": "request", "action": "DoorbellPress", "value": "{\"state\": \"pressed\"}" }'
```

Nota: `value` é uma string. Use `JSON.stringify()`

#### Encontrar dispositivos em sua conta

*Solicitação*

```javascript
curl --location 'https://api.sinric.pro/api/v1/devicess/find' \
--header 'Authorization: Bearer {accessToken}' \
--header 'Content-Type: application/json' \
--data '{ "name" : "TV", "description" : "....." }'
```
 
*Resposta*

```json
{ "success":true,"devices": [ {"name": "TV"} ] }
```

Endpoints completos da API estão disponíveis [aqui](https://apidocs.sinric.pro/)

Procurando por mais exemplos?

 - [IFTTT]({{ site.github.url }}/pt/pages/ifttt.html)  
 - [Apple Shortcuts]({{ site.github.url }}/pt/pages/apple-shortcuts.html)