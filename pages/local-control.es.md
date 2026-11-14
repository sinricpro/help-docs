---
title: Control local
weight: 4
lang: es
description: El control local permite que la app de Sinric Pro hable directamente por Wi-Fi con tus dispositivos ESP32 y ESP8266, para que sigan funcionando cuando no hay internet.
---

El control local permite que la app de Sinric Pro hable con tus dispositivos
**directamente a través de tu Wi-Fi**, sin pasar por la nube de Sinric Pro.

Es importante en dos situaciones:

- **Te has quedado sin internet o no se puede acceder a Sinric Pro.** Tus dispositivos
  siguen respondiendo desde la app mientras el teléfono y el dispositivo estén en la misma
  red Wi-Fi.
- **Quieres una respuesta más rápida.** El comando va directamente del teléfono
  al dispositivo, en lugar de hacer un viaje de ida y vuelta a la nube.

![Local Control]({{ site.github.url }}/public/img/local-control-framed.png)

---

## Qué necesitas

El control local está integrado en el SDK y viene **activado de forma predeterminada**. No hay
nada que configurar en el portal.

| SDK | Versión mínima |
|---|---|
| Arduino (ESP8266 / ESP32 / RP2040) | 5.0.0 |
| ESP-IDF | 1.3.0 |
| Raspberry Pi Pico W (C SDK) | 2.0.0 |
| Python | 6.0.0 |
| Node.js | 6.0.0 |
| MicroPython | 3.0.0 |

También necesitas una versión reciente de la app de Sinric Pro, y el teléfono debe estar en la **misma
red Wi-Fi** que el dispositivo. El control local no funciona con datos móviles ni
desde fuera de casa.

---

## Cómo funciona

### Encontrar el dispositivo

La app tiene que saber en qué dirección está un dispositivo antes de poder hablar con él.
Lo intenta, por este orden:

1. **mDNS.** Los dispositivos anuncian `_sinricpro._udp.local.` en la red. Es
   la vía más rápida y encuentra todos los dispositivos con una sola consulta.
2. **Una sonda de difusión firmada.** Si mDNS no devuelve nada (muchos routers bloquean
   el tráfico multicast), la app envía una sonda firmada a la dirección de difusión local.
   Solo responde el dispositivo al que pertenece el ID, y su respuesta revela su dirección.
3. **La última dirección conocida**, guardada de la última vez que el dispositivo estuvo en línea.

El resultado se guarda en caché, así que la búsqueda se hace una sola vez y no en cada toque.

### Enviar un comando

Los comandos se envían al **puerto UDP 3333** del dispositivo. El mensaje es exactamente el mismo
sobre firmado que usa la nube:

```json
{
  "header":    { "payloadVersion": 2, "signatureVersion": 1 },
  "payload":   { "action": "setPowerState", "deviceId": "...", "value": { "state": "On" } },
  "signature": { "HMAC": "..." }
}
```

El dispositivo verifica la firma, ejecuta el mismo callback que ejecutaría para una
solicitud de la nube y responde al teléfono. Tu sketch no cambia: un dispositivo
que gestiona `onPowerState` desde Alexa también lo gestiona desde la LAN.

---

## Seguridad

- **Cada comando va firmado** con tu app secret mediante HMAC-SHA256, y el
  dispositivo lo verifica antes de actuar. Un comando sin firma o alterado se rechaza.
- **El app secret nunca viaja por la red.** Firma el mensaje, pero no
  forma parte de él.
- Un dispositivo **solo responde por los ID de dispositivo que le pertenecen**. Ignora las solicitudes de la LAN
  dirigidas a cualquier otro.
- Una solicitud que no supera la verificación recibe una respuesta firmada *"Signature is invalid"*.
  Es intencionado: así la app puede distinguir un app secret incorrecto de
  un dispositivo apagado.

---

## Desactivarlo

El control local está activado de forma predeterminada. Para desactivarlo:

**Arduino**

```cpp
#define SINRICPRO_NOMDNS   // keep local control, drop the mDNS announcement
```

**ESP-IDF**: en `menuconfig`, dentro de *SinricPro*:

```
CONFIG_SINRICPRO_ENABLE_LOCAL_CONTROL=n
```

**Python**

```python
config = SinricProConfig(app_key=..., app_secret=..., local_control=False)
```

**Node.js**

```javascript
await SinricPro.begin({ appKey: ..., appSecret: ..., localControl: false });
```

**MicroPython**

```python
sinricpro.start(APP_KEY, APP_SECRET, local_control=False)
```

---

## Solución de problemas

**La app dice "No devices found on this Wi-Fi network"**

- Comprueba que el teléfono y el dispositivo están en la **misma red Wi-Fi**. Muchos routers
  ponen la red de invitados en una subred aparte, y eso lo impide.
- Comprueba que el dispositivo está **encendido y conectado**. Su registro serie debería mostrar
  `UDP: listening on port 3333` poco después del arranque.
- Algunos routers aíslan entre sí a los clientes inalámbricos ("AP isolation" o
  "client isolation"). El control local no puede funcionar así; desactiva esa opción en
  la configuración del router.
- Abre antes la app una vez con conexión a internet. La app necesita tu lista de dispositivos, y
  la primera vez descarga de la nube la credencial de cada dispositivo.

**Funciona, pero deja de hacerlo cuando se reinicia el router**

Probablemente ha cambiado la dirección IP del dispositivo. Abre la pantalla Local Control y desliza
hacia abajo para actualizar, o reserva una dirección fija para el dispositivo en el router.

**Los comandos van lentos o fallan de forma intermitente**

Dale unos segundos al dispositivo después de arrancar. En ESP32 y ESP8266, la conexión
segura inicial con la nube compite por la radio, y las respuestas locales pueden
retrasarse hasta que se estabiliza.

**mDNS nunca encuentra nada**

Es habitual y no es un fallo. Muchos routers domésticos descartan el tráfico multicast.
La app recurre automáticamente a una sonda de difusión, así que la búsqueda sigue funcionando.
