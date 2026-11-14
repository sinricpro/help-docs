---
title: Home Assistant
weight: 4
lang: de
description: Sinric Pro über die offizielle Custom-Integration mit Home Assistant verbinden. Mit HACS installieren, API-Key eintragen und deine Sinric Pro Geräte aus Home Assistant steuern.
---

Mit der [SinricPro Home Assistant Integration](https://github.com/sinricpro/homeassistant-sinricpro) kannst du deine Sinric Pro Geräte aus Home Assistant steuern und in Home Assistant Automatisierungen verwenden.

- Einrichtung über die Oberfläche von Home Assistant. Kein YAML nötig.
- Statusaktualisierungen in Echtzeit.
- Sinric Pro Alarme erscheinen als Benachrichtigungen in Home Assistant.

**1. API-Key besorgen**

Wenn du noch keinen API-Key hast, melde dich im [Portal](https://portal.sinric.pro) an und klicke auf **Credentials**, oder [klicke hier](https://portal.sinric.pro/credential/new/apikey), um einen neuen API-Key zu erzeugen.

Kopiere den API-Key. Das ist **nicht** der App Key, den du im Code deines Geräts verwendest.

**2. Integration installieren**

*Mit HACS (empfohlen)*

1. Öffne HACS in deiner Home Assistant Instanz.
2. Klicke auf **Integrations**.
3. Klicke oben rechts auf die drei Punkte und wähle **Custom repositories**.
4. Füge die Repository-URL hinzu: `https://github.com/sinricpro/homeassistant-sinricpro`
5. Wähle als Kategorie **Integration** und klicke auf **Add**.
6. Suche nach **SinricPro** und installiere die Integration.
7. Starte Home Assistant neu.

*Manuell*

1. Lade die neueste Version von der [Release-Seite](https://github.com/sinricpro/homeassistant-sinricpro/releases) herunter.
2. Kopiere den Ordner `custom_components/sinricpro` in das Verzeichnis `custom_components` deiner Home Assistant Konfiguration.
3. Starte Home Assistant neu.

**3. Sinric Pro Konto hinzufügen**

1. Gehe zu **Settings** > **Devices & Services**.
2. Klicke auf **+ Add Integration**.
3. Suche nach **SinricPro**.
4. Gib deinen Sinric Pro API-Key ein und klicke auf **Submit**.

Deine Sinric Pro Geräte erscheinen jetzt in Home Assistant.

### Unterstützte Geräte

| Sinric Pro Gerätetyp | Home Assistant Plattform | Funktionen |
| --- | --- | --- |
| Switch | `switch` | Ein/Aus |
| Light | `light` | Ein/Aus, Helligkeit, RGB-Farbe, Farbtemperatur |
| Dimmable Switch | `light` | Ein/Aus, Leistungsstufe. Erscheint als dimmbares Licht |
| Blinds | `cover` | Öffnen/Schließen, Position |
| Garage Door | `cover` | Öffnen/Schließen |
| Doorbell | `event`, `button`, `sensor` | Klingelereignis, manuelles Auslösen, Zeitpunkt des letzten Klingelns |
| Fan | `fan` | Ein/Aus, Geschwindigkeit |
| Smart Lock | `lock` | Verriegeln/Entriegeln |
| Speaker | `media_player` | Ein/Aus, Lautstärke, Stummschaltung |
| TV | `media_player` | Ein/Aus, Lautstärke, Stummschaltung, Kanal vor/zurück, Wiedergabe/Pause |
| Thermostat | `climate` | Ein/Aus, Solltemperatur, Modus, aktuelle Temperatur, Luftfeuchtigkeit |
| Window AC Unit | `climate` | Thermostatfunktionen und Lüftermodus |
| Air Quality Sensor | `sensor` | PM1.0, PM2.5, PM10 |
| Contact Sensor | `binary_sensor` | Offen/Geschlossen |
| Motion Sensor | `binary_sensor` | Bewegung erkannt / nicht erkannt |
| Temperature Sensor | `sensor` | Temperatur, Luftfeuchtigkeit |

Eigene Gerätetypen, die mit [Gerätevorlagen]({{ site.github.url }}/de/pages/custom-templates.de.html) erstellt wurden, werden noch nicht unterstützt.

### Sinric Pro Alarme in Automatisierungen verwenden

Die Integration löst für jeden Sinric Pro Alarm ein `sinricpro_alert`-Ereignis aus. Beispiel:

```yaml
automation:
  - alias: "SinricPro Alert Notification"
    trigger:
      - platform: event
        event_type: sinricpro_alert
    action:
      - service: notify.mobile_app
        data:
          message: "{% raw %}{{ trigger.event.data.message }}{% endraw %}"
```

### Fehlerbehebung

**Fehler „Invalid API key“**

- Achte darauf, dass du den **API-Key** von der Seite **Credentials** im Portal verwendest und nicht den App Key.
- Prüfe, ob der API-Key noch gültig ist.

**Geräte erscheinen nicht**

- Prüfe, ob die Geräte in deinem Sinric Pro Konto vorhanden und im Portal online sind.
- Lade die Integration neu.

**Status wird nicht aktualisiert**

- Prüfe deine Netzwerkverbindung und suche in den Home Assistant Logs nach Verbindungsfehlern.

Um Debug-Logging zu aktivieren, füge Folgendes in deine `configuration.yaml` ein:

```yaml
logger:
  default: info
  logs:
    custom_components.sinricpro: debug
```

Wenn das Problem weiter besteht, eröffne ein Issue auf [GitHub](https://github.com/sinricpro/homeassistant-sinricpro/issues).

> Dieses Dokument ist Open Source. Tippfehler entdeckt? Bitte erstelle ein [Issue](https://github.com/sinricpro/help-docs)
