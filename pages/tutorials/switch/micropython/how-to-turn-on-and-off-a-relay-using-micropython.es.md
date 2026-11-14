---
title: Cómo controlar un relé (encender/apagar) con MicroPython en un ESP32 con Pymakr
layout: post
lang: es
description: Controla un relé con MicroPython en un ESP32 usando la extensión Pymakr para VS Code y Sinric Pro, con Alexa, Google Home y SmartThings.
---

En esta guía te mostraremos los pasos para configurar MicroPython en tu ESP32, crear un Switch de Sinric Pro y, finalmente, controlarlo con plataformas de smart home como Alexa, Google Home y SmartThings

### Requisitos previos : 

1. Placa de desarrollo ESP32 x 1.
2. Controlador de relé SPDT x 1.
3. Cables puente.

### Configura MicroPython en el ESP32

1. Instala con pip: `pip install esptool` (necesitarás Python 3.7 o posterior)

2. Firmware de MicroPython: descarga la última versión desde [https://micropython.org/download/esp32/](https://micropython.org/download/esp32/). Elige el archivo adecuado según las características de tu placa (por ejemplo, PSRAM, tamaño de la flash).

3. Conecta el ESP32 a tu ordenador por USB.

4. Borra la memoria flash del ESP32: `esptool --chip esp32 --port <PORT> erase_flash`

5. Escribe MicroPython en el ESP32:

`esptool --chip esp32 --port <COM-PORT> --baud 460800 write_flash -z 0x1000 ESP32_GENERIC-20231005-v1.21.0.bin`


### Comprueba la instalación:

1. Usa un programa de terminal serie (por ejemplo, PuTTY, CoolTerm, Thonny).

![sinricpro micropython putty]({{ site.github.url }}/public/img/sinricpro-micropython-putty-config.png) 


2. Configúralo con: Velocidad en baudios: **115200** Puerto: **el conectado a tu ESP32**.

3. Abre la terminal serie para acceder al REPL de MicroPython, donde puedes introducir comandos de Python.


En el REPL, escribe 
```py
print("Hello, MicroPython!")
```

![sinricpro micropython putty hello world]({{ site.github.url }}/public/img/sinricpro-micropython-putty-hello-world.png) 


y pulsa Intro. Si funciona, verás el mensaje impreso.

Consulta la documentación de MicroPython para más detalles: [https://docs.micropython.org/en/latest/esp32/quickref.html](https://docs.micropython.org/en/latest/esp32/quickref.html)

### Configura el IDE

Vamos a usar **VS Code** con la extensión **Pymakr** para programar nuestro ESP32 con MicroPython. Así que configuremos la extensión **Pymakr**

1. Abre VS Code.

2. Ve a la pestaña Extensiones (Ctrl+Shift+X o Cmd+Shift+X).

3. Busca "Pymakr" y haz clic en el botón "Install" que aparece junto a ella.

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-micropython-install-pymakr.png)

Vuelve a cargar VS Code cuando se te solicite. 

Haz clic en el icono "Pymakr" en la barra lateral izquierda de VS Code.

### Cableado

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

Antes de integrarlo con Sinric Pro, es importante comprobar que el relé está bien cableado y que funciona. 

Vamos a crear un nuevo proyecto de Pymakr. Pulsa (Ctrl+Shift+P) y selecciona `Pymakr: Create new project`

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-new-project.png) 

Pega este código en `main.py`

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

Selecciona la extensión `Pymakr` -> Conecta con tu ESP32 -> Haz clic en el icono de subir.

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-upload-mainpy.png) 

Cuando termine la subida, debes hacer un **reinicio completo del dispositivo**. Entonces el ESP32 se reiniciará y ejecutará el código de `main.py`

![Sinric Pro pymark hard reset device]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-hard-reset.png) 

Ahora tu relé debería encenderse y apagarse cada 5 segundos. Si el relé funciona correctamente, es momento de integrarlo con Sinric Pro.

### Integración con Sinric Pro

### Paso 1 : Crea un nuevo dispositivo en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, ve al menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Switch**, la descripción **My First Switch** y selecciona el tipo de dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Haz clic en **Next** en la pestaña Notifications

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Para recibir notificaciones push cuando tu dispositivo se conecte o desconecte, activa la opción **"Connect and Disconnect"** en la app de Sinric Pro. Para recibir notificaciones push cuando tu dispositivo se encienda o apague, activa la opción **"On and Off"**.


* Haz clic en Others y luego en **Save**

* La siguiente pantalla mostrará las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Programación 

#### 2.1 Instala la librería MicroPython de Sinric Pro

Usando mpremote:

```shell
mpremote mip install github:sinricpro/micropython-sinricpro-sdk
```

O usando mip en el prompt del REPL de MicroPython:

```shell
import mip
mip.install("github:sinricpro/micropython-sinricpro-sdk")`
```

![Sinric Pro MicroPython SDK installtion]({{ site.github.url }}/public/img/sinricpro-micropython-install.png)

#### 2.2 Código completo

Pega el siguiente código en `main.py`

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

Eso es todo. 

![Sinric Pro MicroPython Connected]({{ site.github.url }}/public/img/sinricpro-micropython-connected.png)



Ahora el dispositivo está conectado al servidor de Sinric Pro y puedes controlarlo a través de la app de Sinric Pro, la skill de Alexa, la action de Google Home o SmartThings

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Relé con MicroPython en Raspberry Pi Pico W (Thonny)]({{ site.github.url }}/es/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython-raspberry-pi-picow-with-thonny.es.html)
- [Tutorial de Switch, parte 1: enciende y apaga un relé]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)