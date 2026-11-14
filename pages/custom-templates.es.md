---
title: Plantillas de dispositivo
weight: 2
lang: es
youtubeId: QJVbSPSztwY
description: Crea tu propio tipo de dispositivo en Sinric Pro con las plantillas de dispositivo. Arrastra y suelta capacidades y genera el código para ESP32 y ESP8266.
---

### Introducción 

Las plantillas de dispositivo de SinricPro te permiten crear tu propio tipo de dispositivo arrastrando y soltando las capacidades que describen las funciones de tu dispositivo IoT. Sirven de modelo para crear tipos de dispositivo personalizados en SinricPro. Puedes crear tu propio tipo de dispositivo combinando las siguientes capacidades.

| Capacidades | | |
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

### Limitaciones
El número de capacidades que puedes añadir depende del total de licencias que tengas. Cada licencia te permite añadir una capacidad a tu tipo de dispositivo personalizado.

Al registrarte, tu suscripción inicial incluye 3 dispositivos, lo que te permite añadir 3 capacidades.
Si compras una suscripción adicional de 1 dispositivo, tu total sube a 4 dispositivos y tienes derecho a 4 capacidades.
Si añades otra suscripción de 1 dispositivo, tu total llega a 5 dispositivos y puedes añadir 5 capacidades.

Para ampliar las capacidades disponibles, basta con comprar más licencias de dispositivo.

### ¿Cómo se crea un tipo de dispositivo personalizado? 

Vamos a crear un tipo de dispositivo personalizado llamado **Washing Machine** (lavadora), a definir distintos modos de lavado, como *Hot, Warm y Cold*, a generar el código y a controlarlo con Amazon Alexa y Google Home.

##### Más tutoriales: [Humedad del suelo]({{ site.github.url }}/es/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.es.html), [Indicador de nivel de agua]({{ site.github.url }}/es/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.es.html), [Sensor de agua]({{ site.github.url }}/es/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.es.html), [Sensor de calidad del aire: MQ135]({{ site.github.url }}/es/pages/tutorials/air-quality-sensors/mq135.es.html), [Sensor de gas]({{ site.github.url }}/es/pages/tutorials/custom-device-types/alcohol-sensor/MQ-3.es.html)

### Paso 1: Crea la plantilla de dispositivo Washing Machine

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro.

* Ve al menú **Device Templates**, a la izquierda.

* Haz clic en el botón **Add Device Template**.
    * Template Name: **Washing Machine**

    * Description: **washing machine template** 

    * Device Type: **Other**
    
    *Nota*: Selecciona el tipo de dispositivo que mejor se ajuste a tu hardware y al ecosistema de asistente de voz que quieras usar. Alexa es compatible con todos los tipos de dispositivo, pero la compatibilidad de Google Home es limitada. Si el tipo de dispositivo que buscas no aparece en la lista, ponte en contacto con nuestro equipo de soporte.

![Sinric Pro device template]({{ site.github.url }}/public/img/sinric-pro-create-device-template-basic-info.png)

* Ve a la pestaña **Capabilities**.
* Ahora hay que arrastrar y soltar las capacidades que admite nuestra lavadora. 
* Arrastra y suelta **Power**, porque queremos encender y apagar la lavadora. 
* Arrastra y suelta **Mode**, porque queremos ajustar la temperatura de lavado a **Hot**, **Warm** y **Cold**.

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-capabilities.png)

* Haz clic en el botón **Configure** y define los tres modos

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/sinric-pro-create-device-template-modes.png)

* **InstanceId**: Puedes dejarlo como está. InstanceId sirve para identificar de forma única un modo cuando añades varios

* **Locale**: Elige **English (US)**

* **Mode name**: Escribe **Wash Temperature**

* **Modes**: Introduce los siguientes modos
    * Hot
    * Warm
    * Cold

* Haz clic en **Save** para guardar los modos

* Haz clic en **Save**  para guardar la plantilla

![Sinric Pro device capabilities]({{ site.github.url }}/public/img/create-device-template.gif)

   
### Paso 2 : Crea el dispositivo Washing Machine

Ahora vamos a crear un dispositivo a partir de la plantilla que hemos creado antes.

* Ve al menú **Devices** y haz clic en **Add**. 

    * Device Name: **Washing Machine**

    * Description: **My washing machine at basement**

    * Device Type: Selecciona **Washing Machine** en "Your Device Templates". Es la plantilla que hemos creado antes.

    * Device Access Key: Deja la selección predeterminada

    * Room: Deja la selección predeterminada
    
    * Haz clic en Next > Next > Next y en **Save**.

![Sinric Pro create a device from template]({{ site.github.url }}/public/img/sinric-pro-create-device-from-template.png)

### Paso 3 : Genera el código del dispositivo Washing Machine

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generate-code.png)

* Haz clic en **Code Generator** para generar el código del dispositivo personalizado. 

![Sinric Pro code generator]({{ site.github.url }}/public/img/sinric-pro-generated-code.png)

* Sinric Pro generará el código del dispositivo personalizado para ESP8266/ESP32. Puedes descargar el proyecto como archivo zip, descomprimirlo y ejecutarlo. Asegúrate de usar la
última versión del SDK de Sinric Pro (v2.9.0). De lo contrario, pueden aparecer errores de compilación en tu IDE

![Sinric Pro create a device and generate code from template]({{ site.github.url }}/public/img/create-device-template-and-generate-code.gif)
 
Cuando busques dispositivos en Alexa o en Google, aparecerá el dispositivo Washing Machine

### Paso 4 : ¡Anuncios de voz!

✅ Cómo funciona:

1️⃣ Añade un Switch en SinricPro (¡tu disparador secreto!)

2️⃣ Crea una rutina de Alexa que diga tu mensaje, por ejemplo "¡La colada está lista!", cuando se encienda el Switch

3️⃣ Envía desde tu código un evento de estado de encendido para poner ese interruptor en ON

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
```

{% include youtubePlayer.html id=page.youtubeId %}

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)
