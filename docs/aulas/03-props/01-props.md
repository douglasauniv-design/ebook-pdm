import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Componentes Reutilizáveis com Props

Até agora, criamos componentes que exibem dados internos. Mas o verdadeiro poder do React Native surge quando um componente consegue receber informações de fora, tornando-se uma peça de interface **reutilizável**. Esse transporte de dados é feito através das **Props** (Propriedades). Por exemplo, se você quisesse exibir três cartões de usuários diferentes, teria que criar três componentes quase idênticos. As Props (Propriedades) resolvem isso, permitindo que um componente receba dados externos.

## O Contrato: Componente Pai vs. Componente Filho

Imagine um componente como uma **função** de JavaScript: para que ela processe algo diferente a cada execução, você passa **parâmetros**. No React, esses parâmetros são as **Props**.

A relação funciona como um contrato:

- O **Filho (Receiver)**: Define quais dados ele "aceita" receber para conseguir renderizar a interface.
- O **Pai (Sender)**: É o dono da informação e "preenche" os dados solicitados pelo filho.

**Por que precisamos de Props?**

- **Reutilização**: O mesmo componente visual pode exibir dados de centenas de usuários diferentes.
- **Manutenção**: Se você precisar mudar o layout do cartão, muda em um único lugar (no Filho), e todos os cartões renderizados pelo Pai serão atualizados.
- **Segurança (TypeScript)**: O "contrato" garante que o Pai não esqueça de passar uma informação vital, como o nome ou o preço de um item ou o avatar de um usuário.

**Exemplo Prático: Passagem de Dados**

No Snack a seguir, criamos um componente de botão customizado (`MyButton`) e instanciamos ele dentro da nossa tela principal (`App`). Observe que:

- O componente **Filho** (`MyButton`) define um tipo de dado (`MyButtonProps`) para representar as Props (parâmetros) do componente.
- A função que representa o componente filho recebe como argumento essas props com a tipagem correspondente (`props: MyButtonProps`).
- O componente **Pai** (`App.tsx`) importa o filho e "assina" o contrato, passando os valores para as propriedades definidas.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-03-01-a" />

:::info Observação Técnica
Repare que no `App.tsx` usamos o mesmo componente `MyButton` três vezes. A estrutura visual é a mesma, mas o **conteúdo** e a **cor** mudam porque as **Props** enviadas pelo Pai são diferentes para cada instância.

Além disso, note que o componente `MyButton` foi construído usando um "Touchable", pesquise sobre a diferença entre Touchables e o Button nativo.
:::

## Desestruturação no JavaScript

Até agora, para acessar cada dado, precisávamos repetir a palavra `props` (ex: `props.label`, `props.color`). No dia a dia do desenvolvimento, preferimos "extrair" essas variáveis diretamente do objeto logo na entrada da função.

**Como funciona a Sintaxe?**

Em vez de receber o objeto inteiro e dar o nome de `props`, abrimos chaves `{ }` nos parênteses da função e listamos apenas as propriedades que queremos usar.

**Antes (Sem desestruturação)**

```tsx
const MyButton = (props: MyButtonProps) => {
  return (
    <View style={{ backgroundColor: props.color }}>
      <Text>{props.label}</Text>
    </View>
  );
};
```

**Depois (Com desestruturação)**

```tsx
// Extraímos 'label' e 'color' diretamente do objeto de entrada
const MyButton = ({ label, color }: MyButtonProps) => {
  return (
    <View style={{ backgroundColor: color }}>
      <Text>{label}</Text>
    </View>
  );
};
```

**Por que usar a desestruturação?**

- **Código mais limpo**: Você elimina a repetição da palavra props em todo o seu JSX.
- **Clareza imediata**: Ao olhar para a primeira linha da função, qualquer desenvolvedor já sabe exatamente quais dados aquele componente utiliza.
- **Facilidade para Valores Padrão**: Como veremos mais adiante, a desestruturação permite definir valores padrão de forma muito simples.

:::info Dica de Produtividade
A desestruturação é o padrão absoluto em projetos React e React Native modernos. Acostume-se a usá-la desde o início para que seu código siga as convenções do mercado.
:::

## Props Opcionais

No TypeScript, indicamos que uma propriedade é opcional adicionando uma interrogação (`?`) logo após o nome da variável no `type`. Isso avisa ao compilador que o componente **Pai não é obrigado a enviar aquele dado específico**.

**Definindo Props Opcionais**

```tsx
type ProductCardProps = {
  // Props Obrigatórias: O pai precisa enviar estes dados
  name: string;
  price: number;
  // Props Opcionais: O pai pode enviar ou não
  description?: string;
  discount?: number;
};
```

:::warning Atenção ao Tipo
Ao marcar uma prop como opcional com `?`, o TypeScript entende que o tipo daquela variável agora é uma união. Por exemplo, `description?: string` na verdade significa que o tipo é `string | undefined`.
:::

**Como lidar com dados que podem não existir?**

Como uma prop opcional pode chegar como `undefined`, precisamos tratar essa ausência para não quebrar o layout ou a lógica do app. Veremos duas estratégias comuns:

1. **Renderização Condicional (`&&`)**: Para exibir (ou esconder) um elemento visual por completo.
2. **Operador de Encadeamento Opcional (`?.`)**: Para acessar propriedades de um objeto ou métodos sem causar erro caso ele seja nulo.

No Snack a seguir, o `email` é usado para renderizar um texto, e o `socialMedia` é um objeto que usamos para extrair o nome do perfil.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-03-01-b" />

**Por que usar essas técnicas?**

- **Com `&&`**: Se o `email` não for enviado, o componente `<Text>` simplesmente não é criado no app, evitando espaços em branco desnecessários.
- **Com `?.`**: Se o `socialMedia` vier vazio, o JavaScript não tentará ler a propriedade `instagram` de algo que não existe (o que causaria um erro crítico e fecharia o app), mas apenas retornará `undefined` com segurança.

:::tip Dica do Professor
O operador `?.` é chamado carinhosamente de `Operador Elvis` porque, se você virar a cabeça para o lado, o ponto e a interrogação lembram o topete e os olhos do cantor!
:::

## Props com Valor Padrão (Default Props)

Agora que vimos como lidar com a ausência de dados, vamos aprender como definir um **"plano B"**. Nem sempre queremos que um componente fique vazio ou exiba `undefined`; às vezes, queremos que ele assuma um comportamento padrão **caso o Pai não envie nada**.

A forma mais moderna e recomendada de definir valores padrão no React é através da desestruturação do JavaScript. Ao extrair as propriedades nas chaves `{ }`, podemos atribuir um valor usando o sinal de igual (`=`).

**A regra é simples**:

- Se o Componente Pai enviar o dado, o valor enviado prevalece.
- Se o Pai não enviar nada (ou enviar `undefined`), o valor padrão entra em ação.

**Exemplo Prático: Botão de Status**

No Snack a seguir, vamos criar um componente de `StatusBadge`. Se não dissermos qual é o status ou a cor, ele assumirá que o usuário está "Pendente" com uma cor cinza por padrão.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-03-01-c" />

**Por que usar Valores Padrão?**

- **Código Limpo**: Você evita encher o seu JSX de ternários ou verificações de `&&`.
- **Previsibilidade**: O componente sempre terá um estado visual válido, mesmo que o desenvolvedor esqueça de passar alguma configuração.
- **Facilidade**: Permite criar componentes altamente customizáveis que "já funcionam" logo de cara com uma configuração básica.

:::info Dica de TypeScript
Mesmo usando valores padrão, você deve manter a interrogação (`?`) no seu `type`. Isso indica ao TypeScript que o Pai tem a opção de não enviar aquele dado, permitindo que o valor padrão assuma o controle com segurança.
:::

## Prop Children: Componentes como Containers

Até agora, passamos dados "simples" (strings, números, objetos) através das props. Mas e se quisermos passar componentes inteiros ou blocos de JSX para dentro de outro componente? É aqui que entra o `children`.

A prop `children` é uma propriedade automática do React. Ela representa tudo o que você coloca **entre a tag de abertura e a tag de fechamento** de um componente. Isso permite criar "cascas" ou "containers" (como cards ou áreas de scroll) que podem envolver qualquer conteúdo.

**Definindo o Contrato com ReactNode**

Para que o TypeScript aceite qualquer conteúdo (texto, outros componentes, ícones), usamos o tipo `React.ReactNode`.

**Exemplo Prático: Um Componente `Card`**

No Snack a seguir, vamos criar um componente `Card` genérico, que aplica uma borda e uma sombra, mas não sabe o que será exibido dentro dele.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-03-01-c" />

**Por que usar children?**

- **Composição**: Você pode criar layouts complexos combinando pequenos pedaços de interface.
- **Flexibilidade Total**: O `Card` não precisa saber se vai exibir um formulário, uma imagem ou uma lista; ele apenas fornece a "moldura".
- **Padronização**: Garante que todos os cards do seu app tenham a mesma sombra e borda, independentemente do que há dentro deles.

## ⚡ Aprenda na Prática

> Para exercitar o uso de Props, preparei um desafio prático onde você vai construir componentes muito úteis. Nele, você vai implementar "Screen Wrappers", esqueletos de tela que servirão de base para qualquer aplicação que você queira criar no futuro. Acesse a <Link to="/docs/atividades/atividade-screen-wrappers">**Atividade: Screen Wrappers**</Link> no menu de atividades deste E-Book.

:::info Próxima Aula: Hooks e Estados (useState)
Você já sabe como passar dados de um componente para outro, mas e se esses dados precisarem mudar? Como o app reage quando o usuário clica em um botão ou digita em um campo? Na próxima aula, vamos entrar no mundo dos **Hooks**, começando pelo `useState`: a ferramenta que permite ao seu componente "lembrar" de informações e atualizar a tela em tempo real.
:::
