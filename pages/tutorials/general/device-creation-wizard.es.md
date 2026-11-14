---
title: Guía del asistente de creación de dispositivos de SinricPro
layout: post
lang: es
description: Guía paso a paso del asistente de creación de dispositivos de Sinric Pro. Información del dispositivo, notificaciones, temporizadores y otros ajustes.
---
 

Este documento es una guía paso a paso para crear un nuevo dispositivo con la plataforma SinricPro. El proceso se divide en cuatro secciones principales: Información del dispositivo, Notificaciones, Temporizadores y Otros ajustes.

## Paso 1: Información del dispositivo

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-info.png) 

El primer paso para crear un nuevo dispositivo consiste en configurar la información básica del dispositivo.

### Campos

- **Device Name**
  - Escribe un nombre único para tu dispositivo. Este nombre se usará para identificar el dispositivo dentro de tu sistema de domótica.
  - *Ejemplo*: "Bedroom Light"

- **Description**
  - Proporciona una breve descripción de la función o el propósito del dispositivo.
  - *Ejemplo*: "Main light in the bedroom"

- **Device Type**
  - Selecciona el tipo de dispositivo adecuado en el menú desplegable:
    - Switch
    - Dimmable Switch
    - Light
    - TV
    - Speaker
    - Thermostat
    - Fan
    - Lock
    - Doorbell
    - Temperature Sensor
    - Motion Sensor
    - Contact Sensor
    - Windows Air Conditioner
    - Blinds
    - Garage Door
    - Camera
    - Custom Devices (una vez que creas un dispositivo personalizado en [Device Template]({{ site.github.url }}/es/pages/custom-templates.es.html), aparecerá aquí)

  - *Nota*: Haz clic en el enlace `(How to create a custom device type?)` si quieres aprender a crear un tipo de dispositivo personalizado.

- **App Key**
  - La App Key es tu credencial única para autenticar tu dispositivo IoT cuando se conecta a la plataforma SinricPro. Actúa como identificador distintivo de tu módulo de hardware concreto dentro del ecosistema SinricPro. Para garantizar el funcionamiento correcto y evitar conflictos, elige una App Key que corresponda directamente a tu módulo de hardware y usa una clave distinta para cada módulo. Al registrarte, se genera automáticamente una App Key predeterminada para ti.

- **Room & Home**
  - Asigna el dispositivo a una habitación y una casa concretas desde la lista desplegable.
  - *Ejemplo*: "Bed Room (Home)"

## Paso 2: Notificaciones

![Sinric Pro device creation info]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-notifications.png) 

Configura qué eventos activan las notificaciones de tu dispositivo.

### Enable Notifications
- **Alerts**: Este interruptor actúa como un switch global para habilitar o deshabilitar el envío de notificaciones push desde este dispositivo a la app de SinricPro. (por ejemplo: `mySwitch.sendPushNotification("Hello SinricPro!")`).

### Notificaciones basadas en eventos

Puedes elegir recibir notificaciones cuando se produzcan ciertos cambios de estado del dispositivo:

| Tipo de notificación | Descripción                                  |
|-------------------|----------------------------------------------|
| **Connect**       | Notifica cuando el dispositivo se conecta a la nube. |
| **Disconnect**    | Notifica cuando el dispositivo se desconecta.           |
| **On**            | Notifica cuando el dispositivo se encienda.              |
| **Off**           | Notifica cuando el dispositivo se apague.               |
| **Lock**          | Notifica cuando la cerradura cambia a bloqueada                 |
| **Unlock**          | Notifica cuando la cerradura cambia a desbloqueada             |
| **Unlock**          | Notifica cuando la cerradura cambia a desbloqueada             |
| **PM2.5 Air Quality** | Notifica cuando la calidad del aire sube por encima del umbral µg/m³ |
| **PM2.5 Air Quality** | Notifica cuando la calidad del aire baja por debajo del umbral µg/m³ |
| **Motion**            | Notifica cuando se detecta movimiento (de día o de noche) |
| **Camera Motion**     | Notifica cuando se capta una imagen de movimiento                 |
| **Camera Snapshot**   | Notifica cuando se toma una instantánea y describe su contenido mediante IA   |
| **Doorbell**   | Notifica cuando se pulsa el timbre                            |
| **Open**       | Notifica cuando se abre (puerta de garaje, sensor de contacto o persianas)                       |
| **Closed**       | Notifica cuando se cierra (puerta de garaje o sensor de contacto)                       |
| **Temperature**       | Notifica cuando la temperatura sube por encima del umbral |
| **Temperature**       | Notifica cuando la temperatura baja por debajo del umbral |

¿Qué es el tiempo de reactivación (Retrigger Time)?

> Es el retardo entre una notificación y la siguiente. Se usa para evitar el envío continuo de notificaciones push.

> **Consejo**: Usa estas opciones para supervisar el estado del dispositivo y recibir notificaciones de actualización en tiempo real a través de la app de SinricPro o de las plataformas conectadas.


## Paso 3: Temporizadores

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-timers.png) 

Configura comportamientos automáticos de encendido/apagado para tu dispositivo mediante temporizadores gestionados en la nube. El retardo mínimo es de 3 segundos. El intervalo máximo no puede superar 1 día.

### Auto Off
- **Enable**: Activa o desactiva el apagado automático.
- **Delay**: Define el número de segundos tras los cuales el dispositivo se apaga automáticamente una vez encendido.
  - *Valor predeterminado*: `3 segundos` (ajustable)
  - *Ejemplo*: Si lo configuras a `5`, el dispositivo se apaga 5 segundos después de encenderse.

### Auto On
- **Enable**: Activa o desactiva el encendido automático.
- **Delay**: Define el número de segundos tras los cuales el dispositivo se encienda automáticamente una vez apagado.
  - *Valor predeterminado*: `3 segundos` (ajustable)
  - *Ejemplo*: Si lo configuras a `10`, el dispositivo se encienda 10 segundos después de apagarse.

> **Nota**: Los temporizadores funcionan en la nube, por lo que no funcionarán si el dispositivo está desconectado temporalmente.

> **Casos de uso**:
> - Luces intermitentes o efectos estroboscópicos.
> - Apagado de seguridad para calefactores o motores.


## Paso 4: Otros

![Sinric Pro device creation timers]({{ site.github.url }}/public/img/sinricpro-portal-device-creation-others.png) 

Proporciona metadatos opcionales sobre tu dispositivo, especialmente sobre el consumo energético.

### Energy Usage (Estimate)

Activa esta opción para habilitar las funciones de estimación de energía. El servidor calcula el consumo energético del dispositivo a partir de los tiempos de encendido/apagado del dispositivo. Puedes ver el consumo en el menú Energy Estimates del Portal.

#### Campos:
- **Stand by Wattage (W)**  
  Potencia consumida cuando el dispositivo está apagado o en espera.  
  > *Ejemplo*: Enchufe inteligente = `0.5W`, TV = `5W`

- **On Wattage (W)**  
  Potencia consumida cuando el dispositivo está en funcionamiento.  
  > *Ejemplo*: Bombilla LED = `9W`, Ventilador = `50W`

> **Por qué es importante**:  
> Los datos de energía ayudan a los usuarios a estimar los costes eléctricos a través de los paneles inteligentes de Alexa.

> **Recomendación**:  
> Usa las especificaciones del fabricante o un vatímetro para obtener valores precisos.


### Restore Device State When Connect

Cuando esta función está activada, el servidor de SinricPro envía automáticamente el estado más reciente del dispositivo —como el estado de encendido, el brillo, los ajustes personalizados y otros datos relevantes— inmediatamente después de que el dispositivo se reconecte.

Por ejemplo, si tu dispositivo estaba **encendido** cuando se desconectó, el servidor enviará ese último estado conocido (`true`) al dispositivo al reconectarse, activando tu callback `onPowerState` y restaurando automáticamente el dispositivo a su estado anterior.

### Custom Settings in SinricPro

Custom Settings te permite definir y gestionar tus propios parámetros de configuración específicos del dispositivo, más allá de las capacidades estándar que ofrece SinricPro.

Por ejemplo, podrías usar Custom Settings para:  
- Activar o desactivar un LED integrado,
- Establecer la intensidad mínima de una SSID para conectarte a ella,
- Definir un **offset de temperatura** para un termostato,  
- Marcar un indicador para **reiniciar automáticamente** tras una actualización de firmware,  
- Configurar un **nivel de brillo predeterminado** para el arranque.


[Tutorial completo de ajustes]({{ site.github.url }}/es/pages/tutorials/general/sinricpro-settings-tutorial.es.html)

---

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)
