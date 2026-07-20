export interface LivroDisponivelRelatorio {
  id: number;
  titulo: string;
  autor: string;
  quantidade_estoque: number;
}

export interface LivroEmprestadoRelatorio {
  emprestimo_id: number;
  livro: string;
  cliente: string;
  data_emprestimo: Date;
}

export interface LivrosPorAutorRelatorio {
  autor_id: number;
  autor: string;
  quantidade_livros: number;
}

export interface EmprestimosPorLivroRelatorio {
  livro_id: number;
  livro: string;
  quantidade_emprestimos: number;
}

export interface ClienteComEmprestimoAtivoRelatorio {
  cliente_id: number;
  cliente: string;
  email: string;
  quantidade_emprestimos_ativos: number;
}

export interface IRelatorioRepository {
  findLivrosDisponiveis(): Promise<LivroDisponivelRelatorio[]>;

  findLivrosEmprestados(): Promise<LivroEmprestadoRelatorio[]>;

  findLivrosPorAutor(): Promise<LivrosPorAutorRelatorio[]>;

  findQuantidadeEmprestimosPorLivro(): Promise<EmprestimosPorLivroRelatorio[]>;

  findClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimoAtivoRelatorio[]
  >;
}
