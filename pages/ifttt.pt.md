---
title: IFTTT
weight: 4
lang: pt
youtubeId: UHuVoE6kPB8
description: Integre os Webhooks do IFTTT ao Sinric Pro. Envie eventos dos dispositivos para o IFTTT e controle dispositivos Sinric Pro a partir de applets do IFTTT.
---

**Como integrar os Webhooks do IFTTT ao Sinric Pro**

### Enviando eventos para o IFTTT

Faça login na sua conta IFTTT. Obtenha a chave de API no link **Documentation**, no canto superior direito da [página do serviço Webhooks](https://ifttt.com/maker_webhooks/).

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_how_to_get_api_key.png)

Copie sua chave de API do IFTTT e cole em Menu -> Integrations -> IFTTT Webhooks
  
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_save_key.png)
Agora o Sinric Pro consegue enviar para o IFTTT os **eventos** vindos da sua placa de desenvolvimento IoT (como ESP8266, ESP32, RaspPi).

As requisições feitas pelo Sinric Pro ao IFTTT terão o formato abaixo
https://maker.ifttt.com/trigger/**{event}**/with/key/**{key}**

**{event}** é a ação (ex.: setPowerState). Você pode ver o payload completo [aqui](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/03_Event.json) 

**{key}** é a sua chave de API do IFTTT

Ao montar o corpo da requisição, o Sinric Pro extrai os dados enviados no seu evento como mostrado abaixo 

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_iftt_payload_explained.png)

Os dados a seguir são usados como payload

**value1** = valor do evento. Ex.: { "state": "On" }

**value2** = nome da ação do evento, "setPowerState"

**value3** = deviceId, o id do dispositivo presente na mensagem
 
### Do IFTTT para o Sinric Pro

Enviar uma ação para o Sinric Pro é fácil. 

1. Crie uma nova chave de API no Sinric Pro
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_new_api_key.png)


2. Agora, crie um novo Applet no IFTTT

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinricpro-iftt-request.png)

URL:
**https://ifttt.sinric.pro/ifttt/v1/actions**

Método:
**POST**

Content Type (opcional) :
**application/json**

Corpo:

{% highlight json %}   
{
   "api_key":"API key from step 1",
   "device_id":"device id from portal",
   "action":"setPowerState",
   "value":{
      "state":"On"
   }
}
{% endhighlight %}


> Este documento é de código aberto. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
