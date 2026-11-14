---
title: Controle Local
weight: 4
lang: pt
description: O controle local permite que o app Sinric Pro fale diretamente por Wi-Fi com seus dispositivos ESP32 e ESP8266, para que continuem funcionando quando a internet cai.
---

O controle local permite que o app Sinric Pro fale com seus dispositivos
**diretamente pelo seu Wi-Fi**, sem passar pela nuvem do Sinric Pro.

Ele faz diferença em duas situações:

- **Sua internet caiu, ou o Sinric Pro está inacessível.** Seus dispositivos
  continuam respondendo ao app enquanto o celular e o dispositivo estiverem na
  mesma rede Wi-Fi.
- **Você quer uma resposta mais rápida.** O comando vai do celular direto para
  o dispositivo, em vez de fazer uma viagem de ida e volta até a nuvem.

![Local Control]({{ site.github.url }}/public/img/local-control-framed.png)

---

## O que você precisa

O controle local já vem integrado ao SDK e fica **ativado por padrão**. Não há
nada para configurar no portal.

| SDK | Versão mínima |
|---|---|
| Arduino (ESP8266 / ESP32 / RP2040) | 5.0.0 |
| ESP-IDF | 1.3.0 |
| Raspberry Pi Pico W (C SDK) | 2.0.0 |
| Python | 6.0.0 |
| Node.js | 6.0.0 |
| MicroPython | 3.0.0 |

Você também precisa de uma versão recente do app Sinric Pro, e o celular deve
estar na **mesma rede Wi-Fi** que o dispositivo. O controle local não funciona
com dados móveis nem de fora da sua casa.

---

## Como funciona

### Encontrando o dispositivo

O app precisa saber em qual endereço o dispositivo está antes de poder falar
com ele. Ele tenta, nesta ordem:

1. **mDNS.** Os dispositivos anunciam `_sinricpro._udp.local.` na rede. Esse é
   o caminho mais rápido e encontra todos os dispositivos em uma única consulta.
2. **Uma sonda de broadcast assinada.** Se o mDNS não retornar nada — muitos
   roteadores bloqueiam multicast — o app envia uma sonda assinada para o
   endereço de broadcast local. Só o dispositivo dono do ID responde, e a
   resposta revela o endereço dele.
3. **O último endereço conhecido**, guardado da última vez em que o dispositivo
   esteve online.

O resultado fica em cache, então a descoberta acontece uma vez só, e não a cada
toque.

### Enviando um comando

Os comandos vão para a **porta UDP 3333** do dispositivo. A mensagem é
exatamente o mesmo envelope assinado que a nuvem usa:

```json
{
  "header":    { "payloadVersion": 2, "signatureVersion": 1 },
  "payload":   { "action": "setPowerState", "deviceId": "...", "value": { "state": "On" } },
  "signature": { "HMAC": "..." }
}
```

O dispositivo verifica a assinatura, executa o mesmo callback que executaria
para uma requisição da nuvem e responde ao celular. Seu sketch não muda: um
dispositivo que trata `onPowerState` vindo da Alexa também o trata vindo da LAN.

---

## Segurança

- **Todo comando é assinado** com o seu app secret usando HMAC-SHA256, e o
  dispositivo o verifica antes de agir. Um comando sem assinatura ou alterado é
  recusado.
- **O app secret nunca trafega pela rede.** Ele assina a mensagem; não faz
  parte dela.
- Um dispositivo **só responde pelos IDs de dispositivo que são dele**. Ele
  ignora requisições da LAN endereçadas a qualquer outro.
- Uma requisição que falha na verificação recebe uma resposta assinada
  *"Signature is invalid"*. Isso é proposital: permite que o app diferencie um
  app secret errado de um dispositivo que está desligado.

---

## Como desativar

O controle local vem ativado por padrão. Para desativá-lo:

**Arduino**

```cpp
#define SINRICPRO_NOMDNS   // keep local control, drop the mDNS announcement
```

**ESP-IDF** — no `menuconfig`, em *SinricPro*:

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

## Solução de problemas

**O app diz "No devices found on this Wi-Fi network"**

- Verifique se o celular e o dispositivo estão na **mesma rede Wi-Fi**. Muitos
  roteadores colocam a rede de convidados em uma sub-rede separada, o que
  impede a comunicação.
- Verifique se o dispositivo está **ligado e conectado**. O log serial dele deve
  mostrar `UDP: listening on port 3333` logo após a inicialização.
- Alguns roteadores isolam os clientes sem fio uns dos outros ("AP isolation" ou
  "client isolation"). O controle local não funciona assim; desative essa opção
  nas configurações do roteador.
- Abra o app uma vez com internet antes. O app precisa da sua lista de
  dispositivos e, na primeira vez, busca na nuvem a credencial de cada um.

**Funciona, mas para depois que o roteador reinicia**

Provavelmente o endereço IP do dispositivo mudou. Abra a tela Local Control e
puxe para atualizar, ou reserve um endereço fixo para o dispositivo no roteador.

**Os comandos estão lentos ou intermitentes**

Dê alguns segundos ao dispositivo depois que ele inicializar. No ESP32 e no
ESP8266, a conexão segura inicial com a nuvem disputa o rádio, e as respostas
locais podem atrasar até que ela se estabilize.

**O mDNS nunca encontra nada**

Isso é comum e não é um defeito. Muitos roteadores domésticos descartam tráfego
multicast. O app recorre automaticamente a uma sonda de broadcast, então a
descoberta continua funcionando.
