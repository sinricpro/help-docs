---
title: Local Control
weight: 4
lang: en
---

Local control lets the Sinric Pro app talk to your devices **directly over your
Wi-Fi**, without going through the Sinric Pro cloud.

It matters in two situations:

- **Your internet is down, or Sinric Pro is unreachable.** Your devices keep
  responding from the app as long as the phone and the device are on the same
  Wi-Fi network.
- **You want a faster response.** A command travels from the phone straight to
  the device instead of making a round trip to the cloud and back.

![Local Control]({{ site.github.url }}/public/img/local-control-framed.png)

---

## What you need

Local control is built into the SDK and is **on by default**. There is nothing
to configure in the portal.

| SDK | Minimum version |
|---|---|
| Arduino (ESP8266 / ESP32 / RP2040) | 5.0.0 |
| ESP-IDF | 1.3.0 |
| Raspberry Pi Pico W (C SDK) | 2.0.0 |
| Python | 6.0.0 |
| Node.js | 6.0.0 |
| MicroPython | 3.0.0 |

You also need a recent Sinric Pro app, and the phone must be on the **same
Wi-Fi network** as the device. Local control does not work over mobile data or
from outside your home.

---

## How it works

### Finding the device

The app has to know which address a device is on before it can talk to it. It
tries, in order:

1. **mDNS.** Devices advertise `_sinricpro._udp.local.` on the network. This is
   the quickest route and finds every device in one query.
2. **A signed broadcast probe.** If mDNS returns nothing — many routers block
   multicast — the app sends a signed probe to the local broadcast address.
   Only the device that owns the ID replies, and its reply reveals its address.
3. **The last known address**, remembered from when the device was last online.

The result is cached, so discovery happens once rather than on every tap.

### Sending a command

Commands go to **UDP port 3333** on the device. The message is exactly the same
signed envelope the cloud uses:

```json
{
  "header":    { "payloadVersion": 2, "signatureVersion": 1 },
  "payload":   { "action": "setPowerState", "deviceId": "...", "value": { "state": "On" } },
  "signature": { "HMAC": "..." }
}
```

The device verifies the signature, runs the same callback it would run for a
cloud request, and replies to the phone. Your sketch does not change: a device
that handles `onPowerState` from Alexa handles it from the LAN too.

---

## Security

- **Every command is signed** with your app secret using HMAC-SHA256, and the
  device verifies it before acting. An unsigned or altered command is refused.
- **The app secret never travels over the network.** It signs the message; it is
  not part of it.
- A device **only answers for device IDs it owns**. It ignores LAN requests
  addressed to anything else.
- A request that fails verification gets a signed *"Signature is invalid"*
  reply. This is deliberate: it lets the app tell a wrong app secret apart from
  a device that is switched off.

---

## Turning it off

Local control is enabled by default. To disable it:

**Arduino**

```cpp
#define SINRICPRO_NOMDNS   // keep local control, drop the mDNS announcement
```

**ESP-IDF** — in `menuconfig`, under *SinricPro*:

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

## Troubleshooting

**The app says "No devices found on this Wi-Fi network"**

- Check the phone and the device are on the **same Wi-Fi network**. Many routers
  put a guest network on a separate subnet, which blocks this.
- Check the device is **powered on and connected**. Its serial log should show
  `UDP: listening on port 3333` shortly after boot.
- Some routers isolate wireless clients from each other ("AP isolation" or
  "client isolation"). Local control cannot work through that; turn it off in
  your router settings.
- Open the app once while online first. The app needs your device list, and it
  fetches the credential for each device from the cloud the first time.

**It works, then stops after the router restarts**

The device's IP address probably changed. Open the Local Control screen and pull
to refresh, or reserve a fixed address for the device in your router.

**Commands are slow or intermittent**

Give the device a few seconds after it boots. On ESP32 and ESP8266 the initial
secure connection to the cloud competes with the radio, and local replies can be
delayed until it settles.

**mDNS never finds anything**

This is common and not a fault. Plenty of home routers drop multicast traffic.
The app falls back to a broadcast probe automatically, so discovery still works.
