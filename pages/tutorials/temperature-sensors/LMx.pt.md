---
title: Tutorial de Sensor de Temperatura para LM35 (LM35DZ), LM335 e LM34
layout: post
lang: pt
---

Nesta seção vamos criar um **Sensor de Temperatura** usando **ESP32**, **ESP8266** e depois visualizar a temperatura via **Alexa, Google Home ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 x 1.
2. LM35, LM335 e LM34 x 1.
3. Cabos Jumper.

### Introdução rápida ao Sensor de Temperatura

Os sensores de temperatura LM35/LM34 são sensores de temperatura de circuito integrado linear que funcionam medindo a queda de tensão entre a base e o emissor de um transistor conectado como diodo. A queda de tensão entre a base e o emissor de um transistor conectado como diodo diminui a uma taxa conhecida à medida que a temperatura aumenta.

- LM35 fornece medições de temperatura em Celsius (°C)

- LM32 fornece medições de temperatura em Fahrenheit (ºF).

- LM335 fornece medições de temperatura em Kelvin (ºK)

### Fiação para LM35 ou LM34 com ESP8266

![Sinric Pro LM35 or LM34 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM35-and-LM34_Wiring.png) 

### Fiação para LM335 com ESP8266

![Sinric Pro LM335 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM335_Wiring.png) 

**Pull-up via resistor de 2.2k Ohm** 

| MCU       | Pino GPIO    |
| --------- | ------- |
| ESP32     |    36 (ADC0)  |
| ESP8266   |    A0 (ADC0)  |

Vamos verificar se a temperatura está conectada corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/35beffd648f962299c7df485b7f13124.js"></script>
 
### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Sensor de Temperatura**, descrição **Meu Sensor de Temperatura** e selecione o tipo de dispositivo como **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Você pode definir o limite aqui para receber uma notificação push via aplicativo Sinric Pro quando a temperatura ficar **abaixo** ou **acima** de uma certa temperatura. Use o Tempo de Re-disparo para definir o atraso entre notificações.

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
Você pode **gerar o código** usando o recurso **Zero Code** ou escrevê-lo você mesmo. Se você não tem experiência em programação, recomendamos usar o recurso Zero Code no Portal para gerar o código, baixar e carregar.

#### 2.2 Código Completo
  
<script src="https://gist.github.com/kakopappa/8806b5eeb0203252c5aed42849bd1481.js"></script>
 
Agora você deve conseguir visualizar a temperatura via App Sinric Pro
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Note que o aplicativo Google Home mostra o sensor de temperatura como um Termostato devido às limitações do Google Home.

### Solução de Problemas
1. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.
 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)