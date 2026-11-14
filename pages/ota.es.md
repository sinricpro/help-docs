---
title: Actualizaciones OTA
weight: 4
lang: es
youtubeId: FxtsQuC9mn8
description: Configura actualizaciones de firmware inalámbricas (OTA) para ESP32 y ESP8266 con Sinric Pro. Sube el firmware en el Portal y actualiza tus dispositivos de forma remota.
---


Este tutorial te guía en la configuración de las **actualizaciones de firmware inalámbricas (OTA, Over-The-Air)** para tu dispositivo ESP32 o ESP8266 con **SinricPro**. OTA te permite actualizar de forma remota el firmware de tu dispositivo sin conectarlo físicamente a un ordenador: ¡perfecto para dispositivos IoT ya instalados!

---

## ¿Qué es SinricPro OTA?

SinricPro OTA (Over-The-Air) es una función que permite a tu dispositivo ESP **descargar e instalar un firmware nuevo** desde el servidor cuando se activa desde el panel de SinricPro.

- Comprobación de versiones (compatible con SemVer)
- Actualizaciones forzadas
- Informes de progreso y de errores

---

## Requisitos previos

Antes de empezar, asegúrate de tener:

- Una placa ESP32, ESP8266 o RP2040
- Arduino IDE (o PlatformIO) instalado
- La última versión de la [librería SinricPro](https://github.com/sinricpro/esp8266-esp32-sdk) instalada desde el Gestor de bibliotecas
- Las credenciales de tu red WiFi
- Una cuenta de SinricPro con:
  - `APP_KEY` y `APP_SECRET` de [portal.sinric.pro](https://portal.sinric.pro) -> Credentials
  - El Device ID (`SWITCH_ID`, etc.) de tu dispositivo de [portal.sinric.pro](https://portal.sinric.pro) -> Devices

💡 *Código completo: [aquí](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)*

---

## Configuración paso a paso

### 1. Instala las librerías necesarias

En Arduino IDE:

- Ve a **Sketch → Include Library → Manage Libraries**
- Busca e instala: `SinricPro`
---

### 2. Configura tu sketch

Copia y pega el código de ejemplo siguiente en tu Arduino IDE.

> **IMPORTANTE**: `FIRMWARE_VERSION` es la versión del firmware. Puedes verla en la sección Module del Portal. **Debe definirse antes de incluir SinricPro.h**

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

 
### Versión del firmware

```cpp
#define FIRMWARE_VERSION "1.1.1"
```

- **Debe** definirse antes de incluir `SinricPro.h`.
- Sigue el [versionado semántico](https://semver.org/) (p. ej., `MAJOR.MINOR.PATCH`).
- Se mostrará en el Portal -> sección Module una vez que el dispositivo se conecte al servidor.

---
 

## Preparar el firmware para OTA

### Paso 1: Compila y exporta el binario

En Arduino IDE:

- Ve a **Sketch → Export Compiled Binary**
- Esto genera un archivo `.bin` en la carpeta de tu sketch.

> Ejemplo: `your_sketch.ino.esp32.bin`

---
 

## Lanzar actualizaciones OTA

1. [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro.

2. Ve al menú **OTA Updates** de la izquierda.

3. Haz clic en el botón **Add OTA Update**.

4. Introduce la nueva versión del firmware. Selecciona el archivo .bin de OTA (`your_sketch.ino.esp32.bin`) y los módulos a los que quieres aplicar la actualización OTA.

5. Haz clic en **Save**

<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-upload.png">

Cuando hagas clic en el botón **Save**, el servidor enviará una solicitud de actualización OTA a los módulos seleccionados. Si tu módulo está desconectado en ese momento, recibirá la actualización la próxima vez que se conecte al servidor.


<img src="{{ site.github.url }}/public/img/sinricpro-ota-update-inprogress.png">

{% include youtubePlayer.html id=page.youtubeId %}


---

## Depurar problemas de OTA

Activa la salida de depuración descomentando:

```cpp
#define ENABLE_DEBUG
```

Observa en el Monitor serie (`115200 baud`):

- El estado de la conexión WiFi
- La conexión con SinricPro
- La URL de OTA y la comparación de versiones
- El progreso de la descarga y los errores

Problemas habituales:

| Síntoma | Solución |
|--------|----------|
| `Update failed: connection refused` | Comprueba que la URL sea accesible públicamente |
| `Update failed: not enough space` | Reduce el tamaño del sketch o usa `SINRICPRO_NOSSL` |
| `Version not updating` | Asegúrate de actualizar `FIRMWARE_VERSION` en el sketch antes de compilar el nuevo binario |
| `Device not responding after OTA` | Comprueba si hay cuelgues: añade retardos o un reinicio por watchdog |

---

## Buenas prácticas

- Prueba siempre la OTA en un dispositivo de desarrollo antes de desplegarla en producción.
- Usa el versionado semántico de forma coherente (`1.0.0`, `1.0.1`, `2.0.0`, etc.).
- Mantén el tamaño del firmware por debajo de 1MB en ESP8266 (si usas una flash de 1MB).
- Usa URL HTTPS para descargas seguras (SSL está activado de forma predeterminada).
- Añade un retardo de 5-10 segundos después de `SinricPro.handle()` en `loop()` si el dispositivo es inestable.
- Implementa un mecanismo de reversión o un “modo seguro” por si la OTA falla repetidamente.

---

## Preguntas frecuentes

### P: ¿Puedo usar OTA con otros tipos de dispositivo de SinricPro (como DimSwitch, Thermostat, etc.)?

✅ **¡Sí!** El mecanismo OTA es independiente del tipo de dispositivo. Solo tienes que registrar `SinricPro.onOTAUpdate(...)`, sea cual sea la clase de tu dispositivo.

---

### P: ¿Qué ocurre si la OTA falla?

El dispositivo:
- Seguirá ejecutando el firmware anterior.
- Informará del fallo mediante `SinricPro.setResponseMessage(...)`.
- Seguirá conectado a SinricPro (a menos que se produzca un cuelgue).

---

### P: ¿Funciona OTA con SSL/HTTPS?

✅ Sí, de forma predeterminada. Si tienes problemas de memoria en ESP8266, descomenta:

```cpp
#define SINRICPRO_NOSSL
```

> ⚠️ Esto desactiva SSL: úsalo solo en redes de confianza o con URL HTTP.

---

### P: ¿Cuánto tarda una OTA?

Depende de:
- El tamaño del firmware (lo habitual: 500KB–1MB)
- La velocidad del WiFi
- La velocidad del servidor

De media: **entre 30 segundos y 3 minutos**.

---

Puedes encontrar el código de ejemplo completo aquí: 
[https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/OTAUpdate)


Si buscas la actualización OTA por WiFi local, la tienes [aquí]({{ site.github.url }}/es/pages/ota-updates/local-wifi-ota-update.es.html)