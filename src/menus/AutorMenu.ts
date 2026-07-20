import { Autor } from "../models/Autor";
import { AutorController } from "../controllers/AutorController";
import type { Interface } from "node:readline/promises";

export class AutorMenu {
  constructor(
    private readonly autorController: AutorController,
    private readonly rl: Interface,
  ) {}

  private formatarAutor(autor: Autor) {
    return {
      ...autor,
      data_nascimento: autor.data_nascimento?.toLocaleDateString("pt-BR"),
    };
  }

  async mostrarMenu(): Promise<void> {
    while (true) {
      console.log(`
        ===== GERENCIAMENTO DE AUTORES =====

        1 - Cadastrar autor
        2 - Listar autores
        3 - Buscar autor por ID
        4 - Atualizar autor
        5 - Excluir autor
        0 - Sair
      `);

      const opcao = await this.rl.question("Escolha uma opção: ");

      switch (opcao.trim()) {
        case "1":
          await this.cadastrarAutor();
          break;

        case "2":
          await this.listarAutores();
          break;

        case "3":
          await this.buscarAutorPorId();
          break;

        case "4":
          await this.atualizarAutor();
          break;

        case "5":
          await this.deletarAutor();
          break;

        case "0":
          console.log("\nVoltando ao menu principal...");
          return;

        default:
          console.log("\nOpção inválida. Tente novamente.");
      }
    }
  }

  private async cadastrarAutor(): Promise<void> {
    try {
      const nome = await this.rl.question("Digite o nome do autor: ");

      if (!nome.trim()) {
        console.log("\nO nome do autor é obrigatório.");
        return;
      }

      const nacionalidadeInput = await this.rl.question(
        "Digite a nacionalidade do autor (opcional): ",
      );
      const nacionalidade = nacionalidadeInput.trim() || undefined;

      const dataNascimentoInput = await this.rl.question(
        "Digite a data de nascimento do autor (opcional, formato YYYY-MM-DD): ",
      );

      let dataNascimento: Date | undefined;

      if (dataNascimentoInput.trim()) {
        const dataTexto = dataNascimentoInput.trim();
        const formatoValido = /^\d{4}-\d{2}-\d{2}$/.test(dataTexto);

        if (!formatoValido) {
          console.log(
            "\nFormato de data inválido. Utilize YYYY-MM-DD, exemplo: 1977-08-14.",
          );
          return;
        }

        dataNascimento = new Date(`${dataTexto}T00:00:00`);

        if (Number.isNaN(dataNascimento.getTime())) {
          console.log("\nData de nascimento inválida.");
          return;
        }
      }

      const autor = await this.autorController.cadastrarAutor(
        nome,
        nacionalidade,
        dataNascimento,
      );

      console.log("\nAutor cadastrado com sucesso:");
      console.table([this.formatarAutor(autor)]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar autor: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    }

    await this.rl.question("\nPressione Enter para continuar...");
  }

  private async listarAutores(): Promise<void> {
    try {
      const autores = await this.autorController.listarAutores();
      if (autores.length === 0) {
        console.log("\nNenhum autor encontrado.");
        await this.rl.question("\nPressione Enter para continuar...");
        return;
      }
      console.log("\nLista de autores:");
      console.table(autores.map((autor) => this.formatarAutor(autor)));

      await this.rl.question("\nPressione Enter para continuar...");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao listar autores: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    }
  }

  private async buscarAutorPorId(): Promise<void> {
    try {
      const idInput = await this.rl.question("Digite o ID do autor: ");
      const id = Number(idInput.trim());

      const autor = await this.autorController.buscarAutorPorId(id);

      console.log("\nAutor encontrado:");
      console.table([this.formatarAutor(autor)]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar autor: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async atualizarAutor(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do autor a ser atualizado: ",
      );

      const id = Number(idInput.trim());

      const autorAtual = await this.autorController.buscarAutorPorId(id);

      console.log("\nDados atuais do autor:");
      console.table([this.formatarAutor(autorAtual)]);

      const nomeInput = await this.rl.question(
        `Digite o novo nome (${autorAtual.nome}): `,
      );

      const nacionalidadeInput = await this.rl.question(
        `Digite a nova nacionalidade (${autorAtual.nacionalidade ?? "não informada"}): `,
      );

      const dataNascimentoInput = await this.rl.question(
        "Digite a nova data de nascimento (opcional, formato YYYY-MM-DD): ",
      );

      const autor: Autor = {
        nome: nomeInput.trim() || autorAtual.nome,
      };

      const nacionalidade =
        nacionalidadeInput.trim() || autorAtual.nacionalidade;

      const dataNascimento = dataNascimentoInput.trim()
        ? new Date(dataNascimentoInput.trim())
        : autorAtual.data_nascimento;

      if (nacionalidade !== undefined) {
        autor.nacionalidade = nacionalidade;
      }

      if (dataNascimento !== undefined) {
        autor.data_nascimento = dataNascimento;
      }

      const autorAtualizado = await this.autorController.atualizarAutor(
        id,
        autor,
      );

      console.log("\nAutor atualizado com sucesso:");
      console.table([this.formatarAutor(autorAtualizado)]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao atualizar autor: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async deletarAutor(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do autor que deseja excluir: ",
      );

      const id = Number(idInput.trim());

      const autor = await this.autorController.buscarAutorPorId(id);

      console.log("\nAutor selecionado:");
      console.table([this.formatarAutor(autor)]);

      const confirmacao = await this.rl.question(
        "Tem certeza que deseja excluir este autor? (s/n): ",
      );

      if (confirmacao.trim().toLowerCase() !== "s") {
        console.log("\nExclusão cancelada.");
        return;
      }

      await this.autorController.deletarAutor(id);

      console.log("\nAutor excluído com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao excluir autor: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }
}
