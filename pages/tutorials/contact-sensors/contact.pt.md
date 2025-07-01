---
title: Tutorial de Sensor de Contato (MC-38) para ESP8266, ESP32, Raspberry Pi Pico W
layout: post
lang: pt
---
 
Nesta seção, mostraremos como criar um sensor de contato (também conhecido como sensor de porta, sensor de entrada ou sensor de janela) usando **ESP32**, **ESP8266** ou **Raspberry Pi Pico W**, e depois ver o estado aberto/fechado na Alexa, Google Home, SmartThings ou no aplicativo Sinric Pro.

![Sinric Pro contact sensor tutorial]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_bg.jpg) 

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. Sensor de Contato (MC-38) x 1.
3. Cabos jumper.

### Introdução rápida ao Sensor de Contato

Um sensor de contato é um dispositivo que detecta se uma porta, janela ou outro objeto está aberto ou fechado. Um sensor de contato compreende dois componentes – um sensor e um ímã – usados para determinar o status de objetos como portas ou janelas, se estão abertos ou fechados.
 
![Sinric Pro Contact Sensor Reed Switch Open Close]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_open_close.png) 

O sensor é fixado na moldura da janela deslizante, enquanto o ímã é anexado à própria janela. Quando a janela deslizante está fechada, o ímã fica próximo ao sensor, estabelecendo uma conexão entre os dois componentes. Por outro lado, quando a janela deslizante é aberta, o ímã se afasta do sensor, quebrando a conexão entre eles.

### Conectando o Sensor de Contato

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_wiring.png) 

Nota: Estamos usando INPUT_PULLUP em vez de conectar um resistor de 10kΩ entre o reed switch e GND.

| MCU       | Pino GPIO    |
| --------- | ------------ |
| ESP32     |    19        |
| ESP8266   |    4 (D2)    |
| Pico W    |    GP5       |

Vamos verificar se o sensor de contato está conectado corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/ce5b95c7618826005ef39bb1861cb6f1.js"></script>

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-contact-sensor-open-close.mp4" type="video/mp4">
</video>

### Passo 1: Criar um novo Sensor de Contato no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Porta da Frente**, descrição **Minha Porta da Frente** e selecione o tipo de dispositivo como **Contact Sensor**.

![Sinric Pro contact motion sensor new device]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro contact sensor notifications]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_notifications.png)

Para receber notificações push quando seu dispositivo abrir ou fechar, habilite a opção **"Abrir e Fechar"** no aplicativo Sinric Pro.

* Clique em Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Programação

#### 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo

<script src="https://gist.github.com/kakopappa/88a93b1f7d4dc306e0c91b35b48c2329.js"></script>

### Passo 3: Vincular a Skill Sinric Pro da Alexa com sua conta.

* Abra seu aplicativo Amazon Alexa.
* Vá para Skills & Games.
* Pesquise por **Sinric Pro**.
* Clique em **ATIVAR PARA USAR**.
* Digite suas credenciais do Sinric Pro na página de vinculação.
* Peça à Alexa para descobrir novos dispositivos.
* Agora você pode perguntar à Alexa o status do **Sensor de Contato**: "Alexa, a porta da frente está aberta?"

### Passo 4: Vincular a ação Sinric Pro do Google Home com sua conta.

* Abra o **Google Home** e clique em **Adicionar**.
* Selecione **Configurar Dispositivo**
* Selecione **Funciona com Google Home**
* Pesquise por **Sinric Pro**.
* Vincule sua conta.
* Descubra novos dispositivos
* Agora você pode perguntar ao Google Home o status do **Sensor de Contato**: "Ok Google, a porta da frente está aberta?"

### Passo 5: Vincular Sinric Pro SmartThings com sua conta.

* Abra o aplicativo SmartThings e toque no ícone **+**
* Selecione Dispositivo
* Selecione Sinric Pro em **Por Marca**
* Vincule sua conta.
* Agora você pode ver o status do **Sensor de Contato** no painel

### Solução de Problemas
Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.html) para possíveis soluções para seu problema.

> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)