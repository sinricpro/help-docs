---
title: Tutorial de Interruptor Parte 2 - Como usar um botão para alternar o Relé
layout: post
lang: pt
---

Nesta seção, continuaremos da [Parte 1]({{ site.github.url }}/pt/pages/tutorials/switch/part-1.pt.html) e adicionaremos um botão para ligar e desligar o relé. Também atualizaremos o novo status do relé no servidor Sinric Pro.


![sinricpro relay push button esp8266]({{ site.github.url }}/public/img/sinric_pro_relay_push_button_esp8266.png) 
### Pré-requisitos:


| Componente                  | Quantidade |
| ---------                   | ------- |
| ESP32, ESP8266 ou RaspPi W  |    1     |
| Controlador de relé SPDT    |    1     |
| Botão push                  |    1     |
| Resistor de 10K ohm         |    1     | 
| Cabos jumper                |    1     | 

### Introdução rápida ao botão push e debouncing

Os botões push podem frequentemente gerar sinais falsos quando pressionados. Isso ocorre porque o interruptor mecânico que compõe o botão pode saltar ou vibrar ligeiramente quando é pressionado. Isso pode fazer com que o botão envie múltiplos sinais para o MCU, mesmo que tenha sido pressionado apenas uma vez. O processo de eliminar esses sinais gerados é chamado de debouncing. Para eliminar o ruído do botão push, podemos registrar uma mudança de estado e então ignorar entradas adicionais por alguns milissegundos.

### Fiação

Existem duas maneiras de conectar um botão push.

![Sinric Pro pull-up pull-down]({{ site.github.url }}/public/img/pull-up-pull-down.png) 

**Pull-Up** - Quando o interruptor é pressionado, digitalRead lê sinal LOW (0).

**Pull-Down** - Quando o interruptor é pressionado, digitalRead lê sinal HIGH (1).
 


| MCU       | Pino    | Componente    |
| --------- | ------- | ------- |
| ESP32     |    16   |    Relé   |
| ESP32     |    17   |    Botão   |
| ESP8266   |    12 (D6)    |    Relé   |
| ESP8266   |    15 (D8)    |    Botão   |
| RaspPi W  |    6    |    Relé   |
| RaspPi W  |    7    |    Botão   |

Antes de integrarmos com o sketch da parte 1, é importante verificar se o botão está conectado corretamente e funcionando. Você pode usar o seguinte código para verificar se o botão é pressionado.  

Vamos usar o método **Pull-Down** para conectar nosso botão push.

<script src="https://gist.github.com/kakopappa/23d95c1df56a7c2d2ec9aff1dcdf3a90.js"></script>

![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png) 

Agora vamos completar o sketch com botão push, controlador de relé com integração Sinric Pro.

<script src="https://gist.github.com/kakopappa/86f6f4c65483d6b5c21ba33f9af48d87.js"></script>


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/relay-on-off-switch.mp4" type="video/mp4">
</video>

Continue para a [Parte 3]({{ site.github.url }}/pt/pages/tutorials/switch/part-3.html) desta série de artigos para aprender como controlar múltiplos botões push com múltiplos relés.


### Solução de Problemas
Consulte nossa página de [Solução de Problemas]({{ site.github.url }}/pt/pages/troubleshooting.pt.html) para possíveis soluções para seu problema.

 
> Este documento é código aberto. Viu um erro de digitação? Por favor, crie uma [issue](https://github.com/sinricpro/help-docs)