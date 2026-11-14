---
title: Dimmer de Luz AC RobotDyn com ESP32 ou ESP8266 para Alexa e Google Home
layout: post
lang: pt
description: Ligue um módulo dimmer de luz AC RobotDyn a um ESP32 ou ESP8266. Biblioteca RBDdimmer, parâmetros do construtor dimmerLamp, pinos zero-cross e PWM, Alexa e Google Home.
---

Nesta seção vamos criar um **Dimmer de luz com RobotDyn** e depois controlar o brilho da luz via **Alexa, GoogleHome ou SmartThings**.

### Pré-requisitos:

1. ESP32 ou ESP8266 x 1.
2. Dimmer de Luz AC RobotDyn.
3. Lâmpada Dimmer.
3. Cabos Jumper.


**Nem todas as lâmpadas são dimerizáveis.** Verifique a etiqueta do fabricante para ver se a lâmpada é dimerizable.

### Introdução rápida ao Módulo Dimmer de Luz AC RobotDyn

O Módulo Dimmer de Luz AC RobotDyn é um dispositivo que permite controlar o brilho de luzes AC usando um microcontrolador. É um módulo pequeno e fácil de usar que pode ser usado com microcontroladores, como o ESP8266, ESP32. O módulo funciona usando um triac para controlar o fluxo de corrente para a lâmpada. O triac é um dispositivo semicondutor que pode ser usado para ligar e desligar corrente AC. O Módulo Dimmer de Luz AC RobotDyn usa um sinal PWM para controlar o triac, que por sua vez controla o brilho da lâmpada.

### Fiação do Dimmer de Luz AC RobotDyn

Você pode usar a tabela de mapeamento de pinos abaixo para conectar seu ESP32/ESP8266 com o módulo Dimmer de Luz AC RobotDyn.

 ```
 *  +---------------+-------------------------+-------------------------+
 *  |   Placa       | Pino INPUT              | Pino OUTPUT             |
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


Conecte o módulo RobotDyn ao microcontrolador da seguinte forma:
- Pino VCC ao pino 5V do microcontrolador (3.3V não parece funcionar).
- Pino GND ao pino GND do ESP32.
- Pino PWM a um pino digital 2 no microcontrolador.
- Pino Z-C a um pino digital 4 no microcontrolador.

| MCU       | Pino Zero Cross   | Pino PWM/ADC   |
| --------- | -------           | -------        |
| ESP32     |    4              | 2


### Biblioteca RBDdimmer (RBDdimmer.h)

O código deste tutorial usa a biblioteca [RBDdimmer](https://github.com/RobotDynOfficial/RBDDimmer) da RobotDyn. Baixe-a do GitHub como arquivo ZIP e adicione-a na Arduino IDE em **Sketch > Include Library > Add .ZIP Library**.

#### Parâmetros do construtor dimmerLamp

```c++
#include <RBDdimmer.h>

// ESP32, ESP8266, Arduino Due: you choose both pins
dimmerLamp dimmer(outputPin, zeroCrossPin);

// Arduino UNO, Nano, Mega, Leonardo, M0/Zero: the zero-cross pin is fixed
dimmerLamp dimmer(outputPin);
```

| Parâmetro | Descrição |
| --- | --- |
| `outputPin` | GPIO conectado ao pino **PWM** (DIM/PSM) do módulo |
| `zeroCrossPin` | GPIO conectado ao pino **Z-C** do módulo. Apenas em placas em que o pino de zero-cross pode ser alterado (ESP32, ESP8266, Arduino Due). No UNO, Nano e Mega ele é fixo em D2; no Leonardo e M0/Zero, em D7 |

No ESP32, os GPIO 34, 35, 36 e 39 são somente entrada. Podem ser usados para o pino de zero-cross, mas não para o pino de saída PWM.

#### Funções

| Função | Descrição |
| --- | --- |
| `begin(NORMAL_MODE, ON)` | Inicia o dimmer. Primeiro parâmetro: `NORMAL_MODE` ou `TOGGLE_MODE`. Segundo parâmetro: `ON` ou `OFF` |
| `setPower(int power)` | Define o brilho de 0 a 100 (%) |
| `getPower()` | Retorna o brilho atual (0 a 100) |
| `setState(ON)` / `setState(OFF)` | Liga ou desliga a saída |
| `getState()` | Retorna o estado atual |
| `changeState()` | Alterna para o estado oposto |
| `setMode(NORMAL_MODE)` / `getMode()` | Define ou retorna o modo de operação |
| `toggleSettings(int minValue, int maxValue)` | Em `TOGGLE_MODE`, sobe e desce o brilho entre os dois valores |

Vamos verificar se o Módulo Dimmer de Luz AC RobotDyn está conectado corretamente e funcionando.


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

[View this code on GitHub Gist](https://gist.github.com/kakopappa/b19a35476ee6086b8dcf605caf43d6da)


O Monitor Serial do Arduino IDE mostrará o dimmer assim:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-swith-with-dimmer-RobotDyn.mp4" type="video/mp4">
</video>

### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Dimmer**, descrição **Dimmer** e selecione o tipo de dispositivo como **Switch With Dimming**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_dimmer_new_device.png)

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo


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

[View this code on GitHub Gist](https://gist.github.com/kakopappa/e968bee3afd66401b1fb7020e591dd3d)


 
 
![Sinric Pro dimmer with Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_alexa_google_home_smartthings.png)


### Solução de Problemas

- Não dimeriza? Verifique a etiqueta do fabricante para ver se a lâmpada é dimerizable.

![dimmable light bulb example]({{ site.github.url }}/public/img/sinric_pro_switch_with_dimmer_dimmable_example.png) 

- PWM não funciona?

![Sinric Pro dimmer YYAC-3S via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_RobotDyn_dimmer_pwm_indicator.jpg)

O LED acima acende quando o módulo recebe o sinal PWM do MCU.

- Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)