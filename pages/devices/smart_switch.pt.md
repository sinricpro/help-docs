---
title: Interruptor Inteligente
layout: post
lang: pt
tag: smart-switch
categories: 
    - "devices"
    - "smart-switch"
---


Interruptor Inteligente é uma tomada de energia que combina com tecnologia WI-FI. 

Para criar um Interruptor Inteligente:

1. Faça login na sua conta [SinricPro](https://sinric.pro/).
2. Clique em **Dispositivos**.
3. Clique em **Adicionar Dispositivo**.
4. Digite o nome do dispositivo: **interruptor** e digite a descrição: **interruptor da tv**.
5. Selecione o tipo de dispositivo como **Switch**
6. Selecione a **Sala** onde o dispositivo está localizado.
5. Selecione a **Chave de Acesso do Dispositivo**. Esta é a credencial que seu dispositivo IoT deve usar ao conectar ao SinricPro. 
6. Clique em **Salvar**

É isso. 

Se você já vinculou a skill do Amazon Alexa, o aplicativo mostrará um popup no seu telefone celular.

![Sinric Pro alexa arduino esp8266 esp32 switch]({{ site.github.url }}/public/img/sinricpro_alexa_switch_push_notification.jpg)

Legal!

Agora vamos completar o processo de configuração. Para fazer isso, você deve atualizar o sketch de exemplo com 
- Credenciais WiFi
- Copie a chave do aplicativo selecionada e o App Secret no Passo 5 acima.
- Copie o ID do dispositivo de Sinric -> Dispositivos.

#### Tutorial
- Em breve

#### Ações do SinrcPro suportadas
- [setPowerState](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/01_Request.json)

#### Capacidades da Alexa suportadas
-  [Alexa.PowerController](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html)

#### Traits do Google Home suportadas
- Em breve

> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)