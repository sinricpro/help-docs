---
title: Como instalar a biblioteca Sinric Pro (SinricPro.h) no Arduino IDE e no PlatformIO
layout: post
lang: pt
description: 'Instale a biblioteca (SDK) Sinric Pro para ESP32, ESP8266 e Raspberry Pi Pico W no Arduino IDE ou no PlatformIO e corrija o erro "SinricPro.h: No such file or directory".'
---

A biblioteca Sinric Pro (também chamada de SDK do Sinric Pro) conecta o seu **ESP32**, **ESP8266** ou **Raspberry Pi Pico W (RP2040)** ao Sinric Pro. Esta página mostra como instalá-la e como corrigir os erros de instalação mais comuns.

A biblioteca é open source: [github.com/sinricpro/esp8266-esp32-sdk](https://github.com/sinricpro/esp8266-esp32-sdk)

### Instalar no Arduino IDE

1. Abra o Gerenciador de Bibliotecas: **Tools > Manage Libraries**.
2. Procure por **SinricPro** e clique em **Install**.
3. Quando o Arduino IDE perguntar se deve instalar as dependências, escolha **Install All**. Se ele não perguntar, instale-as da mesma forma:
   - **ArduinoJson** de Benoit Blanchon (versão 7.0.3 ou mais recente)
   - **WebSockets** de Markus Sattler (versão 2.4.0 ou mais recente)
4. Abra um exemplo: **File > Examples > SinricPro**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

A biblioteca também precisa que o pacote da placa (Arduino core) esteja instalado para a sua placa: **esp32**, **esp8266** ou **Raspberry Pi Pico/RP2040**.

### Instalar no PlatformIO (VS Code)

Adicione `sinricpro/SinricPro` a `lib_deps` no seu `platformio.ini`. O PlatformIO baixa a biblioteca e as dependências dela na próxima compilação.

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
lib_deps = sinricpro/SinricPro

[env:nodemcuv2]
platform = espressif8266
board = nodemcuv2
framework = arduino
lib_deps = sinricpro/SinricPro
```

Um `platformio.ini` completo está disponível [aqui](https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/platformio/platformio.ini).

### Baixar e instalar manualmente

1. Baixe a versão mais recente como arquivo ZIP em [GitHub releases](https://github.com/sinricpro/esp8266-esp32-sdk/releases).
2. No Arduino IDE, escolha **Sketch > Include Library > Add .ZIP Library** e selecione o arquivo.
3. Instale ArduinoJson e WebSockets pelo Gerenciador de Bibliotecas.

### Usar a biblioteca no seu sketch

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>
```

`SinricPro.h` é o cabeçalho principal. Cada tipo de dispositivo tem o seu próprio cabeçalho, por exemplo `SinricProSwitch.h`, `SinricProLight.h` ou `SinricProTemperaturesensor.h`. Veja os [exemplos](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples) de cada tipo de dispositivo e a [documentação completa do SDK](https://sinricpro.github.io/esp8266-esp32-sdk-documentation/).

Para um primeiro sketch completo, veja [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html).

### Solução de problemas

**fatal error: SinricPro.h: No such file or directory**

A biblioteca não está instalada na IDE com a qual você está compilando. Instale **SinricPro** pelo Gerenciador de Bibliotecas (Arduino IDE) ou adicione `sinricpro/SinricPro` a `lib_deps` (PlatformIO).

**fatal error: ArduinoJson.h: No such file or directory** ou **WebSocketsClient.h: No such file or directory**

Está faltando uma dependência. Instale **ArduinoJson** (7.0.3 ou mais recente) e **WebSockets** de Markus Sattler (2.4.0 ou mais recente).

**Erros de compilação depois de atualizar**

Atualize ArduinoJson, WebSockets e o pacote da placa (Arduino core) para as versões mais recentes. A biblioteca requer o Arduino core 3.x.

Para problemas de conexão depois que o sketch foi enviado para a placa, veja a página de [Solução de problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html).

### Outros SDKs

A biblioteca Arduino acima é compatível com ESP32, ESP8266 e RP2040. Para outras placas e linguagens:

- [Raspberry Pi Pico SDK](https://github.com/sinricpro/pico-sdk/)
- [ESP-IDF SDK](https://github.com/sinricpro/esp-idf)
- [Arduino UNO R4 WiFi, Nano 33 IoT, MKR WIFI 1010, Seeedstudio Wio Terminal](https://github.com/sinricpro/arduino-variants-sdk)
- [MicroPython SDK](https://github.com/sinricpro/micropython-sinricpro-sdk)
- [Python SDK](https://github.com/sinricpro/python-sdk)
- [NodeJS SDK](https://github.com/sinricpro/nodejs-sdk)

> Este documento é open source. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
