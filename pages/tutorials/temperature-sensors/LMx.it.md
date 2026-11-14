---
title: Sensore di temperatura LM35, LM335 e LM34 con ESP32 o ESP8266 per Alexa
layout: post
lang: it
description: Collega un sensore di temperatura LM35, LM335 o LM34 a un ESP32 o ESP8266. Differenze tra LM35, LM335 e LM34, piedinature, cablaggio e codice per Alexa e Google Home.
---

In questa sezione vedremo come realizzare un **sensore di temperatura** con **ESP32** o **ESP8266** e come visualizzare poi la temperatura tramite **Alexa, Google Home o SmartThings**.

### Prerequisiti : 

1. ESP32, ESP8266 x 1.
2. LM35, LM335 e LM34 x 1.
3. Cavetti jumper.

### Breve introduzione al sensore di temperatura

I sensori di temperatura LM35/LM34 sono sensori di temperatura lineari a circuito integrato che funzionano misurando la caduta di tensione tra base ed emettitore di un transistor collegato a diodo. La caduta di tensione tra base ed emettitore di un transistor collegato a diodo diminuisce a un ritmo noto all'aumentare della temperatura.  

- L'LM35 fornisce misure di temperatura in gradi Celsius (°C)

- L'LM34 fornisce misure di temperatura in gradi Fahrenheit (ºF). 

- L'LM335 fornisce misure di temperatura in Kelvin (ºK)

### LM35, LM335 e LM34: qual è la differenza?

Tutti e tre i sensori forniscono in uscita una tensione analogica che aumenta di 10 mV per grado. Differiscono per la scala di temperatura, la tensione di alimentazione e il modo in cui vengono collegati.

| | LM35 | LM34 | LM335 |
| --- | --- | --- | --- |
| Scala di uscita | 10 mV per °C | 10 mV per °F | 10 mV per K |
| Uscita a 25 °C (77 °F) | 0,25 V | 0,77 V | 2,98 V |
| Tipo di sensore | Uscita in tensione a 3 pin | Uscita in tensione a 3 pin | A 2 terminali (tipo zener) con un pin di regolazione |
| Alimentazione | Da 4 V a 30 V | Da 5 V a 30 V | Corrente di polarizzazione tramite una resistenza |
| Componenti aggiuntivi | Nessuno | Nessuno | Resistenza di pull-up (polarizzazione) |
| Calibrazione | Tarato in fabbrica | Tarato in fabbrica | Regolabile con il pin ADJ |

**Quale dovresti usare?**

- **LM35**: la scelta più semplice se vuoi i gradi Celsius. La lettura è l'uscita in millivolt divisa per 10.
- **LM34**: lo stesso sensore per i gradi Fahrenheit. Usalo se vuoi i °F senza conversioni.
- **LM335**: l'uscita è in Kelvin, quindi sottrai 273,15 per ottenere i gradi Celsius. Richiede una resistenza di pull-up e a temperatura ambiente l'uscita è intorno a 3 V, quindi gli serve un intervallo dell'ADC più ampio rispetto all'LM35.

L'LM35 e l'LM34 richiedono almeno 4 V e 5 V, quindi alimentali dal pin **5V / VIN**, non dai 3.3V.

### Piedinatura di LM35, LM34 e LM335

Tieni il package TO-92 con il **lato piatto rivolto verso di te e i piedini rivolti verso il basso**. Da sinistra a destra:

| Sensore | Pin 1 (sinistra) | Pin 2 (centro) | Pin 3 (destra) |
| --- | --- | --- | --- |
| LM35 | +Vs (alimentazione) | Vout | GND |
| LM34 | +Vs (alimentazione) | Vout | GND |
| LM335 | ADJ (lascialo scollegato) | + (uscita) | − (GND) |

### Convertire la lettura in una temperatura

```c++
// ADC_VREF_MV: ADC reference voltage in millivolts, ADC_RESOLUTION: 4096 on ESP32, 1024 on ESP8266
float millivolts = analogRead(ADC_PIN) * (ADC_VREF_MV / ADC_RESOLUTION);

float lm35_celsius    = millivolts / 10.0;           // LM35
float lm34_fahrenheit = millivolts / 10.0;           // LM34
float lm335_celsius   = (millivolts / 10.0) - 273.15; // LM335 (Kelvin to Celsius)
```

### Cablaggio di LM35 o LM34 con ESP8266

![Sinric Pro LM35 or LM34 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM35-and-LM34_Wiring.png) 

### Cablaggio di LM335 con ESP8266

![Sinric Pro LM335 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM335_Wiring.png) 

**Pull-up tramite resistenza da 2,2k Ohm** 

| MCU       | Pin GPIO     |
| --------- | ------- |
| ESP32     |    36 (ADC0)  |
| ESP8266   |    A0 (ADC0)  |

Verifichiamo che il sensore di temperatura sia cablato correttamente e funzioni. 


```cpp
#if defined(ESP8266)
  #define LM_PIN    A0
#elif defined(ESP32)
  #define LM_PIN    36
#endif

#define ADC_VREF_mV    5000.0 // 5000 is the voltage provided by MCU. If you connect to 3V change to 3000
#define ADC_RESOLUTION 4096.0

void setup() {
  Serial.begin(9600);
}

float getTemperature() {
  #if defined(ESP8266)
    int analogValue = analogRead(LM_PIN);
    float millivolts = (analogValue / 1024.0) * ADC_VREF_mV; 
    float temperature = millivolts / 10;
    // float fahrenheit = ((temperature * 9) / 5 + 32);
    return temperature;
  #elif defined(ESP32)
    int adcVal = analogRead(LM_PIN);
    float milliVolt = adcVal * (ADC_VREF_mV / ADC_RESOLUTION);
    float temperature = milliVolt / 10;
    return temperature;
  #endif
}

void loop()
{
  float temperature = getTemperature();
  Serial.printf("Temperature: %2.1f °C\r\n", temperature);
  delay(1000);
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/35beffd648f962299c7df485b7f13124)

 
### Passo 1 : Crea un nuovo dispositivo in Sinric Pro

* [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro, apri il menu **Devices** a sinistra e fai clic sul pulsante **Add Device** (in alto a sinistra).
* Inserisci il nome del dispositivo **Temperature Sensor**, la descrizione **My Temperature Sensor** e seleziona il tipo di dispositivo **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Fai clic su **Next** nella scheda Notifications

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Qui puoi impostare la soglia per ricevere una notifica push tramite l'app Sinric Pro quando la temperatura scende **sotto** o sale **sopra** un certo valore. Usa il Retrigger Time per impostare l'intervallo tra le notifiche.

* Apri la scheda Others e fai clic su **Save**

* La schermata successiva mostra le credenziali necessarie per collegare il dispositivo appena creato.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** e **App Secret** ***Tieni questi valori al sicuro. NON CONDIVIDERLI SU FORUM PUBBLICI !***

### Passo 2 : Collegati a Sinric Pro 

#### Passo 2.1 Installa la libreria Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
Puoi **generare il codice** con la funzione **Zero Code** oppure scriverlo da solo. Se non hai esperienza di programmazione, ti consigliamo di usare la funzione Zero Code nel Portal per generare il codice, scaricarlo e caricarlo sulla scheda.

#### 2.2 Codice completo
  

```cpp
#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif 

#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32)
  #include <WiFi.h>
#endif

#if defined(ESP8266)
  #define LM_PIN    A0
#elif defined(ESP32)
  #define LM_PIN    36
#endif


#include "SinricPro.h"
#include "SinricProTemperaturesensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define TEMP_SENSOR_ID    ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

float temperature;                            // actual temperature
float humidity;                               // actual humidity
float lastTemperature;                        // last known temperature (for compare)

#define ADC_VREF_mV    5000.0 // 5000 is the voltage provided by MCU. If you connect to 3V change to 3000
#define ADC_RESOLUTION 4096.0

float getTemperature() {
  #if defined(ESP8266)
    int analogValue = analogRead(LM_PIN);
    float millivolts = (analogValue / 1024.0) * ADC_VREF_mV; 
    float temperature = millivolts / 10;
    // float fahrenheit = ((temperature * 9) / 5 + 32);
    return temperature;
  #elif defined(ESP32)
    int adcVal = analogRead(LM_PIN);
    float milliVolt = adcVal * (ADC_VREF_mV / ADC_RESOLUTION);
    float temperature = milliVolt / 10;
    return temperature;
  #endif
}

void handleTemperaturesensor() {
  if (SinricPro.isConnected() == false) {
    Serial.printf("Not connected to Sinric Pro...!\r\n");
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
  
  float temperature = getTemperature();

  Serial.printf("Temperature: %2.1f °C\r\n", temperature);

  if (isnan(temperature)) { // reading failed... 
    Serial.printf("reading failed!\r\n");  // print error message
    return;                                    // try again next time
  } 

  if (temperature == lastTemperature) {
    Serial.printf("Temperature did not changed. do nothing...!\r\n");
    return; 
  }

  SinricProTemperaturesensor &mySensor = SinricPro[TEMP_SENSOR_ID];  // get temperaturesensor device
  bool success = mySensor.sendTemperatureEvent(temperature, -1); // send event
  if (success) {  
    Serial.printf("Sent!\r\n");
  } else {
    Serial.printf("Something went wrong...could not send Event to server!\r\n"); // Enable ENABLE_DEBUG to see why
  }

  lastTemperature = temperature;  // save actual temperature for next compare  
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
   
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
  handleTemperaturesensor();
}
```

[Vedi questo codice su GitHub Gist](https://gist.github.com/kakopappa/8806b5eeb0203252c5aed42849bd1481)

 
Ora dovresti riuscire a visualizzare la temperatura nell'app Sinric Pro
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Tieni presente che l'app Google Home mostra il sensore di temperatura come termostato a causa di alcune limitazioni di Google Home.

### Risoluzione dei problemi
1. Per maggiori dettagli consulta la nostra pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).
 

### Tutorial correlati

- [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html)
- [Sensore di temperatura e umidità DHT11, DHT22, AM2302]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.it.html)
- [Sensore di temperatura DS18B20]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/DS18B20.it.html)
- [Sensore di temperatura e umidità BME280]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/BME280.it.html)
- [Sensore di temperatura BMP180]({{ site.github.url }}/it/pages/tutorials/temperature-sensors/BMP180.it.html)

> Questo documento è open source. Hai trovato un errore di battitura? Crea una [issue](https://github.com/sinricpro/help-docs)
