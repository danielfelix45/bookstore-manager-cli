import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoService } from "../services/EmprestimoService";

export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  async realizarEmprestimo(
    livroId: number,
    clienteId: number,
  ): Promise<Emprestimo> {
    const emprestimo: Emprestimo = {
      livro_id: livroId,
      cliente_id: clienteId,
      data_emprestimo: new Date(),
    };

    return this.emprestimoService.criarEmprestimo(emprestimo);
  }

  async listarEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoService.listarEmprestimos();
  }

  async buscarEmprestimoPorId(id: number): Promise<Emprestimo> {
    return this.emprestimoService.buscarEmprestimoPorId(id);
  }

  async registrarDevolucao(id: number): Promise<Emprestimo> {
    return this.emprestimoService.registrarDevolucao(id);
  }

  async deletarEmprestimo(id: number): Promise<boolean> {
    return this.emprestimoService.deletarEmprestimo(id);
  }
}
