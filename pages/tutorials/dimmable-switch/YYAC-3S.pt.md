---
title: Tutorial de Interruptor Dimmer usando YYAC-3S para ESP32
layout: post
lang: pt
---

Nesta seção vamos criar um **Interruptor Dimmer** usando **ESP32** e depois controlar o brilho da luz via **Amazon Alexa, GoogleHome ou SmartThings**.

### Pré-requisitos:

1. ESP32.
2. YYAC-3S.
3. Lâmpada Dimmer.
3. Cabos Jumper.


**Nem todas as lâmpadas são dimerizáveis.** Verifique a etiqueta do fabricante para ver se a lâmpada é dimerizable.

### Introdução rápida ao YYAC-3S

O módulo YYAC-3S pode ser usado para controlar o fornecimento de eletricidade AC usando PWM de um Arduino, ESP8266, ESP32 ou Pico W. Pode ser usado para controlar a velocidade de motores AC e o brilho de lâmpadas dimerizáveis. O circuito consiste em um SCR e um optoacoplador no lado de entrada. Isso evita que a corrente flua de volta para o MCU e também o separa do terra, tornando-o seguro para usar. O módulo suporta uma entrada PWM de 0-255 e pode controlar tensão AC até 220V com uma corrente máxima de 3A.


### Fiação
  
  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_motion_dimmer_switch_wiring.png) 



Conecte o módulo YYAC-3S ao microcontrolador da seguinte forma:
- Pino VCC ao pino 5V do microcontrolador (3.3V não parece funcionar).
- Pino GND ao pino GND do ESP32.
- Pino PWM a um pino digital 16 no microcontrolador.

| MCU       | Pino PWM YYAC-3S    |
| --------- | ------- |
| ESP32     |    16   |


Vamos verificar se o módulo YYAC-3S está conectado corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/b34693c62c679437fa3a7465a242d7f2.js"></script>

O Monitor Serial do Arduino IDE mostrará a lâmpada dimmer assim:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-YYAC3S.mp4" type="video/mp4">
</video>

### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Dimmer**, descrição **Dimmer** e selecione o tipo de dispositivo como **Switch With Dimming**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_dimmer_new_device.png)

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo
  
<script src="https://gist.github.com/kakopappa/bb496b32ed359651d357d0769dd83695.js"></script>
 
Agora você deve conseguir controlar o nível de brilho via aplicativos Alexa, Google Home e SmartThings
  
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-google-home-demo.mp4" type="video/mp4">
</video>

![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Solução de Problemas

- Não dimeriza? Verifique a etiqueta do fabricante para ver se a lâmpada é dimerizable.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- PWM não funciona?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_pwm_YYAC-3S.png)

O LED acima acende quando o módulo recebe o sinal PWM do MCU.

- Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)