# 📚 BookStore Manager CLI

Aplicação de gerenciamento de livraria executada via terminal, desenvolvida como projeto final avaliativo do Módulo 1 da formação **Desenvolvedor Back-End Node.js**, do programa SCTEC/SENAI.

O sistema permite gerenciar autores, livros, clientes e empréstimos, utilizando PostgreSQL para persistência dos dados e uma arquitetura organizada em camadas.

---

## 🎯 Objetivo

O objetivo do projeto é aplicar, de forma integrada, os principais conhecimentos desenvolvidos durante o módulo:

- Node.js;
- TypeScript;
- PostgreSQL;
- programação orientada a objetos;
- interfaces e tipagem estática;
- programação assíncrona;
- arquitetura em camadas;
- consultas SQL relacionais;
- tratamento de erros;
- Git e GitFlow.

---

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Biblioteca `pg`
- `dotenv`
- `readline/promises`
- SQL puro
- Git
- GitHub

O projeto foi desenvolvido sem a utilização de ORM.

---

## 📋 Requisitos para execução

Antes de executar o projeto, é necessário possuir:

- Node.js instalado;
- npm instalado;
- PostgreSQL instalado e em execução;
- Git instalado;
- um banco de dados PostgreSQL criado para a aplicação.

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/danielfelix45/bookstore-manager-cli.git
```

Acesse a pasta do projeto:

```bash
cd bookstore-manager-cli
```

Instale as dependências:

```bash
npm install
```

---

## ⚙️ Configuração das variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado:

```text
.env
```

Use o arquivo `.env.example` como referência.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore_manager
```

> O arquivo `.env` não deve ser enviado ao GitHub, pois contém informações sensíveis de conexão.

---

## 🗄️ Configuração do banco de dados

Crie um banco de dados no PostgreSQL:

```sql
CREATE DATABASE bookstore_manager_db;
```

Depois, execute o script SQL disponível no projeto para criar as tabelas e os relacionamentos.

Exemplo de localização:

```text
src/database/schema.sql
```

O banco possui as seguintes entidades:

- autores;
- livros;
- clientes;
- empréstimos.

### Relacionamentos

- Um autor pode possuir vários livros;
- cada livro pertence a um autor;
- um cliente pode realizar vários empréstimos;
- cada empréstimo está relacionado a um livro e a um cliente.

---

## ▶️ Execução

Para executar em ambiente de desenvolvimento:

```bash
npm run dev
```

Para compilar o projeto:

```bash
npm run build
```

Após a compilação, execute a versão JavaScript:

```bash
npm start
```

A aplicação será iniciada diretamente no terminal.

Menu principal:

```text
==================================
      BOOKSTORE MANAGER CLI
==================================
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Encerrar aplicação
==================================
```

---

## 🏗️ Arquitetura

A aplicação utiliza arquitetura em camadas:

```text
Menu
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

### Responsabilidades

#### Menus

Responsáveis pela interação com o usuário, exibição das opções e leitura dos dados pelo terminal.

#### Controllers

Recebem os dados dos menus e encaminham as solicitações para os Services.

#### Services

Contêm as regras de negócio, validações e coordenação das operações.

#### Repositories

Responsáveis pela comunicação direta com o PostgreSQL e execução das consultas SQL.

#### Models

Representam as entidades e estruturas de dados utilizando interfaces TypeScript.

#### Database

Centraliza a conexão com o PostgreSQL e o script de criação do banco.

---

## 📁 Estrutura de pastas

```text
src/
├── controllers/
│   ├── AutorController.ts
│   ├── ClienteController.ts
│   ├── EmprestimoController.ts
│   ├── LivroController.ts
│   └── RelatorioController.ts
│
├── database/
│   ├── connection.ts
│   └── schema.sql
│
├── menus/
│   ├── AutorMenu.ts
│   ├── ClienteMenu.ts
│   ├── EmprestimoMenu.ts
│   ├── LivroMenu.ts
│   ├── MenuPrincipal.ts
│   └── RelatorioMenu.ts
│
├── models/
│   ├── Autor.ts
│   ├── Cliente.ts
│   ├── Emprestimo.ts
│   └── Livro.ts
│
├── repositories/
│   ├── AutorRepository.ts
│   ├── ClienteRepository.ts
│   ├── EmprestimoRepository.ts
│   ├── IAutorRepository.ts
│   ├── IClienteRepository.ts
│   ├── IEmprestimoRepository.ts
│   ├── ILivroRepository.ts
│   ├── IRelatorioRepository.ts
│   ├── LivroRepository.ts
│   └── RelatorioRepository.ts
│
├── services/
│   ├── AutorService.ts
│   ├── ClienteService.ts
│   ├── EmprestimoService.ts
│   ├── LivroService.ts
│   └── RelatorioService.ts
│
├── utils/
│
└── main.ts
```

### Utils

Pasta reservada para funções auxiliares reutilizáveis. Nesta versão, as validações específicas permanecem nas respectivas camadas de serviço.

> A estrutura pode variar levemente conforme a organização final do repositório.

---

## ✅ Funcionalidades

### Autores

- Cadastrar autor;
- listar autores;
- buscar autor por ID;
- atualizar autor;
- excluir autor.

### Livros

- Cadastrar livro;
- listar livros;
- buscar livro por ID;
- atualizar livro;
- excluir livro;
- vincular livro a um autor;
- controlar quantidade disponível em estoque.

### Clientes

- Cadastrar cliente;
- listar clientes;
- buscar cliente por ID;
- atualizar cliente;
- excluir cliente;
- impedir cadastro de e-mails duplicados.

### Empréstimos

- Registrar empréstimo;
- listar empréstimos;
- buscar empréstimo;
- registrar devolução;
- reduzir estoque ao emprestar;
- aumentar estoque ao devolver;
- impedir empréstimos de livros indisponíveis;
- impedir devoluções duplicadas.

### Relatórios

- Livros disponíveis;
- livros emprestados;
- livros cadastrados por autor;
- quantidade de empréstimos por livro;
- clientes com empréstimos ativos.

---

## 🔍 Consultas SQL utilizadas

O projeto utiliza SQL diretamente por meio da biblioteca `pg`.

Entre os recursos utilizados estão:

- `INSERT`;
- `SELECT`;
- `UPDATE`;
- `DELETE`;
- `INNER JOIN`;
- `LEFT JOIN`;
- `WHERE`;
- `GROUP BY`;
- `ORDER BY`;
- função de agregação `COUNT()`.

---

## 🧠 Regras de negócio

A aplicação implementa validações como:

- autor precisa existir para cadastrar um livro;
- título do livro é obrigatório;
- estoque não pode ser negativo;
- cliente precisa existir para realizar empréstimo;
- livro precisa existir para realizar empréstimo;
- livro precisa possuir estoque disponível;
- e-mail de cliente não pode estar duplicado;
- empréstimo precisa existir para registrar devolução;
- um empréstimo já devolvido não pode ser devolvido novamente.

Os erros são tratados sem interromper a execução da aplicação.

---

## 💻 Exemplo de utilização

### Cadastro de livro

```text
Digite o título do livro: 1984
Digite o ano de publicação: 1949
Digite o gênero: Ficção distópica
Digite a quantidade em estoque: 2
Digite o ID do autor: 1
```

### Realização de empréstimo

```text
Digite o ID do livro: 1
Digite o ID do cliente: 1

Empréstimo realizado com sucesso.
```

### Tentativa de empréstimo sem estoque

```text
Erro ao realizar empréstimo:
Livro indisponível para empréstimo.
```

---

## 🌿 Versionamento e GitFlow

O desenvolvimento utilizou Git e GitHub com branches separadas por funcionalidade.

Branches utilizadas:

```text
main
develop
feat/database-connection
feat/database-schema
feat/authors
feat/books
feat/customers
feat/loans
feat/reports
docs/readme
```

Fluxo adotado:

```text
feature branch
      ↓
develop
      ↓
main
```

Os commits foram realizados de maneira incremental, representando a evolução do projeto.

---

## 🔮 Melhorias futuras

Possíveis melhorias para versões futuras:

- autenticação de usuários;
- controle de perfis e permissões;
- data prevista para devolução;
- aplicação de multa por atraso;
- histórico detalhado por cliente;
- paginação de registros;
- testes automatizados;
- API REST;
- interface web;
- uso de transações no PostgreSQL;
- criação de logs da aplicação.

---

## 👤 Autor

**Daniel Antônio Félix Filho**

Projeto desenvolvido individualmente como parte da formação **Desenvolvedor Back-End Node.js — SCTEC/SENAI**.

GitHub:

```text
https://github.com/danielfelix45
```

---

## 📌 Kanban

O acompanhamento das tarefas do projeto foi realizado por meio do Kanban:

```text
https://trello.com/b/gHJ1YY4l/%F0%9F%93%9A-bookstore-manager-cli
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
