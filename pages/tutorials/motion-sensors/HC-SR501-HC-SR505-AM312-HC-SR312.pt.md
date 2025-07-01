---
title: Tutorial de Sensor de Movimento para HC-SR501, HC-SR505, Mini AM312, HC-SR312
layout: post
lang: pt
---

Nesta seção vamos criar um **Sensor de Movimento** PIR usando **ESP32**, **ESP8266** ou **Raspberry Pi Pico W** e depois visualizar as mudanças de movimento via **Alexa ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. HC-SR501, HC-SR505, Mini AM312, HC-SR312 x 1.
3. Cabos Jumper.

| PIR       | Tensão de operação | Tempo de atraso | Tempo de bloqueio | Disparo       | Distância
| --------- | -------          |-------     |-------        |-------        |-------
| HC-SR312  |2.7-12V           | 2 segundos  | 2 segundos     | Repetível    | 3-5 metros
| HC-SR505  |4.5-20V           | 2 segundos  | 2 segundos     | Repetível    | 3 metros
| HC-SR501  |4.5-20V           | Ajustável  | Ajustável    | Ajustável    | 3 metros a 7 metros

### Introdução rápida aos Sensores de Movimento PIR

Sensores de movimento de infravermelho passivo (PIR) detectam a presença de pessoas ou animais medindo mudanças na radiação infravermelha. Sensores PIR funcionam detectando a radiação infravermelha emitida por todos os objetos que têm uma temperatura acima do zero absoluto. Quando uma pessoa ou animal se move para o campo de visão de um sensor PIR, o sensor detecta uma mudança na quantidade de radiação infravermelha e dispara um alarme ou outra saída. Sensores PIR são uma maneira versátil e econômica de detectar movimento. Eles são fáceis de usar e podem ser instalados em uma variedade de locais.

A saída do Sensor de Movimento PIR é:

- ``HIGH`` quando um movimento é detectado.
- ``LOW`` quando nenhum movimento é detectado.

Para obter medições precisas, **aguarde o sensor PIR calibrar adequadamente, isso normalmente levará de 10 a 60 segundos** após ligá-lo.

O HC-SR501 tem configurações ajustáveis:

![Sinric Pro esp8266 HC-SR501 ]({{ site.github.url }}/public/img/sinric_pro_pir_sensor.png) 

###### Ajuste de Sensibilidade

- A distância de medição está entre 3 e 7 metros.

- Girando no sentido horário ou à direita - Diminui a sensibilidade. Totalmente à direita até 3 metros.

- Girando no sentido anti-horário ou à esquerda - Diminui a sensibilidade. Totalmente à esquerda cerca de 7 metros.

###### Ajuste de Tempo de Atraso

- Tempo de atraso que define por quanto tempo a saída do HC-SR501 permanece ``HIGH`` após um movimento ser detectado. Pode ser ajustado de 1 segundo a cerca de 5 minutos.

- Girando no sentido horário ou à direita - Aumenta o atraso. Totalmente à direita até 5 minutos.

- Girando no sentido anti-horário ou à esquerda - Diminui o atraso. Totalmente à esquerda cerca de 3 segundos.


###### Configuração do Jumper

- **Modo de Disparo Único (L)**: Dispara um único movimento. O potenciômetro de tempo de atraso determina por quanto tempo o pino permanecerá ``HIGH``. Qualquer detecção adicional de movimento é bloqueada até retornar para ``LOW``.

**Exemplo**: O tempo de atraso do detector de movimento está definido para 3 segundos, mas não pode detectar movimento por cerca de 6 segundos após detectar movimento.

![Sinric Pro esp8266 PIR Single Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_single_trigger.png) 

- **Modo de Disparo Múltiplo (H)**: Dispara uma série de movimentos. O potenciômetro de tempo de atraso determina por quanto tempo o pino permanecerá ``HIGH``. No modo de disparo múltiplo, o tempo de atraso é reiniciado cada vez que movimento é detectado, então não há bloqueio de detecção adicional.

**Exemplo**: O tempo de atraso é de 3 segundos. Após movimento ser detectado, o período de tempo de atraso reinicia. No entanto, a detecção ainda é bloqueada por 3 segundos após o tempo de atraso expirar. Este atraso de 3 segundos permite que o sensor descanse antes de começar a detectar movimento novamente.

![Sinric Pro esp8266 PIR Multiple Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_multi_trigger.png) 

### Fiação

![Sinric Pro esp8266 PIR wiring]({{ site.github.url }}/public/img/sinric_pro_pir_sensor_wiring.png) 


| MCU       | Pino PIR    |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    5 (D1)    |
| Pico W    |    GP5  |

Vamos verificar se o sensor de movimento está conectado corretamente e funcionando.
<script src="https://gist.github.com/kakopappa/bc5a7152c02e4e692ca9ae6708fe6814.js"></script>


O Monitor Serial do Arduino IDE mostrará as detecções de movimento assim:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-motion-sensor-demo.mp4" type="video/mp4">
</video>

 
### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Sensor de Movimento**, descrição **Meu Sensor de Movimento** e selecione o tipo de dispositivo como **Motion Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro motion sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_motion_sensor_notifications.png)

Você pode definir o limite aqui para receber uma notificação push via aplicativo Sinric Pro quando movimento é detectado durante o **Dia** ou **Noite**. Use o Tempo de Re-disparo para definir o atraso entre notificações push.

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Você pode **gerar o código** usando o recurso **Zero Code** ou escrevê-lo você mesmo. Se você não tem experiência em programação, recomendamos usar o recurso Zero Code no Portal para gerar o código, baixar e carregar.

#### 2.2 Código Completo
  
<script src="https://gist.github.com/kakopappa/f4fd3d769144689f15cfc80d783e8c94.js"></script>
 
Agora você deve conseguir visualizar os movimentos via Alexa, SmartThings
  
![Sinric Pro motions via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_contact_motion_home_alexa_smartthings.png)

via Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_contact_motion_portal.png)

Note que Google Home não é suportado.

### Solução de Problemas

1. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)