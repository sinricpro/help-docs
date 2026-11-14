---
title: IFTTT
weight: 4
lang: es
youtubeId: UHuVoE6kPB8
description: Integra los Webhooks de IFTTT con Sinric Pro. Envía eventos de tus dispositivos a IFTTT y controla dispositivos Sinric Pro desde applets de IFTTT.
---

**Cómo integrar los Webhooks de IFTTT con Sinric Pro**

### Enviar eventos a IFTTT

Inicia sesión en tu cuenta de IFTTT. Obtén la API Key en el enlace **Documentation**, arriba a la derecha de la [página del servicio Webhooks](https://ifttt.com/maker_webhooks/).

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_how_to_get_api_key.png)

Copia tu API Key de IFTTT y pégala en Menu -> Integrations -> IFTTT Webhooks
  
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_save_key.png)
Ahora Sinric Pro puede enviar a IFTTT los **eventos** que llegan de tu placa de desarrollo IoT (como ESP8266, ESP32 o RaspPi).

Las solicitudes que Sinric Pro envía a IFTTT tienen el siguiente formato
https://maker.ifttt.com/trigger/**{event}**/with/key/**{key}**

**{event}** es la acción (p. ej.: setPowerState). Puedes ver el payload completo [aquí](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/03_Event.json) 

**{key}** es tu API Key de IFTTT

Al construir el cuerpo, Sinric Pro extrae los datos enviados en tu evento como se muestra a continuación 

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_iftt_payload_explained.png)

Se usan los siguientes datos como payload

**value1** = valor del evento. P. ej.: { "state": "On" }

**value2** = nombre de la acción del evento, "setPowerState"

**value3** = deviceId, el id del dispositivo indicado en el mensaje
 
### De IFTTT a Sinric Pro

Enviar una acción a Sinric Pro es fácil. 

1. Crea una nueva API Key en Sinric Pro
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_new_api_key.png)


2. Ahora crea un nuevo Applet en IFTTT

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinricpro-iftt-request.png)

URL:
**https://ifttt.sinric.pro/ifttt/v1/actions**

Método:
**POST**

Content Type (opcional) :
**application/json**

Cuerpo:

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


> Este documento es de código abierto. ¿Has visto una errata? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)
