---
title: Adicione um Botão a um Relé com ESP32 ou ESP8266 e Alexa (Tutorial de Interruptor Parte 2)
layout: post
lang: pt
description: Adicione um botão a um relé com ESP32 ou ESP8266 para alterná-lo manualmente e pela Alexa ou Google Home, com o estado sincronizado.
---

Nesta seção, continuaremos da [Parte 1]({{ site.github.url }}/pt/pages/tutorials/switch/part-1.pt.html) e adicionaremos um botão para ligar e desligar o relé. Também atualizaremos o novo status do relé no servidor Sinric Pro.


![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/sinric_pro_relay_push_button_esp8266.png) 
### Pré-requisitos:


| Componente                  | Quantidade |
| ---------                   | ------- |
| ESP32, ESP8266 ou RaspPi W  |    1     |
| Controlador de relé SPDT    |    1     |
| Botão push                  |    1     |
| Resistor de 10K ohm         |    1     | 
| Cabos jumper                |    1     | 

### Introdução rápida ao botão push e debouncing

Os botões push podem frequentemente gerar sinais falsos quando pressionados. Isso ocorre porque o interruptor mecânico que compõe o botão pode saltar ou vibrar ligeiramente quando é pressionado. Isso pode fazer com que o botão envie múltiplos sinais para o MCU, mesmo que tenha sido pressionado apenas uma vez. O processo de eliminar esses sinais gerados é chamado de debouncing. Para eliminar o ruído do botão push, podemos registrar uma mudança de estado e então ignorar entradas adicionais por alguns milissegundos.

### Fiação

Existem duas maneiras de conectar um botão push.

![Sinric Pro pull-up pull-down]({{ site.github.url }}/public/img/pull-up-pull-down.png) 

**Pull-Up** - Quando o interruptor é pressionado, digitalRead lê sinal LOW (0).

**Pull-Down** - Quando o interruptor é pressionado, digitalRead lê sinal HIGH (1).
 


| MCU       | Pino    | Componente    |
| --------- | ------- | ------- |
| ESP32     |    16   |    Relé   |
| ESP32     |    17   |    Botão   |
| ESP8266   |    12 (D6)    |    Relé   |
| ESP8266   |    15 (D8)    |    Botão   |
| RaspPi W  |    6    |    Relé   |
| RaspPi W  |    7    |    Botão   |

Antes de integrarmos com o sketch da parte 1, é importante verificar se o botão está conectado corretamente e funcionando. Você pode usar o seguinte código para verificar se o botão é pressionado.  

Vamos usar o método **Pull-Down** para conectar nosso botão push.


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

[View this code on GitHub Gist](https://gist.github.com/kakopappa/23d95c1df56a7c2d2ec9aff1dcdf3a90)


![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png) 

Agora vamos completar o sketch com botão push, controlador de relé com integração Sinric Pro.


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

[View this code on GitHub Gist](https://gist.github.com/kakopappa/86f6f4c65483d6b5c21ba33f9af48d87)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/relay-on-off-switch.mp4" type="video/mp4">
</video>

Continue para a [Parte 3]({{ site.github.url }}/pt/pages/tutorials/switch/part-3.html) desta série de artigos para aprender como controlar múltiplos botões push com múltiplos relés.


### Solução de Problemas
Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para possíveis soluções para seu problema.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)