# 📊 Bank Report API

API RESTful desenvolvida em **Node.js** para gerenciamento e controle de movimentações bancárias do aplicativo **Poupe-me**.  
A estrutura do banco de dados segue o padrão **SQL ANSI**, garantindo compatibilidade e otimização no processo de migração.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [Knex.js](https://knexjs.org/)  
- [SQL ANSI](https://en.wikipedia.org/wiki/SQL)  

---

## 📂 Estrutura do Projeto

├── src/ # Código-fonte principal da API

├── knexfile.js # Configurações do banco de dados

├── package.json # Dependências e scripts

├── package-lock.json

└── README.md

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/vinicius-muller/bank-report-api.git
cd bank-report-api
npm install
npx knex migrate:latest
npm run dev

http://localhost:3000
