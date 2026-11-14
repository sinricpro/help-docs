---
title: Câmera WebRTC com ESP32 (visualização ao vivo no App e no Portal Sinric Pro)
layout: post
lang: pt
description: Transmita vídeo ao vivo de uma câmera ESP32 para o app e o Portal Sinric Pro, de qualquer lugar, usando WebRTC.
---

Nesta seção vamos mostrar como transmitir vídeo ao vivo de uma câmera ESP32 para o **App Sinric Pro** e o **Portal Sinric Pro**, de qualquer lugar, usando WebRTC.

### Pré-requisitos :

1. Placa de câmera ESP32 ou ESP32-S3 com PSRAM (por exemplo AI-Thinker ESP32-CAM, XIAO ESP32S3 Sense, Freenove ESP32-S3).
2. Arduino IDE com o **core ESP32 3.3.10 ou 3.3.11** (a biblioteca WebRTC é distribuída pré-compilada para essas versões).
3. Bibliotecas: **SinricPro** (com suporte a WebRTC) e **SinricProWebRTC**.

### Como funciona?

1. O App ou o Portal Sinric Pro cria um offer WebRTC e o envia para a sua câmera por meio do Sinric Pro.
2. O Sinric Pro adiciona servidores STUN/TURN à requisição para que a câmera possa ser alcançada de fora da sua rede WiFi.
3. O ESP32 responde, e o vídeo flui **diretamente entre a câmera e o seu celular ou navegador**. Quando um caminho direto não é possível, ele é retransmitido pelo servidor TURN do Sinric Pro.

### Passo 1: Criar o dispositivo de câmera

1. Vá em [portal.sinric.pro](https://portal.sinric.pro) → **Devices** → **Add Device** e selecione o tipo de dispositivo **Camera**.
2. Em **Camera Stream Configuration**, selecione Board **ESP32** e Streaming Protocol **WebRTC**.
3. Em um ESP32-S3, marque também **H.264 video track** se quiser que a câmera chegue à Amazon Alexa e ao Google Home. Veja [Câmera H.264 com ESP32-S3 para Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.pt.html).
4. Salve e anote o **Device Id**. Sua **App Key** e seu **App Secret** estão em **Credentials**.

### Passo 2: Instalar as bibliotecas

No Arduino IDE, abra o **Library Manager** e instale **SinricPro** e **SinricProWebRTC**.

### Passo 3: Gravar o exemplo

1. Abra **File → Examples → SinricProWebRTC → SinricProCamera**.
2. Em `Settings.h`, defina seu WiFi, App Key, App Secret, Device Id e `CAMERA_BOARD` (veja `BoardProfiles.h`).
3. Em **Tools**, ative **PSRAM** e selecione um esquema de partição com pelo menos 3 MB para o app, como **Huge APP (3MB No OTA)**.
4. Faça o upload e depois abra o Monitor Serial a 115200 baud. Você deverá ver `Connected to SinricPro`.

### Passo 4: Ver a câmera

- **App**: abra a câmera na lista de dispositivos.
- **Portal**: clique em **Preview** no cartão da câmera.

As capturas de imagem (**Take Snapshot**, **View Snapshots**) continuam funcionando junto com a visualização ao vivo.

### Limitações

- A Amazon Alexa e o Google Home precisam de uma faixa de vídeo H.264, que só o ESP32-S3 consegue produzir. Em um ESP32 clássico, esta câmera continua funcionando apenas no App e no Portal. Veja [Câmera H.264 com ESP32-S3 para Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.pt.html).
- Um visualizador por vez: abrir a câmera em outro dispositivo substitui o visualizador atual.
- O vídeo começa em 5 quadros por segundo em VGA (640 x 480). No visualizador você pode mudar a resolução e a taxa de quadros, além de ligar ou desligar o flash (AI-Thinker ESP32-CAM), a inversão vertical e o espelhamento.
- A qualidade cai automaticamente em conexões lentas; desative **Auto quality** para manter suas configurações fixas.
- O áudio está disponível na XIAO ESP32S3 Sense (microfone embutido).
- Se o visualizador pedir para você atualizar o firmware da câmera, grave-o novamente com o SDK SinricPro 5.1.0 ou mais recente.

### Solução de problemas

- `Camera init failed`: `CAMERA_BOARD` errado, ou a PSRAM está desativada.
- Travado em "Connecting": procure `WebRTC answer failed` no Monitor Serial e confirme que o core ESP32 é o 3.3.10 ou o 3.3.11.
- Funciona em casa, mas não com dados móveis: essa rede bloqueia conexões diretas, então a transmissão precisa ser retransmitida via TURN; verifique no Monitor Serial se o offer incluiu servidores TURN.

### Tutoriais relacionados

- [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html)
- [Câmera H.264 com ESP32-S3 para Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.pt.html)
- [Câmera WebRTC com Raspberry Pi]({{ site.github.url }}/pt/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.pt.html)

