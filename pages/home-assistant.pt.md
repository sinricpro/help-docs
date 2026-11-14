---
title: Home Assistant
weight: 4
lang: pt
description: Conecte o Sinric Pro ao Home Assistant com a integração personalizada oficial. Instale pelo HACS, adicione sua chave de API e controle seus dispositivos Sinric Pro pelo Home Assistant.
---

Com a [integração SinricPro para Home Assistant](https://github.com/sinricpro/homeassistant-sinricpro) você pode controlar seus dispositivos Sinric Pro pelo Home Assistant e usá-los nas automações do Home Assistant.

- Configuração pela interface do Home Assistant. Não é preciso YAML.
- Atualizações de estado em tempo real.
- Os alertas do Sinric Pro aparecem como notificações do Home Assistant.

**1. Obtenha uma chave de API**

Se você ainda não tem uma chave de API, faça login no [Portal](https://portal.sinric.pro) e clique em **Credentials** ou [clique aqui](https://portal.sinric.pro/credential/new/apikey) para gerar uma nova chave de API.

Copie a chave de API. Ela **não** é a App Key usada no código do seu dispositivo.

**2. Instale a integração**

*Com o HACS (recomendado)*

1. Abra o HACS na sua instância do Home Assistant.
2. Clique em **Integrations**.
3. Clique nos três pontos no canto superior direito e selecione **Custom repositories**.
4. Adicione a URL do repositório: `https://github.com/sinricpro/homeassistant-sinricpro`
5. Selecione **Integration** como categoria e clique em **Add**.
6. Procure por **SinricPro** e instale.
7. Reinicie o Home Assistant.

*Manualmente*

1. Baixe a versão mais recente na [página de releases](https://github.com/sinricpro/homeassistant-sinricpro/releases).
2. Copie a pasta `custom_components/sinricpro` para o diretório `custom_components` da configuração do seu Home Assistant.
3. Reinicie o Home Assistant.

**3. Adicione sua conta Sinric Pro**

1. Vá em **Settings** > **Devices & Services**.
2. Clique em **+ Add Integration**.
3. Procure por **SinricPro**.
4. Informe sua chave de API do Sinric Pro e clique em **Submit**.

Seus dispositivos Sinric Pro agora aparecem no Home Assistant.

### Dispositivos compatíveis

| Tipo de dispositivo Sinric Pro | Plataforma do Home Assistant | Recursos |
| --- | --- | --- |
| Switch | `switch` | Ligar/Desligar |
| Light | `light` | Ligar/Desligar, brilho, cor RGB, temperatura de cor |
| Dimmable Switch | `light` | Ligar/Desligar, nível de potência. Aparece como uma lâmpada dimerizável |
| Blinds | `cover` | Abrir/Fechar, posição |
| Garage Door | `cover` | Abrir/Fechar |
| Doorbell | `event`, `button`, `sensor` | Evento de toque, acionamento manual, horário do último toque |
| Fan | `fan` | Ligar/Desligar, velocidade |
| Smart Lock | `lock` | Trancar/Destrancar |
| Speaker | `media_player` | Ligar/Desligar, volume, mudo |
| TV | `media_player` | Ligar/Desligar, volume, mudo, canal acima/abaixo, reproduzir/pausar |
| Thermostat | `climate` | Ligar/Desligar, temperatura desejada, modo, temperatura atual, umidade |
| Window AC Unit | `climate` | Recursos do termostato e modo do ventilador |
| Air Quality Sensor | `sensor` | PM1.0, PM2.5, PM10 |
| Contact Sensor | `binary_sensor` | Aberto/Fechado |
| Motion Sensor | `binary_sensor` | Movimento detectado / não detectado |
| Temperature Sensor | `sensor` | Temperatura, umidade |

Tipos de dispositivo personalizados criados com [modelos de dispositivo]({{ site.github.url }}/pt/pages/custom-templates.pt.html) ainda não são compatíveis.

### Use os alertas do Sinric Pro em automações

A integração dispara um evento `sinricpro_alert` para cada alerta do Sinric Pro. Exemplo:

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

### Solução de problemas

**Erro "Invalid API key"**

- Verifique se você está usando a **chave de API** da página **Credentials** do Portal, e não a App Key.
- Verifique se a chave de API não expirou.

**Os dispositivos não aparecem**

- Verifique se os dispositivos existem na sua conta Sinric Pro e se estão online no Portal.
- Recarregue a integração.

**O estado não é atualizado**

- Verifique sua conexão de rede e os logs do Home Assistant em busca de erros de conexão.

Para ativar o log de depuração, adicione o seguinte ao seu `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    custom_components.sinricpro: debug
```

Se o problema continuar, abra uma issue no [GitHub](https://github.com/sinricpro/homeassistant-sinricpro/issues).

> Este documento é de código aberto. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
