---
sidebar_label: "Configuração de API REST"
---

# Subindo uma API: o Mínimo de DevOps que todo Desenvolvedor Mobile Deve Saber


Nas aulas anteriores, aprendemos sobre persistência local com o **Async Storage**. Contudo, para aplicações reais que necessitam de sincronização entre múltiplos dispositivos, compartilhamento de informações e segurança, precisamos salvar os dados em um servidor remoto por meio de uma **API RESTful**.

Antes de consumirmos dados no React Native/Expo, precisamos entender como **subir e configurar nossa própria infraestrutura de backend** de forma rápida, profissional e de baixo custo.

Nesta aula, faremos um passo a passo prático para configurar:
1. Uma **VPS** na DigitalOcean com a ferramenta **CapRover**.
2. Um domínio com suporte a subdomínios (**Wildcard DNS**).
3. O certificado de segurança (**HTTPS/SSL**).
4. O banco de dados e gerenciador de API **PocketBase**.

---

## O que é o CapRover?

O [CapRover](https://caprover.com/) é uma plataforma open-source como serviço (PaaS) extremamente leve. Ele funciona como o seu próprio "Heroku" ou "Render" pessoal, permitindo que você publique bancos de dados, aplicações web e APIs com poucos cliques usando Docker, mas sem a necessidade de gerenciar contêineres manualmente via terminal.

---

## Passo 1: Criando a VPS na DigitalOcean

Uma VPS (Virtual Private Server) é um servidor virtual na nuvem onde sua API ficará rodando 24/7.

1. Acesse o painel da [DigitalOcean](https://www.digitalocean.com/) (ou qualquer outro provedor de nuvem de sua preferência).
2. Clique em **Create** ➔ **Droplets**.
3. Na seção de escolha de imagem, clique na aba **Marketplace**.
4. Busque por **CapRover** e selecione a imagem oficial pré-configurada.
5. Para o exercício desta aula, o plano mais básico e barato é o suficiente.
6. Selecione a região do data center (Nova York ou Miami costumam ter menor latência para o Brasil).
7. Configure a autenticação via chave SSH (recomendado) ou crie uma senha segura.
   - **Dica**: você pode gerar a chave no seu PC usando o comando: `ssh-keygen -t rsa -m PEM` 
8. Clique em **Create Droplet** e aguarde alguns segundos até que o servidor seja inicializado. Copie o **IP público** gerado para o seu Droplet.

:::info Documentação Oficial
Para mais detalhes sobre o setup do CapRover, você pode consultar o guia inicial na [documentação oficial do CapRover](https://caprover.com/docs/get-started.html).
:::

---

## Passo 2: Configurando o Domínio (Wildcard DNS)

O CapRover utiliza subdomínios para direcionar o tráfego para cada uma das suas aplicações (ex: `captain.seu-dominio.com` para o painel de controle e `api.seu-dominio.com` para a sua API). Por isso, precisamos de um domínio configurado com **Wildcard DNS** (tudo que vier antes do domínio aponta para a VPS).

### Onde registrar o domínio?
Você pode registrar seu domínio em qualquer empresa registradora de domínio (*registrar*). 
* **Global**: Cloudflare, Namecheap, GoDaddy.
* **Brasil**: O [Registro.br](https://registro.br/) é a opção oficial e altamente recomendada para domínios nacionais (`.com.br`), devido ao preço fixo, segurança e estabilidade.

### Configurando o DNS no Cloudflare (Exemplo)
Seja qual for a registradora do seu domínio, é uma boa ideia apontar os servidores de nomes (Name Servers) para a **Cloudflare** para gerenciar a tabela de DNS gratuitamente.

Na sua tabela de DNS na Cloudflare, adicione dois registros do tipo **A**:

| Tipo | Nome | Conteúdo / Destino | Proxy status |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `IP_DA_SUA_VPS` | DNS Only (Desativado) |
| **A** | `*` | `IP_DA_SUA_VPS` | DNS Only (Desativado) |

* O registro `@` aponta o domínio principal (`seu-dominio.com`) para o seu servidor.
* O registro wildcard `*` aponta **qualquer subdomínio** (`*.seu-dominio.com`) para o seu servidor.

:::warning Desative o Proxy da Cloudflare Temporariamente
Durante a configuração inicial e a geração de certificados SSL no CapRover, o status do proxy da Cloudflare (nuvem laranja) **deve estar desativado** (configurado como *DNS Only*). Se o proxy estiver ativo, o Let's Encrypt não conseguirá validar a propriedade do domínio para emitir o certificado HTTPS.
:::

---

## Passo 3: Configurando o CapRover

Com o domínio apontando para o IP da sua VPS, agora podemos fazer a configuração inicial do CapRover.

1. Abra o navegador e acesse `http://[IP-DA-SUA-VPS]:3000`.
   - **Dica**: A senha padrão do Caprover é `captain42`
2. A tela inicial de configuração do CapRover será exibida.
3. No campo **Root Domain**, digite o seu domínio configurado (ex: `seu-dominio.com`).
4. Clique em **Update Domain**. O CapRover fará um teste para verificar se o subdomínio `captain.seu-dominio.com` resolve para o IP do servidor.
5. Em seguida, digite uma **senha mestre** forte para o seu painel de controle e clique em **Change Password**.
6. Agora, o painel do CapRover estará acessível de forma definitiva no endereço: `http://captain.seu-dominio.com` (use a senha criada para entrar).

---

## Passo 4: Ativando HTTPS no Captain Dashboard

A segurança é fundamental no desenvolvimento de APIs modernas. Sem HTTPS, os navegadores e dispositivos móveis bloquearão ou exibirão alertas de segurança ao tentar consumir sua API.

1. Faça login no painel do CapRover (`http://captain.seu-dominio.com`).
2. Logo na aba principal de configurações, localize a seção do **Captain Dashboard**.
3. Clique no botão **Enable HTTPS**.
4. Insira um e-mail válido (exigido pelo Let's Encrypt para alertas de renovação).
5. O CapRover irá gerar e configurar o certificado SSL automaticamente.
6. A página será recarregada e você será redirecionado para a versão segura: `https://captain.seu-dominio.com`.

---

## Passo 5: Criando e Configurando o PocketBase

O [PocketBase](https://pocketbase.io/) é um backend open-source desenvolvido em Go (lang), ideal para desenvolvimento mobile. Ele reúne um banco de dados embarcado (SQLite), autenticação completa, armazenamento de arquivos e uma API REST pronta para uso.

Vamos criar a aplicação dentro do CapRover:

1. No menu lateral do painel do CapRover, clique em **Apps**.
2. Clique no botão **One-Click Apps/Templates** (localizado no fim da página).
3. Busque por `pocketbase` na barra de pesquisa.
4. Selecione o template do **PocketBase**.
5. Diga o nome do app (ex: `meu-pocketbase`). Esse nome definirá o subdomínio de acesso (ex: `meu-pocketbase.seu-dominio.com`).
6. Clique em **Deploy** e aguarde cerca de 1 a 2 minutos para o CapRover baixar a imagem oficial e inicializar o banco de dados.

### Habilitando HTTPS no PocketBase
1. Assim que o deploy for concluído, vá na lista de aplicações no CapRover e clique sobre o app `meu-pocketbase`.
2. Na aba de configurações do app, marque a caixa **Enable HTTPS**.
3. O CapRover emitirá o certificado SSL para o endereço `https://meu-pocketbase.seu-dominio.com`.

---

## Passo 6: Configurando Coleções Públicas no PocketBase

Agora que nossa infraestrutura está segura e no ar, vamos configurar o banco de dados para expor recursos via REST.

1. Acesse o painel de administração do PocketBase pelo endereço: `https://meu-pocketbase.seu-dominio.com/_/`.
2. **Crie a conta de administrador** inicial inserindo um e-mail e uma senha forte.
3. Faça login no painel com a conta criada.
4. No menu lateral esquerdo, clique no botão **New collection** (ícone de `+` ou lista).
5. Defina o nome da coleção como `produtos` e adicione alguns campos simples de teste:
   * `nome` (tipo *Plain text*)
   * `preco` (tipo *Number*)
   * `descricao` (tipo *Plain text*)
6. Clique em **Create** no topo direito para salvar a coleção.
7. Adicione um ou dois registros de teste clicando em **New record** e preenchendo os dados do produto.

### Configurando as Regras de Acesso (API Rules)
Por padrão, todas as coleções criadas no PocketBase são **privadas** e exigem autenticação via token. Para que nosso app React Native possa ler esses dados de forma direta sem exigir login prévio (acesso público REST), precisamos abrir as regras de visualização:

1. Selecione a coleção `produtos` criada.
2. Clique no botão **Settings** (ícone de engrenagem) ou clique no botão **API Rules** (logo abaixo do nome da coleção).
3. Você verá as regras divididas por operações (`List/Search`, `View`, `Create`, `Update`, `Delete`).
4. Clique no cadeado da regra **List/Search** e da regra **View** e limpe qualquer condição existente (ou selecione a opção que deixa o campo em branco, permitindo acesso público irrestrito).
5. Clique em **Save changes**.

:::tip Testando o endpoint REST
Agora você pode acessar os dados diretamente via navegador ou cliente HTTP (como Bruno, Postman ou Insomnia). O endpoint de listagem pública do PocketBase segue o padrão:
`https://meu-pocketbase.seu-dominio.com/api/collections/produtos/records`

Acesse esse endereço no seu navegador e você deverá ver um JSON contendo a lista dos produtos que cadastrou!
:::

---

## Para Saber Mais

Quer conhecer mais sobre o CapRover? Tenho um conteúdo que vai te interessar: https://youtu.be/O-8JTIzMuWI?si=i_646vU7hUSXeOLl

:::info Próxima Aula: Acesso a API REST
Agora que temos uma API funcional, segura e pública no ar, na próxima aula aprenderemos como utilizar o **React Native/Expo** para consumir esses endpoints, listando dados dinâmicos na tela do nosso app!
:::
