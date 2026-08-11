---
sidebar_label: "⚡ Atividade: Props"
---

# ⚡ Atividade Prática: Componente de Perfil de Usuário

Nesta atividade, vamos praticar um dos conceitos mais importantes do React: **Props (Propriedades)**. O objetivo é criar um componente reutilizável do tipo Card de Perfil de Usuário, capaz de exibir diferentes informações dinamicamente a partir dos dados recebidos do componente pai.

## Objetivo

Você vai construir um componente chamado `UserProfileCard` no seu projeto React Native. Ele deve ser dinâmico e flexível o suficiente para ser utilizado em várias partes de uma rede social ou painel de controle, adaptando-se visualmente conforme as propriedades fornecidas.

A imagem a seguir serve como o seu norte visual para a implementação. Ela mostra como o componente deve ser renderizado quando preenchido com as informações do perfil:

<img
  src={require('@site/static/img/atividades/atividade-card-perfil.png').default}
  alt="Norte visual para a atividade de Perfil de Usuário"
  style={{ height: '400px', borderRadius: '10px', display: 'block', margin: '0 0 24px'}}
/>

---

## Especificações Técnicas (O Contrato de Props)

O componente `UserProfileCard` deve ser criado em um arquivo separado, preferencialmente em `src/components/UserProfileCard.tsx` (ou na pasta de componentes do seu projeto).

Você deve definir uma interface TypeScript para tipar as propriedades recebidas pelo componente. O contrato de Props é o seguinte:

- **`name`** (string - *obrigatório*): O nome completo do usuário.
- **`role`** (string - *obrigatório*): O cargo, profissão ou função do usuário (ex: "Product Designer").
- **`avatarUrl`** (string - *obrigatório*): O endereço de URL para a imagem de avatar do perfil.
- **`bio`** (string - *opcional*): Uma breve biografia do usuário.
- **`status`** ('online' | 'offline' - *opcional*): Define o status de atividade. Caso seja 'online', exibe um indicador verde no avatar; caso seja 'offline', exibe cinza (ou nenhuma cor).
- **`onPressFollow`** (função/callback - *opcional*): Função que será executada ao tocar no botão "Seguir".

---

## Instruções da Atividade

### 1. Estruturação do Componente

1. Crie o arquivo `UserProfileCard.tsx` e defina a interface `UserProfileCardProps` com as propriedades listadas acima.
2. Utilize elementos nativos do React Native para montar a estrutura visual:
   - `<View>` para os containers e estruturação do layout (utilizando Flexbox).
   - `<Image>` para renderizar o avatar do usuário.
   - `<Text>` para o nome, cargo e biografia.
   - `<Pressable>` ou `<TouchableOpacity>` para o botão de ação ("Seguir").

### 2. Estilização Moderna

> **Dica**: Os itens abaixo são apenas uma sugestão visual, sinta-se livre para adaptar o design ao seu gosto. A imagem no início da página é apenas um exemplo do que você pode fazer.

1. Aplique estilos para dar ao componente a aparência de um **Card**, por exemplo:
   - Cantos arredondados (`borderRadius`), bordas finas ou sombras suaves para destacar o card do fundo da tela.
   - Espaçamento interno (`padding`) adequado.
   - Disposição flexível para alinhar o avatar, os textos do perfil e o botão verticalmente ou horizontalmente.
2. Estilize o indicador de **status** (bolinha) para ficar posicionado estrategicamente no canto da foto de perfil.

### 3. Tratamento de Casos Especiais (Dados Opcionais)

1. **Biografia Opcional**: Se a prop `bio` não for fornecida, exiba uma mensagem padrão amigável como *"Este usuário não possui biografia."*, ou oculte a seção com elegância.
2. **Status Opcional**: Se a prop `status` não for definida, o componente não deve mostrar a bolinha de status.
3. **Botão de Seguir Opcional**: Se a prop `onPressFollow` não for fornecida, você pode ocultar o botão "Seguir" ou deixá-lo desabilitado.

### 4. Testando o Componente

No seu arquivo principal (`App.tsx`), importe o `UserProfileCard` e renderize **pelo menos 3 variações** do componente para verificar se ele se adapta corretamente:

1. **Usuário 1**: Forneça todas as propriedades (nome, cargo, bio, avatar, status 'online' e a função para o botão que exibe um `Alert`).
2. **Usuário 2**: Forneça apenas as obrigatórias e o status 'offline' (sem a biografia e sem a ação do botão).
3. **Usuário 3**: Forneça as obrigatórias e uma biografia diferente, mas sem definir a propriedade `status` (garantindo que o indicador de status não quebre a tela).

:::tip Dica de Ouro
Para carregar a imagem de rede usando a prop `avatarUrl`, lembre-se de configurar a propriedade `source` do componente `<Image>` da seguinte forma:
```tsx
source={{ uri: avatarUrl }}
```
E não se esqueça de definir a largura (`width`) e altura (`height`) explicitamente no estilo da imagem, caso contrário ela não aparecerá na tela!
:::
