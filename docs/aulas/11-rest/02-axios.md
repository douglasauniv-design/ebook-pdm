---
sidebar_label: "Acesso a API com Axios"
---

# Consumindo Dados: REST com Axios e PocketBase Local

Na aula anterior, aprendemos como estruturar uma API REST na nuvem com VPS e CapRover. Porém, para fins de estudo e desenvolvimento local, não precisamos gastar dinheiro contratando serviços de hospedagem. Podemos rodar tudo diretamente em nosso computador (**localhost**).

Nesta aula, aprenderemos a executar o **PocketBase** localmente, estruturar um projeto Expo de navegação e entender o fluxo de leitura e escrita de dados de uma API usando a biblioteca **Axios**.

:::tip Material de Apoio
Esta aula é baseada e complementa os seguintes recursos:
* **Videoaula**: [PDM - REST com Axios e PocketBase](https://www.youtube.com/watch?v=pewHnJfl_Y4)
* **Código Fonte**: Repositório GitHub oficial da videoaula [pdm-ts-lesson-rest](https://github.com/university-lessons/pdm-ts-lesson-rest/tree/main)
:::

---

## Passo 1: Executando o PocketBase Localmente

O PocketBase é incrivelmente leve porque é distribuído como um único arquivo executável (binário) que já contém o banco de dados (SQLite) e o servidor de API REST.

Você tem **duas opções** para rodar o PocketBase nesta aula:

1. **Opção Manual**: Fazer o setup do zero (descrito abaixo).
2. **Opção Pronta (Lazy)**: Baixar o [um projeto com o pocketbase pronto](https://github.com/university-lessons/pdm-ts-lesson-rest/raw/refs/heads/main/pocketbase/PocketBaseExemplo.tar.xz). Esse arquivo compactado já vem com o executável do pocketbase e a pasta `pb_data` contendo a coleção de carros configurada. O login de admin deste pocketbase é `admin@example.com` e a senha é `123123123123`.

### Setup Manual
Caso queira configurar tudo do zero:

1. Acesse a página oficial de download: [pocketbase.io/docs/](https://pocketbase.io/docs/)
2. Baixe a versão correspondente ao seu sistema operacional (Windows, macOS ou Linux).
3. Descompacte o arquivo `.zip` baixado em uma pasta de sua preferência no seu computador.
4. Abra o terminal (ou prompt de comando) na pasta do executável e inicie o servidor:
   ```bash
   # Linux / macOS
   ./pocketbase serve

   # Windows
   ./pocketbase.exe serve
   ```
5. Acesse o Painel Admin em `http://127.0.0.1:8090/_/` e crie a sua conta de administrador.
6. Crie uma coleção chamada `cars` com a seguinte estrutura de campos:
   * `brand` (tipo *Plain text*)
   * `model` (tipo *Plain text*)
   * `hp` (tipo *Number* - representa a potência do carro em cavalos)
7. Adicione alguns registros de teste.
8. Acesse a engrenagem de configurações da coleção `cars` ➔ **API Rules**, clique nos cadeados ao lado de **List/Search** e **View** e limpe as condições (deixe em branco) para liberar o acesso público REST sem necessidade de tokens. Salve as alterações.

---

## O Desafio do "Localhost" no Desenvolvimento Mobile

Quando programamos para a Web, acessar `http://localhost:8090` funciona perfeitamente porque a aplicação e o servidor rodam na mesma máquina. No mobile, a rede é isolada:
* O **Emulador Android** e o **Simulador iOS** são máquinas virtuais separadas e não conhecem o `localhost` do seu computador de desenvolvimento.
* O **Dispositivo Físico** (via Expo Go) é outro dispositivo na rede.

### Como resolver?

#### 1. Simulador iOS
* Pode usar `http://127.0.0.1:8090` ou `http://localhost:8090` diretamente, pois ele compartilha a interface de rede do macOS.

#### 2. Dispositivo Físico (via Expo Go)
* Você deve utilizar o **IP local da sua máquina** (ex: `http://192.168.1.100:8090`) e garantir que computador e celular estejam na **mesma rede Wi-Fi**.

#### 3. Emulador Android (Método recomendado: `adb reverse`)
* Por padrão, o emulador Android exige o IP especial `http://10.0.2.2:8090` para acessar o host.
* Para facilitar o desenvolvimento de forma uniforme (usando `localhost` tanto para Android, iOS quanto Web), você pode usar o redirecionamento de portas do Android SDK (ADB). Com o emulador Android aberto, execute no terminal do seu computador:
  ```bash
  adb reverse tcp:8090 tcp:8090
  ```
  Isso faz com que o emulador Android enxergue a porta `8090` da sua máquina de desenvolvimento como seu próprio `localhost:8090`.

---

## Passo 2: Criando o Projeto e Instalando Dependências

Para iniciar a integração no React Native, vamos criar um novo projeto Expo com o template de navegação padrão:

1. No terminal, execute o comando:
   ```bash
   yarn create expo --template
   ```
2. Selecione a opção **Navigation (TypeScript)**.
3. Como esse template vem com várias telas, rotas e arquivos de exemplo pré-configurados, limpe a área de trabalho para a nossa atividade excluindo as seguintes pastas e arquivos:
   * Pasta `components/`
   * Pasta `constants/`
   * Todo o conteúdo contido na pasta `app/`

Em seguida, instale a biblioteca **Axios** (nossa cliente HTTP para requisições REST):
```bash
yarn add axios
```

---

## Passo 3: Estrutura do Projeto

Ao estruturar seu projeto de integração com a API, siga a organização padrão de pastas do [repositório da aula](https://github.com/university-lessons/pdm-ts-lesson-rest/tree/main). Focaremos nas seguintes pastas dentro de `src/`:

```text
├── app/                  # Telas do Expo Router (ex: index.tsx, userspace/)
└── src/
    ├── services/
    │   └── api.ts        # Instância centralizada do Axios
    └── types/
        └── Car.ts        # Definição do Tipo TypeScript Car
```

### Configuração do Serviço API (`src/services/api.ts`)
Neste arquivo, criamos e exportamos uma instância padrão do Axios definindo a `baseURL` (sem a rota `/api`) apontando para a porta do nosso PocketBase (`http://10.0.2.2:8090/` ou `http://localhost:8090/`).

### Definição do Tipo (`src/types/Car.ts`)
Neste arquivo, criamos a tipagem TypeScript `Car` definindo os campos idênticos aos criados no banco de dados (`id`, `brand`, `model` e `hp`).

> Veja o código completo desses dois arquivos diretamente no [repositório de referência](https://github.com/university-lessons/pdm-ts-lesson-rest/tree/main/src).

---

## Passo 4: Fluxo de Requisição de Dados (GET e POST)

Em vez de repetir o código de requisição dentro de elementos da interface, a boa prática exige gerenciar os dados da API por meio do ciclo de vida dos componentes do React.

### 1. Fluxo de Leitura de Dados (GET)

Para carregar e exibir a lista de veículos na tela, o fluxo segue as seguintes etapas:

```text
Componente Monta
       ▼
useEffect dispara
       ▼
Chamada GET (Axios)
       ▼
┌──────┴────────────┐
▼                   ▼
Sucesso             Falha
(Salva no Estado)   (Salva o Erro)
```

1. **Componente é Montado**: O Hook `useEffect` (com array de dependências vazio `[]`) é disparado uma única vez ao carregar a tela.
2. **Atualização de Estados Auxiliares**: Definimos o estado `loading` como `true` e limpamos eventuais mensagens do estado `error`.
3. **Requisição HTTP**: Invocamos `api.get('/api/collections/cars/records')` dentro de um bloco `try-catch`.
4. **Sucesso**: Em caso de resposta bem-sucedida, atualizamos o estado `cars` com a lista de registros retornados (`response.data.items`).
5. **Erro**: Se a requisição falhar (servidor fora do ar, erro de rede), o fluxo entra no `catch` e armazena o erro no estado `error` para exibir feedback visual ao usuário.
6. **Finalização**: No bloco `finally`, alteramos o estado `loading` para `false` para remover o indicador de carregamento da tela.

> Analise o arquivo de listagem de carros completo no repositório: [app/userspace/index.tsx](https://github.com/university-lessons/pdm-ts-lesson-rest/blob/main/app/userspace/index.tsx).

---

### 2. Fluxo de Mutação de Dados (POST)

Para enviar um novo carro para o servidor a partir do celular, o fluxo funciona da seguinte forma:

1. **Gerenciamento do Formulário**: Os campos do formulário (marca, modelo e potência) são controlados por estados locais (`useState`).
2. **Submissão e Conversão**: O usuário preenche e clica no botão de envio. A potência (`hpString`) é convertida de texto para inteiro usando `parseInt()`.
3. **Requisição POST**: Chamamos `api.post('/api/collections/cars/records', payload)` passando o objeto montado.
4. **Atualização da Interface**: Em caso de sucesso, atualizamos a lista de carros no estado da tela anterior inserindo o novo carro retornado pelo PocketBase (que agora já contém o `id` gerado pelo banco) ou navegamos de volta para a tela de listagem recarregando os dados.

> Analise o arquivo de cadastro de carros completo no repositório: [app/userspace/create_car.tsx](https://github.com/university-lessons/pdm-ts-lesson-rest/blob/main/app/userspace/create_car.tsx).

---

## ⚡ Exercício Prático

Agora que você compreende a arquitetura de uma requisição REST local utilizando Axios:

O repositório de exemplo conta com requisições GET (para obter todos os carros) e POST (para cadastrar um novo carro). Para colocar o conhecimento em prática, realize as seguintes tarefas:

1. **Edição e Exclusão**: Implemente novas telas ou ações que permitam ao usuário também editar e apagar carros. Verifique a documentação do PocketBase para obter detalhes sobre as rotas que serão necessárias.
2. **Filtro de Busca**: Crie uma tela de buscas que permita filtrar os carros cadastrados por marca.
3. **Consulta Personalizada (Query)**: Crie uma consulta única para o seu app. Ela pode ser o que você preferir: um cadastro em uma coleção auxiliar, um relacionamento, um filtro personalizado ou um filtro de "carros potentes" (filtrando por potência em HP acima de um valor específico), etc.
4. **Estilização**: Implemente uma interface agradável e moderna para toda a aplicação.
