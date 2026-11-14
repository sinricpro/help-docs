---
title: Sensor de Temperatura e Umidade DHT11 e DHT22 com ESP32 ou ESP8266 para Alexa e Google Home
layout: post
lang: pt
description: Conecte um sensor de temperatura e umidade DHT11, DHT22, AM2302 ou RHT03 a um ESP32 ou ESP8266 e consulte-o pela Alexa ou Google Home.
---

Nesta seção vamos criar um **Sensor de Temperatura** usando **ESP32**, **ESP8266** e depois visualizar a temperatura via **Alexa, Google Home ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 x 1.
2. DHT11 ou DHT22, AM2302, RHT03 x 1.
3. Cabos Jumper.

### Introdução rápida ao Sensor de Temperatura

As séries DHT e AM são sensores digitais de baixo custo para detectar temperatura e umidade. Ele usa um sensor de umidade capacitivo e um termistor para medir o ar ambiente e então emite um sinal digital no pino de dados.


### Fiação

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial.png) 

Nota: Alguns sensores DHT22 não vêm com um resistor pull-up, então você pode precisar conectar um você mesmo. Um resistor de 10k é tipicamente usado, e deve ser conectado do pino de dados do sensor para a fonte de alimentação +3.3V ou +5V.


| MCU       | Pino DHT    |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    14 (D5)    |


### Configurar biblioteca arduino-DHT

Vamos usar a biblioteca [arduino-DHT](https://github.com/markruys/arduino-DHT) para ler a temperatura e umidade do nosso sensor. Vá para [arduino-DHT](https://github.com/markruys/arduino-DHT) e baixe a biblioteca como arquivo zip.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/download-arduino-DHT-library.png) 

Então extraia o arquivo zip para `C:\Users\<username>\Documents\Arduino\libraries\arduino-DHT`. Assim deve ficar.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/extract-arduino-DHT-library.png) 

Vamos verificar se a temperatura está conectada corretamente e funcionando.


```cpp
#include "DHT.h" // https://github.com/markruys/arduino-DHT  Support for DHT11 and DHT22, AM2302, RHT03
 
#if defined(ESP8266)
  #define DHT_PIN    D1
#elif defined(ESP32)
  #define DHT_PIN    16
#endif

float temperature;
float humidity;

DHT dht;
 
void setup() {
  Serial.begin(115200);
  delay(10);

  dht.setup(DHT_PIN);
}
 
void loop() {
    delay(dht.getMinimumSamplingPeriod());

    temperature = dht.getTemperature();
    humidity = dht.getHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.printf("DHT reading failed!\r\n");
      return;
    } else {
      Serial.printf("Temperature: %2.1f Celsius\tHumidity: %2.1f%%\r\n", temperature, humidity);
    }     
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/08c5cd5bbee8da13e6ca081afd017974)


O Monitor Serial do Arduino IDE mostrará a temperatura atual assim

![Sinric Pro DHT Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_sensor_readings.png)

### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Sensor de Temperatura**, descrição **Meu Sensor de Temperatura** e selecione o tipo de dispositivo como **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Você pode definir o limite aqui para receber uma notificação push via aplicativo Sinric Pro quando a temperatura ficar **abaixo** ou **acima** de uma certa temperatura. Use o Tempo de Re-disparo para definir o atraso entre notificações.

* Clique na aba Outros e Clique em **Salvar**

* A próxima tela mostrará as credenciais necessárias para conectar o dispositivo que você acabou de criar.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copie o **ID do Dispositivo**, **Chave do App** e **Segredo do App** ***Mantenha esses valores seguros. NÃO OS COMPARTILHE EM FÓRUNS PÚBLICOS!***

### Passo 2: Conectar ao Sinric Pro

#### Passo 2.1 Instalar a Biblioteca Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Você pode **gerar o código** usando o recurso **Zero Code** ou escrevê-lo você mesmo. Se você não tem experiência em programação, recomendamos usar o recurso Zero Code no Portal para gerar o código, baixar e carregar.

#### 2.2 Código Completo
  

```cpp
// Uncomment the following line to enable serial debug output
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
#include "SinricProTemperaturesensor.h"
#include "DHT.h" // https://github.com/markruys/arduino-DHT

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define TEMP_SENSOR_ID    ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  #define DHT_PIN    D1
#elif defined(ESP32)
  #define DHT_PIN    16
#endif

DHT dht;                                      // DHT sensor

float temperature;                            // actual temperature
float humidity;                               // actual humidity
float lastTemperature;                        // last known temperature (for compare)
float lastHumidity;                           // last known humidity (for compare)
   
void handleTemperaturesensor() {
  if (SinricPro.isConnected() == false) {
    Serial.printf("Not connected to Sinric Pro...!\r\n");
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
  
  temperature = dht.getTemperature();          // get actual temperature in °C
//  temperature = dht.getTemperature() * 1.8f + 32;  // get actual temperature in °F
  humidity = dht.getHumidity();                // get actual humidity

  if (isnan(temperature) || isnan(humidity)) { // reading failed... 
    Serial.printf("DHT reading failed!\r\n");  // print error message
    return;                                    // try again next time
  } 

  Serial.printf("Temperature: %2.1f Celsius\tHumidity: %2.1f%%\r\n", temperature, humidity);

  if (temperature == lastTemperature && humidity == lastHumidity) {
    Serial.printf("Temperature did not changed. do nothing...!\r\n");
    return; 
  }

  SinricProTemperaturesensor &mySensor = SinricPro[TEMP_SENSOR_ID];  // get temperaturesensor device
  bool success = mySensor.sendTemperatureEvent(temperature, humidity); // send event
  if (success) {  
    Serial.printf("Sent!\r\n");
  } else {
    Serial.printf("Something went wrong...could not send Event to server!\r\n"); // Enable ENABLE_DEBUG to see why
  }

  lastTemperature = temperature;  // save actual temperature for next compare
  lastHumidity = humidity;        // save actual humidity for next compare 
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
  IPAddress localIP = WiFi.localIP();
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}

bool onPowerState(const String &deviceId, bool &state) {
  return true; // request handled properly
}

// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProTemperaturesensor &mySensor = SinricPro[TEMP_SENSOR_ID];
  mySensor.onPowerState(onPowerState);
  
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  //SinricPro.restoreDeviceStates(true); // Uncomment to restore the last known state from the server.
  SinricPro.begin(APP_KEY, APP_SECRET);  
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  dht.setup(DHT_PIN);

  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
  handleTemperaturesensor();
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/a6574e1e0c57a5cdcb46d357a5dd6ee3)

 
Agora você deve conseguir visualizar a temperatura via App Sinric Pro
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Gráficos via Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_portal_temperature_sensor.png)

Alexa, Google Home e SmartThings

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_alexa_googlehome_smartthings_temperature_sensor.png)

Note que o aplicativo Google Home mostra o sensor de temperatura como um Termostato devido às limitações do Google Home.

### Solução de Problemas

1. error: no matching function for call to 'DHT::DHT()' ou error: 'class DHT' has no member named 'getMinimumSamplingPeriod'

    **Solução**: Certifique-se de que a biblioteca DHT correta está instalada. Este exemplo foi feito com https://github.com/markruys/arduino-DHT. Remova quaisquer outras bibliotecas DHT que você possa ter instalado anteriormente, ex: https://github.com/adafruit/DHT-sensor-library

2. Erro de compilação: DHT.h: No such file or directory

    **Solução**: Certifique-se de que a biblioteca DHT correta está instalada.

2. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.


 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)