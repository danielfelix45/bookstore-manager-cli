import { LivroRepository } from "./repositories/LivroRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";

import { EmprestimoRepository } from "./repositories/EmprestimoRepository";
import { EmprestimoService } from "./services/EmprestimoService";
import { EmprestimoController } from "./controllers/EmprestimoController";
import { EmprestimoMenu } from "./menus/EmprestimoMenu";

async function main(): Promise<void> {
  try {
    const livroRepository = new LivroRepository();
    const clienteRepository = new ClienteRepository();
    const emprestimoRepository = new EmprestimoRepository();

    const emprestimoService = new EmprestimoService(
      emprestimoRepository,
      livroRepository,
      clienteRepository,
    );

    const emprestimoController = new EmprestimoController(emprestimoService);

    const emprestimoMenu = new EmprestimoMenu(emprestimoController);

    await emprestimoMenu.mostrarMenu();

    emprestimoMenu.fechar();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao iniciar a aplicação: ${error.message}`);
    } else {
      console.error("Ocorreu um erro inesperado ao iniciar a aplicação.");
    }
  }
}

main();
