document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema() {
  inicializarDados();
  carregarDashboard();
  configurarMenu();
}

function inicializarDados() {
  const leads = StorageService.buscar("leads");

  if (!leads.length) {
    StorageService.salvar("leads", []);
  }

  const clientes = StorageService.buscar("clientes");

  if (!clientes.length) {
    StorageService.salvar("clientes", []);
  }

  const vendas = StorageService.buscar("vendas");

  if (!vendas.length) {
    StorageService.salvar("vendas", []);
  }

  const instalacoes = StorageService.buscar("instalacoes");

  if (!instalacoes.length) {
    StorageService.salvar("instalacoes", []);
  }
}

function carregarDashboard() {
  const leads = StorageService.buscar("leads");
  const vendas = StorageService.buscar("vendas");
  const clientes = StorageService.buscar("clientes");
  const instalacoes = StorageService.buscar("instalacoes");

  atualizarCard("totalLeads", leads.length);

  atualizarCard(
    "vendasRealizadas",
    vendas.filter(v => v.status === "realizada").length
  );

  atualizarCard(
    "instalacoesPendentes",
    instalacoes.filter(i => i.status === "pendente").length
  );

  atualizarCard(
    "clientesAtivos",
    clientes.filter(c => c.status === "ativo").length
  );
}

function atualizarCard(id, valor) {
  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.textContent = valor;
  }
}

function configurarMenu() {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(link => {
        link.classList.remove("active");
      });

      item.classList.add("active");
    });
  });
}