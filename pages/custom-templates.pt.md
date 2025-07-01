---
title: Templates de Dispositivo
weight: 2
lang: pt
youtubeId: QJVbSPSztwY
---

### Introdução

Templates de Dispositivo no SinricPro permite que você crie seu próprio tipo de dispositivo arrastando e soltando capacidades que descrevem as características do seu dispositivo IoT. Eles servem como modelos para criar tipos de dispositivos personalizados no SinricPro. Você pode criar seu próprio tipo de dispositivo agrupando as seguintes capacidades.

| Capacidades | | |
|----------|----------|----------|
| [Brightness]({{ site.github.url }}/pt/pages/device-templates/capabilities/brightness.html) | [Channel]({{ site.github.url }}/pt/pages/device-templates/capabilities/channel.html) | [Color]({{ site.github.url }}/pt/pages/device-templates/capabilities/color.html) |
| [Color Temperature]({{ site.github.url }}/pt/pages/device-templates/capabilities/color-temperature.html) | [Contact Sensor]({{ site.github.url }}/pt/pages/device-templates/capabilities/contact-sensor.html) | [Doorbell]({{ site.github.url }}/pt/pages/device-templates/capabilities/doorbell.html) |
| [Equalizer]({{ site.github.url }}/pt/pages/device-templates/capabilities/equalizer.html) | [Input Control]({{ site.github.url }}/pt/pages/device-templates/capabilities/input-control.html) | [Lock]({{ site.github.url }}/pt/pages/device-templates/capabilities/lock.html) |
| [Media Control]({{ site.github.url }}/pt/pages/device-templates/capabilities/media-control.html) | [Mode]({{ site.github.url }}/pt/pages/device-templates/capabilities/mode.html) | [Motion Sensor]({{ site.github.url }}/pt/pages/device-templates/capabilities/motion-sensor.html) |
| [Open Close]({{ site.github.url }}/pt/pages/device-templates/capabilities/open-close.html) | [Percentage]({{ site.github.url }}/pt/pages/device-templates/capabilities/percentage.html) | [Power]({{ site.github.url }}/pt/pages/device-templates/capabilities/power.html) |
| [Power Level]({{ site.github.url }}/pt/pages/device-templates/capabilities/power-level.html) | [Push Notification]({{ site.github.url }}/pt/pages/device-templates/capabilities/push-notification.html) | [Range]({{ site.github.url }}/pt/pages/device-templates/capabilities/range.html) |
| [Setting]({{ site.github.url }}/pt/pages/device-templates/capabilities/setting.html) | [Smart Button]({{ site.github.url }}/pt/pages/device-templates/capabilities/smart-button.html) | [Start Stop]({{ site.github.url }}/pt/pages/device-templates/capabilities/start-stop.html) |
| [Temperature Sensor]({{ site.github.url }}/pt/pages/device-templates/capabilities/temperature-sensor.html) | [Thermostat]({{ site.github.url }}/pt/pages/device-templates/capabilities/thermostat.html) | [Toggle]({{ site.github.url }}/pt/pages/device-templates/capabilities/toggle.html) |
| [Volume]({{ site.github.url }}/pt/pages/device-templates/capabilities/volume.html) | | |

### Limitações
O número de capacidades que você pode adicionar é baseado no total de suas licenças. Cada licença permite adicionar uma capacidade ao seu tipo de dispositivo personalizado.

Quando você se inscreve, sua assinatura inicial inclui 3 dispositivos, permitindo adicionar 3 capacidades.
Se você comprar uma assinatura adicional de 1 dispositivo, seu total aumenta para 4 dispositivos, dando direito a 4 capacidades.
Adicionar outra assinatura de 1 dispositivo traz seu total para 5 dispositivos, permitindo adicionar 5 capacidades.

Para expandir suas capacidades disponíveis, simplesmente compre licenças adicionais de dispositivo.

### Como fazer um tipo de dispositivo personalizado?

Vamos criar um tipo de dispositivo personalizado chamado **Máquina de Lavar**, aprender como definir diferentes modos de lavagem como: *Quente, Morna e Fria* e gerar o código e controlar usando Amazon Alexa e Google Home.

##### Mais Tutoriais: [Umidade do Solo]({{ site.github.url }}/pt/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.pt.html), [Indicador de Nível de Água]({{ site.github.url }}/pt/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.pt.html), [Sensor de Água]({{ site.github.url }}/pt/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.pt.html), [Sensor de Qualidade do Ar: MQ135]({{ site.github.url }}/pt/pages/tutorials/air-quality-sensors/mq135.pt.html), [Sensor de Gás]({{ site.github.url }}/pt/pages/tutorials/custom-device-types/alcohol-sensor/MQ-3.pt.html)

### Passo 1: Criar template de dispositivo da Máquina de Lavar

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro.

* Vá ao menu **Device Templates** à esquerda.

* Clique no botão **Add Device Template**.
    * Nome do Template: **Washing Machine**

    * Descrição: **template da máquina de lavar** 

    * Tipo de Dispositivo: **Other**
    
    *Nota*: Selecione o tipo de dispositivo que melhor corresponde ao seu hardware e seu ecossistema de assistente de voz alvo. Embora Alexa seja compatível com todos os tipos de dispositivos, Google Home tem compatibilidade limitada. Se você não ver o tipo de dispositivo pretendido listado, entre em contato com nossa equipe de suporte.

![Sinric Pro device template]({{ site.github.url }}/public/img/sinric-pro-create-device-template-basic-info.png)

* Vá para a aba **Capabilities**.
* Agora devemos arrastar e soltar as capacidades suportadas pela nossa máquina de lavar.
* Arraste e solte **Power** porque queremos ligar/desligar nossa Máquina de Lavar.
* Arraste e solte **Mode** porque queremos definir a temperatura de lavagem para: **Quente**, **Morna** e **Fria**.

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-capabilities.png)

* Clique no botão **Configure** e defina os três modos

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-modes.png)

* **InstanceId**: Você pode deixar como está. Usamos InstanceId para identificar exclusivamente um modo quando você adiciona múltiplos modos

* **Locale**: Escolha **English (US)**

* **Nome do modo**: Digite **Wash Temperature**

* **Modos**: Digite os seguintes modos
    * Hot
    * Warm
    * Cold

* Clique em **Save** para salvar os modos

* Clique em **Save** para salvar o template

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/create-device-template.gif)

   
### Passo 2: Criando Dispositivo da Máquina de Lavar

Agora vamos criar um dispositivo a partir do template de dispositivo que criamos anteriormente.

* Vá ao menu **Devices** e clique em **Add**. 

    * Nome do Dispositivo: **Washing Machine**

    * Descrição: **Minha máquina de lavar no porão**

    * Tipo de Dispositivo: Selecione **Washing Machine** em "Your Device Templates". Este é o template que criamos anteriormente.

    * Chave de Acesso do Dispositivo: Deixe a seleção padrão

    * Sala: Deixe a seleção padrão
    
    * Clique em Next > Next > Next e **Save**.

![Sinric Pro create a device from template]({{ site.github.url }}/public/img/sinric-pro-create-device-from-template.png)

### Passo 3: Gerando Código para Dispositivo da Máquina de Lavar

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generate-code.png)

* Clique em **Code Generator** para gerar o código de dispositivo personalizado.

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generated-code.png)

* Sinric Pro gerará o código de dispositivo personalizado para ESP8266/ESP32. Você pode baixar o projeto como arquivo zip, descompactar e executar. Certifique-se de estar usando a versão mais recente do Sinric Pro SDK (v2.9.0). Caso contrário, você pode ver erros de compilação no seu IDE

![Sinric Pro create a device and generate code from template]({{ site.github.url }}/public/img/create-device-template-and-generate-code.gif)
 
Quando você descobrir os dispositivos na Alexa, Google, o dispositivo Máquina de Lavar será exibido

{% include youtubePlayer.html id=page.youtubeId %}

> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)