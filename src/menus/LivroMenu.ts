import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Livro } from "../models/Livro";
import { LivroController } from "../controllers/LivroController";

export class LivroMenu {
  private readonly rl = readline.createInterface({ input, output });

  constructor(private readonly livroController: LivroController) {}

  public fechar(): void {
    this.rl.close();
  }

  async mostrarMenu(): Promise<void> {
    while (true) {
      console.log(`
        ===== GERENCIAMENTO DE LIVROS =====

        1 - Cadastrar livro
        2 - Listar livros
        3 - Buscar livro por ID
        4 - Atualizar livro
        5 - Excluir livro
        0 - Sair
      `);

      const opcao = await this.rl.question("Escolha uma opção: ");

      switch (opcao.trim()) {
        case "1":
          await this.cadastrarLivro();
          break;

        case "2":
          await this.listarLivros();
          break;

        case "3":
          await this.buscarLivroPorId();
          break;

        case "4":
          await this.atualizarLivro();
          break;

        case "5":
          await this.deletarLivro();
          break;

        case "0":
          console.log("\nEncerrando a aplicação...");
          this.fechar();
          return;

        default:
          console.log("\nOpção inválida. Tente novamente.");
      }
    }
  }

  private async cadastrarLivro(): Promise<void> {
    try {
      const titulo = await this.rl.question("Digite o título do livro: ");

      if (!titulo.trim()) {
        console.log("\nO título do livro é obrigatório.");
        return;
      }

      const autorIdInput = await this.rl.question(
        "Digite o ID do autor do livro: ",
      );

      const autorId = Number(autorIdInput.trim());

      const anoPublicacaoInput = await this.rl.question(
        "Digite o ano de publicação (opcional): ",
      );

      const generoInput = await this.rl.question(
        "Digite o gênero do livro (opcional): ",
      );

      const quantidadeInput = await this.rl.question(
        "Digite a quantidade em estoque: ",
      );

      const anoPublicacao = anoPublicacaoInput.trim()
        ? Number(anoPublicacaoInput.trim())
        : undefined;

      const genero = generoInput.trim() || undefined;

      const quantidadeEstoque = quantidadeInput.trim()
        ? Number(quantidadeInput.trim())
        : 0;

      const livro = await this.livroController.cadastrarLivro(
        titulo,
        autorId,
        anoPublicacao,
        genero,
        quantidadeEstoque,
      );

      console.log("\nLivro cadastrado com sucesso:");
      console.table([livro]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar livro: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async listarLivros(): Promise<void> {
    try {
      const livros = await this.livroController.listarLivros();

      if (livros.length === 0) {
        console.log("\nNenhum livro encontrado.");
        return;
      }

      console.log("\nLista de livros:");
      console.table(livros);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao listar livros: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async buscarLivroPorId(): Promise<void> {
    try {
      const idInput = await this.rl.question("Digite o ID do livro: ");
      const id = Number(idInput.trim());

      const livro = await this.livroController.buscarLivroPorId(id);

      console.log("\nLivro encontrado:");
      console.table([livro]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar livro: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async atualizarLivro(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do livro a ser atualizado: ",
      );

      const id = Number(idInput.trim());

      const livroAtual = await this.livroController.buscarLivroPorId(id);

      console.log("\nDados atuais do livro:");
      console.table([livroAtual]);

      const tituloInput = await this.rl.question(
        `Digite o novo título (${livroAtual.titulo}): `,
      );

      const anoInput = await this.rl.question(
        `Digite o novo ano de publicação (${
          livroAtual.ano_publicacao ?? "não informado"
        }): `,
      );

      const generoInput = await this.rl.question(
        `Digite o novo gênero (${livroAtual.genero ?? "não informado"}): `,
      );

      const quantidadeInput = await this.rl.question(
        `Digite a nova quantidade em estoque (${livroAtual.quantidade_estoque}): `,
      );

      const autorIdInput = await this.rl.question(
        `Digite o novo ID do autor (${livroAtual.autor_id}): `,
      );

      const livro: Livro = {
        titulo: tituloInput.trim() || livroAtual.titulo,

        quantidade_estoque: quantidadeInput.trim()
          ? Number(quantidadeInput.trim())
          : livroAtual.quantidade_estoque,

        autor_id: autorIdInput.trim()
          ? Number(autorIdInput.trim())
          : livroAtual.autor_id,
      };

      const anoPublicacao = anoInput.trim()
        ? Number(anoInput.trim())
        : livroAtual.ano_publicacao;

      const genero = generoInput.trim() || livroAtual.genero;

      if (anoPublicacao !== undefined) {
        livro.ano_publicacao = anoPublicacao;
      }

      if (genero !== undefined) {
        livro.genero = genero;
      }

      const livroAtualizado = await this.livroController.atualizarLivro(
        id,
        livro,
      );

      console.log("\nLivro atualizado com sucesso:");
      console.table([livroAtualizado]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao atualizar livro: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }

  private async deletarLivro(): Promise<void> {
    try {
      const idInput = await this.rl.question(
        "Digite o ID do livro que deseja excluir: ",
      );

      const id = Number(idInput.trim());

      const livro = await this.livroController.buscarLivroPorId(id);

      console.log("\nLivro selecionado:");
      console.table([livro]);

      const confirmacao = await this.rl.question(
        "Tem certeza que deseja excluir este livro? (s/n): ",
      );

      if (confirmacao.trim().toLowerCase() !== "s") {
        console.log("\nExclusão cancelada.");
        return;
      }

      await this.livroController.deletarLivro(id);

      console.log("\nLivro excluído com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao excluir livro: ${error.message}`);
      } else {
        console.error("\nOcorreu um erro inesperado.");
      }
    } finally {
      await this.rl.question("\nPressione Enter para continuar...");
    }
  }
}
