import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Context API: Compartilhando Estados

Até agora, aprendemos a passar dados entre componentes usando **Props**. No entanto, à medida que nossa aplicação cresce, passamos a enfrentar um problema comum: a necessidade de passar informações por muitos níveis de componentes que não precisam delas, apenas para chegar ao destino final.

## O Problema: Prop Drilling

O **Prop Drilling** (perfuração de props) ocorre quando você tem um dado no topo da árvore de componentes (ex: `App.tsx`) e precisa enviá-lo para um componente que está lá no fundo. 

Imagine que você quer passar o "Nome do Usuário" do `App` para um `Avatar` que está dentro de um `Header`, que está dentro de um `Layout`. O `Layout` e o `Header` não usam o nome, mas precisam recebê-lo e passá-lo adiante. Isso torna o código difícil de manter e propenso a erros.

---

## O Conceito de Contexto

A **Context API** funciona como um "depósito central" de informações. Em vez de passar a prop de mão em mão, o componente pai "provê" o dado para toda a sua subárvore. Qualquer componente abaixo dele pode "consumir" esse dado diretamente, sem intermediários.

É ideal para dados globais como:
- Tema (Dark/Light mode)
- Dados do usuário logado
- Carrinho de compras
- Preferências de idioma

---

## Receita dos 4 Passos (Standard Context)

Para implementar um contexto de forma organizada e profissional, utilizaremos uma receita de 4 passos. Vamos usar como exemplo um contexto para um Player de Música.

### 1. Definir as Props Compartilhadas (Shared Props)
Primeiro, criamos uma interface que descreve tudo o que o nosso contexto vai oferecer (estados e funções).

```tsx
export interface AppContextProps {
  track: number;
  prev: () => void;
  next: () => void;
  musicTime: number;
}
```

### 2. Criar o Contexto (`createContext`)
Criamos o objeto de contexto propriamente dito. Geralmente ele inicia vazio (`undefined`).

```tsx
import { createContext } from "react";

export const AppContext = createContext<AppContextProps | undefined>(undefined);
```

:::info Dica
O contexto pode ter o nome que você quiser, mas geralmente é nomeado seguindo a estrutura: `NomeDaCaracterística + Context`. No nosso exemplo, usamos `AppContext` para o contexto global do player de música (contexto da aplicação). Outro exemplo seria: Se fosse para o tema, poderíamos chamar de `ThemeContext`.
:::

### 3. Criar o Provedor (`Provider`)
O Provider é o componente que vai envolver a nossa aplicação. Ele contém a lógica (estados e funções) e "injeta" os valores no contexto. Note que ele é um componente como qualquer outro, mas sempre recebe a prop `children` para abrigar os componentes que precisam do contexto.

```tsx
import { PropsWithChildren, useState } from "react";

export default function AppContextProvider({ children }: PropsWithChildren) {
  const [track, setTrack] = useState(1);

  const appContext: AppContextProps = {
    track,
    prev: () => { if (track > 1) setTrack(track - 1); },
    next: () => { setTrack(track + 1); },
    musicTime: 1.55,
  };

  return (
    <AppContext.Provider value={appContext}>
      {children}
    </AppContext.Provider>
  );
}
```

### 4. Criar o Hook de Consumo (`Consumer Hook`)
Para facilitar o uso e evitar erros, criamos um hook customizado que verifica se o contexto está sendo usado dentro do Provider correto.

```tsx
import { useContext } from "react";

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppContextProvider!");
  }

  return context;
}
```

---

## Como usar na Prática

### Passo A: Envolver a Aplicação
No seu `App.tsx`, envolva os componentes que precisam do dado com o seu `ContextProvider`.

```tsx
import AppContextProvider from './contexts/AppContext';

export default function App() {
  return (
    <AppContextProvider>
       <SuaAplicacao />
    </AppContextProvider>
  );
}
```

:::info Dica
Se você estiver trabalhando com o **Expo Router**, você pode envolver o seu Root Layout, que fica no arquivo `app/_layout.tsx`, com o seu `ContextProvider`. Desse modo, o contexto ficará disponível para todas as telas da sua aplicação. Para aplicações mais simples (sem Expo Router), você pode envolver o `App.tsx` com o seu `ContextProvider`.
:::

### Passo B: Consumir os Dados
Em qualquer componente filho, basta chamar o hook que criamos no Passo 4.

```tsx
import { useAppContext } from './contexts/AppContext';

export default function PlayerControls() {
  const { track, next, prev } = useAppContext();

  return (
    <View>
      <Text>Tocando música: {track}</Text>
      <Button title="Anterior" onPress={prev} />
      <Button title="Próxima" onPress={next} />
    </View>
  );
}
```

## Exemplo em Execução: Context API

No **Snack** a seguir, você pode ver um exemplo completo de como usar a Context API.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-09-01-a" />

---

## ⚡ Aprenda na Prática

Agora que você conhece a estrutura, vamos aplicar esse conhecimento criando um sistema de temas dinâmicos!

> Acesse a <Link to="/docs/atividades/atividade-context">**Atividade: Context API**</Link> para praticar a implementação de temas Dark/Light usando a Context API.

---

:::info Próxima Aula: Persistência de Dados com Async Storage
Com o estado e o contexto gerenciados em memória, o próximo desafio é aprender a salvar dados de forma permanente no dispositivo. Na próxima aula, exploraremos a persistência de dados local com o **Async Storage**.
:::
