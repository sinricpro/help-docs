---
title: Controllare un relè con ESP32 o ESP8266 tramite Alexa e Google Home (Tutorial Switch, parte 1)
layout: post
lang: it
description: Controlla un relè con ESP32, ESP8266 o Raspberry Pi tramite Alexa, Google Home o SmartThings. Cablaggio, codice e collegamento dell'account.
---

In questa sezione vediamo come creare uno **Switch** Sinric Pro per **ESP32**, **ESP8266** o **Raspberry Pi Zero W** e come controllarlo poi tramite **Alexa, Google Home o SmartThings**.

### Prerequisiti : 

1. ESP32, ESP8266 o RaspPi W x 1.
2. Modulo relè SPDT x 1.
3. Cavetti jumper.

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png) 
### Breve introduzione al relè

Un relè è un interruttore azionato elettricamente che può essere acceso o spento con un segnale a bassa tensione. Come un normale interruttore lascia passare o interrompe la corrente, ma può essere comandato con una tensione molto più bassa. Per questo i relè sono ideali per i microcontrollori (MCU), quando occorre comandare un circuito ad alta tensione con un segnale a bassa tensione.

#### Come funziona

Il funzionamento di un relè può variare a seconda del produttore, del cablaggio e del tipo di modulo relè utilizzato. Alcuni moduli relè richiedono un segnale di livello alto dall'MCU per attivare il relè, altri un segnale di livello basso. È importante controllare le specifiche del modulo relè prima di usarlo, per assicurarti che sia compatibile con il tuo MCU.

**Segnale di livello alto**: un segnale di livello alto è un segnale al di sopra di una certa soglia di tensione. Ad esempio, un modulo relè a 5V può richiedere un segnale superiore a 3,3V per attivare il relè.

```c++
digitalWrite(pin, HIGH);
```

**Segnale di livello basso**: un segnale di livello basso è un segnale al di sotto di una certa soglia di tensione. Ad esempio, un modulo relè a 5V può richiedere un segnale inferiore a 0,8V per attivare il relè.

```c++
digitalWrite(pin, LOW);
```

**Connettori ad alta tensione**
![High Voltage Connectors]({{ site.github.url }}/public/img/high_voltage_connectors.png) 


Il modulo relè nell'immagine sopra ha un unico connettore con tre morsetti: **Common (COM)**, **Normally Closed (NC)** e **Normally Open (NO)**.

**Common (COM)**: COM è il contatto comune ai pin NO e NC. Collega il dispositivo ad alta tensione al pin COM.

**Normally Closed (NC)**: normalmente chiuso, il circuito è chiuso a riposo.

**Normally Open (NO)**: normalmente aperto, il circuito è aperto a riposo.

I contatti normalmente aperto (NO) e normalmente chiuso (NC) ti permettono di usare un solo pin per comandare due circuiti distinti, a seconda delle tue esigenze. Ad esempio, puoi usare un contatto per alimentare una lampadina e l'altro per alimentare un motore. Quando il pin è alto/basso si accende la lampadina, altrimenti si accende il motore.

### Cablaggio

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-esp8266-relay-wired.png) 

| MCU       | Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    12 (D6)    |
| RaspPi W  |    6    |

Prima di passare all'integrazione con Sinric Pro, è importante verificare che il relè sia collegato correttamente. Puoi usare il codice seguente per controllare che il relè si accenda e si spenga ogni 5 secondi.  


```cpp
#if defined(ESP8266)
  #define relay        12
#elif defined(ESP32) 
  #define relay        16
#elif (ARDUINO_ARCH_RP2040)
  #define relay        6
#endif

void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);
}

void loop() {
  Serial.println("Writing HIGH ..");
  digitalWrite(relay, HIGH);
  delay(5000); 
  
  Serial.println("Writing LOW ..");
  digitalWrite(relay, LOW);
  delay(5000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/baf926bc8b0821f048fe53540e254212)


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

#### 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)


Puoi **generare il codice** con la funzione **Zero Code** oppure scriverlo da solo. Se non hai esperienza di programmazione, ti consigliamo di usare la funzione Zero Code del Portale per generare il codice, scaricarlo e caricarlo sulla scheda.

#### 2.2 Codice completo


```cpp
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProSwitch.h"

#define WIFI_SSID         ""  // Change WIFI_SSID to your WiFi Name.
#define WIFI_PASS         ""  // Change WIFI_PASS to your WiFi password.
#define APP_KEY           ""  // Paste App Key from above 
#define APP_SECRET        ""  // Paste App Secret from above 
#define SWITCH_ID_1       ""  // Paste Device Id from  above

#if defined(ESP8266)
  #define RELAYPIN_1        12
#elif defined(ESP32) 
  #define RELAYPIN_1        16
#elif (ARDUINO_ARCH_RP2040)
  #define RELAYPIN_1        6
#endif

#define BAUD_RATE         115200                // Change baudrate to your need

bool onPowerState1(const String &deviceId, bool &state) {
 Serial.printf("Device 1 turned %s", state?"on":"off");
 digitalWrite(RELAYPIN_1, state ? HIGH:LOW);
 
 /* If your relay is activated with low signal, change the above to below code
  digitalWrite(RELAYPIN_1, state ? LOW : HIGH); */

 return true; // request handled properly
}

// setup function for WiFi connection
void setupWiFi() {
  Serial.printf("\r\n[Wifi]: Connecting");

  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }

  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
  // add devices and callbacks to SinricPro
  pinMode(RELAYPIN_1, OUTPUT);
    
  SinricProSwitch& mySwitch1 = SinricPro[SWITCH_ID_1];
  mySwitch1.onPowerState(onPowerState1);
    
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
   
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/0416a1f26b8398ce6dd9f71a6a70755a)

 
Ora dovresti poter controllare il relè dal Portale, come nel video qui sotto. 

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-relay-on-off.mp4" type="video/mp4">
</video>

### Passo 3 : Collega la skill Alexa [Sinric Pro](https://www.amazon.com/dp/B07ZT5VDT8) al tuo account.

<div align="center">
  <table >
    <tr>
      <td>
        <p>&#x2022; Apri l'app Amazon Alexa.</p>
        <p>&#x2022; Vai su Skill e giochi.</p>
        <p>&#x2022; Cerca <b>Sinric Pro</b>.</p>
        <p>&#x2022; Fai clic su ABILITA ALL'USO.</p>
        <p>&#x2022; Inserisci le tue credenziali <b>Sinric Pro</b> nella pagina di collegamento.</p>
        <p>&#x2022; Chiedi ad Alexa di cercare nuovi dispositivi.</p>
        <p>&#x2022; Chiedi ad Alexa di accendere lo <b>Switch</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Passo 4 : Collega la action Google Home [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) al tuo account.

<div align="center">
  <table >
    <tr>
      <td>
          <p>&#x2022; Apri <b>Google Home</b> e fai clic su <b>Aggiungi</b>. </p>
          <p>&#x2022; Seleziona <b>Configura dispositivo</b></p>
          <p>&#x2022; Seleziona <b>Compatibile con Google Home</b></p>
          <p>&#x2022; Cerca <b>Sinric Pro</b>.</p>
          <p>&#x2022; Collega il tuo account. </p>
          <p>&#x2022; Cerca i nuovi dispositivi </p>
          <p>&#x2022; Chiedi a Google Home di accendere lo <b>Switch</b></p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Passo 5 : Collega [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) in SmartThings al tuo account.

<div align="center">
  <table >
    <tr>
      <td>
           <p>&#x2022; Apri l'app SmartThings e tocca l'icona <b>+</b></p>
           <p>&#x2022; Seleziona Dispositivo</p>
           <p>&#x2022; Seleziona Sinric Pro in <b>Per marca</b></p>
           <p>&#x2022; Collega il tuo account. </p>
           <p>&#x2022; Ora puoi accendere o spegnere lo <b>Switch</b> dalla dashboard</p> 
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div> 

Prosegui con la [Parte 2]({{ site.github.url }}/it/pages/tutorials/switch/part-2.it.html) di questa serie di articoli per scoprire come aggiungere un pulsante per commutare il relè.


### Risoluzione dei problemi
Consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html) per le possibili soluzioni al tuo problema.

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Tutorial Switch parte 2: commutare il relè con un pulsante]({{ site.github.url }}/it/pages/tutorials/switch/part-2.it.html)
- [Tutorial Switch parte 3: più relè e pulsanti]({{ site.github.url }}/it/pages/tutorials/switch/part-3.it.html)
- [Relè con MicroPython su ESP32]({{ site.github.url }}/it/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython.it.html)
- [Switch dimmerabile con un dimmer AC RobotDyn]({{ site.github.url }}/it/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
