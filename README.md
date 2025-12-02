Jitterbit – Order API (Node.js + Express + MongoDB)

Este projeto foi desenvolvido como parte do teste técnico para a vaga de Analista de Sistemas Jr.
A API realiza operações completas de CRUD para gerenciamento de pedidos, incluindo criação, leitura, atualização e exclusão.

⸻

🚀 Tecnologias utilizadas
	•	Node.js
	•	Express
	•	MongoDB + Mongoose
	•	dotenv
	•	Helmet & CORS (segurança)
	•	Body-parser

⸻

📌 Funcionalidades

A API permite:

✔ Criar um pedido

POST /order

✔ Buscar um pedido específico

GET /order/:orderId

✔ Listar todos os pedidos

GET /order/list

✔ Atualizar um pedido

PUT /order/:orderId

✔ Deletar um pedido

DELETE /order/:orderId

⸻

🗄 Estrutura do JSON recebido (input)

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}


⸻

🔄 Mapeamento para o formato interno (salvo no banco)

{
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}

•	numeroPedido → orderId
	•	valorTotal → value
	•	dataCriacao → creationDate
	•	items[].idItem → productId
	•	items[].quantidadeItem → quantity
	•	items[].valorItem → price

⸻

🧱 Modelos (MongoDB)

Order
	•	orderId (string)
	•	value (number)
	•	creationDate (date)
	•	items (array)

Items
	•	productId (number)
	•	quantity (number)
	•	price (number)

⸻

⚙️ Como rodar o projeto localmente

1️⃣ Instale as dependências

npm install

2️⃣ Configure o arquivo .env

Crie um arquivo .env na raiz:

MONGODB_URI=mongodb://localhost:27017/jitterbit_orders
PORT=3000

Ou use o arquivo .env.example como base.

3️⃣ Inicie o servidor

npm start


⸻

📮 Exemplo de criação de pedido (cURL)

curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'


⸻

🛠️ Boas práticas aplicadas no projeto
	•	Código organizado em controllers, routes e models
	•	Tratamento de erros e mensagens claras
	•	Retornos HTTP apropriados (201, 200, 404, 409, etc.)
	•	Campos validados antes de salvar
	•	Servidor protegido com Helmet e CORS
	•	README completo com instruções
	•	Estrutura preparada para deploy futuro

⸻

🔐 Recursos opcionais (não obrigatórios)

Não implementados, mas previstos:
	•	Autenticação JWT
	•	Documentação Swagger / Postman Collections
