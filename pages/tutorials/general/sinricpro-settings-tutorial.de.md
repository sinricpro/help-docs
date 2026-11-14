---
title: Einstellungen-Tutorial
layout: post
lang: de
description: Nutze benutzerdefinierte Sinric Pro Einstellungen, um Konfigurationswerte auf deinem ESP32 oder ESP8266 aus der Ferne zu ändern, ohne die Firmware neu zu flashen.
---

Custom Settings ist eine leistungsfähige Funktion, mit der du Konfigurationsparameter für deine Geräte und Module definieren und verwalten kannst. Statt Werte in deiner Firmware fest zu verdrahten, kannst du Einstellungen anlegen, die du aus der Ferne über das SinricPro Portal oder die App ändern kannst.


![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings.png)

### SDK-Anforderungen

Um die Settings-Funktion zu nutzen, stelle sicher, dass du mindestens folgende SDK-Versionen verwendest:

| SDK | Mindestversion |
|-----|-----------------|
| **ESP8266/ESP32 SDK** | 4.0 |
| **Node.js SDK** | 5.1.0 |
| **Python SDK** | 5.0.1 |

---

**Hinweis**: Diese Einstellungen lassen sich nicht über Amazon Alexa oder Google Home steuern.

Mit der Settings-Funktion kannst du:

- **Benutzerdefinierte Konfigurationsparameter definieren** für deine Geräte (z. B. Temperaturschwellen, Timer-Dauer, Betriebsmodi)
- **Das Geräteverhalten aus der Ferne ändern**, ohne die Firmware neu zu flashen
- **Wiederverwendbare Einstellungen erstellen**, die mehreren Geräten zugewiesen werden können
- **Einstellungen nach Kategorie organisieren** für eine bessere Übersicht

### Arten von Einstellungen

SinricPro unterstützt drei Arten von Einstellungen:

| Typ | Beschreibung | Beispiel-Anwendungsfälle |
|------|-------------|-------------------|
| **Number** | Numerische Werte mit optionalem Min/Max-Bereich, Genauigkeit und Einheit | Temperaturschwelle (0–100 °C), Lüfterdrehzahl (0–100 %), Timer-Dauer (Sekunden) |
| **List** | Dropdown-Auswahl aus vordefinierten Optionen | Betriebsmodus (Off/Low/Medium/High), Leistungsprofil (Eco/Normal/Performance) |
| **Boolean** | Einfacher Ein/Aus-Schalter | Benachrichtigungen aktivieren, Debug-Modus, Nachtmodus |

Einstellungen können auf zwei Ebenen angelegt werden:

- **Device Settings**: Gelten für einzelne IoT-Geräte (z. B. einen bestimmten Smart-Switch)
- **Module Settings**: Gelten für ESP-Module/Controller-Boards (z. B. WLAN-Konfiguration für das Modul selbst)

---

## Benutzerdefinierte Einstellungen einrichten

### Schritt 1: Eine globale Einstellung erstellen

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-global-device-settings-management.png)

Globale Einstellungen sind wiederverwendbare Vorlagen, die mehreren Geräten zugewiesen werden können.

1. Gehe zu **Devices** → **Global Device Settings** (für Geräteeinstellungen) oder **Modules** → **Global Module Settings** (für Moduleinstellungen)

2. Klicke auf **Create New Setting**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-create-settings.png)

3. Fülle die **Basic Information** aus:
   - **Name**: Ein aussagekräftiger Name (z. B. „Temperature Threshold“)
   - **Setting ID**: Wird automatisch aus dem Namen generiert (z. B. `id_temperature_threshold`)
   - **Description**: Optionale Erklärung, wofür diese Einstellung dient
   - **Category**: Gruppiere deine Einstellungen (General, Operation, Timer, Sensors usw.)
   - **Order**: Sortierreihenfolge für die Anzeige (0 = erste Position)

4. Konfiguriere den **Value Type**:

   **Für Number-Einstellungen:**
   - Lege Minimal- und Maximalwert fest
   - Wähle die Genauigkeit (Nachkommastellen: 0–4)
   - Gib optional eine Einheit an (°C, %, RPM, sek. usw.)
   - Aktiviere „Is Percentage“ für einen 0–100-%-Bereich mit automatischer Formatierung

   **Für List-Einstellungen:**
   - Füge 2–20 Optionen hinzu
   - Jede Option muss eindeutig sein
   - Die erste Option wird zum Standardwert

   **Für Boolean-Einstellungen:**
   - Keine weitere Konfiguration nötig
   - Wird als Enabled/Disabled-Schalter angezeigt

5. **Optional**: Aktiviere **Read-Only**, wenn das Gerät diesen Wert setzt und Nutzer ihn nur ansehen, nicht ändern sollen (z. B. Sensormesswerte)

6. Klicke auf **Create**, um die Einstellung zu speichern

### Schritt 2: Einstellungen einem Gerät zuweisen

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-assign-settings.png)

Sobald du globale Einstellungen erstellt hast, weise sie deinen Geräten zu:

*Option 1:*

1. Gehe zu **Devices**, wähle das Gerät, das du konfigurieren möchtest, und klicke auf **Edit**

2. Klicke auf den Tab **Other**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-edit-settings-other.png)

3. Klicke in Custom Settings auf **Setup**, um den Zuweisungsdialog zu öffnen

4. Klicke auf das Dropdown **Select a setting** und wähle eine Einstellung zum Zuweisen aus

5. Um mehrere Einstellungen zuzuweisen, klicke auf **+**

6. Überprüfe die ausgewählten Einstellungen – du siehst:
   - Name und ID der Einstellung
   - Typ (Number/List/Boolean)
   - Kategorie
   - Read-Only-Status

7. Klicke auf **Save**, um die Einstellungen auf dein Gerät anzuwenden

*Option 2:*

1. Gehe zu **Dashboard**, wähle das Gerät, das du konfigurieren möchtest, und klicke auf **Settings**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings-manage-settings.png)

2. Klicke auf **Manage Settings** und **Select a setting**

4. Wähle im Dialog **Select a setting** eine Einstellung zum Zuweisen aus

4. Um mehrere Einstellungen zuzuweisen, klicke auf **+**

5. Überprüfe die ausgewählten Einstellungen – du siehst:
   - Name und ID der Einstellung
   - Typ (Number/List/Boolean)
   - Kategorie
   - Read-Only-Status

6. Klicke auf **Save**, um die Einstellungen auf dein Gerät anzuwenden

### Schritt 3: Code für deine Firmware generieren

Nach dem Zuweisen der Einstellungen generierst du den Callback-Code für deine Firmware:

1. Klicke im Zuweisungsdialog auf **Get Code**

2. Wähle dein SDK:
   - **Arduino ESP-8266/ESP-32/RP2040**
   - **NodeJS**
   - **Python**

3. Kopiere den generierten Code und integriere ihn in deine Firmware
 
---

## Einstellungen in deinem Code verwenden

### Arduino/ESP SDK

#### Device Settings Callback

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

#### Device Settings Event

```cpp
void sendLedState() {
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
  Serial.printf("Sending device setting 'id_led' = %s\r\n", ledState ? "true" : "false");
  mySwitch.sendSettingEvent('id_led', ledState);
}
```


#### Module Settings Callback

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

#### Module Settings Event

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

## Best Practices

### Namenskonventionen

- Verwende aussagekräftige Namen: „Temperature Threshold“ statt „Temp“
- Setting-IDs werden automatisch generiert: `id_temperature_threshold`
- Gruppiere zusammengehörige Einstellungen über Kategorien

### Kategorien

Organisiere deine Einstellungen mit den integrierten Kategorien:

| Kategorie | Verwendung für |
|----------|---------|
| General | Grundlegende Gerätekonfiguration |
| Operation | Betriebsmodi und -verhalten |
| Position | Positions-/Stufeneinstellungen (Rollläden, Dimmer) |
| Timer | Zeitbezogene Einstellungen (Verzögerungen, Dauer) |
| Sensors | Sensorschwellen und Kalibrierung |
| Display | Display-/LED-Einstellungen |
| Power | Energieverwaltungseinstellungen |
| Network | Netzwerkkonfiguration |
| Other | Sonstige Einstellungen |

### Read-Only-Einstellungen

Verwende Read-Only-Einstellungen für Werte, die:
- vom Gerät selbst gesetzt werden (Sensormesswerte, Statusanzeigen)
- für Nutzer sichtbar, aber nicht änderbar sein sollen
- berechnete oder abgeleitete Werte sind

### Tipps zur Validierung

- **Number-Einstellungen**: Lege immer passende Min/Max-Bereiche fest, um ungültige Werte zu verhindern
- **List-Einstellungen**: Verwende klare, aussagekräftige Optionsnamen
- **Genauigkeit**: Nutze Precision = 0 für Ganzzahlen, Precision > 0 für Dezimalwerte

---

## Fehlerbehebung

### Einstellung wird nicht aktualisiert

1. Stelle sicher, dass der Callback in `setupSinricPro()` registriert ist
2. Überprüfe, ob die Setting ID exakt übereinstimmt (Groß-/Kleinschreibung beachten)
3. Prüfe, ob `return true;` im Callback enthalten ist

### Einstellung wird nicht angezeigt

1. Bestätige, dass die Einstellung dem Gerät zugewiesen ist
2. Prüfe, ob die Einstellung nicht als Read-Only markiert ist (bei Schreibvorgängen)
3. Lade die Geräteseite neu

### Code-Generierung ist leer

1. Stelle sicher, dass mindestens eine nicht-schreibgeschützte Einstellung zugewiesen ist
2. Read-Only-Einstellungen werden vom generierten Code ausgeschlossen

---

## Zusammenfassung

Die Settings-Funktion bietet eine flexible Möglichkeit, die Gerätekonfiguration zu verwalten:

1. **Erstelle** globale Einstellungen mit passenden Typen und Einschränkungen
2. **Weise** Einstellungen deinen Geräten zu
3. **Generiere** Callback-Code für deine Firmware
4. **Implementiere** den Callback, um Einstellungsänderungen zu verarbeiten

Dieser Ansatz trennt Konfiguration von Code und macht deine IoT-Geräte wartbarer und nutzerfreundlicher.
