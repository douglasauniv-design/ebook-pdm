---
sidebar_label: "⚡ Atividade: Expo Router"
---

# ⚡ Atividade: Roteamento com Expo Router

Nesta atividade, vamos construir um aplicativo minimalista chamado **"Clube de Cinema"**. O objetivo é praticar os três tipos principais de navegação e passagem de parâmetros utilizando o **Expo Router**, focando em uma estrutura de arquivos enxuta e no uso de componentes declarativos (`Link`) e imperativos (`router`).

## Objetivo
Criar um projeto com **apenas 3 telas** que demonstrem:
1. Navegação sem parâmetros (com comportamento padrão).
2. Navegação com **Route Params** (parâmetros de rota dinâmica).
3. Navegação com **Query Params** (parâmetros de busca).
4. Uso obrigatório de `<Link>` e do objeto `router`.

---

## Instruções da Atividade

### 1. Preparação do Ambiente

Para iniciar, crie um novo projeto Expo com o template de navegação:

1. `yarn create expo --template`
2. Selecione a opção `Navigation (TypeScript)`
3. Esse template vem com algumas telas e arquivos de exemplo, remova todas e crie apenas as telas necessárias para a atividade.

> Você pode seguramente excluir as pastas `components`, `constants`, e todo o conteúdo da pasta `app/`.

### 2. Tela Inicial (`app/index.tsx`)
Esta será a tela base do aplicativo. Ela deve conter um título "Clube de Cinema" e **três botões** (ou `Pressables`) com as seguintes regras:

- **Botão 1: "Entrar como Convidado"**
  - Deve navegar para a rota `/home`.
  - **Requisito:** Use obrigatoriamente o componente `<Link>` do `expo-router`.
- **Botão 2: "Entrar como Usuário Logado"**
  - Deve navegar para a rota `/home`, mas passando um **Query Param**: `?user=Fulano`.
  - **Requisito:** Use obrigatoriamente o método `router.push()`.
- **Botão 3: "Ver um Filme Aleatório"**
  - Deve navegar para a rota dinâmica de um filme, passando um ID aleatório entre `0` e `9`. (Ex: `/filme/8`).
  - **Requisito:** Use obrigatoriamente o método `router.push()`.

### 3. Tela Home (`app/home.tsx`) - Comportamento Dinâmico
Crie o arquivo `app/home.tsx`. Esta tela deve se comportar de forma diferente dependendo se recebeu o parâmetro de usuário ou não:
- Inicialmente, capture o parâmetro `user`.
- **Lógica:**
  - Se o parâmetro `user` não existir (acesso via Link), exiba uma mensagem genérica: `"Bem-vindo ao Clube de Cinema! Ingresso R$20,00." `.
  - Se o parâmetro `user` possuir um valor (acesso via Admin), exiba: `"Bem-vindo, [valor_do_parametro]! Hoje tem promoção para sócios! Ingresso R$10,00." `.
- Adicione um botão para voltar à tela inicial (`index`). Este botão deve executar uma ação do tipo "voltar", ou seja, deve retornar para a tela anterior sem "empilhar" uma nova tela "index" sobre a atual.

> **Dica 1**: Seja criativo, estilize a tela home, crie um layout legal.

> **Dica 2**: Ao implementar o botão de retorno, evite utilizar `router.push("/")`. Se você fizer isso, estará empilhando uma nova cópia da tela inicial sobre a atual, o que "suja" o histórico de navegação. Procure na documentação do Expo Router por métodos que realizam o retorno removendo a tela atual da pilha.

### 4. Tela de Detalhes do Filme (`app/movie/[id].tsx`)

Esta tela irá receber um ID baseado no nome do arquivo e deve exibir o nome do filme baseado no ID. Para facilitar, crie uma array de filmes no topo do arquivo `movie/[id].tsx`, ex:

```typescript
const FILMES = [
  { id: '0', nome: 'Interestelar' },
  { id: '1', nome: 'A Origem' },
  { id: '2', nome: 'Batman: O Cavaleiro das Trevas' },
  ...
];
```

Crie a pasta `movie` dentro de `app` e, dentro dela, o arquivo `[id].tsx`. 
- Utilize um dos hooks do expo router para capturar o `id`.
- Exiba na tela o texto: `"Exibindo detalhes do filme: [nome_do_filme_baseado_no_id]"`.
- Adicione um botão para voltar à Home.

---

## O que você deve observar?

1. **Flexibilidade da mesma tela:** Note como a tela `/home` consegue atender a dois fluxos diferentes (com e sem parâmetros).
2. **Link vs Router:** O `<Link>` é excelente para navegações simples e estáticas, enquanto o `router.push()` permite uma lógica mais dinâmica dentro de funções.
3. **Captura Unificada:** Perceba que o Expo Router usa o mesmo hook para capturar tanto path params (`/movie/:id`) quanto query params (`?user=Fulano`).
4. **Rotas Dinâmicas:** O uso de colchetes `[id].tsx` transforma o nome do arquivo em uma variável que o React Native consegue ler, permitindo que uma única tela sirva para milhares de filmes diferentes.
5. **Ação de Voltar:** Ao implementar o botão de retorno, perceba que você está usando a ação de "voltar" do Expo Router, removendo a tela atual da pilha de navegação.
