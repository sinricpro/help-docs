---
title: Como Construir um Sensor de Gás para detectar álcool, etanol, fumaça no ar usando MQ-3 com ESP32, ESP8266 ou Raspberry Pi Pico W para Alexa
layout: post
lang: pt
description: Construa um sensor de gás MQ-3 com ESP32, ESP8266 ou Raspberry Pi Pico W para detectar álcool, etanol e fumaça, com Alexa e notificações push.
---

Nesta seção, vamos orientá-lo na construção de um sensor de gás usando **ESP32**, **Raspberry Pi Pico W** ou **ESP8266**. Você então poderá monitorar a concentração de álcool no ar através da **Amazon Alexa** e **receber notificações push** via aplicativo Sinric Pro quando o sensor detectar um certo nível.

### Pré-requisitos:

1. ESP32, ESP8266 x 1.
2. MQ-3 x 1.
3. Cabos Jumper.

![Sinric Pro MQ-3 alcohol gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-intro.jpg)

### Introdução rápida ao MQ-3

O MQ-3 é um sensor de gás semicondutor usado em uma variedade de aplicações para detectar concentrações de álcool no ar. É um sensor de baixo custo e alta sensibilidade que é fácil de usar. O MQ-3 é baseado no princípio de detecção de gás semicondutor de dióxido de estanho (SnO2). Quando moléculas de álcool estão presentes no ar, elas são adsorvidas na superfície do SnO2. Esta adsorção causa mudança na condutividade do SnO2, que pode ser medida como um sinal elétrico. O MQ-3 é sensível a uma ampla gama de concentrações de álcool, de 0,05 ppm a 5000 ppm. Também é sensível a outros gases, como amônia, benzeno e tolueno, mas é mais sensível ao álcool.

O sensor MQ3 requer uma fonte de alimentação de 5V e consome cerca de 800mW de corrente. A saída digital pode ser conectada a um ESP32, ESP8266 ou Pico W para medir a concentração de álcool.

**Como calibrar o sensor?**

Deixe-o ligado por 24-48 horas para queimá-lo e estabilizar.

Folha de especificação: [MQ-3](https://www.sparkfun.com/datasheets/Sensors/MQ-3.pdf)

### Fiação

![Sinric Pro esp8266 MQ-3 wiring]({{ site.github.url }}/public/img/sinricpro_mq3-wiring-diagram.png) 


| MCU       | Pino A0                   |  Pino VCC |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   5V      |
| ESP8266   |    A0                     |   5V/VIN  |
| Pico W    |    GP26 (ADC0)            |   5V      |
 


**Nota:** no ESP32, ADC2 (GPIO04, GPIO02, GPIO15) é instável quando Wi-Fi está sendo usado.

Vamos verificar se o sensor está conectado corretamente e funcionando.


```cpp
#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

int sensorVal;

void setup() {
 Serial.begin(9600);
 Serial.println("warming up for 20 seconds ..!");
 delay(20000);
}

void loop() {
 sensorVal = analogRead(adcPin);
 Serial.printf("value: %d\r\n", sensorVal);
 delay(2000); // delay 2s
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/580e05d98109e36f6b4ace84bded1c7b)


Leitura quando não exposto ao álcool (cerca de 760):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-reading.png)

Quando exposto ao Jack Daniel's Single Barrel Tennessee Whiskey (cerca de 850):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-jack-daniels-reading.png)

 
### Passo 1: Conectar ao Sinric Pro

#### Passo 1.1: Criando um tipo de dispositivo personalizado para Sensor de Gás.

Sinric Pro não tem um tipo de dispositivo integrado para Sensor de Gás, então vamos criar um tipo de dispositivo personalizado para Sensor de Gás usando o recurso Device Template.

1. Álcool Detectado/Não Detectado.

**Nota**: Você pode usar o recurso de importação de template de dispositivo mencionado abaixo para pular a criação do template completo.

* [Faça login](https://portal.sinric.pro/devicetemplates/new) na sua conta Sinric Pro e vá para **Device Templates**

* Clique em **Add Device Template**. Digite nome e descrição como **Gas Sensor** e selecione **Gas Sensor** como tipo de dispositivo

![Sinric Pro gas ensor device template]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-basic-info.png) 

* Clique em **Capabilities**.

Aqui devemos selecionar as características do nosso Sensor de Gás. Queremos saber se *Álcool* é *Detectado, Não-Detectado*. Então vamos arrastar uma capacidade **Mode** e **Push Notification**.

![Sinric Pro custom device type for gas sensor]({{ site.github.url }}/public/img/gas-sensor-set-template-drop-range-mode.png) 

- O que é capacidade Mode?

  A capacidade Mode pode ser usada para representar um valor de uma lista de valores predefinidos. ex: modo de ciclo de lavagem atual de uma máquina de lavar.

- O que é capacidade Push Notification?

  A capacidade Notification fornece a habilidade de enviar uma mensagem de notificação push do código.

Clique no botão **Configure** e configure as duas capacidades como abaixo.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-mode.png)  

Clique em **Save** para salvar.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-template-range-and-mode-configured.png)  

Clique em **Save** para salvar o template.

Agora você pode ver o template que acabamos de criar.


## Importar um template existente?

Se você está com preguiça de configurar todos os valores dos Modos, você pode usar o recurso de importação.

![Sinric Pro gas sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Cole este Template:


```json
{
  "name": "Gas Sensor",
  "description": "Gas Sensor",
  "deviceTypeId": "654d7ef928f14e9ac82ad57d",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Alcohol",
        "nonControllable": true,
        "modeValues": [
          "Detected",
          "Not-Detected"
        ]
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/9fdaaaa176a83414961756cf276b82d5)


* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).

* Digite o nome do dispositivo **Sensor de Gás**, descrição **Sensor de Gás** e selecione o tipo de dispositivo como **Gas Sensor** de **Your Device Templates**.


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-new-device-info.png)

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


**GasSensor.h**

```cpp
#ifndef _GASSENSOR_H_
#define _GASSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/PushNotification.h>

class GasSensor 
: public SinricProDevice
, public ModeController<GasSensor>
, public PushNotification<GasSensor> {
  friend class ModeController<GasSensor>;
  friend class PushNotification<GasSensor>;
public:
  GasSensor(const String &deviceId) : SinricProDevice(deviceId, "GasSensor") {};
};

#endif
```

**sinricpro-mq4-sensor.ino**

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
#include "GasSensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.

#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define DEVICE_ID         ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

const int GAS_DETECTED_THRESHOLD = 850;       // Change accordingly

GasSensor &gasSensor = SinricPro[DEVICE_ID];
int sensorVal;
String sensorState = "";
String lastSensorState = "";

// ModeController
void updateMode(String mode) {
  gasSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// PushNotificationController
void sendPushNotification(String notification) {
  gasSensor.sendPushNotification(notification);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

 void handleM3Sensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  sensorVal = analogRead(adcPin);
  Serial.printf("Sensor value: %d\r\n", sensorVal); 

  if (sensorVal > GAS_DETECTED_THRESHOLD) { // "Detected" or "Not-Detected" (from ModeController mode values)
    sensorState = "Detected"; 
  } else {
    sensorState = "Not-Detected";
  }

  if(sensorState != lastSensorState) {
    /* update server with "detected" / "Not-Detected" status */
    updateMode(sensorState); 

    /* send a push notification when gas detected */
    if(sensorState == "Detected") {
      sendPushNotification("Gas Detected!!!");
    }    
  } 

  lastSensorState = sensorState;  // save to compare next time.
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
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleM3Sensor();
  SinricPro.handle();
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/e9d05233bc97f29a403a101810e36795)

 
Agora você deve conseguir ver o status de álcool detectado e nível de água via Alexa, App Sinric Pro

Alexa, Qual é o álcool (nome do modo) no Sensor de Gás (nome do dispositivo)
 

![Sinric Pro Alexa gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-alexa.jpg)
 
![Sinric Pro Portal gas sensor portal]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-portal.png)
 

### Solução de Problemas
1. Google Home ou SmartThings não são suportados.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.
 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)