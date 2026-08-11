import SnackEmbedded from '@site/src/components/Snack/SnackEmbedded';
import Link from "@docusaurus/Link";

# Persistência de Dados com Async Storage

Até agora, todos os dados que manipulamos nas nossas aplicações existem apenas **enquanto o aplicativo está aberto**. Ao fechar e reabrir o app, tudo que foi digitado ou configurado pelo usuário simplesmente desaparece. Para resolver isso, precisamos de um mecanismo de **persistência de dados**.

## O que é o Async Storage?

O **Async Storage** é a solução de armazenamento local mais primitiva e fundamental do ecossistema React Native. Funciona como um banco de dados chave-valor (semelhante ao `localStorage` do navegador), mas **assíncrono** — ou seja, todas as operações retornam uma `Promise`.

É ideal para armazenar dados simples e de baixo volume, como:
- Preferências do usuário (tema, idioma)
- Token de autenticação
- Último estado de um formulário
- Configurações do aplicativo

:::caution Limitações
O Async Storage **não é criptografado** por padrão e não deve ser usado para armazenar dados sensíveis como senhas. Para dados sensíveis, utilize soluções como o `expo-secure-store`.
:::

---

## Instalação

Para utilizar o Async Storage em um projeto Expo, instale a dependência oficial:

```bash
npx expo install @react-native-async-storage/async-storage
```

---

## API Básica

A API do Async Storage é simples: todas as operações recebem uma **chave** (string) e, nas operações de escrita, um **valor** (que deve ser uma string).

### Salvando um valor

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('nome_usuario', 'Fulano');
```

### Lendo um valor

```typescript
const nome = await AsyncStorage.getItem('nome_usuario');
// nome = 'Fulano' (ou null se a chave não existir)
```

### Removendo um valor

```typescript
await AsyncStorage.removeItem('nome_usuario');
```

:::info Apenas Strings!
O Async Storage só aceita strings. Para salvar números, booleanos ou objetos, você precisa converter manualmente. É exatamente aí que entra o nosso helper!
:::

---

## O Helper `AsyncStorageHelper`

Trabalhar diretamente com o Async Storage tem um inconveniente: **tudo é string**. Salvar um número exige `value.toString()`, salvar um objeto exige `JSON.stringify()`, e ao ler, você precisa converter de volta. Isso gera código repetitivo e propenso a erros.

Para resolver isso, podemos criar um **Helper** — um módulo utilitário que encapsula essas conversões e oferece uma API mais expressiva e tipada.

### Código do Helper

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const setString = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const getString = async (key: string, defaultValue?: string) => {
  const val = await AsyncStorage.getItem(key);
  return val || defaultValue || null;
};

const setNumber = async (key: string, value: number) => {
  await AsyncStorage.setItem(key, value.toString());
};

const getNumber = async (key: string, defaultValue?: number) => {
  const val = await AsyncStorage.getItem(key);
  if (val) {
    return parseFloat(val);
  }
  return defaultValue || null;
};

const setBoolean = async (key: string, value: boolean) => {
  await AsyncStorage.setItem(key, value.toString());
};

const getBoolean = async (key: string, defaultValue?: boolean) => {
  const val = await AsyncStorage.getItem(key);
  if (val == "true" || val == "false") return val;
  if (typeof defaultValue == "boolean") return defaultValue;
  return null;
};

const setObject = async <T>(key: string, value: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getObject = async <T>(
  key: string,
  defaultValue?: T
): Promise<T | null> => {
  const val = await AsyncStorage.getItem(key);

  if (val != null) {
    return JSON.parse(val);
  }

  if (defaultValue) {
    return defaultValue;
  }

  return null;
};

const AsyncStorageHelper = {
  setString,
  getString,
  setNumber,
  getNumber,
  getBoolean,
  setBoolean,
  setObject,
  getObject,
};

export default AsyncStorageHelper;
```

### Entendendo o Helper

O helper expõe funções especializadas por tipo de dado, eliminando a necessidade de conversões manuais no código da tela:

| Função | Descrição |
|---|---|
| `setString(key, value)` | Salva uma string diretamente. |
| `getString(key, defaultValue?)` | Lê uma string. Retorna `defaultValue` ou `null` se não existir. |
| `setNumber(key, value)` | Converte o número para string antes de salvar. |
| `getNumber(key, defaultValue?)` | Lê e converte de volta para número com `parseFloat`. |
| `setBoolean(key, value)` | Converte o booleano para `"true"` ou `"false"`. |
| `getBoolean(key, defaultValue?)` | Lê e verifica se o valor é `"true"` ou `"false"`. |
| `setObject<T>(key, value)` | Serializa qualquer objeto com `JSON.stringify`. |
| `getObject<T>(key, defaultValue?)` | Lê e desserializa o objeto com `JSON.parse`, preservando a tipagem via generics. |

:::info Parâmetro `defaultValue`
O parâmetro opcional `defaultValue` é muito útil para garantir um comportamento padrão quando a chave ainda não existe no storage (ex: primeira vez que o usuário abre o app).
:::

### Usando o Helper na Prática

```typescript
import AsyncStorageHelper from './helpers/AsyncStorageHelper';

// Salvar um objeto
await AsyncStorageHelper.setObject('usuario', { nome: 'Fulano', pontos: 120 });

// Ler o objeto de volta (tipado!)
const usuario = await AsyncStorageHelper.getObject<{ nome: string; pontos: number }>('usuario');

// Salvar e ler um número
await AsyncStorageHelper.setNumber('tentativas', 3);
const tentativas = await AsyncStorageHelper.getNumber('tentativas', 0);
```

---

## Exemplo em Execução: Async Storage Helper

No **Snack** a seguir, você pode ver um exemplo completo de como usar o `AsyncStorageHelper`.

<SnackEmbedded snackId="@andresjesse/ebook-pdm-example-11-01-a" />


---

## Async Storage com `useEffect`

Em uma tela real, você normalmente vai querer **carregar** os dados salvos assim que a tela abre, e **salvar** sempre que o estado mudar. O padrão mais comum combina `useState` e `useEffect`:

```tsx
import { useState, useEffect } from 'react';
import AsyncStorageHelper from './helpers/AsyncStorageHelper';

export default function MinhasTela() {
  const [nome, setNome] = useState('');

  // Carrega o dado salvo quando a tela monta
  useEffect(() => {
    const carregarNome = async () => {
      const nomeSalvo = await AsyncStorageHelper.getString('nome', '');
      if (nomeSalvo) setNome(nomeSalvo);
    };
    carregarNome();
  }, []);

  // Salva sempre que o nome muda
  const handleSalvar = async () => {
    await AsyncStorageHelper.setString('nome', nome);
  };

  // ...
}
```

---

## ⚡ Aprenda na Prática

Agora que você entende como o Async Storage funciona, coloque em prática!

> **Desafio do dia**: Crie um app com uma tela de login que salva o email do usuário e, ao fechar e abrir o app, o email já vem preenchido. Além disso, implemente a opção de sair do app, que limpa o email salvo.

---

:::info Próxima Aula: Acesso a API REST
Na próxima aula, veremos como fazer requisições HTTP para APIs externas, consumindo dados de serviços externos e usando servidores remotos como mecanismo de persistência de dados.
:::
