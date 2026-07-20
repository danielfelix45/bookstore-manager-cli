import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { pool } from "./database/connection";

// Repositories
import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository";

// Services
import { AutorService } from "./services/AutorService";
import { LivroService } from "./services/LivroService";
import { ClienteService } from "./services/ClienteService";
import { EmprestimoService } from "./services/EmprestimoService";

// Controllers
import { AutorController } from "./controllers/AutorController";
import { LivroController } from "./controllers/LivroController";
import { ClienteController } from "./controllers/ClienteController";
import { EmprestimoController } from "./controllers/EmprestimoController";

// Menus
import { AutorMenu } from "./menus/AutorMenu";
import { LivroMenu } from "./menus/LivroMenu";
import { ClienteMenu } from "./menus/ClienteMenu";
import { EmprestimoMenu } from "./menus/EmprestimoMenu";
import { MenuPrincipal } from "./menus/MenuPrincipal";
import { RelatorioRepository } from "./repositories/RelatorioRepository";
import { RelatorioService } from "./services/RelatorioService";
import { RelatorioController } from "./controllers/RelatorioController";
import { RelatorioMenu } from "./menus/RelatorioMenu";

async function main(): Promise<void> {
  const rl = readline.createInterface({
    input,
    output,
  });

  try {
    /*
     * Repositories
     */
    const autorRepository = new AutorRepository();
    const livroRepository = new LivroRepository();
    const clienteRepository = new ClienteRepository();
    const emprestimoRepository = new EmprestimoRepository();
    const relatorioRepository = new RelatorioRepository();

    /*
     * Services
     */
    const autorService = new AutorService(autorRepository);

    const livroService = new LivroService(livroRepository, autorRepository);

    const clienteService = new ClienteService(clienteRepository);

    const emprestimoService = new EmprestimoService(
      emprestimoRepository,
      livroRepository,
      clienteRepository,
    );

    const relatorioService = new RelatorioService(relatorioRepository);

    /*
     * Controllers
     */
    const autorController = new AutorController(autorService);
    const livroController = new LivroController(livroService);
    const clienteController = new ClienteController(clienteService);

    const emprestimoController = new EmprestimoController(emprestimoService);

    const relatorioController = new RelatorioController(relatorioService);

    /*
     * Submenus — todos recebem o mesmo readline
     */
    const autorMenu = new AutorMenu(autorController, rl);
    const livroMenu = new LivroMenu(livroController, rl);
    const clienteMenu = new ClienteMenu(clienteController, rl);

    const emprestimoMenu = new EmprestimoMenu(emprestimoController, rl);

    const relatorioMenu = new RelatorioMenu(relatorioController, rl);

    /*
     * Menu principal
     *
     * O RelatorioMenu será acrescentado posteriormente.
     */
    const menuPrincipal = new MenuPrincipal(
      autorMenu,
      livroMenu,
      clienteMenu,
      emprestimoMenu,
      rl,
      relatorioMenu,
    );

    await menuPrincipal.exibirMenu();
  } catch (error) {
    console.error("\nErro ao iniciar a aplicação:");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  } finally {
    rl.close();
    await pool.end();
  }
}

main();
