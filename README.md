![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](http://localhost:5000/api-docs/)
#  API de Caixa Eletrônico 

API REST que simula o funcionamento de um caixa eletrônico, calculando a menor quantidade de cédulas necessárias para um saque.

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🏗️ Arquitetura](#️-arquitetura)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [📥 Instalação](#-instalação)
- [▶️ Como Executar](#️-como-executar)
- [🧪 Testes](#-testes)
- [📡 Uso da API](#-uso-da-api)
- [📚 Documentação via Swagger](#-documentação-via-swagger)
- [🎯 Principais Desafios](#-principais-desafios)

## 🎯 Sobre o Projeto

Esta API foi desenvolvida como parte do desafio técnico da Morada.ai. O objetivo é receber um valor de saque e retornar a quantidade mínima de cédulas necessárias para compor esse valor.

**Cédulas disponíveis:** 100, 50, 20, 10, 5 e 2

### Algoritmo Utilizado

A solução utiliza **Programação Dinâmica** para garantir a distribuição ótima de cédulas:

1. **Cria uma tabela de programação dinâmica** onde `dp[i]` representa a quantidade mínima de cédulas necessárias para formar o valor `i`
2. **Preenche a tabela** testando todas as cédulas disponíveis para cada valor de 1 até o valor desejado
3. **Escolhe a melhor solução** comparando todas as combinações possíveis
4. **Reconstrói a solução** rastreando quais cédulas foram usadas

**Complexidade:** O(n).

#### Valores Impossíveis

Com as cédulas [100, 50, 20, 10, 5, 2], apenas **dois valores** são impossíveis:
- **1**: Menor que a menor cédula disponível
- **3**: Não pode ser formado com nenhuma combinação


## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Jest** - Framework de testes
- **Swagger/OpenAPI** - Documentação interativa da API

## 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** (layered architecture), que é mais adequada para APIs REST do que o MVC tradicional:

```
┌─────────────────────────────────────┐
│         HTTP Request                │
└────────────────┬────────────────────┘
                 │
        ┌────────▼────────┐
        │   MIDDLEWARE    │ ◄── Validação de entrada
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │   CONTROLLER    │ ◄── Lida com requisições HTTP
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │    SERVICE      │ ◄── Lógica de negócio
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │     TYPES       │ ◄── Tipos e interfaces
        └─────────────────┘
```

### Camadas:

- **Controller**: Recebe requisições HTTP e retorna respostas
- **Service**: Contém a lógica de negócio (algoritmo de distribuição)
- **Middleware**: Valida dados de entrada antes de chegar ao controller
- **Types**: Define interfaces e tipos TypeScript para type safety

## 📁 Estrutura do Projeto

```
desafio-atm/
├── src/
│   ├── App.ts                       # Configuração da aplicação Express
│   ├── Server.ts                    # Inicialização do servidor
│   ├── config/
│   │   ├── CorsConfig.ts            # Configuração CORS
│   │   └── SwaggerConfig.ts         # Configuração Swagger/OpenAPI
│   ├── controllers/
│   │   └── SaqueController.ts       # Controller para rota de saque
│   ├── middleware/
│   │   └── ValidationMiddleware.ts  # Validação de entrada
│   ├── routes/
│   │   └── Router.ts                # Definição das rotas
│   ├── services/
│   │   └── SaqueService.ts          # Lógica de cálculo de saque
│   ├── test/                        # Testes automatizados
│   │   ├── Router.test.ts           # Testes de integração das rotas
│   │   └── SaqueService.test.ts     # Testes unitários do SaqueService
│   └── types/
│       └── Types.ts                 # Definições de tipos TypeScript
├── coverage/                        # Relatório de cobertura de testes (gerado por comando de testes)
├── jest.config.js                   # Configuração do Jest
├── tsconfig.json                    # Configuração do TypeScript
├── package.json                     # Dependências e scripts do projeto
├── package-lock.json                # Lock file de dependências
└── README.md                        # Documentação do repositório
```

### Descrição das Pastas:

- **`src/`** - Código fonte principal
- **`src/config/`** - Configurações globais (CORS, Swagger, etc)
- **`src/controllers/`** - Controllers HTTP que lidam com requisições
- **`src/middleware/`** - Middlewares Express para validação e processamento
- **`src/routes/`** - Definição das rotas da API
- **`src/services/`** - Lógica de negócio (algoritmo de distribuição de cédulas)
- **`src/test/`** - Testes unitários e de integração
- **`src/types/`** - Interfaces e tipos TypeScript
- **`coverage/`** - Relatório HTML de cobertura de testes (depois de `npm run coverage`)


## 📥 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/RenatoMAP77/desafio-atm.git
cd desafio-atm
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Como Executar

```bash
npm run dev
```

A API estará disponível em `http://localhost:5000`

Também poderá visualizar pelo link do SWAGGER:
`http://localhost:5000/api-docs`


### Verificar se está funcionando

```bash
curl http://localhost:5000/api/health
```

## 🧪 Testes

### Executar todos os testes

```bash
npm test
```

ou

```bash
npm test -- --coverage
```


### Cobertura de Testes

O projeto possui **cobertura completa** de testes:
- ✅ Testes unitários do service (lógica de negócio)
- ✅ Testes de integração dos endpoints
- ✅ Testes de validação
- ✅ Testes de casos extremos


## 📡 Uso da API

### Endpoints

#### 1. Health Check

Verifica se a API está funcionando.

```bash
GET /api/health
```

**Resposta:**
```json
{
  "status": "OK",
  "message": "API de Caixa Eletrônico está funcionando",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 2. Realizar Saque

Calcula a distribuição de cédulas para um saque.

```bash
POST /api/saque
Content-Type: application/json

{
  "valor": 380
}
```

**Resposta de Sucesso (200):**
```json
{
  "100": 3,
  "50": 1,
  "20": 1,
  "10": 1,
  "5": 0,
  "2": 0
}
```

**Resposta de Erro (400):**
```json
{
  "error": "Erro ao processar saque",
  "message": "O valor deve ser um número inteiro"
}
```

### Exemplos de Uso

#### Usando cURL

```bash
# Saque de R$ 380
curl -X POST http://localhost:5000/api/saque \
  -H "Content-Type: application/json" \
  -d '{"valor": 380}'

# Saque de R$ 100
curl -X POST http://localhost:5000/api/saque \
  -H "Content-Type: application/json" \
  -d '{"valor": 100}'
```

## 📚 Documentação via Swagger

Com a API rodando, acesse:
```
http://localhost:5000/api-docs
```


## 🎯 Principais Desafios

### 1. **Valores que não podem ser representados**

**Desafio:** Nem todos os valores podem ser representados com as cédulas disponíveis (100, 50, 20, 10, 5, 2).

**Exemplo:** O valor 73 não pode ser representado:
- Melhor combinação: 50 + 20 + 2 = 72 (sobra 1)
- Valores ímpares como 1, 3, 73, etc. são impossíveis

**Solução:** 
- Algoritmo verifica se há valor restante após distribuição
- Retorna erro explicativo quando impossível representar
- Testes cobrem esses casos extremos

### 2. **Validação robusta de entrada**

**Desafio:** Garantir que apenas valores válidos sejam processados.

**Solução:**
- Middleware valida formato da requisição
- Service valida regras de negócio
- Mensagens de erro claras e específicas
- Validações em camadas (defense in depth)

### 3. **Arquitetura escalável**

**Desafio:** Criar código organizado e fácil de manter.

**Solução:**
- Separação clara de responsabilidades
- Cada camada tem um propósito único
- Fácil adicionar novas funcionalidades
- Código testável e modular

### 4. **Testes abrangentes**

**Desafio:** Garantir que a lógica funciona em todos os cenários.

**Solução:**
- Testes unitários para lógica de negócio
- Testes de integração para endpoints
- Testes de casos extremos
- Coverage de 100% nas partes críticas

### 5. **TypeScript e Type Safety**

**Desafio:** Aproveitar os benefícios do TypeScript.

**Solução:**
- Interfaces bem definidas
- Tipos para todas as entradas/saídas