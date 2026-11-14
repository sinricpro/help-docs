---
title: Guida alla procedura guidata di creazione dispositivo SinricPro
layout: post
lang: it
description: Guida passo passo alla procedura guidata di creazione dispositivo di Sinric Pro. Informazioni del dispositivo, notifiche, timer e altre impostazioni.
---
 

Questo documento fornisce una guida passo passo per creare un nuovo dispositivo sulla piattaforma SinricPro. Il processo è diviso in quattro sezioni principali: informazioni sul dispositivo, notifiche, timer e altre impostazioni.

## Passo 1: Informazioni sul dispositivo

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-info.png) 

Il primo passo nella creazione di un nuovo dispositivo consiste nel configurare le informazioni di base sul dispositivo.

### Campi

- **Device Name**
  - Inserisci un nome univoco per il tuo dispositivo. Questo nome verrà usato per identificare il dispositivo all'interno del tuo sistema di automazione domestica.
  - *Esempio*: "Bedroom Light"

- **Description**
  - Fornisci una breve descrizione dello scopo o della funzione del dispositivo.
  - *Esempio*: "Main light in the bedroom"

- **Device Type**
  - Seleziona il tipo di dispositivo appropriato dal menu a tendina:
    - Switch
    - Dimmable Switch
    - Light
    - TV
    - Speaker
    - Thermostat
    - Fan
    - Lock
    - Doorbell
    - Temperature Sensor
    - Motion Sensor
    - Contact Sensor
    - Windows Air Conditioner
    - Blinds
    - Garage Door
    - Camera
    - Custom Devices (una volta creato un dispositivo personalizzato in [Device Template]({{ site.github.url }}/it/pages/custom-templates.it.html), comparirà qui)

  - *Nota*: fai clic sul link `(How to create a custom device type?)` se vuoi scoprire come creare un tipo di dispositivo personalizzato.

- **App Key**
  - L'App Key è la credenziale univoca usata per autenticare il tuo dispositivo IoT quando si collega alla piattaforma SinricPro. Funziona come identificativo distinto per il tuo specifico modulo hardware all'interno dell'ecosistema SinricPro. Per garantire il corretto funzionamento ed evitare conflitti, scegli una App Key che corrisponda direttamente al tuo modulo hardware e usa una chiave diversa per ogni modulo. Quando crei un account, viene generata automaticamente una App Key predefinita.

- **Room & Home**
  - Assegna il dispositivo a una stanza e a una casa specifiche dall'elenco a tendina.
  - *Esempio*: "Bed Room (Home)"

## Passo 2: Notifiche

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-notifications.png) 

Configura quali eventi attivano le notifiche per il tuo dispositivo.

### Abilita notifiche
- **Alerts**: questo interruttore funziona come comando globale per abilitare o disabilitare l'invio di notifiche push da questo dispositivo all'app SinricPro (ad es.: `mySwitch.sendPushNotification("Hello SinricPro!")`).

### Notifiche basate su eventi

Puoi scegliere di ricevere notifiche quando si verificano determinati cambi di stato del dispositivo:

| Tipo di notifica | Descrizione                                  |
|-------------------|----------------------------------------------|
| **Connect**       | Avvisa quando il dispositivo si connette al cloud. |
| **Disconnect**    | Avvisa quando il dispositivo si disconnette.           |
| **On**            | Avvisa quando il dispositivo si accende.              |
| **Off**           | Avvisa quando il dispositivo si spegne.             |
| **Lock**          | Avvisa quando il blocco passa a chiuso                 |
| **Unlock**          | Avvisa quando il blocco passa ad aperto             |
| **Unlock**          | Avvisa quando il blocco passa ad aperto             |
| **PM2.5 Air Quality** | Avvisa quando la qualità dell'aria supera la soglia in μg/m3 |
| **PM2.5 Air Quality** | Avvisa quando la qualità dell'aria scende sotto la soglia in μg/m3 |
| **Motion**            | Avvisa quando viene rilevato un movimento (di giorno o di notte) |
| **Camera Motion**     | Avvisa quando viene scattata un'immagine in movimento                 |
| **Camera Snapshot**   | Avvisa quando viene scattato uno snapshot e descrive con l'IA cosa contiene   |
| **Doorbell**   | Avvisa quando viene premuto il campanello                            |
| **Open**       | Avvisa quando si apre (Garage Door, Contact Sensor o Blinds)                       |
| **Closed**       | Avvisa quando si chiude (Garage Door o Contact Sensor)                       |
| **Temperature**       | Avvisa quando la temperatura supera la soglia |
| **Temperature**       | Avvisa quando la temperatura scende sotto la soglia |

Cos'è il Retrigger Time?

> È il ritardo tra una notifica e la successiva. Serve a evitare l'invio continuo di notifiche push.

> **Suggerimento**: usa queste opzioni per monitorare lo stato del dispositivo e ricevere notifiche di aggiornamento in tempo reale tramite l'app SinricPro o le piattaforme collegate.


## Passo 3: Timer

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-timers.png) 

Configura comportamenti di accensione/spegnimento automatico per il tuo dispositivo usando timer gestiti dal cloud. Il ritardo minimo è di 3 secondi. L'intervallo massimo non può superare 1 giorno.

### Spegnimento automatico
- **Enable**: attiva per abilitare lo spegnimento automatico.
- **Delay**: imposta il numero di secondi dopo i quali il dispositivo si spegne automaticamente una volta acceso.
  - *Predefinito*: `3 secondi` (modificabile)
  - *Esempio*: impostando `5` → il dispositivo si spegne 5 secondi dopo essere stato acceso.

### Accensione automatica
- **Enable**: attiva per abilitare l'accensione automatica.
- **Delay**: imposta il numero di secondi dopo i quali il dispositivo si accende automaticamente una volta spento.
  - *Predefinito*: `3 secondi` (modificabile)
  - *Esempio*: impostando `10` → il dispositivo si accende 10 secondi dopo essere stato spento.

> **Nota**: i timer sono basati sul cloud, quindi non funzionano se il dispositivo è temporaneamente offline.

> **Casi d'uso**:
> - Luci lampeggianti o effetti strobo.
> - Spegnimento di sicurezza per stufe o motori.


## Passo 4: Altro

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-others.png) 

Fornisci metadati opzionali sul tuo dispositivo, in particolare sul consumo energetico.

### Consumo energetico (stima)

Attiva questa opzione per abilitare le funzioni di stima energetica. Il server calcola il consumo energetico del dispositivo in base ai tempi di accensione/spegnimento. Puoi visualizzare il consumo nel menu Energy Estimates del Portal.

#### Campi:
- **Stand by Wattage (W)**  
  Potenza consumata quando il dispositivo è spento o in standby.  
  > *Esempio*: presa smart = `0,5W`, TV = `5W`

- **On Wattage (W)**  
  Potenza consumata quando il dispositivo è in funzione.  
  > *Esempio*: lampadina LED = `9W`, ventilatore = `50W`

> **Perché è importante**:  
> I dati energetici aiutano gli utenti a stimare i costi dell'elettricità tramite le dashboard smart di Alexa.

> **Consiglio**:  
> Usa le specifiche del produttore o un wattmetro per avere valori precisi.


### Ripristina lo stato del dispositivo alla connessione

Quando questa funzione è attiva, il server SinricPro invia automaticamente lo stato più recente del dispositivo (ad esempio stato di alimentazione, luminosità, impostazioni personalizzate e altri dati rilevanti) subito dopo la riconnessione del dispositivo.

Ad esempio, se il tuo dispositivo era **acceso** quando è andato offline, al momento della riconnessione il server invierà quell'ultimo stato di alimentazione noto (`true`) al dispositivo, attivando il tuo callback `onPowerState` e ripristinando automaticamente lo stato precedente.

### Impostazioni personalizzate in SinricPro

Le Custom Settings ti permettono di definire e gestire parametri di configurazione specifici del tuo dispositivo, oltre alle capability standard offerte da SinricPro.

Ad esempio, potresti usare le Custom Settings per:  
- attivare o disattivare un LED integrato,
- impostare l'intensità minima dell'SSID necessaria per connettersi,
- impostare un **offset di temperatura** per un termostato,  
- un flag per attivare il **riavvio automatico** dopo un aggiornamento firmware,  
- configurare un **livello di luminosità predefinito** all'avvio.


[Tutorial completo sulle impostazioni]({{ site.github.url }}/it/pages/tutorials/general/sinricpro-settings-tutorial.it.html)

---

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)