---
title: Tutorial de Luz para Fita LED RGB 5050
layout: post
lang: pt
---

Nesta seção vamos criar uma Fita LED usando **ESP32**, **ESP8266** e depois controlá-la via **Amazon Alexa, Google Home ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 x 1.
2. MOSFET IRF540N, MOSFET STP16nF06L, transistor NPN S8050 ou transistor NPN BC337 x 3
3. Resistor de 1k x 3
4. Cabos Jumper.

Neste tutorial vamos usar transistores NPN BC337.

![Sinric Pro light strip 5050 wiring]({{ site.github.url }}/public/img/sinric_pro_light_5050-led-strip-wiring.jpg) 

### Introdução rápida às fitas LED 5050
As fitas LED 5050 são um tipo de fita LED feita de LEDs individuais que são agrupados em conjuntos de três. Cada conjunto de três LEDs é conhecido como um pixel. Os pixels são organizados em uma fita longa e fina, e podem ser cortados no comprimento para atender às suas necessidades. As fitas LED 5050 estão disponíveis em uma variedade de cores, incluindo vermelho, verde, azul, branco e amarelo. Elas também podem ser compradas em diferentes níveis de brilho. As fitas LED 5050 são fitas LED acessíveis que parecem similares às fitas Neopixel mais caras. No entanto, os LEDs nas fitas LED 5050 não podem ser controlados individualmente. Isso significa que você só pode usar uma cor para toda a fita por vez.


Aqui está uma tabela que resume as principais diferenças entre fitas LED 5050 e fitas Neopixel:


| Característica | Fitas LED 5050      | Fitas Neopixel
| --------- | -------               | ---------
| Preço     |    Acessível         | Mais caro
| LEDs endereçáveis individualmente     |    Não                                       | Sim
| Animações|    Limitado a animações comuns como mudança de cor e dimmer  | Animações complexas com LEDs individuais são possíveis
 

### Fiação

![Sinric Pro light strip 5050 wiring]({{ site.github.url }}/public/img/sinric_pro_light_5050-led-strip.png) 
![Sinric Pro light strip 5050 wiring]({{ site.github.url }}/public/img/sinric_pro_light_5050-led-strip-wiring-without-strip.jpg) 
 
| Fita      | PINO ESP32    
| --------- | ------- 
| 5V        |    5V   
| R         |    14  
| G         |    12  
| B         |    27  

Vamos verificar se a Fita LED está conectada corretamente e funcionando.

<script src="https://gist.github.com/kakopappa/22bb8d2cf157df07724fc9571edd7764.js"></script>

A Fita LED mudará as cores assim:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-light-5050-led-strip-demo.mp4" type="video/mp4">
</video>

 
### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Fita LED**, descrição **Minha Fita LED** e selecione o tipo de dispositivo como **Smart Light Bulb**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_light_new_device.png)

* Clique em **Próximo** na aba Notificações

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo
  
<script src="https://gist.github.com/kakopappa/11e904fec925af8e35b459a7a73fc26e.js"></script>
 
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-light-5050-led-strip-sinricpro-portal-demo.mp4" type="video/mp4">
</video>

Agora você deve conseguir controlar via Alexa, GoogleHome e SmartThings também.
 


### Solução de Problemas

1. Use uma fonte de alimentação que pode fornecer corrente suficiente para a fita LED. As fitas LED podem consumir muita corrente, então é importante usar uma fonte de alimentação que possa fornecer corrente suficiente para atender às necessidades da fita.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)