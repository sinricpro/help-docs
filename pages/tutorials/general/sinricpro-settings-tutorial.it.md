---
title: Tutorial sulle impostazioni
layout: post
lang: it
description: Usa le impostazioni personalizzate di Sinric Pro per modificare da remoto i valori di configurazione del tuo ESP32 o ESP8266, senza riprogrammare il firmware.
---

Le impostazioni personalizzate (Custom Settings) sono una funzione potente che ti permette di definire e gestire i parametri di configurazione dei tuoi dispositivi e moduli. Invece di scrivere i valori direttamente nel firmware, puoi creare impostazioni modificabili da remoto tramite il Portal o l'app di SinricPro.


![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings.png)

### Requisiti degli SDK

Per usare la funzione Settings, assicurati di avere le seguenti versioni degli SDK:

| SDK | Versione minima |
|-----|-----------------|
| **ESP8266/ESP32 SDK** | 4.0 |
| **Node.js SDK** | 5.1.0 |
| **Python SDK** | 5.0.1 |

---

**Nota**: queste impostazioni non si possono controllare tramite Amazon Alexa o Google Home.

La funzione Settings ti permette di:

- **Definire parametri di configurazione personalizzati** per i tuoi dispositivi (ad es. soglie di temperatura, durate dei timer, modalità di funzionamento)
- **Modificare da remoto il comportamento del dispositivo** senza riprogrammare il firmware
- **Creare impostazioni riutilizzabili** che si possono assegnare a più dispositivi
- **Organizzare le impostazioni per categoria** per gestirle meglio

### Tipi di impostazioni

SinricPro supporta tre tipi di impostazioni:

| Tipo | Descrizione | Esempi d'uso |
|------|-------------|-------------------|
| **Number** | Valori numerici con intervallo min/max, precisione e unità di misura opzionali | Soglia di temperatura (0-100°C), velocità della ventola (0-100%), durata del timer (secondi) |
| **List** | Selezione da un menu a tendina con opzioni predefinite | Modalità di funzionamento (Off/Low/Medium/High), profilo energetico (Eco/Normal/Performance) |
| **Boolean** | Semplice interruttore acceso/spento | Attivazione delle notifiche, modalità debug, modalità notte |

Le impostazioni si possono creare a due livelli:

- **Device Settings**: si applicano ai singoli dispositivi IoT (ad es. uno specifico interruttore smart)
- **Module Settings**: si applicano ai moduli ESP o alle schede di controllo (ad es. la configurazione WiFi del modulo stesso)

---

## Configurare le impostazioni personalizzate

### Passo 1: Crea un'impostazione globale

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-global-device-settings-management.png)

Le impostazioni globali sono modelli riutilizzabili che si possono assegnare a più dispositivi.

1. Vai su **Devices** → **Global Device Settings** (per le impostazioni dei dispositivi) oppure su **Modules** → **Global Module Settings** (per le impostazioni dei moduli)

2. Fai clic su **Create New Setting**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-create-settings.png)

3. Compila la sezione **Basic Information**:
   - **Name**: un nome descrittivo (ad es. "Temperature Threshold")
   - **Setting ID**: generato automaticamente dal nome (ad es. `id_temperature_threshold`)
   - **Description**: spiegazione facoltativa di ciò che fa l'impostazione
   - **Category**: raggruppa le tue impostazioni (General, Operation, Timer, Sensors, ecc.)
   - **Order**: ordine di visualizzazione (0 = primo)

4. Configura il **Value Type**:

   **Per le impostazioni Number:**
   - Imposta i valori minimo e massimo
   - Scegli la precisione (cifre decimali: 0-4)
   - Se vuoi, specifica un'unità di misura (°C, %, RPM, sec, ecc.)
   - Attiva "Is Percentage" per un intervallo 0-100% con formattazione automatica

   **Per le impostazioni List:**
   - Aggiungi da 2 a 20 opzioni
   - Ogni opzione deve essere unica
   - La prima opzione diventa quella predefinita

   **Per le impostazioni Boolean:**
   - Non serve alcuna configurazione aggiuntiva
   - Viene mostrata come interruttore Enabled/Disabled

5. **Facoltativo**: attiva **Read-Only** se è il dispositivo a impostare questo valore e gli utenti devono solo poterlo vedere (ad es. le letture di un sensore)

6. Fai clic su **Create** per salvare l'impostazione

### Passo 2: Assegna le impostazioni a un dispositivo

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-assign-settings.png)

Dopo aver creato le impostazioni globali, assegnale ai tuoi dispositivi:

*Opzione 1:*

1. Vai su **Devices**, seleziona il dispositivo che vuoi configurare e fai clic su **Edit**

2. Fai clic sulla scheda **Other**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-edit-settings-other.png)

3. In Custom Settings, fai clic su **Setup** per aprire la finestra di assegnazione delle impostazioni

4. Fai clic sul menu a tendina **Select a setting** e scegli un'impostazione da assegnare

5. Per assegnare più impostazioni, fai clic su **+**

6. Controlla le impostazioni che hai selezionato. Puoi vedere:
   - Nome e ID dell'impostazione
   - Tipo (Number/List/Boolean)
   - Categoria
   - Stato di sola lettura

7. Fai clic su **Save** per applicare le impostazioni al tuo dispositivo

*Opzione 2:*

1. Vai su **Dashboard**, seleziona il dispositivo che vuoi configurare e fai clic su **Settings**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings-manage-settings.png)

2. Fai clic su **Manage Settings** e poi su **Select a setting**

4. Nella finestra **Select a setting**, scegli un'impostazione da assegnare

4. Per assegnare più impostazioni, fai clic su **+**

5. Controlla le impostazioni che hai selezionato. Puoi vedere:
   - Nome e ID dell'impostazione
   - Tipo (Number/List/Boolean)
   - Categoria
   - Stato di sola lettura

6. Fai clic su **Save** per applicare le impostazioni al tuo dispositivo

### Passo 3: Genera il codice per il tuo firmware

Dopo aver assegnato le impostazioni, genera il codice della callback per il tuo firmware:

1. Nella finestra di assegnazione delle impostazioni, fai clic su **Get Code**

2. Seleziona il tuo SDK:
   - **Arduino ESP-8266/ESP-32/RP2040**
   - **NodeJS**
   - **Python**

3. Copia il codice generato e integralo nel tuo firmware
 
---

## Usare le impostazioni nel tuo codice

### Arduino/ESP SDK

#### Callback delle impostazioni del dispositivo

```cpp
bool onSetDeviceSetting(const String& deviceId, const String& settingId, SettingValue& settingValue) {
  // Handle device settings based on value type
  if (std::holds_alternative<int>(settingValue)) {
    Serial.printf("Device %s: Setting %s = %d\r\n", deviceId.c_str(), settingId.c_str(), std::get<int>(settingValue));
  } else if (std::holds_alternative<float>(settingValue)) {
    Serial.printf("Device %s: Setting %s = %.2f\r\n", deviceId.c_str(), settingId.c_str(), std::get<float>(settingValue));
  } else if (std::holds_alternative<bool>(settingValue)) {
    Serial.printf("Device %s: Setting %s = %s\r\n", deviceId.c_str(), settingId.c_str(), std::get<bool>(settingValue) ? "true" : "false");
  } else if (std::holds_alternative<String>(settingValue)) {
    Serial.printf("Device %s: Setting %s = %s\r\n", deviceId.c_str(), settingId.c_str(), std::get<String>(settingValue).c_str());
  }
  return true;
}

void setupSinricPro() {
  // ... your existing setup code ...

  // Register the device setting callback
  myDevice.onSetSetting(onSetDeviceSetting);
  // .. 
  SinricPro.begin(APP_KEY, APP_SECRET);
}
```

#### Evento delle impostazioni del dispositivo

```cpp
void sendLedState() {
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
  Serial.printf("Sending device setting 'id_led' = %s\r\n", ledState ? "true" : "false");
  mySwitch.sendSettingEvent('id_led', ledState);
}
```


#### Callback delle impostazioni del modulo

```cpp
bool onSetModuleSetting(const String& id, SettingValue& value) {
  // Handle module settings based on value type
  if (std::holds_alternative<int>(value)) {
    Serial.printf("Module setting %s = %d\r\n", id.c_str(), std::get<int>(value));
  } else if (std::holds_alternative<float>(value)) {
    Serial.printf("Module setting %s = %.2f\r\n", id.c_str(), std::get<float>(value));
  } else if (std::holds_alternative<bool>(value)) {
    Serial.printf("Module setting %s = %s\r\n", id.c_str(), std::get<bool>(value) ? "true" : "false");
  } else if (std::holds_alternative<String>(value)) {
    Serial.printf("Module setting %s = %s\r\n", id.c_str(), std::get<String>(value).c_str());
  }
  return true;
}

void setupSinricPro() {
  // ... your existing setup code ...

  // Register module setting callback
  SinricPro.onSetSetting(onSetModuleSetting);
  // ..
  SinricPro.begin(APP_KEY, APP_SECRET);
}
```

#### Evento delle impostazioni del modulo

```cpp
  int rssi = WiFi.RSSI();
  Serial.printf("Sending module setting 'id_wifi_rssi' = %d\r\n", rssi);
  SinricPro.sendSettingEvent('id_wifi_rssi', rssi);
```



### NodeJS SDK

```javascript
myDevice.onSetting(async (deviceId, setting, value) => {
  if (setting === "id_temperature_threshold") {
    console.log(`Device ${deviceId} setting: ${setting} = ${value}`);
    // Apply your logic
    await setTemperatureThreshold(value);
  } else if (setting === "id_power_mode") {
    console.log(`Device ${deviceId} setting: ${setting} = ${value}`);
    await setPowerMode(value);
  }

  return true;
});
```

### Python SDK

```python
async def on_setting(setting: str, value: Any) -> bool:
    if setting == "id_temperature_threshold":
        print(f"Setting {setting} = {value}")
        await set_temperature_threshold(value)
    elif setting == "id_power_mode":
        print(f"Setting {setting} = {value}")
        await set_power_mode(value)

    return True

# In main() function
my_device.on_setting(on_setting)
```

---

## Buone pratiche

### Convenzioni sui nomi

- Usa nomi descrittivi: "Temperature Threshold" invece di "Temp"
- Gli ID delle impostazioni vengono generati automaticamente: `id_temperature_threshold`
- Raggruppa le impostazioni correlate usando le categorie

### Categorie

Organizza le tue impostazioni usando le categorie predefinite:

| Categoria | Da usare per |
|----------|---------|
| General | Configurazione di base del dispositivo |
| Operation | Modalità e comportamenti di funzionamento |
| Position | Impostazioni di posizione/livello (tapparelle, dimmer) |
| Timer | Impostazioni legate al tempo (ritardi, durate) |
| Sensors | Soglie e calibrazione dei sensori |
| Display | Impostazioni di display/LED |
| Power | Impostazioni di gestione dell'alimentazione |
| Network | Configurazione di rete |
| Other | Impostazioni varie |

### Impostazioni di sola lettura

Usa le impostazioni di sola lettura per i valori che:
- Sono impostati dal dispositivo (letture dei sensori, indicatori di stato)
- Devono essere visibili agli utenti ma non modificabili
- Sono valori calcolati o derivati

### Consigli per la validazione

- **Impostazioni Number**: imposta sempre intervalli min/max adeguati per evitare valori non validi
- **Impostazioni List**: usa nomi delle opzioni chiari e descrittivi
- **Precisione**: usa precisione = 0 per i numeri interi, precisione > 0 per i decimali

---

## Risoluzione dei problemi

### L'impostazione non si aggiorna

1. Assicurati che la callback sia registrata in `setupSinricPro()`
2. Verifica che l'ID dell'impostazione corrisponda esattamente (distingue maiuscole e minuscole)
3. Controlla che la callback contenga `return true;`

### L'impostazione non compare

1. Verifica che l'impostazione sia assegnata al dispositivo
2. Controlla che l'impostazione non sia contrassegnata come di sola lettura (per le operazioni di scrittura)
3. Aggiorna la pagina del dispositivo

### Il codice generato è vuoto

1. Assicurati che sia assegnata almeno un'impostazione non di sola lettura
2. Le impostazioni di sola lettura sono escluse dal codice generato

---

## Riepilogo

La funzione Settings offre un modo flessibile per gestire la configurazione dei dispositivi:

1. **Crea** impostazioni globali con tipi e vincoli adeguati
2. **Assegna** le impostazioni ai tuoi dispositivi
3. **Genera** il codice della callback per il tuo firmware
4. **Implementa** la callback per gestire le modifiche alle impostazioni

Questo approccio separa la configurazione dal codice e rende i tuoi dispositivi IoT più facili da mantenere e da usare.
