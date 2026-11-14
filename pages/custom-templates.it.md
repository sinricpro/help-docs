---
title: Template di dispositivo
weight: 2
lang: it
youtubeId: QJVbSPSztwY
description: Crea il tuo tipo di dispositivo in Sinric Pro con i template di dispositivo. Trascina le capability e genera il codice per ESP32 ed ESP8266.
---

### Introduzione 

I template di dispositivo (Device Templates) di SinricPro ti permettono di creare un tuo tipo di dispositivo trascinando le capability che descrivono le funzioni del tuo dispositivo IoT. Fanno da modello per creare tipi di dispositivo personalizzati in SinricPro. Puoi creare il tuo tipo di dispositivo combinando le capability seguenti.

| Capability | | |
|----------|----------|----------|
| [Brightness (luminosità)]({{ site.github.url }}/pages/device-templates/capabilities/brightness.html) | [Channel (canale)]({{ site.github.url }}/pages/device-templates/capabilities/channel.html) | [Color (colore)]({{ site.github.url }}/pages/device-templates/capabilities/color.html) |
| [Color Temperature (temperatura di colore)]({{ site.github.url }}/pages/device-templates/capabilities/color-temperature.html) | [Contact Sensor (sensore di contatto)]({{ site.github.url }}/pages/device-templates/capabilities/contact-sensor.html) | [Doorbell (campanello)]({{ site.github.url }}/pages/device-templates/capabilities/doorbell.html) |
| [Equalizer (equalizzatore)]({{ site.github.url }}/pages/device-templates/capabilities/equalizer.html) | [Input Control (selezione ingresso)]({{ site.github.url }}/pages/device-templates/capabilities/input-control.html) | [Lock (serratura)]({{ site.github.url }}/pages/device-templates/capabilities/lock.html) |
| [Media Control (controllo multimediale)]({{ site.github.url }}/pages/device-templates/capabilities/media-control.html) | [Mode (modalità)]({{ site.github.url }}/pages/device-templates/capabilities/mode.html) | [Motion Sensor (sensore di movimento)]({{ site.github.url }}/pages/device-templates/capabilities/motion-sensor.html) |
| [Open Close (apertura/chiusura)]({{ site.github.url }}/pages/device-templates/capabilities/open-close.html) | [Percentage (percentuale)]({{ site.github.url }}/pages/device-templates/capabilities/percentage.html) | [Power (accensione)]({{ site.github.url }}/pages/device-templates/capabilities/power.html) |
| [Power Level (livello di potenza)]({{ site.github.url }}/pages/device-templates/capabilities/power-level.html) | [Push Notification (notifica push)]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) | [Range (intervallo)]({{ site.github.url }}/pages/device-templates/capabilities/range.html) |
| [Setting (impostazione)]({{ site.github.url }}/pages/device-templates/capabilities/setting.html) | [Smart Button (pulsante smart)]({{ site.github.url }}/pages/device-templates/capabilities/smart-button.html) | [Start Stop (avvio/arresto)]({{ site.github.url }}/pages/device-templates/capabilities/start-stop.html) |
| [Temperature Sensor (sensore di temperatura)]({{ site.github.url }}/pages/device-templates/capabilities/temperature-sensor.html) | [Thermostat (termostato)]({{ site.github.url }}/pages/device-templates/capabilities/thermostat.html) | [Toggle (commutatore)]({{ site.github.url }}/pages/device-templates/capabilities/toggle.html) |
| [Volume]({{ site.github.url }}/pages/device-templates/capabilities/volume.html) | | |

### Limitazioni
Il numero di capability che puoi aggiungere dipende dal totale delle tue licenze. Ogni licenza ti permette di aggiungere una capability al tuo tipo di dispositivo personalizzato.

Quando ti registri, l'abbonamento iniziale include 3 dispositivi e ti permette quindi di aggiungere 3 capability.
Se acquisti un abbonamento aggiuntivo per 1 dispositivo, il totale sale a 4 dispositivi e hai diritto a 4 capability.
Aggiungendo un altro abbonamento per 1 dispositivo arrivi a 5 dispositivi e puoi aggiungere 5 capability.

Per aumentare le capability disponibili ti basta acquistare altre licenze per dispositivo.

### Come si crea un tipo di dispositivo personalizzato? 

Creiamo un tipo di dispositivo personalizzato chiamato **Washing Machine** (lavatrice): vediamo come definire diverse modalità di lavaggio, come *Hot, Warm e Cold* (caldo, tiepido e freddo), come generare il codice e come controllarlo con Amazon Alexa e Google Home.

##### Altri tutorial: [Umidità del terreno]({{ site.github.url }}/it/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.it.html), [Indicatore del livello dell'acqua]({{ site.github.url }}/it/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.it.html), [Sensore d'acqua]({{ site.github.url }}/it/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.it.html), [Sensore di qualità dell'aria: MQ135]({{ site.github.url }}/it/pages/tutorials/air-quality-sensors/mq135.it.html), [Sensore di gas]({{ site.github.url }}/it/pages/tutorials/custom-device-types/alcohol-sensor/MQ-3.it.html)

### Passo 1: Crea il template di dispositivo Washing Machine

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro.

* Apri il menu **Device Templates** a sinistra.

* Fai clic sul pulsante **Add Device Template**.
    * Template Name (nome del template): **Washing Machine**

    * Description (descrizione): **washing machine template** 

    * Device Type (tipo di dispositivo): **Other**
    
    *Nota*: seleziona il tipo di dispositivo che corrisponde meglio al tuo hardware e all'ecosistema di assistente vocale che vuoi usare. Alexa è compatibile con tutti i tipi di dispositivo, mentre Google Home ha una compatibilità limitata. Se non trovi nell'elenco il tipo di dispositivo che ti serve, contatta il nostro team di supporto.

![Sinric Pro device template]({{ site.github.url }}/public/img/sinric-pro-create-device-template-basic-info.png)

* Apri la scheda **Capabilities**.
* Ora dobbiamo trascinare le capability supportate dalla nostra lavatrice. 
* Trascina **Power**, perché vogliamo accendere e spegnere la lavatrice. 
* Trascina **Mode**, perché vogliamo impostare la temperatura di lavaggio su **Hot**, **Warm** e **Cold**.

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-capabilities.png)

* Fai clic sul pulsante **Configure** e definisci le tre modalità

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-modes.png)

* **InstanceId**: puoi lasciarlo così com'è. InstanceId serve a identificare in modo univoco una modalità quando ne aggiungi più di una

* **Locale**: scegli **English (US)**

* **Mode name**: inserisci **Wash Temperature**

* **Modes**: inserisci le modalità seguenti
    * Hot
    * Warm
    * Cold

* Fai clic su **Save** per salvare le modalità

* Fai clic su **Save**  per salvare il template

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/create-device-template.gif)

   
### Passo 2 : Crea il dispositivo Washing Machine

Ora creiamo un dispositivo a partire dal template di dispositivo creato prima.

* Apri il menu **Devices** e fai clic su **Add**. 

    * Device Name (nome del dispositivo): **Washing Machine**

    * Description (descrizione): **My washing machine at basement**

    * Device Type (tipo di dispositivo): seleziona **Washing Machine** sotto "Your Device Templates". È il template che abbiamo creato prima.

    * Device Access Key: lascia la selezione predefinita

    * Room (stanza): lascia la selezione predefinita
    
    * Fai clic su Next > Next > Next e poi su **Save**.

![Sinric Pro create a device from template]({{ site.github.url }}/public/img/sinric-pro-create-device-from-template.png)

### Passo 3 : Genera il codice per il dispositivo Washing Machine

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generate-code.png)

* Fai clic su **Code Generator** per generare il codice del dispositivo personalizzato. 

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generated-code.png)

* Sinric Pro genera il codice del dispositivo personalizzato per ESP8266/ESP32. Puoi scaricare il progetto come file zip, decomprimerlo ed eseguirlo. Assicurati di usare la
versione più recente dell'SDK Sinric Pro (v2.9.0). In caso contrario potresti vedere errori di compilazione nel tuo IDE

![Sinric Pro create a device and generate code from template]({{ site.github.url }}/public/img/create-device-template-and-generate-code.gif)
 
Quando cerchi i dispositivi in Alexa o Google, compare il dispositivo Washing Machine

### Passo 4 : Annunci vocali!

✅ Come funziona:

1️⃣ Aggiungi uno Switch in SinricPro (il tuo trigger segreto!)

2️⃣ Crea una routine Alexa che pronuncia il tuo messaggio, per esempio "Il lavaggio è finito!", quando lo Switch viene acceso

3️⃣ Invia dal tuo codice un evento di stato di accensione per portare quello Switch su ON

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
```

{% include youtubePlayer.html id=page.youtubeId %}

> Questo documento è open source. Hai trovato un errore? Crea una [issue](https://github.com/sinricpro/help-docs)
