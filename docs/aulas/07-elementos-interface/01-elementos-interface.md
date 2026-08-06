import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Elementos Básicos de Interface

Nesta aula, vamos sair um pouco da lógica pura para focarmos em como os elementos se comportam e se organizam na tela do celular. Paralelamente, vamos conhecer os elementos primitivos usados para compor interfaces no React Native.

## O Bloco de Construção: `View`

A `View` é o componente mais fundamental do React Native. Se estivéssemos na web, ela seria o equivalente à nossa `<div>`. Pense na `View` como um painel em branco, onde você pode adicionar elemntos e estilos a fim de construir estruturas mais complexas.

**Para que serve a `View`?**

- **Agrupamento**: Juntar diferentes componentes dentro de um único contêiner.
- **Layout**: Definir a posição dos elementos usando Flexbox (alinhamento, espaçamento, margens).
- **Estilização**: Aplicar cores de fundo, bordas e arredondamentos.

Quase todo componente que você criar começará com uma `View` principal, um "container" para organizar o conteúdo do componente. Isso ajuda a controlar o layout de forma profissional.

```tsx
<View style={styles.container}>{/* Outros componentes aqui dentro */}</View>
```

## Lidando com Conteúdo Longo: `ScrollView`

Por padrão, a `View` não possui rolagem. Se o seu conteúdo for maior que a tela do celular, ele simplesmente será cortado. Para resolver isso, usamos o `ScrollView`.

### Rolagem Vertical e Horizontal

O `ScrollView` permite que o usuário deslize o conteúdo em dois eixos:

- **Vertical (Padrão)**: Basta envolver o conteúdo.
- **Horizontal**: Usamos a prop `horizontal`.

```tsx
import { ScrollView, View } from 'react-native';

// Rolagem Vertical
<ScrollView>
  <View style={{ height: 1000, backgroundColor: 'blue' }} />
</ScrollView>

// Rolagem Horizontal
<ScrollView horizontal>
  <View style={{ width: 500, height: 100, backgroundColor: 'red' }} />
  <View style={{ width: 500, height: 100, backgroundColor: 'green' }} />
</ScrollView>
```

:::info Dica de Performance
O `ScrollView` renderiza todos os seus filhos de uma vez, mesmo os que não aparecem na tela. Para listas gigantes de dados, no futuro, veremos o `FlatList`.
:::

## Exibindo Informação: `Text`

Diferente da Web, no React Native **você não pode colocar texto solto dentro de uma `View`**. Todo e qualquer caractere deve estar obrigatoriamente dentro de um componente `<Text>`.

```tsx
// ✅ Isso funciona!
<Text>
  Olá!
</Text>

// ❌ Isso causa erro!
<View>
  Olá!
</View>
```

No React Native **não existe uma hierarquia de elementos textuais** (h1, h2, b, p, ...) como na Web, então, todas as características tipográficas devem ser configuradas pela tag `style`:

```tsx
// Na Web:
<h1>
Título 1
</h1>

// No React Native
<Text style={{fontSize: 24, fontWeight: "bold"}}>
Título 1
</Text>
```

O **Snack** a seguir apresenta uma implementação de diferentes Headings no React Native. Note a construção de elementos `H1`, `H2`, `H3` e `P` com as props nativas do texto (`TextProps`) acrescidas de props opcionais `bold` e `italic`.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-06-01-a" />

## Elementos Visuais: `Image`

Para exibir fotos, ícones ou ilustrações, utilizamos o componente `Image`. Ele lida com dois tipos de origens:

- **Imagens Locais (Estáticas)**: Usamos o `require('./caminho/foto.png')`. O React Native já calcula o tamanho original.

- **Imagens Remotas (Web)**: Usamos um objeto com a propriedade `uri`. Atenção: Para imagens da web, você é obrigado a definir `width` e `height` no estilo, ou a imagem não aparecerá.

### O segredo do `resizeMode`:

Como as telas de celulares variam muito, a prop `resizeMode` define como a imagem se ajusta ao espaço:

- **cover**: Preenche todo o espaço (pode cortar as bordas).
- **contain**: Mostra a imagem inteira (pode sobrar espaço vazio).
- **stretch**: Estica a imagem para preencher tudo (pode deformar).

O **Snack** a seguir exemplifica o uso do component `Image`:

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-06-01-b" />

## Interatividade: `Button` vs `Pressable`/`Touchable`

No React Native, temos duas abordagens principais para ações de clique: `Button` e `Pressable`/`Touchable`.

### O Componente `Button`

É o componente mais simples e limitado. Ele renderiza o botão padrão do sistema operacional (azul no iOS, cinza/colorido no Android).

- **Vantagem**: Rápido de implementar.
- **Desvantagem**: Quase impossível de estilizar profundamente (não aceita `borderRadius` ou sombras complexas diretamente no estilo).

```tsx
<Button
  title="Enviar Dados"
  onPress={() => console.log("Clicou!")}
  color="#841584"
/>
```

O `Button` não possui filhos (children), mas sim uma prop `title` que recebe um texto a ser renderizado pelo componente.

### Pressable e Touchables

O `Pressable` é um contêiner que detecta vários estágios de interação (toque longo, entrada e saída do dedo). Já os `Touchables` (como `TouchableOpacity`) apresentam diferentes formas de feedback ao usuário.

- **Vantagem**: Você pode transformar qualquer coisa em um botão (uma `View` com imagem e texto, por exemplo).
- **Estilização**: Você define todo o visual.

O uso de `Button`, `Pressable` e `Touchables` é praticamente idêntico quanto ao tratamento de eventos: todos respondem ao `onPress`. As principais diferenças estão mesmo na estilização, limitada no caso do `Button`, mais flexível no caso do `Pressable` e com feedbacks de toque no caso dos `Touchables`.

O **Snack** a seguir apresenta diferentes implementações de interações por toque:

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-06-01-c" />

## Seleção Binária: `Switch`

O `Switch` é o famoso "interruptor" para ligar ou desligar uma configuração (como o Modo Escuro ou Notificações).

**Funcionamento**:

Ele é um **componente controlado**, ou seja, **depende de um estado** booleano (`true/false`) para refletir seu valor visual.

- `value`: O estado atual (booleano).
- `onValueChange`: A função que inverte o estado quando o usuário toca no componente.
- As props `trackColor` e `thumbColor` são opcionais e podem ser usadas para melhorar a aparência do componente.

```tsx
const [isEnabled, setIsEnabled] = useState(false);

return (
  <Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    onValueChange={() => setIsEnabled(!isEnabled)}
    value={isEnabled}
  />
);
```

## ⚡ Aprenda na Prática

> **Desafio do Dia**: Crie um "Card de Inventário de Hardware" que utilize uma `Image` para mostrar um componente (como um processador ou placa de vídeo) e uma `View` lateral com o nome e as especificações em `Text`. Adicione um `Switch` para o usuário marcar se o item está "Em Estoque" ou "Esgotado" e envolva todo o card em um `Pressable` que, ao ser clicado, alterna a cor de fundo da `View` para destacar o item selecionado. Para finalizar, coloque vários desses cards dentro de uma `ScrollView` para garantir que a lista de peças possa ser navegada verticalmente.

:::info Próxima Aula: Componentes do Tipo Lista
Agora que você já conhece os componentes básicos para construir uma interface, na próxima aula vamos aprender como lidar com grandes volumes de informações de forma eficiente, utilizando elementos de lista que otimizam o desempenho do aplicativo e garantem uma rolagem fluida, independentemente da quantidade de dados.
:::
