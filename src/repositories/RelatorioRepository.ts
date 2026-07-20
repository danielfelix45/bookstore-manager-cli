import { pool } from "../database/connection";
import {
  IRelatorioRepository,
  LivroDisponivelRelatorio,
  LivroEmprestadoRelatorio,
  LivrosPorAutorRelatorio,
  EmprestimosPorLivroRelatorio,
  ClienteComEmprestimoAtivoRelatorio,
} from "./IRelatorioRepository";

export class RelatorioRepository implements IRelatorioRepository {
  async findLivrosDisponiveis(): Promise<LivroDisponivelRelatorio[]> {
    const resultado = await pool.query(
      `
        SELECT
            l.id,
            l.titulo,
            a.nome AS autor,
            l.quantidade_estoque
        FROM livros l
        INNER JOIN autores a
            ON l.autor_id = a.id
        WHERE l.quantidade_estoque > 0
        ORDER BY l.titulo;
        `,
    );

    return resultado.rows;
  }

  async findLivrosEmprestados(): Promise<LivroEmprestadoRelatorio[]> {
    const resultado = await pool.query(
      `
        SELECT
            e.id AS emprestimo_id,
            l.titulo AS livro,
            c.nome AS cliente,
            e.data_emprestimo
        FROM emprestimos e
        INNER JOIN livros l
            ON e.livro_id = l.id
        INNER JOIN clientes c
            ON e.cliente_id = c.id
        WHERE e.data_devolucao IS NULL
        ORDER BY e.data_emprestimo;
        `,
    );

    return resultado.rows;
  }

  async findLivrosPorAutor(): Promise<LivrosPorAutorRelatorio[]> {
    const resultado = await pool.query(
      `
        SELECT
            a.id AS autor_id,
            a.nome AS autor,
            COUNT(l.id) AS quantidade_livros
        FROM autores a
        LEFT JOIN livros l
            ON l.autor_id = a.id
        GROUP BY
            a.id,
            a.nome
        ORDER BY
            a.nome;
        `,
    );

    return resultado.rows;
  }

  async findQuantidadeEmprestimosPorLivro(): Promise<
    EmprestimosPorLivroRelatorio[]
  > {
    const resultado = await pool.query(
      `
        SELECT
            l.id AS livro_id,
            l.titulo AS livro,
            COUNT(e.id) AS quantidade_emprestimos
        FROM livros l
        LEFT JOIN emprestimos e
            ON e.livro_id = l.id
        GROUP BY
            l.id,
            l.titulo
        ORDER BY
            quantidade_emprestimos DESC;
        `,
    );

    return resultado.rows;
  }

  async findClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimoAtivoRelatorio[]
  > {
    const resultado = await pool.query(
      `
        SELECT
            c.id AS cliente_id,
            c.nome AS cliente,
            c.email,
            COUNT(e.id) AS quantidade_emprestimos_ativos
        FROM clientes c
        INNER JOIN emprestimos e
            ON e.cliente_id = c.id
        WHERE e.data_devolucao IS NULL
        GROUP BY
            c.id,
            c.nome,
            c.email
        ORDER BY
            c.nome;
        `,
    );

    return resultado.rows;
  }
}
