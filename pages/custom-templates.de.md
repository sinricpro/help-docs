---
title: Gerätevorlagen
weight: 2
lang: de
youtubeId: QJVbSPSztwY
description: Erstelle in Sinric Pro mit Gerätevorlagen deinen eigenen Gerätetyp. Fähigkeiten per Drag-and-drop zusammenstellen und den Code für ESP32 und ESP8266 erzeugen.
---

### Einführung 

Mit Gerätevorlagen (Device Templates) kannst du in SinricPro deinen eigenen Gerätetyp erstellen, indem du per Drag-and-drop die Fähigkeiten zusammenstellst, die die Funktionen deines IoT-Geräts beschreiben. Sie dienen als Baupläne für benutzerdefinierte Gerätetypen in SinricPro. Du kannst deinen eigenen Gerätetyp aus den folgenden Fähigkeiten zusammenstellen.

| Fähigkeiten | | |
|----------|----------|----------|
| [Brightness]({{ site.github.url }}/pages/device-templates/capabilities/brightness.html) | [Channel]({{ site.github.url }}/pages/device-templates/capabilities/channel.html) | [Color]({{ site.github.url }}/pages/device-templates/capabilities/color.html) |
| [Color Temperature]({{ site.github.url }}/pages/device-templates/capabilities/color-temperature.html) | [Contact Sensor]({{ site.github.url }}/pages/device-templates/capabilities/contact-sensor.html) | [Doorbell]({{ site.github.url }}/pages/device-templates/capabilities/doorbell.html) |
| [Equalizer]({{ site.github.url }}/pages/device-templates/capabilities/equalizer.html) | [Input Control]({{ site.github.url }}/pages/device-templates/capabilities/input-control.html) | [Lock]({{ site.github.url }}/pages/device-templates/capabilities/lock.html) |
| [Media Control]({{ site.github.url }}/pages/device-templates/capabilities/media-control.html) | [Mode]({{ site.github.url }}/pages/device-templates/capabilities/mode.html) | [Motion Sensor]({{ site.github.url }}/pages/device-templates/capabilities/motion-sensor.html) |
| [Open Close]({{ site.github.url }}/pages/device-templates/capabilities/open-close.html) | [Percentage]({{ site.github.url }}/pages/device-templates/capabilities/percentage.html) | [Power]({{ site.github.url }}/pages/device-templates/capabilities/power.html) |
| [Power Level]({{ site.github.url }}/pages/device-templates/capabilities/power-level.html) | [Push Notification]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) | [Range]({{ site.github.url }}/pages/device-templates/capabilities/range.html) |
| [Setting]({{ site.github.url }}/pages/device-templates/capabilities/setting.html) | [Smart Button]({{ site.github.url }}/pages/device-templates/capabilities/smart-button.html) | [Start Stop]({{ site.github.url }}/pages/device-templates/capabilities/start-stop.html) |
| [Temperature Sensor]({{ site.github.url }}/pages/device-templates/capabilities/temperature-sensor.html) | [Thermostat]({{ site.github.url }}/pages/device-templates/capabilities/thermostat.html) | [Toggle]({{ site.github.url }}/pages/device-templates/capabilities/toggle.html) |
| [Volume]({{ site.github.url }}/pages/device-templates/capabilities/volume.html) | | |

### Einschränkungen
Wie viele Fähigkeiten du hinzufügen kannst, hängt von der Gesamtzahl deiner Lizenzen ab. Mit jeder Lizenz kannst du deinem benutzerdefinierten Gerätetyp eine Fähigkeit hinzufügen.

Bei der Registrierung enthält dein erstes Abonnement 3 Geräte, du kannst also 3 Fähigkeiten hinzufügen.
Wenn du ein zusätzliches Abonnement für 1 Gerät kaufst, steigt die Gesamtzahl auf 4 Geräte, und dir stehen 4 Fähigkeiten zu.
Mit einem weiteren Abonnement für 1 Gerät kommst du auf 5 Geräte und kannst 5 Fähigkeiten hinzufügen.

Um mehr Fähigkeiten nutzen zu können, kaufst du einfach zusätzliche Gerätelizenzen.

### Wie erstellt man einen benutzerdefinierten Gerätetyp? 

Wir erstellen einen benutzerdefinierten Gerätetyp namens **Washing Machine** (Waschmaschine), legen verschiedene Waschmodi wie *Hot, Warm und Cold* fest, erzeugen den Code dafür und steuern das Gerät mit Amazon Alexa und Google Home.

##### Weitere Tutorials: [Bodenfeuchte]({{ site.github.url }}/de/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.de.html), [Wasserstandsanzeige]({{ site.github.url }}/de/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.de.html), [Wassersensor]({{ site.github.url }}/de/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.de.html), [Luftqualitätssensor: MQ135]({{ site.github.url }}/de/pages/tutorials/air-quality-sensors/mq135.de.html), [Gassensor]({{ site.github.url }}/de/pages/tutorials/custom-device-types/alcohol-sensor/MQ-3.de.html)

### Schritt 1: Gerätevorlage „Washing Machine“ erstellen

* [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an.

* Öffne links das Menü **Device Templates**.

* Klicke auf die Schaltfläche **Add Device Template**.
    * Name der Vorlage (Template Name): **Washing Machine**

    * Beschreibung (Description): **washing machine template** 

    * Gerätetyp (Device Type): **Other**
    
    *Hinweis*: Wähle den Gerätetyp, der am besten zu deiner Hardware und zum Ökosystem deines Sprachassistenten passt. Alexa ist mit allen Gerätetypen kompatibel, Google Home dagegen nur mit einem Teil davon. Wenn dein gewünschter Gerätetyp nicht aufgeführt ist, wende dich bitte an unser Support-Team.

![Sinric Pro device template]({{ site.github.url }}/public/img/sinric-pro-create-device-template-basic-info.png)

* Wechsle zum Tab **Capabilities**.
* Jetzt ziehen wir die Fähigkeiten, die unsere Waschmaschine unterstützt, per Drag-and-drop in die Vorlage. 
* Ziehe **Power** hinein, weil wir die Waschmaschine ein- und ausschalten wollen. 
* Ziehe **Mode** hinein, weil wir die Waschtemperatur auf **Hot**, **Warm** und **Cold** einstellen wollen.

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-capabilities.png)

* Klicke auf die Schaltfläche **Configure** und lege die drei Modi fest

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-modes.png)

* **InstanceId**: Kannst du unverändert lassen. Über die InstanceId wird ein Modus eindeutig identifiziert, wenn du mehrere Modi hinzufügst

* **Locale**: Wähle **English (US)**

* **Mode name**: Gib **Wash Temperature** ein

* **Modes**: Gib die folgenden Modi ein
    * Hot
    * Warm
    * Cold

* Klicke auf **Save**, um die Modi zu speichern

* Klicke auf **Save**, um die Vorlage zu speichern

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/create-device-template.gif)

   
### Schritt 2: Gerät „Washing Machine“ anlegen

Jetzt legen wir aus der zuvor erstellten Gerätevorlage ein Gerät an.

* Öffne das Menü **Devices** und klicke auf **Add**. 

    * Gerätename (Device Name): **Washing Machine**

    * Beschreibung (Description): **My washing machine at basement**

    * Gerätetyp (Device Type): Wähle **Washing Machine** unter „Your Device Templates“. Das ist die Vorlage, die wir zuvor erstellt haben.

    * Device Access Key: Lass die Standardauswahl stehen

    * Raum (Room): Lass die Standardauswahl stehen
    
    * Klicke auf Next > Next > Next und dann auf **Save**.

![Sinric Pro create a device from template]({{ site.github.url }}/public/img/sinric-pro-create-device-from-template.png)

### Schritt 3: Code für das Gerät „Washing Machine“ erzeugen

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generate-code.png)

* Klicke auf **Code Generator**, um den Code für das benutzerdefinierte Gerät zu erzeugen. 

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generated-code.png)

* Sinric Pro erzeugt den Code des benutzerdefinierten Geräts für ESP8266/ESP32. Du kannst das Projekt als ZIP-Datei herunterladen, entpacken und ausführen. Achte darauf, dass du die
neueste Version des Sinric Pro SDK (v2.9.0) verwendest. Sonst treten in deiner IDE möglicherweise Kompilierfehler auf

![Sinric Pro create a device and generate code from template]({{ site.github.url }}/public/img/create-device-template-and-generate-code.gif)
 
Wenn du in Alexa oder Google nach Geräten suchst, wird das Gerät Washing Machine angezeigt

### Schritt 4: Sprachansagen!

✅ So funktioniert es:

1️⃣ Lege in SinricPro einen Switch an (dein geheimer Auslöser!)

2️⃣ Erstelle eine Alexa-Routine, die deine Nachricht, etwa „Die Wäsche ist fertig!“, ansagt, sobald der Switch eingeschaltet wird

3️⃣ Sende aus deinem Code ein Power-State-Ereignis, um diesen Switch einzuschalten

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
```

{% include youtubePlayer.html id=page.youtubeId %}

> Dieses Dokument ist Open Source. Tippfehler entdeckt? Dann erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)
