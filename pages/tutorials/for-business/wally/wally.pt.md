---
title: Tutorial do Wally
layout: post
lang: pt
---

Nesta seção vamos criar um produto que gostaríamos de vender no futuro chamado **Wally**. É um Módulo Interruptor Inteligente Wi-Fi Wireless Mini de 2 Gang 1/2 Way.

Note que **apenas Espressif ESP32, ESP32C3, ESP32S3 são suportados**

![Sinric Pro sinricpro wally]({{ site.github.url }}/public/img/sinricpro-wally.png)

#### Configurar Perfil do Produto

1. Faça login na sua [Conta Business](https://biz-portal.sinric.pro/)

2. Vá ao menu *Products* e clique em *Add Product*.

![Sinric Pro sinricpro business acccount add product wally]({{ site.github.url }}/public/img/sinricpro-biz-acccount-add-product.png)

E digite detalhes sobre seu produto.

![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-details.png)

Então vá para a aba *Features*.

![Sinric Pro sinricpro business acccount enter product features]({{ site.github.url }}/public/img/sinricpro-biz-acccount-enter-product-features.png)

**Device Type**: Tipo de dispositivo Sinric Pro. Pode ser um Switch, Fan etc. Mesmo que o portal Sinric Pro.

**Identifier**: Usamos identificador para se referir a este dispositivo no sketch Arduino.

**Default Device Name**: Você pode definir um nome padrão de dispositivo para o dispositivo. Este é o nome padrão mostrado durante a configuração do dispositivo.

**Default Device Description**: Você pode definir uma descrição padrão de dispositivo para o dispositivo. Este é o nome padrão mostrado durante a configuração do dispositivo.

**Display Index**: Ordem que será mostrada durante a configuração do dispositivo.


![Sinric Pro sinricpro business acccount enter product details]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-default-values-example.png)

Clique em *Save* e clique em **Download** para baixar o código de provisionamento do produto.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-download.png)

O exemplo baixado vem pré-carregado com recursos essenciais incluindo configuração fácil, suporte multi-WiFi, atualizações OTA e verificações de saúde, permitindo que você se concentre em dar vida às suas ideias IoT únicas sem precisar implementar essas funcionalidades fundamentais do zero.

Procure por **sinricprobusinesssdk** no Arduino Library Manager para instalar o SinricPro Business SDK.

![Sinric Pro Business SDK arduino IDE]({{ site.github.url }}/public/img/sinricpro-business-sdk.png)


Isso também instalará *ArduinoJson (>=7.0.3), WebSockets (>=2.6.1), NimBLE-Arduino (>=1.4.2), SinricPro (>=3.2.1)* também. Personalize os mapeamentos GPIO para se adequar à sua configuração específica de dispositivo, compile e carregue o firmware no seu hardware.

Em seguida, mude as configurações do Arduino IDE Tools -> Partition Scheme -> Minimal SPIFF (1.9MB APP ...).

![Sinric Pro sinricpro wally arduino IDE tools settings]({{ site.github.url }}/public/img/arduino-ide-settings.png)

Agora estamos prontos para carregar o código.

![Sinric Pro sinricpro business acccount code download]({{ site.github.url }}/public/img/sinricpro-biz-acccount-setup-code-arduino-ide.png)

Você pode encontrar o código de exemplo completo aqui:

[https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally](https://github.com/sinricpro/esp32-business-sdk/tree/master/examples/Wally)

#### Agora você pode configurar o produto via aplicativo Sinric Pro

1. Baixe o aplicativo Sinric Pro do Google Play ou AppStore.

2. Crie uma conta e faça login.

3. Clique em *Add* e complete o processo de configuração.

Aqui está a demonstração de provisionamento do produto:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/prov.mp4" type="video/mp4">
</video>