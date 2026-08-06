import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Roteamento e Navegação

Na maioria dos aplicativos do mundo real, os usuários não permanecem em uma única tela. Eles precisam navegar entre diferentes partes da aplicação: fazer login, ver uma lista de produtos, acessar detalhes, acessar configurações, etc. Para gerenciar essas transições, precisamos de um sistema de roteamento e navegação.

## Histórico: React Navigation

Historicamente, o desenvolvimento no React Native se apoiou fortemente em uma biblioteca chamada **React Navigation**. Ela fornecia uma API imperativa, onde você configurava "Navegadores" (Navigators) através de componentes envolventes e declarava rotas manualmente. Cada navegador definia como as telas seriam apresentadas (em pilha - Stack, abas - Tabs, ou ainda Drawer).

Embora o React Navigation seja muito poderoso e ainda amplamente utilizado (e seja a base das soluções mais modernas), configurar essas rotas manualmente muitas vezes gerava códigos verbosos e centralizava toda a árvore de rotas em um ou poucos arquivos.

Curioso para saber como as rotas eram definidas antigamente? Confira [aqui](https://github.com/university-lessons/pdm-ts-lesson6-react-navigation/blob/main/src/Router.tsx).

---

## A Era do Expo Router

Nos últimos anos, o ecossistema do React (como o Next.js para a web) popularizou o **Roteamento Baseado em Arquivos** (File-based Routing). O Expo trouxe esse mesmo paradigma para o mobile através do **Expo Router**.

O Expo Router é construído *em cima* do React Navigation, oferecendo os mesmos benefícios de performance e navegação nativa, mas simplificando drasticamente a forma como definimos rotas. Em vez de escrever códigos complexos de configuração, as telas do seu aplicativo são geradas automaticamente com base na estrutura de pastas dentro de um diretório chamado `app`.

:::info Dica
Se você for iniciar um projeto novo, o comando `yarn create expo --template` e selecione a opção `Navigation (TypeScript)` já vem com o Expo Router configurado. Para este material, assumiremos que você está utilizando o Expo Router, que é a solução padrão nas versões mais recentes do Expo. **Importante**: Esse template vem com algumas telas e arquivos de exemplo, você pode seguramente excluir as pastas `components`, `constants`, e todo o conteúdo da pasta `app/` para criar a sua estrutura de navegação a partir do zero.
:::

---

## Definição de Rotas (Componentes na pasta `app`)

No Expo Router, qualquer arquivo (como `.tsx`, `.ts`, `.js`, `.jsx`) dentro do diretório raiz `app/` automaticamente se torna uma rota na sua aplicação.

Por exemplo, com a seguinte estrutura de pastas e arquivos:

```text
app/
├── index.tsx      -> Rota: /
├── about.tsx      -> Rota: /about
└── settings/
    └── index.tsx  -> Rota: /settings
```

Cada um desses arquivos deve exportar um componente React **por padrão** (`export default function NomeDaTela()`). O nome do arquivo determina o caminho da rota.

---

## Navegação do Tipo Stack

Uma das formas de navegação mais comuns em dispositivos móveis é a **Stack Navigation** (Navegação em Pilha). Ela funciona como uma pilha de cartas: a nova tela é colocada sobre a tela anterior. Quando você volta (usando o botão voltar do celular ou da interface), a tela atual é "desempilhada" (pop), e a tela anterior é revelada novamente.

Para gerenciar o comportamento geral de um diretório e agrupar as rotas, usamos um arquivo especial chamado `_layout.tsx`. 

### Configuração do `_layout.tsx` e Opções da Tela

Um arquivo de layout permite que você defina uma estrutura comum para as telas filhas daquele diretório, além de configurar como elas serão exibidas pelo roteador. 

No diretório raiz `app/`, criamos um `_layout.tsx` para definir nossa Stack principal. A forma mais simples é apenas renderizar o componente `<Stack>` sem filhos:

```tsx title="app/_layout.tsx"
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
```

Para personalizar as opções de uma tela específica (como o título do cabeçalho), uma prática altamente recomendada no Expo Router é que a própria tela defina suas configurações utilizando o componente `<Stack.Screen>` diretamente no seu retorno. Isso mantém as informações de configuração junto com o componente que mais sabe sobre si mesmo:

```tsx title="app/index.tsx"
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function HomeScreen() {
  return (
    <ScreenWrapper.Scrollable>
      {/* O componente Stack.Screen configura a tela atual dinamicamente */}
      <Stack.Screen options={{ title: 'Página Inicial' }} />

      <Text>Conteúdo da página</Text>
    </ScreenWrapper.Scrollable>
  );
}
```

### Opções Globais (Screen Options)

Se você quiser personalizar a aparência de **todas** as telas de uma Stack de uma só vez (como definir uma cor padrão para o cabeçalho do seu app), você pode usar a propriedade `screenOptions` diretamente no componente `<Stack>` dentro do `_layout.tsx`:

```tsx title="app/_layout.tsx"
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}
```
*No exemplo acima, a propriedade `screenOptions` na tag `<Stack>` aplica as configurações de cor do cabeçalho a **todas** as telas daquela pilha. As telas individuais ainda podem sobrescrever essas opções globais usando seu próprio `<Stack.Screen>` internamente.*

---

## Como Navegar (Link e Router)

Para ir de uma tela para outra, o Expo Router oferece duas abordagens principais: usando o componente `<Link>` ou utilizando o objeto iterativo `router`.

### Navegação Declarativa (`<Link>`)

Use o componente `Link` quando a navegação é disparada por um clique direto do usuário (semelhante ao elemento `<a>` no HTML).

```tsx
import { Link } from 'expo-router';
import { Text } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function HomeScreen() {
  return (
    <ScreenWrapper.Scrollable>
      <Text>Bem-vindo ao app!</Text>
      <Link href="/about" style={{ color: 'blue' }}>
        Ir para a página Sobre
      </Link>
    </ScreenWrapper.Scrollable>
  );
}
```

:::info `asChild`
Por padrão, o `<Link>` envelopa o seu elemento em um componente de texto que suporta toques. Para envolver outros tipos de componentes, como um botão ou pressable customizado, use a prop `asChild`:
```tsx
<Link href="/profile" asChild>
  <Pressable>
    <Text>Ver Perfil</Text>
  </Pressable>
</Link>
```
:::

### Navegação Imperativa (objeto `router`)

Quando você precisa navegar após concluir alguma ação (por exemplo, após fazer um login bem-sucedido com a API), você deve utilizar o objeto `router`.

```tsx
import { router } from 'expo-router';
import { Button } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function LoginScreen() {
  const handleLogin = () => {
    // faz a autenticação...
    // após sucesso, navega para a tela principal:
    router.push('/dashboard');
  };

  return (
    <ScreenWrapper.FullScreen>
      <Button title="Entrar" onPress={handleLogin} />
    </ScreenWrapper.FullScreen>
  );
}
```

#### Outros métodos úteis do `router`
- `router.push(href)`: Adiciona uma nova rota na pilha.
- `router.replace(href)`: Substitui a rota atual pela nova rota (o usuário não pode usar o botão voltar para acessar a rota anterior).
- `router.back()`: Volta para a tela anterior desempilhando a atual.

---

## Passagem de Parâmetros

Muitas vezes, ao navegar para outra tela, precisamos passar dados (como o ID de um produto que foi clicado). No Expo Router usamos os **Path Params** e **Query Params**.

### Enviando Parâmetros

Com o `router.push` (ou `navigate`), você pode enviar os parâmetros dentro de um objeto, definindo o `pathname` (usando o nome real do arquivo com os colchetes) e os dados agrupados em `params`:

```tsx
// Enviando o 'id' como Path Param e o 'name' como Query Param
router.push({
  pathname: "/details/[id]",
  params: { id: "42", name: "Produto Exemplo" }
});
```

Se preferir o formato de URL em string, o Path Param vai no próprio caminho da rota e o Query Param vai após o `?`:
```tsx
router.push('/details/42?name=Produto Exemplo');
```

Com o componente `<Link>`, a mesma lógica de objeto pode ser aplicada ao atributo `href`:
```tsx
<Link href={{ pathname: '/details/[id]', params: { id: '42', name: 'Produto Exemplo' } }}>
  Ver Detalhes
</Link>
```

### Recebendo Parâmetros (`useLocalSearchParams`)

Na tela de destino, utilizamos o hook `useLocalSearchParams` para capturar os parâmetros enviados pela tela anterior.

```tsx title="app/details/[id].tsx"
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function DetailsScreen() {
  // Capturando os parâmetros recebidos
  const { id, name } = useLocalSearchParams();

  return (
    <ScreenWrapper.Scrollable>
      <Text>Detalhes do Item (Route Param): {id}</Text>
      <Text>Nome (Query Param): {name}</Text>
    </ScreenWrapper.Scrollable>
  );
}
```

Neste exemplo prático:
- **`id` (Route Param):** É extraído diretamente do caminho da rota porque o nome do arquivo foi definido com colchetes: `[id].tsx`. Isso significa que esse valor faz parte da estrutura obrigatória da URL (ex: `/details/42`).
- **`name` (Query Param):** É um parâmetro adicional (opcional na estrutura de pastas) passado após o ponto de interrogação na URL (ex: `/details/42?name=Produto Exemplo`). Ele não define um arquivo ou pasta, mas seus dados são anexados ao destino e capturados da mesma forma pelo hook `useLocalSearchParams()`.

---

## Desfazendo a Navegação: `dismiss` e `dismissAll`

Se você estiver em um fluxo profundo dentro de uma Stack (ex: `Home -> Carrinho -> Entrega -> Pagamento -> Sucesso`) e precisar fechar todo aquele fluxo, você pode ficar tentado a navegar para a tela inicial usando `router.push`, isso causaria um problema de navegação, pois o histórico da pilha manteria as telas do fluxo de checkout (`Home -> Carrinho -> Entrega -> Pagamento -> Sucesso -> Home`), e caso o usuário pressionasse o botão voltar, ele acessaria novamente as telas do fluxo já finalizado. Para evitar esse problema, o Expo Router nos oferece métodos para fechar telas da pilha.

- **`router.dismiss(count)`**: Desempilha as últimas `count` telas da Stack. Se chamado sem argumentos, desempilha 1 (equivalente a `router.back()`).
- **`router.dismissAll()`**: Desempilha **todas** as telas e leva o usuário de volta à primeira rota base da Stack (a raiz da pilha).

```tsx
import { router } from 'expo-router';
import { Button } from 'react-native';

export default function SuccessScreen() {
  return (
    <Button
      title="Voltar para a Loja"
      onPress={() => {
        if (router.canDismiss()) router.dismissAll();
      }}
    />
  );
}
```

:::warning IMPORTANTE

O método `router.dismissAll()` só deve ser chamado quando `router.canDismiss()` for **true**, pois ele só funciona em uma Stack (navegação em pilha). Em um aplicativo com navegação principal por Tabs ou Drawer, chamar `dismissAll()` resultaria em um erro, já que não há pilha de telas para fechar.

:::


---

## Outros Tipos de Layouts: `<Tabs>` e `<Drawer>`

**Para você saber**: Embora a navegação em pilha (`<Stack>`) seja uma das mais comuns, o Expo Router oferece layouts prontos para outros tipos de interfaces nativas padrão:

- **`<Tabs>`**: Cria automaticamente uma barra inferior com botões de navegação, sendo a forma de navegação principal da grande maioria dos aplicativos (ex: Instagram, WhatsApp).
- **`<Drawer>`**: Cria um menu lateral deslizante (Drawer Menu), comumente acessado arrastando o dedo do canto esquerdo para a direita ou clicando em um ícone de menu hambúrguer.

Para alterar o comportamento visual das suas rotas, basta alterar o tipo de componente pai (`<Tabs>`, `<Drawer>`) dentro de um arquivo `_layout.tsx`. A estrutura de rotas em arquivos não muda, o que facilita experimentar diferentes tipos de fluxos visuais!

---

## ⚡ Aprenda na Prática

Agora que você conhece a estrutura, vamos aplicar esse conhecimento criando um sistema de navegação entre telas.

> Acesse a <Link to="/docs/atividades/atividade-roteamento">**Atividade: Roteamento com Expo Router**</Link> para praticar a implementação de telas de Login e Dashboard com passagem de parâmetros.


:::info Próxima Aula: Elementos Básicos de Interface
Na próxima aula, vamos focar na construção de interfaces visuais, explorando os componentes fundamentais do React Native para estruturar e organizar o conteúdo de cada tela do seu aplicativo.
:::