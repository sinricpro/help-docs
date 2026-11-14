---
title: Indicador de Nível de Água (Tanque de Água) usando Sensor Ultrassônico (HC-SR04) para ESP8266, ESP32, Raspberry Pi Pico W para Alexa
layout: post
lang: pt
description: Construa um indicador de nível de caixa d'água com sensor ultrassônico HC-SR04 e ESP32, ESP8266 ou Raspberry Pi Pico W. Fiação, código e Alexa.
---
 
Nesta parte, vamos orientá-lo na construção de um **Indicador de Nível de Água (também conhecido como Indicador de Tanque de Água)** usando um **Sensor Ultrassônico** que pode ser conectado a um **ESP32, ESP8266 ou Raspberry Pi Pico W**. Uma vez configurado, você poderá medir níveis de água usando Amazon Alexa, perguntar à Alexa sobre informações dele, e também monitorá-lo através do aplicativo Sinric Pro e *receber uma notificação push quando o nível de água estiver baixo*.


![Sinric Pro HC-SR04 Ultrasonic Sensor ]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-intro.png)

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. Sensor Ultrassônico (HC-SR04) x 1.
3. Planta com vaso x 1.
4. Cabos Jumper.

 

### Introdução rápida ao Sensor Ultrassônico
Os sensores ultrassônicos são sensores de baixo custo e fáceis de usar que podem medir distância. Funciona enviando uma rajada de som ultrassônico e então **medindo o tempo que leva para o eco retornar**. A distância para o objeto é então calculada baseada na velocidade do som.

É alimentado por uma fonte de 5V DC e tem quatro pinos: **VCC, GND, TRIG e ECHO**. Uma vez que o sensor está conectado, você pode usá-lo para medir distância enviando um pulso para o pino TRIG e então medindo o tempo que leva para o pino ECHO ficar alto. A distância para o objeto pode então ser calculada usando a seguinte fórmula:

> distância = (tempo * velocidade do som) / 2

onde:

- `distância` está em centímetros.
- `tempo` está em microssegundos.
- `velocidade do som` é 343 metros por segundo.
 
De acordo com as notas do fabricante, o sensor HC-SR04 **funciona melhor** entre 2cm – 400 cm (1" - 13ft) dentro de um cone de 30 graus.

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-practical-test.png) 

### Fiação do Sensor Ultrassônico

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-wiring.png) 


| Pino HC-SR04 | ESP8266 | ESP32    | Pico W |
| --------- | ------- | -------    | -------    |
| VCC       |    5V   | 5V         | 5V         |
| GND       |    GND  | GND        | GND        |
| TRIG      |    12 (D6)  | GPIO 5  | 15        |
| ECHO      |    14 (D5)  | GPIO 18 | 14        |


Vamos verificar se o sensor está conectado corretamente e funcionando.
 

```cpp
#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif
 
long duration;
float distanceInCm; 

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);

  // convert duration to CM 
  distanceInCm = duration/29 / 2;

  // inches 
  // distanceInInches = duration / 74 / 2;

  Serial.print("Distance (cm): ");
  Serial.println(distanceInCm); 
  
  delay(1000);
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/83febb46592b067c79a0dd55136405a6)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-test-readings.png) 

Vamos tentar medir o nível de água como uma porcentagem.
 

```cpp
#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif
 
long duration;
float distanceInCm; 
int waterLevelAsPer;

const int EMPTY_TANK_HEIGHT = 150; // Height when the tank is empty
const int FULL_TANK_HEIGHT  =  25; // Height when the tank is full

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   // Take a measurement
  distanceInCm = duration/29 / 2; // Convert to CM
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); // Convert to precentage value based on tank height
 
  // In inches ?
  // distanceInInches = duration / 74 / 2;

  Serial.print("As a precentage: ");
  Serial.println(waterLevelAsPer); 
  
  delay(1000);
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/175f772413b433241acaca6234257cf2)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-water-tank-measurements-as-precentage.png) 
 
### Passo 1: Conectar ao Sinric Pro

#### Passo 1.1: Criando um tipo de dispositivo personalizado para Indicador de Nível de Água.

Sinric Pro não tem um tipo de dispositivo integrado para Indicador de Nível de Água, então vamos criar um tipo de dispositivo personalizado para suportar mostrar Indicador de Nível de Água usando o recurso Device Template.

**Nota**: Você pode usar o recurso de importação de template de dispositivo mencionado abaixo para pular a criação do template completo.

* [Faça login](https://portal.sinric.pro/devicetemplates/new) na sua conta Sinric Pro e vá para **Device Templates**

* Clique em **Add Device Template**. Digite nome e descrição como **Water Level Indicator** e selecione **Water Tank** como tipo de dispositivo

![sinricpro water tank new device template basic info]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-basic-info.png) 

* Clique em **Capabilities**.

Aqui devemos selecionar as características do nosso Sensor. Queremos saber o *Nível de água* como uma porcentagem. Então vamos arrastar uma capacidade **Range** e **Push Notification**.

![sinricpro water tank new device template capabilities]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-capabilities.png) 

- O que é capacidade Range?

  A capacidade Range pode ser usada para representar um número. ex: velocidade atual de um liquidificador.

- O que é capacidade Push Notification?

  A capacidade Notification fornece a habilidade de enviar uma mensagem de notificação push do código.

Clique no botão **Configure** e configure as duas capacidades como abaixo.

![sinricpro water tank device template range capability]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-range-capability.png)  

Clique em **Save** para salvar.

Clique em **Save** para salvar o template.

Agora você pode ver o template que acabamos de criar.


## Importar um template existente?

Se você está com preguiça, você pode usar o recurso de importação.

![Sinric Pro import template json]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Cole este Template:

```json
{
  "name": "Water Level Indicator",
  "description": "Water Level Indicator",
  "deviceTypeId": "621b9648f728ec974aac62f2",
  "capabilities": [
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 1,
        "maximumValue": 100,
        "precision": 1,
        "unitOfMeasure": "5ffbeefbfaa11451974c6bbd",
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

[View this code on GitHub Gist](https://gist.github.com/kakopappa/a04eef3577a55be6df4ad098ec8df031)


* Vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **Tanque de Água**, descrição **Tanque de Água** e selecione o tipo de dispositivo como **Water Level Indicator**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-from-template.png)

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

* Clique em **Code Generator** para Gerar o código. Clique em **Download** para baixar o código.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-code-download.png)
 

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código Completo


**sinricpro-water-level-monitor.ino**

```cpp
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
#include "WaterLevelIndicator.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE  115200
#define EVENT_WAIT_TIME   60000 // send event every 60 seconds

#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif

const int EMPTY_TANK_HEIGHT = 150; // Height when the tank is empty
const int FULL_TANK_HEIGHT  =  25; // Height when the tank is full

WaterLevelIndicator &waterLevelIndicator = SinricPro[DEVICE_ID];

long duration;
float distanceInCm; 
int waterLevelAsPer;
int lastWaterLevelAsPer;
float lastDistanceInCm;

// RangeController
void updateRangeValue(int value) {
  waterLevelIndicator.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  waterLevelIndicator.sendPushNotification(notification);
}

void handleSensor() {
   if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return; // Wait untill 1 min
  last_millis = current_millis;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   
  distanceInCm = duration/29 / 2;
  
  if(distanceInCm <= 0) { 
    Serial.printf("Invalid reading: %f..\r\n", distanceInCm); 
    return;
  }
  
  if(lastDistanceInCm == distanceInCm) { 
    Serial.printf("Water level did not changed. do nothing...!\r\n");
    return;
  }
  
  int change = abs(lastDistanceInCm - distanceInCm);
  if(change < 2) {
    Serial.println("Too small change in water level (waves?). Ignore...");
    return;
  }
  
  lastDistanceInCm = distanceInCm;
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); 
  waterLevelAsPer = constrain(waterLevelAsPer, 1, 100);
  
  Serial.printf("Distance (cm): %f. %d%%\r\n", distanceInCm, waterLevelAsPer); 
  
  /* Update water level on server */  
  updateRangeValue(waterLevelAsPer);  

  /* Send a push notification if the water level is too low! */
  if(waterLevelAsPer < 5) { 
    sendPushNotification("Water level is too low!");
  } 
}

 

/********* 
 * Setup *
 *********/

void setupSensor() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

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
  setupSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleSensor();
  SinricPro.handle();
}
```

**WaterLevelIndicator.h**

```cpp
#ifndef _WATERLEVELINDICATOR_H_
#define _WATERLEVELINDICATOR_H_

#include <SinricProDevice.h>
#include <Capabilities/RangeController.h>
#include <Capabilities/PushNotification.h>

class WaterLevelIndicator 
: public SinricProDevice
, public RangeController<WaterLevelIndicator>
, public PushNotification<WaterLevelIndicator> {
  friend class RangeController<WaterLevelIndicator>;
  friend class PushNotification<WaterLevelIndicator>;
public:
  WaterLevelIndicator(const String &deviceId) : SinricProDevice(deviceId, "WaterLevelIndicator") {};
};

#endif
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/206044afbcaa9aca36fc6538f639688a)


 
Agora você deve conseguir ver o nível de água do tanque via Alexa, App Sinric Pro

Alexa, Qual é o nível de água(nome do range) no tanque de água(nome do dispositivo)

![Sinric Pro Alexa HC-SR04 sensor]({{ site.github.url }}/public/img/sinricpro-water-tank-alexa.jpg)
 
![Sinric Pro Alexa HC-SR04 portal]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-portal.png)

![Sinric Pro water tank app]({{ site.github.url }}/public/img/sinricpro-water-tank-hc-sr04.png)

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-tank.mp4" type="video/mp4">
</video>

### Passo 3: Tornando as alturas de Tanque Cheio e Vazio configuráveis via UI

#### 3.1 Atualizar template do dispositivo

Para tornar a altura do tanque cheio e vazio configurável via UI, precisamos voltar ao template de dispositivo personalizado e adicionar mais dois Range Controllers para **Altura do Tanque Cheio** e **Altura do Tanque Vazio** como abaixo.

![Full Empty ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-empty-tank-height.png)

O template completo do dispositivo ficaria assim

![Full Template ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-template.png)

Aqui está o template com alturas cheio e vazio. Você pode importar isso na seção Device Template.


```json
{
  "name": "Water Level Indicator",
  "description": "Water Level Indicator",
  "deviceTypeId": "621b9648f728ec974aac62f2",
  "capabilities": [
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 1,
        "maximumValue": 100,
        "precision": 1,
        "unitOfMeasure": "5ffbeefbfaa11451974c6bbd",
        "presets": [],
        "nonControllable": true
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance2",
        "locale": "en-US",
        "rangeName": "Empty Tank Height",
        "minimumValue": 1,
        "maximumValue": 200,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": false
      }
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance3",
        "locale": "en-US",
        "rangeName": "Full Tank Height",
        "minimumValue": 1,
        "maximumValue": 200,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": false
      }
    }
  ]
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/0ca54644b4abbd05c164e2bdd3dcf052)


#### 3.2 Código Completo


```cpp
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
#include "WaterLevelIndicator.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE  115200
#define EVENT_WAIT_TIME   60000 // send event every 60 seconds

#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif

int EMPTY_TANK_HEIGHT = 150; // Variable for height when the tank is empty
int FULL_TANK_HEIGHT  =  25; // Variable for height when the tank is full

WaterLevelIndicator &waterLevelIndicator = SinricPro[DEVICE_ID];

long duration;
float distanceInCm; 
int waterLevelAsPer;
int lastWaterLevelAsPer;
float lastDistanceInCm;

// RangeController
void updateRangeValue(int value) {
  waterLevelIndicator.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  waterLevelIndicator.sendPushNotification(notification);
}

// RangeController

// Below function will trigger when you change the sliders
bool onRangeValue(const String &deviceId, const String& instance, int &rangeValue) {
  if(instance == "rangeInstance2") {
    EMPTY_TANK_HEIGHT = rangeValue;
    Serial.printf("Empty tank height changed to %d\r\n", rangeValue);
  } else if(instance == "rangeInstance3") { 
    FULL_TANK_HEIGHT = rangeValue;
    Serial.printf("Full tank height changed to %d\r\n", rangeValue);
  }
  
  return true;
}

bool onAdjustRangeValue(const String &deviceId, const String& instance, int &valueDelta) {
  if(instance == "rangeInstance2") {
    EMPTY_TANK_HEIGHT += valueDelta;
    Serial.printf("Empty tank height adjusted by %d\r\n", valueDelta);
  } else if(instance == "rangeInstance3") { 
    FULL_TANK_HEIGHT += valueDelta;
    Serial.printf("Full tank height adjusted by %d\r\n", valueDelta);
  }
  
  return true;
}

void handleSensor() {
   if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return; // Wait untill 1 min
  last_millis = current_millis;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   
  distanceInCm = duration/29 / 2;
  
  if(distanceInCm <= 0) { 
    Serial.printf("Invalid reading: %f..\r\n", distanceInCm); 
    return;
  }
  
  if(lastDistanceInCm == distanceInCm) { 
    Serial.printf("Water level did not changed. do nothing...!\r\n");
    return;
  }
  
  int change = abs(lastDistanceInCm - distanceInCm);
  if(change < 2) {
    Serial.println("Too small change in water level (waves?). Ignore...");
    return;
  }
  
  lastDistanceInCm = distanceInCm;
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); 
  waterLevelAsPer = constrain(waterLevelAsPer, 1, 100);
  
  Serial.printf("Distance (cm): %f. %d%%\r\n", distanceInCm, waterLevelAsPer); 
  
  /* Update water level on server */  
  updateRangeValue(waterLevelAsPer);  

  /* Send a push notification if the water level is too low! */
  if(waterLevelAsPer < 5) { 
    sendPushNotification("Water level is too low!");
  } 
}

 

/********* 
 * Setup *
 *********/

void setupSensor() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void setupSinricPro() {
  // RangeController
  
  // setup Empty tank slider
  waterLevelIndicator.onRangeValue("rangeInstance2", onRangeValue);
  waterLevelIndicator.onAdjustRangeValue("rangeInstance2", onAdjustRangeValue);

  // Setup Full tank slider.
  waterLevelIndicator.onRangeValue("rangeInstance3", onRangeValue);
  waterLevelIndicator.onAdjustRangeValue("rangeInstance3", onAdjustRangeValue);

  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

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
  setupSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleSensor();
  SinricPro.handle();
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/2b20b0086bb0a6de500c08407acd3943)


![Tank control with Alexa and SinricPro App ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-alexa-sinricpro.jpg)

É isso.

### Solução de Problemas
1. Google Home ou SmartThings não são suportados.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.
 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)