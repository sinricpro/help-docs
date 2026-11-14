---
title: IFTTT
weight: 4
lang: de
youtubeId: UHuVoE6kPB8
description: IFTTT Webhooks mit Sinric Pro verbinden. Geräteereignisse an IFTTT senden und Sinric Pro Geräte aus IFTTT Applets steuern.
---

**So verbindest du IFTTT Webhooks mit Sinric Pro**

### Ereignisse an IFTTT senden

Melde dich bei deinem IFTTT Konto an. Den API Key findest du über den Link **Documentation** oben rechts auf der [Seite des Webhooks-Dienstes](https://ifttt.com/maker_webhooks/).

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_how_to_get_api_key.png)

Kopiere deinen IFTTT API Key und füge ihn unter Menu -> Integrations -> IFTTT Webhooks ein
  
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_save_key.png)
Jetzt kann Sinric Pro **Ereignisse**, die von deinem IoT-Entwicklungsboard (z. B. ESP8266, ESP32, RaspPi) kommen, an IFTTT senden.

Anfragen von Sinric Pro an IFTTT haben das folgende Format
https://maker.ifttt.com/trigger/**{event}**/with/key/**{key}**

**{event}** ist die Aktion (z. B. setPowerState). Die vollständige Nutzlast siehst du [hier](https://github.com/sinricpro/sample_messages/blob/master/01_PowerState/01_setPowerState/03_Event.json) 

**{key}** ist dein IFTTT API Key

Beim Aufbau des Bodys entnimmt Sinric Pro die Daten aus deinem Ereignis wie unten gezeigt 

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_iftt_payload_explained.png)

Die folgenden Daten werden als Nutzlast verwendet

**value1** = Wert aus dem Ereignis. Beispiel: { "state": "On" }

**value2** = Name der Aktion aus dem Ereignis, "setPowerState"

**value3** = deviceId, die Geräte-ID aus der Nachricht
 
### Von IFTTT zu Sinric Pro

Eine Aktion an Sinric Pro zu senden ist einfach. 

1. Erstelle einen neuen API Key in Sinric Pro
![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinric_pro_ifttt_new_api_key.png)


2. Erstelle jetzt ein neues Applet in IFTTT

![Sinric Pro Google Home IFTTT]({{ site.github.url }}/public/img/sinricpro-iftt-request.png)

URL:
**https://ifttt.sinric.pro/ifttt/v1/actions**

Methode:
**POST**

Content Type (optional) :
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


> Dieses Dokument ist Open Source. Tippfehler entdeckt? Bitte erstelle ein [Issue](https://github.com/sinricpro/help-docs)