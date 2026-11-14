---
title: Aggiornamenti OTA
weight: 4
lang: it
youtubeId: FxtsQuC9mn8
description: Configura gli aggiornamenti firmware over-the-air (OTA) per ESP32 ed ESP8266 con Sinric Pro. Carica il firmware nel Portale e aggiorna i dispositivi da remoto.
---


Questo tutorial ti guida nella configurazione degli **aggiornamenti firmware Over-The-Air (OTA)** per il tuo dispositivo ESP32 o ESP8266 con **SinricPro**. L'OTA ti permette di aggiornare da remoto il firmware del dispositivo senza collegarlo fisicamente a un computer: perfetto per i dispositivi IoT già installati sul campo!

---

## Che cos'è SinricPro OTA?

SinricPro OTA (Over-The-Air) è una funzione che permette al tuo dispositivo ESP di **scaricare e installare un nuovo firmware** dal server quando l'aggiornamento viene avviato dalla dashboard di SinricPro.

- Controllo della versione (supporto SemVer)
- Aggiornamenti forzati
- Segnalazione di avanzamento ed errori

---

## Prerequisiti

Prima di iniziare, assicurati di avere:

- Una scheda ESP32, ESP8266 o RP2040
- Arduino IDE (o PlatformIO) installato
- L'ultima versione della [libreria SinricPro](https://github.com/sinricpro/esp8266-esp32-sdk) installata dal Gestore librerie
- Le credenziali della rete WiFi
- Un account SinricPro con:
  - `APP_KEY` e `APP_SECRET` da [portal.sinric.pro](https://portal.sinric.pro) -> Credentials
  - Il Device ID (`SWITCH_ID`, ecc.) del tuo dispositivo da [portal.sinric.pro](https://portal.sinric.pro) -> Devices

💡 *Codice completo: [qui](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)*

---

## Configurazione passo passo

### 1. Installa le librerie necessarie

In Arduino IDE:

- Vai su **Sketch → Include Library → Manage Libraries**
- Cerca e installa: `SinricPro`
---

### 2. Configura il tuo sketch

Copia e incolla il codice di esempio qui sotto in Arduino IDE.

> **IMPORTANTE**: `FIRMWARE_VERSION` è la versione del firmware. Puoi vederla nella sezione Module del Portale. **Deve essere definita prima di includere SinricPro.h**

```cpp
// Uncomment the following line to enable serial debug output
// #define SINRICPRO_NOSSL // Uncomment if you have memory limitation issues.
// #define ENABLE_DEBUG // Enable SDK logging.

// Your firmware version. Must be above SinricPro.h. Do not rename this.
#define FIRMWARE_VERSION "1.1.1"  

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>

#if defined(ESP8266)
  #include <ESP8266WiFi.h>
  #include "ESP8266OTAHelper.h" // Ref: https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate
#elif defined(ESP32) 
  #include <WiFi.h>
  #include "ESP32OTAHelper.h" // Ref: https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate
#elif defined(ARDUINO_ARCH_RP2040)  
  #include <WiFi.h>
  #include "ESP8266OTAHelper.h" // Ref: https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate
#endif

#include "SemVer.h"
#include "SinricPro.h"
#include "SinricProSwitch.h"


#define WIFI_SSID   "YOUR-WIFI-SSID"
#define WIFI_PASS   "YOUR-WIFI-PASSWORD"
#define APP_KEY     "YOUR-APP-KEY"      // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET  "YOUR-APP-SECRET"   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define SWITCH_ID   "SWITCH_ID"         // Should look like "5dc1564130xxxxxxxxxxxxxx"

#define BAUD_RATE   115200             // Change baudrate to your need

bool handleOTAUpdate(const String& url, int major, int minor, int patch, bool forceUpdate) {
  Version currentVersion  = Version(FIRMWARE_VERSION);
  Version newVersion      = Version(String(major) + "." + String(minor) + "." + String(patch));
  bool updateAvailable    = newVersion > currentVersion;

  Serial.print("URL: ");
  Serial.println(url.c_str());
  Serial.print("Current version: ");
  Serial.println(currentVersion.toString());
  Serial.print("New version: ");
  Serial.println(newVersion.toString());
  if (forceUpdate) Serial.println("Enforcing OTA update!");

  // Handle OTA update based on forceUpdate flag and update availability
  if (forceUpdate || updateAvailable) {
    if (updateAvailable) {
      Serial.println("Update available!");
    }

    String result = startOtaUpdate(url);
    if (!result.isEmpty()) {
      SinricPro.setResponseMessage(std::move(result));
      return false;
    } 
    return true;
  } else {
    String result = "Current version is up to date.";
    SinricPro.setResponseMessage(std::move(result));
    Serial.println(result);
    return false;
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

  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
   SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];

  // setup SinricPro
  SinricPro.onConnected([]() {
    Serial.printf("Connected to SinricPro\r\n");
  });
  SinricPro.onDisconnected([]() {
    Serial.printf("Disconnected from SinricPro\r\n");
  });
  SinricPro.onOTAUpdate(handleOTAUpdate);
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE);
  Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

---

 
### Versione del firmware

```cpp
#define FIRMWARE_VERSION "1.1.1"
```

- **Deve** essere definita prima di includere `SinricPro.h`.
- Segui il [Semantic Versioning](https://semver.org/) (ad es. `MAJOR.MINOR.PATCH`).
- Verrà mostrata nella sezione Module del Portale non appena il dispositivo si connette al server.

---
 

## Preparare il firmware per l'OTA

### Passo 1: Compila ed esporta il file binario

In Arduino IDE:

- Vai su **Sketch → Export Compiled Binary**
- Viene generato un file `.bin` nella cartella del tuo sketch.

> Esempio: `your_sketch.ino.esp32.bin`

---
 

## Avviare gli aggiornamenti OTA

1. [Accedi](http://portal.sinric.pro) al tuo account Sinric Pro.

2. Apri il menu **OTA Updates** a sinistra.

3. Fai clic sul pulsante **Add OTA Update**.

4. Inserisci la nuova versione del firmware. Seleziona il file .bin dell'OTA (`your_sketch.ino.esp32.bin`) e i moduli a cui vuoi applicare l'aggiornamento OTA.

5. Fai clic su **Save**

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-upload.png">

Dopo aver fatto clic sul pulsante **Save**, il server invia una richiesta di aggiornamento OTA ai moduli selezionati. Se il tuo modulo è offline in quel momento, riceverà l'aggiornamento alla successiva connessione al server.


<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-inprogress.png">

{% include youtubePlayer.html id=page.youtubeId %}


---

## Debug dei problemi OTA

Abilita l'output di debug togliendo il commento a:

```cpp
#define ENABLE_DEBUG
```

Osserva nel Monitor seriale (`115200 baud`):

- Stato della connessione WiFi
- Connessione a SinricPro
- URL dell'OTA e confronto delle versioni
- Avanzamento del download ed errori

Problemi comuni:

| Sintomo | Soluzione |
|--------|----------|
| `Update failed: connection refused` | Controlla che l'URL sia accessibile pubblicamente |
| `Update failed: not enough space` | Riduci la dimensione dello sketch oppure usa `SINRICPRO_NOSSL` |
| `Version not updating` | Assicurati di aggiornare `FIRMWARE_VERSION` nello sketch prima di compilare il nuovo binario |
| `Device not responding after OTA` | Controlla se ci sono crash: aggiungi dei ritardi o un reset del watchdog |

---

## Buone pratiche

- Prova sempre l'OTA su un dispositivo di sviluppo prima di distribuirlo in produzione.
- Usa il Semantic Versioning in modo coerente (`1.0.0`, `1.0.1`, `2.0.0`, ecc.).
- Mantieni il firmware sotto 1MB per ESP8266 (se usi una flash da 1MB).
- Usa URL HTTPS per download sicuri (SSL è abilitato per impostazione predefinita).
- Aggiungi un ritardo di 5-10 secondi dopo `SinricPro.handle()` in `loop()` se il dispositivo è instabile.
- Implementa un meccanismo di rollback o una “modalità provvisoria” nel caso l'OTA fallisca ripetutamente.

---

## FAQ

### D: Posso usare l'OTA con altri tipi di dispositivo SinricPro (come DimSwitch, Thermostat, ecc.)?

✅ **Sì!** Il meccanismo OTA non dipende dal tipo di dispositivo. Ti basta registrare `SinricPro.onOTAUpdate(...)`, qualunque sia la classe del tuo dispositivo.

---

### D: Cosa succede se l'OTA fallisce?

Il dispositivo:
- Continua a eseguire il vecchio firmware.
- Segnala l'errore tramite `SinricPro.setResponseMessage(...)`.
- Resta connesso a SinricPro (a meno che non si verifichi un crash).

---

### D: L'OTA funziona con SSL/HTTPS?

✅ Sì, per impostazione predefinita. Se hai problemi di memoria su ESP8266, togli il commento a:

```cpp
#define SINRICPRO_NOSSL
```

> ⚠️ Questo disabilita SSL: usalo solo su reti attendibili o con URL HTTP.

---

### D: Quanto dura un aggiornamento OTA?

Dipende da:
- Dimensione del firmware (di solito: 500KB–1MB)
- Velocità del WiFi
- Velocità del server

In media: **da 30 secondi a 3 minuti**.

---

Trovi il codice di esempio completo qui: 
[https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)


Se cerchi l'aggiornamento OTA tramite WiFi locale, lo trovi [qui]({{ site.github.url }}/it/pages/ota-updates/local-wifi-ota-update.it.html)
