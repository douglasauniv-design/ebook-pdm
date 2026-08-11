import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Dinamismo com Interpolação no JSX

Na aula anterior, criamos componentes com textos fixos (estáticos). Hoje, vamos aprender a "abrir as portas" do componente para que ele possa exibir informações que mudam, utilizando a **Interpolação**.

## O que é Interpolação?

Interpolar significa inserir algo entre outras coisas. No React Native, usamos as **chaves** `{ }` para indicar ao JSX que o que está ali dentro não é um texto comum, mas sim **código TypeScript** que deve ser executado e exibido na tela.

### 1. Interpolação de Strings no componente `Text`

Sempre que você quiser exibir o valor de uma variável ou o resultado de uma função dentro de um componente `<Text>`, você deve envolvê-lo em chaves `{}`.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-02-02" />

:::warning Atenção ao uso de Chaves
Atenção: Se você esquecer as chaves e escrever apenas `<Text>nome</Text>`, o React renderizará a palavra literal "nome" em vez do conteúdo da variável.
:::

### 2. Interpolação de Componentes

No React Native, não interpolamos apenas textos ou números. O verdadeiro poder está em **tratar componentes como variáveis ou constantes**. Isso permite que você decida qual componente exibir e onde ele deve aparecer dentro do seu layout.

**Composição Dinâmica**

Quando associamos um bloco de código a uma constante ou variável, como `const titulo = <Text>Olá</Text>`, não estamos apenas guardando texto; estamos guardando uma **instância de um componente** que pode ser injetada em qualquer lugar do layout usando as chaves `{ }`.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-02-02-b" />

**Por que usar isso?**

- **Organização**: Se uma parte da tela for muito grande, você pode extraí-la para uma variável antes do `return`.
- **Legibilidade**: O `return` principal fica muito mais limpo e fácil de ler.
- **Preparação para Lógica**: Isso facilita o próximo passo, que é decidir qual variável exibir dependendo de uma condição.

### 3. Renderização Condicional

A renderização condicional permite que o seu componente decida o que exibir com base em alguma condição (uma variável `true` ou `false`, por exemplo). No React Native, temos três formas principais de fazer isso:

**A. O "if" com dois Returns (Bloqueio)**

Esta técnica é usada quando a **condição muda toda a tela**. Se a condição for atendida, o componente para a execução ali mesmo e retorna um JSX diferente.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-02-02-c" />

**B. O Operador Curto-Circuito (&&)**

Usamos o `&&` quando queremos **exibir algo apenas se a condição for verdadeira**, e não exibir nada caso seja falsa. É perfeito para avisos, ícones de notificação ou mensagens de erro.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-02-02-d" />

**C. Operador Ternário `(condição ? true : false)`**

O ternário, embora possa prejudicar a legibilidade em certos casos, é uma escolha comum no mundo React quando se trata de **alternar entre dois estados ou estilos diferentes dentro do mesmo espaço**.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-02-02-e" />

:::tip Dica
A renderização condicional, com `&&` ou operador ternário, pode ser usada também com componentes inteiros! Isso permite chavear fragmentos da interface sem precisar renderizar a tela toda quando ocorrem mudanças em elementos pontuais.
:::

### 4. Loops de Renderização e a Prop key

Na maioria das vezes, os dados do seu app virão de uma lista (um Array). Em vez de escrever o componente manualmente para cada item, usamos o método `.map()` do JavaScript para percorrer a lista e retornar um componente para cada elemento.

**O Método `.map()`**

O `.map()` funciona como uma "fábrica": ele recebe uma lista de dados e "transforma" cada dado em um componente visual.

:::info Por que usar `.map()`?
Diferente de um `for` tradicional, o `.map()` retorna uma nova lista de componentes que o React consegue renderizar diretamente dentro do JSX.
:::

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-02-02-f" />

**A Importância da Prop `key`**

Você deve ter notado o atributo `key={user.id}` no exemplo acima. No React, a `key` é obrigatória em listas por motivos técnicos:

- **Identidade**: Ela ajuda o React a identificar qual item mudou, foi adicionado ou removido.
- **Performance**: Sem a `key`, o React precisaria renderizar a lista inteira novamente a cada pequena mudança. Com a `key`, ele mexe apenas no item específico.

:::warning Atenção com a Key
A `key` deve ser única dentro daquela lista.

A `key` só deve ser usada no **elemento mais externo do bloco** a ser renderizado (geralmente a View container daquele bloco).
:::

Em alguns casos, os objetos da lista podem não possuir ID, nestes casos, ainda é possível criar uma renderização em loop usando o `index` como chave:

```tsx
// Imagine que os members não possuíssem ID
const members = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'Editor' },
  { name: 'Charlie', role: 'Viewer' },
];

...

// A renderização em loop poderia ser feita com o índice do próprio map:

{users.map((user, index) => (
  <View key={index} style={styles.userCard}>
    <Text style={styles.userName}>{user.name}</Text>
    <Text style={styles.userRole}>{user.role}</Text>
  </View>
))}
```

## ⚡ Aprenda na Prática

> Para consolidar os conceitos de interpolação e renderização de listas que vimos hoje, preparei um desafio prático mais elaborado. Nele, você vai construir um catálogo completo aplicando toda a lógica de dinamismo que discutimos. Acesse a <Link to="/docs/atividades/atividade-interpolacao">**Atividade: Interpolação**</Link> no menu de atividades deste E-Book.

:::info Próxima Aula: Estilização de Componentes
Agora que você já sabe como transformar dados em interfaces dinâmicas dentro de um componente, o próximo passo é aprender como dar estilo e forma a esses elementos! Na próxima aula, vamos explorar as propriedades de estilização com StyleSheet e o sistema de layout Flexbox no React Native.
:::
