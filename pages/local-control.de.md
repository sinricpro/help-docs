---
title: Lokale Steuerung
weight: 4
lang: de
description: Mit der lokalen Steuerung spricht die Sinric Pro App deine ESP32- und ESP8266-Geräte direkt über WLAN an, sodass sie auch bei einem Internetausfall weiter funktionieren.
---

Mit der lokalen Steuerung (Local Control) spricht die Sinric Pro App deine Geräte
**direkt über dein WLAN** an, ohne den Umweg über die Sinric Pro Cloud.

Das ist in zwei Situationen wichtig:

- **Dein Internet ist ausgefallen oder Sinric Pro ist nicht erreichbar.** Deine
  Geräte reagieren weiter auf die App, solange Smartphone und Gerät im selben
  WLAN sind.
- **Du möchtest eine schnellere Reaktion.** Ein Befehl geht vom Smartphone direkt
  an das Gerät, statt den Weg in die Cloud und zurück zu nehmen.

![Local Control]({{ site.github.url }}/public/img/local-control-framed.png)

---

## Was du brauchst

Die lokale Steuerung ist in das SDK eingebaut und **standardmäßig aktiv**. Im
Portal musst du nichts einstellen.

| SDK | Mindestversion |
|---|---|
| Arduino (ESP8266 / ESP32 / RP2040) | 5.0.0 |
| ESP-IDF | 1.3.0 |
| Raspberry Pi Pico W (C SDK) | 2.0.0 |
| Python | 6.0.0 |
| Node.js | 6.0.0 |
| MicroPython | 3.0.0 |

Außerdem brauchst du eine aktuelle Sinric Pro App, und das Smartphone muss im
**selben WLAN** sein wie das Gerät. Die lokale Steuerung funktioniert weder über
mobile Daten noch von außerhalb deines Zuhauses.

---

## So funktioniert es

### Das Gerät finden

Die App muss wissen, unter welcher Adresse ein Gerät erreichbar ist, bevor sie es
ansprechen kann. Sie versucht es in dieser Reihenfolge:

1. **mDNS.** Die Geräte kündigen `_sinricpro._udp.local.` im Netzwerk an. Das ist
   der schnellste Weg und findet alle Geräte mit einer einzigen Abfrage.
2. **Eine signierte Broadcast-Anfrage.** Liefert mDNS nichts – viele Router
   blockieren Multicast –, sendet die App eine signierte Anfrage an die lokale
   Broadcast-Adresse. Nur das Gerät, dem die ID gehört, antwortet, und seine
   Antwort verrät seine Adresse.
3. **Die zuletzt bekannte Adresse**, gemerkt vom letzten Mal, als das Gerät online war.

Das Ergebnis wird zwischengespeichert, die Suche läuft also einmal und nicht bei
jedem Tippen.

### Einen Befehl senden

Befehle gehen an **UDP-Port 3333** des Geräts. Die Nachricht ist exakt derselbe
signierte Umschlag, den auch die Cloud verwendet:

```json
{
  "header":    { "payloadVersion": 2, "signatureVersion": 1 },
  "payload":   { "action": "setPowerState", "deviceId": "...", "value": { "state": "On" } },
  "signature": { "HMAC": "..." }
}
```

Das Gerät prüft die Signatur, führt denselben Callback aus wie bei einer Anfrage
aus der Cloud und antwortet dem Smartphone. Dein Sketch ändert sich nicht: Ein
Gerät, das `onPowerState` von Alexa verarbeitet, verarbeitet es auch aus dem LAN.

---

## Sicherheit

- **Jeder Befehl wird** mit deinem App Secret per HMAC-SHA256 **signiert**, und
  das Gerät prüft die Signatur, bevor es etwas ausführt. Ein unsignierter oder
  veränderter Befehl wird abgelehnt.
- **Das App Secret wird nie über das Netzwerk übertragen.** Es signiert die
  Nachricht, ist aber nicht Teil davon.
- Ein Gerät **antwortet nur für Geräte-IDs, die ihm gehören**. LAN-Anfragen an
  andere IDs ignoriert es.
- Auf eine Anfrage, deren Prüfung fehlschlägt, kommt eine signierte Antwort
  *„Signature is invalid“*. Das ist Absicht: So kann die App ein falsches App
  Secret von einem ausgeschalteten Gerät unterscheiden.

---

## Ausschalten

Die lokale Steuerung ist standardmäßig aktiviert. So deaktivierst du sie:

**Arduino**

```cpp
#define SINRICPRO_NOMDNS   // keep local control, drop the mDNS announcement
```

**ESP-IDF** – in `menuconfig`, unter *SinricPro*:

```
CONFIG_SINRICPRO_ENABLE_LOCAL_CONTROL=n
```

**Python**

```python
config = SinricProConfig(app_key=..., app_secret=..., local_control=False)
```

**Node.js**

```javascript
await SinricPro.begin({ appKey: ..., appSecret: ..., localControl: false });
```

**MicroPython**

```python
sinricpro.start(APP_KEY, APP_SECRET, local_control=False)
```

---

## Fehlerbehebung

**Die App meldet „No devices found on this Wi-Fi network“**

- Prüfe, ob Smartphone und Gerät im **selben WLAN** sind. Viele Router legen ein
  Gastnetz in ein eigenes Subnetz, und das verhindert die Verbindung.
- Prüfe, ob das Gerät **eingeschaltet und verbunden** ist. Im seriellen Log
  sollte kurz nach dem Start `UDP: listening on port 3333` stehen.
- Manche Router schotten WLAN-Clients voneinander ab („AP-Isolation“ oder
  „Client-Isolation“). Damit kann die lokale Steuerung nicht funktionieren;
  schalte die Funktion in den Einstellungen deines Routers aus.
- Öffne die App zuerst einmal, während du online bist. Die App braucht deine
  Geräteliste und holt beim ersten Mal die Zugangsdaten jedes Geräts aus der Cloud.

**Es funktioniert und hört nach einem Neustart des Routers auf**

Wahrscheinlich hat sich die IP-Adresse des Geräts geändert. Öffne den Bildschirm
Local Control und ziehe zum Aktualisieren nach unten, oder reserviere im Router
eine feste Adresse für das Gerät.

**Befehle kommen langsam oder nur zeitweise an**

Gib dem Gerät nach dem Start ein paar Sekunden Zeit. Auf ESP32 und ESP8266
konkurriert der erste sichere Verbindungsaufbau zur Cloud um das Funkmodul, und
lokale Antworten können sich verzögern, bis er abgeschlossen ist.

**mDNS findet nie etwas**

Das kommt häufig vor und ist kein Fehler. Viele Heimrouter verwerfen
Multicast-Verkehr. Die App weicht automatisch auf eine Broadcast-Anfrage aus, die
Suche funktioniert also trotzdem.
