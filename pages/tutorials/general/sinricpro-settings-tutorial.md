---
title: Settings Tutorial
layout: post
lang: en
---

Custom Settings is a powerful feature that allows you to define and manage configuration parameters for your devices and modules. Instead of hardcoding values in your firmware, you can create settings that can be changed remotely through the SinricPro Portal or app.

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings.png)
 
---

The Settings feature enables you to:

- **Define custom configuration parameters** for your devices (e.g., temperature thresholds, timer durations, operating modes)
- **Change device behavior remotely** without re-flashing firmware
- **Create reusable settings** that can be assigned to multiple devices
- **Organize settings by category** for better management

### Types of Settings

SinricPro supports three types of settings:

| Type | Description | Example Use Cases |
|------|-------------|-------------------|
| **Number** | Numeric values with optional min/max range, precision, and units | Temperature threshold (0-100°C), Fan speed (0-100%), Timer duration (seconds) |
| **List** | Dropdown selection from predefined options | Operating mode (Off/Low/Medium/High), Power profile (Eco/Normal/Performance) |
| **Boolean** | Simple on/off toggle | Enable notifications, Debug mode, Night mode |

Settings can be created at two levels:

- **Device Settings**: Apply to individual IoT devices (e.g., a specific smart switch)
- **Module Settings**: Apply to ESP modules/controller boards (e.g., WiFi configuration for the module itself)

---

## Setting Up Custom Settings

### Step 1: Create a Global Setting

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-global-device-settings-management.png)

Global settings are reusable templates that can be assigned to multiple devices.

1. Navigate to **Devices** → **Global Device Settings** (for device settings) or **Modules** → **Global Module Settings** (for module settings)

2. Click **Create New Setting**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-create-settings.png)

3. Fill in the **Basic Information**:
   - **Name**: A descriptive name (e.g., "Temperature Threshold")
   - **Setting ID**: Auto-generated from name (e.g., `id_temperature_threshold`)
   - **Description**: Optional explanation of what this setting does
   - **Category**: Group your settings (General, Operation, Timer, Sensors, etc.)
   - **Order**: Sort order for display (0 = first)

4. Configure the **Value Type**:

   **For Number Settings:**
   - Set minimum and maximum values
   - Choose precision (decimal places: 0-4)
   - Optionally specify a unit (°C, %, RPM, sec, etc.)
   - Enable "Is Percentage" for 0-100% range with automatic formatting

   **For List Settings:**
   - Add 2-20 options
   - Each option must be unique
   - First option becomes the default

   **For Boolean Settings:**
   - No additional configuration needed
   - Displays as Enabled/Disabled toggle

5. **Optional**: Enable **Read-Only** if the device sets this value and users should only view it (e.g., sensor readings)

6. Click **Create** to save the setting

### Step 2: Assign Settings to a Device

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-assign-settings.png)

Once you've created global settings, assign them to your devices:

*Option 1:*

1. Go to **Devices** and select the device you want to configure, click **Edit**

2. Click on the **Other** tab

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-edit-settings-other.png)

3. In Custom Settings, click **Setup** to open the settings assignment dialog

4. Click **Select a setting** dropdown and choose a setting to assign

5. To assign multiple settings, click **+**

6. Review the settings you've selected - you can see:
   - Setting name and ID
   - Type (Number/List/Boolean)
   - Category
   - Read-only status

7. Click **Save** to apply the settings to your device

*Option 2:*

1. Go to **Dashboard** and select the device you want to configure, click **Settings**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings-manage-settings.png)

2. Click **Manage Settings** and **Select a setting**

4. On **Select a setting** dialog, choose a setting to assign

4. To assign multiple settings, click **+**

5. Review the settings you've selected - you can see:
   - Setting name and ID
   - Type (Number/List/Boolean)
   - Category
   - Read-only status

6. Click **Save** to apply the settings to your device

### Step 3: Generate Code for Your Firmware

After assigning settings, generate the callback code for your firmware:

1. In the settings assignment dialog, click **Get Code**

2. Select your SDK:
   - **Arduino ESP-8266/ESP-32/RP2040**
   - **NodeJS**
   - **Python**

3. Copy the generated code and integrate it into your firmware
 
---

## Using Settings in Your Code

### Arduino/ESP SDK

#### Device Settings Callback

```cpp
bool onSetDeviceSetting(const String& deviceId, const String& settingId, SettingValue& settingValue) {
  if (settingId == "id_temperature_threshold") {
    Serial.printf("Device %s: Setting %s = %.2f\r\n", deviceId.c_str(), settingId.c_str(), settingValue.asFloat());
    // Apply your logic here
    float threshold = settingValue.asFloat();
    setTemperatureThreshold(threshold);
  } else if (settingId == "id_power_mode") {
    Serial.printf("Device %s: Setting %s = %s\r\n", deviceId.c_str(), settingId.c_str(), settingValue.asString().c_str());
    // Handle list setting
    String mode = settingValue.asString();
    setPowerMode(mode);
  } else if (settingId == "id_notifications_enabled") {
    Serial.printf("Device %s: Setting %s = %s\r\n", deviceId.c_str(), settingId.c_str(), settingValue.asBool() ? "true" : "false");
    // Handle boolean setting
    bool enabled = settingValue.asBool();
    setNotifications(enabled);
  }

  return true;
}

void setupSinricPro() {
  // ... your existing setup code ...

  // Register the device setting callback
  myDevice.onSetSetting(onSetDeviceSetting);

  SinricPro.begin(APP_KEY, APP_SECRET);
}
```

#### Module Settings Callback

```cpp
bool onSetModuleSetting(const String& settingId, SettingValue& value) {
  if (settingId == "id_wifi_retry_count") {
    Serial.printf("Setting %s = %d\r\n", settingId.c_str(), value.asInt());
    int retryCount = value.asInt();
    setWifiRetryCount(retryCount);
  }

  return true;
}

void setupSinricPro() {
  // ... your existing setup code ...

  // Register module setting callback
  SinricPro.onSetSetting(onSetModuleSetting);

  SinricPro.begin(APP_KEY, APP_SECRET);
}
```

#### SettingValue Methods

| Method | Returns | Use For |
|--------|---------|---------|
| `settingValue.asBool()` | `bool` | Boolean settings |
| `settingValue.asInt()` | `int` | Number settings (precision = 0) |
| `settingValue.asFloat()` | `float` | Number settings (precision > 0) |
| `settingValue.asString()` | `String` | List settings |

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

### Naming Conventions

- Use descriptive names: "Temperature Threshold" instead of "Temp"
- Setting IDs are auto-generated: `id_temperature_threshold`
- Group related settings using categories

### Categories

Organize your settings using the built-in categories:

| Category | Use For |
|----------|---------|
| General | Basic device configuration |
| Operation | Operating modes and behaviors |
| Position | Position/level settings (blinds, dimmers) |
| Timer | Time-related settings (delays, durations) |
| Sensors | Sensor thresholds and calibration |
| Display | Display/LED settings |
| Power | Power management settings |
| Network | Network configuration |
| Other | Miscellaneous settings |

### Read-Only Settings

Use read-only settings for values that:
- Are set by the device (sensor readings, status indicators)
- Should be visible to users but not changeable
- Are computed or derived values

### Validation Tips

- **Number settings**: Always set appropriate min/max ranges to prevent invalid values
- **List settings**: Provide clear, descriptive option names
- **Precision**: Use precision = 0 for integers, precision > 0 for decimals

---

## Troubleshooting

### Setting Not Updating

1. Ensure the callback is registered in `setupSinricPro()`
2. Verify the setting ID matches exactly (case-sensitive)
3. Check that `return true;` is included in the callback

### Setting Not Appearing

1. Confirm the setting is assigned to the device
2. Check that the setting is not marked as read-only (for write operations)
3. Refresh the device page

### Code Generation Empty

1. Ensure at least one non-read-only setting is assigned
2. Read-only settings are excluded from generated code

---

## Summary

The Settings feature provides a flexible way to manage device configuration:

1. **Create** global settings with appropriate types and constraints
2. **Assign** settings to your devices
3. **Generate** callback code for your firmware
4. **Implement** the callback to handle setting changes

This approach separates configuration from code, making your IoT devices more maintainable and user-friendly.
