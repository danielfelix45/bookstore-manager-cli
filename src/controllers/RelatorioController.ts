import { RelatorioService } from "../services/RelatorioService";

export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  async listarLivrosDisponiveis() {
    return await this.relatorioService.listarLivrosDisponiveis();
  }

  async listarLivrosEmprestados() {
    return await this.relatorioService.listarLivrosEmprestados();
  }

  async listarLivrosPorAutor() {
    return await this.relatorioService.listarLivrosPorAutor();
  }

  async listarQuantidadeEmprestimosPorLivro() {
    return await this.relatorioService.listarQuantidadeEmprestimosPorLivro();
  }

  async listarClientesComEmprestimosAtivos() {
    return await this.relatorioService.listarClientesComEmprestimosAtivos();
  }
}
