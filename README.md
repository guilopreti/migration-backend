# Backend da Migração (Google Drive → Azure Blob Storage)

Este é o backend do projeto desenvolvido com Node.js e TypeScript para realizar a migração de arquivos de uma pasta do Google Drive diretamente para um container do Azure Blob Storage utilizando *Streams* (evitando salvar o arquivo em disco durante a transferência).

## 🚀 Deploy e Testes

A API está hospedada no **Render** e já está no ar através da seguinte URL base:

🔗 **[https://migration-backend-nvll.onrender.com/](https://migration-backend-nvll.onrender.com/)**

> ⚠️ **ATENÇÃO AO TEMPO DE INICIALIZAÇÃO:**  
> Como o deploy está utilizando o **plano gratuito** do Render, a plataforma desliga automaticamente o servidor após um período de inatividade. Quando uma nova requisição é feita, ele religa a máquina. Esse processo **pode demorar cerca de 50 segundos ou um pouco mais**. 
> Caso a aplicação pareça não responder ou travar no início, basta **aguardar**, pois a máquina está ligando!

## 📌 Rotas da API

- `GET /api/drive/files`: Lista os arquivos (ID, Nome e MimeType) presentes na pasta alvo do Google Drive.
- `GET /api/blob/files`: Lista os arquivos e seus tamanhos salvos no container do Azure.
- `POST /api/migrate`: Recebe um array `fileIds` no corpo da requisição e executa a transferência dos respectivos arquivos para a nuvem da Azure. Retorna um relatório individual indicando `success` ou `error` para cada um.

## 🛠️ Como rodar o projeto localmente

1. Clone o repositório e instale as dependências:
   ```bash
   yarn
   ```
2. Configure seu arquivo `.env` contendo as chaves do Google e do Azure:
   ```env
   GOOGLE_CLIENT_EMAIL=...
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_DRIVE_FOLDER_ID=...
   AZURE_STORAGE_CONNECTION_STRING=...
   AZURE_CONTAINER_NAME=...
   FRONTEND_URL=...
   ```
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   yarn dev
   ```
O servidor ficará ativo localmente rodando em `http://localhost:3000` suportando reinício automático através do `ts-node-dev`.
