---
title: Automações
weight: 4
lang: pt
description: Crie automações no Sinric Pro arrastando e soltando. Acione dispositivos por horário, nascer ou pôr do sol, atrasos e eventos de dispositivos, e envie notificações push.
---

### Introdução às automações do SinricPro

O SinricPro permite que você crie rotinas inteligentes e automatizadas para a sua casa, conectando dispositivos e definindo fluxos lógicos. Com o construtor de automações intuitivo, baseado em arrastar e soltar, você pode montar cenários personalizados que respondem a eventos, sejam eles acionados por estados de dispositivos, pelo horário ou por condições do ambiente, sem escrever uma única linha de código.

De tarefas simples, como acender as luzes ao pôr do sol, a sequências complexas com vários dispositivos e atrasos de tempo, as automações do SinricPro deixam a sua casa inteligente mais esperta e mais responsiva. Seja para configurar rotinas do dia a dia ou criar experiências personalizadas, a ferramenta de automação do SinricPro oferece flexibilidade, facilidade de uso e recursos poderosos, tudo em uma interface limpa e amigável.

## Passo 1: Informações básicas

![Sinric Pro automation creation intro]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-info.png) 

O primeiro passo para criar uma automação é informar os dados básicos sobre ela.

### Campos

- **Automation Name**  
  Informe um nome descritivo para a sua automação.  
  *Exemplo:* `TV Time`

- **Automation Description**  
  Escreva uma breve descrição do que a automação faz. Isso ajuda você a lembrar a finalidade dela mais tarde.  
  *Exemplo:* `When TV is on, dim lights`

### Navegação
Depois de preencher as informações básicas, clique no botão **Next** para seguir para a configuração do fluxo (Flow).

---

## Passo 2: Configuração do fluxo

![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-flow.png) 

Neste passo, você define a lógica da sua automação configurando gatilhos (starters), condições (opcionais) e ações.

### Gatilhos, condições e ações de dispositivos

Este painel lista os dispositivos disponíveis que podem ser usados como gatilhos ou componentes da sua automação. Você pode arrastar e soltar esses dispositivos nas seções apropriadas (Starter, Conditions ou Actions).

#### **Starter**

É o evento que inicia a automação. É a parte do "quando" ou do "se" que dá início ao processo. Exemplo: `TV turned on`

#### **Conditions (opcional)**

São verificações adicionais feitas depois que o gatilho ocorre. Se as condições especificadas não forem atendidas, as ações da automação não serão executadas, mesmo que o gatilho tenha sido acionado.

#### **Actions**

As ações a serem executadas. Por exemplo: acender as luzes, ajustar o termostato.

 
####  Gatilhos adicionais baseados em eventos:

- **At a specific time**  
  *Exemplo:* `5:30pm on a Sunday`  
  Aciona a automação em um horário predefinido.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-select-a-time.png)


- **At sunrise or sunset**  
  *Exemplo:* `1hr before sunrise`  
  Aciona com base em eventos astronômicos (nascer ou pôr do sol).

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-sunset-or-sunrise.png)

- **Between two times**  
  *Exemplo:* `between 08:00 to 18:00`  
  Executa a automação somente dentro de um intervalo de tempo especificado. (Usado como condição)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-between-two-times.png) 

- **Time delay**  

  Adiciona um atraso entre as etapas do fluxo da automação. (Usado como ação)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-add-time-delay.png) 

- **Push Notification**  
  Envia uma notificação push quando acionada.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-push-notification.png) 

> 💡 Dica: use essas opções para adicionar lógica baseada em tempo ou em contexto à sua automação.

Depois de configurar todas as partes da automação:

- Clique no botão **Save**, no canto inferior direito, para salvar a sua automação.

---

## Exemplo de fluxo de automação

Vamos percorrer um exemplo:

1. **Informações básicas**
   - Automation Name: `Evening Lights`
   - Automation Description: `Turn on living room lights at sunset`

2. **Fluxo**
   - **Starter:** adicione "At sunset" a partir do painel da direita.
   - **Conditions:** nenhuma (opcional).
   - **Actions:** arraste "living room light" para a seção Actions e configure para ligar.

Isso cria uma automação simples que acende as luzes da sala todas as noites, ao pôr do sol.

---

## Boas práticas

- Use nomes e descrições claros e concisos.
- Teste as automações depois de salvar para garantir que funcionam como esperado.
- Combine eventos de dispositivos com gatilhos baseados em tempo para deixar a casa mais inteligente.
