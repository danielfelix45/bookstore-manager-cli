import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { AutorController } from "./controllers/AutorController";
import { AutorMenu } from "./menus/AutorMenu";

async function main(): Promise<void> {
  try {
    const autorRepository = new AutorRepository();
    const autorService = new AutorService(autorRepository);
    const autorController = new AutorController(autorService);
    const autorMenu = new AutorMenu(autorController);

    await autorMenu.mostrarMenu();

    autorMenu.fechar();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao iniciar a aplicação: ${error.message}`);
    } else {
      console.error("Ocorreu um erro inesperado ao iniciar a aplicação.");
    }
  }
}

main();
