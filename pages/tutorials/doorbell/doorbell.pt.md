---
title: Campainha Inteligente usando ESP32, ESP8266 ou Raspberry Pi Pico W para Alexa, Google Home
layout: post
lang: pt
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
---

Nesta seção vamos criar uma **Campainha** usando um botão push (tátil) conectado a um **ESP32**, **ESP8266** ou **Raspberry Pi Pico W** e depois receber uma notificação na Alexa, Google Home, ou no aplicativo Sinric Pro.

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. Botão push x 1.
3. Resistor de 1K ~ 10K x 1
3. Cabos Jumper.

### Fiação do botão da Campainha

Vamos usar a abordagem Pull-Down para conectar nosso botão. Quando o botão é pressionado, digitalRead lê sinal HIGH (1).

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_doorbell-wiring-diagram.png) 

| MCU       | Pino GPIO    |
| --------- | ------- |
| ESP32     |    34   |
| ESP8266   |    4 (D2)  |
| Pico W    |    7    |

### Lendo o estado do botão

Vamos verificar se o sensor está conectado corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/b8db56b3315c83be6bda1069e9b6a5c8.js"></script>

![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png)

### Passo 1: Conectar ao Sinric Pro

#### Criar um novo dispositivo: campainha

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro e vá ao menu **Dispositivos** à esquerda.

* Clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **campainha**, descrição **campainha inteligente** e selecione o tipo como **Doorbell**.

* Clique em **Salvar** para criar o dispositivo

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-doorbell-create-device.png)

Uma vez que você clique no botão salvar, a Amazon Alexa detectará automaticamente o dispositivo que acabamos de criar (Se você vinculou nossa skill Alexa antes).

![Sinric Pro alexa doorbell notification]({{ site.github.url }}/public/img/sinricpro_alexa_doorbell_push_notification.jpg)

Se você não recebeu a notificação push, apenas peça à Alexa para descobrir dispositivos

#### Passo 1.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo

<script src="https://gist.github.com/kakopappa/f5853e57b534d08fbc1df2d299c71265.js"></script>

**Nota:** **As notificações de campainha da Alexa estão desabilitadas por padrão**. Você deve habilitá-las abrindo o aplicativo para receber a notificação DingDong na Alexa.

![Sinric Pro Alexa enable doorbell notification settings]({{ site.github.url }}/public/img/sinricpro-alexa-doorbell-settings.jpg)

{% include youtubePlayer.html id=page.youtubeId %}

{% include youtubePlayer.html id=page.youtubeId2 %}

### Solução de Problemas

- Botão push muito sensível? Você pode ajustar `debounce_delay` ou tentar a solução proposta em [issues/346](https://github.com/sinricpro/esp8266-esp32-sdk/issues/346)

- Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para possíveis soluções para seu problema.



> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)