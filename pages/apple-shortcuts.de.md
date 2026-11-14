---
title: Apple Kurzbefehle
weight: 4
lang: de
description: Erstelle einen Apple Kurzbefehl, der ein Relais an einem ESP32, ESP8266 oder Raspberry Pi über die Sinric Pro API ein- und ausschaltet.
---

### Einführung 

In diesem Tutorial erstellen wir einen Apple Kurzbefehl, der ein Relais an einem ESP8266, ESP32 oder Raspberry Pi über die Sinric Pro API ein- und ausschaltet. 

### Voraussetzungen: 

Arbeite zuerst das [Tutorial - Relais ein- und ausschalten](https://help.sinric.pro/pages/tutorials/switch/part-1) durch. Dort lernst du, wie du deinen ESP oder Pi mit Sinric Pro verbindest.

####  Schritt 1: Neuen API-Schlüssel in Sinric Pro erstellen

Melde dich im [Sinric Portal](https://portal.sinric.pro) an, wähle **Credentials**, klicke auf **New API Key**, dann auf **save** und kopiere den neu erstellten API-Schlüssel mit **Copy**

<img src="{{ site.github.url }}/public/img/apple-shortcut-api-create3.gif" alt="gif">

Mit `curl` kannst du eine Testanfrage an diesen API-Endpunkt senden.

```curl
curl --location --request POST 'https://apple.sinric.pro/v1/shortcuts/actions' \
--header 'Content-Type: application/json' \
--data-raw '{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerState", "value": { "state" : "On"} }'
```
 

####  Schritt 2: Apple Kurzbefehl erstellen

1. Erstelle einen neuen Kurzbefehl und füge die Aktion „Inhalte von URL abrufen“ hinzu.
2. Trage im Feld „URL“ die URL ein: `https://apple.sinric.pro/v1/shortcuts/actions`
3. Tippe auf das Feld „Methode“ und wähle `POST`.
4. Tippe auf das Feld „Haupttext der Anfrage“ und füge den Body deiner POST-Anfrage hinzu.

| Schlüssel |Eingabetyp| Text    |
| --------- | ------- | ------- |
| api_key   | Text |    Dein API-Schlüssel von oben.   |
| device_id | Text |    Deine Geräte-ID aus dem [Sinric Pro Portal](https://portal.sinric.pro).  |
| action    | Text |    Die auszuführende Aktion. Setze sie auf `setPowerState`. Weitere Beispiele findest du unten.  |
| value     | Wörterbuch |  Trage `state` als Schlüssel und `On` oder `Off` als Wert ein.  |

Tippe unten auf die Wiedergabetaste, um die Anfrage zu testen!

![Sinric Pro Apple shortcut]({{ site.github.url }}/public/img/sinricpro-apple-shortcut.png) 
 
Jetzt kannst du deinen ESP8266, ESP32 oder Raspberry Pi per Apple Kurzbefehl vom Home-Bildschirm aus steuern.

####  Weitere Beispiele

Ein- oder ausschalten:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerState", "value": { "state" : "On"} }
```

Garagentor öffnen/schließen:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setMode", "value": { "mode" : "Open"} }
```

Jalousien öffnen/schließen:

```json
{ "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setRangeValue", "value": { "rangeValue" : 100} }
```

Leistungsstufe ändern:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setPowerLevel", "value": { "powerLevel": 50 } }
```

Helligkeit ändern:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setBrightness", "value": { "brightness": 50 } }
```

Türklingel auslösen:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "DoorbellPress", "value": {  "state": "pressed" } }
```

Zieltemperatur einstellen:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "targetTemperature", "value": {  "temperature": 18 } }
```

Farbe ändern:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setColor", "value": {  "color": { "b": 0, "g": 0, "r": 0 } } }
```

Farbtemperatur ändern:
```json
    { "api_key": "YOUR_API_KEY_FROM_ABOVE", "device_id": "YOUR_DEVICE_ID", "action": "setColorTemperature", "value": {"colorTemperature":2700} }
```




Weitere Beispiele: [https://github.com/sinricpro/sample_messages](https://github.com/sinricpro/sample_messages)
