---
title: Tutorial Wally
layout: post
lang: it
description: Tutorial Sinric Pro for Business. Crea un prodotto smart switch Wi-Fi a 2 vie (Wally) su ESP32, dalla definizione del prodotto al provisioning.
---

In questa sezione vediamo passo passo come creare un prodotto che vorremmo vendere in futuro, chiamato **Wally**. È un modulo smart switch mini Wi-Fi wireless a 2 vie 1/2 Way.

Nota che **sono supportati solo Espressif ESP32, ESP32C3, ESP32S3**

![Sinric Pro sinricpro wally]({{ site.github.url }}/public/img/sinricpro-wally.png)

#### Configura il profilo del prodotto

1. Accedi al tuo [Business Account](https://biz-portal.sinric.pro/)

2. Vai al menu *Products* e fai clic su *Add Product*.

![Sinric Pro sinricpro business acccount add product wally]({{ site.github.url }}/public/img/sinricpro-biz-acccount-add-product.png)

E inserisci i dettagli del tuo prodotto.

![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-details.png)

Poi vai alla scheda *Features*.

![Sinric Pro sinricpro business acccount enter product features]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-features.png)

**Device Type** : il tipo di dispositivo Sinric Pro. Può essere uno Switch, un Fan ecc. Come nel portal di Sinric Pro. 

**Identifier** : usiamo l'identifier per fare riferimento a questo dispositivo nello sketch Arduino. 

**Default Device Name** : puoi impostare un nome predefinito per il dispositivo. È il nome mostrato di default durante la configurazione del dispositivo.

**Default Device Description** : puoi impostare una descrizione predefinita per il dispositivo. È il nome mostrato di default durante la configurazione del dispositivo.

**Display Index** : l'ordine con cui viene mostrato durante la configurazione del dispositivo.


![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-default-values-example.png)

Fai clic su *Save* e poi su **Download** per scaricare il codice di provisioning del prodotto.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-download.png)

L'esempio scaricato viene fornito già con le funzioni essenziali, tra cui configurazione semplificata, supporto multi-WiFi, aggiornamenti OTA e controlli di salute, così puoi concentrarti sulle tue idee IoT senza dover implementare da zero queste funzionalità di base.

Cerca **sinricprobusinesssdk** in Arduino Library Manager per installare l'SDK Sinric Pro Business. 

![Sinric Pro Business SDK arduino IDE]({{ site.github.url }}/public/img/sinricpro-business-sdk.png)


Questo installerà anche *ArduinoJson (>=7.0.3), WebSockets (>=2.6.1), NimBLE-Arduino (>=1.4.2), SinricPro (>=3.2.1)*. Personalizza le mappature GPIO in base alla configurazione specifica del tuo dispositivo, compila e carica il firmware sul tuo hardware.

Poi, cambia in Arduino IDE Strumenti -> Partition Scheme -> Minimal SPIFF (1.9MB APP ...). 

![Sinric Pro sinricpro wally arduino IDE tools settings]({{ site.github.url }}/public/img/arduino-ide-settings.png)

Ora siamo pronti per caricare il codice.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-arduino-ide.png)

Trovi il codice di esempio completo qui:

[https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally](https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally)

#### Ora puoi configurare il prodotto tramite l'app Sinric Pro

1. Scarica l'app Sinric Pro da Google Play o dall'AppStore.

2. Crea un account e accedi.

3. Fai clic su *Add* e completa la configurazione. 

Ecco la demo del provisioning del prodotto:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/prov.mp4" type="video/mp4">
</video>

