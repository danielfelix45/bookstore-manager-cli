import type { Interface } from "node:readline/promises";
import { RelatorioController } from "../controllers/RelatorioController";

export class RelatorioMenu {
  constructor(
    private readonly relatorioController: RelatorioController,
    private readonly rl: Interface,
  ) {}

  async exibirMenu(): Promise<void> {
    while (true) {
      console.clear();

      console.log("===== RELATÓRIOS =====");
      console.log("1 - Livros disponíveis");
      console.log("2 - Livros emprestados");
      console.log("3 - Livros cadastrados por autor");
      console.log("4 - Quantidade de empréstimos por livro");
      console.log("5 - Clientes com empréstimos ativos");
      console.log("0 - Voltar");

      const opcao = await this.rl.question("Escolha uma opção: ");

      switch (opcao.trim()) {
        case "1":
          console.table(
            await this.relatorioController.listarLivrosDisponiveis(),
          );
          break;

        case "2":
          console.table(
            await this.relatorioController.listarLivrosEmprestados(),
          );
          break;

        case "3":
          console.table(await this.relatorioController.listarLivrosPorAutor());
          break;

        case "4":
          console.table(
            await this.relatorioController.listarQuantidadeEmprestimosPorLivro(),
          );
          break;

        case "5":
          console.table(
            await this.relatorioController.listarClientesComEmprestimosAtivos(),
          );
          break;

        case "0":
          return;

        default:
          console.log("Opção inválida.");
      }

      await this.rl.question("\nPressione Enter para continuar...");
    }
  }
}
