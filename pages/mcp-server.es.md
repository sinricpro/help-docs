---
title: "Servidor MCP y skill"
weight: 5
lang: es
description: Conecta asistentes de programación con IA como Claude Code, Codex y Cursor a la documentación, la referencia de la API y los ejemplos de SDK de Sinric Pro con el servidor MCP.
---

El **SinricPro Docs MCP Server** permite que los asistentes de programación con IA lean directamente la documentación oficial de SinricPro, la referencia de la API y los ejemplos de los SDK, de modo que herramientas como Claude Code, OpenAI Codex y Cursor puedan responder preguntas sobre SinricPro y escribir código para dispositivos a partir de fuentes actualizadas y fiables, en lugar de adivinar.

Usa el [Model Context Protocol](https://modelcontextprotocol.io) (MCP) sobre **Streamable HTTP**. No hay nada que instalar ni hace falta ninguna clave de API: basta con indicar a tu cliente el endpoint que aparece más abajo.

> **¿Quieres que tu asistente también configure dispositivos?** Conéctate al [endpoint de cuenta](#manage-devices-account-endpoint) con tu clave de API y también podrá crear, renombrar y eliminar dispositivos en tu cuenta. Para encender y apagar dispositivos, ejecutar escenas o gestionar programaciones, usa la [skill de agente de SinricPro](#agent-skill-control-your-smart-home).

### llms.txt

Si tu asistente no puede usar MCP, indícale [llms.txt]({{ site.github.url }}/llms.txt). Es un índice en texto plano de esta documentación, con un resumen de una línea de cada página, en el formato [llms.txt](https://llmstxt.org) que ChatGPT, Claude, Cursor y herramientas similares pueden leer.

### Endpoint

```
https://docs.sinric.pro/mcp
```

### Qué le aporta a tu asistente

Una vez conectado, tu asistente de IA dispone de estas herramientas:

| Herramienta | Qué hace |
|---|---|
| `docs_search` | Búsqueda de texto completo en toda la documentación, la API y el contenido de los SDK |
| `get_docs_overview` | Índice de todo lo que está disponible |
| `get_api_reference` | Referencia de los endpoints de la API REST (`api.sinric.pro`) |
| `get_sdk_example` | Código de ejemplo funcional para un dispositivo en un SDK concreto |
| `get_quickstart` | Guía de inicio rápido paso a paso para un dispositivo |
| `get_capabilities_matrix` | Qué dispositivos son compatibles con cada SDK |
| `get_changelog` | Cambios recientes en la plataforma y los SDK |
| `get_pages` | Obtiene páginas completas de la documentación a partir de su ruta |
| `submit_docs_feedback` | Envía comentarios sobre una página de la documentación a los responsables |

SDK cubiertos: **ESP8266/ESP32 (Arduino C++)**, **ESP-IDF**, **Raspberry Pi Pico**, **Python**, **Node.js / TypeScript** y **MicroPython**. También se incluyen las guías de este sitio (comandos de voz, plantillas de dispositivo, tutoriales, OTA y solución de problemas).

---

## Claude Code

Añádelo con un solo comando:

```bash
claude mcp add --transport http sinricpro-docs https://docs.sinric.pro/mcp
```

Después ejecuta `/mcp` dentro de Claude Code para confirmar que está conectado.

Para compartir el servidor con tu equipo, añade en su lugar un archivo `.mcp.json` a la raíz de tu proyecto y súbelo al repositorio:

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

Crea (o edita) `~/.cursor/mcp.json` para todos los proyectos, o `.cursor/mcp.json` en la raíz de un único proyecto:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

Cursor detecta automáticamente el transporte Streamable HTTP a partir del campo `url`. Abre **Settings → MCP** para comprobar que el servidor aparece como conectado y que se muestran sus herramientas.

---

## OpenAI Codex

Edita `~/.codex/config.toml` (global) o `.codex/config.toml` en un proyecto de confianza y añade:

```toml
[mcp_servers.sinricpro_docs]
url = "https://docs.sinric.pro/mcp"
```

Reinicia Codex y las herramientas de documentación de SinricPro estarán disponibles. (Los nombres de servidor en `config.toml` usan guiones bajos.)

---

## Sin intermediarios / otros clientes MCP

El endpoint es un servidor MCP Streamable HTTP estándar, así que funciona con cualquier cliente que cumpla el protocolo. Usa la forma con `url` si tu cliente admite transportes HTTP directamente:

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

**¿Tu cliente solo admite stdio?** Haz de puente con [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

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

**Prueba rápida de conectividad** desde un terminal: realiza el handshake `initialize` de MCP y debería devolver la información del servidor:

```bash
curl -s -X POST https://docs.sinric.pro/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

---

## Pruébalo

Una vez conectado, pregúntale a tu asistente cosas como:

- *"Usando el MCP de documentación de SinricPro, muéstrame un ejemplo de interruptor en Python."*
- *"¿Cómo renuevo un token de acceso con la API de SinricPro?"*
- *"¿Qué dispositivos admite el SDK de ESP-IDF?"*
- *"¿Qué puedo decirle a Alexa para atenuar una luz?"*

Tu asistente obtendrá la respuesta directamente de la documentación oficial.

---

## Gestiona dispositivos (endpoint de cuenta)

El endpoint de cuenta ofrece todas las herramientas de documentación anteriores, además de herramientas que actúan sobre **tu propia cuenta de SinricPro**. Tu asistente puede crear un dispositivo y luego escribir un sketch listo para grabar en la placa, todo en una sola conversación.

```
https://docs.sinric.pro/mcp/account
```

Necesita tu clave de API, enviada como `Authorization: Bearer <your API key>`. Crea una en [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). La clave da acceso completo a tu cuenta, así que mantenla en privado y elimínala en el portal si se filtra.

| Herramienta | Qué hace |
|---|---|
| `list_devices` | Tus dispositivos, con su tipo, habitación y estado de conexión |
| `list_rooms` | Tus habitaciones |
| `list_device_types` | Los tipos de dispositivo que puedes crear |
| `create_device` | Crea un dispositivo a partir de un nombre, un tipo y una habitación. También puede devolver los valores `APP_KEY` y `APP_SECRET` que necesita tu sketch |
| `update_device` | Renombra un dispositivo, lo mueve a otra habitación o cambia su descripción |
| `delete_device` | Elimina un dispositivo de forma permanente |

Tu asistente tiene instrucciones de consultarte antes de crear, modificar o eliminar cualquier cosa. La eliminación solo funciona con el nombre o el id exactos de un dispositivo, de modo que un nombre parecido no puede borrar el dispositivo equivocado. Cada dispositivo nuevo consume una de tus licencias de dispositivo, igual que si lo crearas en el portal.

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

**OpenAI Codex** (`~/.codex/config.toml`), con la clave en la variable de entorno `SINRICPRO_API_KEY`:

```toml
[mcp_servers.sinricpro]
url = "https://docs.sinric.pro/mcp/account"
bearer_token_env_var = "SINRICPRO_API_KEY"
```

Después prueba:

- *"Crea un interruptor llamado Luz de la cocina en el Salón y dame un sketch de ESP32 para él."*
- *"Cambia el nombre de Luz de la cocina a Luz de la despensa."*
- *"¿Cuáles de mis dispositivos están desconectados?"*

---

## Skill de agente: controla tu hogar inteligente

La [skill de agente de SinricPro](https://github.com/sinricpro/sinricpro-agent-skills) (`sinricpro-smart-home`) permite que un agente de IA controle tu cuenta de SinricPro. Funciona con [OpenClaw](https://openclaw.ai), Claude Code y otros agentes que cargan skills `SKILL.md`.

| | Servidor MCP de documentación | Endpoint de cuenta | Skill de agente |
|---|---|---|---|
| Finalidad | Ayudarte a escribir código de SinricPro | Configurar dispositivos y escribir su código | Controlar tus dispositivos |
| Se comunica con | La documentación pública | La documentación y tu cuenta a través de `api.sinric.pro` | Tu cuenta, a través de `api.sinric.pro` |
| Requiere | Nada | Una clave de API | Node.js 18+ y una clave de API |

Puedes pedirle a tu agente cosas como:

- *"Enciende la luz del salón."*
- *"Pon el aire acondicionado del dormitorio a 24 grados."*
- *"¿Qué dispositivos están desconectados?"*
- *"Ejecuta la escena noche de cine."*
- *"Enciende la luz del porche a las 6:30 de la tarde los días laborables."*

La skill no gestiona la vista en directo ni las capturas de las cámaras, la adición o eliminación de dispositivos (usa el [endpoint de cuenta](#manage-devices-account-endpoint)), la edición de automatizaciones ni los ajustes de la cuenta.

### Configúrala

1. Crea una clave de API en [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). La clave da acceso completo a tu cuenta, así que mantenla en privado y elimínala en el portal si se filtra.
2. Clona el repositorio y copia la carpeta `sinricpro-smart-home` en el directorio de skills de tu agente:

   ```bash
   git clone https://github.com/sinricpro/sinricpro-agent-skills.git
   ```

   | Agente | Directorio de skills |
   |---|---|
   | OpenClaw | `~/.openclaw/skills/` o `<workspace>/skills/` |
   | Claude Code | `~/.claude/skills/` o `<project>/.claude/skills/` |

3. Define `SINRICPRO_API_KEY` en el entorno en el que se ejecuta tu agente. En OpenClaw, introdúcela en la configuración de la skill.

### Cerraduras y puertas de garaje

De forma predeterminada, la skill puede bloquear cerraduras y cerrar puertas de garaje, pero se niega a desbloquearlas o abrirlas, incluso dentro de escenas. Esto se debe a que un agente puede malinterpretar una petición. Para permitir el desbloqueo y la apertura, define `SINRICPRO_ALLOW_UNLOCK=1`. El agente tiene instrucciones de preguntarte antes de cada desbloqueo o apertura, pero esa variable de entorno es la única protección real. Actívala solo si aceptas el riesgo.

Consulta el [README del repositorio](https://github.com/sinricpro/sinricpro-agent-skills#readme) para ver la CLI y todas las opciones de configuración.
