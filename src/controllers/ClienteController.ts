import { Cliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";

export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  async cadastrarCliente(
    nome: string,
    email: string,
    telefone?: string,
  ): Promise<Cliente> {
    const cliente: Cliente = {
      nome,
      email,
    };

    if (telefone !== undefined) {
      cliente.telefone = telefone;
    }

    return this.clienteService.criarCliente(cliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return this.clienteService.listarClientes();
  }

  async buscarClientePorId(id: number): Promise<Cliente> {
    return this.clienteService.buscarClientePorId(id);
  }

  async buscarClientePorEmail(email: string): Promise<Cliente> {
    return this.clienteService.buscarClientePorEmail(email);
  }

  async atualizarCliente(id: number, cliente: Cliente): Promise<Cliente> {
    return this.clienteService.atualizarCliente(id, cliente);
  }

  async deletarCliente(id: number): Promise<boolean> {
    return this.clienteService.deletarCliente(id);
  }
}
