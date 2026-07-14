import { pool } from "../database/connection";
import { Autor } from "../models/Autor";
import { IAutorRepository } from "./IAutorRepository";

export class AutorRepository implements IAutorRepository {
  async create(autor: Autor): Promise<Autor> {
    const result = await pool.query(
      "INSERT INTO autores (nome, nacionalidade, data_nascimento) VALUES ($1, $2, $3) RETURNING *",
      [autor.nome, autor.nacionalidade, autor.data_nascimento],
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<Autor | null> {
    const result = await pool.query("SELECT * FROM autores WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async findAll(): Promise<Autor[]> {
    const result = await pool.query("SELECT * FROM autores");
    return result.rows;
  }

  async update(id: number, autor: Autor): Promise<Autor | null> {
    const result = await pool.query(
      "UPDATE autores SET nome = $1, nacionalidade = $2, data_nascimento = $3 WHERE id = $4 RETURNING *",
      [autor.nome, autor.nacionalidade, autor.data_nascimento, id],
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM autores WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
