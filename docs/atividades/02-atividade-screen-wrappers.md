---
sidebar_label: "⚡ Atividade: Screen Wrappers"
---

# ⚡ Atividade Prática: Screen Wrappers

Nesta atividade, vamos criar a "moldura" oficial das telas do seu aplicativo. O objetivo é encapsular a lógica da infraestrutura de UI e espaçamentos em componentes que você usará em todos os projetos futuros.

## Objetivo

Você vai criar dois componentes do tipo "container", salve-os em uma pasta `components/screen-wrappers/`. O primeiro componente será útil para composições em tela cheia, como telas de login onde o conteúdo não possui scroll e fica centralizado no meio da tela. Já o segundo componente será útil para qualquer caso onde a aplicação precise rolagem de tela.

A imagem a seguir serve como o seu norte visual para a implementação dos Screen Wrappers. À esquerda, você observa o comportamento do `Screen Wrapper Fullscreen`: note como o formulário de acesso da Estação Cisne está perfeitamente centralizado, criando um layout fixo e focado, ideal para fluxos de autenticação. À direita, o `Screen Wrapper Scrollable` entra em ação para gerenciar a lista de sobreviventes; observe a presença da barra de rolagem e o espaçamento uniforme (nosso `gap`) entre os cartões, garantindo que o conteúdo flua naturalmente sem tocar as bordas. O seu desafio nesta atividade é construir esses dois contêineres reutilizáveis para que, ao trocar apenas o componente "pai" da sua tela, ela se adapte instantaneamente a um desses dois modos de exibição profissional.

<img
src={require('@site/static/img/atividades/atividade-screen-wrappers.jpg').default}
alt="Foto exemplo da atividade"
style={{ height: '400px', borderRadius: '10px', display: 'block', margin: '0 0 24px'}}
/>

Ao final do exercício, observe como o seu `App.tsx` ficará muito mais limpo. Você não precisará mais se preocupar com a infraestrutura de UI ou estilos de container em todas as páginas; o Wrapper resolve isso para você.

## Instruções da Atividade

### 1. Configuração da StatusBar

Antes de criar os wrappers, precisamos garantir que o conteúdo do app não fique "escondido" atrás da barra de status (onde fica o relógio e a bateria). No Expo, utilizamos o componente `StatusBar` da biblioteca `expo-status-bar`. Este componente também permite a personalização da aparência da StatusBar, ajuste ela de acordo com o tema de cores desejado para a sua aplicação (dark ou light).

### 2. ScreenWrapper Fullscreen (Tela Cheia)

Este wrapper é ideal para telas que não precisam de rolagem, como telas de Login, Splash Screens ou Dashboards simples. O diferencial aqui é a prop `center`, que permite centralizar todo o conteúdo vertical e horizontalmente com um único comando.

**O Contrato (Props)**:

- `children`: O conteúdo da tela.
- `center`: Se true, centraliza o conteúdo. Esta prop deve ser _opcional_.
- `padding`: Valor numérico para o respiro das bordas. Esta prop deve ser _opcional_ e ter _valor padrão 20_.
- `gap`: Espaçamento (do Flex) entre os elementos internos. Esta prop deve ser _opcional_.

**Bonus**: Pesquise sobre o componente [SafeAreaView](https://docs.expo.dev/versions/latest/sdk/safe-area-context/) e tente integrá-lo aos seus wrappers. Ele é fundamental para garantir que o conteúdo do seu app não seja cortado por entalhes (notches), câmeras frontais ou barras de navegação em dispositivos modernos, especialmente no iOS.

### 3. ScreenWrapper Scrollable (Tela com Rolagem)

Para telas com muito conteúdo (formulários longos, textos, listas), precisamos da `ScrollView`. Além do `padding` e `gap`, adicionaremos suporte ao `RefreshControl` para permitir o famoso "puxar para atualizar".

**O Contrato (Props)**

- `children`: O conteúdo da tela.
- `padding`?: Respiro das bordas. Esta prop deve ser _opcional_ e ter _valor padrão 20_.
- `gap`: Espaçamento entre os elementos. Esta prop deve ser _opcional_.
- `onRefresh`: Função que será disparada ao puxar a tela para baixo. Esta prop deve ser _opcional_.

:::tip Dica de Teste
Como ainda não usamos navegação, a maneira mais simples de testar é criar **múltiplos retornos** no seu `App.tsx`. O React executará apenas o primeiro return que encontrar. Para alternar entre os wrappers, basta "comentar" o bloco de cima e "descomentar" o de baixo!
:::
