---
sidebar_label: "⚡ Atividade: Interpolação"
---

# ⚡ Atividade Prática: Catálogo de Itens Dinâmico

Chegou a hora de colocar a mão na massa! Nesta atividade, você vai criar a interface de um catálogo para um aplicativo (ex: Garagem de Carros, Lista de Filmes ou Cardápio). O objetivo é praticar como transformar uma lista de dados em elementos visuais.

## Objetivo

Construir uma tela que utilize Interpolação de variáveis e Loops de renderização (`.map`) para exibir informações dinâmicas de um objeto JSON.

## Instruções da Atividade

### 1. Preparação dos Dados

No topo do seu componente (antes do `return`), crie um array de objetos chamado `dataList`. Escolha um tema e defina pelo menos 3 itens.

Cada objeto deve ter:

- `name`: Nome do item.
- `price`: Valor numérico.
- `category`: Categoria (ex: 'SUV', 'Ação', 'Sobremesa').
- `onSale`: Um valor booleano (`true` ou `false`).

### 2. Interface e Interpolação

Dentro do seu `return`, você deve:

- **Fazer uma saudação**: Criar uma variável `userName` e interpolá-la em um `<Text>` no topo da tela.
- **Listar dados**: Usar o `.map()` para percorrer o seu array `dataList`.
- **Exibir dados condicionalmente**: Se `onSale` for `true`, exiba um pequeno texto ou ícone de "OFERTA" (você pode usar um badge, como nos exemplos da aula).
  - **Dica**: Use um operador ternário para mudar a cor do preço (ex: verde se estiver em oferta, cinza se não estiver).

### 3. Regras Técnicas

- Use o **índice** (`index`) do map como a propriedade `key` de cada item.
- Mantenha o **código** (variáveis e propriedades) em **inglês**.
- **Comente** o que cada parte do código faz em **português**.
