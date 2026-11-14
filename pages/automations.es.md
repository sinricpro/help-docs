---
title: Automatizaciones
weight: 4
lang: es
description: Crea automatizaciones de Sinric Pro arrastrando y soltando. Activa dispositivos por hora, amanecer o atardecer, retardos y eventos de dispositivos, y envía notificaciones push.
---

### Introducción a las automatizaciones de SinricPro

SinricPro te permite crear rutinas inteligentes y automatizadas para tu hogar conectando dispositivos y definiendo flujos de trabajo lógicos. Con su intuitivo editor de automatizaciones de arrastrar y soltar, puedes diseñar escenarios a medida que respondan a eventos (activados por el estado de un dispositivo, la hora o las condiciones del entorno) sin escribir una sola línea de código.

Desde tareas sencillas, como encender las luces al atardecer, hasta secuencias complejas con varios dispositivos y retardos, las automatizaciones de SinricPro hacen que tu hogar sea más inteligente y reaccione mejor. Tanto si configuras rutinas para el día a día como si creas experiencias personalizadas, la herramienta de automatización de SinricPro ofrece flexibilidad, facilidad de uso y funciones potentes, todo en una interfaz limpia y fácil de usar.

## Paso 1: Información básica

![Sinric Pro automation creation intro]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-info.png) 

El primer paso para crear una automatización es indicar su información básica.

### Campos

- **Automation Name**  
  Escribe un nombre descriptivo para tu automatización.  
  *Ejemplo:* `TV Time`

- **Automation Description**  
  Describe brevemente qué hace la automatización. Así recordarás más adelante para qué sirve.  
  *Ejemplo:* `When TV is on, dim lights`

### Navegación
Después de rellenar la información básica, haz clic en el botón **Next** para pasar a la configuración del flujo.

---

## Paso 2: Configuración del flujo

![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-flow.png) 

En este paso defines la lógica de tu automatización configurando los iniciadores, las condiciones (opcionales) y las acciones.

### Iniciadores, condiciones y acciones de dispositivos

Este panel muestra los dispositivos disponibles que puedes usar como activadores o componentes de tu automatización. Puedes arrastrar y soltar estos dispositivos en la sección que corresponda (Starter, Conditions o Actions).

#### **Starter**

Es el evento que inicia la automatización. Es la parte del "cuando" o del "si" que pone en marcha el proceso. Ejemplo: `TV turned on`

#### **Conditions (opcional)**

Son comprobaciones adicionales que se hacen después de que se cumpla el iniciador. Si las condiciones indicadas no se cumplen, las acciones de la automatización no se ejecutan, aunque el iniciador se haya activado.

#### **Actions**

Las acciones que se van a realizar. Por ejemplo: encender las luces o ajustar el termostato.

 
####  Activadores adicionales basados en eventos:

- **At a specific time**  
  *Ejemplo:* `5:30pm on a Sunday`  
  Activa la automatización a una hora predefinida.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-select-a-time.png)


- **At sunrise or sunset**  
  *Ejemplo:* `1hr before sunrise`  
  Se activa en función de eventos astronómicos (amanecer o atardecer).

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-sunset-or-sunrise.png)

- **Between two times**  
  *Ejemplo:* `between 08:00 to 18:00`  
  Ejecuta la automatización solo dentro de un intervalo horario determinado. (Se usa como condición)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-between-two-times.png) 

- **Time delay**  

  Añade un retardo entre los pasos del flujo de la automatización. (Se usa como acción)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-add-time-delay.png) 

- **Push Notification**  
  Envía una notificación push cuando se activa.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-push-notification.png) 

> 💡 Consejo: usa estas opciones para añadir a tu automatización lógica basada en el tiempo o en el contexto.

Cuando hayas configurado todas las partes de la automatización:

- Haz clic en el botón **Save**, en la esquina inferior derecha, para guardar tu automatización.

---

## Ejemplo de flujo de automatización

Veamos un ejemplo:

1. **Información básica**
   - Automation Name: `Evening Lights`
   - Automation Description: `Turn on living room lights at sunset`

2. **Flujo**
   - **Starter:** añade "At sunset" desde el panel derecho.
   - **Conditions:** ninguna (opcional).
   - **Actions:** arrastra "living room light" a la sección Actions y configúrala para que se encienda.

Así se crea una automatización sencilla que enciende las luces del salón cada tarde al atardecer.

---

## Buenas prácticas

- Usa nombres y descripciones claros y concisos.
- Prueba las automatizaciones después de guardarlas para comprobar que funcionan como esperas.
- Combina eventos de dispositivos con activadores basados en el tiempo para que tu hogar se comporte de forma más inteligente.
