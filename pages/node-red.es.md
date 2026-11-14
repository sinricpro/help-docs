---
title: Node-RED
weight: 4
lang: es
youtubeId: YYjxLY7zioo
description: Recibe comandos de Alexa, Google Home y SmartThings en Node-RED con el plugin de Sinric Pro para Node-RED. Instalación y flujo de ejemplo.
---

Con nuestro plugin para Node-RED, ahora puedes recibir en Node-RED comandos de Amazon Alexa, Google Home o SmartThings.

**Instalación**

Haz clic en el menú de hamburguesa de la esquina superior derecha y selecciona Manage palette, selecciona Install, escribe [**@sinricpro/node-red-contrib-sinric-pro**](https://flows.nodered.org/node/@sinricpro/node-red-contrib-sinric-pro) y haz clic en el botón de instalar.

Asegúrate de tener instaladas las herramientas de línea de comandos de Git.  Si usas una distribución basada en Debian, como Ubuntu, prueba con apt:

```
sudo apt install git-all
```

En caso contrario, consulta la documentación de Git

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


![Sinric Pro Node-RED installtion]({{ site.github.url }}/public/img/sinricpro_node_red_install.png)

Cuando termine la instalación, debería aparecer un nuevo conjunto de nodos en la categoría **sinricpro**

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinricpro_node_red_nodes.png)

**Cómo se usa**

* Ve a Sinric Pro [**aquí**](https://sinric.pro)

* Crea una cuenta o inicia sesión con tu dirección de correo electrónico.

* Crea un dispositivo nuevo y haz clic en Save. 

Copia el Device Id, la App Key y el App Secret de la última página. 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Crea un flujo nuevo o usa uno existente y añade un nodo device.

* Edita el nodo device. Introduce las credenciales de la app y los datos del dispositivo.

![Sinric Pro Node-RED nodes]({{ site.github.url }}/public/img/sinric_pro_nodered_app_credential.png)

Una vez configurado el nodo device, los comandos de voz relacionados con ese dispositivo en SinricPro se reenviarán a este nodo de Node-RED. 

* Puedes añadir otro nodo (function) para procesar esta salida. 

![Sinric Pro Node-RED function node]({{ site.github.url }}/public/img/sinric_pro_nodered_function_node.png)

* Añade un nodo **response** para enviar la respuesta de vuelta al servidor de Sinric Pro.

![Sinric Pro Node-RED response node]({{ site.github.url }}/public/img/sinric_pro_node_red_response.png)

{% include youtubePlayer.html id=page.youtubeId %}
 
Consulta el repositorio de [**ejemplos**](https://github.com/sinricpro/node-red-contrib-sinric-pro/tree/main/examples) para ver más ejemplos.
