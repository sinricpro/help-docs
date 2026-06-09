---
title: MCP Server
weight: 5
lang: en
---

The **SinricPro Docs MCP Server** lets AI coding assistants read the official SinricPro documentation, API reference, and SDK examples directly — so tools like Claude Code, OpenAI Codex, and Cursor can answer SinricPro questions and write device code using up-to-date, authoritative sources instead of guessing.

It speaks the [Model Context Protocol](https://modelcontextprotocol.io) (MCP) over **Streamable HTTP**. There is nothing to install and no API key required — just point your client at the endpoint below.

### Endpoint

```
https://docs.sinric.pro/mcp
```

### What it gives your assistant

Once connected, your AI assistant gains these tools:

| Tool | What it does |
|---|---|
| `docs_search` | Full-text search across all docs, API and SDK content |
| `get_docs_overview` | Table of contents for everything available |
| `get_api_reference` | REST API endpoint reference (`api.sinric.pro`) |
| `get_sdk_example` | Working example code for a device on a given SDK |
| `get_quickstart` | Step-by-step quickstart for a device |
| `get_capabilities_matrix` | Which devices are supported on which SDK |
| `get_changelog` | Recent changes across the platform and SDKs |
| `get_pages` | Fetch full doc pages by path |
| `submit_docs_feedback` | Send feedback about a docs page to the maintainers |

SDKs covered: **ESP8266/ESP32 (Arduino C++)**, **ESP-IDF**, **Raspberry Pi Pico**, **Python**, **Node.js / TypeScript**, and **MicroPython**.

---

## Claude Code

Add it with one command:

```bash
claude mcp add --transport http sinricpro-docs https://docs.sinric.pro/mcp
```

Then run `/mcp` inside Claude Code to confirm it's connected.

To share the server with your team, commit a `.mcp.json` file in your project root instead:

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

Create (or edit) `~/.cursor/mcp.json` for all projects, or `.cursor/mcp.json` in a single project's root:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

Cursor auto-detects the Streamable HTTP transport from the `url` field. Open **Settings → MCP** to verify the server shows as connected and its tools are listed.

---

## OpenAI Codex

Edit `~/.codex/config.toml` (global) or `.codex/config.toml` in a trusted project, and add:

```toml
[mcp_servers.sinricpro_docs]
url = "https://docs.sinric.pro/mcp"
```

Restart Codex and the SinricPro docs tools will be available. (Server names in `config.toml` use underscores.)

---

## Bare metal / other MCP clients

The endpoint is a standard MCP Streamable HTTP server, so any compliant client works. Use the `url` form if your client supports HTTP transports directly:

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

**Client only supports stdio?** Bridge it with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

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

**Quick connectivity test** from a terminal — this performs the MCP `initialize` handshake and should return server info:

```bash
curl -s -X POST https://docs.sinric.pro/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

---

## Try it

Once connected, ask your assistant things like:

- *"Using the SinricPro docs MCP, show me a Python switch example."*
- *"How do I refresh an access token with the SinricPro API?"*
- *"Which devices does the ESP-IDF SDK support?"*
- *"Search the SinricPro docs for the doorbell setup."*

Your assistant will pull the answer straight from the official documentation.
