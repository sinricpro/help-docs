---
title: Node-RED
weight: 4
lang: de
youtubeId: YYjxLY7zioo
description: Befehle von Alexa, Google Home und SmartThings mit dem Sinric Pro Node-RED Plugin in Node-RED empfangen. Installation und Beispiel-Flow.
---

Mit unserem Node-RED Plugin kannst du jetzt Befehle von Amazon Alexa, Google Home oder SmartThings in Node-RED empfangen.

**Installation**

Klicke oben rechts auf das Hamburger-Menü und wähle Manage palette, wähle Install, gib [**@sinricpro/node-red-contrib-sinric-pro**](https://flows.nodered.org/node/@sinricpro/node-red-contrib-sinric-pro) ein und klicke auf die Schaltfläche zum Installieren.

Stelle bitte sicher, dass die Git-Kommandozeilenwerkzeuge installiert sind.  Wenn du eine Debian-basierte Distribution wie Ubuntu verwendest, versuche es mit apt:

```
sudo apt install git-all
```

Andernfalls sieh bitte in der Git-Dokumentation nach

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


![Sinric Pro Node-RED installtion]({{ site.github.url }}/public/img/sinricpro_node_red_install.png)

Nach Abschluss der Installation sollte in der Kategorie **sinricpro** eine neue Gruppe von Nodes erscheinen

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinricpro_node_red_nodes.png)

**Verwendung**

* Öffne Sinric Pro [**hier**](https://sinric.pro)

* Erstelle ein Konto oder melde dich mit deiner E-Mail-Adresse an.

* Lege ein neues Gerät an und klicke auf Save. 

Kopiere auf der letzten Seite Device Id, App Key und App Secret. 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Erstelle einen neuen Flow oder verwende einen vorhandenen und füge einen device-Node hinzu.

* Bearbeite den device-Node. Trage die App-Zugangsdaten und die Gerätedaten ein.

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinric_pro_nodered_app_credential.png)

Sobald der device-Node konfiguriert ist, werden Sprachbefehle für das oben genannte Gerät in SinricPro an diesen Node-RED Node weitergeleitet. 

* Du kannst einen weiteren Node (function) hinzufügen, um diese Ausgabe zu verarbeiten. 

![Sinric Pro Node-RED function node]({{ site.github.url }}/public/img/sinric_pro_nodered_function_node.png)

* Füge einen **response**-Node hinzu, um die Antwort an den Sinric Pro Server zurückzusenden.

![Sinric Pro Node-RED response node]({{ site.github.url }}/public/img/sinric_pro_node_red_response.png)

{% include youtubePlayer.html id=page.youtubeId %}
 
Weitere Beispiele findest du im [**Beispiel**](https://github.com/sinricpro/node-red-contrib-sinric-pro/tree/main/examples)-Repository.