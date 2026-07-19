import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { AutorController } from "./controllers/AutorController";
import { AutorMenu } from "./menus/AutorMenu";

import { LivroRepository } from "./repositories/LivroRepository";
import { LivroService } from "./services/LivroService";
import { LivroController } from "./controllers/LivroController";
import { LivroMenu } from "./menus/LivroMenu";

import { ClienteRepository } from "./repositories/ClienteRepository";
import { ClienteService } from "./services/ClienteService";
import { ClienteController } from "./controllers/ClienteController";
import { ClienteMenu } from "./menus/ClienteMenu";

async function main(): Promise<void> {
  try {
    // ===== MÓDULO DE AUTORES =====

    const autorRepository = new AutorRepository();
    // const autorService = new AutorService(autorRepository);
    // const autorController = new AutorController(autorService);
    // const autorMenu = new AutorMenu(autorController);

    // ===== MÓDULO DE LIVROS =====

    const livroRepository = new LivroRepository();
    // const livroService = new LivroService(livroRepository, autorRepository);
    // const livroController = new LivroController(livroService);
    // const livroMenu = new LivroMenu(livroController);

    // ===== MÓDULO DE CLIENTES =====

    const clienteRepository = new ClienteRepository();
    const clienteService = new ClienteService(clienteRepository);
    const clienteController = new ClienteController(clienteService);
    const clienteMenu = new ClienteMenu(clienteController);

    // ===== INÍCIO DA APLICAÇÃO =====

    await clienteMenu.mostrarMenu();

    clienteMenu.fechar();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao iniciar a aplicação: ${error.message}`);
    } else {
      console.error("Ocorreu um erro inesperado ao iniciar a aplicação.");
    }
  }
}

main();
