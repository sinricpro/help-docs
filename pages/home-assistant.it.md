---
title: Home Assistant
weight: 4
lang: it
description: Collega Sinric Pro a Home Assistant con l'integrazione personalizzata ufficiale. Installala con HACS, aggiungi la tua API key e controlla i dispositivi Sinric Pro da Home Assistant.
---

Con l'[integrazione SinricPro per Home Assistant](https://github.com/sinricpro/homeassistant-sinricpro) puoi controllare i tuoi dispositivi Sinric Pro da Home Assistant e usarli nelle automazioni di Home Assistant.

- Configurazione dall'interfaccia di Home Assistant. Non serve YAML.
- Aggiornamenti di stato in tempo reale.
- Gli avvisi di Sinric Pro compaiono come notifiche di Home Assistant.

**1. Ottieni una API Key**

Se non hai una API Key, accedi al [Portale](https://portal.sinric.pro) e fai clic su **Credentials**, oppure [fai clic qui](https://portal.sinric.pro/credential/new/apikey) per generare una nuova API key.

Copia la API Key. **Non** è la App Key usata nel codice del tuo dispositivo.

**2. Installa l'integrazione**

*Con HACS (consigliato)*

1. Apri HACS nella tua istanza di Home Assistant.
2. Fai clic su **Integrations**.
3. Fai clic sui tre puntini nell'angolo in alto a destra e seleziona **Custom repositories**.
4. Aggiungi l'URL del repository: `https://github.com/sinricpro/homeassistant-sinricpro`
5. Seleziona **Integration** come categoria e fai clic su **Add**.
6. Cerca **SinricPro** e installala.
7. Riavvia Home Assistant.

*Manualmente*

1. Scarica l'ultima versione dalla [pagina delle release](https://github.com/sinricpro/homeassistant-sinricpro/releases).
2. Copia la cartella `custom_components/sinricpro` nella directory `custom_components` della configurazione di Home Assistant.
3. Riavvia Home Assistant.

**3. Aggiungi il tuo account Sinric Pro**

1. Vai su **Settings** > **Devices & Services**.
2. Fai clic su **+ Add Integration**.
3. Cerca **SinricPro**.
4. Inserisci la tua API key di Sinric Pro e fai clic su **Submit**.

Ora i tuoi dispositivi Sinric Pro compaiono in Home Assistant.

### Dispositivi supportati

| Tipo di dispositivo Sinric Pro | Piattaforma Home Assistant | Funzioni |
| --- | --- | --- |
| Switch | `switch` | Acceso/Spento |
| Light | `light` | Acceso/Spento, luminosità, colore RGB, temperatura di colore |
| Dimmable Switch | `light` | Acceso/Spento, livello di potenza. Compare come luce dimmerabile |
| Blinds | `cover` | Apri/Chiudi, posizione |
| Garage Door | `cover` | Apri/Chiudi |
| Doorbell | `event`, `button`, `sensor` | Evento di pressione, attivazione manuale, ora dell'ultimo squillo |
| Fan | `fan` | Acceso/Spento, velocità |
| Smart Lock | `lock` | Blocca/Sblocca |
| Speaker | `media_player` | Acceso/Spento, volume, muto |
| TV | `media_player` | Acceso/Spento, volume, muto, canale su/giù, riproduci/pausa |
| Thermostat | `climate` | Acceso/Spento, temperatura impostata, modalità, temperatura attuale, umidità |
| Window AC Unit | `climate` | Funzioni del termostato e modalità ventola |
| Air Quality Sensor | `sensor` | PM1.0, PM2.5, PM10 |
| Contact Sensor | `binary_sensor` | Aperto/Chiuso |
| Motion Sensor | `binary_sensor` | Movimento rilevato / non rilevato |
| Temperature Sensor | `sensor` | Temperatura, umidità |

I tipi di dispositivo personalizzati creati con i [modelli di dispositivo]({{ site.github.url }}/it/pages/custom-templates.it.html) non sono ancora supportati.

### Usare gli avvisi di Sinric Pro nelle automazioni

L'integrazione genera un evento `sinricpro_alert` per ogni avviso di Sinric Pro. Esempio:

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

### Risoluzione dei problemi

**Errore "Invalid API key"**

- Assicurati di usare la **API key** della pagina **Credentials** del Portale, non la App Key.
- Controlla che la API key non sia scaduta.

**I dispositivi non compaiono**

- Controlla che i dispositivi esistano nel tuo account Sinric Pro e che risultino online nel Portale.
- Ricarica l'integrazione.

**Lo stato non si aggiorna**

- Controlla la connessione di rete e cerca errori di connessione nei log di Home Assistant.

Per abilitare il log di debug, aggiungi quanto segue al tuo `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    custom_components.sinricpro: debug
```

Se il problema persiste, apri una issue su [GitHub](https://github.com/sinricpro/homeassistant-sinricpro/issues).

> Questo documento è open source. Hai trovato un errore? Crea una [issue](https://github.com/sinricpro/help-docs)
