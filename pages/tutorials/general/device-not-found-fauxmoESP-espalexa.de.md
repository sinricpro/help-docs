---
title: Espalexa oder fauxmoESP „Device Not Found“? Warum die Emulation fehlschlägt und wie du es behebst
layout: post
lang: de
description: 'Alexa meldet "No new devices found" bei Espalexa oder fauxmoESP? Warum die Hue- und WeMo-Emulation auf ESP32 und ESP8266 fehlschlägt, und wie du es behebst.'
---

Wenn du das hier liest, starrst du wahrscheinlich gerade auf einen Serial Monitor und fragst dich, warum Alexa „No new devices found“ oder „Device is unresponsive“ meldet.

Du hast wahrscheinlich Bibliotheken wie **Espalexa** oder **fauxmoESP** verwendet. Sie haben jahrelang gut funktioniert, aber in letzter Zeit ist es Glückssache geworden. Vielleicht funktionieren sie mit deinem Echo Dot Gen 2, aber nicht mit deinem Gen 4. Vielleicht funktionieren sie eine Stunde lang und verschwinden dann.

Hier ist der technische Grund, warum deine Emulation fehlschlägt – und der zuverlässige Weg, es dauerhaft zu beheben.

## Das Problem: Lokale Emulation stirbt aus

Bibliotheken wie Espalexa und fauxmoESP setzen auf **lokale Emulation**. Sie versuchen, Alexa glauben zu machen, dein ESP32 sei ein altes **Belkin WeMo**-Schaltgerät oder eine **Philips Hue** Bridge.

Dazu verwenden sie **UPnP** (Universal Plug and Play) und **SSDP** (Simple Service Discovery Protocol) über UDP-Multicast.

### Warum das heute fehlschlägt:

1.  **Amazon-Firmware-Updates:** Neuere Amazon Echo Geräte (Gen 3, Gen 4 und Show) haben deutlich strengere Sicherheitsprotokolle. Sie ignorieren oft die älteren, einfachen UDP-Broadcast-Pakete, die diese Bibliotheken erzeugen.

2.  **Router-Blockade:** Befinden sich dein ESP-Gerät und dein Alexa-Gerät in unterschiedlichen Frequenzbändern (2,4 GHz vs. 5 GHz) oder unterschiedlichen Subnetzen, blockieren viele moderne Router die für die Erkennung benötigten Multicast-Pakete.

3.  **Keine Rückmeldung:** Emulation ist ein „Hack“. Sie ist keine offizielle API. Ändert Amazon ein Discovery-Timeout oder eine Header-Anforderung, funktioniert dein Gerät sofort nicht mehr, und du musst warten, bis der Bibliotheks-Maintainer ein Update liefert.

## Die Lösung: Cloud-Integration (Sinric Pro)

Die einzige Möglichkeit, Stabilität zu garantieren, besteht darin, Alexa nicht mehr zu täuschen, sondern offiziell mit ihr zu sprechen.

**Sinric Pro** verfolgt einen anderen Ansatz. Statt auf wacklige UDP-Pakete im lokalen Netzwerk zu lauschen, öffnet dein ESP8266/ESP32 eine sichere, dauerhafte **WebSocket-Verbindung** zur Sinric Pro Cloud.

Wenn du Alexa bittest, „das Küchenlicht einzuschalten“:

1.  Alexa spricht mit dem **Sinric Pro Smart Home Skill** (offizielle Cloud-zu-Cloud-Integration).

2.  Sinric Pro sendet ein Signal über die offene WebSocket-Verbindung an dein ESP-Gerät.

3.  Dein ESP reagiert sofort.

Da die Verbindung von deinem Gerät aus aufgebaut wird, **durchbricht sie Firewalls und funktioniert zuverlässig über unterschiedliche Subnetze hinweg.**

## Migrationsanleitung: Von Espalexa zu Sinric Pro wechseln

Der Wechsel ist einfacher, als du denkst. Du musst nicht deine gesamte Logik neu schreiben, sondern nur den Verbindungshandler austauschen.

### 1\. Das Setup

  * **Espalexa:** Du definierst einen Gerätenamen im Code.

  * **Sinric Pro:** Du legst ein Gerät im [Sinric Pro Portal](https://portal.sinric.pro) an, erhältst `DEVICE_ID`, `APP_KEY`, `APP_SECRET` und fügst sie in deinen Code ein. *Das trennt deine Hardware von deiner Konfiguration.*


### 2\. Der Code-Vergleich

Hier siehst du im direkten Vergleich, wie du einen einfachen Lichtschalter ansteuerst.

#### 1. Der alte Weg (fauxmoESP)

*Setzt auf komplexe Callback-Vergleiche und UDP-Polling.*

```cpp
#include <fauxmoESP.h>

fauxmoESP fauxmo;

void setup() {
  // ... wifi setup ...
  
  // You had to define devices by string names locally
  fauxmo.addDevice("Kitchen Light");
  fauxmo.setPort(80); // Required for Gen3+ devices
  fauxmo.enable(true);

  fauxmo.onSetState([](unsigned char device_id, const char * device_name, bool state, unsigned char value) {
    // You had to check strings to find which device was triggered
    if (strcmp(device_name, "Kitchen Light") == 0) {
      Serial.println(state ? "ON" : "OFF");
      // Control relay here
    }
  });
}

void loop() {
  fauxmo.handle(); // Must run constantly to catch UDP packets
}
```
#### 2\. Der alte Weg (Espalexa)

Setzt auf eine lokale Discovery-Schleife.

```cpp

#include <Espalexa.h>

Espalexa espalexa;

void lightChanged(uint8_t brightness) {
   // Control your relay/LED here
}

void setup() {
  // ... wifi setup ...
  espalexa.addDevice("Kitchen Light", lightChanged);
  espalexa.begin();
}

void loop() {
  espalexa.loop(); // Must run constantly to catch UDP packets
}
```

#### Der neue Weg (Sinric Pro)

*Setzt auf Event-Callbacks.*

```cpp
#include <SinricPro.h>
#include <SinricProSwitch.h>

#define APP_KEY    "YOUR-APP-KEY"
#define APP_SECRET "YOUR-APP-SECRET"
#define SWITCH_ID  "YOUR-DEVICE-ID" // From Portal

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s\r\n", deviceId.c_str(), state?"on":"off");
  // Control your relay/LED here
  return true; // request handled properly
}

void setup() {
  // ... wifi setup ...
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);
  
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle(); // Maintains WebSocket connection
}
```

## Warum wechseln?

  * **Zuverlässigkeit:** Funktioniert mit **allen** Alexa-Generationen (Echo, Dot, Spot, Show, Flex).

  * **Funktionen:** Unterstützt nativ Dimmen, Farbtemperatur, Thermostate, Rollläden und Garagentore – Dinge, die mit WeMo-Protokollen nur sehr schwer zu emulieren sind.

  * **Mobile App:** Du erhältst die SinricPro Mobile App, um deine Geräte auch von außerhalb zu steuern (Espalexa funktioniert nur, wenn du im selben WLAN bist).

**Hol dir deine Zugangsdaten kostenlos bei [SinricPro](https://portal.sinric.pro)**
