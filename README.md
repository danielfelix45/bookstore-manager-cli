# 📚 BookStore Manager CLI

Aplicação de gerenciamento de livraria executada via terminal, desenvolvida com **Node.js, TypeScript e PostgreSQL** como projeto final do Módulo 1 da formação **Desenvolvimento de Software Back-end com Node.js — SCTEC/SENAI**.

O projeto utiliza **SQL puro**, sem ORM, e uma arquitetura em camadas para separar regras de negócio, acesso a dados e interação com o usuário.

## 🛠️ Tecnologias

- Node.js
- TypeScript
- PostgreSQL
- `pg`
- `dotenv`
- SQL
- Git e GitHub

## 🏗️ Arquitetura

```text
Menu → Controller → Service → Repository → PostgreSQL
```

A aplicação está organizada em `menus`, `controllers`, `services`, `repositories`, `models` e `database`.

## ✅ Funcionalidades

- CRUD de autores, livros e clientes;
- gerenciamento de empréstimos e devoluções;
- controle de estoque dos livros;
- validação de e-mails duplicados;
- validações de disponibilidade para empréstimos;
- relatórios de livros disponíveis e emprestados;
- relatórios por autor e por cliente;
- consultas relacionais com `JOIN`, `GROUP BY`, `ORDER BY` e `COUNT()`.

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/danielfelix45/bookstore-manager-cli.git
cd bookstore-manager-cli
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz usando `.env.example` como referência.

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore_manager_db
```

### 4. Configure o banco

Crie o banco PostgreSQL:

```sql
CREATE DATABASE bookstore_manager_db;
```

Depois execute o script:

```text
src/database/schema.sql
```

### 5. Execute a aplicação

```bash
npm run dev
```

Para compilar e executar a versão JavaScript:

```bash
npm run build
npm start
```

## 📁 Estrutura principal

```text
src/
├── controllers/
├── database/
│   ├── connection.ts
│   └── schema.sql
├── menus/
├── models/
├── repositories/
├── services/
└── main.ts
```

## 🧠 Regras de negócio

Entre as principais validações implementadas estão:

- autor deve existir antes do cadastro de um livro;
- estoque não pode ser negativo;
- cliente e livro devem existir para realizar um empréstimo;
- livro precisa possuir estoque disponível;
- e-mail do cliente não pode estar duplicado;
- empréstimos já devolvidos não podem ser devolvidos novamente;
- estoque é atualizado automaticamente no empréstimo e na devolução.

## 📌 Sobre o projeto

O BookStore Manager CLI foi desenvolvido individualmente como projeto avaliativo da formação **Desenvolvimento de Software Back-end com Node.js — SCTEC/SENAI**, aplicando TypeScript, PostgreSQL, SQL relacional, programação orientada a objetos e organização em camadas.

## 👤 Autor

**Daniel Antônio Félix Filho**

GitHub: https://github.com/danielfelix45
