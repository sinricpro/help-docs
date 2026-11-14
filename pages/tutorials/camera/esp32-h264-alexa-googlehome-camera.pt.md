---
title: Câmera H.264 com ESP32-S3 para Alexa e Google Home
layout: post
lang: pt
description: Transmita vídeo H.264 ao vivo de uma câmera ESP32-S3 para o Alexa Echo Show, telas Google Nest, Chromecast e o app Sinric Pro.
---

Nesta seção vamos mostrar como transmitir vídeo ao vivo de uma câmera **ESP32-S3** para

* Alexa Echo Show e o app Alexa
* Telas inteligentes Google Nest e Chromecast com Google TV
* App e Portal Sinric Pro

usando uma faixa de vídeo H.264 sobre WebRTC.

### Pré-requisitos :

1. Uma placa de câmera **ESP32-S3** com PSRAM (por exemplo XIAO ESP32S3 Sense, Freenove ESP32-S3, ESP32-S3-WROOM CAM).
2. Arduino IDE com o **core ESP32 3.3.10 ou 3.3.11**.
3. Bibliotecas: **SinricPro** 5.1.0 ou mais recente e **SinricProWebRTC** 0.2.0 ou mais recente.

> Um ESP32 clássico não consegue fazer isso. O codificador H.264 é apenas por software e só é distribuído para o S3, então uma câmera com ESP32 clássico continua funcionando apenas no App e no Portal. Veja [Câmera WebRTC com ESP32]({{ site.github.url }}/pt/pages/tutorials/camera/esp32-webrtc-camera.pt.html).

### Por que H.264?

O App e o Portal Sinric Pro conseguem exibir o que a câmera enviar, então para eles um ESP32 pode simplesmente enviar imagens JPEG por um canal de dados WebRTC. A Alexa e o Google Home não. Eles são clientes WebRTC comuns e esperam uma **faixa de vídeo** de verdade, e aceitam apenas um pequeno conjunto de codecs:

| | Amazon Alexa | Google Home |
|---|---|---|
| Codec de vídeo | H.264 (Baseline a High, nível ≤ 4.1) | H.264 ou VP8 |
| Codec de áudio | Opus, PCMU ou PCMA | Opus, G.711 ou G.722 |
| Resolução | 480p a 1080p | 480p a 1080p |
| ICE | Sem trickle ICE, apenas IPv4 | Sem trickle ICE |
| Answer | Em até 6 segundos | — |

As duas regras que mais pesam para uma placa pequena são **H.264** e **no mínimo 480p**. Nenhuma delas é negociável, e é por isso que uma câmera que funciona muito bem no App Sinric Pro não aparece em um Echo Show enquanto não conseguir codificar H.264 em 640 x 480.

### Como funciona?

A câmera decide o que enviar **lendo o offer do visualizador**, então um único firmware atende a todos:

1. Um visualizador cria um offer WebRTC e o Sinric Pro o encaminha para a sua câmera, adicionando servidores STUN e TURN para que a câmera possa ser alcançada de fora do seu WiFi.
2. A câmera examina o offer:
   * **O offer contém uma faixa de vídeo pedindo H264** → a câmera reinicializa o sensor em YUV422, codifica com `esp_h264` e envia H.264 sobre RTP. É isso que a Alexa e o Google Home enviam.
   * **O offer não contém faixa de vídeo** → a câmera continua enviando imagens JPEG pelo canal de dados, exatamente como antes. É isso que as versões mais antigas do App e do Portal enviam.
3. A câmera responde com um answer contendo todos os candidatos ICE que reuniu, e o vídeo passa a fluir **diretamente entre a câmera e o visualizador**, ou pelo servidor TURN do Sinric Pro quando um caminho direto não é possível.

Como a escolha é feita a cada sessão, atualizar o firmware nunca quebra um App ou Portal mais antigo.

#### Telas inteligentes recebem 640 x 480 automaticamente

O App e o Portal abrem um **canal de dados** junto com o vídeo e o usam para transportar controles em JSON: resolução, taxa de quadros, flash, inversão vertical, espelhamento. A Alexa e o Google Home não abrem nenhum canal de dados — eles só querem mídia.

A câmera usa isso como sinal. **Um offer sem canal de dados é uma tela inteligente**, então a sessão começa em 640 x 480 em vez do tamanho configurado, porque qualquer coisa abaixo de 480p seria recusada e não há um canal pelo qual o visualizador pudesse pedir algo maior.

#### O que o codificador realmente consegue fazer

O `esp_h264` codifica por software no segundo núcleo. Ele não é rápido, e os números reais são:

| Resolução | Taxa de quadros | Aproximadamente |
|---|---|---|
| 320 x 240 (QVGA) | 3 fps | 350 ms por quadro |
| 640 x 480 (VGA) | 2 fps | 1 segundo por quadro |

Medido em uma XIAO ESP32S3 Sense: 204 quadros em 73 segundos a 320 x 240, sem nenhum descartado.

Cada tamanho declara a taxa que realmente consegue manter, porque o receptor dimensiona seu jitter buffer a partir do que a câmera promete no SDP. Prometer 10 fps e entregar 2 piora a imagem, em vez de melhorar.

O codificador ocupa cerca de **272 KB de flash** e pouco mais de **1 MB de PSRAM** em QVGA, e bem mais em VGA.

### Passo 1: Criar o dispositivo de câmera

1. [Faça login](https://portal.sinric.pro) na sua conta Sinric Pro, vá em **Devices** e clique em **Add Device**.
2. Digite um nome como **Front Camera** e selecione o tipo de dispositivo **Camera**.
3. Abra a aba **Other**. Em **Camera Stream Configuration**, selecione Board **ESP32** e Streaming Protocol **WebRTC**.
4. Marque **H.264 video track**.
5. Clique em **Save**. A próxima tela mostra o **Device Id**, a **App Key** e o **App Secret**. ***Mantenha esses valores em segurança. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Instalar as bibliotecas

No Arduino IDE, abra o **Library Manager** e instale **SinricPro** e **SinricProWebRTC**.

### Passo 3: Gravar o exemplo

1. Abra **File → Examples → SinricProWebRTC → SinricProCamera**.
2. Em `Settings.h`, defina `WIFI_SSID`, `WIFI_PASS`, `APP_KEY`, `APP_SECRET`, `CAMERA_ID` e `CAMERA_BOARD` (escolha sua placa em `BoardProfiles.h`).
3. Em **Tools**, ative **PSRAM** e escolha um esquema de partição com pelo menos 3 MB para o app, como **Huge APP (3MB No OTA)**.
4. Faça o upload e depois abra o Monitor Serial a 115200 baud. Você deverá ver:

```
Camera: XIAO ESP32S3 Sense, PSRAM: 8388608 bytes
WiFi connected: 192.168.1.194
Connected to SinricPro
```

O exemplo ativa o H.264 sozinho quando é compilado para um ESP32-S3:

```cpp
#if CONFIG_IDF_TARGET_ESP32S3
#define WEBRTC_H264 1
#else
#define WEBRTC_H264 0
#endif
```

e informa ao Sinric Pro que os visualizadores podem pedir uma faixa de vídeo:

```cpp
camera.enableWebRTCVideo(WEBRTC_H264);
```

### Passo 4: Demonstração

1. Peça para a Alexa ou o Google Home descobrir novos dispositivos.
2. Alexa: *"Alexa, mostrar a Front Camera"*
3. Google Home: *"Mostrar a Front Camera na TV da Sala"* (o nome do seu Chromecast com Google TV)

Você deverá ver `WebRTC offer ...` e `WebRTC answer sent` no Monitor Serial enquanto a tela se conecta.

A câmera também abre no app Alexa e no app Google Home do seu celular.

App Alexa:

![Sinric Pro ESP32-S3 H.264 camera live in the Alexa app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_alexa_app_camera.jpg)

App Google Home:

![Sinric Pro ESP32-S3 H.264 camera live in the Google Home app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_google_home_app_camera.jpg)

### Limitações

- **Apenas ESP32-S3.** Não existe codificador H.264 por software para o ESP32 clássico.
- **A taxa de quadros é baixa**: cerca de 3 fps em 320 x 240 e 2 fps em 640 x 480. A Alexa e o Google Home sempre recebem 640 x 480, então espere aproximadamente 2 fps neles.
- **Um visualizador por vez.** Um novo visualizador substitui o atual.
- **A resolução fica fixa durante toda a sessão H.264.** O controle de resolução do visualizador fica desativado enquanto uma faixa de vídeo está em execução.
- **Áudio** está disponível quando a placa tem microfone, como a XIAO ESP32S3 Sense.
- O WebRTC do Google Home só funciona nas telas inteligentes Google Nest e no Chromecast com Google TV.

### Solução de problemas

- **A câmera nunca aparece no Echo Show.** Verifique se **H.264 video track** está marcado em Camera Stream Configuration e se o dispositivo é um ESP32-S3. Sem isso, o Sinric Pro nem chega a anunciar a câmera para a Alexa.
- **`Camera init failed`**: `CAMERA_BOARD` errado, ou a PSRAM está desativada em Tools.
- **"Live View isn't available right now"** na Alexa: olhe o Monitor Serial. `WebRTC answer failed` significa que a câmera não conseguiu montar um answer a tempo; nenhuma mensagem geralmente significa que o offer nem chegou.
- **Transmite em casa, mas não com dados móveis**: essa rede bloqueia conexões diretas, então a transmissão precisa ser retransmitida via TURN.
- Você pode validar o payload do Google com o [validador WebRTC do Google](https://smarthome-webrtc-validator.withgoogle.com/).

Consulte nossa página de [Solução de problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para ver possíveis soluções para o seu problema.

### Tutoriais relacionados

- [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html)
- [Câmera WebRTC com ESP32]({{ site.github.url }}/pt/pages/tutorials/camera/esp32-webrtc-camera.pt.html)
- [Câmera WebRTC com Raspberry Pi]({{ site.github.url }}/pt/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.pt.html)

> Este documento é de código aberto. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
