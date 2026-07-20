import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { EmprestimoController } from "../controllers/EmprestimoController";

export class EmprestimoMenu {
  private readonly rl = readline.createInterface({ input, output });

  constructor(private readonly emprestimoController: EmprestimoController) {}

  public fechar(): void {
    this.rl.close();
  }

  async mostrarMenu(): Promise<void> {
    while (true) {
      console.log(`
        ===== GERENCIAMENTO DE EMPRÉSTIMOS =====

        1 - Realizar empréstimo
        2 - Listar empréstimos
        3 - Buscar empréstimo por ID
        4 - Registrar devolução
        5 - Excluir empréstimo
        0 - Sair
      `);

      const opcao = await this.rl.question("Escolha uma opção: ");

      switch (opcao.trim()) {
        case "1":
          await this.realizarEmprestimo();
          break;

        case "2":
          await this.listarEmprestimos();
          break;

        case "3":
          await this.buscarEmprestimoPorId();
          break;

        case "4":
          await this.registrarDevolucao();
          break;

        case "5":
          await this.deletarEmprestimo();
          break;

        case "0":
          console.log("\nEncerrando o módulo de empréstimos...");
          this.fechar();
          return;

        default:
          console.log("\nOpção inválida. Tente novamente.");
      }
    }
  }

  private async realizarEmprestimo(): Promise<void> {
    try {
      const livroIdInput = await this.rl.question("Digite o ID do livro: ");

      const livroId = Number(livroIdInput.trim());

      const clienteIdInput = await this.rl.question("Digite o ID do cliente: ");

      const clienteId = Number(clienteIdInput.trim());

      const emprestimo = await this.emprestimoController.realizarEmprestimo(
        livroId,
        clienteId,
      );

      console.log("\nEmpréstimo realizado com sucesso:");
      console.table([this.formatarEmprestimo(emprestimo)]);
    } catch (error) {
      this.exibirErro(error, "realizar empréstimo");
    } finally {
      await this.pausar();
    }
  }

  private async listarEmprestimos(): Promise<void> {
    try {
      const emprestimos = await this.emprestimoController.listarEmprestimos();

      if (emprestimos.length === 0) {
        console.log("\nNenhum empréstimo encontrado.");
        return;
      }

      console.log("\nLista de empréstimos:");

      console.table(
        emprestimos.map((emprestimo) => this.formatarEmprestimo(emprestimo)),
      );
    } catch (error) {
      this.exibirErro(error, "listar empréstimos");
    } finally {
      await this.pausar();
    }
  }

  private async buscarEmprestimoPorId(): Promise<void> {
    try {
      const idInput = await this.rl.question("Digite o ID do empréstimo: ");

      const id = Number(idInput.trim());

      const emprestimo =
        await this.emprestimoController.buscarEmprestimoPorId(id);

      console.log("\nEmpréstimo encontrado:");
      console.table([this.formatarEmprestimo(emprestimo)]);
    } catch (error) {
      this.exibirErro(error, "buscar empréstimo");
    } finally {
      await this.pausar();
    }
  }

  private async registrarDevolucao(): Promise<void> {
    try {
      const idInput = await this.rl.question("Digite o ID do empréstimo: ");

      const id = Number(idInput.trim());

      const emprestimo =
        await this.emprestimoController.buscarEmprestimoPorId(id);

      console.log("\nEmpréstimo selecionado:");
      console.table([this.formatarEmprestimo(emprestimo)]);

      const confirmacao = await this.rl.question(
        "Confirmar devolução deste livro? (s/n): ",
      );

      if (confirmacao.trim().toLowerCase() !== "s") {
        console.log("\nDevolução cancelada.");
        return;
      }

      const emprestimoAtualizado =
        await this.emprestimoController.registrarDevolucao(id);

      console.log("\nDevolução registrada com sucesso:");
      console.table([this.formatarEmprestimo(emprestimoAtualizado)]);
    } catch (error) {
      this.exibirErro(error, "registrar devolução");
    } finally {
      await this.pausar();
    }
  }

  private async deletarEmprestimo(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do empréstimo que deseja excluir: ",
      );

      const id = Number(idInput.trim());

      const emprestimo =
        await this.emprestimoController.buscarEmprestimoPorId(id);

      console.log("\nEmpréstimo selecionado:");
      console.table([this.formatarEmprestimo(emprestimo)]);

      const confirmacao = await this.rl.question(
        "Tem certeza que deseja excluir este empréstimo? (s/n): ",
      );

      if (confirmacao.trim().toLowerCase() !== "s") {
        console.log("\nExclusão cancelada.");
        return;
      }

      await this.emprestimoController.deletarEmprestimo(id);

      console.log("\nEmpréstimo excluído com sucesso.");
    } catch (error) {
      this.exibirErro(error, "excluir empréstimo");
    } finally {
      await this.pausar();
    }
  }

  private formatarEmprestimo(emprestimo: {
    id?: number;
    livro_id: number;
    cliente_id: number;
    data_emprestimo: Date;
    data_devolucao?: Date;
  }) {
    return {
      ...emprestimo,

      data_emprestimo:
        emprestimo.data_emprestimo instanceof Date
          ? emprestimo.data_emprestimo.toLocaleDateString("pt-BR")
          : emprestimo.data_emprestimo,

      data_devolucao: emprestimo.data_devolucao
        ? emprestimo.data_devolucao instanceof Date
          ? emprestimo.data_devolucao.toLocaleDateString("pt-BR")
          : emprestimo.data_devolucao
        : "Em aberto",
    };
  }

  private exibirErro(error: unknown, operacao: string): void {
    if (error instanceof Error) {
      console.error(`\nErro ao ${operacao}: ${error.message}`);
    } else {
      console.error("\nOcorreu um erro inesperado.");
    }
  }

  private async pausar(): Promise<void> {
    await this.rl.question("\nPressione Enter para continuar...");
  }
}
