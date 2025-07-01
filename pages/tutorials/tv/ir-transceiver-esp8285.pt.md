---
title: Tutorial de TV - Transceptor IR
layout: post
lang: pt
---


Nesta seção vamos controlar sua TV usando um transceptor IR e depois usar voz para controlar a TV via **Alexa, Google Home ou SmartThings**.

### Pré-requisitos:

1. Transceptor IR ESP8285 ESP-01M x1.

Neste tutorial, usaremos o Transceptor IR ESP8285 ESP-01M, uma opção popular facilmente disponível [online](https://www.google.com/search?q=esp8285+esp-01m+ir+transceiver). Embora nos concentremos neste módulo específico, os conceitos podem ser aplicados a outros transmissores infravermelhos de 38KHz também.

![Sinric Pro ir transceiver]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285.png) 

### Introdução rápida ao Transceptor IR ESP8285 ESP-01M

Um Módulo Transceptor WIFI Wireless Infravermelho ESP8285 é uma placa de circuito que combina duas funcionalidades:

**Transceptor Infravermelho (IR):** Esta parte permite que o módulo transmita e receba sinais infravermelhos. O transmissor IR está conectado ao `GPIO4` e o receptor IR está conectado ao `GPIO14`

**Módulo Wi-Fi ESP8285:** Este é um chip separado na placa que permite ao módulo conectar-se a uma rede Wi-Fi. ESP8285 é um ESP8266 com Flash de 1M, que pode suportar altas temperaturas até 125 graus Celsius.

**Para Carregar Firmware**: Conecte o Jumper `GPIO01` e `GND`.

**Para Executar Firmware**: Remova o Jumper e reconecte o programador USB

### Fiação

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285-wiring.png) 

| ESP8285   | TTL     |
| --------- | ------- |
| 5V        |    5V   |
| GND       |    GND  |
| TX        |    RX   |
| RX        |    TX   |



Antes de integrarmos com Sinric Pro, é importante verificar se o relé está conectado corretamente e você pode gravar sinais IR.

### Passo 1: Gravando IR

1. Instalar [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266)

    * Clique nos itens do menu "Sketch" -> "Include Library" -> "Manage Libraries...".

    * Digite `IRremoteESP8266` na caixa de pesquisa "Filter your search..." no canto superior direito.

    * Clique no resultado `IRremoteESP8266` da pesquisa.

    * Selecione a versão que deseja instalar e clique em `Install`.

2. Conecte o Jumper `GPIO0` ao `GND` para carregar o firmware.

3. Carregue o [IRrecvDumpV3](https://github.com/crankyoldgit/IRremoteESP8266/blob/master/examples/IRrecvDumpV3/IRrecvDumpV3.ino) Não há necessidade de alterar o sketch. Já está usando os pinos GPIO corretos.

![transceiver esp8285 flash]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285-flash.png) 

4. Remova o Jumper conectando `GPIO0` ao `GND` e reconecte o programador USB. Agora o chip ESP executará o sketch `IRrecvDumpV3`. Configure o BaudRate do Arduino Serial para `115200` para ver os logs.
  
6. Hora de gravar o botão **power on** do controle remoto da sua TV.

![record tv remote esp82266]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-record-tv-remote.png) 

Irá produzir os códigos IR como abaixo no Monitor Serial do Arduino.

Copie o array **rawData**

![record tv remote esp82266 arduino serial]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-record-tv-remote-serial-arduino.png) 


### Passo 2: Enviando IR

```c++
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

const uint16_t kIrLed = 4;

IRsend irsend(kIrLed);

uint16_t rawData[3] = {9004, 2218,  586};  // TODO: Mude isso para o botão power do seu controle remoto

void setup() {
  irsend.begin();
  Serial.begin(115200);
}

void loop() {
  Serial.println("a rawData capture from dump");
  irsend.sendRaw(rawData, 3 /* IR len */, 38 /* kHz */);  // TODO: ajuste IR len de acordo com o comprimento do rawData.
  delay(2000);
}

```

**Carregue o sketch acima e remova o Jumper para executar o firmware.**

Quando o sketch enviar o sinal, a TV deve ligar ou desligar. Agora você pode repetir o processo para gravar outros botões como volume para cima, para baixo, mudo etc..

### Passo 3: Criar um novo dispositivo de TV no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **TV**, descrição **TV** e selecione o tipo de dispositivo como **TV**.

* Clique em Outros e Clique em **Salvar**

![record tv remote esp82266 arduino serial]({{ site.github.url }}/public/img/sinricpro-tv-new-device.png) 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys-no-hilight.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Programação

#### 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo

Agora podemos completar o sketch de TV SinricPro com os códigos IR.

<script src="https://gist.github.com/kakopappa/7fa62119ea71ce381fde92711dc82bc3.js"></script>

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-ir-tv-demo.mp4" type="video/mp4">
</video>

Agora você deve conseguir controlar a TV via App Sinric Pro, Google Home, Alexa também.

### Solução de Problemas
Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para possíveis soluções para seu problema.



> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)