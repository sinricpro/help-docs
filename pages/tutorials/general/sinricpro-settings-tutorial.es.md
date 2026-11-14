---
title: Tutorial de ajustes
layout: post
lang: es
description: Usa los ajustes personalizados de Sinric Pro para cambiar a distancia valores de configuración de tu ESP32 o ESP8266, sin volver a grabar el firmware.
---

Los ajustes personalizados (Custom Settings) son una función muy potente que te permite definir y gestionar parámetros de configuración para tus dispositivos y módulos. En lugar de dejar los valores fijos en el firmware, puedes crear ajustes que se cambian a distancia desde el Portal o la app de SinricPro.


![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings.png)

### Requisitos del SDK

Para usar la función de ajustes, comprueba que tienes estas versiones del SDK:

| SDK | Versión mínima |
|-----|-----------------|
| **ESP8266/ESP32 SDK** | 4.0 |
| **Node.js SDK** | 5.1.0 |
| **Python SDK** | 5.0.1 |

---

**Nota**: estos ajustes no se pueden controlar con Amazon Alexa ni con Google Home.

La función de ajustes te permite:

- **Definir parámetros de configuración personalizados** para tus dispositivos (por ejemplo, umbrales de temperatura, duraciones de temporizadores, modos de funcionamiento)
- **Cambiar el comportamiento del dispositivo a distancia** sin volver a grabar el firmware
- **Crear ajustes reutilizables** que se pueden asignar a varios dispositivos
- **Organizar los ajustes por categoría** para gestionarlos mejor

### Tipos de ajustes

SinricPro admite tres tipos de ajustes:

| Tipo | Descripción | Ejemplos de uso |
|------|-------------|-------------------|
| **Number** | Valores numéricos con rango mín./máx., precisión y unidades opcionales | Umbral de temperatura (0-100°C), velocidad del ventilador (0-100%), duración del temporizador (segundos) |
| **List** | Selección en una lista desplegable de opciones predefinidas | Modo de funcionamiento (Off/Low/Medium/High), perfil de energía (Eco/Normal/Performance) |
| **Boolean** | Interruptor sencillo de activado/desactivado | Activar notificaciones, modo de depuración, modo nocturno |

Los ajustes se pueden crear en dos niveles:

- **Ajustes de dispositivo**: se aplican a dispositivos IoT individuales (por ejemplo, un interruptor inteligente concreto)
- **Ajustes de módulo**: se aplican a módulos ESP o placas controladoras (por ejemplo, la configuración WiFi del propio módulo)

---

## Configurar los ajustes personalizados

### Paso 1: Crea un ajuste global

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-global-device-settings-management.png)

Los ajustes globales son plantillas reutilizables que se pueden asignar a varios dispositivos.

1. Ve a **Devices** → **Global Device Settings** (para ajustes de dispositivo) o a **Modules** → **Global Module Settings** (para ajustes de módulo)

2. Haz clic en **Create New Setting**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-create-settings.png)

3. Rellena **Basic Information**:
   - **Name**: un nombre descriptivo (por ejemplo, "Temperature Threshold")
   - **Setting ID**: se genera automáticamente a partir del nombre (por ejemplo, `id_temperature_threshold`)
   - **Description**: explicación opcional de lo que hace este ajuste
   - **Category**: agrupa tus ajustes (General, Operation, Timer, Sensors, etc.)
   - **Order**: orden en que se muestra (0 = primero)

4. Configura **Value Type**:

   **Para ajustes de tipo Number:**
   - Establece los valores mínimo y máximo
   - Elige la precisión (decimales: 0-4)
   - Si quieres, indica una unidad (°C, %, RPM, sec, etc.)
   - Activa "Is Percentage" para un rango de 0-100% con formato automático

   **Para ajustes de tipo List:**
   - Añade entre 2 y 20 opciones
   - Cada opción debe ser única
   - La primera opción es la predeterminada

   **Para ajustes de tipo Boolean:**
   - No requiere configuración adicional
   - Se muestra como un interruptor Enabled/Disabled

5. **Opcional**: activa **Read-Only** si es el dispositivo quien establece este valor y los usuarios solo deben verlo (por ejemplo, lecturas de sensores)

6. Haz clic en **Create** para guardar el ajuste

### Paso 2: Asigna ajustes a un dispositivo

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-assign-settings.png)

Una vez creados los ajustes globales, asígnalos a tus dispositivos:

*Opción 1:*

1. Ve a **Devices**, selecciona el dispositivo que quieres configurar y haz clic en **Edit**

2. Haz clic en la pestaña **Other**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-edit-settings-other.png)

3. En Custom Settings, haz clic en **Setup** para abrir el cuadro de diálogo de asignación de ajustes

4. Haz clic en el desplegable **Select a setting** y elige el ajuste que quieres asignar

5. Para asignar varios ajustes, haz clic en **+**

6. Revisa los ajustes que has seleccionado. Puedes ver:
   - Nombre e ID del ajuste
   - Tipo (Number/List/Boolean)
   - Categoría
   - Estado de solo lectura

7. Haz clic en **Save** para aplicar los ajustes a tu dispositivo

*Opción 2:*

1. Ve a **Dashboard**, selecciona el dispositivo que quieres configurar y haz clic en **Settings**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings-manage-settings.png)

2. Haz clic en **Manage Settings** y en **Select a setting**

4. En el cuadro de diálogo **Select a setting**, elige el ajuste que quieres asignar

4. Para asignar varios ajustes, haz clic en **+**

5. Revisa los ajustes que has seleccionado. Puedes ver:
   - Nombre e ID del ajuste
   - Tipo (Number/List/Boolean)
   - Categoría
   - Estado de solo lectura

6. Haz clic en **Save** para aplicar los ajustes a tu dispositivo

### Paso 3: Genera el código para tu firmware

Después de asignar los ajustes, genera el código del callback para tu firmware:

1. En el cuadro de diálogo de asignación de ajustes, haz clic en **Get Code**

2. Selecciona tu SDK:
   - **Arduino ESP-8266/ESP-32/RP2040**
   - **NodeJS**
   - **Python**

3. Copia el código generado e intégralo en tu firmware
 
---

## Usar los ajustes en tu código

### Arduino/ESP SDK

#### Callback de ajustes de dispositivo

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

#### Evento de ajustes de dispositivo

```cpp
void sendLedState() {
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
  Serial.printf("Sending device setting 'id_led' = %s\r\n", ledState ? "true" : "false");
  mySwitch.sendSettingEvent('id_led', ledState);
}
```


#### Callback de ajustes de módulo

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

#### Evento de ajustes de módulo

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

## Buenas prácticas

### Convenciones de nombres

- Usa nombres descriptivos: "Temperature Threshold" en lugar de "Temp"
- Los ID de los ajustes se generan automáticamente: `id_temperature_threshold`
- Agrupa los ajustes relacionados mediante categorías

### Categorías

Organiza tus ajustes con las categorías integradas:

| Categoría | Úsala para |
|----------|---------|
| General | Configuración básica del dispositivo |
| Operation | Modos de funcionamiento y comportamientos |
| Position | Ajustes de posición o nivel (persianas, reguladores) |
| Timer | Ajustes relacionados con el tiempo (retardos, duraciones) |
| Sensors | Umbrales y calibración de sensores |
| Display | Ajustes de pantalla o LED |
| Power | Ajustes de gestión de energía |
| Network | Configuración de red |
| Other | Ajustes varios |

### Ajustes de solo lectura

Usa ajustes de solo lectura para valores que:
- Establece el dispositivo (lecturas de sensores, indicadores de estado)
- Deben ser visibles para los usuarios, pero no modificables
- Son valores calculados o derivados

### Consejos de validación

- **Ajustes de tipo Number**: establece siempre rangos mín./máx. adecuados para evitar valores no válidos
- **Ajustes de tipo List**: usa nombres de opción claros y descriptivos
- **Precisión**: usa precisión = 0 para enteros y precisión > 0 para decimales

---

## Solución de problemas

### El ajuste no se actualiza

1. Comprueba que el callback está registrado en `setupSinricPro()`
2. Verifica que el ID del ajuste coincide exactamente (distingue mayúsculas de minúsculas)
3. Comprueba que el callback incluye `return true;`

### El ajuste no aparece

1. Confirma que el ajuste está asignado al dispositivo
2. Comprueba que el ajuste no está marcado como de solo lectura (para operaciones de escritura)
3. Actualiza la página del dispositivo

### La generación de código está vacía

1. Comprueba que hay asignado al menos un ajuste que no sea de solo lectura
2. Los ajustes de solo lectura se excluyen del código generado

---

## Resumen

La función de ajustes ofrece una forma flexible de gestionar la configuración de los dispositivos:

1. **Crea** ajustes globales con los tipos y las restricciones adecuados
2. **Asigna** los ajustes a tus dispositivos
3. **Genera** el código del callback para tu firmware
4. **Implementa** el callback para gestionar los cambios de los ajustes

Este enfoque separa la configuración del código, lo que hace que tus dispositivos IoT sean más fáciles de mantener y de usar.
