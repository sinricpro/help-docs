---
title: Node-RED
weight: 4
lang: it
youtubeId: YYjxLY7zioo
description: Ricevi i comandi di Alexa, Google Home e SmartThings in Node-RED con il plugin Sinric Pro per Node-RED. Installazione e flusso di esempio.
---

Con il nostro plugin per Node-RED ora puoi ricevere in Node-RED i comandi di Amazon Alexa, Google Home o SmartThings.

**Installazione**

Fai clic sul menu hamburger nell'angolo in alto a destra e seleziona Manage palette, poi Install, digita [**@sinricpro/node-red-contrib-sinric-pro**](https://flows.nodered.org/node/@sinricpro/node-red-contrib-sinric-pro) e fai clic sul pulsante di installazione.

Assicurati che gli strumenti da riga di comando di Git siano installati.  Se usi una distribuzione basata su Debian, come Ubuntu, prova con apt:

```
sudo apt install git-all
```

Altrimenti consulta la documentazione di Git

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


![Sinric Pro Node-RED installtion]({{ site.github.url }}/public/img/sinricpro_node_red_install.png)

Al termine dell'installazione, nella categoria **sinricpro** dovrebbe comparire un nuovo gruppo di nodi

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinricpro_node_red_nodes.png)

**Come si usa**

* Vai su Sinric Pro [**qui**](https://sinric.pro)

* Crea un account oppure accedi con il tuo indirizzo email.

* Crea un nuovo dispositivo e fai clic su Save. 

Copia Device Id, App Key e App Secret dall'ultima pagina. 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Crea un nuovo flusso o usane uno esistente e aggiungi un nodo device.

* Modifica il nodo device. Inserisci le credenziali dell'app e i dati del dispositivo.

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinric_pro_nodered_app_credential.png)

Una volta configurato il nodo device, i comandi vocali relativi a quel dispositivo in SinricPro verranno inoltrati a questo nodo di Node-RED. 

* Puoi aggiungere un altro nodo (function) per elaborare questo output. 

![Sinric Pro Node-RED function node]({{ site.github.url }}/public/img/sinric_pro_nodered_function_node.png)

* Aggiungi un nodo **response** per inviare la risposta al server Sinric Pro.

![Sinric Pro Node-RED response node]({{ site.github.url }}/public/img/sinric_pro_node_red_response.png)

{% include youtubePlayer.html id=page.youtubeId %}
 
Dai un'occhiata al repository degli [**esempi**](https://github.com/sinricpro/node-red-contrib-sinric-pro/tree/main/examples) per altri esempi.
