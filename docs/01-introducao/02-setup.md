# Instalação e Configuração do Ambiente

Seja bem-vindo à fase prática! Nesta aula, vamos preparar o seu ecossistema de desenvolvimento, composto pelas seguintes ferramentas:

- NVM (Node Version Manager);
- Node JS;
- Yarn.

Para um guia visual completo, assista ao tutorial. Fique atento às versões dos softwares, que podem ter sido atualizadas após a gravação do vídeo:

- [Configuração do Ambiente (Passo a Passo)](https://youtu.be/_JrOr1_jPm4?si=VR6iZs2XS9v5unlE)

## Instalação do Node.js via NVM

A recomendação oficial para nossa disciplina é o uso do **NVM (Node Version Manager)**. Ele permite alternar entre versões do Node sem conflitos de permissão.

### Linux

1. Instale o NVM:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

2. Instale o Node JS LTS:

```bash
nvm install --lts
```

Mais informações em [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

### macOS

1. Instale o NVM:

Você pode usar a mesma abordagem do Linux, instalando o NVM via script:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Ou ainda, se você já é um usuário do [Homebrew](https://brew.sh/), use-o:

```bash
brew install nvm
```

2. Instale o Node JS LTS:

Após instalar o NVM, execute no terminal:

```bash
nvm install --lts
```

### Windows

1. Instale o NVM:

Você pode instalar o NVM e usar via Powershell, isso pode ser feito de duas formas:

Pelo [nvm-windows](https://github.com/coreybutler/nvm-windows).

Ou ainda pelo [chocolatey](https://chocolatey.org/install) (Siga o tutorial de instalação do Chocolateym depois prossiga para o NVM):

```bash
choco install nvm
```

2. Instale o Node JS LTS:

Após instalar o NVM, execute no PowerShell:

```bash
nvm install lts
```

### Verificação da instalação

Após realizar a instalação do NVM e do Node JS LTS, verifique a instalação (qualquer plataforma). Se tudo estiver ok, você verá as versões de cada um dos softwares, seguidas da lista de todos os "nodes" instalados (nvm list):

```bash
$ node -v
$ npm -v
$ nvm list # (caso tenha instalado via NVM)
```

## Ativação do Yarn

Em versões modernas do Node JS, o gerenciador de pacotes yarn já vem instalado e pode ser ativado com o seguinte comando:

```bash
$ corepack enable
```

## Instalação do VSCode

[https://code.visualstudio.com/](https://code.visualstudio.com/)

Extensões (opcionais) usadas pelo professor:

- [Material Icon Theme (Tema de icones)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Dracula Official (Tema de cores)](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)
- [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): siga o tutorial [https://www.youtube.com/watch?v=ZimhIjCaaa4](https://www.youtube.com/watch?v=ZimhIjCaaa4)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Windsurf Plugin: AI Coding Autocomplete](https://marketplace.visualstudio.com/items?itemName=Codeium.codeium)

## Hello World com Expo

O expo pode ser usado via npx e yarn, não é necessário instalar. Nesta disciplina, vamos dar preferência ao yarn.

### Criação de um novo projeto

A criação de projetos do Expo é sempre realizada pelo terminal, você pode iniciar um novo projeto de duas formas:

1. Pelo Yarn (recomendado nesta disciplina):

```bash
yarn create expo --template
```

Selecionar o template _Blank (TypeScript)_ quando for solicitado.

2. Pelo NPX (usará NPM como gestor de pacotes). Note que o nome do projeto já deve ser inserido no comando (my-app):

```bash
npx create-expo-app my-app --template
```

Selecionar o template _Blank (TypeScript)_ quando for solicitado.

### Execução do projeto

Dado que você criou o projeto "my-app" na etapa anterior:

```bash
cd my-app
yarn start
```

Instale o Expo Go no seu smartphone (Android ou iOS):

[![Google Play](https://img.shields.io/badge/Google_Play-000000?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=host.exp.exponent)
[![App Store](https://img.shields.io/badge/App_Store-000000?style=for-the-badge&logo=apple&logoColor=white)](https://apps.apple.com/app/expo-go/id982107779)

Depois leia o QR Code gerado durante a execução do projeto.

**Dica**: se você estiver rodando o projeto num PC que esteja em uma rede diferente do seu smartphone (ex: PC na rede cabeada, Celular na Wifi), pode ser necessário executar o projeto com um **túnel** de rede, o expo fornece esse recurso com o uso do ngrok:

```bash
$ yarn start --tunnel
```

Para finalizar, saiba que você pode executar diretamente pelo terminal uma plataforma específica:

```bash
yarn android

# ou
yarn ios # Somente para macOS!

# ou
yarn web #tente! React é vida!
```

Em caso de dúvidas, consulte a documentação oficial do Expo: [https://docs.expo.dev/](https://docs.expo.dev/)

## Bônus: Configuração do Emulador do Android no PC

Se você tiver em mãos um PC ou Notebook moderno, poderá dispensar o uso do smartphone físico e usar o Emulador do Android. Este passo é opcional na disciplina, mas pode facilitar a programação das atividades.

Siga os passos do tutorial da videoaula:

- [https://youtu.be/\_JrOr1_jPm4?si=eHGRdlqcbyP_Fk-t&t=1306](https://youtu.be/_JrOr1_jPm4?si=eHGRdlqcbyP_Fk-t&t=1306)

Caso você encontre um erro no momento da execução, adicione os caminhos da SDK do Android em `~/.bashrc` ou `~/.zshrc` no macOS/linux com zsh. Este tutorial considera que você tem instalado o Android Studio em `$HOME/Applications/android-studio`. Baixe o Android Studio, descompacte-o na pasta citada, acesse a subpasta bin, execute studio.sh para iniciar a instalação.

Depois, edite o arquivo de configurações do seu terminal (`~/.bashrc` ou `~/.zshrc`):

```bash
$ nano ~/.bashrc
```

Cole o seguinte bloco no final do arquivo, comentando/descomentando/editando as variáveis de ambiente de acordo com a configuração do seu sistema operacional:

```bash
#Cole isso no final do arquivo
export ANDROID_SDK=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_SDK/emulator
export PATH=$PATH:$ANDROID_SDK/tools
export PATH=$PATH:$ANDROID_SDK/tools/bin
export PATH=$PATH:$ANDROID_SDK/platform-tools
#Necessário para Bare Workflow (ajuste os paths para o seu sistema)
export ANDROID_HOME=$HOME/Android/Sdk
#Java é necessário, se você for usar apenas o emulador, pode usar a jre do próprio android studio, mas se for fazer builds do projeto vai precisar da JDK, neste caso instale o Java separado (veja a opção 2)
#Opção 1: apenas emulador
export JAVA_HOME=$HOME/Applications/android-studio/jre #jbr em versões mais novas
#Opção 2: instale o Java (sudo apt install openjdk-17-jdk) e aponte para o caminho da JDK
#export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

## ⚡ Aprenda na Prática

> **Desafio do Dia:** Configure o seu ambiente de trabalho, depois crie e execute um projeto Expo. Explore os arquivos do projeto e veja o que descobre.

## Para Saber Mais

Esta seção contém boas referências de estudo e materiais de apoio, explore-as e enriqueça seu conhecimento!

Guia para React Native (Excelente Leitura!):

- https://www.reactnative.express/

Expo

- https://docs.expo.dev/
- https://docs.expo.dev/versions/latest/

React Native

- https://reactnative.dev/
- https://reactnative.dev/docs/getting-started

Rocketseat

- https://react-native.rocketseat.dev/

---

:::info Próxima Aula: Estrutura do Projeto
Com o seu laboratório devidamente equipado, você acaba de dar o passo mais importante: sair do zero. Agora que as ferramentas estão prontas, é hora de abrir a 'caixa preta' do framework. Na próxima aula, vamos dissecar a estrutura de um projeto Expo e entender como cada arquivo contribui para a mágica de transformar código em aplicativos nativos. Até lá!
:::
