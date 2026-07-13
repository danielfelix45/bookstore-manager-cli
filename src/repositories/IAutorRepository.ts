import { Autor } from "../models/Autor";

export interface IAutorRepository {
  create(autor: Autor): Promise<Autor>;
  findById(id: number): Promise<Autor | null>;
  findAll(): Promise<Autor[]>;
  update(id: number, autor: Autor): Promise<Autor | null>;
  delete(id: number): Promise<boolean>;
}
