---
title: Guia do Assistente de Criação de Dispositivos do SinricPro
layout: post
lang: pt
description: Guia passo a passo do assistente de criação de dispositivos do Sinric Pro. Informações do dispositivo, notificações, temporizadores e outras configurações.
---
 

Este documento traz um guia passo a passo para criar um novo dispositivo na plataforma SinricPro. O processo é dividido em quatro seções principais: informações do dispositivo, notificações, temporizadores e outras configurações.

## Passo 1: Informações do dispositivo

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-info.png) 

O primeiro passo para criar um novo dispositivo é configurar as informações básicas sobre ele.

### Campos

- **Device Name**
  - Informe um nome único para o seu dispositivo. Esse nome será usado para identificar o dispositivo no seu sistema de automação residencial.
  - *Exemplo*: "Bedroom Light"

- **Description**
  - Escreva uma breve descrição da finalidade ou da função do dispositivo.
  - *Exemplo*: "Main light in the bedroom"

- **Device Type**
  - Selecione o tipo de dispositivo adequado no menu suspenso:
    - Switch
    - Dimmable Switch
    - Light
    - TV
    - Speaker
    - Thermostat
    - Fan
    - Lock
    - Doorbell
    - Temperature Sensor
    - Motion Sensor
    - Contact Sensor
    - Windows Air Conditioner
    - Blinds
    - Garage Door
    - Camera
    - Custom Devices (depois que você criar um dispositivo personalizado em [Device Template]({{ site.github.url }}/pt/pages/custom-templates.pt.html), ele aparecerá aqui)

  - *Observação*: clique no link `(How to create a custom device type?)` se quiser aprender a criar um tipo de dispositivo personalizado.

- **App Key**
  - A App Key é a sua credencial exclusiva para autenticar o dispositivo IoT quando ele se conecta à plataforma SinricPro. Ela funciona como um identificador distinto do seu módulo de hardware específico dentro do ecossistema SinricPro. Para garantir o funcionamento correto e evitar conflitos, selecione uma App Key que corresponda diretamente ao seu módulo de hardware e use uma chave diferente para cada módulo. Ao criar uma conta, uma App Key padrão é gerada automaticamente para você.

- **Room & Home**
  - Atribua o dispositivo a um cômodo e a uma casa específicos na lista suspensa.
  - *Exemplo*: "Bed Room (Home)"

## Passo 2: Notificações

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-notifications.png) 

Configure quais eventos disparam notificações do seu dispositivo.

### Ativar notificações
- **Alerts**: esta chave funciona como um interruptor global que ativa ou desativa o envio de notificações push deste dispositivo para o app SinricPro. (ex.: `mySwitch.sendPushNotification("Hello SinricPro!")`).

### Notificações baseadas em eventos

Você pode optar por receber notificações quando ocorrerem determinadas mudanças de estado do dispositivo:

| Tipo de notificação | Descrição                                  |
|-------------------|----------------------------------------------|
| **Connect**       | Notifica quando o dispositivo se conecta à nuvem. |
| **Disconnect**    | Notifica quando o dispositivo se desconecta.           |
| **On**            | Notifica quando o dispositivo é ligado.              |
| **Off**           | Notifica quando o dispositivo é desligado.             |
| **Lock**          | Notifica quando a fechadura é trancada                 |
| **Unlock**          | Notifica quando a fechadura é destrancada             |
| **Unlock**          | Notifica quando a fechadura é destrancada             |
| **PM2.5 Air Quality** | Notifica quando a qualidade do ar sobe acima do limite em μg/m3 |
| **PM2.5 Air Quality** | Notifica quando a qualidade do ar cai abaixo do limite em μg/m3 |
| **Motion**            | Notifica quando um movimento é detectado (de dia ou à noite) |
| **Camera Motion**     | Notifica quando uma foto de movimento é tirada                 |
| **Camera Snapshot**   | Notifica quando uma captura é feita e descreve o que aparece nela usando IA   |
| **Doorbell**   | Notifica quando a campainha é pressionada                            |
| **Open**       | Notifica quando é aberto (portão de garagem, sensor de contato ou persiana)                       |
| **Closed**       | Notifica quando é fechado (portão de garagem ou sensor de contato)                       |
| **Temperature**       | Notifica quando a temperatura sobe acima do limite |
| **Temperature**       | Notifica quando a temperatura cai abaixo do limite |

O que é o Retrigger Time?

> É o intervalo entre uma notificação e a seguinte. Ele serve para evitar o envio contínuo de notificações push.

> **Dica**: use essas opções para monitorar o estado do dispositivo e receber notificações de atualização em tempo real pelo app SinricPro ou pelas plataformas conectadas.


## Passo 3: Temporizadores

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-timers.png) 

Configure comportamentos automáticos de ligar/desligar para o seu dispositivo usando temporizadores gerenciados na nuvem. O atraso mínimo é de 3 segundos. O intervalo máximo não pode ser superior a 1 dia.

### Auto Off
- **Enable**: ative a chave para habilitar o desligamento automático.
- **Delay**: defina o número de segundos após o qual o dispositivo desliga automaticamente depois de ser ligado.
  - *Padrão*: `3 seconds` (ajustável)
  - *Exemplo*: defina como `5` → o dispositivo desliga 5 segundos depois de ser ligado.

### Auto On
- **Enable**: ative a chave para habilitar o ligamento automático.
- **Delay**: defina o número de segundos após o qual o dispositivo liga automaticamente depois de ser desligado.
  - *Padrão*: `3 seconds` (ajustável)
  - *Exemplo*: defina como `10` → o dispositivo liga 10 segundos depois de ser desligado.

> **Observação**: os temporizadores são baseados na nuvem e não funcionam se o dispositivo estiver temporariamente offline.

> **Casos de uso**:
> - Luzes piscantes ou efeitos estroboscópicos.
> - Desligamento de segurança para aquecedores ou motores.


## Passo 4: Outros

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-others.png) 

Informe metadados opcionais sobre o seu dispositivo, principalmente o consumo de energia.

### Uso de energia (estimativa)

Ative esta opção para habilitar os recursos de estimativa de energia. O servidor calcula o consumo de energia do dispositivo com base nos tempos em que ele fica ligado e desligado. Você pode ver o consumo no menu Energy Estimates do Portal.

#### Campos:
- **Stand by Wattage (W)**  
  Potência consumida quando o dispositivo está desligado ou em standby.  
  > *Exemplo*: tomada inteligente = `0.5W`, TV = `5W`

- **On Wattage (W)**  
  Potência consumida quando o dispositivo está em funcionamento.  
  > *Exemplo*: lâmpada LED = `9W`, ventilador = `50W`

> **Por que isso importa**:  
> Os dados de energia ajudam os usuários a estimar os custos de eletricidade pelos painéis inteligentes da Alexa.

> **Recomendação**:  
> Use as especificações do fabricante ou um wattímetro para obter valores precisos.


### Restaurar o estado do dispositivo ao conectar

Quando este recurso está ativado, o servidor SinricPro envia automaticamente o estado mais recente do dispositivo (como estado de energia, brilho, configurações personalizadas e outros dados relevantes) logo depois que o dispositivo se reconecta.

Por exemplo, se o seu dispositivo estava **ligado** quando ficou offline, o servidor enviará esse último estado de energia conhecido (`true`) ao dispositivo na reconexão, acionando o seu callback `onPowerState` e restaurando automaticamente o dispositivo ao estado anterior.

### Configurações personalizadas no SinricPro

As configurações personalizadas (Custom Settings) permitem que você defina e gerencie parâmetros de configuração específicos do seu dispositivo, além dos recursos padrão oferecidos pelo SinricPro.

Por exemplo, você pode usar as Custom Settings para:  
- Ligar ou desligar um LED embutido,
- Definir a intensidade mínima de sinal para se conectar a um SSID,
- Definir um **offset de temperatura** para um termostato,  
- Sinalizar a **reinicialização automática** após uma atualização de firmware,  
- Configurar um **nível de brilho padrão** para a inicialização.


[Tutorial completo de configurações]({{ site.github.url }}/pt/pages/tutorials/general/sinricpro-settings-tutorial.pt.html)

---

> Este documento é open source. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
