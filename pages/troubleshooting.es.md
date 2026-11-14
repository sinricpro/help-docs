---
title: Solución de problemas
weight: 4
lang: es
description: Soluciona los problemas más comunes de Sinric Pro en ESP32 y ESP8266. Conexión inestable, dispositivo sin conexión, Alexa o Google Home no responden.
---

### Consejos para la solución de problemas 

### La conexión es inestable (el dispositivo alterna entre "online" y "offline" en el panel de SinricPro) 

En ESP32 / ESP8266, añadir un delay() (o código que bloquea durante mucho tiempo) afecta directamente al rendimiento y la estabilidad del Wi-Fi, debido a cómo funciona la pila Wi-Fi. Las esperas cortas (unos pocos ms) suelen ser seguras. Pero las esperas largas (> ~100 ms) pueden provocar timeouts del Wi-Fi, paquetes perdidos o desconexiones.

Si tienes algún delay(x); largo en la función loop(), es posible que tengas que reescribirlo para que no sea bloqueante.

Ejemplo (código incorrecto):


```c++
const int ledPin = 2;

void setup() {   
    pinMode(ledPin, OUTPUT);
}

void loop() {
    delay(5000) //!!!!!!!!!!! DO NOT DO THIS!!!!!!!!!
    digitalWrite(ledPin, !digitalRead(ledPin));
}
```

Ejemplo (código correcto):

```c++
const int ledPin = 2;

// Variables to manage timing
unsigned long previousMillis = 0;  // Stores last time LED was updated
const long interval = 1000;        // Interval for blinking (milliseconds)

void setup() {
    // Initialize the LED pin as an output
    pinMode(ledPin, OUTPUT);
}

void loop() {
    // Get the current time
    unsigned long currentMillis = millis();

    // Check if the interval has passed
    if (currentMillis - previousMillis >= interval) {
        // Save the current time
        previousMillis = currentMillis;

        // Toggle the LED state
        digitalWrite(ledPin, !digitalRead(ledPin));
    }
}
```

### Problema conocido: inestabilidad del WiFi en ESP32/ESP8266 al usar pines ADC

Si estás desarrollando con **ESP32** o **ESP8266** y notas un comportamiento errático del WiFi — como desconexiones frecuentes, señal débil o conexiones fallidas — puede que te hayas topado con una peculiaridad de hardware bien documentada: **inestabilidad del WiFi cuando se usan los pines del conversor analógico-digital (ADC)**.

#### ¿Qué está pasando?

Tanto el ESP32 como el ESP8266 comparten recursos internos entre la radio WiFi y las operaciones del ADC. Cuando el ADC está muestreando activamente (sobre todo a alta frecuencia o con lecturas continuas), puede interferir con la circuitería de RF responsable de la comunicación WiFi. Esto provoca:

- Conexiones WiFi que se caen
- Mayor latencia o pérdida de paquetes
- Dificultad para mantener la asociación con los puntos de acceso
- En casos extremos, fallo total del WiFi hasta reiniciar

Este problema se nota especialmente al:

- Leer sensores analógicos (p. ej., potenciómetros, LDR, joysticks analógicos) en bucles muy rápidos
- Usar `analogRead()` con frecuencia y sin esperas
- Muestrear a alta resolución o velocidad en el ADC del ESP32

#### Soluciones alternativas y buenas prácticas

1. **Añade esperas entre las lecturas del ADC**  
   Evita el sondeo continuo. Introduce pequeñas esperas (p. ej., `delay(10)` o `vTaskDelay()`) entre las lecturas analógicas para darle un respiro a la pila WiFi.

   ```cpp
   int sensorValue = analogRead(A0);
   delay(10); // Let WiFi recover

## Cannot connect to SinricPro

* Try starting a hotspot from your mobile phone and then connect your ESP to SinricPro via the hotspot. If you can connect to SinricPro via the hotspot, then the problem is with your WiFi network. 

* Try switching to a different WiFi network if possible.    

* Always start by trying our example sketches, changing only the credentials. They have been thoroughly tested and are known to work correctly.

#### Logging 

##### SinricPro SDK Logging

* Enable logging and check for errors, and disconnections. To enable logs Sinric Pro SDK logs, add ``#define ENABLE_DEBUG`` to top of the sketch.

##### ESP8266/ESP32 Core Logging

    * To enable ESP8266 logs, in Arduinio IDE:

        1. `Tools -> Debug Serial Port -> Serial`

        2. `Tools -> Debug Level -> SSL + HTTP_CLIENT`

    * To enable ESP32 logs, in Arduinio IDE:

        1. `Tools -> Core Debug Level -> Verbose`

#### Memory Limitation 

* Sometimes, due to memory limitations, the ESP chip may fail while trying to establish the SSL connection to the SinricPro server. In this case, you can try disabling the SSL feature by adding `#define SINRICPRO_NOSSL` to the **top of the sketch (before #include "SinricPro.h")**:

    ```c++
    #define SINRICPRO_NOSSL
    #include "SinricPro.h"
    ...
    ```


 
* Si nada de lo anterior te funciona, revisa las [incidencias](https://github.com/sinricpro/esp8266-esp32-sdk/issues) existentes en el repositorio de GitHub o abre una [nueva](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)

* Únete a SinricPro en Discord : https://discord.gg/CqjBrkM6
