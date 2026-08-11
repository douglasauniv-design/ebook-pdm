import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Gerenciamento de Estado

Até agora, criamos componentes estáticos, ou seja, nossas telas eram como "fotografias": uma vez renderizadas com as **Props**, elas não mudavam. O **State** (Estado) é o que permite que o componente tenha uma "memória" e se atualize dinamicamente. Nesta aula, vamos aprender sobre o `useState`!

## O Fluxo de Renderização: A Árvore de Componentes

No React Native, seus componentes funcionais são, literalmente, **funções JavaScript**. Quando o app inicia, o React executa essas funções de cima para baixo, começando pelo `App.tsx`.

### A Metáfora da Árvore

Imagine seu aplicativo como uma árvore genealógica:

- O **App.tsx** é a raiz (o tronco).
- Os seus **Componentes Filhos** são os galhos.
- Os **Buttons**, **Texts** e **Inputs** são as folhas.

### Como o "Desenho" (Render) Acontece

1. **Execução de Funções**: Toda vez que o React precisa mostrar algo, ele "chama" sua função (ex: `function MyScreen()`). O que essa função retorna (JSX) é o que será desenhado.

2. **Cascata de Pai para Filho**: A renderização sempre flui de cima para baixo. Se um componente "Pai" é executado novamente, por padrão, todos os seus "Filhos" também são verificados e redesenhados.

3. **O Gatilho do Estado**: O `useState` é o sinalizador. Quando você altera esse estado, você está dizendo ao React: "Ei, algo mudou aqui! Execute esta função (e seus filhos) novamente para que a tela reflita essa mudança".

**Por que o Estado é Especial?**

Se você criar uma variável comum dentro da função, como `let name = "Jack"`, e tentar mudá-la, **o React não saberá que precisa redesenhar a tela**. A variável muda na memória do computador, mas a "foto" na tela do celular continua a mesma.

> O Estado é a ponte entre a lógica do JavaScript e os pixels na tela do celular.

## Interatividade com o Usuário: O Evento onPress

Para estudarmos mudanças de estado, precisamos primeiro compreender ao menos um mecanismo capaz de gerar tais mudanças, faremos isso com um **evento**. No React Native, quase toda interação de clique/toque é gerenciada por uma **prop** especial chamada `onPress`. Diferente do HTML onde usamos `onclick`, aqui seguimos o padrão _camelCase_.

### O Botão Padrão (Componente Button)

O componente `Button` do React Native é simples, mas essencial. Ele exige duas props principais: `title` (o texto) e `onPress` (a função que será executada).

```tsx
import { Button, Alert } from "react-native";

<Button
  title="Executar Protocolo 4 8 15 16 23 42"
  onPress={() => Alert.alert("Sistema Atualizado")}
/>;
```

### Integrando `onPress` com `useState`

A mágica acontece quando o toque no botão aciona a função de alteração do estado (`set...`). Isso força a "árvore" a florescer novamente com os novos dados.

### Exemplo Prático: O Contador

No **Snack** a seguir, vamos criar um contador que aumenta toda vez que o botão é pressionado.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-04-01-a" />

**O que acontece por trás das câmeras?**

- O usuário toca em "Pressionar Botão".
- A função `setCount(count + 1)` é disparada.
- O React percebe a mudança e executa a função `App` (componente da tela) novamente.
- Na nova execução, o valor de `count` agora é `1`.
- O `Text` é desenhado na tela exibindo o número `1`.

:::info Dica de useState
Note que o retorno do `useState` é um array. A primeira posição sempre vai ser o valor atual armazenado no estado. A segunda posição será sempre uma função `set...`, usada para modificar o estado.
:::

## Capturando Dados: O `TextInput` e `onChangeText`

Enquanto o Button dispara uma ação única, o `TextInput` precisa de uma vigilância constante. No React Native, não "lemos" o valor do campo apenas quando o usuário termina de digitar; nós **acompanhamos cada letra em tempo real**.

### O Conceito de Componente Controlado

Para que o React tenha controle total sobre o que está escrito, associamos o valor do `TextInput` a um **Estado**.

- `value`: Diz ao input o que ele deve exibir (o valor do estado).
- `onChangeText`: Uma função que é disparada a cada tecla pressionada, atualizando o estado com o novo texto.

### Exemplo: Identificação do Usuário

No **Snack** a seguir, vamos criar um campo onde o usuário digita seu nome e o app reage instantaneamente.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-04-01-b" />

**Por que onChangeText e não onChange?**

No React Native, o `onChangeText` é um facilitador que devolve diretamente a `string` digitada. O `onChange` (padrão do React Web) devolve um `objeto de evento` complexo, o que tornaria o código mais verboso desnecessariamente para dispositivos móveis.

## TypeScript e o `useState`: Tipagem Segura

O TypeScript é muito inteligente: na maioria das vezes, ele consegue **inferir** o tipo do estado baseando-se no valor inicial que você passa entre os parênteses do `useState`.

### Inferência Automática

Se você inicializa com um **número**, o TypeScript assume que aquele estado sempre será um `number`.

```ts
// O TS entende: count é 'number' e setCount aceita apenas 'number'
const [count, setCount] = useState(0);

✅ setCount(123) // Isso funciona!

❌ setCount("10") // Isso causa erro!
```

### Tipagem Explícita (Manual)

Ao criar um estado, podemos "forçar" uma tipagem:

```ts
const [count, setCount] = useState<number>(0);
```

### Tipagens que Aceitam Múltiplos Valores

Existem situações onde a inferência de um único tipo não basta, como quando o estado começa vazio (`null` ou `undefined`) ou quando ele pode assumir mais de um tipo de dado. Nestes casos, podemos definir tipos mais elaborados.

**Caso 1: Estados que podem ser nulos**

Útil quando você está buscando dados de uma **API** ou esperando o usuário preencher algo.

```ts
// O estado pode ser uma string OU nulo
const [username, setUsername] = useState<string | null>(null);
```

Nestes casos, você, programador, precisará cuidar com o uso do dado `username`, pois ele pode ser nulo! É uma prática comum usarmos operadores null-safe e validações condicionais para garantir que o dado existe antes de utilizá-lo.

**Caso 2: Tipando Objetos Complexos**

Se o seu estado for um objeto (como os dados de um sobrevivente), o ideal é definir uma `interface` ou `type` antes.

```tsx
type Survivor = {
  id: number;
  name: string;
  status: "alive" | "missing" | "deceased";
};

const [passenger, setPassenger] = useState<Survivor>(); // O TS agora sabe exatamente quais propriedades 'passenger' possui
```

:::info Por que tipar?
Tipar o `useState` evita que você tente, por exemplo, executar um `.length` em um estado que ainda está `null`, ou que tente salvar um texto em um estado que deveria ser um contador numérico. O erro aparece no editor antes mesmo de você rodar o app no celular.
:::

## ⚡ Aprenda na Prática

> Para exercitar o uso de estados, preparei um desafio prático onde você vai construir uma tela com comportamento dinâmico vinculado ao estado. Acesse a <Link to="/docs/atividades/atividade-use-state">**Atividade: useState**</Link> no menu de atividades deste E-Book.

:::info Próxima Aula: Ciclo de Vida de um Componente
Se você achou que o componente só se redesenhava quando o usuário tocava em algo, prepare-se: na próxima aula, vamos aprender como fazer seu app "tomar decisões" sozinho e reagir automaticamente assim que ele nasce na tela ou quando um dado específico muda, sem que ninguém precise apertar um único botão!
:::
