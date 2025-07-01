---
title: Homebridge (Homekit)
weight: 4
lang: pt
youtubeId: 3YI87iWlgDM
---

Com nosso plugin Homebridge-SinricPro, agora você pode expor seus dispositivos para o Homekit.

**1. Obter uma Chave API**

Se você não tem uma Chave API, faça login no [Portal](https://portal.sinric.pro) e clique em **Credentials** ou [clique aqui](https://portal.sinric.pro/credential/new/apikey) para gerar uma nova chave API.

![Plugin Homebridge-SinricPro nova chave API]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key.png)

Clique em Save

![Plugin Homebridge-SinricPro nova API salva]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-new-api-key-generated.png)

Copie a Chave API

**1. Instalar plugin Homebridge-SinricPro**

Clique em Plugins e digite [**Sinricpro**](https://www.npmjs.com/package/homebridge-sinricpro).

![Instalação do plugin Homebridge-SinricPro]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-search.png)

Clique em **Install**. Uma vez que a instalação seja concluída, este diálogo aparecerá. Digite a Chave API acima

![Configurações do plugin Homebridge-SinricPro]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-settings.png)

Clique em Save. 

![Instalação do plugin Homebridge-SinricPro]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-install.png)

**Agora você deve reiniciar o Homebridge !!**

![Instalação do plugin Homebridge-SinricPro]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-device-discovert.png)

Na inicialização, o Homebridge descobrirá todos os seus dispositivos e agora eles estarão disponíveis no aplicativo Apple HomeKit.

![Configurações do plugin Homebridge-SinricPro]({{ site.github.url }}/public/img/sinricpro-homebridge-plugin-homekit-app.png)


Demo:

{% include youtubePlayer.html id=page.youtubeId %}