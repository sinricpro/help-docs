---
title: Dimmer AC RobotDyn con ESP32 o ESP8266 per Alexa e Google Home
layout: post
lang: it
description: Collega un modulo dimmer AC RobotDyn a un ESP32 o ESP8266. Libreria RBDdimmer, parametri del costruttore dimmerLamp, pin zero-cross e PWM, controllo con Alexa e Google Home.
---

In questa sezione vediamo come creare un **dimmer per luci con RobotDyn** e poi regolare la luminosità della luce tramite **Alexa, GoogleHome o SmartThings**.

### Prerequisiti : 

1. ESP32 o ESP8266 x 1.
2. Dimmer AC RobotDyn.
3. Lampadina dimmerabile. 
3. Cavetti jumper.


**Non tutte le lampadine sono dimmerabili.** Controlla l'etichetta del produttore per verificare che la lampadina lo sia.

### Breve introduzione al modulo dimmer AC RobotDyn

Il modulo dimmer AC RobotDyn è un dispositivo che permette di regolare la luminosità delle luci in corrente alternata tramite un microcontrollore. È un modulo piccolo e facile da usare, compatibile con microcontrollori come ESP8266 ed ESP32. Il modulo usa un triac per controllare il flusso di corrente verso la lampadina. Il triac è un dispositivo a semiconduttore che può attivare e interrompere la corrente alternata. Il modulo dimmer AC RobotDyn pilota il triac con un segnale PWM, e il triac a sua volta regola la luminosità della lampadina.

### Cablaggio del dimmer AC RobotDyn

Puoi usare la tabella di corrispondenza dei pin qui sotto per collegare il tuo ESP32/ESP8266 al modulo dimmer AC RobotDyn.

 ```
 *  +---------------+-------------------------+-------------------------+
 *  |   Board       | INPUT Pin               | OUTPUT Pin              |
 *  |               | Zero-Cross              | PWM                     |
 *  +---------------+-------------------------+-------------------------+
 *  | ESP8266       | D1(IO5),    D2(IO4),    | D0(IO16),   D1(IO5),    |
 *  |               | D5(IO14),   D6(IO12),   | D2(IO4),    D5(IO14),   |
 *  |               | D7(IO13),   D8(IO15),   | D6(IO12),   D7(IO13),   |
 *  |               |                         | D8(IO15)                |
 *  +---------------+-------------------------+-------------------------+
 *  | ESP32         | 4(GPI36),   6(GPI34),   | 8(GPO32),   9(GP033),   |
 *  |               | 5(GPI39),   7(GPI35),   | 10(GPIO25), 11(GPIO26), |
 *  |               | 8(GPO32),   9(GP033),   | 12(GPIO27), 13(GPIO14), |
 *  |               | 10(GPI025), 11(GPIO26), | 14(GPIO12), 16(GPIO13), |
 *  |               | 12(GPIO27), 13(GPIO14), | 23(GPIO15), 24(GPIO2),  |
 *  |               | 14(GPIO12), 16(GPIO13), | 25(GPIO0),  26(GPIO4),  |
 *  |               | 21(GPIO7),  23(GPIO15), | 27(GPIO16), 28(GPIO17), |
 *  |               | 24(GPIO2),  25(GPIO0),  | 29(GPIO5),  30(GPIO18), |
 *  |               | 26(GPIO4),  27(GPIO16), | 31(GPIO19), 33(GPIO21), |
 *  |               | 28(GPIO17), 29(GPIO5),  | 34(GPIO3),  35(GPIO1),  |
 *  |               | 30(GPIO18), 31(GPIO19), | 36(GPIO22), 37(GPIO23), |
 *  |               | 33(GPIO21), 35(GPIO1),  |                         |
 *  |               | 36(GPIO22), 37(GPIO23), |                         |
 *  +---------------+-------------------------+-------------------------+
```

  ![High Voltage Connectors]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_switch_wiring.png) 


Collega il modulo RobotDyn al microcontrollore in questo modo:
- Pin VCC al pin 5V del microcontrollore (con 3.3V non sembra funzionare).
- Pin GND al pin GND dell'ESP32.
- Pin PWM al pin digitale 2 del microcontrollore.
- Pin Z-C al pin digitale 4 del microcontrollore.

| MCU       | Pin Zero Cross    | Pin PWM/ADC    |
| --------- | -------           | -------        |
| ESP32     |    4              | 2


### Libreria RBDdimmer (RBDdimmer.h)

Il codice di questo tutorial usa la libreria [RBDdimmer](https://github.com/RobotDynOfficial/RBDDimmer) di RobotDyn. Scaricala da GitHub come file ZIP e aggiungila in Arduino IDE con **Sketch > Includi libreria > Aggiungi libreria da file .ZIP**.

#### Parametri del costruttore dimmerLamp

```c++
#include <RBDdimmer.h>

// ESP32, ESP8266, Arduino Due: you choose both pins
dimmerLamp dimmer(outputPin, zeroCrossPin);

// Arduino UNO, Nano, Mega, Leonardo, M0/Zero: the zero-cross pin is fixed
dimmerLamp dimmer(outputPin);
```

| Parametro | Descrizione |
| --- | --- |
| `outputPin` | GPIO collegato al pin **PWM** (DIM/PSM) del modulo |
| `zeroCrossPin` | GPIO collegato al pin **Z-C** del modulo. Solo sulle schede in cui il pin zero-cross può essere cambiato (ESP32, ESP8266, Arduino Due). Su UNO, Nano e Mega è fisso su D2, su Leonardo e M0/Zero su D7 |

Su un ESP32 i GPIO 34, 35, 36 e 39 sono solo di ingresso. Possono essere usati per il pin zero-cross ma non per il pin di uscita PWM.

#### Funzioni

| Funzione | Descrizione |
| --- | --- |
| `begin(NORMAL_MODE, ON)` | Avvia il dimmer. Primo parametro: `NORMAL_MODE` o `TOGGLE_MODE`. Secondo parametro: `ON` o `OFF` |
| `setPower(int power)` | Imposta la luminosità da 0 a 100 (%) |
| `getPower()` | Restituisce la luminosità attuale (da 0 a 100) |
| `setState(ON)` / `setState(OFF)` | Accende o spegne l'uscita |
| `getState()` | Restituisce lo stato attuale |
| `changeState()` | Passa allo stato opposto |
| `setMode(NORMAL_MODE)` / `getMode()` | Imposta o restituisce la modalità di funzionamento |
| `toggleSettings(int minValue, int maxValue)` | In `TOGGLE_MODE` aumenta e diminuisce gradualmente la luminosità tra i due valori |

Esempio:

```c++
#include <RBDdimmer.h>

#define PWM_PIN        2
#define ZERO_CROSS_PIN 4

dimmerLamp dimmer(PWM_PIN, ZERO_CROSS_PIN);

void setup() {
  dimmer.begin(NORMAL_MODE, ON);
  dimmer.setPower(50); // 50% brightness
}

void loop() {}
```

Verifichiamo che il modulo dimmer AC RobotDyn sia collegato correttamente e funzioni.


```cpp
#include <RBDdimmer.h> //https://github.com/RobotDynOfficial/RBDDimmer

const int ZC_PIN  = 0;
const int PWM_PIN  = 2;

int MIN_POWER  = 0;
int MAX_POWER  = 80;
int POWER_STEP  = 2;
int power  = 0;

dimmerLamp acd(PWM_PIN, ZC_PIN);

void setup(){
    Serial.begin(115200);
    delay(100);
    acd.begin(NORMAL_MODE, ON);
}

void loop(){
  for(power=MIN_POWER;power<=MAX_POWER;power+=POWER_STEP){
    acd.setPower(power);      
    delay(100);
  }

  for(power=MAX_POWER;power>=MIN_POWER;power-=POWER_STEP){
    acd.setPower(power);
    delay(100);
  }
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/b19a35476ee6086b8dcf605caf43d6da)


Il Monitor seriale di Arduino IDE mostrerà la regolazione in questo modo:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-RobotDyn.mp4" type="video/mp4">
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

#include <RBDdimmer.h> //https://github.com/RobotDynOfficial/RBDDimmer

#include "SinricPro.h"
#include "SinricProDimSwitch.h"

#define WIFI_SSID         ""    
#define WIFI_PASS         ""
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DIMSWITCH_ID      ""   // Should look like "5dc1564130xxxxxxxxxxxxxx"
#define BAUD_RATE         115200                // Change baudrate to your need

const int ZC_PIN  = 4;
const int PWM_PIN  = 2;
const int MIN_POWER  = 0;
const int MAX_POWER  = 80;
int power  = 0;

dimmerLamp acd(PWM_PIN, ZC_PIN);

// we use a struct to store all states and values for our dimmable switch
struct {
  bool powerState = false;
  int powerLevel = 0;
} device_state;

void setPWM(int powerLevel) {
   int power = map(powerLevel, 0, 100, MIN_POWER, MAX_POWER); // Map power level from 0 to 100, to a value between 0 to 80
   acd.setPower(power);     
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

void setupRBDdimmer(){
   acd.begin(NORMAL_MODE, ON);
} 

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupRBDdimmer();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/e968bee3afd66401b1fb7020e591dd3d)


 
 
![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Risoluzione dei problemi

- La luce non si regola ? Controlla l'etichetta del produttore per verificare che la lampadina sia dimmerabile.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- Il PWM non funziona ?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_pwm_indicator.jpg)

Il LED qui sopra si accende quando il modulo riceve il segnale PWM dall'MCU. 

- Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).

 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Interruttore con dimmer con un modulo YYAC-3S]({{ site.github.url }}/it/pages/tutorials/dimmable-switch/YYAC-3S.it.html)
- [Striscia LED RGB (5050)]({{ site.github.url }}/it/pages/tutorials/light/LED-Stripe-5050.it.html)
- [Tutorial Switch parte 1: accendi e spegni un relè]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
