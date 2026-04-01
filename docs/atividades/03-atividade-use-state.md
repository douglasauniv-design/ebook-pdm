---
sidebar_label: "⚡ Atividade: useState"
---

# ⚡ Atividade Prática: useState

Nesta atividade, você vai criar uma interface simples de identificação de visitantes a um complexo turístico. O objetivo é praticar a captura de texto, o uso de estados para controle de fluxo e a reação da interface ao clique.

## Objetivo

Crie uma tela com comportamento dinâmico, que varie sua apresentação de acordo com os valores armazenados em um estado persistente. Você vai ter "duas telas em uma". Inicialmente, um formulário será exibido, depois, ao autorizar o acesso, você deverá ter uma apresentação diferente desta mesma tela. A imagem a seguir serve como inspiração para este fluxo, você pode usar a criatividade e criar algo diferente se quiser.

<img
src={require('@site/static/img/atividades/atividade-useState.jpg').default}
alt="Foto exemplo da atividade"
style={{ height: '400px', borderRadius: '10px', display: 'block', margin: '0 0 24px'}}
/>

## Instruções da Atividade

Crie uma tela de "Identificação de Visitante" seguindo estas especificações:

### 1. Estados Necessários

- `name`: Um `useState` tipado explicitamente para armazenar o texto digitado.
- `accessAuthorized`: Um `useState` tipado explicitamente para controlar se o botão foi clicado (verdadeiro/falso).

### 2. Interface de Entrada (Formulário)

- Um `TextInput` com um `placeholder` dizendo _"Digite seu nome completo"_.
- Um `Button` com o título `"Solicitar Acesso"`.

### 3. Lógica de Exibição (Renderização Condicional)

- Enquanto o acesso não for autorizado (`false`): Mostre o campo de texto e o botão.
- Não permita que o usuário pressione o botão sem digitar o nome no campo de texto (valide e use a prop `disabled` quando a ação não for possível).
- Quando acesso for concedido (`true`): Esconda o formulário e mostre uma mensagem de boas-vindas: _"Acesso Liberado para: [nome do visitante]"_.

### 4. O que Você Deve Observar

- **TypeScript**: Garanta que seus estados possuam tipos explícitos (sintaxe: `< >` no `useState`).
- **Evento** `onChangeText`: Certifique-se de que o estado `name` reflita exatamente o que está no input.
- **Reset de Fluxo (Bônus)**: Adicione um segundo botão de _"Sair"_ que aparece apenas após o acesso, voltando o estado `accessoAuthorized` para `false` e limpando o input do nome.
