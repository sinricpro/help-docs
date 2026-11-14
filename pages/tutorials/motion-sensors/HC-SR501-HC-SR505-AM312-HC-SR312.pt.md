---
title: 'Sensor de Movimento PIR com ESP32 ou ESP8266 para Alexa: HC-SR501, HC-SR505, AM312'
layout: post
lang: pt
description: Construa um sensor de movimento PIR com ESP32, ESP8266 ou Pico W. Compara HC-SR501, HC-SR505 e AM312 (HC-SR312), com fiação, ajuste de sensibilidade e código para Alexa.
---

Nesta seção vamos criar um **Sensor de Movimento** PIR usando **ESP32**, **ESP8266** ou **Raspberry Pi Pico W** e depois visualizar as mudanças de movimento via **Alexa ou SmartThings**.

### Pré-requisitos:

1. ESP32, ESP8266 ou Raspberry Pi Pico W x 1.
2. HC-SR501, HC-SR505, Mini AM312, HC-SR312 x 1.
3. Cabos Jumper.

| PIR       | Tensão de operação | Tempo de atraso | Tempo de bloqueio | Disparo       | Distância
| --------- | -------          |-------     |-------        |-------        |-------
| HC-SR312  |2.7-12V           | 2 segundos  | 2 segundos     | Repetível    | 3-5 metros
| HC-SR505  |4.5-20V           | 2 segundos  | 2 segundos     | Repetível    | 3 metros
| HC-SR501  |4.5-20V           | Ajustável  | Ajustável    | Ajustável    | 3 metros a 7 metros

### HC-SR501 vs HC-SR505 vs AM312 (HC-SR312): qual escolher?

O HC-SR312 é o módulo PIR mini construído em torno do sensor AM312, então os dois nomes se referem à mesma peça.

- **HC-SR501**: o maior módulo e o único que pode ser ajustado. Tem dois potenciômetros (sensibilidade e tempo de atraso) e um jumper para disparo único ou repetido. Escolha-o quando precisar de maior alcance ou quiser ajustar o comportamento. Precisa de pelo menos 4,5 V, então alimente-o pelo 5V / VIN.
- **HC-SR505**: um módulo pequeno com ajustes fixos. Não há nada para ajustar. Também precisa de pelo menos 4,5 V.
- **AM312 / HC-SR312**: o menor módulo, também com ajustes fixos. Funciona a partir de 2,7 V, então pode ser alimentado diretamente pelo pino **3.3V**. É a melhor opção para placas ESP32 / ESP8266 e projetos alimentados por bateria.

Os três têm os mesmos três pinos: **VCC**, **OUT** e **GND**. A ordem dos pinos é diferente em cada módulo, então confira as marcações na placa antes de ligar. O mesmo código funciona para todos.

### Introdução rápida aos Sensores de Movimento PIR

Sensores de movimento de infravermelho passivo (PIR) detectam a presença de pessoas ou animais medindo mudanças na radiação infravermelha. Sensores PIR funcionam detectando a radiação infravermelha emitida por todos os objetos que têm uma temperatura acima do zero absoluto. Quando uma pessoa ou animal se move para o campo de visão de um sensor PIR, o sensor detecta uma mudança na quantidade de radiação infravermelha e dispara um alarme ou outra saída. Sensores PIR são uma maneira versátil e econômica de detectar movimento. Eles são fáceis de usar e podem ser instalados em uma variedade de locais.

A saída do Sensor de Movimento PIR é:

- ``HIGH`` quando um movimento é detectado.
- ``LOW`` quando nenhum movimento é detectado.

Para obter medições precisas, **aguarde o sensor PIR calibrar adequadamente, isso normalmente levará de 10 a 60 segundos** após ligá-lo.

O HC-SR501 tem configurações ajustáveis:

![Sinric Pro esp8266 HC-SR501 ]({{ site.github.url }}/public/img/sinric_pro_pir_sensor.png) 

###### Ajuste de Sensibilidade

- A distância de medição está entre 3 e 7 metros.

- Girando no sentido horário ou à direita - Diminui a sensibilidade. Totalmente à direita até 3 metros.

- Girando no sentido anti-horário ou à esquerda - Diminui a sensibilidade. Totalmente à esquerda cerca de 7 metros.

###### Ajuste de Tempo de Atraso

- Tempo de atraso que define por quanto tempo a saída do HC-SR501 permanece ``HIGH`` após um movimento ser detectado. Pode ser ajustado de 1 segundo a cerca de 5 minutos.

- Girando no sentido horário ou à direita - Aumenta o atraso. Totalmente à direita até 5 minutos.

- Girando no sentido anti-horário ou à esquerda - Diminui o atraso. Totalmente à esquerda cerca de 3 segundos.


###### Configuração do Jumper

- **Modo de Disparo Único (L)**: Dispara um único movimento. O potenciômetro de tempo de atraso determina por quanto tempo o pino permanecerá ``HIGH``. Qualquer detecção adicional de movimento é bloqueada até retornar para ``LOW``.

**Exemplo**: O tempo de atraso do detector de movimento está definido para 3 segundos, mas não pode detectar movimento por cerca de 6 segundos após detectar movimento.

![Sinric Pro esp8266 PIR Single Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_single_trigger.png) 

- **Modo de Disparo Múltiplo (H)**: Dispara uma série de movimentos. O potenciômetro de tempo de atraso determina por quanto tempo o pino permanecerá ``HIGH``. No modo de disparo múltiplo, o tempo de atraso é reiniciado cada vez que movimento é detectado, então não há bloqueio de detecção adicional.

**Exemplo**: O tempo de atraso é de 3 segundos. Após movimento ser detectado, o período de tempo de atraso reinicia. No entanto, a detecção ainda é bloqueada por 3 segundos após o tempo de atraso expirar. Este atraso de 3 segundos permite que o sensor descanse antes de começar a detectar movimento novamente.

![Sinric Pro esp8266 PIR Multiple Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_multi_trigger.png) 

### Fiação

![Sinric Pro esp8266 PIR wiring]({{ site.github.url }}/public/img/sinric_pro_pir_sensor_wiring.png) 


| MCU       | Pino PIR    |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    5 (D1)    |
| Pico W    |    GP5  |

Vamos verificar se o sensor de movimento está conectado corretamente e funcionando.

```cpp
#if defined(ESP8266)
  #define SENSOR_PIN        D1
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

int newState;
int oldState;

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
  
  Serial.printf("Wait 10 secs for the PIR sensor to calibrate properly\r\n");
  delay(1000 * 10);
  oldState = digitalRead(SENSOR_PIN); // read the starting state
}

void loop() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Movement detected!");
    } else {
      Serial.println("Movement not detected!");
    }
    oldState = newState;
  }  
   delay(100);
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/bc5a7152c02e4e692ca9ae6708fe6814)


O Monitor Serial do Arduino IDE mostrará as detecções de movimento assim:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-motion-sensor-demo.mp4" type="video/mp4">
</video>

 
### Passo 1: Criar um novo dispositivo no Sinric Pro

* [Faça login](http://portal.sinric.pro) na sua conta Sinric Pro, vá ao menu **Dispositivos** à esquerda e clique no botão **Adicionar Dispositivo** (no canto superior esquerdo).
* Digite o nome do dispositivo **Sensor de Movimento**, descrição **Meu Sensor de Movimento** e selecione o tipo de dispositivo como **Motion Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Clique em **Próximo** na aba Notificações

![Sinric Pro motion sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_motion_sensor_notifications.png)

Você pode definir o limite aqui para receber uma notificação push via aplicativo Sinric Pro quando movimento é detectado durante o **Dia** ou **Noite**. Use o Tempo de Re-disparo para definir o atraso entre notificações push.

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
#include "SinricProMotionsensor.h" 

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define MOTION_SENSOR_ID  ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
 
#if defined(ESP8266)
  #define SENSOR_PIN        D1
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif 

int newState;
int oldState;

void handleMotionSensor() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Movement detected!");
    } else {
      Serial.println("Movement not detected!");
    }

    // newState == true (HIGH) : if motion has been detected 
    // newState == false (LOW): if no motion has been detected

    SinricProMotionsensor &myMotionsensor = SinricPro[MOTION_SENSOR_ID]; // get motion sensor device
    myMotionsensor.sendMotionEvent(newState);

    oldState = newState;
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
  IPAddress localIP = WiFi.localIP();
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}
 
// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProMotionsensor &mySensor = SinricPro[MOTION_SENSOR_ID];
   
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  //SinricPro.restoreDeviceStates(true); // Uncomment to restore the last known state from the server.
  SinricPro.begin(APP_KEY, APP_SECRET);  
}

void setupMotionSensor() {
  pinMode(SENSOR_PIN, INPUT);
  Serial.printf("Wait 10 secs for the PIR sensor to calibrate properly\r\n");
  delay(1000 * 10);  
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  
  setupMotionSensor();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
  handleMotionSensor();
}
```

[View this code on GitHub Gist](https://gist.github.com/kakopappa/f4fd3d769144689f15cfc80d783e8c94)

 
Agora você deve conseguir visualizar os movimentos via Alexa, SmartThings
  
![Sinric Pro motions via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_contact_motion_home_alexa_smartthings.png)

via Portal

![Sinric Pro Portal motion sensor]({{ site.github.url }}/public/img/sinric_pro_contact_motion_portal.png)

Note que Google Home não é suportado.

### Solução de Problemas

1. Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para mais detalhes.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)