---
title: Como ligar e desligar um relé usando MicroPython e ESP32
layout: post
lang: pt
---

Neste guia, vamos orientá-lo através dos passos para configurar MicroPython no seu ESP32, criar um Interruptor Sinric Pro e finalmente controlá-lo com plataformas de casa inteligente como Alexa, Google Home e SmartThings

### Pré-requisitos:

1. Placa de desenvolvimento ESP32 x 1.
2. Controlador de relé SPDT x 1.
3. Cabos Jumper.

### Configurar MicroPython no ESP32

1. Instalar usando pip: `pip install esptool` (Você precisará do Python 3.7 ou mais recente)

2. Firmware MicroPython: Baixe a versão mais recente de [https://micropython.org/download/esp32/](https://micropython.org/download/esp32/). Escolha o arquivo apropriado baseado nas características da sua placa (ex: PSRAM, tamanho da flash).

3. Conecte o ESP32 ao seu computador via USB.

4. Apague a memória flash do ESP32: `esptool --chip esp32 --port <PORTA> erase_flash`

5. Grave o MicroPython no ESP32:

`esptool --chip esp32 --port <COM-PORT> --baud 460800 write_flash -z 0x1000 ESP32_GENERIC-20231005-v1.21.0.bin`


### Testar a Instalação:

1. Use um programa de terminal serial (ex: PuTTY, CoolTerm, Thonny).

![sinricpro micropython putty]({{ site.github.url }}/public/img/sinricpro-micropython-putty-config.png) 


2. Configure com: Taxa de baud: **115200** Porta: **A que está conectada ao seu ESP32**.

3. Abra o terminal serial para acessar o REPL do MicroPython, onde você pode inserir comandos Python.


No REPL, digite 
```py
print("Olá, MicroPython!")
```

![sinricpro micropython putty hello world]({{ site.github.url }}/public/img/sinricpro-micropython-putty-hello-world.png) 


e pressione Enter. Se bem-sucedido, você verá a mensagem impressa.

Consulte a documentação do MicroPython para detalhes: [https://docs.micropython.org/en/latest/esp32/quickref.html](https://docs.micropython.org/en/latest/esp32/quickref.html)

### Configurar IDE

Vamos usar o **VS Code** com a extensão **Pymakr** para programar nosso ESP32 com MicroPython. Então vamos configurar a extensão **Pymakr**

1. Abra o VS Code.

2. Vá para a aba Extensions (Ctrl+Shift+X ou Cmd+Shift+X).

3. Pesquise por "Pymakr" e clique no botão "Install" ao lado.

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-micropython-install-pymakr.png)

Recarregue o VS Code quando solicitado. 

Clique no ícone "Pymakr" na barra lateral esquerda do VS Code.

### Fiação

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

Antes de integrarmos com Sinric Pro, é importante verificar se o relé está corretamente conectado e funcionando. 

Vamos criar um novo Projeto Pymark. Pressione (Ctrl+Shift+P) e selecione `PyMark: Create new project`

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-new-project.png) 

Cole este código em `main.py`

```py
from machine import Pin
from time import sleep

relay = Pin(16, Pin.OUT)

while True:
  relay.value(1)
  sleep(5)
  
  relay.value(0)
  sleep(5)
```

Selecione a extensão `PyMark` -> Conecte ao seu ESP32 -> Clique no ícone Upload.

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-upload-mainpy.png) 

Uma vez que o upload seja concluído, você deve realizar um **Hard reset device**. Então o ESP32 irá reiniciar e executar o código em `main.py`

![Sinric Pro pymark hard reset device]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-hard-reset.png) 

Agora seu relé deve ligar e desligar a cada 5 segundos. Se o relé estiver funcionando corretamente, é hora de integrar com Sinric Pro.

### Integração Sinric Pro

### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Interruptor**, descrição **Meu Primeiro Interruptor** e selecione o tipo de dispositivo como **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Para receber notificações push quando seu dispositivo ficar online ou offline, habilite a opção **"Conectar e Desconectar"** no aplicativo Sinric Pro. Para receber notificações push quando seu dispositivo ligar ou desligar, habilite a opção **"Ligar e Desligar"**.


* Clique em Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Programação

#### 2.1 Instalar a Biblioteca MicroPython Sinric Pro

Usando mpremote:

```shell
mpremote mip install github:sinricpro/micropython-sinricpro-sdk
```

Ou usando mip no prompt REPL do MicroPython:

```shell
import mip
mip.install("github:sinricpro/micropython-sinricpro-sdk")
```

![Sinric Pro MicroPython SDK installtion]({{ site.github.url }}/public/img/sinricpro-micropython-install.png)

#### 2.2 Código Completo

Cole o seguinte código em `main.py`

```py
from sinricpro import SinricPro
from sinricpro.devices.sinricpro_switch import SinricProSwitch
from machine import Pin

import uasyncio as a
import network

# insira os detalhes do wifi
ssid = ""
ssid_password = ""

# insira appkey, appsecret e device id de cima
app_key    = ""
app_secret = ""
device_id  = ""

# relé está conectado ao GPIO 16
relay = Pin(16, Pin.OUT)

async def on_disconnected():
    print('Desconectado do SinricPro...reiniciar?')

async def on_connected():
    print('Conectado ao SinricPro...')

async def on_power_state_callback(device_id: str, state: bool):
    print(f'device id: {device_id} state: {state}')

    if state:
        relay.value(1)
    else:
        relay.value(0)

    return True

# conectar ao wifi
def do_connect():
    sta_if = network.WLAN(network.STA_IF)
    ap = network.WLAN(network.AP_IF) # criar interface access-point
    ap.active(False)         # desativar a interface
    if not sta_if.isconnected():
        print('Conectando à rede...')
        sta_if.active(True)
        sta_if.connect(ssid, ssid_password)
        while not sta_if.isconnected():
            pass
    print('Configuração de rede conectada:', sta_if.ifconfig())

# iniciar sinricpro
def do_sinricpro():
    sinricpro = SinricPro()
    sinricpro.on_connected(on_connected)
    sinricpro.on_disconnected(on_disconnected)

    sinricpro_switch = SinricProSwitch(device_id)
    sinricpro_switch.on_power_state(on_power_state_callback)

    sinricpro.add_device(sinricpro_switch)
    sinricpro.start(app_key, app_secret)

# corrotina principal
async def main():
    do_connect()
    do_sinricpro()

    while True:
        await a.sleep_ms(10_000)

# iniciar tarefa asyncio e loop
try:
    # iniciar as tarefas async principais
    a.run(main())
finally:
    # resetar e iniciar um novo loop de eventos para o agendador de tarefas
    a.new_event_loop()
```

É isso. 

![Sinric Pro MicroPython Connected]({{ site.github.url }}/public/img/sinricpro-micropython-connected.png)



Agora o dispositivo está conectado ao servidor Sinric Pro e você pode controlá-lo via App Sinric Pro, Skill Alexa, Action Google Home ou SmartThings

> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)