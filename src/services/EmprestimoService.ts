import { Emprestimo } from "../models/Emprestimo";
import { IEmprestimoRepository } from "../repositories/IEmprestimoRepository";
import { ILivroRepository } from "../repositories/ILivroRepository";
import { IClienteRepository } from "../repositories/IClienteRepository";

export class EmprestimoService {
  constructor(
    private readonly emprestimoRepository: IEmprestimoRepository,
    private readonly livroRepository: ILivroRepository,
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async criarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
    if (!Number.isInteger(emprestimo.livro_id) || emprestimo.livro_id <= 0) {
      throw new Error("O ID do livro deve ser um número inteiro positivo.");
    }

    if (
      !Number.isInteger(emprestimo.cliente_id) ||
      emprestimo.cliente_id <= 0
    ) {
      throw new Error("O ID do cliente deve ser um número inteiro positivo.");
    }

    const cliente = await this.clienteRepository.findById(
      emprestimo.cliente_id,
    );

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    const livro = await this.livroRepository.findById(emprestimo.livro_id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    if (livro.quantidade_estoque <= 0) {
      throw new Error("Livro indisponível para empréstimo.");
    }

    const novoEmprestimo = await this.emprestimoRepository.create(emprestimo);

    const livroAtualizado = {
      ...livro,
      quantidade_estoque: livro.quantidade_estoque - 1,
    };

    await this.livroRepository.update(livro.id!, livroAtualizado);

    return novoEmprestimo;
  }

  async listarEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoRepository.findAll();
  }

  async buscarEmprestimoPorId(id: number): Promise<Emprestimo> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const emprestimo = await this.emprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    return emprestimo;
  }

  async registrarDevolucao(id: number): Promise<Emprestimo> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const emprestimo = await this.emprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.data_devolucao) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    const livro = await this.livroRepository.findById(emprestimo.livro_id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    const emprestimoComDevolucao: Emprestimo = {
      livro_id: emprestimo.livro_id,
      cliente_id: emprestimo.cliente_id,
      data_emprestimo: emprestimo.data_emprestimo,
      data_devolucao: new Date(),
    };

    const emprestimoAtualizado = await this.emprestimoRepository.update(
      id,
      emprestimoComDevolucao,
    );

    if (!emprestimoAtualizado) {
      throw new Error("Não foi possível registrar a devolução.");
    }

    const livroAtualizado = {
      ...livro,
      quantidade_estoque: livro.quantidade_estoque + 1,
    };

    await this.livroRepository.update(livro.id!, livroAtualizado);

    return emprestimoAtualizado;
  }

  async deletarEmprestimo(id: number): Promise<boolean> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const emprestimo = await this.emprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (!emprestimo.data_devolucao) {
      throw new Error("Não é possível excluir um empréstimo ativo.");
    }

    const emprestimoDeletado = await this.emprestimoRepository.delete(id);

    if (!emprestimoDeletado) {
      throw new Error("Empréstimo não encontrado.");
    }

    return true;
  }
}
