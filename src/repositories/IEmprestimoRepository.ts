import { Emprestimo } from "../models/Emprestimo";

export interface IEmprestimoRepository {
  create(emprestimo: Emprestimo): Promise<Emprestimo>;
  findById(id: number): Promise<Emprestimo | null>;
  findAll(): Promise<Emprestimo[]>;
  update(id: number, emprestimo: Emprestimo): Promise<Emprestimo | null>;
  delete(id: number): Promise<boolean>;
}
