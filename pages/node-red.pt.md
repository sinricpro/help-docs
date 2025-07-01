---
title: Node-RED
weight: 4
lang: pt
youtubeId: YYjxLY7zioo
---

Com nosso plugin Node-RED, agora você pode receber comandos do Amazon Alexa, Google Home ou SmartThings no Node-RED.

**Instalação**

Clique no menu hambúrguer no canto superior direito e selecione Manage palette, selecione Install, digite [**@sinricpro/node-red-contrib-sinric-pro**](https://flows.nodered.org/node/@sinricpro/node-red-contrib-sinric-pro) e clique no botão install.

Certifique-se de que as ferramentas de linha de comando do Git estão instaladas. Se você estiver em uma distribuição baseada em Debian, como Ubuntu, tente apt:

```
sudo apt install git-all
```

Caso contrário, consulte a documentação do Git

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


![Instalação do Sinric Pro Node-RED]({{ site.github.url }}/public/img/sinricpro_node_red_install.png)

Após a instalação estar completa, um novo conjunto de nós deve aparecer na categoria **sinricpro**

![Nós do Sinric Pro Node-RED]({{ site.github.url }}/public/img/sinricpro_node_red_nodes.png)

**Como usar**

* Vá para o Sinric Pro [**aqui**](https://sinric.pro)

* Crie uma conta ou faça login usando seu endereço de email.

* Crie um novo dispositivo e clique em Save. 

Copie o Device Id, App Key e App Secret da última página. 

![Sinric Pro copiar id do dispositivo]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Crie um novo fluxo ou use um existente e adicione um nó de dispositivo.

* Edite o nó do dispositivo. Digite as credenciais do app e insira os detalhes do dispositivo.

![Nós do Sinric Pro Node-RED]({{ site.github.url }}/public/img/sinric_pro_nodered_app_credential.png)

Uma vez que o nó do dispositivo esteja configurado, comandos de voz relacionados ao dispositivo acima no SinricPro serão encaminhados para este nó Node-RED. 

* Você pode adicionar outro nó (função) para processar esta saída. 

![Nó de função do Sinric Pro Node-RED]({{ site.github.url }}/public/img/sinric_pro_nodered_function_node.png)

* Adicione um nó de **resposta** para enviar a resposta de volta ao servidor Sinric Pro.

![Nó de resposta do Sinric Pro Node-RED]({{ site.github.url }}/public/img/sinric_pro_node_red_response.png)

{% include youtubePlayer.html id=page.youtubeId %}
 
Confira o repositório de [**exemplos**](https://github.com/sinricpro/node-red-contrib-sinric-pro/tree/main/examples) para mais exemplos.