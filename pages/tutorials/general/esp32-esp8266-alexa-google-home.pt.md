---
title: Como controlar um ESP32 ou ESP8266 com Alexa e Google Home
layout: post
lang: pt
locale: pt_BR
description: Conecte um ESP32 ou ESP8266 à Amazon Alexa e ao Google Home com o Sinric Pro. Guia passo a passo com código Arduino, sem criar uma skill Alexa e sem abrir portas no roteador.
---

Este guia mostra como conectar um **ESP32** ou **ESP8266** (NodeMCU, Wemos D1 mini) à **Amazon Alexa** e ao **Google Home**, para ligar e desligar por voz um relé, uma luz ou qualquer outra saída.

Você não precisa escrever uma skill Alexa nem uma action do Google Home, e não precisa abrir nenhuma porta no roteador.

### Como funciona

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png)

1. O seu ESP32 ou ESP8266 executa a biblioteca Sinric Pro e mantém uma conexão segura aberta com o servidor Sinric Pro.
2. Você vincula uma única vez a skill Alexa ou a action do Google Home **Sinric Pro** à sua conta Sinric Pro.
3. Quando você diz *"Alexa, ligar o interruptor"*, a Alexa envia o comando ao Sinric Pro, e o Sinric Pro o encaminha para a sua placa.

Como é a placa que se conecta ao servidor, isso funciona de qualquer lugar e em qualquer rede doméstica.

O Sinric Pro é uma skill oficial Alexa Smart Home e uma action oficial do Google Home. Não usa emulação de dispositivos. Se você vem do Espalexa ou fauxmoESP, veja [Espalexa ou fauxmoESP "Device Not Found"?]({{ site.github.url }}/pt/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.pt.html).

### O que você precisa

1. Uma placa de desenvolvimento ESP32 ou ESP8266.
2. Um módulo relé ou um LED para controlar.
3. Arduino IDE ou PlatformIO.
4. Uma [conta Sinric Pro](https://portal.sinric.pro/register) gratuita. Os limites do plano gratuito estão na página de [preços]({{ site.github.url }}/pt/pages/pricing.pt.html).

### Passo 1: Criar um dispositivo no Sinric Pro

* [Faça login](https://portal.sinric.pro) na sua conta Sinric Pro, abra o menu **Devices** à esquerda e clique em **Add Device**.
* Digite o nome do dispositivo **Switch**, a descrição **My First Switch** e selecione o tipo de dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Clique em **Save**.
* A próxima tela mostra as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **Device Id**, a **App Key** e o **App Secret**. ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

O nome do dispositivo é o que você vai dizer para a Alexa ou o Google Home, então escolha um nome fácil de pronunciar.

### Passo 2: Instalar a biblioteca Sinric Pro

Na Arduino IDE abra **Ferramentas > Gerenciar Bibliotecas**, procure por **SinricPro** e clique em **Instalar**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Para PlatformIO, dependências e erros comuns, veja [How to install the Sinric Pro library]({{ site.github.url }}/pt/pages/tutorials/general/install-sinricpro-library.pt.html).

### Passo 3: Enviar o código

O mesmo sketch funciona no ESP32 e no ESP8266. Informe os dados do seu Wi-Fi e os três valores do Passo 1.

```c++
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32)
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include <SinricProSwitch.h>

#define WIFI_SSID   "YOUR-WIFI-SSID"
#define WIFI_PASS   "YOUR-WIFI-PASSWORD"
#define APP_KEY     "YOUR-APP-KEY"
#define APP_SECRET  "YOUR-APP-SECRET"
#define SWITCH_ID   "YOUR-DEVICE-ID"

#if defined(ESP8266)
  #define RELAY_PIN 12   // D6
#elif defined(ESP32)
  #define RELAY_PIN 16
#endif

// called when Alexa, Google Home or the Sinric Pro app turns the switch on or off
bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s\r\n", deviceId.c_str(), state ? "on" : "off");
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true; // request handled
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }

  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);

  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

Se você não quiser escrever código, o recurso **Zero Code** do Portal pode gerar o sketch para você.

Quando a placa se conecta, o dispositivo aparece como online no [Portal](https://portal.sinric.pro) e você pode ligá-lo e desligá-lo por lá. Para a fiação de um relé, veja o [Tutorial de Interruptor Parte 1]({{ site.github.url }}/pt/pages/tutorials/switch/part-1.pt.html).

### Passo 4: Conectar à Amazon Alexa

* Abra o app Amazon Alexa.
* Vá em **Skills e jogos**.
* Procure por [**Sinric Pro**](https://www.amazon.com.br/dp/B07ZT5VDT8).
* Toque em **ATIVAR PARA USO**.
* Informe suas credenciais do Sinric Pro na página de vinculação.
* Peça para a Alexa procurar novos dispositivos: *"Alexa, descobrir dispositivos"*.
* Diga *"Alexa, ligar Switch"*.

Mais sobre descoberta de dispositivos, rotinas e solução de problemas: [Amazon Alexa]({{ site.github.url }}/pt/pages/alexa.pt.html).

### Passo 5: Conectar ao Google Home

* Abra o **Google Home** e toque em **Add** (Adicionar).
* Selecione **Setup Device** (Configurar dispositivo).
* Selecione **Works with Google Home**.
* Procure por [**Sinric Pro**](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=pt-BR).
* Vincule sua conta.
* Diga *"Ok Google, ligar Switch"*.

Os nomes das opções no app podem variar um pouco conforme o idioma.

Mais informações: [Google Home]({{ site.github.url }}/pt/pages/google-home.pt.html).

### Samsung SmartThings

* Abra o app SmartThings e toque no ícone **+**.
* Selecione **Dispositivo**.
* Selecione **Sinric Pro** entre as marcas.
* Vincule sua conta.
* Agora você pode ligar e desligar o **Switch** pelo painel.

Mais informações: [Samsung SmartThings]({{ site.github.url }}/pt/pages/smartthings.pt.html).

### O que mais você pode construir?

Um interruptor é só o ponto de partida. Os mesmos passos valem para outros tipos de dispositivo:

- [Luz com dimmer AC RobotDyn]({{ site.github.url }}/pt/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.pt.html)
- [Fita LED RGB]({{ site.github.url }}/pt/pages/tutorials/light/LED-Stripe-5050.pt.html)
- [Sensor de temperatura (DHT11, DHT22)]({{ site.github.url }}/pt/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.pt.html)
- [Sensor de movimento]({{ site.github.url }}/pt/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.pt.html)
- [Sensor de contato (porta / janela)]({{ site.github.url }}/pt/pages/tutorials/contact-sensors/contact.pt.html)
- [Campainha]({{ site.github.url }}/pt/pages/tutorials/doorbell/doorbell.pt.html)
- [Controle de TV com transceptor IR]({{ site.github.url }}/pt/pages/tutorials/tv/ir-transceiver-esp8285.pt.html)
- [Todos os tutoriais de início rápido]({{ site.github.url }}/pt/pages/quickstarts.pt.html)

### Perguntas frequentes

**Preciso criar minha própria skill Alexa?**

Não. Você ativa a skill Sinric Pro que já existe e vincula sua conta.

**Funciona com outras placas além do ESP32 e ESP8266?**

Sim. Há SDKs para Raspberry Pi Pico W, Arduino UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010, MicroPython, Python e NodeJS. Veja a [lista de SDKs]({{ site.github.url }}/pt/).

**Posso controlar mais de um dispositivo com uma única placa?**

Sim. Um ESP32 ou ESP8266 pode hospedar vários dispositivos Sinric Pro, por exemplo uma placa de relés de 4 canais. Veja [Modules]({{ site.github.url }}/pt/pages/modules.pt.html) e a [Parte 3 do tutorial de interruptor]({{ site.github.url }}/pt/pages/tutorials/switch/part-3.pt.html).

**Posso usar com Apple HomeKit ou Home Assistant?**

Sim. Veja [Homebridge (HomeKit)]({{ site.github.url }}/pt/pages/homebridge.pt.html) e [Home Assistant]({{ site.github.url }}/pt/pages/home-assistant.pt.html).

### Solução de problemas

Consulte a página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para ver possíveis soluções.

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
