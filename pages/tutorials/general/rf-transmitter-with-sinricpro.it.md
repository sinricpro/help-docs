---
title: Tutorial di integrazione tra trasmettitore RF ESP32 e SinricPro
layout: post
lang: it
description: Controlla luci, ventilatori e prese RF a 433MHz con Alexa e Google Home usando un ESP32, un trasmettitore RF e Sinric Pro.
---
 
Controlla i tuoi dispositivi RF (luci, ventilatori, prese) tramite Alexa, Google Home o l'app SinricPro, usando il trasmettitore RF a 433MHz che hai già!

## Cosa otterrai

Trasformerai il tuo ESP32 da semplice telecomando RF a pulsanti in un **hub smart home** capace di ricevere comandi vocali o dall'app e di trasmettere gli stessi codici RF che hai già catturato.

---

## Prerequisiti

- Scheda di sviluppo ESP32
- Modulo trasmettitore RF a 433MHz
- Arduino IDE (o PlatformIO)
- Rete WiFi
- Account SinricPro: [https://portal.sinric.pro](https://portal.sinric.pro)

---

## Configurazione hardware

Collega il trasmettitore RF all'ESP32:

| Pin trasmettitore RF | GPIO ESP32 |
|--------------------|------------|
| VCC                | 3.3V       |
| GND                | GND        |
| DATA               | GPIO 4     |

*(Puoi rimuovere i pulsanti: sono opzionali una volta attivo SinricPro.)*

---

## Passo 1: Installa le librerie necessarie

In **Arduino IDE**:

1. Vai su `Sketch → Include Library → Manage Libraries`
2. Installa:
   - `RCSwitch` di Suat Özgür
   - `SinricPro` di SinricPro

---

## Passo 2: Configura i dispositivi nel Portal SinricPro

1. Vai su [https://portal.sinric.pro](https://portal.sinric.pro)
2. Accedi o crea un account.
3. Fai clic su **“Add Device”** → aggiungi:
   - Uno **Switch** per le luci → annota il suo `Device ID`
   - Uno **Switch** o un **Fan** per il ventilatore → annota il suo `Device ID`
4. Vai su **“Account” → “Security”** → copia:
   - `APP KEY`
   - `APP SECRET`

---

## Passo 3: Carica il codice di integrazione

Sostituisci i segnaposto con le tue credenziali e i tuoi codici RF.

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

## Passo 4: Prova il tutto!

1. Carica il codice sul tuo ESP32.
2. Apri il **Monitor seriale** (`Ctrl+Shift+M`) a 115200 baud.
3. Attendi “ WiFi Connected!” e “SinricPro Ready!”
4. Usa Alexa / Google Assistant / l'app SinricPro:
   - *"Alexa, accendi le luci"*
   - *"Hey Google, spegni il ventilatore"*

Dovresti vedere la conferma nel Monitor seriale e il tuo dispositivo RF dovrebbe rispondere!

---

## Bonus: ripristina i pulsanti fisici (opzionale)

Vuoi il controllo sia vocale che tramite pulsante? Basta unire la logica del tuo `loop()` originale:

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

## Avanzato: ventilatore multi-velocità?

Se il tuo ventilatore ha Low/Med/High, usa `SinricProFanUS` invece di `SinricProSwitch`:

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

> Dovrai definire `CODE_LOW` e `CODE_MED` se il tuo telecomando li supporta.

---

## Suggerimenti per la risoluzione dei problemi

- Controlla di nuovo i tuoi codici RF e la durata degli impulsi.
- Assicurati che le credenziali WiFi e le chiavi SinricPro siano corrette.
- I Device ID devono corrispondere esattamente (copia e incolla dal portal).
- Se la portata RF è scarsa, aggiungi un cavo da 17 cm come antenna al trasmettitore.

---

## Fatto!

Hai collegato i tuoi dispositivi RF più datati agli assistenti smart moderni, senza dover sostituire l'hardware!

Fammi sapere se vuoi aggiungere altri dispositivi, pianificazioni o feedback locale tramite pulsanti (LED/cicalino)!

--- 

**Prossimo passo:** prova a dire *"Alexa, scopri dispositivi"* e goditi i tuoi gadget RF controllati a voce!

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Controllo TV con un ricetrasmettitore IR]({{ site.github.url }}/it/pages/tutorials/tv/ir-transceiver-esp8285.it.html)
- [Tutorial switch parte 1: accendere e spegnere un relè]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html)

