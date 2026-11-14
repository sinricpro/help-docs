---
title: Controllo locale
weight: 4
lang: it
description: Con il controllo locale l'app Sinric Pro comunica con i tuoi dispositivi ESP32 ed ESP8266 direttamente via Wi-Fi, così continuano a funzionare anche senza internet.
---

Il controllo locale permette all'app Sinric Pro di comunicare con i tuoi dispositivi
**direttamente tramite il tuo Wi-Fi**, senza passare dal cloud Sinric Pro.

È utile in due situazioni:

- **La connessione a internet non funziona, o Sinric Pro non è raggiungibile.** I tuoi
  dispositivi continuano a rispondere dall'app finché il telefono e il dispositivo
  sono sulla stessa rete Wi-Fi.
- **Vuoi una risposta più rapida.** Il comando va dal telefono direttamente al
  dispositivo, invece di fare andata e ritorno passando dal cloud.

![Local Control]({{ site.github.url }}/public/img/local-control-framed.png)

---

## Cosa ti serve

Il controllo locale è integrato nell'SDK ed è **attivo per impostazione predefinita**.
Non c'è nulla da configurare nel portale.

| SDK | Versione minima |
|---|---|
| Arduino (ESP8266 / ESP32 / RP2040) | 5.0.0 |
| ESP-IDF | 1.3.0 |
| Raspberry Pi Pico W (C SDK) | 2.0.0 |
| Python | 6.0.0 |
| Node.js | 6.0.0 |
| MicroPython | 3.0.0 |

Ti serve anche una versione recente dell'app Sinric Pro, e il telefono deve essere
sulla **stessa rete Wi-Fi** del dispositivo. Il controllo locale non funziona con la
rete dati mobile né da fuori casa.

---

## Come funziona

### Trovare il dispositivo

Prima di poter comunicare con un dispositivo, l'app deve sapere a quale indirizzo
si trova. Prova, nell'ordine:

1. **mDNS.** I dispositivi annunciano `_sinricpro._udp.local.` sulla rete. È la
   via più rapida e trova tutti i dispositivi con una sola interrogazione.
2. **Una richiesta broadcast firmata.** Se mDNS non restituisce nulla — molti router
   bloccano il multicast — l'app invia una richiesta firmata all'indirizzo di broadcast
   locale. Risponde solo il dispositivo a cui appartiene l'ID, e la risposta ne rivela l'indirizzo.
3. **L'ultimo indirizzo noto**, memorizzato l'ultima volta che il dispositivo era online.

Il risultato viene messo in cache, quindi la ricerca avviene una volta sola e non a ogni tocco.

### Inviare un comando

I comandi vengono inviati alla **porta UDP 3333** del dispositivo. Il messaggio è
esattamente lo stesso involucro firmato usato dal cloud:

```json
{
  "header":    { "payloadVersion": 2, "signatureVersion": 1 },
  "payload":   { "action": "setPowerState", "deviceId": "...", "value": { "state": "On" } },
  "signature": { "HMAC": "..." }
}
```

Il dispositivo verifica la firma, esegue la stessa callback che eseguirebbe per una
richiesta dal cloud e risponde al telefono. Il tuo sketch non cambia: un dispositivo
che gestisce `onPowerState` da Alexa lo gestisce anche dalla LAN.

---

## Sicurezza

- **Ogni comando è firmato** con il tuo app secret tramite HMAC-SHA256, e il
  dispositivo lo verifica prima di agire. Un comando non firmato o alterato viene rifiutato.
- **L'app secret non viaggia mai sulla rete.** Firma il messaggio, ma non ne
  fa parte.
- Un dispositivo **risponde solo per gli ID dispositivo che gli appartengono**. Ignora
  le richieste LAN indirizzate a qualsiasi altro ID.
- Una richiesta che non supera la verifica riceve una risposta firmata
  *"Signature is invalid"*. È voluto: così l'app può distinguere un app secret
  sbagliato da un dispositivo spento.

---

## Disattivarlo

Il controllo locale è abilitato per impostazione predefinita. Per disattivarlo:

**Arduino**

```cpp
#define SINRICPRO_NOMDNS   // keep local control, drop the mDNS announcement
```

**ESP-IDF** — in `menuconfig`, sotto *SinricPro*:

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

## Risoluzione dei problemi

**L'app dice "No devices found on this Wi-Fi network"**

- Controlla che il telefono e il dispositivo siano sulla **stessa rete Wi-Fi**. Molti
  router mettono la rete ospiti su una sottorete separata, e questo blocca la comunicazione.
- Controlla che il dispositivo sia **acceso e connesso**. Nel log seriale dovrebbe
  comparire `UDP: listening on port 3333` poco dopo l'avvio.
- Alcuni router isolano i client wireless tra loro ("AP isolation" o
  "client isolation"). Il controllo locale non può funzionare in queste condizioni:
  disattiva l'opzione nelle impostazioni del router.
- Apri prima l'app una volta mentre sei online. L'app ha bisogno dell'elenco dei tuoi
  dispositivi e la prima volta scarica dal cloud la credenziale di ciascuno.

**Funziona, poi smette dopo il riavvio del router**

Probabilmente l'indirizzo IP del dispositivo è cambiato. Apri la schermata Local Control e
trascina verso il basso per aggiornare, oppure riserva un indirizzo fisso per il dispositivo nel router.

**I comandi sono lenti o intermittenti**

Lascia al dispositivo qualche secondo dopo l'avvio. Su ESP32 ed ESP8266 la connessione
sicura iniziale al cloud impegna la radio, e le risposte locali possono
arrivare in ritardo finché non si stabilizza.

**mDNS non trova mai nulla**

È un caso comune e non è un guasto. Molti router domestici scartano il traffico multicast.
L'app ripiega automaticamente su una richiesta broadcast, quindi la ricerca funziona comunque.
