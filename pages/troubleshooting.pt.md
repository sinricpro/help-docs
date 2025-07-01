---
title: Solução de Problemas
weight: 4
lang: pt
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
---

### Dicas de solução de problemas 

* Sempre comece tentando nossos sketches de exemplo, alterando apenas as credenciais. Eles foram totalmente testados e funcionam corretamente.

* Há um problema conhecido no ESP32 e ESP8266 onde o WiFi fica instável quando ADC é usado.

* Habilite o logging e verifique erros e desconexões. Para habilitar logs do Sinric Pro SDK, adicione ``#define ENABLE_DEBUG`` no topo do sketch.

    * Para habilitar logs do ESP8266, no Arduino IDE:

        1. `Tools -> Debug Serial Port -> Serial`

        2. `Tools -> Debug Level -> SSL + HTTP_CLIENT`

    * Para habilitar logs do ESP32, no Arduino IDE:

        1. `Tools -> Core Debug Level -> Verbose`


* Tente criar um hotspot do seu telefone móvel e conecte seu ESP ao SinricPro via hotspot. Se conseguir conectar ao SinricPro via hotspot, então o problema está com sua rede WiFi. 

* Tente mudar para uma rede WiFi diferente, se possível.

* Às vezes, devido a limitações de memória, o chip ESP pode falhar ao tentar estabelecer a conexão SSL com o servidor SinricPro. Neste caso, você pode tentar desabilitar o recurso SSL adicionando a seguinte linha no **topo do sketch**:

    ```#define SINRICPRO_NOSSL```

* Se você tiver algum delay(x); longo na função loop(), você pode precisar removê-los.
 
* Se nenhuma das opções acima funcionar para você, verifique [issues existentes](https://github.com/sinricpro/esp8266-esp32-sdk/issues) no repositório GitHub ou abra uma [nova](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)