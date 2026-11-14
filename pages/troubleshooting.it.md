---
title: Risoluzione dei problemi
weight: 4
lang: it
description: Risolvi i problemi più comuni di Sinric Pro su ESP32 ed ESP8266. Connessione instabile, dispositivo offline, Alexa o Google Home che non rispondono.
---

### Suggerimenti per la risoluzione dei problemi 

### La connessione è instabile (il dispositivo passa continuamente da "online" a "offline" nella dashboard di SinricPro) 

Su ESP32 / ESP8266, aggiungere un delay() (o codice bloccante di lunga durata) incide direttamente sulle prestazioni e sulla stabilità del Wi-Fi, per via di come funziona lo stack Wi-Fi. I ritardi brevi (pochi ms) di solito non creano problemi. I ritardi lunghi (> ~100ms), invece, possono causare timeout del Wi-Fi, pacchetti persi o disconnessioni.

Se nella funzione loop() hai dei delay(x); lunghi, potresti doverli riscrivere in modo non bloccante.

Esempio (codice sbagliato):


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

Esempio (codice corretto):

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

### Problema noto: instabilità del WiFi su ESP32/ESP8266 quando si usano i pin ADC

Se sviluppi con **ESP32** o **ESP8266** e noti un comportamento anomalo del WiFi, come disconnessioni frequenti, segnale debole o connessioni non riuscite, potresti esserti imbattuto in una particolarità hardware ben documentata: **l'instabilità del WiFi quando sono in uso i pin del convertitore analogico-digitale (ADC)**.

#### Cosa succede?

Sia l'ESP32 sia l'ESP8266 usano risorse interne condivise per la radio WiFi e per le operazioni dell'ADC. Quando l'ADC campiona attivamente (soprattutto ad alta frequenza o con letture continue), può interferire con i circuiti RF responsabili della comunicazione WiFi. Ne risultano:

- Connessioni WiFi che cadono
- Latenza più alta o perdita di pacchetti
- Difficoltà a mantenere l'associazione con gli access point
- Nei casi estremi, blocco completo del WiFi fino al riavvio

Il problema si nota in particolare quando:

- Leggi sensori analogici (ad es. potenziometri, LDR, joystick analogici) in cicli molto stretti
- Usi `analogRead()` di frequente senza ritardi
- Campioni ad alta risoluzione o ad alta frequenza con l'ADC dell'ESP32

#### Soluzioni alternative e buone pratiche

1. **Aggiungi dei ritardi tra le letture dell'ADC**  
   Evita il polling continuo. Inserisci brevi ritardi (ad es. `delay(10)` o `vTaskDelay()`) tra le letture analogiche per lasciare respiro allo stack WiFi.

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


 
* Se nessuna delle soluzioni qui sopra funziona, controlla le [issue](https://github.com/sinricpro/esp8266-esp32-sdk/issues) esistenti nel repository GitHub oppure aprine una [nuova](https://github.com/sinricpro/esp8266-esp32-sdk/issues/new)

* Unisciti a SinricPro su Discord : https://discord.gg/CqjBrkM6
