import {
  ClienteComEmprestimoAtivoRelatorio,
  EmprestimosPorLivroRelatorio,
  IRelatorioRepository,
  LivroDisponivelRelatorio,
  LivroEmprestadoRelatorio,
  LivrosPorAutorRelatorio,
} from "../repositories/IRelatorioRepository";

export class RelatorioService {
  constructor(private readonly relatorioRepository: IRelatorioRepository) {}

  async listarLivrosDisponiveis(): Promise<LivroDisponivelRelatorio[]> {
    return await this.relatorioRepository.findLivrosDisponiveis();
  }

  async listarLivrosEmprestados(): Promise<LivroEmprestadoRelatorio[]> {
    return await this.relatorioRepository.findLivrosEmprestados();
  }

  async listarLivrosPorAutor(): Promise<LivrosPorAutorRelatorio[]> {
    return await this.relatorioRepository.findLivrosPorAutor();
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<
    EmprestimosPorLivroRelatorio[]
  > {
    return await this.relatorioRepository.findQuantidadeEmprestimosPorLivro();
  }

  async listarClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimoAtivoRelatorio[]
  > {
    return await this.relatorioRepository.findClientesComEmprestimosAtivos();
  }
}
