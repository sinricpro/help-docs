---
title: Wally Tutorial
layout: post
lang: de
description: Sinric Pro for Business Tutorial. Erstelle ein 2-fach-WLAN-Smart-Switch-Produkt (Wally) auf dem ESP32, von der Produktdefinition bis zur Provisionierung.
---

In diesem Abschnitt gehen wir Schritt für Schritt durch, wie man ein Produkt erstellt, das wir in Zukunft verkaufen möchten: **Wally**. Es handelt sich um ein kabelloses 2-fach-1/2-Wege-WLAN-Mini-Smart-Switch-Modul.

Bitte beachte, dass **nur Espressif ESP32, ESP32C3 und ESP32S3 unterstützt werden**

![Sinric Pro sinricpro wally]({{ site.github.url }}/public/img/sinricpro-wally.png)

#### Produktprofil einrichten

1. Melde dich bei deinem [Business Account](https://biz-portal.sinric.pro/) an

2. Gehe zum Menü *Products* und klicke auf *Add Product*.

![Sinric Pro sinricpro business acccount add product wally]({{ site.github.url }}/public/img/sinricpro-biz-acccount-add-product.png)

Und gib die Details zu deinem Produkt ein.

![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-details.png)

Gehe dann zum Tab *Features*.

![Sinric Pro sinricpro business acccount enter product features]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-features.png)

**Device Type**: Sinric Pro Gerätetyp. Kann ein Switch, Fan usw. sein. Genau wie im Sinric Pro Portal. 

**Identifier**: Mit dem Identifier wird dieses Gerät im Arduino-Sketch angesprochen. 

**Default Device Name**: Du kannst einen Standardgerätenamen für das Gerät festlegen. Dieser Name wird während der Geräteeinrichtung als Standard angezeigt.

**Default Device Description**: Du kannst eine Standardbeschreibung für das Gerät festlegen. Diese wird während der Geräteeinrichtung als Standard angezeigt.

**Display Index**: Die Reihenfolge, in der die Geräte während der Einrichtung angezeigt werden.


![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-default-values-example.png)

Klicke auf *Save* und dann auf **Download**, um den Provisionierungscode für das Produkt herunterzuladen.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-download.png)

Das herunterladbare Beispiel bringt bereits wichtige Funktionen mit, darunter eine einfache Einrichtung, Unterstützung für mehrere WLANs, OTA-Updates und Health-Checks. So kannst du dich auf deine eigenen IoT-Ideen konzentrieren, ohne diese grundlegenden Funktionen selbst implementieren zu müssen.

Suche im Arduino Bibliotheksverwalter nach **sinricprobusinesssdk**, um das SinricPro Business SDK zu installieren. 

![Sinric Pro Business SDK arduino IDE]({{ site.github.url }}/public/img/sinricpro-business-sdk.png)


Dabei werden auch *ArduinoJson (>=7.0.3), WebSockets (>=2.6.1), NimBLE-Arduino (>=1.4.2), SinricPro (>=3.2.1)* installiert. Passe die GPIO-Zuordnungen an deine konkrete Gerätekonfiguration an, kompiliere die Firmware und spiele sie auf deine Hardware auf.

Ändere anschließend in der Arduino IDE unter Werkzeuge -> Partition Scheme -> Minimal SPIFF (1.9MB APP ...). 

![Sinric Pro sinricpro wally arduino IDE tools settings]({{ site.github.url }}/public/img/arduino-ide-settings.png)

Jetzt können wir den Code aufspielen.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-arduino-ide.png)

Den vollständigen Beispielcode findest du hier:

[https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally](https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally)

#### Jetzt kannst du das Produkt über die Sinric Pro App einrichten

1. Lade die Sinric Pro App aus dem Google Play Store oder dem AppStore herunter.

2. Erstelle ein Konto und melde dich an.

3. Klicke auf *Add* und schließe den Einrichtungsvorgang ab. 

Hier ist eine Demo der Produktprovisionierung:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/prov.mp4" type="video/mp4">
</video>

