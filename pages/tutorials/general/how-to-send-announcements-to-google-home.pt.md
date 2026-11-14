---
title: Enviando anúncios de voz pelo Google Home usando o SinricPro
layout: post
lang: pt
description: Envie anúncios de voz para o Google Home a partir de um ESP32 ou ESP8266 com o Sinric Pro, usando as automações do Google Home.
---

O Google Home **não oferece suporte a anúncios de conversão de texto em fala (TTS) arbitrários** pela API Smart Home para integrações de terceiros como o SinricPro. No entanto, você pode obter anúncios de voz **indiretamente** usando as **Rotinas do Google Home** (chamadas de *“Routines”* no app Google Home) combinadas com o acionamento de um dispositivo virtual.

---

## Método: Rotinas do Google Home + Switch do SinricPro

### Passo a passo:

1. **Crie uma Rotina do Google Home**  
   - Abra o **app Google Home**.  
   - Vá em **Routines** → **+ Create new routine**.  
   - Em **“When this happens”**, escolha **“Device state”** (ex.: “Quando [Dispositivo] ligar”).  
   - Em **“Add action”**, selecione **“Assistant voice”** ou **“Speak response”** e digite seu anúncio personalizado (ex.: “O portão da garagem está aberto.”).  
   - Salve a rotina.

2. **Adicione um Switch no SinricPro**  
   - No seu **painel do SinricPro**, crie um novo dispositivo **Switch**.  
   - Dê a ele um nome fácil de reconhecer (ex.: “Gatilho de Anúncio”).

3. **Acione o anúncio**  
   - A partir do seu código ou sistema de automação, envie um comando `sendPowerStateEvent` para **ligar** o Switch pelo SinricPro.  
   - Essa mudança de estado é detectada pelo Google Home e aciona a rotina associada, fazendo o Google Assistente falar a sua mensagem.

---

Código de exemplo para ESP8266/ESP32:

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
} 
```
---

### Limitação:
Essa abordagem funciona **apenas com anúncios predefinidos**. Se você precisa enviar **mensagens dinâmicas, geradas em tempo de execução** (ex.: “A temperatura atual é de 23°C”), o Google Home **não oferece suporte a isso** pelas APIs Smart Home padrão. Nesses casos, você precisaria explorar soluções alternativas, como **notificações de broadcast em dispositivos Android** ou **alto-falantes TTS de terceiros**, que ficam fora do framework oficial do Google Smart Home.

---
