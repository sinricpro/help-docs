---
title: "MCP Server e Skill"
weight: 5
lang: it
description: Collega assistenti di programmazione AI come Claude Code, Codex e Cursor alla documentazione, al riferimento API e agli esempi degli SDK di Sinric Pro con il server MCP.
---

Il **SinricPro Docs MCP Server** permette agli assistenti di programmazione AI di leggere direttamente la documentazione ufficiale di SinricPro, il riferimento API e gli esempi degli SDK: così strumenti come Claude Code, OpenAI Codex e Cursor possono rispondere alle domande su SinricPro e scrivere il codice dei dispositivi basandosi su fonti aggiornate e autorevoli, invece di tirare a indovinare.

Usa il [Model Context Protocol](https://modelcontextprotocol.io) (MCP) su **Streamable HTTP**. Non c'è nulla da installare e non serve nessuna API key: basta indicare al tuo client l'endpoint qui sotto.

> **Vuoi che il tuo assistente configuri anche i dispositivi?** Collegalo all'[endpoint dell'account](#manage-devices-account-endpoint) con la tua API key e potrà anche creare, rinominare ed eliminare i dispositivi del tuo account. Per accendere e spegnere i dispositivi, eseguire scene o gestire le programmazioni, usa la [agent skill SinricPro](#agent-skill-control-your-smart-home).

### llms.txt

Se il tuo assistente non può usare MCP, indicagli [llms.txt]({{ site.github.url }}/llms.txt). È un indice in testo semplice di questa documentazione, con un riassunto di una riga per ogni pagina, nel formato [llms.txt](https://llmstxt.org) che ChatGPT, Claude, Cursor e strumenti simili sanno leggere.

### Endpoint

```
https://docs.sinric.pro/mcp
```

### Cosa offre al tuo assistente

Una volta collegato, il tuo assistente AI ha a disposizione questi strumenti:

| Strumento | Cosa fa |
|---|---|
| `docs_search` | Ricerca full-text in tutta la documentazione, nelle API e nei contenuti degli SDK |
| `get_docs_overview` | Indice di tutto ciò che è disponibile |
| `get_api_reference` | Riferimento degli endpoint della REST API (`api.sinric.pro`) |
| `get_sdk_example` | Codice di esempio funzionante per un dispositivo su un determinato SDK |
| `get_quickstart` | Guida rapida passo passo per un dispositivo |
| `get_capabilities_matrix` | Quali dispositivi sono supportati da quale SDK |
| `get_changelog` | Modifiche recenti alla piattaforma e agli SDK |
| `get_pages` | Recupera pagine complete della documentazione in base al percorso |
| `submit_docs_feedback` | Invia ai manutentori un feedback su una pagina della documentazione |

SDK coperti: **ESP8266/ESP32 (Arduino C++)**, **ESP-IDF**, **Raspberry Pi Pico**, **Python**, **Node.js / TypeScript** e **MicroPython**. Sono incluse anche le guide di questo sito (comandi vocali, modelli di dispositivo, tutorial, OTA e risoluzione dei problemi).

---

## Claude Code

Aggiungilo con un solo comando:

```bash
claude mcp add --transport http sinricpro-docs https://docs.sinric.pro/mcp
```

Poi esegui `/mcp` in Claude Code per verificare che sia collegato.

Per condividere il server con il tuo team, aggiungi invece al repository un file `.mcp.json` nella radice del progetto:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "type": "http",
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

---

## Cursor

Crea (o modifica) `~/.cursor/mcp.json` per tutti i progetti, oppure `.cursor/mcp.json` nella radice di un singolo progetto:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

Cursor rileva automaticamente il trasporto Streamable HTTP dal campo `url`. Apri **Settings → MCP** per verificare che il server risulti collegato e che i suoi strumenti siano elencati.

---

## OpenAI Codex

Modifica `~/.codex/config.toml` (globale) oppure `.codex/config.toml` in un progetto attendibile, e aggiungi:

```toml
[mcp_servers.sinricpro_docs]
url = "https://docs.sinric.pro/mcp"
```

Riavvia Codex e gli strumenti della documentazione SinricPro saranno disponibili. (In `config.toml` i nomi dei server usano il trattino basso.)

---

## Configurazione manuale / altri client MCP

L'endpoint è un normale server MCP Streamable HTTP, quindi funziona con qualsiasi client conforme. Usa la forma con `url` se il tuo client supporta direttamente i trasporti HTTP:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "type": "http",
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

**Il client supporta solo stdio?** Fai da ponte con [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://docs.sinric.pro/mcp"]
    }
  }
}
```

**Test rapido di connettività** da terminale: esegue l'handshake MCP `initialize` e dovrebbe restituire le informazioni sul server:

```bash
curl -s -X POST https://docs.sinric.pro/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

---

## Provalo

Una volta collegato, chiedi al tuo assistente cose come:

- *"Usando l'MCP della documentazione SinricPro, mostrami un esempio di interruttore in Python."*
- *"Come rinnovo un access token con l'API SinricPro?"*
- *"Quali dispositivi supporta l'SDK ESP-IDF?"*
- *"Cosa posso dire ad Alexa per abbassare una luce?"*

Il tuo assistente ricaverà la risposta direttamente dalla documentazione ufficiale.

---

## Gestire i dispositivi (endpoint dell'account)

L'endpoint dell'account offre tutti gli strumenti di documentazione elencati sopra, più altri che agiscono sul **tuo account SinricPro**. Il tuo assistente può creare un dispositivo e poi scrivere uno sketch pronto da caricare, in un'unica conversazione.

```
https://docs.sinric.pro/mcp/account
```

Richiede la tua API key, inviata come `Authorization: Bearer <your API key>`. Creane una su [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). La chiave dà accesso completo al tuo account, quindi tienila riservata ed eliminala nel portale se viene divulgata.

| Strumento | Cosa fa |
|---|---|
| `list_devices` | I tuoi dispositivi, con tipo, stanza e stato online |
| `list_rooms` | Le tue stanze |
| `list_device_types` | I tipi di dispositivo che puoi creare |
| `create_device` | Crea un dispositivo a partire da nome, tipo e stanza. Può anche restituire `APP_KEY` e `APP_SECRET` necessari al tuo sketch |
| `update_device` | Rinomina un dispositivo, lo sposta in un'altra stanza o ne cambia la descrizione |
| `delete_device` | Elimina un dispositivo in modo permanente |

Il tuo assistente ha l'istruzione di chiederti conferma prima di creare, modificare o eliminare qualsiasi cosa. L'eliminazione funziona solo con il nome esatto o l'id del dispositivo, quindi un nome simile non può far eliminare il dispositivo sbagliato. Ogni nuovo dispositivo usa una delle tue licenze dispositivo, come quando lo crei nel portale.

**Claude Code:**

```bash
claude mcp add --transport http sinricpro https://docs.sinric.pro/mcp/account \
  --header "Authorization: Bearer $SINRICPRO_API_KEY"
```

**Cursor** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "sinricpro": {
      "url": "https://docs.sinric.pro/mcp/account",
      "headers": { "Authorization": "Bearer <your API key>" }
    }
  }
}
```

**OpenAI Codex** (`~/.codex/config.toml`), con la chiave nella variabile d'ambiente `SINRICPRO_API_KEY`:

```toml
[mcp_servers.sinricpro]
url = "https://docs.sinric.pro/mcp/account"
bearer_token_env_var = "SINRICPRO_API_KEY"
```

Poi prova:

- *"Crea un interruttore chiamato Kitchen Light nel Living Room e dammi uno sketch ESP32 per usarlo."*
- *"Rinomina Kitchen Light in Pantry Light."*
- *"Quali dei miei dispositivi sono offline?"*

---

## Agent skill: controlla la tua casa smart

La [agent skill SinricPro](https://github.com/sinricpro/sinricpro-agent-skills) (`sinricpro-smart-home`) permette a un agente AI di controllare il tuo account SinricPro. Funziona con [OpenClaw](https://openclaw.ai), Claude Code e altri agenti che caricano skill `SKILL.md`.

| | Server MCP della documentazione | Endpoint dell'account | Agent skill |
|---|---|---|---|
| Scopo | Aiutarti a scrivere codice SinricPro | Configurare i dispositivi e scriverne il codice | Controllare i tuoi dispositivi |
| Comunica con | Documentazione pubblica | La documentazione e il tuo account tramite `api.sinric.pro` | Il tuo account, tramite `api.sinric.pro` |
| Richiede | Nulla | Una API key | Node.js 18+ e una API key |

Puoi chiedere al tuo agente cose come:

- *"Accendi la luce del soggiorno."*
- *"Imposta il condizionatore della camera da letto a 24 gradi."*
- *"Quali dispositivi sono offline?"*
- *"Esegui la scena serata film."*
- *"Accendi la luce del portico alle 18:30 nei giorni feriali."*

La skill non gestisce la visione in diretta o le istantanee delle telecamere, l'aggiunta o la rimozione di dispositivi (usa l'[endpoint dell'account](#manage-devices-account-endpoint)), la modifica delle automazioni né le impostazioni dell'account.

### Configurazione

1. Crea una API key su [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). La chiave dà accesso completo al tuo account, quindi tienila riservata ed eliminala nel portale se viene divulgata.
2. Clona il repository e copia la cartella `sinricpro-smart-home` nella directory delle skill del tuo agente:

   ```bash
   git clone https://github.com/sinricpro/sinricpro-agent-skills.git
   ```

   | Agente | Directory delle skill |
   |---|---|
   | OpenClaw | `~/.openclaw/skills/` oppure `<workspace>/skills/` |
   | Claude Code | `~/.claude/skills/` oppure `<project>/.claude/skills/` |

3. Imposta `SINRICPRO_API_KEY` nell'ambiente in cui gira il tuo agente. In OpenClaw, inseriscila nella configurazione della skill.

### Serrature e porte del garage

Per impostazione predefinita, la skill può chiudere a chiave le porte e chiudere le porte del garage, ma si rifiuta di sbloccarle o aprirle, anche all'interno delle scene. Questo perché un agente può interpretare male una richiesta. Per consentire lo sblocco e l'apertura, imposta `SINRICPRO_ALLOW_UNLOCK=1`. L'agente ha l'istruzione di chiederti conferma prima di ogni sblocco o apertura, ma quella variabile d'ambiente è l'unica vera protezione. Abilitala solo se accetti il rischio.

Consulta il [README del repository](https://github.com/sinricpro/sinricpro-agent-skills#readme) per la CLI e tutte le opzioni di configurazione.
