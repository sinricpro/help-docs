---
title: Tutorial de Integração do Transmissor RF ESP32 + SinricPro
layout: post
lang: pt
description: Controle luzes, ventiladores e tomadas RF de 433MHz com Alexa e Google Home usando um ESP32, um transmissor RF e o Sinric Pro.
---
 
Controle seus dispositivos RF (luzes, ventiladores, tomadas) via Alexa, Google Home ou pelo app SinricPro — usando o transmissor RF de 433MHz que você já tem!

## O que você vai conseguir

Você vai transformar seu ESP32 de um simples controle remoto RF acionado por botões em uma **central de casa inteligente** capaz de receber comandos de voz/app e transmitir os mesmos códigos RF que você já capturou.

---

## Pré-requisitos

- Placa de desenvolvimento ESP32
- Módulo transmissor RF de 433MHz
- Arduino IDE (ou PlatformIO)
- Rede WiFi
- Conta SinricPro: [https://portal.sinric.pro](https://portal.sinric.pro)

---

## Montagem do hardware

Conecte seu transmissor RF ao ESP32:

| Pino do transmissor RF | GPIO do ESP32 |
|--------------------|------------|
| VCC                | 3.3V       |
| GND                | GND        |
| DATA               | GPIO 4     |

*(Você pode remover os botões — eles são opcionais depois que o SinricPro estiver ativo.)*

---

## Passo 1: Instalar as bibliotecas necessárias

No **Arduino IDE**:

1. Vá em `Sketch → Include Library → Manage Libraries`
2. Instale:
   - `RCSwitch` de Suat Özgür
   - `SinricPro` de SinricPro

---

## Passo 2: Configurar os dispositivos no Portal SinricPro

1. Acesse [https://portal.sinric.pro](https://portal.sinric.pro)
2. Faça login ou crie uma conta.
3. Clique em **“Add Device”** → Adicione:
   - Um **Switch** para as luzes → Anote o `Device ID` dele
   - Um **Switch** ou **Fan** para o ventilador → Anote o `Device ID` dele
4. Vá em **“Account” → “Security”** → Copie:
   - `APP KEY`
   - `APP SECRET`

---

## Passo 3: Carregar o código de integração

Substitua os marcadores pelas suas credenciais e pelos seus códigos RF.

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

## Passo 4: Teste!

1. Carregue o código no seu ESP32.
2. Abra o **Serial Monitor** (`Ctrl+Shift+M`) a 115200 baud.
3. Aguarde as mensagens “ WiFi Connected!” e “SinricPro Ready!”
4. Use Alexa / Google Assistant / App SinricPro:
   - *“Alexa, ligue as luzes”*
   - *“Ok Google, desligue o ventilador”*

Você deve ver a confirmação no Monitor Serial, e seu dispositivo RF deve responder!

---

## Bônus: Adicionar os botões físicos de volta (opcional)

Quer controlar por voz E por botão? Basta incorporar a lógica do seu `loop()` original:

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

## Avançado: Ventilador com várias velocidades?

Se o seu ventilador tem as velocidades Baixa/Média/Alta, use `SinricProFanUS` em vez de `SinricProSwitch`:

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

> Você precisará definir `CODE_LOW` e `CODE_MED` se o seu controle remoto tiver suporte a eles.

---

## Dicas de solução de problemas

- Confira novamente seus códigos RF e a duração do pulso.
- Verifique se as credenciais do WiFi e as chaves do SinricPro estão corretas.
- Os IDs dos dispositivos devem coincidir exatamente (copie e cole do portal).
- Se o alcance do RF for ruim, adicione um fio de 17cm como antena ao transmissor.

---

## Pronto!

Agora você conectou seus dispositivos RF antigos aos assistentes inteligentes modernos — sem precisar trocar nenhum hardware!

Avise se quiser adicionar mais dispositivos, agendamentos ou um retorno local para os botões (LEDs/buzzer)!

--- 

**Próximo passo:** Experimente dizer *“Alexa, descobrir dispositivos”* — e aproveite seus aparelhos RF controlados por voz!

### Tutoriais relacionados

- [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html)
- [Controle de TV com um transceptor IR]({{ site.github.url }}/pt/pages/tutorials/tv/ir-transceiver-esp8285.pt.html)
- [Tutorial de Switch parte 1: ligar e desligar um relé]({{ site.github.url }}/pt/pages/tutorials/switch/part-1.pt.html)

