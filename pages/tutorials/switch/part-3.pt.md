---
title: Tutorial de Interruptor Parte 3 - Múltiplos relés com múltiplos botões táteis (push)
layout: post
lang: pt
---

Nesta seção, continuaremos da [Parte 2]({{ site.github.url }}/pt/pages/tutorials/switch/part-2.pt.html) e adicionaremos múltiplos relés e botões táteis (também conhecidos como botões push)

### Pré-requisitos:

Os seguintes componentes são necessários.

| Componente                  | Quantidade |
| ---------                   | ------- |
| ESP32, ESP8266 ou RaspPi W  |    1     |
| Controlador de relé SPDT    |    4     |
| Botão push                  |    4     |
| Resistor de 10K ohm         |    4     | 
| Cabos jumper                |    4     | 
 
### Fiação
 
Vamos usar o método Pull-Down para conectar nosso botão push. Se você não tem certeza do que isso significa, consulte a [Parte 2]({{ site.github.url }}/pt/pages/tutorials/switch/part-2.pt.html) para mais detalhes.


| MCU       | Pino    | Componente    |
| --------- | ------- | ------- |
| ESP8266   |    D1   |    Relé   |
| ESP8266   |    D2   |    Relé   |
| ESP8266   |    D3   |    Relé   |
| ESP8266   |    D4   |    Relé   |
| ESP8266   |    D5   |    Botão Push   |
| ESP8266   |    D6   |    Botão Push   |
| ESP8266   |    D7   |    Botão Push   |
| ESP8266   |    D8   |    Botão Push   |
| ESP32     |    16   |    Relé   |
| ESP32     |    17   |    Relé   |
| ESP32     |    18   |    Relé   |
| ESP32     |    19   |    Relé   |
| ESP32     |    25   |    Botão Push   |
| ESP32     |    26   |    Botão Push   |
| ESP32     |    27   |    Botão Push   |
| ESP32     |    28   |    Botão Push   |

![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/MultiSwitch_advance_tactile-button.png) 

Agora vamos completar o sketch com botões push e relés com integração Sinric Pro.

<script src="https://gist.github.com/kakopappa/4c23e8fa19ffe37730cb0995dc2e15a9.js"></script>
 
### Solução de Problemas
Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para possíveis soluções para seu problema.


 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)