---
title: IFTTT
weight: 4
lang: it
youtubeId: UHuVoE6kPB8
description: Integra i Webhook di IFTTT con Sinric Pro. Invia gli eventi dei dispositivi a IFTTT e controlla i dispositivi Sinric Pro dalle applet IFTTT.
---

**Come integrare i Webhook di IFTTT con Sinric Pro**

### Inviare eventi a IFTTT

Accedi al tuo account IFTTT. Trovi la API Key sotto il link **Documentation**, in alto a destra nella [pagina del servizio Webhooks](https://ifttt.com/maker_webhooks/).

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_how_to_get_api_key.png)

Copia la tua API Key di IFTTT e incollala in Menu -> Integrations -> IFTTT Webhooks
  
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_save_key.png)
Ora Sinric Pro è in grado di inviare a IFTTT gli **eventi** provenienti dalla tua scheda di sviluppo IoT (ad esempio ESP8266, ESP32, RaspPi).

Le richieste inviate da Sinric Pro a IFTTT hanno il formato seguente
https://maker.ifttt.com/trigger/**{event}**/with/key/**{key}**

**{event}** è l'azione (es.: setPowerState). Puoi vedere il payload completo [qui](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/03_Event.json) 

**{key}** è la tua API Key di IFTTT

Per costruire il corpo della richiesta, Sinric Pro estrae i dati inviati nel tuo evento come mostrato qui sotto 

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_iftt_payload_explained.png)

Come payload vengono usati i dati seguenti

**value1** = valore dell'evento. Es.: { "state": "On" }

**value2** = nome dell'azione dell'evento "setPowerState"

**value3** = deviceId, l'id del dispositivo contenuto nel messaggio
 
### Da IFTTT a Sinric Pro

Inviare un'azione a Sinric Pro è facile. 

1. Crea una nuova API Key in Sinric Pro
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_new_api_key.png)


2. Ora crea una nuova Applet in IFTTT

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinricpro-iftt-request.png)

URL:
**https://ifttt.sinric.pro/ifttt/v1/actions**

Metodo:
**POST**

Content Type (facoltativo) :
**application/json**

Body:

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


> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
