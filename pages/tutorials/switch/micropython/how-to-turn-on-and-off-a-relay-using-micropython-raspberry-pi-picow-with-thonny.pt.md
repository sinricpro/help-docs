---
title: Como controlar um relé (ligar/desligar) usando MicroPython em um Raspberry Pi Pico W com o Thonny
layout: post
lang: pt
description: Controle um relé com MicroPython em um Raspberry Pi Pico W usando o Thonny e o Sinric Pro, com Alexa, Google Home e SmartThings.
---

Neste guia, vamos mostrar como configurar o MicroPython no seu Raspberry Pi Pico W, criar um interruptor inteligente no Sinric Pro e controlá-lo usando plataformas populares de casa inteligente, como Alexa, Google Home e SmartThings.

### Pré-requisitos : 

1. Placa de desenvolvimento Raspberry Pi Pico W x 1.
2. Módulo de relé SPDT x 1.
3. Cabos Jumper.

### Instalar o MicroPython no seu Raspberry Pi Pico W

1. Baixe o firmware MicroPython mais recente para o Raspberry Pi Pico W em: [https://rpf.io/pico-w-firmware](https://rpf.io/pico-w-firmware)

2. Conecte uma ponta de um cabo micro USB ao seu Raspberry Pi Pico W.

3. Pressione e segure o **botão BOOTSEL** do Pico W.

4. Conecte a outra ponta do cabo USB ao seu computador (desktop, notebook ou Raspberry Pi).

5. O Pico W vai **aparecer como uma unidade removível** (normalmente chamada `RPI-RP2`) no seu gerenciador de arquivos.  
   **Arraste e solte** o arquivo `.uf2` do MicroPython que você baixou nessa unidade.  

O Pico W vai reiniciar e se desconectar automaticamente, o que é normal. Ao terminar, o MicroPython estará instalado e pronto para uso.


### Testar a instalação:

1. Abra o **editor Thonny**.

2. No canto inferior direito, clique no texto e selecione *MicroPython (Raspberry Pi Pico)* entre as opções.

![sinricpro micropython thonny]({{ site.github.url }}/public/img/sinricpro-thonny-select-usb.png) 

No shell, digite 
```py
print("Hello, MicroPython!")
```

![sinricpro micropython thonny hello world]({{ site.github.url }}/public/img/sinricpro-thonny-sinricpro-hello-world.png) 


### Configurar a biblioteca SinricPro

1. Baixe o arquivo Wheel `.whl` mais recente em [https://github.com/sinricpro/micropython-sinricpro-sdk/releases](https://github.com/sinricpro/micropython-sinricpro-sdk/releases)

1. No Thonny, escolha Tools > Manage packages.

2. Clique em `Here` na seção `Install from Local File` e continue a instalação.

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-thonny-install-whl.png)

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-thonny-installing-whl.png)

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-thonny-installed-whl.png)


### Integração com o Sinric Pro

### Passo 1 : Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Devices** à esquerda e clique no botão **Add Device** (no canto superior esquerdo).
* Informe o nome do dispositivo **Switch**, a descrição **My First Switch** e selecione o tipo de dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Clique em **Next** na aba Notifications

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Para receber notificações push quando o seu dispositivo ficar online ou offline, ative a opção **"Connect and Disconnect"** no app Sinric Pro. Para receber notificações push quando o seu dispositivo for ligado ou desligado, ative a opção **"On and Off"**.


* Clique em Others e depois em **Save**

* A próxima tela mostra as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **Device Id**, a **App Key** e o **App Secret** ***Mantenha esses valores em segurança. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS !***

### Passo 2 : Código 
   
Cole o código a seguir em `main.py`

```py
from sinricpro import SinricPro
from sinricpro.devices.sinricpro_switch import SinricProSwitch
from machine import Pin

import uasyncio as a
import network

# enter wifi details
ssid = ""
ssid_password = ""

# enter appkey, appsecret and device id from above
app_key    = ""
app_secret = ""
device_id  = ""

# relay is connected to GPIO 16
relay = Pin(16, Pin.OUT)

async def on_disconnected():
    print('Disconnected from SinricPro...reboot?')

async def on_connected():
    print('Connected to SinricPro...')

async def on_power_state_callback(device_id: str, state: bool):
    print(f'device id: {device_id} state: {state}')

    if state:
        relay.value(1)
    else:
        relay.value(0)

    return True

# connect to wifi
def do_connect():
    sta_if = network.WLAN(network.STA_IF)
    ap = network.WLAN(network.AP_IF) # create access-point interface
    ap.active(False)         # deactivate the interface
    if not sta_if.isconnected():
        print('Connecting to network...')
        sta_if.active(True)
        sta_if.connect(ssid, ssid_password)
        while not sta_if.isconnected():
            pass
    print('Connected network config:', sta_if.ifconfig())

# start sinricpro
def do_sinricpro():
    sinricpro = SinricPro()
    sinricpro.on_connected(on_connected)
    sinricpro.on_disconnected(on_disconnected)

    sinricpro_switch = SinricProSwitch(device_id)
    sinricpro_switch.on_power_state(on_power_state_callback)

    sinricpro.add_device(sinricpro_switch)
    sinricpro.start(app_key, app_secret)

# main coroutine
async def main():
    do_connect()
    do_sinricpro()

    while True:
        await a.sleep_ms(10_000)

# start asyncio task and loop
try:
    # start the main async tasks
    a.run(main())
finally:
    # reset and start a new event loop for the task scheduler
    a.new_event_loop()
```

Pronto. 

![Sinric Pro MicroPython Connected]({{ site.github.url }}/public/img/sinricpro-thonny-sinricpro-running.png)

Agora o dispositivo está conectado ao servidor Sinric Pro e você pode controlá-lo pelo app Sinric Pro, pela skill da Alexa, pela action do Google Home ou pelo SmartThings

### Tutoriais relacionados

- [Como controlar um ESP32 ou ESP8266 com Alexa e Google Home]({{ site.github.url }}/pt/pages/tutorials/general/esp32-esp8266-alexa-google-home.pt.html)
- [Relé com MicroPython no ESP32]({{ site.github.url }}/pt/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython.pt.html)
- [Tutorial do Switch, parte 1: ligar e desligar um relé]({{ site.github.url }}/pt/pages/tutorials/switch/part-1.pt.html)

> Este documento é open source. Encontrou um erro de digitação? Crie uma [issue](https://github.com/sinricpro/help-docs)
