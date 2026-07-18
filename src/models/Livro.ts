export interface Livro {
  id?: number;
  titulo: string;
  ano_publicacao?: number;
  genero?: string;
  quantidade_estoque: number;
  autor_id: number;
}
