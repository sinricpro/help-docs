---
title: Tutorial de Sensor de Temperatura para DHT11, DHT22, AM2302, RHT03
layout: post
lang: pt
---

Nesta seção vamos criar um **Sensor de Temperatura** usando **ESP32**, **ESP8266** e depois visualizar a temperatura via **Alexa, Google Home ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 x 1.
2. DHT11 ou DHT22, AM2302, RHT03 x 1.
3. Cabos Jumper.

### Introdução rápida ao Sensor de Temperatura

As séries DHT e AM são sensores digitais de baixo custo para detectar temperatura e umidade. Ele usa um sensor de umidade capacitivo e um termistor para medir o ar ambiente e então emite um sinal digital no pino de dados.


### Fiação

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial.png) 

Nota: Alguns sensores DHT22 não vêm com um resistor pull-up, então você pode precisar conectar um você mesmo. Um resistor de 10k é tipicamente usado, e deve ser conectado do pino de dados do sensor para a fonte de alimentação +3.3V ou +5V.



| MCU       | Pino DHT    |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    14 (D5)    |



### Configurar biblioteca arduino-DHT

Vamos usar a biblioteca [arduino-DHT](https://github.com/markruys/arduino-DHT) para ler a temperatura e umidade do nosso sensor. Vá para [arduino-DHT](https://github.com/markruys/arduino-DHT) e baixe a biblioteca como arquivo zip.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/download-arduino-DHT-library.png) 

Então extraia o arquivo zip para `C:\Users\<username>\Documents\Arduino\libraries\arduino-DHT`. Assim deve ficar.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/extract-arduino-DHT-library.png) 

Vamos verificar se a temperatura está conectada corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/08c5cd5bbee8da13e6ca081afd017974.js"></script>

O Monitor Serial do Arduino IDE mostrará a temperatura atual assim

![Sinric Pro DHT Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_sensor_readings.png)

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
  
<script src="https://gist.github.com/kakopappa/a6574e1e0c57a5cdcb46d357a5dd6ee3.js"></script>
 
Agora você deve conseguir visualizar a temperatura via App Sinric Pro
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Gráficos via Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_portal_temperature_sensor.png)

Alexa, Google Home e SmartThings

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_alexa_googlehome_smartthings_temperature_sensor.png)

Note que o aplicativo Google Home mostra o sensor de temperatura como um Termostato devido às limitações do Google Home.

### Solução de Problemas

1. error: no matching function for call to 'DHT::DHT()' ou error: 'class DHT' has no member named 'getMinimumSamplingPeriod'

    **Solução**: Certifique-se de que a biblioteca DHT correta está instalada. Este exemplo foi feito com https://github.com/markruys/arduino-DHT. Remova quaisquer outras bibliotecas DHT que você possa ter instalado anteriormente, ex: https://github.com/adafruit/DHT-sensor-library

2. Erro de compilação: DHT.h: No such file or directory

    **Solução**: Certifique-se de que a biblioteca DHT correta está instalada.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.


 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)