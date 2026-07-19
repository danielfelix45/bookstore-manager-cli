import { Cliente } from "../models/Cliente";

export interface IClienteRepository {
  create(cliente: Cliente): Promise<Cliente>;
  findById(id: number): Promise<Cliente | null>;
  findAll(): Promise<Cliente[]>;
  findByEmail(email: string): Promise<Cliente | null>;
  update(id: number, cliente: Cliente): Promise<Cliente | null>;
  delete(id: number): Promise<boolean>;
}
