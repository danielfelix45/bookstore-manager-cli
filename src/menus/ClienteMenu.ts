import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Cliente } from "../models/Cliente";
import { ClienteController } from "../controllers/ClienteController";

export class ClienteMenu {
  private readonly rl = readline.createInterface({ input, output });

  constructor(private readonly clienteController: ClienteController) {}

  public fechar(): void {
    this.rl.close();
  }

  async mostrarMenu(): Promise<void> {
    while (true) {
      console.log(`
        ===== GERENCIAMENTO DE CLIENTES =====

        1 - Cadastrar cliente
        2 - Listar clientes
        3 - Buscar cliente por ID
        4 - Buscar cliente por e-mail
        5 - Atualizar cliente
        6 - Excluir cliente
        0 - Sair
      `);

      const opcao = await this.rl.question("Escolha uma opção: ");

      switch (opcao.trim()) {
        case "1":
          await this.cadastrarCliente();
          break;

        case "2":
          await this.listarClientes();
          break;

        case "3":
          await this.buscarClientePorId();
          break;

        case "4":
          await this.buscarClientePorEmail();
          break;

        case "5":
          await this.atualizarCliente();
          break;

        case "6":
          await this.deletarCliente();
          break;

        case "0":
          console.log("\nEncerrando o módulo de clientes...");
          this.fechar();
          return;

        default:
          console.log("\nOpção inválida. Tente novamente.");
      }
    }
  }

  private async cadastrarCliente(): Promise<void> {
    try {
      const nome = await this.rl.question("Digite o nome do cliente: ");

      if (!nome.trim()) {
        console.log("\nO nome do cliente é obrigatório.");
        return;
      }

      const email = await this.rl.question("Digite o e-mail do cliente: ");

      if (!email.trim()) {
        console.log("\nO e-mail do cliente é obrigatório.");
        return;
      }

      const telefoneInput = await this.rl.question(
        "Digite o telefone do cliente (opcional): ",
      );

      const telefone = telefoneInput.trim() || undefined;

      const cliente = await this.clienteController.cadastrarCliente(
        nome,
        email,
        telefone,
      );

      console.log("\nCliente cadastrado com sucesso:");
      console.table([cliente]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar cliente: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async listarClientes(): Promise<void> {
    try {
      const clientes = await this.clienteController.listarClientes();

      if (clientes.length === 0) {
        console.log("\nNenhum cliente encontrado.");
        return;
      }

      console.log("\nLista de clientes:");
      console.table(clientes);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao listar clientes: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async buscarClientePorId(): Promise<void> {
    try {
      const idInput = await this.rl.question("Digite o ID do cliente: ");

      const id = Number(idInput.trim());

      const cliente = await this.clienteController.buscarClientePorId(id);

      console.log("\nCliente encontrado:");
      console.table([cliente]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar cliente: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async buscarClientePorEmail(): Promise<void> {
    try {
      const email = await this.rl.question("Digite o e-mail do cliente: ");

      const cliente = await this.clienteController.buscarClientePorEmail(email);

      console.log("\nCliente encontrado:");
      console.table([cliente]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar cliente: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async atualizarCliente(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do cliente a ser atualizado: ",
      );

      const id = Number(idInput.trim());

      const clienteAtual = await this.clienteController.buscarClientePorId(id);

      console.log("\nDados atuais do cliente:");
      console.table([clienteAtual]);

      const nomeInput = await this.rl.question(
        `Digite o novo nome (${clienteAtual.nome}): `,
      );

      const emailInput = await this.rl.question(
        `Digite o novo e-mail (${clienteAtual.email}): `,
      );

      const telefoneInput = await this.rl.question(
        `Digite o novo telefone (${
          clienteAtual.telefone ?? "não informado"
        }): `,
      );

      const cliente: Cliente = {
        nome: nomeInput.trim() || clienteAtual.nome,
        email: emailInput.trim() || clienteAtual.email,
      };

      const telefone = telefoneInput.trim() || clienteAtual.telefone;

      if (telefone !== undefined) {
        cliente.telefone = telefone;
      }

      const clienteAtualizado = await this.clienteController.atualizarCliente(
        id,
        cliente,
      );

      console.log("\nCliente atualizado com sucesso:");
      console.table([clienteAtualizado]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao atualizar cliente: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async deletarCliente(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do cliente que deseja excluir: ",
      );

      const id = Number(idInput.trim());

      const cliente = await this.clienteController.buscarClientePorId(id);

      console.log("\nCliente selecionado:");
      console.table([cliente]);

      const confirmacao = await this.rl.question(
        "Tem certeza que deseja excluir este cliente? (s/n): ",
      );

      if (confirmacao.trim().toLowerCase() !== "s") {
        console.log("\nExclusão cancelada.");
        return;
      }

      await this.clienteController.deletarCliente(id);

      console.log("\nCliente excluído com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao excluir cliente: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }
}
