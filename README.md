# Oficina Mecânica

API para gerenciamento de veículos de uma oficina mecânica, utilizando **Node.js, Express, MySQL e Docker**.

## Requisitos

* Node.js
* npm
* Docker
* Docker Compose

## Banco de dados

O projeto utiliza um banco MySQL chamado `oficina`.

A tabela `veiculos` possui os seguintes campos:

| Campo          | Tipo         | Descrição               |
| -------------- | ------------ | ----------------------- |
| `id`           | INT          | Identificador único     |
| `placa`        | VARCHAR(10)  | Placa do veículo        |
| `modelo`       | VARCHAR(100) | Modelo do veículo       |
| `proprietario` | VARCHAR(150) | Proprietário do veículo |

A criação da tabela é feita automaticamente pelo script `db:init`.

## Instalação e execução

Clone o projeto e entre na pasta:

```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
```

Depois, execute os comandos na ordem:

### 1. Subir o MySQL

```bash
docker compose up -d
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Criar as tabelas

```bash
npm run db:init
```

Esse comando executa o script de inicialização do banco e cria a tabela `veiculos`, caso ela ainda não exista.

### 4. Iniciar a API

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

## Execução rápida

Depois de clonar o projeto, o fluxo principal é:

```bash
docker compose up -d
npm install
npm run db:init
npm run dev
```


## Scripts disponíveis

Os principais scripts do projeto são:

```bash
npm run db:init
```

Cria as tabelas necessárias no banco de dados.

```bash
npm run dev
```

Inicia o servidor Express em modo de desenvolvimento.

## Parar o banco

Para parar o container MySQL:

```bash
docker compose down
```

Os dados permanecem armazenados no volume `mysql_data`.

Para iniciar novamente:

```bash
docker compose up -d
```

## Recriar o banco do zero

**Atenção:** isso remove todos os dados armazenados no volume do MySQL.

```bash
docker compose down -v
docker compose up -d
npm run db:init
```

Depois disso, basta iniciar a API:

```bash
npm run dev
```
