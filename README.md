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


## Testes da API

Com o MySQL e a API em execução:

```bash
docker compose up -d
npm install
npm run db:init
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

### 1. Testar a rota inicial

```bash
curl http://localhost:3000/
```

Resposta esperada:

```text
Home
```

### 2. Listar veículos

```bash
curl http://localhost:3000/veiculo
```

Resposta esperada:

```json
{
  "success": true,
  "data": []
}
```

### 3. Criar um veículo

```bash
curl -X POST http://localhost:3000/veiculo \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC1D23",
    "modelo": "Toyota Corolla",
    "proprietario": "João da Silva"
  }'
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Veículo criado com sucesso",
  "data": {
    "id": 1,
    "placa": "ABC1D23",
    "modelo": "Toyota Corolla",
    "proprietario": "João da Silva"
  }
}
```

### 4. Buscar veículo pelo ID

```bash
curl http://localhost:3000/veiculo/1
```

Resposta esperada:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "placa": "ABC1D23",
    "modelo": "Toyota Corolla",
    "proprietario": "João da Silva"
  }
}
```

### 5. Atualizar um veículo

```bash
curl -X PUT http://localhost:3000/veiculo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC1D23",
    "modelo": "Toyota Corolla XEi",
    "proprietario": "João da Silva"
  }'
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Veículo atualizado com sucesso",
  "data": {
    "id": 1,
    "placa": "ABC1D23",
    "modelo": "Toyota Corolla XEi",
    "proprietario": "João da Silva"
  }
}
```

### 6. Listar novamente os veículos

```bash
curl http://localhost:3000/veiculo
```

Agora o veículo atualizado deverá aparecer na lista.

### 7. Excluir um veículo

```bash
curl -X DELETE http://localhost:3000/veiculo/1
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Veículo excluído com sucesso"
}
```

### 8. Confirmar exclusão

```bash
curl http://localhost:3000/veiculo/1
```

Resposta esperada:

```json
{
  "success": false,
  "error": "Veículo não encontrado"
}
```

### 9. Testar erro de veículo inexistente

```bash
curl http://localhost:3000/veiculo/999
```

Deve retornar HTTP `404`.

### 10. Testar validação de campos

```bash
curl -X POST http://localhost:3000/veiculo \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "XYZ9A99"
  }'
```

Resposta esperada:

```json
{
  "success": false,
  "error": "Placa, modelo e proprietário são obrigatórios"
}
```

Esse teste deve retornar HTTP `400`.

### 11. Testar placa duplicada

Primeiro crie um veículo:

```bash
curl -X POST http://localhost:3000/veiculo \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "XYZ9A99",
    "modelo": "Honda Civic",
    "proprietario": "Maria Oliveira"
  }'
```

Depois tente cadastrar outro veículo com a mesma placa:

```bash
curl -X POST http://localhost:3000/veiculo \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "XYZ9A99",
    "modelo": "Volkswagen Gol",
    "proprietario": "Carlos Santos"
  }'
```

Resposta esperada:

```json
{
  "success": false,
  "error": "Já existe um veículo com essa placa"
}
```

Esse teste deve retornar HTTP `409`.