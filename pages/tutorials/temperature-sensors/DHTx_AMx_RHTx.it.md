---
title: Sensore di temperatura e umidità DHT11 e DHT22 con ESP32 o ESP8266 per Alexa e Google Home
layout: post
lang: it
description: Collega un sensore di temperatura e umidità DHT11, DHT22, AM2302 o RHT03 a un ESP32 o ESP8266 e leggilo con Alexa o Google Home.
---

In questa sezione vediamo passo passo come creare un **sensore di temperatura** con **ESP32** o **ESP8266** e poi visualizzare la temperatura tramite **Alexa, Google Home o SmartThings**.

### Prerequisiti : 

1. ESP32, ESP8266 x 1.
2. DHT11 o DHT22, AM2302, RHT03 x 1.
3. Cavi jumper.

### Breve introduzione al sensore di temperatura

Le serie DHT e AM sono sensori digitali economici per rilevare temperatura e umidità. Usano un sensore di umidità capacitivo e un termistore per misurare l'aria circostante e poi restituiscono un segnale digitale sul pin dati. 


### Cablaggio

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial.png) 

Nota: alcuni sensori DHT22 non sono forniti di resistenza di pull-up, quindi potresti doverne collegare una tu stesso. Si usa in genere una resistenza da 10k, collegata dal pin dati del sensore all'alimentazione a +3.3V o +5V. 


| MCU       | Pin DHT     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    14 (D5)    |


### Configura la libreria arduino-DHT 

Useremo la libreria [arduino-DHT](https://github.com/markruys/arduino-DHT) per leggere la temperatura e l'umidità dal nostro sensore. Vai su [arduino-DHT](https://github.com/markruys/arduino-DHT) e scarica la libreria come file zip. 

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/download-arduino-DHT-library.png) 

Poi estrai il file zip in `C:\Users\<username>\Documents\Arduino\libraries\arduino-DHT`. Ecco come dovrebbe apparire.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/extract-arduino-DHT-library.png) 

Verifichiamo che il sensore di temperatura sia collegato correttamente e funzioni. 


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

[Visualizza questo codice su GitHub Gist](https://gist.github.com/kakopappa/08c5cd5bbee8da13e6ca081afd017974)


Il Monitor seriale di Arduino IDE mostrerà la temperatura attuale così

![Sinric Pro DHT Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_sensor_readings.png)

### Passo 1 : Crea un nuovo dispositivo in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, vai al menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Temperature Sensor**, la descrizione **My Temperature Sensor** e seleziona come tipo di dispositivo **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Fai clic su **Next** nella scheda Notifications

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Qui puoi impostare la soglia per ricevere una notifica push tramite l'app Sinric Pro quando la temperatura scende **sotto** o sale **sopra** un certo valore. Usa il Retrigger Time per impostare il ritardo tra le notifiche.

* Fai clic sulla scheda Others e poi su **Save**

* La schermata successiva mostrerà le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

### Passo 2 : Connettiti a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Puoi **generare il codice** con la funzione **Zero Code** oppure scriverlo tu stesso. Se non hai esperienza di programmazione, ti consigliamo di usare la funzione Zero Code nel Portal per generare il codice, scaricarlo e caricarlo.

#### 2.2 Codice completo
  

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

[Visualizza questo codice su GitHub Gist](https://gist.github.com/kakopappa/a6574e1e0c57a5cdcb46d357a5dd6ee3)

 
Ora dovresti riuscire a vedere la temperatura tramite l'app Sinric Pro
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Grafici tramite il Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_portal_temperature_sensor.png)

Alexa, Google Home e SmartThings

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_alexa_googlehome_smartthings_temperature_sensor.png)

Nota che l'app Google Home mostra il sensore di temperatura come un Thermostat, per limitazioni di Google Home.

### Risoluzione dei problemi

1. errore: no matching function for call to 'DHT::DHT()' oppure errore: 'class DHT' has no member named 'getMinimumSamplingPeriod'

    **Soluzione**: assicurati di avere installato la libreria DHT corretta. Questo esempio è stato realizzato con https://github.com/markruys/arduino-DHT. Rimuovi eventuali altre librerie DHT che potresti avere installato in precedenza, ad es.: https://github.com/adafruit/DHT-sensor-library

2. Errore di compilazione: DHT.h: No such file or directory

    **Soluzione**: assicurati di avere installato la libreria DHT corretta. 

2. Consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html) per maggiori dettagli.


 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di temperatura e umidità BME280]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/BME280.it.html)
- [Sensore di temperatura DS18B20]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/DS18B20.it.html)
- [Sensore di temperatura BMP180]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/BMP180.it.html)
- [Sensore di temperatura LM35, LM335 e LM34]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/LMx.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)