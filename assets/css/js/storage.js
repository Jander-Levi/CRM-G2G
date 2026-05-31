// storage.js
// Responsável por salvar, buscar, editar e excluir dados no localStorage

const StorageService = {
  salvar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
  },

  buscar(chave) {
    const dados = localStorage.getItem(chave);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  },

  adicionar(chave, item) {
    const dados = this.buscar(chave);

    dados.push(item);

    this.salvar(chave, dados);
  },

  atualizar(chave, id, novosDados) {
    const dados = this.buscar(chave);

    const dadosAtualizados = dados.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...novosDados
        };
      }

      return item;
    });

    this.salvar(chave, dadosAtualizados);
  },

  excluir(chave, id) {
    const dados = this.buscar(chave);

    const dadosFiltrados = dados.filter((item) => item.id !== id);

    this.salvar(chave, dadosFiltrados);
  },

  limpar(chave) {
    localStorage.removeItem(chave);
  }
};