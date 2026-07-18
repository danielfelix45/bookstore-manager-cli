import { Livro } from "../models/Livro";
import { LivroService } from "../services/LivroService";

export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  async cadastrarLivro(
    titulo: string,
    autor_id: number,
    ano_publicacao?: number,
    genero?: string,
    quantidade_estoque?: number,
  ): Promise<Livro> {
    const livro: Livro = {
      titulo,
      quantidade_estoque: quantidade_estoque ?? 0,
      autor_id,
    };

    if (ano_publicacao !== undefined) {
      livro.ano_publicacao = ano_publicacao;
    }

    if (genero !== undefined) {
      livro.genero = genero;
    }

    return this.livroService.criarLivro(livro);
  }

  async listarLivros(): Promise<Livro[]> {
    return this.livroService.listarLivros();
  }

  async buscarLivroPorId(id: number): Promise<Livro> {
    return this.livroService.buscarLivroPorId(id);
  }

  async atualizarLivro(id: number, livro: Livro): Promise<Livro> {
    return this.livroService.atualizarLivro(id, livro);
  }

  async deletarLivro(id: number): Promise<boolean> {
    return this.livroService.deletarLivro(id);
  }
}
