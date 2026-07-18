import { pool } from "../database/connection";
import { Livro } from "../models/Livro";
import { ILivroRepository } from "./ILivroRepository";

export class LivroRepository implements ILivroRepository {
  async create(livro: Livro): Promise<Livro> {
    const result = await pool.query(
      "INSERT INTO livros (titulo, ano_publicacao, genero, quantidade_estoque, autor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        livro.titulo,
        livro.ano_publicacao,
        livro.genero,
        livro.quantidade_estoque,
        livro.autor_id,
      ],
    );
    return result.rows[0];
  }

  async findAll(): Promise<Livro[]> {
    const result = await pool.query("SELECT * FROM livros");
    return result.rows;
  }

  async findById(id: number): Promise<Livro | null> {
    const result = await pool.query("SELECT * FROM livros WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async update(id: number, livro: Livro): Promise<Livro | null> {
    const result = await pool.query(
      "UPDATE livros SET titulo = $1, ano_publicacao = $2, genero = $3, quantidade_estoque = $4, autor_id = $5 WHERE id = $6 RETURNING *",
      [
        livro.titulo,
        livro.ano_publicacao,
        livro.genero,
        livro.quantidade_estoque,
        livro.autor_id,
        id,
      ],
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM livros WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
