---
title: Sinric Pro - Plataforma de nuvem IoT para ESP8266, ESP32 e Raspberry Pi Pico W
layout: post
lang: pt
description: O Sinric Pro é uma plataforma de nuvem IoT para ESP8266, ESP32 e Raspberry Pi Pico W. Controle seus dispositivos com Alexa, Google Home, app para celular e API. 3 dispositivos grátis.
---

O Sinric Pro é uma plataforma de nuvem que torna seus projetos IoT DIY compatíveis com casa inteligente. Você conecta um **ESP8266**, **ESP32** ou **Raspberry Pi Pico W** com poucas linhas de código e o controla por comandos de voz, por um app para celular, por automações ou pelo seu próprio software.

Você não precisa manter um servidor, abrir portas no roteador nem escrever uma skill da Alexa.

### O que você recebe

| Recurso | Descrição |
| --- | --- |
| Assistentes de voz | Amazon Alexa e Google Home, por meio da skill e da action oficiais do Sinric Pro |
| App para celular | App Sinric Pro para Android e iPhone/iPad |
| Plataformas de casa inteligente | Samsung SmartThings, [Homebridge (HomeKit)]({{ site.github.url }}/pt/pages/homebridge.pt.html), [Home Assistant]({{ site.github.url }}/pt/pages/home-assistant.pt.html), [IFTTT]({{ site.github.url }}/pt/pages/ifttt.pt.html), [Node-RED]({{ site.github.url }}/pt/pages/node-red.pt.html), [Atalhos da Apple]({{ site.github.url }}/pt/pages/apple-shortcuts.pt.html) |
| Tipos de dispositivo integrados | Interruptor, dimmer, lâmpada, termostato, TV, alto-falante, fechadura, ventilador, persianas, portão de garagem, campainha, câmera e sensores de temperatura, movimento, contato e qualidade do ar |
| Tipos de dispositivo personalizados | [Modelos de dispositivo]({{ site.github.url }}/pt/pages/custom-templates.pt.html): arraste e solte capacidades para montar seu próprio tipo de dispositivo e gerar o código |
| Automações | [Automações]({{ site.github.url }}/pt/pages/automations.pt.html) criadas com arrastar e soltar |
| Notificações push | Envie [notificações push]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) do seu dispositivo para o seu celular |
| Atualizações OTA | [Atualizações de firmware over-the-air]({{ site.github.url }}/pt/pages/ota.pt.html) sem acesso físico ao dispositivo |
| Controle local | O app continua controlando seus dispositivos pelo Wi-Fi [quando a internet cai]({{ site.github.url }}/pt/pages/local-control.pt.html) |
| API | [API REST]({{ site.github.url }}/pt/pages/api-guide.pt.html) para criar seus próprios apps e integrações |

### Hardware compatível

- **ESP8266** (NodeMCU, Wemos D1 mini, ESP-01 e outros)
- **ESP32** (incluindo ESP32-S3 e câmeras ESP32)
- **Raspberry Pi Pico W** (RP2040)
- **Arduino** UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010
- **Raspberry Pi** e qualquer computador que rode Python ou NodeJS

Há SDKs disponíveis para Arduino (C++), ESP-IDF, MicroPython, Python e NodeJS. Veja a [lista de SDKs]({{ site.github.url }}/).

### Como funciona

1. Crie um dispositivo no [Portal Sinric Pro](https://portal.sinric.pro) e copie as credenciais dele.
2. Adicione a biblioteca Sinric Pro ao seu sketch e grave na sua placa.
3. A placa se conecta ao Sinric Pro. Controle-a pelo app, pela Alexa, pelo Google Home ou pela API.

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>

bool onPowerState(const String &deviceId, bool &state) {
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true;
}

void setup() {
  // ... connect to Wi-Fi ...
  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

O passo a passo completo está em [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html).

### Preços

- **Plano gratuito**: 3 dispositivos. Não é preciso cartão de crédito.
- **Planos pagos**: por dispositivo por ano, ou dispositivos ilimitados por um preço anual fixo.

Veja [Preços]({{ site.github.url }}/pt/pages/pricing.pt.html) para conhecer os valores atuais.

### Para produtos e empresas

Se você está criando um produto para vender, o [Sinric Pro for Business]({{ site.github.url }}/pt/pages/for-business.pt.html) acrescenta provisionamento de dispositivos, gerenciamento de dispositivos e atualizações OTA para implantações comerciais.

### Comece agora

- [Crie uma conta gratuita](https://portal.sinric.pro/register)
- [Instale a biblioteca Sinric Pro]({{ site.github.url }}/pt/pages/tutorials/general/install-sinricpro-library.pt.html)
- [Tutoriais de início rápido]({{ site.github.url }}/pt/pages/quickstarts.pt.html)

> Este documento é de código aberto. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
