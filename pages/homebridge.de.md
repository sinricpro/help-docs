---
title: Homebridge (Homekit)
weight: 4
lang: de
youtubeId: 3YI87iWlgDM
description: Stelle deine Sinric Pro Geräte mit dem Homebridge SinricPro Plugin in Apple HomeKit bereit. Plugin installieren und API-Schlüssel eintragen.
---

Mit unserem Homebridge-SinricPro Plugin kannst du deine Geräte jetzt in Homekit bereitstellen.

**1. API-Schlüssel besorgen**

Wenn du noch keinen API-Schlüssel hast, melde dich im [Portal](https://portal.sinric.pro) an und klicke auf **Credentials** oder [klicke hier](https://portal.sinric.pro/credential/new/apikey), um einen neuen API-Schlüssel zu erzeugen.

![Homebridge-SinricPro plugin new API key]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key.png)

Klicke auf Save

![Homebridge-SinricPro plugin new API saved]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key-generated.png)

Kopiere den API-Schlüssel

**1. Homebridge-SinricPro Plugin installieren**

Klicke auf Plugins und gib [**Sinricpro**](https://www.npmjs.com/package/homebridge-sinricpro) ein.

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-search.png)

Klicke auf **Install**. Sobald die Installation abgeschlossen ist, erscheint dieser Dialog. Trage den API-Schlüssel von oben ein

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-settings.png)

Klicke auf Save. 

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-install.png)

**Jetzt musst du Homebridge neu starten !!**

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-device-discovert.png)

Beim Start findet Homebridge alle deine Geräte, und sie stehen dann in der Apple HomeKit App zur Verfügung.

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-homekit-app.png)


Demo:

{% include youtubePlayer.html id=page.youtubeId %}
