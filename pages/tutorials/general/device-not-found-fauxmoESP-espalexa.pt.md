---
title: Espalexa ou fauxmoESP "Device Not Found"? Por que a emulação falha e como resolver
layout: post
lang: pt
description: 'A Alexa diz "Nenhum dispositivo novo encontrado" com Espalexa ou fauxmoESP? Por que a emulação de Hue e WeMo falha no ESP32 e no ESP8266, e como resolver.'
---

Se você está lendo isto, provavelmente está encarando o Monitor Serial tentando entender por que a Alexa diz "Nenhum dispositivo novo encontrado" ou "O dispositivo não está respondendo".

Você provavelmente vem usando bibliotecas como **Espalexa** ou **fauxmoESP**. Elas funcionaram muito bem durante anos, mas recentemente passaram a funcionar só de vez em quando. Talvez funcionem no seu Echo Dot de 2ª geração, mas falhem no de 4ª geração. Talvez funcionem por uma hora e depois desapareçam.

Aqui está o motivo técnico pelo qual a sua emulação está falhando, e a maneira confiável de resolver isso de vez.

## O problema: a emulação local está morrendo

Bibliotecas como Espalexa e fauxmoESP dependem de **emulação local**. Elas tentam enganar a Alexa, fazendo-a pensar que o seu ESP32 é um antigo interruptor **Belkin WeMo** ou uma ponte **Philips Hue**.

Para isso, elas usam **UPnP** (Universal Plug and Play) e **SSDP** (Simple Service Discovery Protocol) sobre multicast UDP.

### Por que isso falha hoje:

1.  **Atualizações de firmware da Amazon:** os dispositivos Amazon Echo mais novos (3ª geração, 4ª geração e Show) têm protocolos de segurança bem mais rígidos. Eles frequentemente ignoram os pacotes de broadcast UDP antigos e simples que essas bibliotecas geram.

2.  **Bloqueio pelo roteador:** se o seu dispositivo ESP e o seu dispositivo Alexa estiverem em bandas de frequência diferentes (2,4 GHz e 5 GHz) ou em sub-redes diferentes, muitos roteadores modernos bloqueiam os pacotes multicast necessários para a descoberta.

3.  **Sem ciclo de feedback:** a emulação é uma "gambiarra". Não é uma API oficial. Quando a Amazon muda um tempo limite de descoberta ou um requisito de cabeçalho, o seu dispositivo para de funcionar na hora, e você precisa esperar o mantenedor da biblioteca atualizá-la.

## A solução: integração pela nuvem (Sinric Pro)

A única forma de garantir estabilidade é parar de enganar a Alexa e começar a falar com ela oficialmente.

O **Sinric Pro** adota uma abordagem diferente. Em vez de ficar escutando pacotes UDP instáveis na sua rede local, o seu ESP8266/ESP32 abre uma **conexão WebSocket** segura e persistente com a nuvem do Sinric Pro.

Quando você pede à Alexa "Ligar a luz da cozinha":

1.  A Alexa fala com a **Sinric Pro Smart Home Skill** (integração oficial de nuvem para nuvem).

2.  O Sinric Pro envia um sinal pelo WebSocket aberto até o seu dispositivo ESP.

3.  O seu ESP reage instantaneamente.

Como a conexão parte do seu dispositivo, **ela atravessa firewalls e funciona de forma confiável entre sub-redes diferentes.**

## Guia de migração: do Espalexa para o Sinric Pro

Migrar é mais fácil do que você imagina. Você não precisa reescrever toda a sua lógica; basta trocar o tratamento da conexão.

### 1\. A configuração

  * **Espalexa:** você define o nome do dispositivo no código.

  * **Sinric Pro:** você cria um dispositivo no [Portal Sinric Pro](https://portal.sinric.pro), obtém um `DEVICE_ID`, `APP_KEY` e `APP_SECRET` e cola no seu código. *Isso separa o seu hardware da sua configuração.*


### 2\. Comparação de código

Veja lado a lado como tratar um interruptor de luz simples.

#### 1. O jeito antigo (fauxmoESP)

*Depende de comparações complexas em callbacks e de polling UDP.*

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
#### 2\. O jeito antigo (Espalexa)

Depende de um loop de descoberta local.

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

#### O jeito novo (Sinric Pro)

*Depende de callbacks de eventos.*

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

## Por que migrar?

  * **Confiabilidade:** funciona com **todas** as gerações da Alexa (Echo, Dot, Spot, Show, Flex).

  * **Recursos:** suporta nativamente dimerização, temperatura de cor, termostatos, persianas e portões de garagem, coisas muito difíceis de emular com os protocolos WeMo.

  * **App para celular:** você tem o app SinricPro para controlar seus dispositivos quando não está em casa (o Espalexa só funciona quando você está no mesmo WiFi).

**Obtenha suas credenciais gratuitamente no [SinricPro](https://portal.sinric.pro)**

 
