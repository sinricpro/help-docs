---
title: OTA-Updates
weight: 4
lang: de
youtubeId: FxtsQuC9mn8
description: Firmware-Updates Over-The-Air (OTA) für ESP32 und ESP8266 mit Sinric Pro einrichten. Firmware im Portal hochladen und Geräte aus der Ferne aktualisieren.
---


Dieses Tutorial zeigt dir Schritt für Schritt, wie du mit **SinricPro** **Over-The-Air (OTA) Firmware-Updates** für dein ESP32 oder ESP8266 Gerät einrichtest. Mit OTA aktualisierst du die Firmware deines Geräts aus der Ferne, ohne es an einen Computer anschließen zu müssen. Ideal für IoT-Geräte, die bereits im Einsatz sind!

---

## Was ist SinricPro OTA?

SinricPro OTA (Over-The-Air) ist eine Funktion, mit der dein ESP-Gerät **neue Firmware** vom Server **herunterlädt und installiert**, sobald das Update im SinricPro Dashboard ausgelöst wird.

- Versionsprüfung (SemVer wird unterstützt)
- Erzwungene Updates
- Fortschritts- und Fehlermeldungen

---

## Voraussetzungen

Bevor du anfängst, brauchst du:

- Ein ESP32, ESP8266 oder RP2040 Board
- Eine installierte Arduino IDE (oder PlatformIO)
- Die aktuelle [SinricPro Bibliothek](https://github.com/sinricpro/esp8266-esp32-sdk), installiert über den Bibliotheksverwalter
- Die Zugangsdaten deines WLANs
- Ein SinricPro Konto mit:
  - `APP_KEY` und `APP_SECRET` aus [portal.sinric.pro](https://portal.sinric.pro) -> Credentials
  - Der Device ID (`SWITCH_ID` usw.) deines Geräts aus [portal.sinric.pro](https://portal.sinric.pro) -> Devices

💡 *Vollständiger Code: [hier](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)*

---

## Einrichtung Schritt für Schritt

### 1. Benötigte Bibliotheken installieren

In der Arduino IDE:

- Gehe zu **Sketch → Bibliothek einbinden → Bibliotheken verwalten**
- Suche und installiere: `SinricPro`
---

### 2. Sketch konfigurieren

Kopiere den folgenden Beispielcode in deine Arduino IDE.

> **WICHTIG**: `FIRMWARE_VERSION` ist die Firmware-Version. Du siehst sie im Portal im Bereich Module. **Sie muss oberhalb von SinricPro.h definiert sein**

```cpp
// Uncomment the following line to enable serial debug output
// #define SINRICPRO_NOSSL // Uncomment if you have memory limitation issues.
// #define ENABLE_DEBUG // Enable SDK logging.

// Your firmware version. Must be above SinricPro.h. Do not rename this.
#define FIRMWARE_VERSION "1.1.1"  

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>

#if defined(ESP8266)
  #include <ESP8266WiFi.h>
  #include "ESP8266OTAHelper.h" // Ref: https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate
#elif defined(ESP32) 
  #include <WiFi.h>
  #include "ESP32OTAHelper.h" // Ref: https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate
#elif defined(ARDUINO_ARCH_RP2040)  
  #include <WiFi.h>
  #include "ESP8266OTAHelper.h" // Ref: https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate
#endif

#include "SemVer.h"
#include "SinricPro.h"
#include "SinricProSwitch.h"


#define WIFI_SSID   "YOUR-WIFI-SSID"
#define WIFI_PASS   "YOUR-WIFI-PASSWORD"
#define APP_KEY     "YOUR-APP-KEY"      // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET  "YOUR-APP-SECRET"   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define SWITCH_ID   "SWITCH_ID"         // Should look like "5dc1564130xxxxxxxxxxxxxx"

#define BAUD_RATE   115200             // Change baudrate to your need

bool handleOTAUpdate(const String& url, int major, int minor, int patch, bool forceUpdate) {
  Version currentVersion  = Version(FIRMWARE_VERSION);
  Version newVersion      = Version(String(major) + "." + String(minor) + "." + String(patch));
  bool updateAvailable    = newVersion > currentVersion;

  Serial.print("URL: ");
  Serial.println(url.c_str());
  Serial.print("Current version: ");
  Serial.println(currentVersion.toString());
  Serial.print("New version: ");
  Serial.println(newVersion.toString());
  if (forceUpdate) Serial.println("Enforcing OTA update!");

  // Handle OTA update based on forceUpdate flag and update availability
  if (forceUpdate || updateAvailable) {
    if (updateAvailable) {
      Serial.println("Update available!");
    }

    String result = startOtaUpdate(url);
    if (!result.isEmpty()) {
      SinricPro.setResponseMessage(std::move(result));
      return false;
    } 
    return true;
  } else {
    String result = "Current version is up to date.";
    SinricPro.setResponseMessage(std::move(result));
    Serial.println(result);
    return false;
  }
}

// setup function for WiFi connection
void setupWiFi() {
  Serial.printf("\r\n[Wifi]: Connecting");

#if defined(ESP8266)
  WiFi.setSleepMode(WIFI_NONE_SLEEP);
  WiFi.setAutoReconnect(true);
#elif defined(ESP32)
  WiFi.setSleep(false);
  WiFi.setAutoReconnect(true);
#endif

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }

  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
   SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];

  // setup SinricPro
  SinricPro.onConnected([]() {
    Serial.printf("Connected to SinricPro\r\n");
  });
  SinricPro.onDisconnected([]() {
    Serial.printf("Disconnected from SinricPro\r\n");
  });
  SinricPro.onOTAUpdate(handleOTAUpdate);
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE);
  Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

---

 
### Firmware-Version

```cpp
#define FIRMWARE_VERSION "1.1.1"
```

- Sie **muss** definiert sein, bevor `SinricPro.h` eingebunden wird.
- Halte dich an [Semantic Versioning](https://semver.org/) (z. B. `MAJOR.MINOR.PATCH`).
- Die Version erscheint im Portal -> Bereich Module, sobald sich das Gerät mit dem Server verbindet.

---
 

## Firmware für OTA vorbereiten

### Schritt 1: Kompilieren und Binärdatei exportieren

In der Arduino IDE:

- Gehe zu **Sketch → Kompilierte Binärdatei exportieren**
- Dadurch entsteht eine `.bin`-Datei in deinem Sketch-Ordner.

> Beispiel: `your_sketch.ino.esp32.bin`

---
 

## OTA-Updates auslösen

1. [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an.

2. Öffne links das Menü **OTA Updates**.

3. Klicke auf die Schaltfläche **Add OTA Update**.

4. Gib die neue Firmware-Version ein. Wähle die OTA-.bin-Datei (`your_sketch.ino.esp32.bin`) und die Module aus, auf die das OTA-Update angewendet werden soll.

5. Klicke auf **Save**

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-upload.png">

Sobald du auf **Save** klickst, sendet der Server eine OTA-Update-Anfrage an die ausgewählten Module. Ist dein Modul gerade offline, erhält es das Update, wenn es sich das nächste Mal mit dem Server verbindet.


<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-inprogress.png">

{% include youtubePlayer.html id=page.youtubeId %}


---

## OTA-Probleme debuggen

Aktiviere die Debug-Ausgabe, indem du diese Zeile einkommentierst:

```cpp
#define ENABLE_DEBUG
```

Achte im seriellen Monitor (`115200 baud`) auf:

- Status der WLAN-Verbindung
- Verbindung zu SinricPro
- OTA-URL und Versionsvergleich
- Download-Fortschritt und Fehler

Häufige Probleme:

| Symptom | Lösung |
|--------|----------|
| `Update failed: connection refused` | Prüfe, ob die URL öffentlich erreichbar ist |
| `Update failed: not enough space` | Verkleinere den Sketch oder verwende `SINRICPRO_NOSSL` |
| `Version not updating` | Stelle sicher, dass `FIRMWARE_VERSION` im Sketch erhöht wurde, bevor du die neue Binärdatei kompilierst |
| `Device not responding after OTA` | Prüfe auf Abstürze und füge Verzögerungen oder einen Watchdog-Reset ein |

---

## Bewährte Vorgehensweisen

- Teste OTA immer zuerst auf einem Entwicklungsgerät, bevor du es produktiv ausrollst.
- Verwende Semantic Versioning konsequent (`1.0.0`, `1.0.1`, `2.0.0` usw.).
- Halte die Firmware beim ESP8266 unter 1MB (wenn du 1MB Flash verwendest).
- Verwende HTTPS-URLs für sichere Downloads (SSL ist standardmäßig aktiviert).
- Füge in `loop()` nach `SinricPro.handle()` eine Verzögerung von 5-10 Sekunden ein, wenn das Gerät instabil läuft.
- Baue einen Rollback-Mechanismus oder einen „Safe Mode“ ein, falls OTA wiederholt fehlschlägt.

---

## FAQ

### F: Kann ich OTA mit anderen SinricPro Gerätetypen verwenden (z. B. DimSwitch, Thermostat usw.)?

✅ **Ja!** Der OTA-Mechanismus ist unabhängig vom Gerätetyp. Registriere einfach `SinricPro.onOTAUpdate(...)`, egal welche Geräteklasse du verwendest.

---

### F: Was passiert, wenn OTA fehlschlägt?

Das Gerät:
- Läuft mit der alten Firmware weiter.
- Meldet den Fehler über `SinricPro.setResponseMessage(...)`.
- Bleibt mit SinricPro verbunden (sofern es nicht abstürzt).

---

### F: Funktioniert OTA mit SSL/HTTPS?

✅ Ja, standardmäßig. Wenn du auf dem ESP8266 Speicherprobleme hast, kommentiere diese Zeile ein:

```cpp
#define SINRICPRO_NOSSL
```

> ⚠️ Das deaktiviert SSL. Verwende es nur in vertrauenswürdigen Netzwerken oder mit HTTP-URLs.

---

### F: Wie lange dauert OTA?

Das hängt ab von:
- Größe der Firmware (typisch: 500KB–1MB)
- WLAN-Geschwindigkeit
- Server-Geschwindigkeit

Im Durchschnitt: **30 Sekunden bis 3 Minuten**.

---

Den vollständigen Beispielcode findest du hier: 
[https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)


Wenn du ein OTA-Update über das lokale WLAN suchst, findest du es [hier]({{ site.github.url }}/de/pages/ota-updates/local-wifi-ota-update.de.html)
