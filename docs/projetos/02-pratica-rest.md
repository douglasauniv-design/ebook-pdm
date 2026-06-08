---
sidebar_label: "🛠️ Prática de Implementação 2"
---

# Prática de Implementação 2

Chegou o momento de consolidar as habilidades mais avançadas que você desenvolveu no desenvolvimento mobile. Esta é a **Prática de Implementação 2**, que certifica você como um **aprendiz de nível Pleno** no ecossistema React Native.

Nesta atividade, o desafio é **construir um aplicativo móvel completo (CRUD) integrado a um servidor de banco de dados remoto via API REST**. Você unirá conceitos de roteamento, compartilhamento de estados globais, persistência persistente em banco local e em nuvem, e boas práticas de testes.

---

## 🚩 O Desafio

Escolha um tema de sua preferência (ex: Controle de Finanças Pessoais, Gerenciador de Tarefas/Projetos, Catálogo de Filmes ou Livros, Cadastro de Pets para Adoção, Estoque de Produtos, etc.) e desenvolva o aplicativo atendendo integralmente aos requisitos técnicos detalhados a seguir.

A persistência de dados deve ser realizada remotamente em uma API RESTful. É recomendado o uso do **PocketBase** (seja rodando localmente no seu computador ou hospedado remotamente), mas você também pode optar por uma API equivalente de sua preferência (como Supabase, jsonserver, ou um backend próprio).

---

## 🛠️ Requisitos Técnicos Obrigatórios

Cada requisito vale 1 ponto na avaliação final da atividade:

### 1. Navegação com Expo Router
O fluxo de telas da aplicação deve ser gerenciado obrigatoriamente usando o **Expo Router**. A estrutura de rotas deve separar as telas em dois grandes fluxos:
* **Fluxo de Autenticação**: Contendo pelo menos uma tela de Login pública.
* **Fluxo Restrito**: Contendo as telas de manipulação de dados, que só devem ser acessíveis caso o usuário esteja devidamente autenticado.

### 2. Autenticação com Context API
Utilize a **Context API** para criar um contexto global de autenticação (ex: `AuthContext`). Esse contexto deve:
* Armazenar o estado do usuário e o token de autenticação retornado pela API.
* Prover funções de `login` e `logout` que alterem os fluxos de rotas do Expo Router automaticamente com base no estado do token.

### 3. Persistência de Sessão Local (Async Storage)
Ao autenticar o usuário com sucesso, o token retornado pelo servidor deve ser persistido localmente via **Async Storage**. Ao reiniciar a aplicação, o app deve recuperar o token salvo para reestabelecer a sessão e direcionar o usuário diretamente para a área restrita sem exigir que ele digite as credenciais novamente.

### 4. Consumo de API - Leitura de Dados (GET)
Implemente a busca e listagem de registros da sua coleção remota através de requisições **GET** utilizando a biblioteca **Axios**. Os registros exibidos na tela devem vir de forma assíncrona do servidor remoto.

### 5. Criação e Exclusão de Dados (POST/DELETE)
Crie um formulário estruturado que permita ao usuário inserir novos registros no banco de dados remoto por meio de requisições **POST** enviadas via Axios. Além disso, implemente a funcionalidade de remover um registro da coleção através de requisições **DELETE**.

### 6. Edição de Registros (PUT/PATCH)
Permita que o usuário altere os dados de um registro existente através de um formulário de edição enviando requisições **PUT** ou **PATCH** via Axios.

### 7. Renderização Otimizada de Listas (FlatList)
A exibição dos registros retornados da API na tela restrita deve ser feita utilizando o componente `<FlatList>`. Garanta que a lista possua chaves únicas (`keyExtractor`) e implemente um componente de feedback amigável via prop `ListEmptyComponent` caso o servidor retorne um array vazio.

### 8. Controle de Estados Auxiliares (Loading e Erro)
Para cada requisição assíncrona feita pelo app (leitura e escrita), implemente tratamentos visuais:
* Um indicador de carregamento (`ActivityIndicator`) visível enquanto a Promise da requisição estiver pendente.
* Feedbacks em formato de mensagens ou alertas (`Alert.alert`) caso ocorra algum erro na rede ou falha de conexão com a API.

> Atenção: se você usa o Expo Web, use o alert do browser ao invés do Alert.alert do react-native (o Alert.alert não funciona no Expo Web).

### 9. Estilização e Conceitos de Layout (Aula 08)
A estilização da interface é livre (sendo criada a identidade visual pelo aluno), mas deve seguir as boas práticas ensinadas na Aula 08:
* Utilização de `StyleSheet.create` para organizar e estruturar os estilos.
* Uso de Flexbox para estruturação do layout de cada tela.
* Separação física dos estilos de componentes reutilizáveis, garantindo legibilidade e manutenção do código (não vale colocar os estilos hardcoded na tag style!).

### 10. Testes Unitários com Jest
A aplicação deve implementar testes unitários simples usando o **Jest** integrado ao ambiente Expo. Você deve escrever testes unitários para validar o funcionamento correto de pelo menos 3 componentes/funções (ex: renderização de botão customizado ou campo de input) ou função lógica do app (ex: helper de validação de dados, conversor de tipos).

Consulte a [documentação oficial de testes unitários do Expo](https://docs.expo.dev/develop/unit-testing/) para configurar e criar os testes.


:::info Entrega
O código deve estar organizado, em TypeScript, prezando pela componentização e separação de estilos. Siga a formatação e os padrões adotados nas aulas.

Se estiver usando o PocketBase de forma local, inclua no repositório um zip com a pasta completa do pocketbase (tal como foi feito o arquivo tar.gz da aula 12) juntamente com as credenciais de Admin.
:::