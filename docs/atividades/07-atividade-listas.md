---
sidebar_label: "⚡ Atividade: Listas"
---

# ⚡ Atividade Prática: Listas

Nesta atividade, você será desafiado a lidar com um volume real de dados e a organizá-los de forma eficiente para o usuário final.

## Objetivo

Você recebeu uma exportação de dados de um sistema legado contendo **1000 motocicletas** de diversas marcas e épocas. O problema é que os dados vieram em um **array plano** (uma lista simples), mas o design do aplicativo exige que elas sejam exibidas **agrupadas por categoria** (ex: Sport, Cruiser, Adventure, etc.) para facilitar a navegação. Então, você deve criar uma tela que exiba as motocicletas de forma agrupada e estilizada.

## Instruções da Atividade

Crie uma tela com um componente de lista, seguindo os seguintes passos:

### 1. **Importação de Dados**

Utilize o arquivo [motorcycles.json](/files/motorcycles.json)fornecido. Sugestão: no seu projeto, crie uma pasta `mocks` e coloque o arquivo dentro dela.

### 2. **Transformação de Dados**

Crie uma função (helper) que receba este array simples de 1000 itens e o transforme em um formato compatível com o componente de lista agrupada do React Native.

- Dica: Você precisará agrupar os itens pela propriedade `category`.

### 3. **Componente de Lista**

Identifique e utilize o componente do React Native que é otimizado para exibir listas que possuem cabeçalhos de seção e itens agrupados.

### 4. **Interface e Estilo**

- Cada item da lista deve exibir o **Modelo**, a **Marca** e o **Ano**.
- O **Cabeçalho da Seção** deve exibir o nome da categoria com um estilo visual distinto (ex: fundo diferente, fonte em negrito).
- Utilize cores e espaçamentos que tornem a leitura de uma lista tão longa algo agradável.

---

## O que Você Deve Observar?

- **Lógica de Programação**: A eficiência da sua função de agrupamento.
- **Escolha do Componente**: Se você utilizou o componente correto para dados seccionados em vez de renderizar múltiplas listas simples.
- **Organização do Código**: Separação de estilos e lógica de tratamento de dados.
- **Interface e Estilo**: Qualidade visual da lista e legibilidade.

:::tip Desafio Extra
Adicione um resumo ao final de cada categoria (rodapé da seção) informando a quantidade total de veículos listados naquele grupo (ex: "Total: 42 motocicletas").
:::
