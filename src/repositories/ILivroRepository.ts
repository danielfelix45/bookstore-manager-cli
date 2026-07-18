import { Livro } from "../models/Livro";

export interface ILivroRepository {
  create(livro: Livro): Promise<Livro>;
  findById(id: number): Promise<Livro | null>;
  findAll(): Promise<Livro[]>;
  update(id: number, livro: Livro): Promise<Livro | null>;
  delete(id: number): Promise<boolean>;
}
