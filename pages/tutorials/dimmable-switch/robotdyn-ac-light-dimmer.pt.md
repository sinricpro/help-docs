---
title: Tutorial de Interruptor Dimmer usando Módulo Dimmer de Luz AC RobotDyn
layout: post
lang: pt
---

Nesta seção vamos criar um **Dimmer de luz com RobotDyn** e depois controlar o brilho da luz via **Alexa, GoogleHome ou SmartThings**.

### Pré-requisitos:

1. ESP32 ou ESP8266 x 1.
2. Dimmer de Luz AC RobotDyn.
3. Lâmpada Dimmer.
3. Cabos Jumper.


**Nem todas as lâmpadas são dimerizáveis.** Verifique a etiqueta do fabricante para ver se a lâmpada é dimerizable.

### Introdução rápida ao Módulo Dimmer de Luz AC RobotDyn

O Módulo Dimmer de Luz AC RobotDyn é um dispositivo que permite controlar o brilho de luzes AC usando um microcontrolador. É um módulo pequeno e fácil de usar que pode ser usado com microcontroladores, como o ESP8266, ESP32. O módulo funciona usando um triac para controlar o fluxo de corrente para a lâmpada. O triac é um dispositivo semicondutor que pode ser usado para ligar e desligar corrente AC. O Módulo Dimmer de Luz AC RobotDyn usa um sinal PWM para controlar o triac, que por sua vez controla o brilho da lâmpada.

### Fiação do Dimmer de Luz AC RobotDyn

Você pode usar a tabela de mapeamento de pinos abaixo para conectar seu ESP32/ESP8266 com o módulo Dimmer de Luz AC RobotDyn.

 ```
 *  +---------------+-------------------------+-------------------------+
 *  |   Placa       | Pino INPUT              | Pino OUTPUT             |
 *  |               | Zero-Cross              | PWM                     |
 *  +---------------+-------------------------+-------------------------+
 *  | ESP8266       | D1(IO5),    D2(IO4),    | D0(IO16),   D1(IO5),    |
 *  |               | D5(IO14),   D6(IO12),   | D2(IO4),    D5(IO14),   |
 *  |               | D7(IO13),   D8(IO15),   | D6(IO12),   D7(IO13),   |
 *  |               |                         | D8(IO15)                |
 *  +---------------+-------------------------+-------------------------+
 *  | ESP32         | 4(GPI36),   6(GPI34),   | 8(GPO32),   9(GP033),   |
 *  |               | 5(GPI39),   7(GPI35),   | 10(GPIO25), 11(GPIO26), |
 *  |               | 8(GPO32),   9(GP033),   | 12(GPIO27), 13(GPIO14), |
 *  |               | 10(GPI025), 11(GPIO26), | 14(GPIO12), 16(GPIO13), |
 *  |               | 12(GPIO27), 13(GPIO14), | 23(GPIO15), 24(GPIO2),  |
 *  |               | 14(GPIO12), 16(GPIO13), | 25(GPIO0),  26(GPIO4),  |
 *  |               | 21(GPIO7),  23(GPIO15), | 27(GPIO16), 28(GPIO17), |
 *  |               | 24(GPIO2),  25(GPIO0),  | 29(GPIO5),  30(GPIO18), |
 *  |               | 26(GPIO4),  27(GPIO16), | 31(GPIO19), 33(GPIO21), |
 *  |               | 28(GPIO17), 29(GPIO5),  | 34(GPIO3),  35(GPIO1),  |
 *  |               | 30(GPIO18), 31(GPIO19), | 36(GPIO22), 37(GPIO23), |
 *  |               | 33(GPIO21), 35(GPIO1),  |                         |
 *  |               | 36(GPIO22), 37(GPIO23), |                         |
 *  +---------------+-------------------------+-------------------------+
```

  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_switch_wiring.png) 



Conecte o módulo RobotDyn ao microcontrolador da seguinte forma:
- Pino VCC ao pino 5V do microcontrolador (3.3V não parece funcionar).
- Pino GND ao pino GND do ESP32.
- Pino PWM a um pino digital 2 no microcontrolador.
- Pino Z-C a um pino digital 4 no microcontrolador.

| MCU       | Pino Zero Cross   | Pino PWM/ADC   |
| --------- | -------           | -------        |
| ESP32     |    4              | 2


Vamos verificar se o Módulo Dimmer de Luz AC RobotDyn está conectado corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/b19a35476ee6086b8dcf605caf43d6da.js"></script>

O Monitor Serial do Arduino IDE mostrará o dimmer assim:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-RobotDyn.mp4" type="video/mp4">
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

<script src="https://gist.github.com/kakopappa/e968bee3afd66401b1fb7020e591dd3d.js"></script> 

 
 
![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Solução de Problemas

- Não dimeriza? Verifique a etiqueta do fabricante para ver se a lâmpada é dimerizable.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- PWM não funciona?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_pwm_indicator.jpg)

O LED acima acende quando o módulo recebe o sinal PWM do MCU.

- Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)