---
title: Automazioni
weight: 4
lang: it
description: Crea automazioni Sinric Pro con il drag and drop. Attiva i dispositivi in base a orario, alba o tramonto, ritardi ed eventi dei dispositivi, e invia notifiche push.
---

### Introduzione alle automazioni di SinricPro

SinricPro ti permette di creare routine intelligenti e automatizzate per la tua smart home, collegando i dispositivi e definendo flussi di lavoro logici. Con il suo intuitivo editor di automazioni drag and drop puoi progettare scenari personalizzati che reagiscono agli eventi, siano essi attivati dallo stato di un dispositivo, dall'orario o dalle condizioni ambientali, senza scrivere una sola riga di codice.

Da operazioni semplici come accendere le luci al tramonto fino a sequenze complesse che coinvolgono più dispositivi e ritardi temporizzati, le automazioni di SinricPro rendono la tua smart home più intelligente e reattiva. Che tu stia impostando routine per la vita di tutti i giorni o creando esperienze personalizzate, lo strumento di automazione di SinricPro offre flessibilità, facilità d'uso e funzionalità potenti, il tutto in un'interfaccia pulita e facile da usare.

## Passo 1: Informazioni di base

![Sinric Pro automation creation intro]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-info.png) 

Il primo passo per creare un'automazione è fornire le informazioni di base.

### Campi

- **Automation Name**  
  Inserisci un nome descrittivo per la tua automazione.  
  *Esempio:* `TV Time`

- **Automation Description**  
  Fornisci una breve descrizione di ciò che fa l'automazione. Ti aiuterà a ricordarne lo scopo in seguito.  
  *Esempio:* `When TV is on, dim lights`

### Navigazione
Dopo aver compilato le informazioni di base, fai clic sul pulsante **Next** per passare alla configurazione del flusso.

---

## Passo 2: Configurazione del flusso

![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-flow.png) 

In questo passo definisci la logica della tua automazione impostando gli starter, le condizioni (facoltative) e le azioni.

### Starter, condizioni e azioni dei dispositivi

Questo pannello elenca i dispositivi disponibili che possono essere usati come trigger o componenti della tua automazione. Puoi trascinare questi dispositivi nelle sezioni appropriate (Starter, Conditions o Actions).

#### **Starter**

È l'evento che avvia l'automazione. È la parte "quando" o "se" che mette in moto il processo. Esempio: `TV turned on`

#### **Conditions (facoltative)**

Sono controlli aggiuntivi eseguiti dopo che lo starter si è verificato. Se le condizioni specificate non sono soddisfatte, le azioni dell'automazione non vengono eseguite, anche se lo starter è stato attivato.

#### **Actions**

Le azioni da eseguire. Ad esempio: accendere le luci, regolare il termostato.

 
####  Trigger aggiuntivi basati su eventi:

- **At a specific time**  
  *Esempio:* `5:30pm on a Sunday`  
  Attiva l'automazione a un orario prestabilito.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-select-a-time.png)


- **At sunrise or sunset**  
  *Esempio:* `1hr before sunrise`  
  Si attiva in base a eventi astronomici.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-sunset-or-sunrise.png)

- **Between two times**  
  *Esempio:* `between 08:00 to 18:00`  
  Esegue l'automazione solo durante una fascia oraria specificata. (Usato come condizione)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-between-two-times.png) 

- **Time delay**  

  Aggiunge un ritardo tra i passi del flusso dell'automazione. (Usato come azione)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-add-time-delay.png) 

- **Push Notification**  
  Invia una notifica push quando viene attivata.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-push-notification.png) 

> 💡 Suggerimento: usa queste opzioni per aggiungere alla tua automazione una logica basata sul tempo o sul contesto.

Una volta configurate tutte le parti dell'automazione:

- Fai clic sul pulsante **Save** nell'angolo in basso a destra per salvare la tua automazione.

---

## Esempio di flusso di automazione

Vediamo un esempio passo per passo:

1. **Basic Info**
   - Automation Name: `Evening Lights`
   - Automation Description: `Turn on living room lights at sunset`

2. **Flow**
   - **Starter:** aggiungi "At sunset" dal pannello di destra.
   - **Conditions:** nessuna (facoltative).
   - **Actions:** trascina "living room light" nella sezione Actions e impostala sull'accensione.

In questo modo crei una semplice automazione che accende le luci del soggiorno ogni sera al tramonto.

---

## Buone pratiche

- Usa nomi e descrizioni chiari e concisi.
- Prova le automazioni dopo averle salvate per assicurarti che funzionino come previsto.
- Combina gli eventi dei dispositivi con trigger basati sul tempo per una casa dal comportamento più intelligente.
