---
title: Comandi Rapidi di Apple
weight: 4
lang: it
description: Crea un comando rapido di Apple che accende e spegne un relè collegato a un ESP32, ESP8266 o Raspberry Pi tramite l'API di Sinric Pro.
---

### Introduzione 

In questo tutorial creiamo un comando rapido di Apple (Apple Shortcut) per accendere e spegnere un relè collegato a un ESP8266, ESP32 o Raspberry Pi tramite l'API di Sinric Pro. 

### Prerequisiti : 

Completa prima il [Tutorial - Accendere e spegnere un relè](https://help.sinric.pro/pages/tutorials/switch/part-1) per imparare a collegare il tuo ESP o Pi a Sinric Pro.

####  Passo 1: Crea una nuova chiave API in Sinric Pro

Accedi al [Portale Sinric](https://portal.sinric.pro), seleziona **Credentials** e fai clic su **New API Key**, poi fai clic su **save** e su **Copy** per copiare la chiave API appena creata

<img src="{{ site.github.url }}/public/img/apple-shortcut-api-create3.gif" alt="gif">

Puoi usare `curl` per inviare una richiesta di prova a questo endpoint dell'API.

```curl
curl --location --request POST 'https://apple.sinric.pro/v1/shortcuts/actions' \
--header 'Content-Type: application/json' \
--data-raw '{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerState", "value": { "state" : "On"} }'
```
 

####  Passo 2: Crea il comando rapido di Apple

1. Crea un nuovo comando rapido e aggiungi l'azione Ottieni contenuti dell'URL (Get Contents of URL).
2. Nel campo URL inserisci l'indirizzo: `https://apple.sinric.pro/v1/shortcuts/actions`
3. Tocca il campo Metodo e seleziona `POST`.
4. Tocca il campo Corpo richiesta e aggiungi il corpo della tua richiesta POST.

| Chiave    |Tipo di input| Testo   |
| --------- | ------- | ------- |
| api_key   | Testo |    La tua chiave API creata sopra.   |
| device_id | Testo |    L'ID del tuo dispositivo dal [Portale Sinric Pro](https://portal.sinric.pro).  |
| action    | Testo |    L'azione da eseguire. Imposta `setPowerState`. Vedi sotto per altri esempi.  |
| value     | Dizionario |  Inserisci `state` come chiave e `On` oppure `Off` come valore.  |

Tocca il pulsante di riproduzione in basso per provare la richiesta!

![Sinric Pro Apple shortcut]({{ site.github.url }}/public/img/sinricpro-apple-shortcut.png) 
 
Ora puoi controllare il tuo ESP8266, ESP32 o Raspberry Pi con un comando rapido di Apple dalla schermata Home.

####  Altri esempi

Accensione o spegnimento:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerState", "value": { "state" : "On"} }
```

Apertura/chiusura della porta del garage:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setMode", "value": { "mode" : "Open"} }
```

Apertura/chiusura delle tapparelle:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setRangeValue", "value": { "rangeValue" : 100} }
```

Modifica del livello di potenza:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerLevel", "value": { "powerLevel": 50 } }
```

Modifica della luminosità:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setBrightness", "value": { "brightness": 50 } }
```

Attivazione del campanello:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "DoorbellPress", "value": {  "state": "pressed" } }
```

Impostazione della temperatura desiderata:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "targetTemperature", "value": {  "temperature": 18 } }
```

Modifica del colore:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setColor", "value": {  "color": { "b": 0, "g": 0, "r": 0 } } }
```

Modifica della temperatura di colore:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setColorTemperature", "value": {"colorTemperature":2700} }
```




Altri esempi: [https://github.com/sinricpro/sample_messages](https://github.com/sinricpro/sample_messages)
