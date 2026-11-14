---
title: Sensor de temperatura y humedad DHT11 y DHT22 con ESP32 o ESP8266 para Alexa y Google Home
layout: post
lang: es
description: Conecta un sensor de temperatura y humedad DHT11, DHT22, AM2302 o RHT03 a un ESP32 o ESP8266 y léelo con Alexa o Google Home.
---

En esta sección vamos a crear un **sensor de temperatura** usando **ESP32**, **ESP8266** y luego veremos la temperatura a través de **Alexa, Google Home o SmartThings**.

### Requisitos previos : 

1. ESP32, ESP8266 x 1.
2. DHT11 o DHT22, AM2302, RHT03 x 1.
3. Cables jumper.

### Breve introducción al sensor de temperatura

Las series DHT y AM son sensores digitales de bajo coste para medir temperatura y humedad. Usan un sensor de humedad capacitivo y un termistor para medir el aire circundante, y luego emiten una señal digital en el pin de datos. 


### Cableado

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial.png) 

Nota: Algunos sensores DHT22 no incluyen una resistencia pull-up, por lo que puede que tengas que conectar una tú mismo. Normalmente se usa una resistencia de 10k, que debe conectarse desde el pin de datos del sensor a la alimentación de +3.3V o +5V. 


| MCU       | Pin del DHT     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    14 (D5)    |


### Configura la librería arduino-DHT 

Vamos a usar la librería [arduino-DHT](https://github.com/markruys/arduino-DHT) para leer la temperatura y la humedad de nuestro sensor. Ve a [arduino-DHT](https://github.com/markruys/arduino-DHT) y descarga la librería como un archivo zip. 

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/download-arduino-DHT-library.png) 

Luego extrae el archivo zip en `C:\Users\<username>\Documents\Arduino\libraries\arduino-DHT`. Así es como debería quedar.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/extract-arduino-DHT-library.png) 

Vamos a comprobar que la temperatura está bien cableada y funciona. 


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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/08c5cd5bbee8da13e6ca081afd017974)


El Monitor Serie de Arduino IDE mostrará la temperatura actual de esta manera

![Sinric Pro DHT Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_sensor_readings.png)

### Paso 1 : Crea un nuevo dispositivo en Sinric Pro

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, abre el menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).
* Escribe el nombre del dispositivo **Temperature Sensor**, la descripción **My Temperature Sensor** y selecciona el tipo de dispositivo **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Haz clic en **Next** en la pestaña Notifications

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Aquí puedes configurar el umbral para recibir una notificación push a través de la app de Sinric Pro cuando la temperatura baje **por debajo** o suba **por encima** de un valor determinado. Usa el tiempo de reactivación (Retrigger Time) para definir el retardo entre notificaciones.

* Haz clic en la pestaña Others y después en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret** ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Puedes **generar el código** usando la función **Zero Code** o escribirlo tú mismo. Si no tienes experiencia con la programación, te recomendamos usar la función Zero Code del Portal para generar el código, descargarlo y flashearlo.

#### 2.2 Código completo
  

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

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/a6574e1e0c57a5cdcb46d357a5dd6ee3)

 
Ahora deberías poder ver la temperatura a través de la app de Sinric Pro
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Gráficos a través del Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_portal_temperature_sensor.png)

Alexa, Google Home y SmartThings

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_alexa_googlehome_smartthings_temperature_sensor.png)

Ten en cuenta que la app de Google Home muestra el sensor de temperatura como un termostato debido a las limitaciones de Google Home.

### Solución de problemas

1. error: no matching function for call to 'DHT::DHT()' o error: 'class DHT' has no member named 'getMinimumSamplingPeriod'

    **Solución**: Asegúrate de tener instalada la librería DHT correcta. Este ejemplo se hizo con https://github.com/markruys/arduino-DHT. Elimina cualquier otra librería DHT que hayas instalado antes, por ejemplo: https://github.com/adafruit/DHT-sensor-library

2. Error de compilación: DHT.h: No such file or directory

    **Solución**: Asegúrate de tener instalada la librería DHT correcta. 

2. Consulta nuestra página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más información.


 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Sensor de temperatura y humedad BME280]({{ site.github.url }}/es/pages/tutorials/temperature-sensors/BME280.es.html)
- [Sensor de temperatura DS18B20]({{ site.github.url }}/es/pages/tutorials/temperature-sensors/DS18B20.es.html)
- [Sensor de temperatura BMP180]({{ site.github.url }}/es/pages/tutorials/temperature-sensors/BMP180.es.html)
- [Sensor de temperatura LM35, LM335 y LM34]({{ site.github.url }}/es/pages/tutorials/temperature-sensors/LMx.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)