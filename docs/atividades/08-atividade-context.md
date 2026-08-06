---
sidebar_label: "⚡ Atividade: Context API"
---

# ⚡ Atividade Prática: Context API

Nesta atividade, vamos elevar o nível de maturidade da nossa aplicação. O objetivo é criar um **Gerenciador de Temas (Dark/Light)** centralizado, permitindo que todos os componentes da interface reajam instantaneamente à mudança de tema sem o uso de props manuais.

## Objetivo

Você deve implementar um `ThemeContext` seguindo a **Receita de 4 Passos** vista em aula. Após criar o contexto, você deverá refatorar (ou criar) componentes base para que eles consumam as cores do tema automaticamente.

<!-- A imagem a seguir mostra como a mesma tela deve se comportar ao alternar o tema:

<img
src={require('@site/static/img/atividades/atividade-context.jpg').default}
alt="Exemplo de Dark/Light mode com Context API"
style={{ height: '400px', borderRadius: '10px', display: 'block', margin: '0 0 24px'}}
/> -->

## Instruções da Atividade

### 1. Definição do Contexto (`contexts/ThemeContext.tsx`)

Siga a receita de 4 passos:
1. **Shared Props**: Defina o tipo `Theme` ('light' | 'dark') e as props do contexto (o tema atual e uma função `toggleTheme`).
2. **createContext**: Inicie o contexto.
3. **Provider**: Implemente a lógica de estado para alternar entre as strings 'light' e 'dark'.
4. **Consumer Hook**: Crie o `useTheme`.

### 2. Refatoração dos Componentes

Seus componentes agora devem "se auto-estilizar" baseados no contexto. No arquivo de cada componente, utilize o `useTheme` para capturar o tema atual e aplicar os estilos correspondentes.

#### Componentes a serem atualizados:

- **`ScreenWrapper` (Scrollable/Fullscreen)**: 
    - No tema `light`: Fundo claro (ex: `#FFFFFF`).
    - No tema `dark`: Fundo escuro (ex: `#121212`).
  
- **`FormInput`**:
    - Deve mudar a cor do texto, do placeholder e da borda conforme o tema.
  
- **`FormButton`**:
    - Pode mudar a cor de fundo do botão ou apenas a cor do rótulo para garantir contraste.

### 3. Implementação do Chaveador (Switch)

Na sua tela principal (ex: `App.tsx` ou uma `SettingsScreen`), adicione um componente `Switch`. 
- O `value` do Switch deve estar vinculado ao estado do tema.
- O `onValueChange` deve disparar a função `toggleTheme` do seu contexto.

### 4. O que Você Deve Observar?

- **Centralização**: Note como o `App.tsx` não precisa passar props de cor para nenhum dos componentes internos.
- **Tipagem**: Garanta que o TypeScript não aponte erros ao usar as cores dinâmicas.
- **Desempenho**: Observe que apenas os componentes que consomem o contexto (via `useTheme`) serão renderizados novamente ao trocar o tema.

:::tip Dica de Organização
Crie um objeto de constantes para suas cores, por exemplo:
```tsx
const Colors = {
  light: { background: '#FFF', text: '#000' },
  dark: { background: '#121212', text: '#FFF' }
}
```
Isso facilitará a aplicação dos estilos dentro dos seus componentes.
:::
