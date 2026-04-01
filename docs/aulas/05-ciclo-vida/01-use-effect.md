import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# O Ciclo de Vida e o Hook `useEffect`

Se o `useState` é a **memória** do componente, o `useEffect` é o seu **instinto de reação**.

Até agora, vimos que um componente é uma função que o React executa para desenhar a tela. Mas e se quisermos que algo aconteça depois que esse desenho terminar? Ou se quisermos que o app busque dados na internet assim que abrir?

## O que é um "Efeito Colateral"?

No React, chamamos de **Side Effect** (Efeito Colateral) qualquer ação que aconteça fora do fluxo puramente visual do componente. Exemplos:

- Buscar dados em uma API.
- Iniciar um cronômetro ou intervalo.
- Configurar uma assinatura de banco de dados.
- Alterar manualmente algo no dispositivo (como o brilho da tela).

## O Hook `useEffect`

O `useEffect` é um hook de "reação", ou seja, ele vai disparar um comportamento sempre que "algo" ocorrer. Esse hook aceita dois argumentos: uma **função** (o que fazer) e um **array de dependências** (quando fazer).

A forma padrão do hook `useEffect` é:

<!-- prettier-ignore-start -->
```tsx
import { useEffect } from 'react';

useEffect(() => {
  // O código que você quer executar (o efeito)
  console.log("O componente acabou de aparecer ou atualizar!");
}, [ /* array de dependências */ ]);
```
<!-- prettier-ignore-end -->

O React garante que a função dentro do `useEffect` só será executada **após** o componente ter sido renderizado e os elementos estarem na tela. Isso evita que o código "trave" a renderização visual do usuário enquanto espera por uma tarefa pesada.

## O Array de Dependências: O "Vigia" do Hook

Já compreendemos que o **primeiro argumento** do hook `useEffect` é uma função (callback) que será executada como reação a determinadas mudanças, mas que mudanças são essas? Aqui entra o **segundo argumento** do hook (o array `[]`). Esse array serve como um filtro, ele diz ao React: "Só execute este efeito se um destes valores mudar".

### Caso A: O Array Vazio `[]` (Executa apenas no "Mount")

Quando passamos um array vazio, o efeito nasce e morre com o componente. Ele executa uma **única vez**, logo após o primeiro render, e nunca mais.

- **Uso comum**: Buscar dados de uma API ao abrir a tela ou configurar um timer inicial.

<!-- prettier-ignore-start -->
```tsx
useEffect(() => {
  console.log("Componente montado! (Equivalente ao nascimento)");
}, []); // Array vazio = uma única execução.
```
<!-- prettier-ignore-end -->

:::info Analogia
Um hook `useEffect` com um array vazio `[]` tem comportamento semelhante à um **construtor de uma classe** (quando se fala em orientação a objetos).
:::

### Caso B: Com Dependências `[prop, state]`

O efeito executa no início e **sempre que qualquer valor dentro do array mudar**.

**Uso comum**: Atualizar uma busca toda vez que o usuário digita algo em um campo de pesquisa.

<!-- prettier-ignore-start -->
```tsx
const [busca, setBusca] = useState("");

useEffect(() => {
  console.log("A busca mudou para:", busca);
}, [busca]); // Vigia a variável 'busca'
```
<!-- prettier-ignore-end -->

### Caso C: A Ausência do Array (O Perigo do `undefined`)

Se você esquecer de passar o segundo argumento (o array), o React executará o efeito em **TODOS** os renders.

**⚠️ Atenção**: Se você alterar um estado dentro de um useEffect sem array de dependências, você criará um **Loop Infinito**.

- O componente renderiza.
- O efeito roda e muda o estado.
- A mudança de estado causa um novo render.
- O efeito roda de novo... e o app trava.

## O `useEffect` como Mecanismo de Inicialização

Agora que entendemos como o array de dependências funciona, vamos ver como o `useEffect` pode ser aplicado em diferentes estados do ciclo de vida de um componente React.

Imagine que seu app precisa carregar uma lista de produtos, verificar se o usuário está logado ou buscar a previsão do tempo assim que a tela aparece. Você não quer que o usuário aperte um botão para isso; você quer que **aconteça sozinho**.

### O Padrão de "Mount" (Montagem)

Para inicializar algo, usamos o `useEffect` com o **array de dependências vazio `[]`**. Isso garante que a **lógica de configuração rode apenas uma vez**, evitando chamadas repetitivas e desnecessárias à sua API ou banco de dados. O **Snack** a seguir ilustra esse tipo de situação:

**Dica**: este **Snack** possui um loading "fake" de 3s, se você quiser repetir o carregamento para repetir a execução do `useEffect`, recarregue a página.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-05-01-a" />

**Por que não carregar direto no corpo da função?**

Se você colocar uma chamada de API diretamente no corpo do componente (fora do `useEffect`), essa chamada será disparada **toda vez** que qualquer estado mudar. Se você tiver um contador na tela, cada clique no contador faria uma nova requisição para a internet. O `useEffect` com `[]` "blinda" essa execução.

## O Callback de Limpeza (Cleanup Function)

Algumas ações que iniciamos no `useEffect` não param sozinhas quando o usuário sai da tela. Se você iniciar um cronômetro ou uma música e o componente for destruído (unmount), esse processo pode continuar rodando em segundo plano, consumindo memória e bateria desnecessariamente.

### Como funciona?

Para "limpar" um efeito, você deve **retornar uma função** de dentro do seu `useEffect`. O React executará essa função de retorno em dois momentos:

- **Antes** de executar o efeito novamente (se as dependências mudarem).
- **Quando o componente for removido** da tela (unmount).

### Exemplo Prático: O Cronômetro

Imagine um contador que atualiza a cada segundo. Se não limparmos o `setInterval`, ele **continuará rodando mesmo se mudarmos de tela**. O **Snack** a seguir ilustra o uso do hook como mecanismo de "limpeza", limpando os intervalos criados na montagem do componente.

**Dica**: para visualizarmos a execução da callback de limpeza, precisamos "matar" o componente. No **Snack** a seguir "forçamos" essa situação com um **render condicional**. O `useEffect` está no componente **Counter.tsx**.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-05-01-b" />

**Casos Comuns de Limpeza**:

- **Timers**: `clearTimeout` ou `clearInterval`.
- **Inscrições (Subscriptions)**: Cancelar escutas de eventos do acelerômetro, GPS ou conexões de Chat/Socket.
- **Requisições**: Cancelar uma busca de API que ainda não terminou (AbortController).
- **Conexões**: Fechar conexões com banco de dados (caso tenha aberto na inicialização do componente).

**Dica de Ouro**: Pense no Cleanup como o ato de desligar a luz ao sair de um quarto. Se você "ligou" algo no `useEffect`, é sua responsabilidade "desligar" no retorno.

## ⚡ Aprenda na Prática

> Para exercitar o uso de estados, preparei um desafio prático onde você vai construir uma tela que simula um sensor de proximidade. Acesse a <Link to="/docs/atividades/atividade-use-effect">**Atividade: useEffect**</Link> no menu de atividades deste E-Book.

:::info Próxima Aula: Componentes Básicos de Interface
Agora que você domina a lógica de estado e o controle do ciclo de vida, na próxima aula vamos focar na construção da interface, explorando os componentes fundamentais do React Native para estruturar e organizar o conteúdo visual do seu aplicativo.
:::
