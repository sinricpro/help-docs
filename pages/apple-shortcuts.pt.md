---
title: Atalhos da Apple
weight: 4
lang: pt
---

### Introdução

Neste tutorial vamos criar um Atalho da Apple para ligar e desligar um relé conectado a um ESP8266, ESP32 ou Raspberry Pi usando a API Sinric Pro.

### Pré-requisitos:

Complete o [Tutorial - Ligar e desligar um Relé]({{ site.github.url }}/pt/pages/tutorials/switch/part-1.pt.html) para aprender como conectar seu ESP ou Pi ao Sinric Pro.

#### Passo 1: Criar uma nova Chave API no Sinric Pro

Faça login no [Portal Sinric](https://portal.sinric.pro), selecione **Credentials** e clique em **New API Key**, clique em **save** e **Copy** a Chave API recém-criada

<img src="{{ site.github.url }}/public/img/apple-shortcut-api-create3.gif" alt="gif">

Você pode usar o `curl` para enviar uma requisição de teste para este endpoint da API.

```curl
curl --location --request POST 'https://apple.sinric.pro/v1/shortcuts/actions' \
--header 'Content-Type: application/json' \
--data-raw '{ "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setPowerState", "value": { "state" : "On"} }'
```
 

#### Passo 2: Criar Atalho da Apple

1. Crie um novo atalho e adicione a ação Get Contents of URL.
2. No campo URL, digite a URL: `https://apple.sinric.pro/v1/shortcuts/actions`
3. Toque no campo Method e selecione `POST`.
4. Toque no campo Body e adicione o corpo da sua requisição POST.

| Chave     |Tipo de Entrada| Texto   |
| --------- | ------- | ------- |
| api_key   | Text |    Sua chave API de cima.   |
| device_id | Text |    Seu ID do dispositivo do [Portal Sinric Pro](https://portal.sinric.pro).  |
| action    | Text |    Ação a executar. defina como `setPowerState`. Veja abaixo para mais exemplos.  |
| value     | Dictionary |  Digite `state` como chave e valor `On` ou `Off`.  |

Toque no botão play abaixo para testar a requisição!

![Sinric Pro Apple shortcut]({{ site.github.url }}/public/img/sinricpro-apple-shortcut.png) 
 
Agora você pode controlar seu ESP8266, ESP32 ou Raspberry Pi via Atalho da Apple da tela inicial.

#### Mais exemplos

Ligar ou Desligar:

```json
{ "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setPowerState", "value": { "state" : "On"} }
```

Portão da garagem abrir/fechar:

```json
{ "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setMode", "value": { "mode" : "Open"} }
```

Persianas abrir/fechar:

```json
{ "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setRangeValue", "value": { "rangeValue" : 100} }
```

Alterar nível de potência:
```json
    { "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setPowerLevel", "value": { "powerLevel": 50 } }
```

Alterar brilho:
```json
    { "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setBrightness", "value": { "brightness": 50 } }
```

Acionar campainha:
```json
    { "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "DoorbellPress", "value": {  "state": "pressed" } }
```

Definir temperatura alvo:
```json
    { "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "targetTemperature", "value": {  "temperature": 18 } }
```

Alterar cor:
```json
    { "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setColor", "value": {  "color": { "b": 0, "g": 0, "r": 0 } } }
```

Alterar temperatura da cor:
```json
    { "api_key": "SUA_CHAVE_API_DE_CIMA", "device_id": "SEU_ID_DO_DISPOSITIVO", "action": "setColorTemperature", "value": {"colorTemperature":2700} }
```




Mais exemplos: [https://github.com/sinricpro/sample_messages](https://github.com/sinricpro/sample_messages)