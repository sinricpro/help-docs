---
title: Tutorial de Wally
layout: post
lang: es
description: Tutorial de Sinric Pro for Business. Crea un producto de interruptor inteligente Wi-Fi de 2 canales (Wally) con ESP32, desde la definición del producto hasta el aprovisionamiento.
---

En esta sección vamos a recorrer la creación de un producto que nos gustaría vender en el futuro, llamado **Wally**.  Es un módulo mini de interruptor inteligente Wi-Fi inalámbrico de 2 canales y 1 o 2 vías.

Ten en cuenta que **solo son compatibles los Espressif ESP32, ESP32C3 y ESP32S3**

![Sinric Pro sinricpro wally]({{ site.github.url }}/public/img/sinricpro-wally.png)

#### Configura el perfil del producto

1. Inicia sesión en tu [cuenta Business](https://biz-portal.sinric.pro/)

2. Ve al menú *Products* y haz clic en *Add Product*.

![Sinric Pro sinricpro business acccount add product wally]({{ site.github.url }}/public/img/sinricpro-biz-acccount-add-product.png)

E introduce los datos de tu producto.

![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-details.png)

Después ve a la pestaña *Features*.

![Sinric Pro sinricpro business acccount enter product features]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-features.png)

**Device Type** : Tipo de dispositivo de Sinric Pro. Puede ser un Switch, un Fan, etc. Igual que en el portal de Sinric Pro. 

**Identifier** : Usamos el identificador para referirnos a este dispositivo en el sketch de Arduino. 

**Default Device Name** : Puedes establecer un nombre predeterminado para el dispositivo. Es el nombre que se muestra por defecto durante la configuración del dispositivo.

**Default Device Description** : Puedes establecer una descripción predeterminada para el dispositivo. Es la descripción que se muestra por defecto durante la configuración del dispositivo.

**Display Index** : Orden en que se mostrará durante la configuración del dispositivo.


![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-default-values-example.png)

Haz clic en *Save* y después en **Download** para descargar el código de aprovisionamiento del producto.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-download.png)

El ejemplo descargado ya incluye funciones esenciales, como configuración sencilla, soporte para varias redes WiFi, actualizaciones OTA y comprobaciones de estado, para que puedas centrarte en hacer realidad tus ideas de IoT sin tener que implementar desde cero estas funciones básicas.

Busca **sinricprobusinesssdk** en el Gestor de bibliotecas de Arduino para instalar el SinricPro Business SDK. 

![Sinric Pro Business SDK arduino IDE]({{ site.github.url }}/public/img/sinricpro-business-sdk.png)


Esto instalará también *ArduinoJson (>=7.0.3), WebSockets (>=2.6.1), NimBLE-Arduino (>=1.4.2), SinricPro (>=3.2.1)*. Adapta la asignación de pines GPIO a la configuración concreta de tu dispositivo, compila y graba el firmware en tu hardware.

A continuación, cambia en Arduino IDE Tools -> Partition Scheme -> Minimal SPIFF (1.9MB APP ...). 

![Sinric Pro sinricpro wally arduino IDE tools settings]({{ site.github.url }}/public/img/arduino-ide-settings.png)

Ya está todo listo para grabar el código.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-arduino-ide.png)

Puedes encontrar el código de ejemplo completo aquí:

[https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally](https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally)

#### Ahora puedes configurar el producto con la app de Sinric Pro

1. Descarga la app de Sinric Pro desde Google Play o App Store.

2. Crea una cuenta e inicia sesión.

3. Haz clic en *Add* y completa el proceso de configuración. 

Esta es la demostración del aprovisionamiento del producto:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/prov.mp4" type="video/mp4">
</video>
