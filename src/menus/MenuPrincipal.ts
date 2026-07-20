import type { Interface } from "node:readline/promises";
import { AutorMenu } from "./AutorMenu";
import { LivroMenu } from "./LivroMenu";
import { ClienteMenu } from "./ClienteMenu";
import { EmprestimoMenu } from "./EmprestimoMenu";

interface MenuRelatorio {
  exibirMenu(): Promise<void>;
}

export class MenuPrincipal {
  constructor(
    private readonly autorMenu: AutorMenu,
    private readonly livroMenu: LivroMenu,
    private readonly clienteMenu: ClienteMenu,
    private readonly emprestimoMenu: EmprestimoMenu,
    private readonly rl: Interface,
    private readonly relatorioMenu: MenuRelatorio,
  ) {}

  async exibirMenu(): Promise<void> {
    let executando = true;

    while (executando) {
      console.clear();

      console.log("==================================");
      console.log("      BOOKSTORE MANAGER CLI");
      console.log("==================================");
      console.log("1 - Autores");
      console.log("2 - Livros");
      console.log("3 - Clientes");
      console.log("4 - Empréstimos");
      console.log("5 - Relatórios");
      console.log("0 - Encerrar aplicação");
      console.log("==================================");

      const opcao = await this.rl.question("Escolha uma opção: ");

      switch (opcao.trim()) {
        case "1":
          await this.autorMenu.mostrarMenu();
          break;

        case "2":
          await this.livroMenu.mostrarMenu();
          break;

        case "3":
          await this.clienteMenu.mostrarMenu();
          break;

        case "4":
          await this.emprestimoMenu.mostrarMenu();
          break;

        case "5":
          await this.relatorioMenu.exibirMenu();
          break;

        case "0":
          executando = false;
          console.log("\nEncerrando o BookStore Manager CLI...");
          break;

        default:
          console.log("\nOpção inválida. Tente novamente.");
          await this.pausar();
      }
    }
  }

  private async pausar(): Promise<void> {
    await this.rl.question("\nPressione Enter para continuar...");
  }
}
