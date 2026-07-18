import { Livro } from "../models/Livro";
import { ILivroRepository } from "../repositories/ILivroRepository";
import { IAutorRepository } from "../repositories/IAutorRepository";

export class LivroService {
  constructor(
    private readonly livroRepository: ILivroRepository,
    private readonly autorRepository: IAutorRepository,
  ) {}

  async criarLivro(livro: Livro): Promise<Livro> {
    livro.titulo = livro.titulo.trim();

    if (!livro.titulo) {
      throw new Error("O título é obrigatório.");
    }

    if (
      livro.ano_publicacao !== undefined &&
      (livro.ano_publicacao <= 0 ||
        livro.ano_publicacao > new Date().getFullYear())
    ) {
      throw new Error("O ano de publicação é inválido.");
    }

    if (!Number.isInteger(livro.autor_id) || livro.autor_id <= 0) {
      throw new Error("O ID do autor deve ser um número inteiro positivo.");
    }

    if (
      !Number.isInteger(livro.quantidade_estoque) ||
      livro.quantidade_estoque < 0
    ) {
      throw new Error(
        "A quantidade em estoque deve ser um número inteiro maior ou igual a zero.",
      );
    }

    const autor = await this.autorRepository.findById(livro.autor_id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    return this.livroRepository.create(livro);
  }

  async listarLivros(): Promise<Livro[]> {
    return this.livroRepository.findAll();
  }

  async buscarLivroPorId(id: number): Promise<Livro> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const livro = await this.livroRepository.findById(id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    return livro;
  }

  async atualizarLivro(id: number, livro: Livro): Promise<Livro> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    livro.titulo = livro.titulo.trim();

    if (!livro.titulo) {
      throw new Error("O título é obrigatório.");
    }

    if (
      livro.ano_publicacao !== undefined &&
      (livro.ano_publicacao <= 0 ||
        livro.ano_publicacao > new Date().getFullYear())
    ) {
      throw new Error("O ano de publicação é inválido.");
    }

    if (!Number.isInteger(livro.autor_id) || livro.autor_id <= 0) {
      throw new Error("O ID do autor deve ser um número inteiro positivo.");
    }

    const autor = await this.autorRepository.findById(livro.autor_id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    if (
      !Number.isInteger(livro.quantidade_estoque) ||
      livro.quantidade_estoque < 0
    ) {
      throw new Error(
        "A quantidade em estoque deve ser um número inteiro maior ou igual a zero.",
      );
    }

    const livroAtualizado = await this.livroRepository.update(id, livro);

    if (!livroAtualizado) {
      throw new Error("Livro não encontrado.");
    }

    return livroAtualizado;
  }

  async deletarLivro(id: number): Promise<boolean> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const livroDeletado = await this.livroRepository.delete(id);

    if (!livroDeletado) {
      throw new Error("Livro não encontrado.");
    }

    return true;
  }
}
