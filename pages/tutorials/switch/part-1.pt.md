---
title: Tutorial de Interruptor Parte 1 - Ligar e desligar um Relé
layout: post
lang: pt
---

Nesta seção vamos criar um **Interruptor** Sinric Pro para **ESP32**, **ESP8266** ou **Raspberry Pi Zero W** e depois controlar via **Alexa, Google Home ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 ou RaspPi W x 1.
2. Controlador de relé SPDT x 1.
3. Cabos jumper.

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png) 

### Introdução rápida ao Relé

Um relé é um interruptor operado eletricamente que pode ser ligado ou desligado por um sinal de baixa tensão. É como um interruptor regular no sentido de que permite que a corrente flua ou não, mas pode ser controlado por uma tensão muito menor. Isso torna os relés ideais para MCUs onde é necessário controlar um circuito de alta tensão com um sinal de baixa tensão.

#### Como funciona

A operação de um relé pode variar dependendo do fabricante, da fiação e do tipo de controlador de relé sendo usado. Alguns controladores de relé requerem um sinal de alto nível do MCU para ativar o relé, enquanto outros requerem um sinal de baixo nível. É importante verificar as especificações do controlador de relé antes de usá-lo para garantir que seja compatível com seu MCU.

**Sinal de alto nível**: Um sinal de alto nível é um sinal que está acima de um certo limite de tensão. Por exemplo, um controlador de relé de 5V pode requerer um sinal que esteja acima de 3,3V para ativar o relé.

```c++
digitalWrite(pin, HIGH);
```

**Sinal de baixo nível**: Um sinal de baixo nível é um sinal que está abaixo de um certo limite de tensão. Por exemplo, um controlador de relé de 5V pode requerer um sinal que esteja abaixo de 0,8V para ativar o relé.

```c++
digitalWrite(pin, LOW);
```

**Conectores de Alta Tensão**
![Conectores de Alta Tensão]({{ site.github.url }}/public/img/high_voltage_connectors.png) 

O módulo relé acima tem um único conector com três soquetes: **Comum (COM)**, **Normalmente Fechado (NC)**, e **Normalmente Aberto (NO)**.

**Comum (COM)**: COM é a conexão comum para ambos os pinos NO e NC. Conecte o dispositivo de alta tensão ao pino COM.

**Normalmente Fechado (NC)**: O circuito está fechado por padrão.

**Normalmente Aberto (NO)**: O circuito está aberto por padrão.

Os contatos normalmente aberto (NO) e normalmente fechado (NC) permitem que você use um pino para controlar dois circuitos separados dependendo de seus requisitos. Por exemplo, você poderia usar um pino para controlar a energia de uma lâmpada e outro pino para controlar a energia de um motor. Quando o pino estiver alto/baixo, a lâmpada acenderá, caso contrário o motor ligará.

### Fiação

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-esp8266-relay-wired.png) 

| MCU       | Pino    |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    12 (D6)    |
| RaspPi W  |    6    |

Antes de integrarmos com Sinric Pro, é importante verificar se o relé está conectado corretamente. Você pode usar o seguinte código para verificar se o relé liga e desliga a cada 5 segundos.

<script src="https://gist.github.com/kakopappa/baf926bc8b0821f048fe53540e254212.js"></script>

### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Interruptor**, descrição **Meu Primeiro Interruptor** e selecione o tipo de dispositivo como **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Para receber notificações push quando seu dispositivo ficar online ou offline, habilite a opção **"Conectar e Desconectar"** no aplicativo Sinric Pro. Para receber notificações push quando seu dispositivo ligar ou desligar, habilite a opção **"Ligar e Desligar"**.

* Clique em Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Programação

#### 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Você pode **gerar o código** usando o recurso **Zero Code** ou escrevê-lo você mesmo. Se você não tem experiência em programação, recomendamos usar o recurso Zero Code no Portal para gerar o código, baixar e carregar.

#### 2.2 Código Completo

<script src="https://gist.github.com/kakopappa/0416a1f26b8398ce6dd9f71a6a70755a.js"></script>
 
Agora você deve conseguir controlar o relé via Portal como no vídeo abaixo.

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-relay-on-off.mp4" type="video/mp4">
</video>

### Passo 3: Vincular a Skill [Sinric Pro](https://www.amazon.com/dp/B07ZT5VDT8) da Alexa com sua conta.

<div align="center">
  <table >
    <tr>
      <td>
        <p>&#x2022; Abra seu aplicativo Amazon Alexa.</p>
        <p>&#x2022; Vá para Skills & Games.</p>
        <p>&#x2022; Pesquise por <b>Sinric Pro</b>.</p>
        <p>&#x2022; Clique em ATIVAR PARA USAR.</p>
        <p>&#x2022; Digite suas credenciais do <b>Sinric Pro</b> na página de vinculação.</p>
        <p>&#x2022; Peça à Alexa para descobrir novos dispositivos.</p>
        <p>&#x2022; Peça à Alexa para ligar o <b>Interruptor</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Passo 4: Vincular a ação [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) do Google Home com sua conta.

<div align="center">
  <table >
    <tr>
      <td>
          <p>&#x2022; Abra o <b>Google Home</b> e clique em <b>Adicionar</b>. </p>
          <p>&#x2022; Selecione <b>Configurar Dispositivo</b></p>
          <p>&#x2022; Selecione <b>Funciona com Google Home</b></p>
          <p>&#x2022; Pesquise por <b>Sinric Pro</b>.</p>
          <p>&#x2022; Vincule sua conta. </p>
          <p>&#x2022; Descubra novos dispositivos </p>
          <p>&#x2022; Peça ao Google Home para ligar o <b>Interruptor</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Passo 5: Vincular [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) SmartThings com sua conta.

<div align="center">
  <table >
    <tr>
      <td>
           <p>&#x2022; Abra o aplicativo SmartThings e toque no ícone <b>+</b></p>
           <p>&#x2022; Selecione Dispositivo</p>
           <p>&#x2022; Selecione Sinric Pro em <b>Por Marca</b></p>
           <p>&#x2022; Vincule sua conta. </p>
           <p>&#x2022; Agora você pode ligar ou desligar o <b>Interruptor</b> a partir do painel</p> 
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div> 

Continue para a [Parte 2]({{ site.github.url }}/pt/pages/tutorials/switch/part-2.html) desta série de artigos para aprender como adicionar um botão para alternar o relé.

### Solução de Problemas
Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.html) para possíveis soluções para seu problema.

> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)