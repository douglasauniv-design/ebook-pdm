---
sidebar_label: "⚡ Atividade: useEffect"
---

# ⚡ Atividade Prática: useEffect

Nesta atividade, você vai criar uma interface simples para simular o funcionamento de um sensor de proximidade. O objetivo é criar um componente que inicia um monitoramento automático ao ser montado, reage a mudanças de distância e limpa seus processos ao ser encerrado.

## Objetivo

Neste atividade, você vai criar uma tela que simule um sensor de estacionamento. Com isso, praticar o controle total do **ciclo de vida**: disparar configurações no nascimento do componente (mount), reagir a dados específicos durante sua existência (update) e garantir o encerramento correto de recursos para evitar o consumo desnecessário de memória (unmount).

## Instruções da Atividade

Crie uma tela de "Sensor de Estacionamento" seguindo estas especificações:

### 1. Inicialização (Array Vazio `[]`)

- Ao abrir a tela, o app deve exibir uma mensagem no **console**: `"📡 Sistema de Sensores Iniciado"`.
- Deve-se configurar um `setInterval` que gera um **log no console a cada 2 segundos** apenas para indicar que o sistema está "vivo".

### 2. Monitoramento (Array de Dependências `[distancia]`)

- Crie um estado `distancia` (valor numérico).
- Crie um `TextInput` para o usuário digitar a distância (em cm) ou botões que somam/subtraem valores.
- Use um `useEffect` que observa a `distancia`:
  - Sempre que a distância mudar, se ela for menor que **20cm**, exiba um `Alert.alert("⚠️ PERIGO: Muito Próximo!")`.

### 3. Finalização (Callback de Limpeza)

- No retorno (cleanup) do efeito de inicialização, você deve:
  - Parar o `setInterval` criado no item 1.
  - Exibir um log no **console**: `"📴 Sistema de Sensores Desligado".`

**Dica**: Para testar o "Unmount" (desmontagem), você pode criar um botão no componente pai que mostre/esconda (renderização condicional) este componente do Sensor.

:::info Desafio
Crie uma estilização bacana para esta tela. Seja criativo!
:::

### 4. O que Você Deve Observar

- **Ao carregar**: aparece a mensagem de sistema iniciado.
- **Ao digitar/mudar a distância**: o alerta de perigo só deve disparar se o valor atingir o limite.
- **Ao "fechar" o sensor**: a mensagem de sistema desligado deve aparecer imediatamente, e o log do intervalo deve parar de rodar.
