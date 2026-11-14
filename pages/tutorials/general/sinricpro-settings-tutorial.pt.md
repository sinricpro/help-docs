---
title: Tutorial de Configurações
layout: post
lang: pt
description: Use as configurações personalizadas do Sinric Pro para alterar remotamente valores de configuração no seu ESP32 ou ESP8266, sem regravar o firmware.
---

As Configurações Personalizadas são um recurso poderoso que permite definir e gerenciar parâmetros de configuração para seus dispositivos e módulos. Em vez de fixar valores no código do firmware, você pode criar configurações que podem ser alteradas remotamente pelo Portal ou pelo app SinricPro.


![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings.png)

### Requisitos de SDK

Para usar o recurso de Configurações, certifique-se de ter as seguintes versões de SDK:

| SDK | Versão mínima |
|-----|-----------------|
| **ESP8266/ESP32 SDK** | 4.0 |
| **Node.js SDK** | 5.1.0 |
| **Python SDK** | 5.0.1 |

---

**Observação**: Essas configurações não podem ser controladas pela Amazon Alexa nem pelo Google Home.

O recurso de Configurações permite que você:

- **Defina parâmetros de configuração personalizados** para seus dispositivos (por exemplo, limites de temperatura, durações de temporizador, modos de operação)
- **Altere o comportamento do dispositivo remotamente** sem regravar o firmware
- **Crie configurações reutilizáveis** que podem ser atribuídas a vários dispositivos
- **Organize as configurações por categoria** para facilitar o gerenciamento

### Tipos de configurações

O SinricPro oferece três tipos de configurações:

| Tipo | Descrição | Exemplos de uso |
|------|-------------|-------------------|
| **Number** | Valores numéricos com faixa mín./máx., precisão e unidades opcionais | Limite de temperatura (0-100°C), velocidade do ventilador (0-100%), duração do temporizador (segundos) |
| **List** | Seleção em lista suspensa a partir de opções predefinidas | Modo de operação (Off/Low/Medium/High), perfil de energia (Eco/Normal/Performance) |
| **Boolean** | Chave simples de liga/desliga | Ativar notificações, modo de depuração, modo noturno |

As configurações podem ser criadas em dois níveis:

- **Configurações de dispositivo**: Aplicam-se a dispositivos IoT individuais (por exemplo, um interruptor inteligente específico)
- **Configurações de módulo**: Aplicam-se a módulos ESP/placas controladoras (por exemplo, a configuração de WiFi do próprio módulo)

---

## Como configurar as Configurações Personalizadas

### Passo 1: Criar uma configuração global

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-global-device-settings-management.png)

As configurações globais são modelos reutilizáveis que podem ser atribuídos a vários dispositivos.

1. Navegue até **Devices** → **Global Device Settings** (para configurações de dispositivo) ou **Modules** → **Global Module Settings** (para configurações de módulo)

2. Clique em **Create New Setting**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-create-settings.png)

3. Preencha as **Basic Information**:
   - **Name**: Um nome descritivo (por exemplo, "Temperature Threshold")
   - **Setting ID**: Gerado automaticamente a partir do nome (por exemplo, `id_temperature_threshold`)
   - **Description**: Explicação opcional do que essa configuração faz
   - **Category**: Agrupe suas configurações (General, Operation, Timer, Sensors etc.)
   - **Order**: Ordem de exibição (0 = primeiro)

4. Configure o **Value Type**:

   **Para configurações do tipo Number:**
   - Defina os valores mínimo e máximo
   - Escolha a precisão (casas decimais: 0-4)
   - Opcionalmente, especifique uma unidade (°C, %, RPM, sec etc.)
   - Ative "Is Percentage" para a faixa de 0-100% com formatação automática

   **Para configurações do tipo List:**
   - Adicione de 2 a 20 opções
   - Cada opção deve ser única
   - A primeira opção se torna o padrão

   **Para configurações do tipo Boolean:**
   - Nenhuma configuração adicional é necessária
   - É exibida como uma chave Enabled/Disabled

5. **Opcional**: Ative **Read-Only** se o dispositivo define esse valor e os usuários devem apenas visualizá-lo (por exemplo, leituras de sensores)

6. Clique em **Create** para salvar a configuração

### Passo 2: Atribuir configurações a um dispositivo

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-assign-settings.png)

Depois de criar as configurações globais, atribua-as aos seus dispositivos:

*Opção 1:*

1. Vá em **Devices**, selecione o dispositivo que você quer configurar e clique em **Edit**

2. Clique na aba **Other**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-edit-settings-other.png)

3. Em Custom Settings, clique em **Setup** para abrir a janela de atribuição de configurações

4. Clique na lista suspensa **Select a setting** e escolha uma configuração para atribuir

5. Para atribuir várias configurações, clique em **+**

6. Revise as configurações que você selecionou - você pode ver:
   - Nome e ID da configuração
   - Tipo (Number/List/Boolean)
   - Categoria
   - Status de somente leitura

7. Clique em **Save** para aplicar as configurações ao seu dispositivo

*Opção 2:*

1. Vá em **Dashboard**, selecione o dispositivo que você quer configurar e clique em **Settings**

![Sinric Pro Settings]({{ site.github.url }}/public/img/sinricpro-device-settings-manage-settings.png)

2. Clique em **Manage Settings** e em **Select a setting**

4. Na janela **Select a setting**, escolha uma configuração para atribuir

4. Para atribuir várias configurações, clique em **+**

5. Revise as configurações que você selecionou - você pode ver:
   - Nome e ID da configuração
   - Tipo (Number/List/Boolean)
   - Categoria
   - Status de somente leitura

6. Clique em **Save** para aplicar as configurações ao seu dispositivo

### Passo 3: Gerar o código para o seu firmware

Depois de atribuir as configurações, gere o código de callback para o seu firmware:

1. Na janela de atribuição de configurações, clique em **Get Code**

2. Selecione seu SDK:
   - **Arduino ESP-8266/ESP-32/RP2040**
   - **NodeJS**
   - **Python**

3. Copie o código gerado e integre-o ao seu firmware
 
---

## Usando as configurações no seu código

### Arduino/ESP SDK

#### Callback de configurações de dispositivo

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

#### Evento de configurações de dispositivo

```cpp
void sendLedState() {
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
  Serial.printf("Sending device setting 'id_led' = %s\r\n", ledState ? "true" : "false");
  mySwitch.sendSettingEvent('id_led', ledState);
}
```


#### Callback de configurações de módulo

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

#### Evento de configurações de módulo

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

## Boas práticas

### Convenções de nomenclatura

- Use nomes descritivos: "Temperature Threshold" em vez de "Temp"
- Os IDs das configurações são gerados automaticamente: `id_temperature_threshold`
- Agrupe configurações relacionadas usando categorias

### Categorias

Organize suas configurações usando as categorias integradas:

| Categoria | Usar para |
|----------|---------|
| General | Configuração básica do dispositivo |
| Operation | Modos de operação e comportamentos |
| Position | Configurações de posição/nível (persianas, dimmers) |
| Timer | Configurações relacionadas a tempo (atrasos, durações) |
| Sensors | Limites e calibração de sensores |
| Display | Configurações de display/LED |
| Power | Configurações de gerenciamento de energia |
| Network | Configuração de rede |
| Other | Configurações diversas |

### Configurações somente leitura

Use configurações somente leitura para valores que:
- São definidos pelo dispositivo (leituras de sensores, indicadores de status)
- Devem ficar visíveis para os usuários, mas não podem ser alterados
- São valores calculados ou derivados

### Dicas de validação

- **Configurações do tipo Number**: Sempre defina faixas mín./máx. adequadas para evitar valores inválidos
- **Configurações do tipo List**: Forneça nomes de opções claros e descritivos
- **Precisão**: Use precisão = 0 para inteiros e precisão > 0 para decimais

---

## Solução de problemas

### A configuração não é atualizada

1. Certifique-se de que o callback está registrado em `setupSinricPro()`
2. Verifique se o ID da configuração coincide exatamente (diferencia maiúsculas de minúsculas)
3. Confira se `return true;` está incluído no callback

### A configuração não aparece

1. Confirme se a configuração está atribuída ao dispositivo
2. Verifique se a configuração não está marcada como somente leitura (para operações de escrita)
3. Atualize a página do dispositivo

### Geração de código vazia

1. Certifique-se de que pelo menos uma configuração que não seja somente leitura está atribuída
2. As configurações somente leitura são excluídas do código gerado

---

## Resumo

O recurso de Configurações oferece uma forma flexível de gerenciar a configuração dos dispositivos:

1. **Crie** configurações globais com os tipos e as restrições adequados
2. **Atribua** as configurações aos seus dispositivos
3. **Gere** o código de callback para o seu firmware
4. **Implemente** o callback para tratar as alterações de configuração

Essa abordagem separa a configuração do código, tornando seus dispositivos IoT mais fáceis de manter e de usar.
