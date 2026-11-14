---
title: DHT11- und DHT22-Temperatur- und Feuchtigkeitssensor mit ESP32 oder ESP8266 für Alexa und Google Home
layout: post
lang: de
description: Verbinde einen DHT11-, DHT22-, AM2302- oder RHT03-Temperatur- und Feuchtigkeitssensor mit einem ESP32 oder ESP8266 und lies ihn über Alexa oder Google Home aus.
---

In diesem Abschnitt zeigen wir dir Schritt für Schritt, wie du mit **ESP32** oder **ESP8266** einen **Temperatursensor** aufbaust und die Temperatur anschließend über **Alexa, Google Home oder SmartThings** anzeigst.

### Voraussetzungen : 

1. ESP32 oder ESP8266 x 1.
2. DHT11 oder DHT22, AM2302, RHT03 x 1.
3. Jumperkabel.

### Kurze Einführung zum Temperatursensor

Die DHT- und AM-Serien sind kostengünstige digitale Sensoren zur Messung von Temperatur und Luftfeuchtigkeit. Sie verwenden einen kapazitiven Feuchtesensor und einen Thermistor, um die umgebende Luft zu messen, und geben anschließend ein digitales Signal am Datenpin aus. 


### Verdrahtung

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial.png) 

Hinweis: Manche DHT22-Sensoren werden ohne Pull-up-Widerstand geliefert, sodass du selbst einen anschließen musst. Üblich ist ein 10k-Widerstand, der vom Datenpin des Sensors zur +3,3V- oder +5V-Versorgung geschaltet wird. 


| MCU       | DHT Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    14 (D5)    |


### arduino-DHT Bibliothek einrichten 

Wir verwenden die [arduino-DHT](https://github.com/markruys/arduino-DHT) Bibliothek, um Temperatur und Luftfeuchtigkeit von unserem Sensor auszulesen. Gehe zu [arduino-DHT](https://github.com/markruys/arduino-DHT) und lade die Bibliothek als ZIP-Datei herunter. 

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/download-arduino-DHT-library.png) 

Entpacke die ZIP-Datei anschließend nach `C:\Users\<username>\Documents\Arduino\libraries\arduino-DHT`. So sollte es aussehen.

![Sinric Pro esp8266 DHT22 wiring]({{ site.github.url }}/public/img/extract-arduino-DHT-library.png) 

Prüfen wir zuerst, ob die Temperaturmessung richtig verdrahtet ist und funktioniert. 


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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/08c5cd5bbee8da13e6ca081afd017974)


Der serielle Monitor der Arduino IDE zeigt die aktuelle Temperatur dann so an

![Sinric Pro DHT Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_sensor_readings.png)

### Schritt 1 : Neues Gerät in Sinric Pro anlegen

* [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an, öffne links das Menü **Devices** und klicke auf die Schaltfläche **Add Device** (oben links).
* Gib als Gerätenamen **Temperature Sensor** und als Beschreibung **My Temperature Sensor** ein und wähle den Gerätetyp **Temperature Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_dht_tutorial_portal_new_device.png)

* Klicke im Tab Notifications auf **Next**

![Sinric Pro temperature sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_temperature_sensor_tutorial_device_notifications.png)

Hier kannst du einen Schwellenwert festlegen, um über die Sinric Pro App eine Push-Benachrichtigung zu erhalten, wenn die Temperatur **unter** oder **über** einen bestimmten Wert fällt bzw. steigt. Nutze die Retrigger Time, um die Verzögerung zwischen Benachrichtigungen festzulegen.

* Klicke auf den Tab Others und dann auf **Save**

* Die nächste Seite zeigt die Zugangsdaten, die das eben angelegte Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Du kannst den **Code generieren** lassen über die **Zero Code** Funktion oder ihn selbst schreiben. Wenn du keine Programmiererfahrung hast, empfehlen wir, die Zero Code Funktion im Portal zu nutzen, um den Code zu generieren, herunterzuladen und zu flashen.

#### 2.2 Vollständiger Code
  

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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/a6574e1e0c57a5cdcb46d357a5dd6ee3)

 
Jetzt solltest du die Temperatur über die Sinric Pro App sehen können
  
![Sinric Pro App Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_app_temperature_sensor.png)

Diagramme über das Portal

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_portal_temperature_sensor.png)

Alexa, Google Home und SmartThings

![Sinric Pro Portal Temperature Sensor]({{ site.github.url }}/public/img/sinric_pro_alexa_googlehome_smartthings_temperature_sensor.png)

Bitte beachte, dass die Google Home App den Temperatursensor aufgrund von Einschränkungen von Google Home als Thermostat anzeigt.

### Fehlerbehebung

1. Fehler: no matching function for call to 'DHT::DHT()' oder error: 'class DHT' has no member named 'getMinimumSamplingPeriod'

    **Lösung**: Stelle sicher, dass die richtige DHT-Bibliothek installiert ist. Dieses Beispiel wurde mit https://github.com/markruys/arduino-DHT erstellt. Entferne alle anderen DHT-Bibliotheken, die du zuvor eventuell installiert hast, z. B. https://github.com/adafruit/DHT-sensor-library

2. Kompilierungsfehler: DHT.h: No such file or directory

    **Lösung**: Stelle sicher, dass die richtige DHT-Bibliothek installiert ist. 

2. Weitere Details findest du auf unserer Seite zur [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html).


 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [BME280 Temperatur- und Feuchtigkeitssensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/BME280.de.html)
- [DS18B20 Temperatursensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/DS18B20.de.html)
- [BMP180 Temperatursensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/BMP180.de.html)
- [LM35, LM335 und LM34 Temperatursensor]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/LMx.de.html)

> Dieses Dokument ist Open Source. Einen Tippfehler entdeckt? Bitte erstelle ein [Issue](https://github.com/sinricpro/help-docs)
