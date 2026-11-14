---
title: Aggiungere un pulsante a un relè ESP32 o ESP8266 con Alexa (Tutorial Switch, parte 2)
layout: post
lang: it
description: Aggiungi un pulsante a un relè ESP32 o ESP8266 per comandarlo a mano e con Alexa o Google Home, mantenendo lo stato sincronizzato.
---

In questa sezione proseguiamo dalla [Parte 1]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html) e aggiungiamo un pulsante per accendere e spegnere il relè. Aggiorneremo anche il nuovo stato del relè sul server Sinric Pro.


![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/sinric_pro_relay_push_button_esp8266.png) 
### Prerequisiti : 


| Componente    | Quantità |
| ---------                   | ------- |
| ESP32, ESP8266 o RaspPi W  |    1     |
| Modulo relè SPDT       |    1     |
| Pulsante                 |    1     |
| Resistenza da 10K ohm            |    1     | 
| Cavetti jumper                |    1     | 

### Breve introduzione al pulsante e al debouncing

Quando vengono premuti, i pulsanti generano spesso segnali spuri. Questo accade perché il contatto meccanico all'interno del pulsante può rimbalzare leggermente al momento della pressione. Di conseguenza il pulsante può inviare più segnali all'MCU anche se è stato premuto una sola volta. Il procedimento con cui si eliminano questi segnali si chiama debouncing (antirimbalzo). Per eliminare il rumore del pulsante possiamo registrare un cambio di stato e poi ignorare gli ingressi successivi per qualche millisecondo.

### Cablaggio

Ci sono due modi per collegare un pulsante.

![Sinric Pro pull-up pull-down]({{ site.github.url }}/public/img/pull-up-pull-down.png) 

**Pull-Up** - Quando il pulsante è premuto, digitalRead legge un segnale LOW (0).

**Pull-Down** - Quando il pulsante è premuto, digitalRead legge un segnale HIGH (1).
 


| MCU       | Pin     | Componente     |
| --------- | ------- | ------- |
| ESP32     |    16   |    Relè   |
| ESP32     |    17   |    Pulsante   |
| ESP8266   |    12 (D6)    |    Relè   |
| ESP8266   |    15 (D8)    |    Pulsante   |
| RaspPi W  |    6    |    Relè   |
| RaspPi W  |    7    |    Pulsante   |

Prima di integrarlo nello sketch della parte 1, è importante verificare che il pulsante sia cablato correttamente e funzioni. Puoi usare il codice seguente per controllare se la pressione del pulsante viene rilevata.  

Per collegare il nostro pulsante useremo il metodo **Pull-Down**.


```cpp
#if defined(ESP8266)
  #define BUTTON_PIN        12
#elif defined(ESP32) 
  #define BUTTON_PIN        16
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        6
#endif

int button_state;
int lastbutton_state = LOW;

unsigned long last_debounce_time = 0;
unsigned long debounce_delay = 50; // increase if needed.

void setup() {
  Serial.begin(115200);	
  pinMode(BUTTON_PIN, INPUT);
}

void handle_button_press() {
  int reading = digitalRead(BUTTON_PIN);  
  if (reading != lastbutton_state) {
    last_debounce_time = millis();
  }

  if ((millis() - last_debounce_time) > debounce_delay) {
    if (reading != button_state) {
      button_state = reading;
      
      if (button_state == HIGH) {
        Serial.printf("Pressed!\r\n");
      }
    }
  }
  
  lastbutton_state = reading;
}

void loop() {
  handle_button_press();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/23d95c1df56a7c2d2ec9aff1dcdf3a90)


![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png) 

Ora completiamo lo sketch con il pulsante, il modulo relè e l'integrazione con Sinric Pro.


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
#define APP_KEY           ""  // App Key
#define APP_SECRET        ""  // App Secret
#define SWITCH_ID_1       ""  // Device Id

#define BAUD_RATE         115200              // Change baudrate to your need

#if defined(ESP8266)
  #define BUTTON_PIN        15
  #define RELAYPIN_1        12
#elif defined(ESP32) 
  #define BUTTON_PIN        17
  #define RELAYPIN_1        16
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        7
  #define RELAYPIN_1        6
#endif

bool myPowerState = false;
unsigned long lastBtnPress = 0;

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s (via SinricPro) \r\n", deviceId.c_str(), state?"on":"off");
  
  digitalWrite(RELAYPIN_1, state ? HIGH:LOW);
  
   /* If your relay is activated with low signal, change the above to below code
  digitalWrite(RELAYPIN_1, state ? LOW : HIGH); */

  myPowerState = state;
  return true; // request handled properly
}

void handleButtonPress() {
  unsigned long actualMillis = millis();
  if (digitalRead(BUTTON_PIN) == HIGH && actualMillis - lastBtnPress > 1000)  {
    if (myPowerState) {
      myPowerState = false;
    } else {
      myPowerState = true;
    }
	
    // get Switch device back
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID_1];
    
    // send powerstate event to server
    mySwitch.sendPowerStateEvent(myPowerState); // send the new powerState to SinricPro server
    Serial.printf("Device %s turned %s (manually via button)\r\n", mySwitch.getDeviceId().c_str(), myPowerState?"on":"off");

    // set relay status  
    digitalWrite(RELAYPIN_1, myPowerState ? HIGH:LOW);
	 
    lastBtnPress = actualMillis;  // update last button press variable
  } 
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
  // add device to SinricPro
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID_1];

  // set callback function to device
  mySwitch.onPowerState(onPowerState);

  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}


void setup() {
  pinMode(BUTTON_PIN, INPUT);
  pinMode(RELAYPIN_1, OUTPUT);
  
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  handleButtonPress();
  SinricPro.handle();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/86f6f4c65483d6b5c21ba33f9af48d87)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/relay-on-off-switch.mp4" type="video/mp4">
</video>

Prosegui con la [Parte 3]({{ site.github.url }}/it/pages/tutorials/switch/part-2.it.html) di questa serie di articoli per imparare a gestire più pulsanti con più  relè.


### Risoluzione dei problemi
Consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html) per trovare possibili soluzioni al tuo problema.

 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Tutorial Switch, parte 1: accendere e spegnere un relè]({{ site.github.url }}/it/pages/tutorials/switch/part-1.it.html)
- [Tutorial Switch, parte 3: più relè e pulsanti]({{ site.github.url }}/it/pages/tutorials/switch/part-3.it.html)
- [Pulsante smart]({{ site.github.url }}/it/pages/tutorials/custom-device-types/smart-button/push-button.it.html)

> Questo documento è open source. Hai trovato un errore? Crea una [issue](https://github.com/sinricpro/help-docs)
