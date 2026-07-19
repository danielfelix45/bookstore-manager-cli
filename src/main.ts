import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { AutorController } from "./controllers/AutorController";
import { AutorMenu } from "./menus/AutorMenu";

import { LivroRepository } from "./repositories/LivroRepository";
import { LivroService } from "./services/LivroService";
import { LivroController } from "./controllers/LivroController";
import { LivroMenu } from "./menus/LivroMenu";

async function main(): Promise<void> {
  try {
    // ===== MÓDULO DE AUTORES =====

    const autorRepository = new AutorRepository();
    // const autorService = new AutorService(autorRepository);
    // const autorController = new AutorController(autorService);
    // const autorMenu = new AutorMenu(autorController);

    // ===== MÓDULO DE LIVROS =====

    const livroRepository = new LivroRepository();

    const livroService = new LivroService(livroRepository, autorRepository);

    const livroController = new LivroController(livroService);
    const livroMenu = new LivroMenu(livroController);

    // ===== INÍCIO DA APLICAÇÃO =====

    await livroMenu.mostrarMenu();

    livroMenu.fechar();
    // autorMenu.fechar();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao iniciar a aplicação: ${error.message}`);
    } else {
      console.error("Ocorreu um erro inesperado ao iniciar a aplicação.");
    }
  }
}

main();
