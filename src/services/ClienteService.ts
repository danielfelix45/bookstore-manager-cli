import { Cliente } from "../models/Cliente";
import { IClienteRepository } from "../repositories/IClienteRepository";

export class ClienteService {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async criarCliente(cliente: Cliente): Promise<Cliente> {
    cliente.nome = cliente.nome.trim();
    cliente.email = cliente.email.trim().toLowerCase();

    if (!cliente.nome) {
      throw new Error("O nome é obrigatório.");
    }

    if (!cliente.email) {
      throw new Error("O e-mail é obrigatório.");
    }

    const emailJaCadastrado = await this.clienteRepository.findByEmail(
      cliente.email,
    );

    if (emailJaCadastrado) {
      throw new Error("Já existe um cliente cadastrado com este e-mail.");
    }

    return this.clienteRepository.create(cliente);
  }

  async buscarClientePorId(id: number): Promise<Cliente> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const cliente = await this.clienteRepository.findById(id);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return cliente;
  }

  async buscarClientePorEmail(email: string): Promise<Cliente> {
    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado) {
      throw new Error("O e-mail é obrigatório.");
    }

    const cliente = await this.clienteRepository.findByEmail(emailNormalizado);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return cliente;
  }

  async atualizarCliente(id: number, cliente: Cliente): Promise<Cliente> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }

    cliente.nome = cliente.nome.trim();
    cliente.email = cliente.email.trim().toLowerCase();

    if (!cliente.nome) {
      throw new Error("O nome é obrigatório.");
    }

    if (!cliente.email) {
      throw new Error("O e-mail é obrigatório.");
    }

    const clienteComMesmoEmail = await this.clienteRepository.findByEmail(
      cliente.email,
    );

    if (clienteComMesmoEmail && clienteComMesmoEmail.id !== id) {
      throw new Error("Já existe um cliente cadastrado com este e-mail.");
    }

    const clienteAtualizado = await this.clienteRepository.update(id, cliente);

    if (!clienteAtualizado) {
      throw new Error("Cliente não encontrado.");
    }

    return clienteAtualizado;
  }

  async deletarCliente(id: number): Promise<boolean> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("O ID deve ser um número inteiro positivo.");
    }
    const clienteDeletado = await this.clienteRepository.delete(id);

    if (!clienteDeletado) {
      throw new Error("Cliente não encontrado.");
    }

    return true;
  }
}
