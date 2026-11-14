---
title: Home Assistant
weight: 4
lang: en
description: Connect Sinric Pro to Home Assistant with the official custom integration. Install with HACS, add your API key and control your Sinric Pro devices from Home Assistant.
---

With the [SinricPro Home Assistant integration](https://github.com/sinricpro/homeassistant-sinricpro) you can control your Sinric Pro devices from Home Assistant and use them in Home Assistant automations.

- Configuration from the Home Assistant UI. No YAML required.
- Real-time state updates.
- Sinric Pro alerts appear as Home Assistant notifications.

**1. Get an API Key**

If you do not have a API Key, Login to [Portal](https://portal.sinric.pro) and click **Credentials** or [click here](https://portal.sinric.pro/credential/new/apikey) to generate a new API key.

Copy the API Key. This is **not** the App Key used in your device code.

**2. Install the integration**

*With HACS (recommended)*

1. Open HACS in your Home Assistant instance.
2. Click on **Integrations**.
3. Click the three dots in the top right corner and select **Custom repositories**.
4. Add the repository URL: `https://github.com/sinricpro/homeassistant-sinricpro`
5. Select **Integration** as the category and click **Add**.
6. Search for **SinricPro** and install it.
7. Restart Home Assistant.

*Manually*

1. Download the latest release from the [releases page](https://github.com/sinricpro/homeassistant-sinricpro/releases).
2. Copy the `custom_components/sinricpro` folder into the `custom_components` directory of your Home Assistant configuration.
3. Restart Home Assistant.

**3. Add your Sinric Pro account**

1. Go to **Settings** > **Devices & Services**.
2. Click **+ Add Integration**.
3. Search for **SinricPro**.
4. Enter your Sinric Pro API key and click **Submit**.

Your Sinric Pro devices now appear in Home Assistant.

### Supported devices

| Sinric Pro device type | Home Assistant platform | Features |
| --- | --- | --- |
| Switch | `switch` | On/Off |
| Light | `light` | On/Off, brightness, RGB colour, colour temperature |
| Dimmable Switch | `light` | On/Off, power level. Appears as a dimmable light |
| Blinds | `cover` | Open/Close, position |
| Garage Door | `cover` | Open/Close |
| Doorbell | `event`, `button`, `sensor` | Press event, manual trigger, last ring time |
| Fan | `fan` | On/Off, speed |
| Smart Lock | `lock` | Lock/Unlock |
| Speaker | `media_player` | On/Off, volume, mute |
| TV | `media_player` | On/Off, volume, mute, channel up/down, play/pause |
| Thermostat | `climate` | On/Off, target temperature, mode, current temperature, humidity |
| Window AC Unit | `climate` | Thermostat features and fan mode |
| Air Quality Sensor | `sensor` | PM1.0, PM2.5, PM10 |
| Contact Sensor | `binary_sensor` | Open/Closed |
| Motion Sensor | `binary_sensor` | Motion detected / not detected |
| Temperature Sensor | `sensor` | Temperature, humidity |

Custom device types made with [device templates]({{ site.github.url }}/pages/custom-templates.html) are not supported yet.

### Use Sinric Pro alerts in automations

The integration fires a `sinricpro_alert` event for every Sinric Pro alert. Example:

```yaml
automation:
  - alias: "SinricPro Alert Notification"
    trigger:
      - platform: event
        event_type: sinricpro_alert
    action:
      - service: notify.mobile_app
        data:
          message: "{% raw %}{{ trigger.event.data.message }}{% endraw %}"
```

### Troubleshooting

**"Invalid API key" error**

- Make sure you use the **API key** from the **Credentials** page of the Portal, not the App Key.
- Check that the API key has not expired.

**Devices not appearing**

- Check that the devices exist in your Sinric Pro account and are online in the Portal.
- Reload the integration.

**State not updating**

- Check your network connection and the Home Assistant logs for connection errors.

To enable debug logging, add the following to your `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    custom_components.sinricpro: debug
```

If the problem continues, open an issue on [GitHub](https://github.com/sinricpro/homeassistant-sinricpro/issues).

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
