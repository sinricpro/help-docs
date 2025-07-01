---
title: Sensor de Água (também conhecido como detector de vazamento, inundação ou chuva) para ESP8266, ESP32, Raspberry Pi Pico W para Alexa
layout: post
lang: pt
---
 
Neste tutorial, vamos construir um sensor de água que pode ser conectado a um **ESP32**, **ESP8266** ou **Raspberry Pi Pico W** e usá-lo para monitorar vazamentos de água, inundações ou chuva. Com **Amazon Alexa**, você pode verificar o status do seu sensor de água, perguntar informações sobre ele e **receber notificações push quando água for detectada**.

![Sinric Pro HW-390 capacitive soil moisture sensor ]({{ site.github.url }}/public/img/sinricpro-water-sensor-intro.png)

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. Sensor de Água x 1.
3. Cabos Jumper.

### Introdução rápida ao Sensor de Água

Um detector de água, também conhecido como sensor de água, é um dispositivo que detecta a presença de água. Detectores de água funcionam de várias maneiras. Alguns tipos comuns de detectores de água incluem:

- **Detectores de condutividade**: Detectores de condutividade funcionam medindo a condutividade elétrica da água. Quando o sensor entra em contato com água, a condutividade elétrica aumenta.

- **Detectores de capacitância**: Detectores de capacitância funcionam medindo a capacitância da água. Quando o sensor entra em contato com água, a capacitância aumenta.

- **Detectores ópticos**: Detectores ópticos funcionam detectando mudanças no índice de refração da água. Quando o sensor entra em contato com água, o índice de refração muda.
 
**Nota:** Sensores de água têm uma vida útil mais curta porque são expostos à água. Isso pode fazer com que o sensor corroa rapidamente quando está ligado enquanto imerso em água. Para evitar isso, vamos ligar o sensor apenas quando fazendo leituras.
  
### Fiação do Sensor de Água

Vamos conectar o sensor de nível de água.

![Sinric Pro water sensor sensor wiring]({{ site.github.url }}/public/img/sinricpro_water_sensor_wiring.png) 

| MCU       | Pino S                    |  Pino VCC |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   17      |
| ESP8266   |    A0                     |   D2      |
| Pico W    |    GP26 (ADC0)            |   6       |
 


**Nota:** no ESP32, ADC2 (GPIO04, GPIO02, GPIO15) é instável quando Wi-Fi está sendo usado.

### Lendo do Sensor de Água

Vamos verificar se o sensor está conectado corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/7d45a826ba02203ab8571b735add45c9.js"></script>

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-sensor-demo.mp4" type="video/mp4">
</video>

![sinric pro water sensor arduino readings]({{ site.github.url }}/public/img/sinricpro-water-sensor-test-readings.png) 

### Detectando inundação

<script src="https://gist.github.com/kakopappa/aff71487783487cbfbdef4006eaab809.js"></script>

### Detectando nível de água

<script src="https://gist.github.com/kakopappa/a2dffb0f0c46585ed0b35aa902c2447e.js"></script>

 
### Passo 1: Conectar ao Sinric Pro

#### Passo 1.1: Criando um tipo de dispositivo personalizado para Sensor de Água.

Sinric Pro não tem um tipo de dispositivo integrado para Sensor de Água/Inundação, então vamos criar um tipo de dispositivo personalizado para Sensor de Água usando o recurso Device Template para ver.

1. Inundação no porão ou não.

2. Nível de água.

**Nota**: Você pode usar o recurso de importação de template de dispositivo mencionado abaixo para pular a criação do template completo.

* [Faça login](https://portal.sinric.pro/devicetemplates/new) na sua conta Sinric Pro e vá para **Device Templates**

* Clique em **Add Device Template**. Digite nome e descrição como **Flood Sensor** e selecione **Flood Sensor** como tipo de dispositivo

![Sinric Pro capacitive soil moisture sensor device template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-basic-info.png) 

* Clique em **Capabilities**.

Aqui devemos selecionar as características do nosso Sensor de Umidade do Solo. Queremos saber se o *Solo está Úmido ou Seco* e o *Nível de umidade*. Então vamos arrastar uma capacidade **Range**, **Mode** e **Push Notification**.

![Sinric Pro custom device type for capacitive soil moisture sensor]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-set-template-drop-range-mode.png) 

- O que é capacidade Range?

  A capacidade Range pode ser usada para representar um número. ex: velocidade atual de um liquidificador.

- O que é capacidade Mode?

  A capacidade Mode pode ser usada para representar um valor de uma lista de valores predefinidos. ex: modo de ciclo de lavagem atual de uma máquina de lavar.

- O que é capacidade Push Notification?

  A capacidade Notification fornece a habilidade de enviar uma mensagem de notificação push do código.

Clique no botão **Configure** e configure as duas capacidades como abaixo.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode.png)  

Clique em **Save** para salvar.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode-configured.png)  

Clique em **Save** para salvar o template.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-saved.png)  

Agora você pode ver o template que acabamos de criar.


## Importar um template existente?

Se você está com preguiça de configurar todos os valores dos Modos e Range, você pode usar o recurso de importação.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Cole este Template:

<script src="https://gist.github.com/kakopappa/48649129dbed3021cda75a4d8ce94515.js"></script>

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **Sensor de Inundação**, descrição **Meu Sensor de Inundação** e selecione o tipo de dispositivo como **Flood Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-new-device-info.png)

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

* Clique em **Code Generator** para Gerar o código. Clique em **Download** para baixar o código.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo

<script src="https://gist.github.com/kakopappa/6657119c2750c4cc662b674dba04a651.js"></script>
 
Agora você deve conseguir ver o status de inundação e nível de água via Alexa, App Sinric Pro

Alexa, Qual é a inundação (nome do modo) no sensor de inundação(nome do dispositivo)

Alexa, Qual é o nível de água(nome do range) no sensor de inundação(nome do dispositivo)


![Sinric Pro Alexa capacitive soil moisture sensor]({{ site.github.url }}/public/img/sinricpro-water-sensor-alexa.jpg)
 
![Sinric Pro Alexa capacitive soil moisture sensor portal]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-portal.png)
 

### Solução de Problemas
1. Google Home ou SmartThings não são suportados.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.
 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)