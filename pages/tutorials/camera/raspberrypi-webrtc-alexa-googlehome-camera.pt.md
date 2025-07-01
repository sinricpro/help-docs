---
title: Câmera WebRTC RaspberryPI para Alexa, Google Home
layout: post
lang: pt
---


Nesta seção, vamos mostrar como criar uma Câmera Sinric Pro e visualizar o feed da câmera em

* Alexa Echo Show
* App Alexa
* Google Nest Smart Display e dispositivos Chromecast com Google TV.
* App e Portal Sinric Pro.

### Pré-requisitos:

1. Raspberry Pi x 1 (bullseye ou mais recente).
2. Controlador de câmera x 1.

![Sinric Pro webrtc camera intro]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_intro.png)


### O que é WebRTC?

WebRTC (Web Real-Time Communication) é uma tecnologia que permite comunicação de áudio e vídeo em tempo real pela internet sem a necessidade de plugins ou downloads. É suportado por todos os principais navegadores, aplicativos e dispositivos Smart Home como Amazon Echo Show, Chrome Cast, Google Nest, tornando-se uma ferramenta poderosa para construir aplicações de comunicação em tempo real. WebRTC funciona usando comunicação peer-to-peer para transmitir dados de áudio e vídeo. Isso significa que o **vídeo/áudio é transmitido diretamente entre os dois dispositivos envolvidos na comunicação, sem passar pelo servidor Sinric Pro**. Isso reduz a latência e melhora o desempenho, especialmente para aplicações que são usadas em longas distâncias.


### Como o WebRTC da Alexa e Google Home funciona com Sinric Pro?


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_with_alexa_googlehome_sequnce_diagram.png)



### Passo 1: Configurar Raspberry Pi com o Módulo de Câmera

Para instruções sobre como configurar o Raspberry Pi com o módulo de câmera, consulte o excelente artigo da Raspberry Pi Foundation [aqui](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera)


### Passo 2: Configurar MediaMTX (anteriormente rtsp-simple-server) para transmitir Pi Camera.

[MediaMTX](https://github.com/bluenviron/mediamtx) é um servidor de mídia em tempo real que permite transmitir vídeo e áudio pela rede. Ele suporta muitos protocolos de streaming, incluindo RTSP, HLS, SRT, WebRTC e RTMP. Porque ele suporta a Câmera Raspberry Pi nativamente, podemos facilmente transmitir o vídeo da câmera Pi via WebRTC usando MediaMTX.

Vamos configurar o MediaMTX.

Para Raspberry Pi arm64:

```shell
pi@pi3:~/Desktop/tutorial $ wget https://github.com/bluenviron/mediamtx/releases/download/v0.23.3/mediamtx_v0.23.3_linux_amd64.tar.gz
pi@pi3:~/Desktop/tutorial $ tar -xzvf mediamtx_v0.23.3_linux_amd64.tar.gz
pi@pi3:~/Desktop/tutorial $ rm mediamtx_v0.23.3_linux_amd64.tar.gz
```

Para Raspberry Pi arm64v8:

```shell
pi@pi3:~/Desktop/tutorial $ wget https://github.com/bluenviron/mediamtx/releases/download/v0.23.3/mediamtx_v0.23.3_linux_arm64v8.tar.gz
pi@pi3:~/Desktop/tutorial $ tar -xzvf mediamtx_v0.23.3_linux_arm64v8.tar.gz
pi@pi3:~/Desktop/tutorial $ rm mediamtx_v0.23.3_linux_arm64v8.tar.gz
```

Uma vez extraído, você verá 3 arquivos. ``mediamtx`` ``mediamtx.yml`` ``license`` 

```shell
pi@pi3:~/Desktop/tutorial $ ls -l
total 36544
-rw-r--r-- 1 pi pi     1062 May 24 16:07 LICENSE
-rwxr-xr-x 1 pi pi 24859649 May 24 16:15 mediamtx
-rw-r--r-- 1 pi pi    19171 Sep 22 12:34 mediamtx.yml
```


Edite ``mediamtx.yml`` para habilitar a Câmera RaspberryPi:

```yml
paths:
  cam:
    source: rpiCamera
```

Salve ``mediamtx.yml`` e feche.

![Sinric Alexa Camera mediamtx config]({{ site.github.url }}/public/img/sinricpro_pi_camera_mediamtx_config.png) 

Inicie ``MediaMTX`` com: ``./mediamtx mediamtx.yml``

```shell
pi@pi3:~/Desktop/tutorial $ ./mediamtx mediamtx.yml

2023/09/22 12:34:58 INF MediaMTX / rtsp-simple-server v0.23.3
2023/09/22 12:34:58 INF [path cam] [rpicamera source] started
2023/09/22 12:34:58 INF [RTSP] listener opened on :8554 (TCP), :8000 (UDP/RTP), :8001 (UDP/RTCP)
2023/09/22 12:34:58 INF [RTMP] listener opened on :1935
2023/09/22 12:34:58 INF [HLS] listener opened on :8888
2023/09/22 12:34:58 INF [WebRTC] listener opened on :8889 (HTTP)
[0:26:13.822982709] [1457]  INFO Camera camera_manager.cpp:299 libcamera v0.0.4+22-923f5d70
[0:26:13.887593667] [1458]  INFO RPI raspberrypi.cpp:1476 Registered camera /base/soc/i2c0mux/i2c@1/ov5647@36 to Unicam device /dev/media2 and ISP device /dev/media0
[0:26:13.889176990] [1457]  INFO Camera camera.cpp:1028 configuring streams: (0) 1920x1080-YUV420
[0:26:13.889745371] [1458]  INFO RPI raspberrypi.cpp:851 Sensor: /base/soc/i2c0mux/i2c@1/ov5647@36 - Selected sensor format: 1920x1080-SGBRG10_1X10 - Selected unicam format: 1920x1080-pGAA
2023/09/22 12:34:59 INF [path cam] [rpicamera source] ready: 1 track (H264)

```

O stream da câmera RaspberryPI resultante estará disponível no caminho http://hostname:8889/cam/. Verifique se você pode acessar a câmera. ex:
``http://pi3:8889/cam/``



### Passo 3: Integração Sinric Pro.

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Câmera Frontal**, descrição **Minha Primeira Câmera** e selecione o tipo de dispositivo como **Camera**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_device.png)

* Clique na aba **Other**

![Sinric Pro webrtc camera]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_other_webrtc.png)

Selecione **RaspPi or Other** e selecione **WebRTC** como protocolo

* Clique em Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro_pi_camera_create_camera_ready_to_connect.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 4: Programação

Você pode usar o SDK ``Python`` ou ``NodeJS`` para lidar com as solicitações de oferta/resposta SDP entre Alexa/Google Home e MediaMTX.

Instale nosso PythonSDK:
    ``pip install sinricpro --user``

 <script src="https://gist.github.com/kakopappa/3ce3f22b9c64a086415320078bd7dc95.js"></script>

Instale nosso NodeJS:
    ``npm install sinricpro``

<script src="https://gist.github.com/kakopappa/d2659a68f70bb4760292d2362a066e3e.js"></script>


### Passo 5: Demo

1. Peça à Alexa ou Google Home para descobrir novos dispositivos.
2. Alexa: Alexa, mostre-me a **Câmera Frontal**
3. Google Home: Mostre-me a **Câmera Frontal** na TV da Sala de Trabalho (nome do seu Chromecast com Google TV)

Alexa Show Echo:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/alexa-eco-show-webrtc-camera-demo.mp4" type="video/mp4">
</video>

Portal:
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-webrtc-camera-demo.mp4" type="video/mp4">
</video>

Google Home Chromecast com Google TV:

![Sinric Pro WebRTC Camera Google Home Chromecast with Google TV ]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_google_home_camera.jpg)


App Alexa:

![Sinric Pro WebRTC camera with Alexa app ]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_alexa_app_camera.jpg)


App Sinric Pro:
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-app-webrtc-camera-demo.mp4" type="video/mp4">
</video>



### Solução de Problemas
1. A visualização da câmera do beta público do App Google Home não funciona corretamente.

2. WebRTC do Google Home é atualmente suportado no Google Nest Smart Display e dispositivos Chromecast com Google TV.

3. Você pode usar a Ferramenta WebRTC do Google para validar o payload. [https://smarthome-webrtc-validator.withgoogle.com/](https://smarthome-webrtc-validator.withgoogle.com/)

4. Câmera não funciona?

Certifique-se de que está conectada corretamente.

![Sinric Pro Pi camera how to connect]({{ site.github.url }}/public/img/sinricpro_pi_webrtc_camera_how_to_connect.png)



Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para possíveis soluções para seu problema.



> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)