---
title: Homebridge (Homekit)
weight: 4
lang: es
youtubeId: 3YI87iWlgDM
description: Lleva tus dispositivos de Sinric Pro a Apple HomeKit con el plugin Homebridge SinricPro. Instala el plugin y añade tu clave de API.
---

Con nuestro plugin Homebridge-SinricPro ya puedes hacer que tus dispositivos estén disponibles en Homekit.

**1. Consigue una clave de API**

Si no tienes una clave de API, inicia sesión en el [Portal](https://portal.sinric.pro) y haz clic en **Credentials**, o [haz clic aquí](https://portal.sinric.pro/credential/new/apikey) para generar una nueva clave de API.

![Homebridge-SinricPro plugin new API key]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key.png)

Haz clic en Save

![Homebridge-SinricPro plugin new API saved]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key-generated.png)

Copia la clave de API

**1. Instala el plugin Homebridge-SinricPro**

Haz clic en Plugins y escribe [**Sinricpro**](https://www.npmjs.com/package/homebridge-sinricpro).

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-search.png)

Haz clic en **Install**. Cuando termine la instalación, aparecerá este cuadro de diálogo. Introduce la clave de API anterior

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-settings.png)

Haz clic en Save. 

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-install.png)

**¡Ahora tienes que reiniciar Homebridge!**

![Homebridge-SinricPro plugin installtion]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-device-discovert.png)

Al arrancar, Homebridge descubrirá todos tus dispositivos y estarán disponibles en la app Apple HomeKit.

![Homebridge-SinricPro plugin settings]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-homekit-app.png)


Demostración:

{% include youtubePlayer.html id=page.youtubeId %}
