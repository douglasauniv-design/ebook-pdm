import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Estilização de Componentes

Até agora, focamos na estrutura e no funcionamento lógico dos componentes. No entanto, para criar aplicativos profissionais que encantem o usuário, precisamos dominar a **estilização**. 

No React Native, não utilizamos arquivos `.css` externos. Em vez disso, utilizamos uma abordagem de **CSS-in-JS**, onde os estilos são escritos diretamente em JavaScript, utilizando nomes de propriedades que você provavelmente já conhece do CSS Web, mas em formato `camelCase`.

## Abstração com `StyleSheet`

Embora seja possível passar estilos diretamente para a prop `style` (estilos *inline*), a forma recomendada e performática de fazer isso é através do objeto `StyleSheet`.

O `StyleSheet.create` permite que você organize seus estilos fora do método de renderização, o que melhora a legibilidade e permite que o React Native envie o estilo para o motor de renderização nativo apenas uma vez.

```tsx
import { StyleSheet, Text, View } from 'react-native';

export default function ExemploStyleSheet() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estilização com StyleSheet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### Unidades de Medida
Diferente da Web, no React Native não usamos `px`, `em` ou `rem`. Todas as dimensões são **números sem unidade**, que representam pixels independentes de densidade (DP - *density-independent pixels*).

---

## Layout com Flexbox

O React Native utiliza o **Flexbox** como seu principal motor de layout. Quase tudo que você posiciona na tela usará Flexbox. 

Existem três propriedades fundamentais que você deve dominar:

### 1. `flexDirection`
Define a direção principal do eixo. **Diferente da Web, o padrão no React Native é `column`** (os itens são empilhados verticalmente).
- `column` (padrão)
- `row` (horizontal)

### 2. `justifyContent`
Define como os itens são distribuídos ao longo do **eixo principal** (definido pelo `flexDirection`).
- `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`.

### 3. `alignItems`
Define como os itens são alinhados no **eixo cruzado** (perpendicular ao eixo principal).
- `stretch` (padrão), `flex-start`, `center`, `flex-end`.

### O que é a propriedade `flex`?
A propriedade `flex` define como um componente deve "crescer" para ocupar o espaço disponível. Um componente com `flex: 1` ocupará todo o espaço restante do seu pai.

---

## Exemplo em Execução: Flexbox Playground

Abaixo você pode ver como as diferentes propriedades do Flexbox alteram o posicionamento dos elementos.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-08-01-a" />

---

## ⚡ Aprenda na Prática

Agora é sua vez de colocar a mão na massa e criar layouts complexos utilizando apenas Flexbox e StyleSheet.

> Chegou a hora de praticar! Acesse a <Link to="/docs/atividades/atividade-styles">**Atividade: Styles**</Link> no menu de atividades para testar seus conhecimentos.

---

:::info Próxima Aula: Context API
Com o visual dominado, vamos aprender como gerenciar o estado global da sua aplicação utilizando a **Context API**, permitindo que informações sejam compartilhadas entre diversos componentes de forma simples e organizada.
:::
