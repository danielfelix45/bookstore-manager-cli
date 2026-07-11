-- ===========================================
-- BookStore Manager CLI
-- Database Schema
-- PostgreSQL
-- ===========================================

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(100),
    data_nascimento DATE 
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20)
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    ano_publicacao INT,
    genero VARCHAR(100),
    quantidade_estoque INT NOT NULL,
    autor_id INT NOT NULL,

    -- CONSTRAINTS

    CONSTRAINT fk_autor 
        FOREIGN KEY (autor_id) 
        REFERENCES autores(id),

    CONSTRAINT chk_quantidade_estoque
        CHECK (quantidade_estoque >= 0)
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INT NOT NULL, 
    cliente_id INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,

    -- CONSTRAINTS

    CONSTRAINT fk_cliente 
        FOREIGN KEY (cliente_id) 
        REFERENCES clientes(id),

    CONSTRAINT fk_livro 
        FOREIGN KEY (livro_id) 
        REFERENCES livros(id)
);