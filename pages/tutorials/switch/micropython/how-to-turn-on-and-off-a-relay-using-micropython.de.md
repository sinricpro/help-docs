---
title: So steuerst du ein Relais (Ein/Aus) mit MicroPython auf einem ESP32 mit Pymakr
layout: post
lang: de
description: Steuere ein Relais mit MicroPython auf einem ESP32 über die Pymakr-Erweiterung für VS Code und Sinric Pro, mit Alexa, Google Home und SmartThings.
---

In dieser Anleitung zeigen wir dir Schritt für Schritt, wie du MicroPython auf deinem ESP32 einrichtest, einen Sinric Pro Switch erstellst und ihn schließlich über Smart-Home-Plattformen wie Alexa, Google Home und SmartThings steuerst

### Voraussetzungen : 

1. ESP32 Entwicklungsboard x 1.
2. SPDT Relaismodul x 1.
3. Jumperkabel.

### MicroPython auf dem ESP32 einrichten

1. Installiere mit pip: `pip install esptool` (Du benötigst Python 3.7 oder neuer)

2. MicroPython Firmware: Lade die neueste Version von [https://micropython.org/download/esp32/](https://micropython.org/download/esp32/) herunter. Wähle die passende Datei entsprechend den Eigenschaften deines Boards aus (z. B. PSRAM, Flashgröße).

3. Verbinde den ESP32 über USB mit deinem Computer.

4. Lösche den Flash-Speicher des ESP32: `esptool --chip esp32 --port <PORT> erase_flash`

5. Schreibe MicroPython auf den ESP32:

`esptool --chip esp32 --port <COM-PORT> --baud 460800 write_flash -z 0x1000 ESP32_GENERIC-20231005-v1.21.0.bin`


### Installation testen:

1. Nutze ein Terminalprogramm (z. B. PuTTY, CoolTerm, Thonny).

![sinricpro micropython putty]({{ site.github.url }}/public/img/sinricpro-micropython-putty-config.png) 


2. Konfiguriere mit: Baudrate: **115200** Port: **der mit deinem ESP32 verbundene**.

3. Öffne das Terminal, um auf die MicroPython REPL zuzugreifen, in der du Python-Befehle eingeben kannst.


Gib in der REPL 
```py
print("Hello, MicroPython!")
```

![sinricpro micropython putty hello world]({{ site.github.url }}/public/img/sinricpro-micropython-putty-hello-world.png) 


ein und drücke Enter. Bei Erfolg wird die Nachricht ausgegeben.

Details findest du in der MicroPython-Dokumentation: [https://docs.micropython.org/en/latest/esp32/quickref.html](https://docs.micropython.org/en/latest/esp32/quickref.html)

### IDE einrichten

Wir nutzen **VS Code** mit der **Pymakr**-Erweiterung, um unseren ESP32 mit MicroPython zu programmieren. Also richten wir die **Pymakr**-Erweiterung ein

1. Öffne VS Code.

2. Gehe zum Extensions-Tab (Strg+Umschalt+X oder Cmd+Umschalt+X).

3. Suche nach „Pymakr“ und klicke auf die Schaltfläche „Install“ daneben.

![Sinric Pro Pymakr]({{ site.github.url }}/public/img/sinricpro-micropython-install-pymakr.png)

Lade VS Code neu, wenn du dazu aufgefordert wirst. 

Klicke auf das „Pymakr“-Symbol in der linken Seitenleiste von VS Code.

### Verdrahtung

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

Bevor wir die Verbindung zu Sinric Pro herstellen, solltest du prüfen, ob das Relais korrekt verdrahtet ist und funktioniert. 

Lass uns ein neues Pymakr-Projekt erstellen. Drücke (Strg+Umschalt+P) und wähle `Pymakr: Create new project`

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-new-project.png) 

Füge diesen Code in `main.py` ein

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

Wähle die `Pymakr`-Erweiterung -> Verbinde dich mit deinem ESP32 -> Klicke auf das Upload-Symbol.

![Sinric Pro pymark new project]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-upload-mainpy.png) 

Nach Abschluss des Uploads musst du einen **Hard Reset** des Geräts durchführen. Danach startet der ESP32 neu und führt den Code in `main.py` aus

![Sinric Pro pymark hard reset device]({{ site.github.url }}/public/img/sinricpro-micropython-pymakr-hard-reset.png) 

Jetzt sollte sich dein Relais alle 5 Sekunden ein- und ausschalten. Wenn das Relais korrekt funktioniert, ist es Zeit, es mit Sinric Pro zu verbinden.

### Sinric Pro Integration

### Schritt 1 : Neues Gerät in Sinric Pro anlegen

* [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an, öffne links das Menü **Devices** und klicke auf **Add Device** (oben links).
* Gib als Gerätenamen **Switch**, als Beschreibung **My First Switch** ein und wähle als Gerätetyp **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Klicke im Reiter Notifications auf **Next**

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Um Push-Benachrichtigungen zu erhalten, wenn dein Gerät online oder offline geht, aktiviere die Option **„Connect and Disconnect“** in der Sinric Pro App. Um Push-Benachrichtigungen zu erhalten, wenn dein Gerät ein- oder ausgeschaltet wird, aktiviere die Option **„On and Off“**.


* Klicke auf Others und klicke auf **Save**

* Die nächste Seite zeigt die Zugangsdaten, die dein Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Programmierung 

#### 2.1 Sinric Pro MicroPython Bibliothek installieren

Mit mpremote:

```shell
mpremote mip install github:sinricpro/micropython-sinricpro-sdk
```

Oder mit mip im MicroPython REPL-Prompt:

```shell
import mip
mip.install("github:sinricpro/micropython-sinricpro-sdk")`
```

![Sinric Pro MicroPython SDK installtion]({{ site.github.url }}/public/img/sinricpro-micropython-install.png)

#### 2.2 Vollständiger Code

Füge den folgenden Code in `main.py` ein

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

Das war's. 

![Sinric Pro MicroPython Connected]({{ site.github.url }}/public/img/sinricpro-micropython-connected.png)



Jetzt ist das Gerät mit dem Sinric Pro Server verbunden, und du kannst es über die Sinric Pro App, den Alexa Skill, die Google Home Action oder SmartThings steuern

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Relais mit MicroPython auf Raspberry Pi Pico W (Thonny)]({{ site.github.url }}/de/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython-raspberry-pi-picow-with-thonny.de.html)
- [Switch Tutorial Teil 1: ein Relais ein- und ausschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)