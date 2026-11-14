---
title: Sensor de Água (também conhecido como detector de vazamento, inundação ou chuva) para ESP8266, ESP32, Raspberry Pi Pico W para Alexa
layout: post
lang: pt
description: Construa um sensor de vazamento, inundação ou chuva com ESP32, ESP8266 ou Raspberry Pi Pico W. Consulte o estado pela Alexa e receba notificações push.
---
 
Neste tutorial, vamos construir um sensor de água que pode ser conectado a um **ESP32**, **ESP8266** ou **Raspberry Pi Pico W** e usá-lo para monitorar vazamentos de água, inundações ou chuva. Com **Amazon Alexa**, você pode verificar o status do seu sensor de água, perguntar informações sobre ele e **receber notificações push quando água for detectada**.

![Sinric Pro water leak sensor]({{ site.github.url }}/public/img/sinricpro-water-sensor-intro.png)

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. Sensor de Água x 1.
3. Cabos Jumper.

### Introdução rápida ao Sensor de Água

Um detector de água, também conhecido como sensor de água, é um dispositivo que detecta a presença de água. Detectores de água funcionam de várias maneiras. Alguns tipos comuns de detectores de água incluem:

- **Detectores de condutividade**: Detectores de condutividade funcionam medindo a condutividade elétrica da água. Quando o sensor entra em contato com água, a condutividade elétrica aumenta.

- **Detectores de capacitância**: Detectores de capacitância funcionam medindo a capacitância da água. Quando o sensor entra em contato com água, a capacitância aumenta.

- **Detectores ópticos**: Detectores ópticos funcionam detectando mudanças no índice de refração da água. Quando o sensor entra em contato com água, o índice de refração muda.
 
**Nota:** Sensores de água têm uma vida útil mais curta porque são expostos à água. Isso pode fazer com que o sensor corroa rapidamente quando está ligado enquanto imerso em água. Para evitar isso, vamos ligar o sensor apenas quando fazendo leituras.
  
### Fiação do Sensor de Água

Vamos conectar o sensor de nível de água.

![Sinric Pro water sensor sensor wiring]({{ site.github.url }}/public/img/sinricpro_water_sensor_wiring.png) 

| MCU       | Pino S                    |  Pino VCC |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   17      |
| ESP8266   |    A0                     |   D2      |
| Pico W    |    GP26 (ADC0)            |   6       |
 


**Nota:** no ESP32, ADC2 (GPIO04, GPIO02, GPIO15) é instável quando Wi-Fi está sendo usado.

### Lendo do Sensor de Água

Vamos verificar se o sensor está conectado corretamente e funcionando.


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(SIGNAL_PIN);   // make a reading from sensor
  digitalWrite(POWER_PIN, LOW);         // turn off the sensor
  Serial.printf("value: %d\n", value);  // print reading
  delay(1000);
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/7d45a826ba02203ab8571b735add45c9)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-sensor-demo.mp4" type="video/mp4">
</video>

![sinric pro water sensor arduino readings]({{ site.github.url }}/public/img/sinricpro-water-sensor-test-readings.png) 

### Detectando inundação


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

const int FLOOD_THRESHOLD = 100;

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(sPin);   // make a reading from sensor
  digitalWrite(vccPin, LOW);         // turn off the sensor
  
  if (value > FLOOD_THRESHOLD) {
    Serial.print("Flooding detected");
  }

  delay(1000);
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/aff71487783487cbfbdef4006eaab809)


### Detectando nível de água


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

const int SENSOR_MAX = 560;
const int SENSOR_MIN = 1;

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(sPin);   // make a reading from sensor
  digitalWrite(vccPin, LOW);         // turn off the sensor
  
  int waterLevelHeightInCm = map(value, SENSOR_MIN, SENSOR_MAX, 0, 5); // Map sensor value between 0..5 levels (1 cm = 1 level)
  Serial.printf("Water level: %d\n", waterLevelHeightInCm);  // print reading

  delay(1000);
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/a2dffb0f0c46585ed0b35aa902c2447e)


 
### Passo 1: Conectar ao Sinric Pro

#### Passo 1.1: Criando um tipo de dispositivo personalizado para Sensor de Água.

Sinric Pro não tem um tipo de dispositivo integrado para Sensor de Água/Inundação, então vamos criar um tipo de dispositivo personalizado para Sensor de Água usando o recurso Device Template para ver.

1. Inundação no porão ou não.

2. Nível de água.

**Nota**: Você pode usar o recurso de importação de template de dispositivo mencionado abaixo para pular a criação do template completo.

* [Faça login](https://portal.sinric.pro/devicetemplates/new) na sua conta Sinric Pro e vá para **Device Templates**

* Clique em **Add Device Template**. Digite nome e descrição como **Flood Sensor** e selecione **Flood Sensor** como tipo de dispositivo

![Sinric Pro water sensor device template basic info]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-basic-info.png) 

* Clique em **Capabilities**.

Aqui devemos selecionar as características do nosso Sensor de Umidade do Solo. Queremos saber se o *Solo está Úmido ou Seco* e o *Nível de umidade*. Então vamos arrastar uma capacidade **Range**, **Mode** e **Push Notification**.

![Sinric Pro custom device type for capacitive soil moisture sensor]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-set-template-drop-range-mode.png) 

- O que é capacidade Range?

  A capacidade Range pode ser usada para representar um número. ex: velocidade atual de um liquidificador.

- O que é capacidade Mode?

  A capacidade Mode pode ser usada para representar um valor de uma lista de valores predefinidos. ex: modo de ciclo de lavagem atual de uma máquina de lavar.

- O que é capacidade Push Notification?

  A capacidade Notification fornece a habilidade de enviar uma mensagem de notificação push do código.

Clique no botão **Configure** e configure as duas capacidades como abaixo.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode.png)  

Clique em **Save** para salvar.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode-configured.png)  

Clique em **Save** para salvar o template.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-saved.png)  

Agora você pode ver o template que acabamos de criar.


## Importar um template existente?

Se você está com preguiça de configurar todos os valores dos Modos e Range, você pode usar o recurso de importação.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Cole este Template:


```json
{
  "name": "Flood Sensor",
  "description": "Flood Sensor",
  "deviceTypeId": "65335c897dc29736db4272d2",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Flooding",
        "nonControllable": true,
        "modeValues": [
          "Yes",
          "No"
        ]
      }
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 0,
        "maximumValue": 10,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": true
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/48649129dbed3021cda75a4d8ce94515)


* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **Sensor de Inundação**, descrição **Meu Sensor de Inundação** e selecione o tipo de dispositivo como **Flood Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-new-device-info.png)

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

* Clique em **Code Generator** para Gerar o código. Clique em **Download** para baixar o código.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo


**FloodSensor.h**

```cpp
#ifndef _FLOODSENSOR_H_
#define _FLOODSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/RangeController.h>
#include <Capabilities/PushNotification.h>

class FloodSensor 
: public SinricProDevice
, public ModeController<FloodSensor>
, public RangeController<FloodSensor>
, public PushNotification<FloodSensor> {
  friend class ModeController<FloodSensor>;
  friend class RangeController<FloodSensor>;
  friend class PushNotification<FloodSensor>;
public:
  FloodSensor(const String &deviceId) : SinricProDevice(deviceId, "FloodSensor") {};
};

#endif
```

**sinricpro-flood-sensor.ino**

```cpp
// Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>
#ifdef ESP8266
  #include <ESP8266WiFi.h>
#endif
#ifdef ESP32
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include "FloodSensor.h"
#include <math.h>

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE         115200
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

FloodSensor &floodSensor = SinricPro[DEVICE_ID];

const int FLOOD_THRESHOLD = 100;
const int SENSOR_MAX = 560;
const int SENSOR_MIN = 1;

int waterSensorValue = 0;
int lastWaterSensorValue = 0;
String lastIsFloodingStr = "";

// ModeController
void updateMode(String mode) {
  floodSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// RangeController
void updateRangeValue(float value) {
  floodSensor.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  floodSensor.sendPushNotification(notification);
}

float floatMap(float x, float a, float b, float c, float d) {
  float f=x/(b-a)*(d-c)+c;
  return f;
} 

float floatRound(float in_value, int decimal_place) {
 float multiplier = powf( 10.0f, decimal_place );
 in_value = roundf( in_value * multiplier ) / multiplier;
 return in_value;
}

void handleWaterSensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  digitalWrite(vccPin, HIGH);     // turn on the power for sensor.
  delay(100);                     // wait 100ms
  waterSensorValue = analogRead(sPin); // make a reading from sensor
  digitalWrite(vccPin, LOW);      // turn off the sensor

  Serial.printf("Water sensor value: %d\r\n", waterSensorValue); 
  
  if (waterSensorValue == lastWaterSensorValue) {
    Serial.printf("Water sensor did not changed. do nothing...!\r\n");
    return; 
  }

  /* determine whether flooding */
  String isFloodingStr = "";
  if(waterSensorValue > FLOOD_THRESHOLD) {
    isFloodingStr = "Yes"; // NOTE: must be Yes, No. This is from modes list in template.
  } else {
    isFloodingStr = "No";
  }

  /* Update Flooding label if changed */
  if(lastIsFloodingStr != isFloodingStr) {
    lastIsFloodingStr = isFloodingStr;
    updateMode(isFloodingStr);
  }
  
  delay(500);

  /* update Water Level label */
  float sensorValueToInches = floatMap(waterSensorValue, SENSOR_MIN, SENSOR_MAX, 0, 1.9); /* map the sensor value to inches */
  float roundedSensorValueToInches = floatRound(sensorValueToInches, 2); /* round the sensor value to 1 decimal point */
  Serial.printf("Water level height in inches: %f\r\n", roundedSensorValueToInches);
  updateRangeValue(roundedSensorValueToInches); 


  /* send a push notification when flooding is detected! */
  if(waterSensorValue > FLOOD_THRESHOLD) {
    sendPushNotification("Flooding detected in the basement!");
  } 

  lastWaterSensorValue = waterSensorValue;  // save to compare next time.
}


/********* 
 * Setup *
 *********/
void setupWaterSensor() {
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
};

void setupWiFi() {
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(SSID, PASS);
  Serial.printf("[WiFi]: Connecting to %s", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf("connected\r\n");
}

void setup() {
  Serial.begin(BAUD_RATE);
  setupWaterSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleWaterSensor();
  SinricPro.handle();  
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/6657119c2750c4cc662b674dba04a651)

 
Agora você deve conseguir ver o status de inundação e nível de água via Alexa, App Sinric Pro

Alexa, Qual é a inundação (nome do modo) no sensor de inundação(nome do dispositivo)

Alexa, Qual é o nível de água(nome do range) no sensor de inundação(nome do dispositivo)


![Sinric Pro water sensor in the Alexa app]({{ site.github.url }}/public/img/sinricpro-water-sensor-alexa.jpg)
 
![Sinric Pro water sensor in the Portal]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-portal.png)
 

### Solução de Problemas
1. Google Home ou SmartThings não são suportados.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.
 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)