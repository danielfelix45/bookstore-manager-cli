import { Autor } from "../models/Autor";
import { IAutorRepository } from "../repositories/IAutorRepository";

export class AutorService {
  constructor(private readonly autorRepository: IAutorRepository) {}

  async criarAutor(autor: Autor): Promise<Autor> {
    autor.nome = autor.nome.trim();

    if (!autor.nome) {
      throw new Error("O nome é obrigatório.");
    }

    return this.autorRepository.create(autor);
  }

  async listarAutores(): Promise<Autor[]> {
    return this.autorRepository.findAll();
  }

  async buscarAutorPorId(id: number): Promise<Autor> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const autor = await this.autorRepository.findById(id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    return autor;
  }

  async atualizarAutor(id: number, autor: Autor): Promise<Autor> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    autor.nome = autor.nome.trim();
    if (!autor.nome) {
      throw new Error("O nome é obrigatório.");
    }

    const autorAtualizado = await this.autorRepository.update(id, autor);

    if (!autorAtualizado) {
      throw new Error("Autor não encontrado.");
    }

    return autorAtualizado;
  }

  async deletarAutor(id: number): Promise<boolean> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }
    const autorDeletado = await this.autorRepository.delete(id);

    if (!autorDeletado) {
      throw new Error("Autor não encontrado.");
    }

    return true;
  }
}
