---
title: LM35, LM335 und LM34 Temperatursensor mit ESP32 oder ESP8266 für Alexa
layout: post
lang: de
description: Verbinde einen LM35-, LM335- oder LM34-Temperatursensor mit einem ESP32 oder ESP8266. Behandelt die Unterschiede zwischen LM35, LM335 und LM34, Pinouts, Verdrahtung und Code für Alexa und Google Home.
---

In diesem Abschnitt zeigen wir dir, wie du einen **Temperatursensor** mit **ESP32**, **ESP8266** baust und die Temperatur dann über **Alexa, Google Home oder SmartThings** ansiehst.

### Voraussetzungen : 

1. ESP32, ESP8266 x 1.
2. LM35, LM335 und LM34 x 1.
3. Jumperkabel.

### Kurze Einführung zum Temperatursensor

Die LM35/LM34 Temperatursensoren sind lineare integrierte Schaltungs-Temperatursensoren, die den Spannungsabfall zwischen Basis und Emitter eines als Diode geschalteten Transistors messen. Der Spannungsabfall zwischen Basis und Emitter eines als Diode geschalteten Transistors sinkt mit bekannter Rate, wenn die Temperatur steigt.  

- LM35 liefert Temperaturmessungen in Celsius (°C)

- LM34 liefert Temperaturmessungen in Fahrenheit (ºF). 

- LM335 liefert Temperaturmessungen in Kelvin (ºK)

### LM35 vs. LM335 vs. LM34: Was ist der Unterschied?

Alle drei Sensoren geben eine analoge Spannung aus, die um 10 mV pro Grad steigt. Sie unterscheiden sich in der Temperaturskala, der Versorgungsspannung und der Verdrahtung.

| | LM35 | LM34 | LM335 |
| --- | --- | --- | --- |
| Ausgangsskala | 10 mV pro °C | 10 mV pro °F | 10 mV pro K |
| Ausgang bei 25 °C (77 °F) | 0,25 V | 0,77 V | 2,98 V |
| Sensortyp | 3-Pin-Spannungsausgang | 3-Pin-Spannungsausgang | 2-Pin (zenerdiodenähnlich) mit Abgleichpin |
| Versorgung | 4 V bis 30 V | 5 V bis 30 V | Biasstrom über einen Widerstand |
| Zusätzliche Teile | Keine | Keine | Pull-up-(Bias-)Widerstand |
| Kalibrierung | Werksseitig abgeglichen | Werksseitig abgeglichen | Kann über den ADJ-Pin abgeglichen werden |

**Welchen solltest du verwenden?**

- **LM35**: die einfachste Wahl, wenn du Celsius willst. Der Messwert ist die Ausgangsspannung in Millivolt geteilt durch 10.
- **LM34**: derselbe Sensor für Fahrenheit. Verwende ihn, wenn du °F ohne Umrechnung willst.
- **LM335**: Der Ausgang liegt in Kelvin, also ziehe 273,15 ab, um Celsius zu erhalten. Er braucht einen Pull-up-Widerstand, und der Ausgang liegt bei Raumtemperatur bei etwa 3 V, daher braucht er einen größeren ADC-Bereich als der LM35.

Der LM35 und LM34 benötigen mindestens 4 V bzw. 5 V, versorge sie also über den **5V-/VIN**-Pin, nicht über 3,3V.

### Pinout von LM35, LM34 und LM335

Halte das TO-92-Gehäuse mit der **flachen Seite zu dir und den Beinchen nach unten**. Von links nach rechts:

| Sensor | Pin 1 (links) | Pin 2 (Mitte) | Pin 3 (rechts) |
| --- | --- | --- | --- |
| LM35 | +Vs (Versorgung) | Vout | GND |
| LM34 | +Vs (Versorgung) | Vout | GND |
| LM335 | ADJ (nicht anschließen) | + (Ausgang) | − (GND) |

### Den Messwert in eine Temperatur umrechnen

```c++
// ADC_VREF_MV: ADC reference voltage in millivolts, ADC_RESOLUTION: 4096 on ESP32, 1024 on ESP8266
float millivolts = analogRead(ADC_PIN) * (ADC_VREF_MV / ADC_RESOLUTION);

float lm35_celsius    = millivolts / 10.0;           // LM35
float lm34_fahrenheit = millivolts / 10.0;           // LM34
float lm335_celsius   = (millivolts / 10.0) - 273.15; // LM335 (Kelvin to Celsius)
```

### Verdrahtung für LM35 oder LM34 mit ESP8266

![Sinric Pro LM35 or LM34 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM35-and-LM34_Wiring.png) 

### Verdrahtung für LM335 mit ESP8266

![Sinric Pro LM335 wiring]({{ site.github.url }}/public/img/sinricpro_temperature_sensor_LM335_Wiring.png) 

**Pull-up über 2,2k-Ohm-Widerstand** 

| MCU       | GPIO Pin     |
| --------- | ------- |
| ESP32     |    36 (ADC0)  |
| ESP8266   |    A0 (ADC0)  |

Prüfen wir, ob die Temperatur richtig verdrahtet ist und funktioniert. 


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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/35beffd648f962299c7df485b7f13124)

 
### Schritt 1 : Ein neues Gerät in Sinric Pro anlegen

* [Melde dich an](http://portal.sinric.pro) bei deinem Sinric Pro Konto, gehe links im Menü zu **Devices** und klicke oben links auf **Add Device**.
* Gib den Gerätenamen **Temperature Sensor**, die Beschreibung **My Temperature Sensor** ein und wähle als Gerätetyp **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Klicke im Tab Notifications auf **Next**

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Hier kannst du den Schwellenwert festlegen, um eine Push-Benachrichtigung über die Sinric Pro App zu erhalten, wenn die Temperatur **unter** oder **über** einen bestimmten Wert fällt bzw. steigt. Nutze die Retrigger Time, um die Verzögerung zwischen Benachrichtigungen festzulegen.

* Klicke auf den Tab Others und dann auf **Save**

* Der nächste Bildschirm zeigt die Zugangsdaten, die du brauchst, um das gerade erstellte Gerät zu verbinden.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret** ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
Du kannst den **Code generieren** mit der Funktion **Zero Code** oder ihn selbst schreiben. Hast du keine Programmiererfahrung, empfehlen wir die Zero-Code-Funktion im Portal, um den Code zu generieren, herunterzuladen und zu flashen.

#### 2.2 Vollständiger Code
  

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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/8806b5eeb0203252c5aed42849bd1481)

 
Jetzt kannst du die Temperatur über die Sinric Pro App ansehen
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Bitte beachte, dass die Google Home App den Temperatursensor aufgrund von Einschränkungen von Google Home als Thermostat anzeigt.

### Fehlerbehebung
1. Mehr Details findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).
 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [DHT11, DHT22, AM2302 Temperatur- und Feuchtigkeitssensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.de.html)
- [DS18B20 Temperatursensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/DS18B20.de.html)
- [BME280 Temperatur- und Feuchtigkeitssensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/BME280.de.html)
- [BMP180 Temperatursensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/BMP180.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
