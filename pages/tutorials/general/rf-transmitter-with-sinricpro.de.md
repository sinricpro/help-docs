---
title: ESP32 RF-Transmitter + SinricPro Integration Tutorial
layout: post
lang: de
description: Steuere 433-MHz-RF-Lampen, Ventilatoren und Steckdosen mit Alexa und Google Home über einen ESP32, einen RF-Transmitter und Sinric Pro.
---
 
Steuere deine RF-Geräte (Lampen, Ventilatoren, Steckdosen) per Alexa, Google Home oder der SinricPro App – mit deinem vorhandenen 433-MHz-RF-Transmitter!

## Was du erreichst

Du verwandelst deinen ESP32 von einer einfachen, per Taster gesteuerten RF-Fernbedienung in ein **Smart-Home-Hub**, das Sprach- und App-Befehle entgegennimmt und dieselben RF-Codes sendet, die du bereits aufgezeichnet hast.

---

## Voraussetzungen

- ESP32 Entwicklungsboard
- 433-MHz-RF-Transmitter-Modul
- Arduino IDE (oder PlatformIO)
- WLAN-Netzwerk
- SinricPro Konto: [https://portal.sinric.pro](https://portal.sinric.pro)

---

## Hardware-Einrichtung

Verbinde deinen RF-Transmitter mit dem ESP32:

| RF-Transmitter Pin | ESP32 GPIO |
|--------------------|------------|
| VCC                | 3,3V       |
| GND                | GND        |
| DATA               | GPIO 4     |

*(Du kannst die Taster entfernen – sie sind optional, sobald SinricPro aktiv ist.)*

---

## Schritt 1: Erforderliche Bibliotheken installieren

In der **Arduino IDE**:

1. Gehe zu `Sketch → Include Library → Manage Libraries`
2. Installiere:
   - `RCSwitch` von Suat Özgür
   - `SinricPro` von SinricPro

---

## Schritt 2: Geräte im SinricPro Portal einrichten

1. Gehe zu [https://portal.sinric.pro](https://portal.sinric.pro)
2. Melde dich an oder erstelle ein Konto.
3. Klicke auf **„Add Device“** → Füge hinzu:
   - Einen **Switch** für Lichter → Notiere dir die `Device ID`
   - Einen **Switch** oder **Fan** für den Ventilator → Notiere dir die `Device ID`
4. Gehe zu **„Account“ → „Security“** → Kopiere:
   - `APP KEY`
   - `APP SECRET`

---

## Schritt 3: Den Integrationscode hochladen

Ersetze die Platzhalter durch deine Zugangsdaten und RF-Codes.

```cpp
#include <Arduino.h>
#include <RCSwitch.h>
#include <WiFi.h>
#include <SinricPro.h>
#include <SinricProSwitch.h>

// ========================
// CONFIGURATION
// ========================

// WiFi Credentials
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

// SinricPro Credentials (from https://portal.sinric.pro)
#define APP_KEY    "YOUR_APP_KEY_HERE"
#define APP_SECRET "YOUR_APP_SECRET_HERE"

// Device IDs (from SinricPro portal)
#define LIGHTS_ID  "YOUR_LIGHTS_DEVICE_ID"
#define FAN_ID     "YOUR_FAN_DEVICE_ID"

// RF Codes (your captured codes)
const unsigned long CODE_LIGHTS = 13651983;
const unsigned long CODE_HIGH   = 13651971;
const unsigned long CODE_OFF    = 13652160;

// Initialize RF Transmitter
RCSwitch mySwitch = RCSwitch();

// ========================
// CALLBACK FUNCTIONS
// ========================

// Handle Lights (ON/OFF)
bool onLights(const String &deviceId, bool &state) {
  if (state) {
    mySwitch.send(CODE_LIGHTS, 24);
    Serial.println("RF -> Lights ON");
  } else {
    mySwitch.send(CODE_OFF, 24);
    Serial.println("RF -> Lights OFF");
  }
  return true; // Command handled successfully
}

// Handle Fan (ON=High / OFF=Off)
bool onFan(const String &deviceId, bool &state) {
  if (state) {
    mySwitch.send(CODE_HIGH, 24);
    Serial.println("RF -> Fan HIGH");
  } else {
    mySwitch.send(CODE_OFF, 24);
    Serial.println("RF -> Fan OFF");
  }
  return true;
}

// ========================
// SETUP
// ========================

void setup() {
  Serial.begin(115200);

  // Initialize RF Transmitter on GPIO 4
  mySwitch.enableTransmit(4);
  mySwitch.setPulseLength(228); // Adjust if needed

  // Connect to WiFi
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");

  // Attach callbacks to SinricPro devices
  SinricProSwitch &lights = SinricPro[LIGHTS_ID];
  lights.onPowerState(onLights);

  SinricProSwitch &fan = SinricPro[FAN_ID];
  fan.onPowerState(onFan);

  // Start SinricPro
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// ========================
// MAIN LOOP
// ========================

void loop() {
  SinricPro.handle(); // Keep connection alive & listen for commands
}
```

---

## Schritt 4: Testen!

1. Lade den Code auf deinen ESP32 hoch.
2. Öffne den **seriellen Monitor** (`Strg+Umschalt+M`) mit 115200 Baud.
3. Warte auf „WiFi Connected!“ und „SinricPro Ready!“
4. Verwende Alexa / Google Assistant / die SinricPro App:
   - *„Alexa, schalte die Lichter ein“*
   - *„Hey Google, schalte den Ventilator aus“*

Im seriellen Monitor solltest du eine Bestätigung sehen, und dein RF-Gerät sollte reagieren!

---

## Bonus: Physische Taster wieder hinzufügen (optional)

Du möchtest sowohl Sprach- als auch Tastersteuerung? Füge einfach deine ursprüngliche `loop()`-Logik zusammen:

```cpp
// GPIOs for buttons
const int BUTTON_LIGHTS = 12;
const int BUTTON_HIGH   = 13;
const int BUTTON_OFF    = 14;

void setup() {
  // ... [previous setup code]

  // Set buttons as INPUT_PULLUP
  pinMode(BUTTON_LIGHTS, INPUT_PULLUP);
  pinMode(BUTTON_HIGH, INPUT_PULLUP);
  pinMode(BUTTON_OFF, INPUT_PULLUP);
}

void loop() {
  SinricPro.handle(); // Must run frequently

  // Manual button control (active LOW)
  if (digitalRead(BUTTON_LIGHTS) == LOW) {
    mySwitch.send(CODE_LIGHTS, 24);
    Serial.println("Button: Lights ON");
    delay(500); // debounce
  }

  if (digitalRead(BUTTON_HIGH) == LOW) {
    mySwitch.send(CODE_HIGH, 24);
    Serial.println("Button: Fan HIGH");
    delay(500);
  }

  if (digitalRead(BUTTON_OFF) == LOW) {
    mySwitch.send(CODE_OFF, 24);
    Serial.println("Button: OFF");
    delay(500);
  }
}
```

---

## Fortgeschritten: Ventilator mit mehreren Geschwindigkeiten?

Wenn dein Ventilator Low/Med/High hat, verwende `SinricProFanUS` anstelle von `SinricProSwitch`:

```cpp
#include <SinricProFanUS.h>

#define FAN_ID "YOUR_FAN_ID"

bool onFanSpeed(const String &deviceId, int &speed) {
  switch (speed) {
    case 0: mySwitch.send(CODE_OFF, 24); break;
    case 1: mySwitch.send(CODE_LOW, 24); break;
    case 2: mySwitch.send(CODE_MED, 24); break;
    case 3: mySwitch.send(CODE_HIGH, 24); break;
  }
  return true;
}

// In setup():
SinricProFanUS &fan = SinricPro[FAN_ID];
fan.onPowerState([](const String &, bool &state) {
    // Optional: handle simple on/off if needed
    return true;
});
fan.onPowerLevel(onFanSpeed);     // Handles speed levels
```

> Du musst `CODE_LOW` und `CODE_MED` definieren, falls deine Fernbedienung diese unterstützt.

---

## Tipps zur Fehlerbehebung

- Überprüfe deine RF-Codes und die Pulslänge genau.
- Stelle sicher, dass WLAN-Zugangsdaten und SinricPro Schlüssel korrekt sind.
- Die Device IDs müssen exakt übereinstimmen (aus dem Portal kopieren, nicht abschreiben).
- Bei schwacher RF-Reichweite füge dem Transmitter einen 17 cm langen Draht als Antenne hinzu.

---

## Fertig!

Du hast jetzt deine bestehenden RF-Geräte mit modernen Smart Assistants verbunden – ohne die Hardware auszutauschen!

Sag Bescheid, wenn du weitere Geräte, Zeitpläne oder lokales Taster-Feedback (LEDs/Buzzer) hinzufügen möchtest!

--- 

**Nächster Schritt:** Sag einfach *„Alexa, discover devices“* – und genieße sprachgesteuerte RF-Gadgets!

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [TV-Steuerung mit einem IR-Transceiver]({{ site.github.url }}/de/pages/tutorials/tv/ir-transceiver-esp8285.de.html)
- [Switch-Tutorial Teil 1: ein Relais ein- und ausschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html)
