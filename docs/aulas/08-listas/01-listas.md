import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Elementos de Lista

Na aula anterior, vimos como o `ScrollView` nos permite rolar conteúdos extensos. No entanto, o `ScrollView` possui um problema fundamental quando lidamos com muitos dados: **ele renderiza todos os itens de uma vez só**, mesmo aqueles que não estão visíveis na tela. 

Se você tiver uma lista de 10.000 itens (como um *feed* de rede social ou uma lista de contatos muito grande), o `ScrollView` tentará processar todos eles imediatamente, travando o aplicativo e consumindo muita memória.

Para resolver esse problema, o React Native oferece componentes baseados em **Virtualization** (virtualização). Esses componentes renderizam apenas os itens que estão visíveis na tela e reciclam os componentes conforme o usuário faz a rolagem. O mais conhecido deles é a `FlatList`.

## `FlatList`

A `FlatList` é o componente ideal para renderizar listas longas e simples de dados. Diferente de mapear um array usando o `.map()` dentro de um `ScrollView`, a `FlatList` faz a gestão eficiente de memória e performance debaixo dos panos.

Para utilizá-la, precisamos passar basicamente três propriedades (`props`) obrigatórias:

1. **`data`**: Um array de dados (os itens que você quer mostrar na lista).
2. **`renderItem`**: Uma função que ensina o componente como desenhar *um* único item desse array na tela.
3. **`keyExtractor`**: Uma função que extrai um identificador único (uma string) para cada item, ajudando o React a rastrear alterações na lista de forma eficiente.

```tsx
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MEUS_DADOS = [
  { id: '1', titulo: 'Primeiro Item' },
  { id: '2', titulo: 'Segundo Item' },
  { id: '3', titulo: 'Terceiro Item' },
];

export default function ListaBasica() {
  return (
    <FlatList
      data={MEUS_DADOS}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.texto}>{item.titulo}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  texto: {
    fontSize: 16,
  },
});
```

Abaixo temos um exemplo em execução de uma `FlatList` mais elaborada, com estilos e dados fake (mocks).

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-07-01-a" />

## Dados Agrupados: `SectionList`

Enquanto a `FlatList` é perfeita para listas planas, a `SectionList` foi criada para **listas agrupadas em seções**, onde cada seção possui um cabeçalho e um conjunto próprio de dados.

Pense na agenda de contatos do seu celular: você tem uma letra como cabeçalho (ex: "A") e, abaixo dela, todos os contatos que começam com essa letra.

Para que a `SectionList` funcione, o array de dados passado deve ter um formato específico. Cada seção deve ser um objeto contendo a chave `data` (com os itens da seção) e outras propriedades customizadas (como o `title` do cabeçalho).

```tsx
import { View, Text, SectionList, StyleSheet } from 'react-native';

const MEUS_DADOS_SECCIONADOS = [
  {
    titulo: 'Alimentos',
    data: ['Maçã', 'Banana', 'Pão'],
  },
  {
    titulo: 'Bebidas',
    data: ['Água', 'Suco', 'Café'],
  },
];

export default function ListaSeccionada() {
  return (
    <SectionList
      sections={MEUS_DADOS_SECCIONADOS}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.texto}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { titulo } }) => (
        <Text style={styles.cabecalho}>{titulo}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 4,
  },
  cabecalho: {
    fontSize: 20,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    padding: 10,
  },
  texto: {
    fontSize: 16,
  },
});
```

Abaixo temos um exemplo em execução de uma `SectionList`.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-07-01-b" />

:::info Dica
Se os dados que você estiver trabalhando não tiverem uma chave única (como o `id`), você pode utilizar o segundo parâmetro da função `keyExtractor` para gerar uma chave única baseada no índice do item. Por exemplo: `keyExtractor={(item, index) => String(index)}`. Isso vale também para a `FlatList` e para o `.map()` padrão do javascript.
:::

## Para Extrema Performance: `FlashList`

Por mais que a `FlatList` seja eficiente, em aplicativos complexos que demandam alta performance de lista contendo elementos pesados (imagens, vídeos) ou transições de scroll extremamente rápidas, a `FlatList` padrão ainda pode engasgar.

A equipe da **Shopify** construiu uma biblioteca de terceiros chamada [`FlashList`](https://shopify.github.io/flash-list/). Essa lista promete ser até 5 vezes mais rápida que a `FlatList` no iOS e 10 vezes mais rápida no Android.

A migração é extremamente simples, pois a API da `FlashList` foi projetada para ser praticamente idêntica à `FlatList`. Basta alterar o componente importado e adicionar uma propriedade extra obrigatória chamada `estimatedItemSize` (que ajuda a biblioteca a pré-calcular os layouts).

```tsx
import { FlashList } from "@shopify/flash-list";

// Dentro do seu componente:
<FlashList
  data={MEUS_DADOS}
  renderItem={({ item }) => <MeuComponente item={item} />}
  estimatedItemSize={50} // Altura estimada aproximada do item
/>
```

:::info Dica de Ouro
Se estiver construindo um aplicativo de produção, como um feed infinito que fará muito sucesso na loja de aplicativos, adote o `FlashList` logo desde o início da criação do componente.
:::

## ⚡ Aprenda na Prática

> Chegou a hora de colocar as mãos no código! Acesse a <Link to="/docs/atividades/atividade-listas">**Atividade: Listas**</Link> no menu de atividades deste E-Book.

---

:::info Próxima Aula: Estilização de Componentes
Agora que você já domina os elementos básicos e componentes de lista, vamos mergulhar na organização visual. Na próxima aula, você aprenderá como abstrair o CSS utilizando `StyleSheet` e como organizar o layout de telas complexas utilizando **Flexbox**.
:::
