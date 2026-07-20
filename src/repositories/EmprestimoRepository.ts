import { pool } from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";
import { IEmprestimoRepository } from "./IEmprestimoRepository";

export class EmprestimoRepository implements IEmprestimoRepository {
  async create(emprestimo: Emprestimo): Promise<Emprestimo> {
    const result = await pool.query<Emprestimo>(
      `INSERT INTO emprestimos (
        livro_id,
        cliente_id,
        data_emprestimo,
        data_devolucao
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        emprestimo.livro_id,
        emprestimo.cliente_id,
        emprestimo.data_emprestimo,
        emprestimo.data_devolucao ?? null,
      ],
    );

    const novoEmprestimo = result.rows[0];

    if (!novoEmprestimo) {
      throw new Error("Erro ao cadastrar empréstimo.");
    }

    return novoEmprestimo;
  }

  async findById(id: number): Promise<Emprestimo | null> {
    const result = await pool.query<Emprestimo>(
      "SELECT * FROM emprestimos WHERE id = $1",
      [id],
    );

    return result.rows[0] ?? null;
  }

  async findAll(): Promise<Emprestimo[]> {
    const result = await pool.query<Emprestimo>(
      "SELECT * FROM emprestimos ORDER BY id ASC",
    );

    return result.rows;
  }

  async update(id: number, emprestimo: Emprestimo): Promise<Emprestimo | null> {
    const result = await pool.query<Emprestimo>(
      `UPDATE emprestimos
       SET livro_id = $1,
           cliente_id = $2,
           data_emprestimo = $3,
           data_devolucao = $4
       WHERE id = $5
       RETURNING *`,
      [
        emprestimo.livro_id,
        emprestimo.cliente_id,
        emprestimo.data_emprestimo,
        emprestimo.data_devolucao ?? null,
        id,
      ],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM emprestimos WHERE id = $1", [
      id,
    ]);

    return (result.rowCount ?? 0) > 0;
  }
}
