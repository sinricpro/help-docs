---
title: "MCP Server & Skill"
weight: 5
lang: de
description: Verbinde KI-Coding-Assistenten wie Claude Code, Codex und Cursor über den MCP Server mit der Sinric Pro Dokumentation, der API-Referenz und den SDK-Beispielen.
---

Mit dem **SinricPro Docs MCP Server** können KI-Coding-Assistenten die offizielle SinricPro Dokumentation, die API-Referenz und die SDK-Beispiele direkt lesen. Tools wie Claude Code, OpenAI Codex und Cursor beantworten SinricPro Fragen und schreiben Gerätecode dann auf Grundlage aktueller, verlässlicher Quellen, statt zu raten.

Der Server spricht das [Model Context Protocol](https://modelcontextprotocol.io) (MCP) über **Streamable HTTP**. Du musst nichts installieren und brauchst keinen API-Key. Trage einfach den Endpunkt unten in deinem Client ein.

> **Soll dein Assistent auch Geräte einrichten?** Verbinde ihn mit deinem API-Key mit dem [Konto-Endpunkt](#manage-devices-account-endpoint), dann kann er in deinem Konto auch Geräte anlegen, umbenennen und löschen. Um Geräte ein- und auszuschalten, Szenen auszuführen oder Zeitpläne zu verwalten, verwende den [SinricPro Agent Skill](#agent-skill-control-your-smart-home).

### llms.txt

Wenn dein Assistent MCP nicht nutzen kann, verweise ihn auf [llms.txt]({{ site.github.url }}/llms.txt). Das ist ein Index dieser Dokumentation als reiner Text mit einer einzeiligen Zusammenfassung jeder Seite, im [llms.txt](https://llmstxt.org)-Format, das ChatGPT, Claude, Cursor und ähnliche Tools lesen können.

### Endpunkt

```
https://docs.sinric.pro/mcp
```

### Was dein Assistent damit bekommt

Sobald die Verbindung steht, hat dein KI-Assistent diese Tools:

| Tool | Was es macht |
|---|---|
| `docs_search` | Volltextsuche über alle Inhalte zu Dokumentation, API und SDKs |
| `get_docs_overview` | Inhaltsverzeichnis von allem, was verfügbar ist |
| `get_api_reference` | Referenz der REST-API-Endpunkte (`api.sinric.pro`) |
| `get_sdk_example` | Funktionierender Beispielcode für ein Gerät mit einem bestimmten SDK |
| `get_quickstart` | Schnellstart für ein Gerät, Schritt für Schritt |
| `get_capabilities_matrix` | Welche Geräte von welchem SDK unterstützt werden |
| `get_changelog` | Aktuelle Änderungen an der Plattform und den SDKs |
| `get_pages` | Ruft vollständige Dokumentationsseiten über ihren Pfad ab |
| `submit_docs_feedback` | Sendet Feedback zu einer Dokumentationsseite an die Maintainer |

Abgedeckte SDKs: **ESP8266/ESP32 (Arduino C++)**, **ESP-IDF**, **Raspberry Pi Pico**, **Python**, **Node.js / TypeScript** und **MicroPython**. Die Anleitungen dieser Website (Sprachbefehle, Gerätevorlagen, Tutorials, OTA und Fehlerbehebung) sind ebenfalls enthalten.

---

## Claude Code

Füge den Server mit einem Befehl hinzu:

```bash
claude mcp add --transport http sinricpro-docs https://docs.sinric.pro/mcp
```

Führe danach in Claude Code `/mcp` aus, um zu prüfen, ob die Verbindung steht.

Um den Server mit deinem Team zu teilen, committe stattdessen eine `.mcp.json`-Datei im Wurzelverzeichnis deines Projekts:

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

Erstelle (oder bearbeite) `~/.cursor/mcp.json` für alle Projekte oder `.cursor/mcp.json` im Wurzelverzeichnis eines einzelnen Projekts:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

Cursor erkennt den Streamable-HTTP-Transport automatisch am Feld `url`. Öffne **Settings → MCP** und prüfe, ob der Server als verbunden angezeigt wird und seine Tools aufgelistet sind.

---

## OpenAI Codex

Bearbeite `~/.codex/config.toml` (global) oder `.codex/config.toml` in einem vertrauenswürdigen Projekt und füge Folgendes hinzu:

```toml
[mcp_servers.sinricpro_docs]
url = "https://docs.sinric.pro/mcp"
```

Starte Codex neu, danach stehen die SinricPro Docs Tools zur Verfügung. (Servernamen in `config.toml` verwenden Unterstriche.)

---

## Bare Metal / andere MCP-Clients

Der Endpunkt ist ein gewöhnlicher MCP-Server mit Streamable HTTP, daher funktioniert jeder standardkonforme Client. Verwende die `url`-Variante, wenn dein Client HTTP-Transporte direkt unterstützt:

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

**Dein Client unterstützt nur stdio?** Überbrücke das mit [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

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

**Schneller Verbindungstest** im Terminal: Der Befehl führt den MCP-Handshake `initialize` aus und sollte Informationen zum Server zurückgeben:

```bash
curl -s -X POST https://docs.sinric.pro/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

---

## Ausprobieren

Sobald die Verbindung steht, kannst du deinen Assistenten zum Beispiel Folgendes fragen:

- *„Zeig mir mit dem SinricPro Docs MCP ein Python-Beispiel für einen Switch.“*
- *„Wie erneuere ich ein Access-Token mit der SinricPro API?“*
- *„Welche Geräte unterstützt das ESP-IDF SDK?“*
- *„Was kann ich zu Alexa sagen, um ein Licht zu dimmen?“*

Dein Assistent holt die Antwort direkt aus der offiziellen Dokumentation.

---

## Geräte verwalten (Konto-Endpunkt)

Der Konto-Endpunkt bietet alle oben genannten Docs Tools und zusätzlich Tools, die auf **deinem eigenen SinricPro Konto** arbeiten. Dein Assistent kann in einem einzigen Gespräch ein Gerät anlegen und anschließend einen Sketch dafür schreiben, den du direkt flashen kannst.

```
https://docs.sinric.pro/mcp/account
```

Er braucht deinen API-Key, gesendet als `Authorization: Bearer <your API key>`. Einen Key erstellst du unter [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). Der Key gibt vollen Zugriff auf dein Konto. Halte ihn also geheim und lösche ihn im Portal, falls er in falsche Hände gerät.

| Tool | Was es macht |
|---|---|
| `list_devices` | Deine Geräte mit Typ, Raum und Online-Status |
| `list_rooms` | Deine Räume |
| `list_device_types` | Die Gerätetypen, die du anlegen kannst |
| `create_device` | Legt ein Gerät aus Name, Typ und Raum an. Kann auch `APP_KEY` und `APP_SECRET` zurückgeben, die dein Sketch braucht |
| `update_device` | Benennt ein Gerät um, verschiebt es in einen anderen Raum oder ändert seine Beschreibung |
| `delete_device` | Löscht ein Gerät endgültig |

Dein Assistent ist angewiesen, bei dir nachzufragen, bevor er etwas anlegt, ändert oder löscht. Löschen funktioniert nur mit dem exakten Namen oder der ID eines Geräts, sodass ein ähnlicher Name nicht das falsche Gerät löschen kann. Jedes neue Gerät belegt eine deiner Gerätelizenzen, genauso wie beim Anlegen im Portal.

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

**OpenAI Codex** (`~/.codex/config.toml`), mit dem Key in der Umgebungsvariable `SINRICPRO_API_KEY`:

```toml
[mcp_servers.sinricpro]
url = "https://docs.sinric.pro/mcp/account"
bearer_token_env_var = "SINRICPRO_API_KEY"
```

Probiere dann:

- *„Lege im Wohnzimmer einen Switch namens Küchenlicht an und gib mir einen ESP32-Sketch dafür.“*
- *„Benenne Küchenlicht in Speisekammerlicht um.“*
- *„Welche meiner Geräte sind offline?“*

---

## Agent Skill: dein Smart Home steuern

Mit dem [SinricPro Agent Skill](https://github.com/sinricpro/sinricpro-agent-skills) (`sinricpro-smart-home`) kann ein KI-Agent dein SinricPro Konto steuern. Er funktioniert mit [OpenClaw](https://openclaw.ai), Claude Code und anderen Agenten, die `SKILL.md`-Skills laden.

| | Docs MCP Server | Konto-Endpunkt | Agent Skill |
|---|---|---|---|
| Zweck | Hilft dir, SinricPro Code zu schreiben | Geräte einrichten und ihren Code schreiben | Deine Geräte steuern |
| Spricht mit | Öffentlicher Dokumentation | Dokumentation und deinem Konto über `api.sinric.pro` | Deinem Konto über `api.sinric.pro` |
| Benötigt | Nichts | Einen API-Key | Node.js 18+ und einen API-Key |

Du kannst deinem Agenten zum Beispiel Folgendes sagen:

- *„Schalte das Licht im Wohnzimmer ein.“*
- *„Stelle die Klimaanlage im Schlafzimmer auf 24 Grad.“*
- *„Welche Geräte sind offline?“*
- *„Starte die Szene Filmabend.“*
- *„Schalte das Verandalicht werktags um 18:30 Uhr ein.“*

Der Skill kann Folgendes nicht: Kamera-Livebild oder Schnappschüsse, Geräte hinzufügen oder entfernen (nutze dafür den [Konto-Endpunkt](#manage-devices-account-endpoint)), Automatisierungen bearbeiten oder Kontoeinstellungen ändern.

### Einrichtung

1. Erstelle einen API-Key unter [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). Der Key gibt vollen Zugriff auf dein Konto. Halte ihn also geheim und lösche ihn im Portal, falls er in falsche Hände gerät.
2. Klone das Repository und kopiere den Ordner `sinricpro-smart-home` in das Skills-Verzeichnis deines Agenten:

   ```bash
   git clone https://github.com/sinricpro/sinricpro-agent-skills.git
   ```

   | Agent | Skills-Verzeichnis |
   |---|---|
   | OpenClaw | `~/.openclaw/skills/` oder `<workspace>/skills/` |
   | Claude Code | `~/.claude/skills/` oder `<project>/.claude/skills/` |

3. Setze `SINRICPRO_API_KEY` in der Umgebung, in der dein Agent läuft. In OpenClaw trägst du den Key in der Konfiguration des Skills ein.

### Schlösser und Garagentore

Standardmäßig kann der Skill Türen verriegeln und Garagentore schließen, weigert sich aber, sie zu entriegeln oder zu öffnen, auch innerhalb von Szenen. Der Grund: Ein Agent kann eine Anfrage falsch verstehen. Um Entriegeln und Öffnen zu erlauben, setze `SINRICPRO_ALLOW_UNLOCK=1`. Der Agent ist angewiesen, dich vor jedem Entriegeln oder Öffnen zu fragen, aber diese Umgebungsvariable ist der einzige echte Schutz. Aktiviere sie nur, wenn du das Risiko in Kauf nimmst.

Die CLI und alle Konfigurationsoptionen findest du in der [README des Repositorys](https://github.com/sinricpro/sinricpro-agent-skills#readme).
