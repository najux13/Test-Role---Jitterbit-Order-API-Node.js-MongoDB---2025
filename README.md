# Jitterbit - Order API (Node.js + Express + MongoDB)

API simples para criar, ler, atualizar e deletar pedidos (CRUD).

## Descrição
Recebe o JSON de pedido no formato fornecido no teste, faz o mapeamento para o formato interno e salva em MongoDB.

### Endpoints
- `POST /order` - Criar novo pedido (obrigatório)
- `GET /order/:orderId` - Obter pedido por orderId (obrigatório)
- `GET /order/list` - Listar todos os pedidos (opcional)
- `PUT /order/:orderId` - Atualizar pedido por orderId (opcional)
- `DELETE /order/:orderId` - Deletar pedido por orderId (opcional)

## Como executar (local)
1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure variáveis de ambiente: crie um arquivo `.env` na pasta raiz com:
   ```
   MONGODB_URI=mongodb://localhost:27017/jitterbit_orders
   PORT=3000
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
4. Exemplos:
   ```bash
   curl --location 'http://localhost:3000/order' \
   --header 'Content-Type: application/json' \
   --data '{ "numeroPedido":"v10089015vdb-01", "valorTotal":10000, "dataCriacao":"2023-07-19T12:24:11.5299601+00:00", "items":[{"idItem":"2434","quantidadeItem":1,"valorItem":1000}] }'
   ```

## Observações técnicas
- Utiliza Mongoose para modelagem.
- Faz o mapeamento entre os campos de entrada e os campos salvos no banco:
  - `numeroPedido` -> `orderId` (string)
  - `valorTotal` -> `value` (number)
  - `dataCriacao` -> `creationDate` (Date, em ISO)
  - `items[].idItem` -> `items[].productId` (Number)
  - `items[].quantidadeItem` -> `items[].quantity` (Number)
  - `items[].valorItem` -> `items[].price` (Number)

## Critérios cobertos
- Endpoints mínimos implementados
- Tratamento de erros e respostas HTTP apropriadas
- Código organizado e comentado
- README com instruções
