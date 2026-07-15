import { Autor } from "../models/Autor";
import { AutorService } from "../services/AutorService";

export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  async cadastrarAutor(
    nome: string,
    nacionalidade?: string,
    dataNascimento?: Date,
  ): Promise<Autor> {
    const autor: Autor = {
      nome,
    };

    if (nacionalidade !== undefined) {
      autor.nacionalidade = nacionalidade;
    }

    if (dataNascimento !== undefined) {
      autor.data_nascimento = dataNascimento;
    }

    return this.autorService.criarAutor(autor);
  }

  async listarAutores(): Promise<Autor[]> {
    return this.autorService.listarAutores();
  }

  async buscarAutorPorId(id: number): Promise<Autor> {
    return this.autorService.buscarAutorPorId(id);
  }

  async atualizarAutor(id: number, autor: Autor): Promise<Autor> {
    return this.autorService.atualizarAutor(id, autor);
  }

  async deletarAutor(id: number): Promise<boolean> {
    return this.autorService.deletarAutor(id);
  }
}
