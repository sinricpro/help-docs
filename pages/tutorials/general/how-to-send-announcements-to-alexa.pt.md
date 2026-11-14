---
title: Como enviar anúncios de voz pela Alexa usando o SinricPro
layout: post
lang: pt
description: Envie anúncios de voz para a Alexa a partir de um ESP32 ou ESP8266 com o Sinric Pro, usando um sensor de contato e uma rotina da Alexa.
---

A API Alexa Smart Home da Amazon não oferece suporte nativo ao envio de anúncios de voz arbitrários (ou seja, mensagens personalizadas de texto para fala). No entanto, você pode obter essa funcionalidade de forma indireta, usando apenas métodos oficialmente suportados, combinando as **rotinas da Alexa** com um **Switch** no SinricPro.

## Método: rotinas da Alexa + Switch do SinricPro

Siga estes passos para ativar anúncios de voz da Alexa acionados a partir da sua integração com o SinricPro:

1. **Crie uma rotina da Alexa**  
   No app Alexa, configure uma nova rotina que fale a mensagem desejada. Configure-a para ser acionada por um evento específico de casa inteligente, como “Quando um dispositivo inteligente for ligado”.

2. **Adicione um Switch no SinricPro**  
   No seu painel do SinricPro, crie um novo dispositivo **Switch** (ele vai funcionar como o seu gatilho virtual).

3. **Acione o anúncio**  
   A partir da sua aplicação ou do seu servidor, envie um evento `sendPowerStateEvent` do SinricPro para **ligar** o switch virtual. Essa ação ativa a rotina da Alexa, fazendo com que a Alexa fale o seu anúncio.

---

Código de exemplo para ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

> **Observação:** esta abordagem usa apenas mecanismos aprovados pela Amazon e não exige nenhuma solução alternativa não oficial.
