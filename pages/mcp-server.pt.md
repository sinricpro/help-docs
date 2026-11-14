---
title: "Servidor MCP e Skill"
weight: 5
lang: pt
description: Conecte assistentes de programação com IA, como Claude Code, Codex e Cursor, à documentação, à referência da API e aos exemplos de SDK do Sinric Pro com o servidor MCP.
---

O **SinricPro Docs MCP Server** permite que assistentes de programação com IA leiam diretamente a documentação oficial do SinricPro, a referência da API e os exemplos de SDK. Assim, ferramentas como Claude Code, OpenAI Codex e Cursor podem responder a perguntas sobre o SinricPro e escrever código de dispositivos usando fontes atualizadas e confiáveis, em vez de adivinhar.

Ele usa o [Model Context Protocol](https://modelcontextprotocol.io) (MCP) sobre **Streamable HTTP**. Não há nada para instalar e nenhuma chave de API é necessária: basta apontar o seu cliente para o endpoint abaixo.

> **Quer que o seu assistente também configure dispositivos?** Conecte-se ao [endpoint da conta](#manage-devices-account-endpoint) com a sua chave de API e ele também poderá criar, renomear e excluir dispositivos na sua conta. Para ligar e desligar dispositivos, executar cenas ou gerenciar agendamentos, use a [agent skill do SinricPro](#agent-skill-control-your-smart-home).

### llms.txt

Se o seu assistente não puder usar MCP, aponte-o para o [llms.txt]({{ site.github.url }}/llms.txt). É um índice em texto puro desta documentação, com um resumo de uma linha de cada página, no formato [llms.txt](https://llmstxt.org), que o ChatGPT, o Claude, o Cursor e ferramentas semelhantes conseguem ler.

### Endpoint

```
https://docs.sinric.pro/mcp
```

### O que ele oferece ao seu assistente

Depois de conectado, o seu assistente de IA ganha estas ferramentas:

| Ferramenta | O que faz |
|---|---|
| `docs_search` | Busca de texto completo em todo o conteúdo da documentação, da API e dos SDKs |
| `get_docs_overview` | Índice de tudo o que está disponível |
| `get_api_reference` | Referência dos endpoints da API REST (`api.sinric.pro`) |
| `get_sdk_example` | Código de exemplo funcional para um dispositivo em um determinado SDK |
| `get_quickstart` | Guia de início rápido passo a passo para um dispositivo |
| `get_capabilities_matrix` | Quais dispositivos são compatíveis com qual SDK |
| `get_changelog` | Alterações recentes na plataforma e nos SDKs |
| `get_pages` | Obtém páginas completas da documentação pelo caminho |
| `submit_docs_feedback` | Envia feedback sobre uma página da documentação aos mantenedores |

SDKs cobertos: **ESP8266/ESP32 (Arduino C++)**, **ESP-IDF**, **Raspberry Pi Pico**, **Python**, **Node.js / TypeScript** e **MicroPython**. Os guias deste site (comandos de voz, modelos de dispositivo, tutoriais, OTA e solução de problemas) também estão incluídos.

---

## Claude Code

Adicione-o com um único comando:

```bash
claude mcp add --transport http sinricpro-docs https://docs.sinric.pro/mcp
```

Em seguida, execute `/mcp` dentro do Claude Code para confirmar que ele está conectado.

Para compartilhar o servidor com a sua equipe, faça o commit de um arquivo `.mcp.json` na raiz do projeto:

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

Crie (ou edite) `~/.cursor/mcp.json` para todos os projetos, ou `.cursor/mcp.json` na raiz de um único projeto:

```json
{
  "mcpServers": {
    "sinricpro-docs": {
      "url": "https://docs.sinric.pro/mcp"
    }
  }
}
```

O Cursor detecta automaticamente o transporte Streamable HTTP a partir do campo `url`. Abra **Settings → MCP** para verificar se o servidor aparece como conectado e se as ferramentas dele estão listadas.

---

## OpenAI Codex

Edite `~/.codex/config.toml` (global) ou `.codex/config.toml` em um projeto confiável e adicione:

```toml
[mcp_servers.sinricpro_docs]
url = "https://docs.sinric.pro/mcp"
```

Reinicie o Codex e as ferramentas da documentação do SinricPro estarão disponíveis. (Os nomes de servidor no `config.toml` usam sublinhados.)

---

## Bare metal / outros clientes MCP

O endpoint é um servidor MCP Streamable HTTP padrão, portanto qualquer cliente compatível funciona. Use a forma com `url` se o seu cliente oferecer suporte direto a transportes HTTP:

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

**O cliente só oferece suporte a stdio?** Faça a ponte com o [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

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

**Teste rápido de conectividade** a partir de um terminal. Ele executa o handshake `initialize` do MCP e deve retornar as informações do servidor:

```bash
curl -s -X POST https://docs.sinric.pro/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

---

## Experimente

Depois de conectado, faça perguntas como estas ao seu assistente:

- *"Usando o MCP da documentação do SinricPro, mostre um exemplo de switch em Python."*
- *"Como renovo um token de acesso com a API do SinricPro?"*
- *"Quais dispositivos o SDK ESP-IDF suporta?"*
- *"O que posso dizer à Alexa para diminuir a intensidade de uma luz?"*

O seu assistente vai buscar a resposta diretamente na documentação oficial.

---

## Gerenciar dispositivos (endpoint da conta)

O endpoint da conta oferece todas as ferramentas de documentação acima, além de ferramentas que atuam na **sua própria conta SinricPro**. O seu assistente pode criar um dispositivo e depois escrever um sketch pronto para gravar nele, em uma única conversa.

```
https://docs.sinric.pro/mcp/account
```

Ele precisa da sua chave de API, enviada como `Authorization: Bearer <your API key>`. Crie uma em [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). A chave dá acesso total à sua conta, então mantenha-a em sigilo e exclua-a no portal se ela vazar.

| Ferramenta | O que faz |
|---|---|
| `list_devices` | Seus dispositivos, com tipo, cômodo e estado online |
| `list_rooms` | Seus cômodos |
| `list_device_types` | Os tipos de dispositivo que você pode criar |
| `create_device` | Cria um dispositivo a partir de um nome, um tipo e um cômodo. Também pode retornar o `APP_KEY` e o `APP_SECRET` de que o seu sketch precisa |
| `update_device` | Renomeia um dispositivo, move-o para outro cômodo ou altera a descrição dele |
| `delete_device` | Exclui um dispositivo permanentemente |

O seu assistente é instruído a confirmar com você antes de criar, alterar ou excluir qualquer coisa. A exclusão só funciona com o nome exato ou o id de um dispositivo, de modo que um nome parecido não pode excluir o dispositivo errado. Cada novo dispositivo usa uma das suas licenças de dispositivo, da mesma forma que ao criá-lo no portal.

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

**OpenAI Codex** (`~/.codex/config.toml`), com a chave na variável de ambiente `SINRICPRO_API_KEY`:

```toml
[mcp_servers.sinricpro]
url = "https://docs.sinric.pro/mcp/account"
bearer_token_env_var = "SINRICPRO_API_KEY"
```

Depois, experimente:

- *"Crie um switch chamado Kitchen Light na Living Room e me dê um sketch de ESP32 para ele."*
- *"Renomeie Kitchen Light para Pantry Light."*
- *"Quais dos meus dispositivos estão offline?"*

---

## Agent skill: controle a sua casa inteligente

A [agent skill do SinricPro](https://github.com/sinricpro/sinricpro-agent-skills) (`sinricpro-smart-home`) permite que um agente de IA controle a sua conta SinricPro. Ela funciona com o [OpenClaw](https://openclaw.ai), o Claude Code e outros agentes que carregam skills `SKILL.md`.

| | Servidor MCP da documentação | Endpoint da conta | Agent skill |
|---|---|---|---|
| Finalidade | Ajudar você a escrever código para o SinricPro | Configurar dispositivos e escrever o código deles | Controlar os seus dispositivos |
| Comunica-se com | Documentação pública | A documentação e a sua conta, via `api.sinric.pro` | A sua conta, via `api.sinric.pro` |
| Requer | Nada | Uma chave de API | Node.js 18+ e uma chave de API |

Você pode pedir ao seu agente coisas como:

- *"Ligue a luz da sala."*
- *"Ajuste o ar-condicionado do quarto para 24 graus."*
- *"Quais dispositivos estão offline?"*
- *"Execute a cena noite de cinema."*
- *"Ligue a luz da varanda às 18h30 nos dias úteis."*

A skill não lida com visualização ao vivo ou capturas de câmera, adição ou remoção de dispositivos (use o [endpoint da conta](#manage-devices-account-endpoint)), edição de automações nem configurações da conta.

### Configuração

1. Crie uma chave de API em [portal.sinric.pro/credential/new/apikey](https://portal.sinric.pro/credential/new/apikey). A chave dá acesso total à sua conta, então mantenha-a em sigilo e exclua-a no portal se ela vazar.
2. Clone o repositório e copie a pasta `sinricpro-smart-home` para o diretório de skills do seu agente:

   ```bash
   git clone https://github.com/sinricpro/sinricpro-agent-skills.git
   ```

   | Agente | Diretório de skills |
   |---|---|
   | OpenClaw | `~/.openclaw/skills/` ou `<workspace>/skills/` |
   | Claude Code | `~/.claude/skills/` ou `<project>/.claude/skills/` |

3. Defina `SINRICPRO_API_KEY` no ambiente em que o seu agente é executado. No OpenClaw, informe-a na configuração da skill.

### Fechaduras e portões de garagem

Por padrão, a skill pode trancar portas e fechar portões de garagem, mas se recusa a destrancá-los ou abri-los, inclusive dentro de cenas. Isso porque um agente pode interpretar um pedido de forma errada. Para permitir destrancar e abrir, defina `SINRICPRO_ALLOW_UNLOCK=1`. O agente é instruído a perguntar a você antes de cada destrancamento ou abertura, mas essa variável de ambiente é a única proteção real. Ative-a somente se você aceitar o risco.

Consulte o [README do repositório](https://github.com/sinricpro/sinricpro-agent-skills#readme) para conhecer a CLI e todas as opções de configuração.
