---
title: Home Assistant
weight: 4
lang: es
description: Conecta Sinric Pro a Home Assistant con la integración personalizada oficial. Instálala con HACS, añade tu clave de API y controla tus dispositivos Sinric Pro desde Home Assistant.
---

Con la [integración de SinricPro para Home Assistant](https://github.com/sinricpro/homeassistant-sinricpro) puedes controlar tus dispositivos Sinric Pro desde Home Assistant y usarlos en las automatizaciones de Home Assistant.

- Configuración desde la interfaz de Home Assistant. No hace falta YAML.
- Actualizaciones de estado en tiempo real.
- Las alertas de Sinric Pro aparecen como notificaciones de Home Assistant.

**1. Consigue una clave de API**

Si no tienes una clave de API, inicia sesión en el [Portal](https://portal.sinric.pro) y haz clic en **Credentials**, o [haz clic aquí](https://portal.sinric.pro/credential/new/apikey) para generar una nueva clave de API.

Copia la clave de API. **No** es la App Key que usas en el código de tu dispositivo.

**2. Instala la integración**

*Con HACS (recomendado)*

1. Abre HACS en tu instancia de Home Assistant.
2. Haz clic en **Integrations** (Integraciones).
3. Haz clic en los tres puntos de la esquina superior derecha y selecciona **Custom repositories** (Repositorios personalizados).
4. Añade la URL del repositorio: `https://github.com/sinricpro/homeassistant-sinricpro`
5. Selecciona **Integration** (Integración) como categoría y haz clic en **Add** (Añadir).
6. Busca **SinricPro** e instálala.
7. Reinicia Home Assistant.

*Manualmente*

1. Descarga la última versión desde la [página de versiones](https://github.com/sinricpro/homeassistant-sinricpro/releases).
2. Copia la carpeta `custom_components/sinricpro` en el directorio `custom_components` de tu configuración de Home Assistant.
3. Reinicia Home Assistant.

**3. Añade tu cuenta de Sinric Pro**

1. Ve a **Settings** > **Devices & Services** (Ajustes > Dispositivos y servicios).
2. Haz clic en **+ Add Integration** (Añadir integración).
3. Busca **SinricPro**.
4. Introduce tu clave de API de Sinric Pro y haz clic en **Submit** (Enviar).

Tus dispositivos Sinric Pro aparecen ahora en Home Assistant.

### Dispositivos compatibles

| Tipo de dispositivo de Sinric Pro | Plataforma de Home Assistant | Funciones |
| --- | --- | --- |
| Switch | `switch` | Encendido/apagado |
| Light | `light` | Encendido/apagado, brillo, color RGB, temperatura de color |
| Dimmable Switch | `light` | Encendido/apagado, nivel de potencia. Aparece como una luz regulable |
| Blinds | `cover` | Abrir/cerrar, posición |
| Garage Door | `cover` | Abrir/cerrar |
| Doorbell | `event`, `button`, `sensor` | Evento de pulsación, activación manual, hora de la última llamada |
| Fan | `fan` | Encendido/apagado, velocidad |
| Smart Lock | `lock` | Bloquear/desbloquear |
| Speaker | `media_player` | Encendido/apagado, volumen, silencio |
| TV | `media_player` | Encendido/apagado, volumen, silencio, canal siguiente/anterior, reproducir/pausar |
| Thermostat | `climate` | Encendido/apagado, temperatura objetivo, modo, temperatura actual, humedad |
| Window AC Unit | `climate` | Funciones del termostato y modo del ventilador |
| Air Quality Sensor | `sensor` | PM1.0, PM2.5, PM10 |
| Contact Sensor | `binary_sensor` | Abierto/cerrado |
| Motion Sensor | `binary_sensor` | Movimiento detectado / no detectado |
| Temperature Sensor | `sensor` | Temperatura, humedad |

Los tipos de dispositivo personalizados creados con [plantillas de dispositivo]({{ site.github.url }}/es/pages/custom-templates.es.html) todavía no son compatibles.

### Usa las alertas de Sinric Pro en automatizaciones

La integración lanza un evento `sinricpro_alert` por cada alerta de Sinric Pro. Ejemplo:

```yaml
automation:
  - alias: "SinricPro Alert Notification"
    trigger:
      - platform: event
        event_type: sinricpro_alert
    action:
      - service: notify.mobile_app
        data:
          message: "{% raw %}{{ trigger.event.data.message }}{% endraw %}"
```

### Solución de problemas

**Error "Invalid API key"**

- Asegúrate de usar la **clave de API** de la página **Credentials** del Portal, no la App Key.
- Comprueba que la clave de API no haya caducado.

**Los dispositivos no aparecen**

- Comprueba que los dispositivos existan en tu cuenta de Sinric Pro y estén en línea en el Portal.
- Recarga la integración.

**El estado no se actualiza**

- Revisa tu conexión de red y los registros de Home Assistant en busca de errores de conexión.

Para activar el registro de depuración, añade lo siguiente a tu `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    custom_components.sinricpro: debug
```

Si el problema continúa, abre una incidencia en [GitHub](https://github.com/sinricpro/homeassistant-sinricpro/issues).

> Este documento es de código abierto. ¿Has visto una errata? Por favor, crea una [incidencia](https://github.com/sinricpro/help-docs)
