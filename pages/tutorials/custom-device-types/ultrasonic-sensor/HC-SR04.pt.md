---
title: Indicador de Nível de Água (Tanque de Água) usando Sensor Ultrassônico (HC-SR04) para ESP8266, ESP32, Raspberry Pi Pico W para Alexa
layout: post
lang: pt
---
 
Nesta parte, vamos orientá-lo na construção de um **Indicador de Nível de Água (também conhecido como Indicador de Tanque de Água)** usando um **Sensor Ultrassônico** que pode ser conectado a um **ESP32, ESP8266 ou Raspberry Pi Pico W**. Uma vez configurado, você poderá medir níveis de água usando Amazon Alexa, perguntar à Alexa sobre informações dele, e também monitorá-lo através do aplicativo Sinric Pro e *receber uma notificação push quando o nível de água estiver baixo*.


![Sinric Pro HC-SR04 Ultrasonic Sensor ]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-intro.png)

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. Sensor Ultrassônico (HC-SR04) x 1.
3. Planta com vaso x 1.
4. Cabos Jumper.

 

### Introdução rápida ao Sensor Ultrassônico
Os sensores ultrassônicos são sensores de baixo custo e fáceis de usar que podem medir distância. Funciona enviando uma rajada de som ultrassônico e então **medindo o tempo que leva para o eco retornar**. A distância para o objeto é então calculada baseada na velocidade do som.

É alimentado por uma fonte de 5V DC e tem quatro pinos: **VCC, GND, TRIG e ECHO**. Uma vez que o sensor está conectado, você pode usá-lo para medir distância enviando um pulso para o pino TRIG e então medindo o tempo que leva para o pino ECHO ficar alto. A distância para o objeto pode então ser calculada usando a seguinte fórmula:

> distância = (tempo * velocidade do som) / 2

onde:

- `distância` está em centímetros.
- `tempo` está em microssegundos.
- `velocidade do som` é 343 metros por segundo.
 
De acordo com as notas do fabricante, o sensor HC-SR04 **funciona melhor** entre 2cm – 400 cm (1" - 13ft) dentro de um cone de 30 graus.

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-practical-test.png) 

### Fiação do Sensor Ultrassônico

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-wiring.png) 


| Pino HC-SR04 | ESP8266 | ESP32    | Pico W |
| --------- | ------- | -------    | -------    |
| VCC       |    5V   | 5V         | 5V         |
| GND       |    GND  | GND        | GND        |
| TRIG      |    12 (D6)  | GPIO 5  | 15        |
| ECHO      |    14 (D5)  | GPIO 18 | 14        |



Vamos verificar se o sensor está conectado corretamente e funcionando.
 
<script src="https://gist.github.com/kakopappa/83febb46592b067c79a0dd55136405a6.js"></script>

![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-test-readings.png) 

Vamos tentar medir o nível de água como uma porcentagem.
 
<script src="https://gist.github.com/kakopappa/175f772413b433241acaca6234257cf2.js"></script>

![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-water-tank-measurements-as-precentage.png) 
 
### Passo 1: Conectar ao Sinric Pro

#### Passo 1.1: Criando um tipo de dispositivo personalizado para Indicador de Nível de Água.

Sinric Pro não tem um tipo de dispositivo integrado para Indicador de Nível de Água, então vamos criar um tipo de dispositivo personalizado para suportar mostrar Indicador de Nível de Água usando o recurso Device Template.

**Nota**: Você pode usar o recurso de importação de template de dispositivo mencionado abaixo para pular a criação do template completo.

* [Faça login](https://portal.sinric.pro/devicetemplates/new) na sua conta Sinric Pro e vá para **Device Templates**

* Clique em **Add Device Template**. Digite nome e descrição como **Water Level Indicator** e selecione **Water Tank** como tipo de dispositivo

![sinricpro water tank new device template basic info]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-basic-info.png) 

* Clique em **Capabilities**.

Aqui devemos selecionar as características do nosso Sensor. Queremos saber o *Nível de água* como uma porcentagem. Então vamos arrastar uma capacidade **Range** e **Push Notification**.

![sinricpro water tank new device template capabilities]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-capabilities.png) 

- O que é capacidade Range?

  A capacidade Range pode ser usada para representar um número. ex: velocidade atual de um liquidificador.

- O que é capacidade Push Notification?

  A capacidade Notification fornece a habilidade de enviar uma mensagem de notificação push do código.

Clique no botão **Configure** e configure as duas capacidades como abaixo.

![sinricpro water tank device template range capability]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-range-capability.png)  

Clique em **Save** para salvar.

Clique em **Save** para salvar o template.

Agora você pode ver o template que acabamos de criar.


## Importar um template existente?

Se você está com preguiça, você pode usar o recurso de importação.

![Sinric Pro import template json]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Cole este Template:
<script src="https://gist.github.com/kakopappa/a04eef3577a55be6df4ad098ec8df031.js"></script>

* Vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **Tanque de Água**, descrição **Tanque de Água** e selecione o tipo de dispositivo como **Water Level Indicator**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-from-template.png)

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

* Clique em **Code Generator** para Gerar o código. Clique em **Download** para baixar o código.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-code-download.png)
 

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo

<script src="https://gist.github.com/kakopappa/206044afbcaa9aca36fc6538f639688a.js"></script>

 
Agora você deve conseguir ver o nível de água do tanque via Alexa, App Sinric Pro

Alexa, Qual é o nível de água(nome do range) no tanque de água(nome do dispositivo)

![Sinric Pro Alexa HC-SR04 sensor]({{ site.github.url }}/public/img/sinricpro-water-tank-alexa.jpg)
 
![Sinric Pro Alexa HC-SR04 portal]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-portal.png)

![Sinric Pro water tank app]({{ site.github.url }}/public/img/sinricpro-water-tank-hc-sr04.png)

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-tank.mp4" type="video/mp4">
</video>

### Passo 3: Tornando as alturas de Tanque Cheio e Vazio configuráveis via UI

#### 3.1 Atualizar template do dispositivo

Para tornar a altura do tanque cheio e vazio configurável via UI, precisamos voltar ao template de dispositivo personalizado e adicionar mais dois Range Controllers para **Altura do Tanque Cheio** e **Altura do Tanque Vazio** como abaixo.

![Full Empty ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-empty-tank-height.png)

O template completo do dispositivo ficaria assim

![Full Template ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-template.png)

Aqui está o template com alturas cheio e vazio. Você pode importar isso na seção Device Template.

<script src="https://gist.github.com/kakopappa/0ca54644b4abbd05c164e2bdd3dcf052.js"></script>


#### 3.2 Código Completo

<script src="https://gist.github.com/kakopappa/2b20b0086bb0a6de500c08407acd3943.js"></script>

![Tank control with Alexa and SinricPro App ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-alexa-sinricpro.jpg)

É isso.

### Solução de Problemas
1. Google Home ou SmartThings não são suportados.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.
 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)