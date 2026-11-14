---
title: Come controllare un relè (accensione/spegnimento) con MicroPython su ESP32 usando Pymakr
layout: post
lang: it
description: Controlla un relè con MicroPython su ESP32 usando l'estensione Pymakr per VS Code e Sinric Pro, con Alexa, Google Home e SmartThings.
---

In questa guida ti accompagniamo passo dopo passo nella configurazione di MicroPython sul tuo ESP32, nella creazione di uno Switch Sinric Pro e infine nel suo controllo con piattaforme smart home come Alexa, Google Home e SmartThings

### Prerequisiti : 

1. Scheda di sviluppo ESP32 x 1.
2. Modulo relè SPDT x 1.
3. Cavetti jumper.

### Configurare MicroPython su ESP32

1. Installa con pip: `pip install esptool` (serve Python 3.7 o successivo)

2. Firmware MicroPython: scarica l'ultima versione da [https://micropython.org/download/esp32/](https://micropython.org/download/esp32/). Scegli il file adatto alle caratteristiche della tua scheda (ad es. PSRAM, dimensione della flash).

3. Collega l'ESP32 al computer tramite USB.

4. Cancella la memoria flash dell'ESP32: `esptool --chip esp32 --port <PORT> erase_flash`

5. Scrivi MicroPython sull'ESP32:

`esptool --chip esp32 --port <COM-PORT> --baud 460800 write_flash -z 0x1000 ESP32_GENERIC-20231005-v1.21.0.bin`


### Verifica l'installazione:

1. Usa un programma di terminale seriale (ad es. PuTTY, CoolTerm, Thonny).

![sinricpro micropython putty]({{ site.github.url }}/public/img/sinricpro-micropython-putty-config.png) 


2. Configuralo con: Baud rate: **115200** Porta: **quella collegata al tuo ESP32**.

3. Apri il terminale seriale per accedere alla REPL di MicroPython, dove puoi inserire comandi Python.


Nella REPL, digita 
```py
print("Hello, MicroPython!")
```

![sinricpro micropython putty hello world]({{ site.github.url }}/public/img/sinricpro-micropython-putty-hello-world.png) 


 e premi Invio. Se tutto è andato a buon fine, vedrai il messaggio stampato.

Per i dettagli consulta la documentazione di MicroPython: [https://docs.micropython.org/en/latest/esp32/quickref.html](https://docs.micropython.org/en/latest/esp32/quickref.html)

### Configurare l'IDE

Per programmare il nostro ESP32 con MicroPython useremo **VS Code** con l'estensione **Pymakr**. Configuriamo quindi l'estensione **Pymakr**

1. Apri VS Code.

2. Vai alla scheda Estensioni (Ctrl+Shift+X o Cmd+Shift+X).

3. Cerca "Pymakr" e fai clic sul pulsante "Install" accanto.

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-micropython-install-pymakr.png)

Ricarica VS Code quando ti viene richiesto. 

Fai clic sull'icona "Pymakr" nella barra laterale sinistra di VS Code.

### Cablaggio

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

Prima di passare all'integrazione con Sinric Pro, è importante verificare che il relè sia collegato correttamente e che funzioni. 

Creiamo un nuovo progetto Pymakr. Premi (Ctrl+Shift+P) e seleziona `Pymakr: Create new project`

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-new-project.png) 

Incolla questo codice in `main.py`

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

Seleziona l'estensione `Pymakr` -> Connettiti al tuo ESP32 -> Fai clic sull'icona di caricamento (Upload).

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-upload-mainpy.png) 

Al termine del caricamento devi eseguire un **Hard reset device**. L'ESP32 si riavvierà ed eseguirà il codice in `main.py`

![Sinric Pro pymark hard reset device]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-hard-reset.png) 

Ora il relè dovrebbe accendersi e spegnersi ogni 5 secondi. Se il relè funziona correttamente, è il momento di passare all'integrazione con Sinric Pro.

### Integrazione con Sinric Pro

### Passo 1 : Crea un nuovo dispositivo in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Switch**, la descrizione **My First Switch** e seleziona il tipo di dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Fai clic su **Next** per passare alla scheda Notifications

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Per ricevere notifiche push quando il dispositivo va online o offline, attiva l'opzione **"Connect and Disconnect"** nell'app Sinric Pro. Per ricevere notifiche push quando il dispositivo si accende o si spegne, attiva l'opzione **"On and Off"**.


* Fai clic su Others e poi su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

### Passo 2 : Scrittura del codice 

#### 2.1 Installa la libreria Sinric Pro per MicroPython

Con mpremote:

```shell
mpremote mip install github:sinricpro/micropython-sinricpro-sdk
```

Oppure con mip dal prompt della REPL di MicroPython:

```shell
import mip
mip.install("github:sinricpro/micropython-sinricpro-sdk")`
```

![Sinric Pro MicroPython SDK installtion]({{ site.github.url }}/public/img/sinricpro-micropython-install.png)

#### 2.2 Codice completo

Incolla il codice seguente in `main.py`

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

Tutto qui. 

![Sinric Pro MicroPython Connected]({{ site.github.url }}/public/img/sinricpro-micropython-connected.png)



Ora il dispositivo è connesso al server Sinric Pro e puoi controllarlo tramite l'app Sinric Pro, la skill Alexa, la action Google Home o SmartThings

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Relè con MicroPython su Raspberry Pi Pico W (Thonny)]({{ site.github.url }}/it/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython-raspberry-pi-picow-with-thonny.it.html)
- [Tutorial Switch parte 1: accendere e spegnere un relè]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
