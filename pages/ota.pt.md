---
title: Atualizações OTA
weight: 4
lang: pt
youtubeId: FxtsQuC9mn8
---

### Introdução 

Atualizações OTA (Over-the-Air) permitem que você carregue novo firmware em seu módulo remotamente, eliminando a necessidade de conectá-lo ao seu PC. Esta capacidade é particularmente valiosa quando o acesso físico ao módulo ESP é restrito ou inconveniente.




### Como fazer uma Atualização OTA

1. [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro.

2. Vá para o menu **OTA Updates** à esquerda.

3. Clique no botão **Add OTA Update**.

4. Digite a nova versão do firmware. Selecione o arquivo .bin OTA (Arduino IDE -> Sketch -> Export Compiled Binary) e os módulos nos quais você deseja aplicar a atualização OTA.

5. Clique em **Save**

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-upload.png">

Uma vez que você clique no botão **Save**, o servidor irá transmitir uma solicitação de atualização OTA para os módulos selecionados. Se seu módulo estiver atualmente offline, ele receberá a atualização na próxima vez que se conectar ao servidor.

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-inprogress.png">

*Nota: Você precisa estar no SinricPro SDK v3.2.x ou mais recente para usar OTA*

Você pode encontrar o código de exemplo completo aqui: 
[https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)


{% include youtubePlayer.html id=page.youtubeId %}

Se você está procurando por Atualização OTA WiFi local [aqui]({{ site.github.url }}/pt/pages/ota-updates/local-wifi-ota-update.pt.html)