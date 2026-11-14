---
title: Cómo controlar un relé (encender/apagar) con MicroPython en una Raspberry Pi Pico W con Thonny
layout: post
lang: es
description: Controla un relé con MicroPython en una Raspberry Pi Pico W usando Thonny y Sinric Pro, con Alexa, Google Home y SmartThings.
---

En esta guía te mostramos cómo instalar MicroPython en tu Raspberry Pi Pico W, crear un interruptor inteligente de Sinric Pro y controlarlo con plataformas domóticas populares como Alexa, Google Home y SmartThings.

### Requisitos previos : 

1. Placa de desarrollo Raspberry Pi Pico W x 1.
2. Controlador de relé SPDT x 1.
3. Cables jumper.

### Instala MicroPython en tu Raspberry Pi Pico W

1. Descarga el firmware de MicroPython más reciente para la Raspberry Pi Pico W desde: [https://rpf.io/pico-w-firmware](https://rpf.io/pico-w-firmware)

2. Conecta un extremo de un cable micro USB a tu Raspberry Pi Pico W.

3. Mantén pulsado el **botón BOOTSEL** de la Pico W.

4. Conecta el otro extremo del cable USB a tu ordenador (de escritorio, portátil o Raspberry Pi).

5. La Pico W **aparecerá como una unidad extraíble** (normalmente llamada `RPI-RP2`) en tu explorador de archivos.  
   **Arrastra y suelta** el archivo `.uf2` de MicroPython descargado en esta unidad.  

La Pico W se reiniciará y se desconectará automáticamente; esto es normal. Una vez completado, MicroPython estará instalado y listo para usarse.


### Comprueba la instalación:

1. Abre el **editor Thonny**.

2. En la esquina inferior derecha, haz clic en el texto y selecciona *MicroPython (Raspberry Pi Pico)* entre las opciones.

![sinricpro micropython thonny]({{ site.github.url }}/public/img/sinricpro-thonny-select-usb.png) 

En la shell, escribe 
```py
print("Hello, MicroPython!")
```

![sinricpro micropython thonny hello world]({{ site.github.url }}/public/img/sinricpro-thonny-sinricpro-hello-world.png) 


### Configura la librería SinricPro

1. Descarga el Wheel `.whl` más reciente desde [https://github.com/sinricpro/micropython-sinricpro-sdk/releases](https://github.com/sinricpro/micropython-sinricpro-sdk/releases)

1. En Thonny, selecciona Tools > Manage packages.

2. Haz clic en `Here` en la sección `Install from Local File` y continúa la instalación.

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-thonny-install-whl.png)

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-thonny-installing-whl.png)

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-thonny-installed-whl.png)


### Integración con Sinric Pro

### Paso 1 : Crea un nuevo dispositivo en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, abre el menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Switch**, la descripción **My First Switch** y selecciona el tipo de dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Haz clic en **Next** en la pestaña Notifications

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Para recibir notificaciones push cuando tu dispositivo se conecte o desconecte, activa la opción **"Connect and Disconnect"** en la app de Sinric Pro. Para recibir notificaciones push cuando tu dispositivo se encienda o se apague, activa la opción **"On and Off"**.


* Haz clic en Others y después en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Programación 
   
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

![Sinric Pro MicroPython Connected]({{ site.github.url }}/public/img/sinricpro-thonny-sinricpro-running.png)

Ahora el dispositivo está conectado al servidor de Sinric Pro y puedes controlarlo desde la app de Sinric Pro, la skill de Alexa, la action de Google Home o SmartThings

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Relé con MicroPython en ESP32]({{ site.github.url }}/es/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython.es.html)
- [Tutorial de switch, parte 1: encender y apagar un relé]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)
