---
title: Alternativas ao Sinric Pro - Como o Sinric Pro se compara
layout: post
lang: pt
description: Compare o Sinric Pro com as alternativas para controlar um ESP32 ou ESP8266 por voz - Espalexa e fauxmoESP, Tasmota, ESPHome com Home Assistant, outras nuvens de IoT e uma skill Alexa própria.
---

Há várias maneiras de controlar um ESP32 ou ESP8266 com a Alexa, o Google Home ou um celular. Esta página descreve as principais abordagens, em que cada uma é boa e onde o Sinric Pro se encaixa.

### As opções em resumo

| Abordagem | Exemplos | Você mantém um servidor | Funciona fora de casa | Ideal para |
| --- | --- | --- | --- | --- |
| Nuvem de casa inteligente para dispositivos DIY | Sinric Pro | Não | Sim | Controle por voz e um app com pouca configuração |
| Emulação local de dispositivos | Espalexa, fauxmoESP | Não | Não | Um teste rápido só com a Alexa na sua própria rede |
| Firmware de código aberto | Tasmota | Opcional | Com configuração extra | Regravar dispositivos comprados prontos, controle local |
| Casa inteligente auto-hospedada | ESPHome com Home Assistant | Sim | Com configuração extra | Uma casa totalmente local que você mesmo gerencia |
| Painéis de IoT de uso geral | Blynk, Arduino Cloud | Não | Sim | Painéis, gráficos e dados de sensores |
| Sua própria skill e backend | Skill Alexa Smart Home com o seu próprio backend na nuvem | Sim | Sim | Controle total, quando você tem tempo para construir |

### Emulação local de dispositivos (Espalexa, fauxmoESP)

Essas bibliotecas fazem a placa se passar por uma ponte Philips Hue ou por um interruptor Belkin WeMo na sua rede Wi-Fi. Não há conta nem nuvem.

- Funciona apenas com a Alexa, e apenas na mesma rede.
- Suporta um conjunto pequeno de tipos de dispositivo (liga/desliga, brilho, cor).
- A descoberta depende do modelo do Echo e do seu roteador. Veja [Espalexa ou fauxmoESP "Device Not Found"?]({{ site.github.url }}/pt/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.pt.html)

### Firmware de código aberto (Tasmota)

O Tasmota é um firmware pronto que você configura em vez de escrever código. Ele é controlado localmente pela interface web, por HTTP ou por MQTT. O suporte dele à Alexa também usa emulação de Hue e WeMo.

Escolha-o quando quiser regravar uma tomada ou lâmpada inteligente que você já tem e manter tudo na sua própria rede.

### Casa inteligente auto-hospedada (ESPHome com Home Assistant)

O ESPHome gera o firmware a partir de um arquivo de configuração, e o Home Assistant é o servidor que controla os dispositivos. Tudo pode rodar localmente no seu próprio hardware.

Escolha essa opção quando quiser uma instalação totalmente local e não se importar em rodar e manter um servidor. Assistentes de voz e acesso de fora de casa exigem configuração adicional ou uma assinatura.

O Sinric Pro e o Home Assistant podem ser usados juntos: veja a [integração com o Home Assistant]({{ site.github.url }}/pt/pages/home-assistant.pt.html).

### Painéis de IoT de uso geral (Blynk, Arduino Cloud)

Essas plataformas têm foco em painéis: widgets, gráficos e dados dos seus dispositivos no celular ou em uma página web. Os limites de dispositivos, os preços e o suporte a assistentes de voz variam entre elas e mudam com o tempo, então consulte o site de cada plataforma para ver os detalhes atuais.

Escolha uma delas quando o seu projeto for principalmente de monitoramento e visualização de dados.

### Sua própria skill Alexa e backend

Você mesmo pode criar uma skill Alexa Smart Home, com o seu próprio backend na nuvem, vinculação da conta e conexão dos dispositivos. Isso dá a você controle total. Também é a opção mais trabalhosa, e é você quem mantém o backend.

Se você quer isso para um produto comercial sem construir o backend, veja o [Sinric Pro for Business]({{ site.github.url }}/pt/pages/for-business.pt.html).

### Onde o Sinric Pro se encaixa

O Sinric Pro foi criado para uma única tarefa: fazer um dispositivo DIY se comportar como um produto de casa inteligente.

- **Integrações de voz oficiais**: uma skill Alexa Smart Home e uma action do Google Home, então não há emulação nem skill para escrever.
- **Muitos tipos de dispositivo**: interruptores, luzes, termostatos, TVs, fechaduras, ventiladores, persianas, câmeras e sensores, além de [tipos de dispositivo personalizados]({{ site.github.url }}/pt/pages/custom-templates.pt.html).
- **Nenhum servidor para manter**: a placa se conecta ao Sinric Pro por uma conexão de saída, então não é preciso redirecionar portas.
- **Mais do que voz**: app para celular, [automações]({{ site.github.url }}/pt/pages/automations.pt.html), notificações push, [atualizações OTA]({{ site.github.url }}/pt/pages/ota.pt.html), uma [API]({{ site.github.url }}/pt/pages/api-guide.pt.html) e integrações com SmartThings, HomeKit (Homebridge), Home Assistant, IFTTT e Node-RED.
- **Controle local**: o app continua funcionando pelo Wi-Fi [quando a internet cai]({{ site.github.url }}/pt/pages/local-control.pt.html).
- **Grátis para começar**: 3 dispositivos no plano gratuito. Veja [Preços]({{ site.github.url }}/pt/pages/pricing.pt.html).

### Quando outra opção é mais adequada

- Você não quer **nenhuma nuvem**, nem mesmo para o controle por voz: use o ESPHome com Home Assistant, ou o Tasmota.
- Você só precisa da **Alexa na sua própria rede** para um teste rápido: o Espalexa ou o fauxmoESP podem ser suficientes.
- Você quer principalmente **gráficos e painéis** para dados de sensores: procure uma plataforma de painéis.

### Experimente o Sinric Pro

- [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html)
- [Sinric Pro como plataforma de IoT para ESP8266 e ESP32]({{ site.github.url }}/pt/pages/tutorials/general/iot-platform-esp8266-esp32.pt.html)
- [Crie uma conta gratuita](https://portal.sinric.pro/register)

> Este documento é open source. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
