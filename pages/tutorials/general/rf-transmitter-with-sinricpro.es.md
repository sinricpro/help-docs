---
title: Tutorial de integración de un transmisor RF con SinricPro en ESP32
layout: post
lang: es
description: Controla luces, ventiladores y enchufes RF de 433MHz con Alexa y Google Home usando un ESP32, un transmisor RF y Sinric Pro.
---
 
Controla tus dispositivos RF (luces, ventiladores, enchufes) a través de Alexa, Google Home o la app de SinricPro, usando tu transmisor RF de 433MHz existente.

## Qué vas a conseguir

Vas a transformar tu ESP32, de un simple mando RF controlado por botones, en un **hub de domótica** capaz de recibir comandos de voz o de app y de transmitir los mismos códigos RF que ya has capturado.

---

## Requisitos previos

- Placa de desarrollo ESP32
- Módulo transmisor RF de 433MHz
- Arduino IDE (o PlatformIO)
- Red WiFi
- Cuenta de SinricPro: [https://portal.sinric.pro](https://portal.sinric.pro)

---

## Configuración del hardware

Conecta tu transmisor RF al ESP32:

| Pin del transmisor RF | GPIO del ESP32 |
|--------------------|------------|
| VCC                | 3.3V       |
| GND                | GND        |
| DATA               | GPIO 4     |

*(Puedes quitar los botones; son opcionales una vez que SinricPro está activo.)*

---

## Paso 1: Instala las librerías necesarias

En **Arduino IDE**:

1. Ve a `Sketch → Include Library → Manage Libraries`
2. Instala:
   - `RCSwitch` de Suat Özgür
   - `SinricPro` de SinricPro

---

## Paso 2: Configura los dispositivos en el Portal de SinricPro

1. Ve a [https://portal.sinric.pro](https://portal.sinric.pro)
2. Inicia sesión o crea una cuenta.
3. Haz clic en **"Add Device"** → Añade:
   - Un **Switch** para las luces → anota su `Device ID`
   - Un **Switch** o **Fan** para el ventilador → anota su `Device ID`
4. Ve a **"Account" → "Security"** → copia:
   - `APP KEY`
   - `APP SECRET`

---

## Paso 3: Sube el código de integración

Sustituye los marcadores por tus credenciales y tus códigos RF.

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

## Paso 4: ¡Pruébalo!

1. Sube el código a tu ESP32.
2. Abre el **Monitor Serie** (`Ctrl+Shift+M`) a 115200 baudios.
3. Espera a ver " WiFi Connected!" y "SinricPro Ready!".
4. Usa Alexa, el Asistente de Google o la app de SinricPro:
   - *"Alexa, enciende las luces"*
   - *"Hey Google, apaga el ventilador"*

Deberías ver la confirmación en el Monitor Serie y tu dispositivo RF debería responder.

---

## Extra: vuelve a añadir los botones físicos (opcional)

¿Quieres control por voz Y por botón? Simplemente combina tu lógica original de `loop()`:

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

## Avanzado: ¿ventilador de varias velocidades?

Si tu ventilador tiene velocidades Baja/Media/Alta, usa `SinricProFanUS` en lugar de `SinricProSwitch`:

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

> Necesitarás definir `CODE_LOW` y `CODE_MED` si tu mando los admite.

---

## Consejos de solución de problemas

- Comprueba bien tus códigos RF y la longitud de los pulsos.
- Asegúrate de que las credenciales WiFi y las claves de SinricPro sean correctas.
- Los Device ID deben coincidir exactamente (cópialos y pégalos desde el portal).
- Si el alcance RF es escaso, añade un cable de 17 cm como antena al transmisor.

---

## ¡Listo!

Acabas de conectar tus dispositivos RF antiguos con asistentes domóticos modernos, sin sustituir el hardware.

Dinos si quieres añadir más dispositivos, programaciones o respuesta local con botones (LEDs/zumbador).

--- 

**Siguiente paso:** Prueba a decir *"Alexa, descubre dispositivos"* y disfruta de tus artilugios RF controlados por voz.

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Control de TV con un transceptor IR]({{ site.github.url }}/es/pages/tutorials/tv/ir-transceiver-esp8285.es.html)
- [Tutorial de switch, parte 1: encender y apagar un relé]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html)
