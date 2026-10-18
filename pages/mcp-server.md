---
title: "MCP Server & Skill"
weight: 5
lang: en
---

The **SinricPro Docs MCP Server** lets AI coding assistants read the official SinricPro documentation, API reference, and SDK examples directly — so tools like Claude Code, OpenAI Codex, and Cursor can answer SinricPro questions and write device code using up-to-date, authoritative sources instead of guessing.

It speaks the [Model Context Protocol](https://modelcontextprotocol.io) (MCP) over **Streamable HTTP**. There is nothing to install and no API key required — just point your client at the endpoint below.

> **Want your AI agent to control your devices instead?** The MCP server only reads documentation. To turn devices on and off, run scenes, or manage schedules from an agent, use the [SinricPro agent skill](#agent-skill-control-your-smart-home).

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

---

## Agent skill: control your smart home

The [SinricPro agent skill](https://github.com/sinricpro/sinricpro-agent-skills) (`sinricpro-smart-home`) lets an AI agent control your SinricPro account. It works with [OpenClaw](https://openclaw.ai), Claude Code, and other agents that load `SKILL.md` skills.

| | Docs MCP server | Agent skill |
|---|---|---|
| Purpose | Help you write SinricPro code | Control your devices |
| Talks to | Public documentation | Your account, via `api.sinric.pro` |
| Needs | Nothing | Node.js 18+ and an API key |

You can ask your agent things like:

- *"Turn on the living room light."*
- *"Set the bedroom AC to 24 degrees."*
- *"Which devices are offline?"*
- *"Run the movie night scene."*
- *"Turn the porch light on at 6:30 pm on weekdays."*

The skill does not handle camera live view or snapshots, adding or removing devices, editing automations, or account settings.

### Set it up

1. Create an API key at [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). The key gives full access to your account, so keep it private, and delete it in the portal if it leaks.
2. Clone the repository and copy the `sinricpro-smart-home` folder into your agent's skills directory:

   ```bash
   git clone https://github.com/sinricpro/sinricpro-agent-skills.git
   ```

   | Agent | Skills directory |
   |---|---|
   | OpenClaw | `~/.openclaw/skills/` or `<workspace>/skills/` |
   | Claude Code | `~/.claude/skills/` or `<project>/.claude/skills/` |

3. Set `SINRICPRO_API_KEY` in the environment your agent runs in. In OpenClaw, enter it in the skill's configuration.

### Locks and garage doors

By default, the skill can lock doors and close garage doors, but it refuses to unlock or open them, including inside scenes. This is because an agent can misread a request. To allow unlocking and opening, set `SINRICPRO_ALLOW_UNLOCK=1`. The agent is told to ask you before each unlock or open, but that environment variable is the only real safeguard. Enable it only if you accept the risk.

See the [repository README](https://github.com/sinricpro/sinricpro-agent-skills#readme) for the CLI and all configuration options.
