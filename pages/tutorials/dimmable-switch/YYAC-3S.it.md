---
title: Tutorial interruttore con dimmer con YYAC-3S per ESP32
layout: post
lang: it
description: Costruisci un interruttore con dimmer con un ESP32 e un modulo dimmer AC YYAC-3S. Regola la luminosità della luce con Alexa, Google Home o SmartThings.
---

In questa sezione vediamo come creare un **interruttore con dimmer** con un **ESP32** e poi regolare la luminosità della luce tramite **Amazon Alexa, GoogleHome o SmartThings**.

### Prerequisiti : 

1. ESP32.
2. YYAC-3S.
3. Lampadina dimmerabile. 
3. Cavetti jumper.


**Non tutte le lampadine sono dimmerabili.** Controlla l'etichetta del produttore per verificare che la lampadina lo sia.

### Breve introduzione allo YYAC-3S

Il modulo YYAC-3S permette di regolare l'alimentazione in corrente alternata tramite PWM da un Arduino, ESP8266, ESP32 o Pico W. Si può usare per regolare la velocità dei motori AC e la luminosità delle lampadine dimmerabili. Il circuito è composto da un SCR e da un optoaccoppiatore sul lato di ingresso. Questo impedisce alla corrente di rifluire verso l'MCU e lo isola anche dalla massa, rendendone sicuro l'utilizzo. Il modulo accetta un ingresso PWM da 0 a 255 e può controllare tensioni AC fino a 220V con una corrente massima di 3A.


### Cablaggio
  
  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_motion_dimmer_switch_wiring.png) 


Collega il modulo YYAC-3S al microcontrollore in questo modo:
- Pin VCC al pin 5V del microcontrollore (con 3.3V non sembra funzionare).
- Pin GND al pin GND dell'ESP32.
- Pin PWM al pin digitale 16 del microcontrollore.

| MCU       | Pin PWM YYAC-3S     |
| --------- | ------- |
| ESP32     |    16   |


Verifichiamo che il modulo YYAC-3S sia collegato correttamente e funzioni. 


```cpp
const int pwmPin = 16;  // 16 corresponds to GPIO16 of ESP32

// setting PWM properties
const int freq = 1000; // 1KHz
const int ledChannel = 0;
const int resolution = 8;
 
void setup(){
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(pwmPin, ledChannel);
}
 
void loop(){
  
   /* dutyCycle between 0 to 115 does not seems to have an any effect on the bulb. */

  // increase the brightness. 
  for(int dutyCycle = 115; dutyCycle <= 255; dutyCycle++){   
    ledcWrite(ledChannel, dutyCycle);
    delay(15);
  }

  // decrease the brightness
  for(int dutyCycle = 255; dutyCycle >= 115; dutyCycle--){
    ledcWrite(ledChannel, dutyCycle);   
    delay(15);
  } 
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/b34693c62c679437fa3a7465a242d7f2)


Il Monitor seriale di Arduino IDE mostrerà la regolazione della lampadina in questo modo:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-YYAC3S.mp4" type="video/mp4">
</video>

### Passo 1 : Crea un nuovo dispositivo in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Dimmer**, la descrizione **Dimmer** e seleziona il tipo di dispositivo **Switch With Dimming**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_dimmer_new_device.png)

* Apri la scheda Others e fai clic su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

### Passo 2 : Collegati a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Codice completo
  

```cpp
//Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif 

#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProDimSwitch.h"

#define WIFI_SSID         ""    
#define WIFI_PASS         ""
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DIMSWITCH_ID      ""   // Should look like "5dc1564130xxxxxxxxxxxxxx"
#define BAUD_RATE         9600                // Change baudrate to your need

// we use a struct to store all states and values for our dimmable switch
struct {
  bool powerState = false;
  int powerLevel = 0;
} device_state;

// the PWM Pin
const int pwmPin = 16;  // 16 corresponds to GPIO16

// setting PWM properties
const int freq = 1000; // 1KHz
const int ledChannel = 0;
const int resolution = 8;
 
void setPWM(int powerLevel) {
   int dutyCycle = map(powerLevel, 0, 100, 115, 255); // Map power level from 0 to 100, to a value between 115 to 255
   ledcWrite(ledChannel, dutyCycle);
   delay(30);
}

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s power turned %s \r\n", deviceId.c_str(), state?"on":"off");
  device_state.powerState = state;  
  setPWM(state ? 100: 0);
  return true; // request handled properly
}

bool onPowerLevel(const String &deviceId, int &powerLevel) {
  device_state.powerLevel = powerLevel; 
  setPWM(powerLevel);
  Serial.printf("Device %s power level changed to %d\r\n", deviceId.c_str(), device_state.powerLevel);
  return true;
}

bool onAdjustPowerLevel(const String &deviceId, int &levelDelta) {
  device_state.powerLevel += levelDelta;
  Serial.printf("Device %s power level changed about %i to %d\r\n", deviceId.c_str(), levelDelta, device_state.powerLevel);
  levelDelta = device_state.powerLevel;
  setPWM(levelDelta);
  return true;
}

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
  IPAddress localIP = WiFi.localIP();
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}

void setupSinricPro() {
  SinricProDimSwitch &myDimSwitch = SinricPro[DIMSWITCH_ID];

  // set callback function to device
  myDimSwitch.onPowerState(onPowerState);
  myDimSwitch.onPowerLevel(onPowerLevel);
  myDimSwitch.onAdjustPowerLevel(onAdjustPowerLevel);

  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupYYAC3S(){
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(pwmPin, ledChannel);
} 

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupYYAC3S();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/bb496b32ed359651d357d0769dd83695)

 
Ora dovresti poter regolare il livello di luminosità dalle app Alexa, Google Home e SmartThings
  
<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-google-home-demo.mp4" type="video/mp4">
</video>

![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Risoluzione dei problemi

- La luce non si regola ? Controlla l'etichetta del produttore per verificare che la lampadina sia dimmerabile.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- Il PWM non funziona ?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_pwm_YYAC-3S.png)

Il LED qui sopra si accende quando il modulo riceve il segnale PWM dall'MCU. 

- Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).

 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Interruttore con dimmer con un dimmer AC RobotDyn]({{ site.github.url }}/it/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.it.html)
- [Striscia LED RGB (5050)]({{ site.github.url }}/it/pages/tutorials/light/LED-Stripe-5050.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
