---
title: Supported Devices
weight: 3
---
 

Following device types are supported at the moment

**Devices**
 - [x] [Smart Switch](devices/smart_switch.html)
 - [x] [Smart Light Bulb](devices/smart_light_bulb.html)
 - [x] [Smart Switch with Dimmer](devices/smart_switch_with_dimmer.html)
 - [x] [Doorbell](devices/doorbell.html)
 - [x] [Window AC Unit](devices/window_ac_unit.html)
 - [x] [Fan](devices/fan.html)
 - [x] [Thermostat](devices/thermostat.html)
 - [x] [TV](devices/tv.html)
 - [x] [Smart Speaker](devices/smart_speaker.html)
 - [x] [Smart Lock](devices/smart_lock.html)
 - [ ] Sliding Door / Garage Door
 - [ ] Smart Blinds
 - [ ] Smart Oven

**Senors**
 - [x] [Temperature/Humidity Sensor](devices/temperature_sensor.html)
 - [x] [Motion Sensor](devices/motion_sensor.html)
 - [x] [Contact Sensor](devices/contact_sensor.html)
 - [ ] CO2 Gas Sensor


## Complete list of requests, responses and events

This is a complete list of requests, responses and events by the device type

| Device type               |Action |Event| 
|----------------|------|---------|------|
|**Smart Switch** | [setPowerState](actions/set_power_state.html) | [setPowerState](actions/set_power_state.html)
|**Smart Light Bulb**  |[setPowerState](actions/set_power_state.html), [adjustBrightness](actions/adjust_brightness.html), [setBrightness](actions/set_brightness.html), [setColor](actions/set_color.html), [decreaseColorTemperature](actions/decrease_color_temperature.html), [increaseColorTemperature](actions/increase_color_temperature.html), [setColorTemperature](actions/set_color_temperature.html), [setPowerLevel](actions/set_power_level.html), [adjustPowerLevel](actions/adjust_power_level.html)|[setPowerState](actions/set_power_state.html), [setPowerLevel](actions/set_power_level.html), [setColor](actions/set_color.html), [currentTemperature](actions/set_color_temperature.html)|          
|**Smart Switch with Dimmer**|[setPowerState](actions/set_power_state.html), [setPowerLevel](actions/set_power_level.html) [adjustPowerLevel](actions/adjust_power_level.html)|[setPowerState](actions/set_power_state.html), [setPowerLevel](actions/set_power_level.html)|
|**Doorbell**| [setPowerState](actions/set_power_state.html)|[DoorbellPress](actions/doorbell_press.html), [setPowerState](actions/set_power_state.html)|
|**Temperature Sensor** |[setPowerState](actions/set_power_state.html)|[setPowerState](actions/set_power_state.html), [currentTemperature](actions/current_temperature.html)|
|**Thermostat**|[setPowerState](actions/set_power_state.html),[adjustPowerLevel](actions/target_temperature.html), [setThermostatMode](actions/set_thermostat_mode.html)|[setPowerState](actions/set_power_state.html), [adjustPowerLevel](actions/target_temperature.html), [setThermostatMode](actions/set_thermostat_mode.html), [currentTemperature](actions/current_temperature.html)|
|**Window AC Unit**|[setPowerState](actions/set_power_state.html), [adjustPowerLevel](actions/target_temperature.html), [setThermostatMode](actions/set_thermostat_mode.html), [setRangeValue](actions/set_range_value.html), [adjustRangeValue](actions/adjust_range_value.html)|[setPowerState](actions/set_power_state.html), [adjustPowerLevel](actions/target_temperature.html), [setThermostatMode](actions/set_thermostat_mode.html), [setRangeValue](actions/set_range_value.html), [currentTemperature](actions/current_temperature.html)|
|**Fan**|[setPowerState](actions/set_power_state.html), [setRangeValue](actions/set_range_value.html)|[setPowerState](actions/set_power_state.html), [setRangeValue](actions/set_range_value.html)|
|**Motion Sensor**|[setPowerState](actions/set_power_state.html)|[setPowerState](actions/set_power_state.html), [motion](actions/motion.html)|
|**Contact Sensor**|[setPowerState](actions/set_power_state.html)|[setPowerState](actions/set_power_state.html), [selectInput](actions/set_contact_state.html)|
|**TV**|[setPowerState](actions/set_power_state.html), [setVolume](actions/set_volume.html), [adjustVolume](actions/adjust_volume.html), [setMute](actions/set_mute.html), [mediaControl](actions/media_control.html), [selectInput](actions/select_input.html), [changeChannel](actions/change_channel.html), [skipChannels](actions/skip_channels.html)|[setPowerState](actions/set_power_state.html), [setVolume](actions/set_volume.html), [setMute](actions/set_mute.html), [mediaControl](actions/media_control.html), [selectInput](actions/select_input.html), [changeChannel](actions/change_channel.html)|
|**Smart Speaker**|[setPowerState](actions/set_power_state.html), [setVolume](actions/set_volume.html), [adjustVolume](actions/adjust_volume.html), [setMute](actions/set_mute.html), [mediaControl](actions/media_control.html), [setBands](actions/set_bands.html), [adjustBands](actions/adjust_bands.html), [resetBands](actions/reset_bands.html), [setMode](actions/set_mode.html)|[setPowerState](actions/set_power_state.html), [setVolume](actions/set_volume.html), [setMute](actions/set_mute.html), [mediaControl](actions/media_control.html), [setBands](actions/set_bands.html), [resetBands](actions/reset_bands.html), [setMode](actions/set_mode.html)|
|**Smart Doorlock**|[setLockState](actions/set_lock_state.html)|[setLockState](actions/set_lock_state.html)| 

 > This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
