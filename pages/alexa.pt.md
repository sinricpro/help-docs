---
title: Amazon Alexa
layout: post
lang: pt
description: Conecte o Sinric Pro à Amazon Alexa. Ative a skill Sinric Pro, vincule sua conta, descubra seus dispositivos ESP32 e ESP8266 e controle-os por voz.
---

O Sinric Pro tem uma **skill oficial Alexa Smart Home**. Depois que a skill é vinculada à sua conta Sinric Pro, todos os dispositivos da sua conta aparecem no app Alexa e podem ser controlados por voz, pelo app Alexa e pelas rotinas da Alexa.

Você não precisa escrever sua própria skill, e o dispositivo não precisa estar na mesma rede do seu Echo.

### Vincular a skill Sinric Pro

* Abra o app Amazon Alexa.
* Vá em **Skills e jogos**.
* Procure por [**Sinric Pro**](https://www.amazon.com.br/dp/B07ZT5VDT8).
* Toque em **ATIVAR PARA USO**.
* Informe suas credenciais do Sinric Pro na página de vinculação.
* Peça para a Alexa procurar novos dispositivos: *"Alexa, descobrir dispositivos"*.

Seus dispositivos Sinric Pro agora aparecem em **Dispositivos** no app Alexa.

### Adicionar mais dispositivos depois

Crie o dispositivo no [Portal Sinric Pro](https://portal.sinric.pro) e diga novamente *"Alexa, descobrir dispositivos"*. Não é preciso vincular a skill outra vez.

O nome do dispositivo no Sinric Pro é o nome que a Alexa reconhece. Escolha um nome fácil de pronunciar e diferente dos seus outros dispositivos.

### O que você pode dizer

*"Alexa, ligar Switch"*, *"Alexa, ajustar a lâmpada para 50 por cento"*, *"Alexa, qual é a temperatura da sala?"*

Os comandos de voz de cada tipo de dispositivo estão em [Utterances]({{ site.github.url }}/pages/utterances.html) (em inglês).

### Rotinas e anúncios

Sensores como sensores de contato, sensores de movimento e campainhas podem acionar rotinas da Alexa:

- [Enviar anúncios para a Alexa]({{ site.github.url }}/pt/pages/tutorials/general/how-to-send-announcements-to-alexa.pt.html)
- [Tutorial da campainha]({{ site.github.url }}/pt/pages/tutorials/doorbell/doorbell.pt.html)

### Solução de problemas

**A Alexa não encontra o dispositivo**

- Verifique se o dispositivo existe no [Portal](https://portal.sinric.pro).
- Verifique se a skill está vinculada à mesma conta Sinric Pro que possui o dispositivo.
- Execute a descoberta novamente: *"Alexa, descobrir dispositivos"*.

**A Alexa diz que o dispositivo não está respondendo**

- O dispositivo está offline. Verifique no Portal se ele está conectado e consulte a página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html).

**Está usando Espalexa ou fauxmoESP?**

Essas bibliotecas emulam uma ponte Hue na sua rede local e não fazem parte do Sinric Pro. Veja [Espalexa ou fauxmoESP "Device Not Found"?]({{ site.github.url }}/pt/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.pt.html).

### Primeiros passos

- [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html)
- [Tutoriais de início rápido]({{ site.github.url }}/pt/pages/quickstarts.pt.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
