---
title: SinricPro Geräteerstellungsassistent – Anleitung
layout: post
lang: de
description: Schritt-für-Schritt-Anleitung zum Sinric Pro Geräteerstellungsassistenten. Geräteinformationen, Benachrichtigungen, Timer und weitere Einstellungen.
---
 

Dieses Dokument bietet eine Schritt-für-Schritt-Anleitung zum Anlegen eines neuen Geräts über die SinricPro Plattform. Der Vorgang gliedert sich in vier Hauptabschnitte: Geräteinformationen, Benachrichtigungen, Timer und weitere Einstellungen.

## Schritt 1: Geräteinformationen

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-info.png) 

Der erste Schritt beim Anlegen eines neuen Geräts besteht darin, grundlegende Informationen zu deinem Gerät festzulegen.

### Felder

- **Device Name**
  - Gib einen eindeutigen Namen für dein Gerät ein. Dieser Name wird verwendet, um das Gerät innerhalb deines Smart-Home-Systems zu identifizieren.
  - *Beispiel*: „Bedroom Light“

- **Description**
  - Gib eine kurze Beschreibung des Zwecks oder der Funktion des Geräts an.
  - *Beispiel*: „Main light in the bedroom“

- **Device Type**
  - Wähle den passenden Gerätetyp aus dem Dropdown-Menü:
    - Switch
    - Dimmable Switch
    - Light
    - TV
    - Speaker
    - Thermostat
    - Fan
    - Lock
    - Doorbell
    - Temperature Sensor
    - Motion Sensor
    - Contact Sensor
    - Windows Air Conditioner
    - Blinds
    - Garage Door
    - Camera
    - Custom Devices (Sobald du ein eigenes Gerät unter [Device Template]({{ site.github.url }}/de/pages/custom-templates.de.html) angelegt hast, erscheint es hier)

  - *Hinweis*: Klicke auf den Link `(How to create a custom device type?)`, wenn du erfahren möchtest, wie man einen eigenen Gerätetyp anlegt.

- **App Key**
  - Der App Key ist deine eindeutige Zugangsdaten zur Authentifizierung deines IoT-Geräts, wenn es sich mit der SinricPro Plattform verbindet. Er dient als eindeutiger Bezeichner für dein jeweiliges Hardwaremodul innerhalb des SinricPro Ökosystems. Um ein einwandfreies Funktionieren sicherzustellen und Konflikte zu vermeiden, wähle einen App Key, der direkt deinem Hardwaremodul entspricht, und verwende für jedes Modul einen anderen Schlüssel. Bei der Registrierung eines Kontos wird automatisch ein Standard-App-Key für dich erzeugt.

- **Room & Home**
  - Weise das Gerät einem bestimmten Raum und Zuhause aus der Dropdown-Liste zu.
  - *Beispiel*: „Bed Room (Home)“

## Schritt 2: Benachrichtigungen

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-notifications.png) 

Lege fest, welche Ereignisse Benachrichtigungen für dein Gerät auslösen.

### Enable Notifications
- **Alerts**: Dieser Schalter wirkt als globaler Schalter, mit dem du Push-Benachrichtigungen von diesem Gerät an die SinricPro App generell ein- oder ausschalten kannst (z. B. `mySwitch.sendPushNotification("Hello SinricPro!")`).

### Ereignisbasierte Benachrichtigungen

Du kannst wählen, bei welchen Zustandsänderungen des Geräts du benachrichtigt werden möchtest:

| Benachrichtigungstyp | Beschreibung                                  |
|-------------------|----------------------------------------------|
| **Connect**       | Benachrichtigt, wenn sich das Gerät mit der Cloud verbindet. |
| **Disconnect**    | Benachrichtigt, wenn die Verbindung des Geräts getrennt wird.           |
| **On**            | Benachrichtigt, wenn das Gerät eingeschaltet wird.              |
| **Off**           | Benachrichtigt, wenn das Gerät ausgeschaltet wird.             |
| **Lock**          | Benachrichtigt, wenn das Schloss verriegelt wird                 |
| **Unlock**          | Benachrichtigt, wenn das Schloss entriegelt wird             |
| **Unlock**          | Benachrichtigt, wenn das Schloss entriegelt wird             |
| **PM2.5 Air Quality** | Benachrichtigt, wenn die Luftqualität über den μg/m3-Schwellenwert steigt |
| **PM2.5 Air Quality** | Benachrichtigt, wenn die Luftqualität unter den μg/m3-Schwellenwert fällt |
| **Motion**            | Benachrichtigt, wenn eine Bewegung erkannt wird (tagsüber oder nachts) |
| **Camera Motion**     | Benachrichtigt, wenn ein Bewegungsbild aufgenommen wird                 |
| **Camera Snapshot**   | Benachrichtigt, wenn ein Snapshot aufgenommen wird, und beschreibt per KI, was darauf zu sehen ist   |
| **Doorbell**   | Benachrichtigt, wenn die Türklingel gedrückt wird                            |
| **Open**       | Benachrichtigt, wenn geöffnet wird (Garage Door, Contact Sensor oder Blinds)                       |
| **Closed**       | Benachrichtigt, wenn geschlossen wird (Garage Door oder Contact Sensor)                       |
| **Temperature**       | Benachrichtigt, wenn die Temperatur über einen Schwellenwert steigt |
| **Temperature**       | Benachrichtigt, wenn die Temperatur unter einen Schwellenwert fällt |

Was ist die Retrigger Time?

> Das ist die Verzögerung zwischen einer Benachrichtigung und der nächsten. Sie verhindert, dass fortlaufend Push-Benachrichtigungen gesendet werden.

> **Tipp**: Nutze diese Optionen, um den Gerätestatus zu überwachen und Echtzeit-Updates per Push-Benachrichtigung über die SinricPro App oder verbundene Plattformen zu erhalten.


## Schritt 3: Timer

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-timers.png) 

Richte über cloud-verwaltete Timer automatische Ein-/Ausschaltvorgänge für dein Gerät ein. Die minimale Verzögerung beträgt 3 Sekunden. Das maximale Intervall darf 1 Tag nicht überschreiten.

### Auto Off
- **Enable**: Schalter zum Aktivieren von Auto-Off.
- **Delay**: Lege die Anzahl der Sekunden fest, nach denen sich das Gerät automatisch ausschaltet, sobald es eingeschaltet wurde.
  - *Standard*: `3 Sekunden` (anpassbar)
  - *Beispiel*: Auf `5` gesetzt → das Gerät schaltet sich 5 Sekunden nach dem Einschalten aus.

### Auto On
- **Enable**: Schalter zum Aktivieren von Auto-On.
- **Delay**: Lege die Anzahl der Sekunden fest, nach denen sich das Gerät automatisch einschaltet, sobald es ausgeschaltet wurde.
  - *Standard*: `3 Sekunden` (anpassbar)
  - *Beispiel*: Auf `10` gesetzt → das Gerät schaltet sich 10 Sekunden nach dem Ausschalten ein.

> **Hinweis**: Timer laufen über die Cloud – sie funktionieren nicht, wenn das Gerät vorübergehend offline ist.

> **Anwendungsfälle**:
> - Blinkende Lichter oder Stroboskop-Effekte.
> - Sicherheitsabschaltung für Heizgeräte oder Motoren.


## Schritt 4: Weiteres

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-others.png) 

Gib optionale Metadaten zu deinem Gerät an, insbesondere zum Energieverbrauch.

### Energieverbrauch (Schätzung)

Aktiviere diese Option, um die Energieschätzung zu nutzen. Der Server berechnet den Energieverbrauch des Geräts anhand der Ein-/Ausschaltzeiten. Den Verbrauch kannst du im Menü Energy Estimates im Portal einsehen.

#### Felder:
- **Stand by Wattage (W)**  
  Leistungsaufnahme, wenn das Gerät ausgeschaltet oder im Standby ist.  
  > *Beispiel*: Smart Plug = `0,5 W`, TV = `5 W`

- **On Wattage (W)**  
  Leistungsaufnahme, wenn das Gerät aktiv läuft.  
  > *Beispiel*: LED-Lampe = `9 W`, Ventilator = `50 W`

> **Warum das wichtig ist**:  
> Energiedaten helfen Nutzern, ihre Stromkosten über die Alexa Smart Dashboards abzuschätzen.

> **Empfehlung**:  
> Verwende Herstellerangaben oder ein Strommessgerät für genaue Werte.


### Gerätezustand beim Verbinden wiederherstellen

Wenn diese Funktion aktiviert ist, sendet der SinricPro Server automatisch den zuletzt bekannten Zustand des Geräts – etwa Power-Status, Helligkeit, eigene Einstellungen und andere relevante Daten – direkt nachdem sich das Gerät wieder verbindet.

War dein Gerät zum Beispiel **eingeschaltet**, als die Verbindung abbrach, sendet der Server diesen letzten bekannten Power-Status (`true`) beim Wiederverbinden an das Gerät – das löst deinen `onPowerState`-Callback aus und stellt automatisch den vorherigen Zustand wieder her.

### Eigene Einstellungen in SinricPro

Mit Custom Settings kannst du eigene, gerätespezifische Konfigurationsparameter festlegen und verwalten, die über die von SinricPro bereitgestellten Standard-Capabilities hinausgehen.

Zum Beispiel könntest du Custom Settings nutzen, um:  
- eine eingebaute LED ein- oder auszuschalten,
- eine minimale SSID-Signalstärke für die Verbindung mit einer SSID festzulegen,
- einen **Temperaturoffset** für einen Thermostat festzulegen,  
- ein Flag für einen **automatischen Neustart** nach einem Firmware-Update zu setzen,  
- eine **Standard-Helligkeitsstufe** für den Start zu konfigurieren.


[Vollständiges Settings-Tutorial]({{ site.github.url }}/de/pages/tutorials/general/sinricpro-settings-tutorial.de.html)

---

> Dieses Dokument ist Open Source. Einen Tippfehler entdeckt? Bitte erstelle ein [Issue](https://github.com/sinricpro/help-docs)
