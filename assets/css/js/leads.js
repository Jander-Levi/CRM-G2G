// leads.js
// Lógica completa do módulo de Leads

document.addEventListener("DOMContentLoaded", () => {
  inicializarColecoes();
  carregarLeads();
  configurarFormularioLead();
  configurarPesquisaLead();
});

function inicializarColecoes() {
  if (!StorageService.buscar("leads").length) {
    StorageService.salvar("leads", []);
  }

  if (!StorageService.buscar("atendimentos").length) {
    StorageService.salvar("atendimentos", []);
  }
}

function configurarFormularioLead() {
  const form = document.getElementById("formLead");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const lead = obterDadosFormulario();

    if (!validarLead(lead)) {
      alert("Preencha nome e telefone.");
      return;
    }

    if (lead.id) {
      atualizarLead(lead);
    } else {
      cadastrarLead(lead);
    }

    form.reset();
    document.getElementById("leadId").value = "";

    carregarLeads();
  });
}

function obterDadosFormulario() {
  const id = document.getElementById("leadId").value;

  return {
    id,
    nome: document.getElementById("nome").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    email: document.getElementById("email").value.trim(),
    origem: document.getElementById("origem").value,
    endereco: document.getElementById("endereco").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    cobertura: document.getElementById("cobertura").value,
    observacoes: document.getElementById("observacoes").value.trim(),
    status: id ? undefined : "novo",
    criadoEm: new Date().toISOString()
  };
}

function validarLead(lead) {
  return lead.nome !== "" && lead.telefone !== "";
}

function cadastrarLead(lead) {
  const novoLead = {
    ...lead,
    id: gerarId(),
    status: "novo",
    criadoEm: new Date().toISOString()
  };

  const leads = StorageService.buscar("leads");
  leads.push(novoLead);

  StorageService.salvar("leads", leads);

  alert("Lead cadastrado com sucesso.");
}

function atualizarLead(leadAtualizado) {
  const leads = StorageService.buscar("leads");

  const leadsAtualizados = leads.map((lead) => {
    if (lead.id === leadAtualizado.id) {
      return {
        ...lead,
        ...leadAtualizado,
        status: lead.status,
        criadoEm: lead.criadoEm,
        atualizadoEm: new Date().toISOString()
      };
    }

    return lead;
  });

  StorageService.salvar("leads", leadsAtualizados);

  alert("Lead atualizado com sucesso.");
}

function carregarLeads(filtro = "") {
  const tabela = document.getElementById("tabelaLeads");
  const leads = StorageService.buscar("leads");

  tabela.innerHTML = "";

  const leadsFiltrados = leads.filter((lead) => {
    const textoBusca = filtro.toLowerCase();

    return (
      lead.nome.toLowerCase().includes(textoBusca) ||
      lead.telefone.toLowerCase().includes(textoBusca) ||
      lead.bairro.toLowerCase().includes(textoBusca) ||
      lead.status.toLowerCase().includes(textoBusca)
    );
  });

  if (leadsFiltrados.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="7">Nenhum lead encontrado.</td>
      </tr>
    `;
    return;
  }

  leadsFiltrados.forEach((lead) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${lead.nome}</td>
      <td>${lead.telefone}</td>
      <td>${lead.origem}</td>
      <td>${lead.bairro}</td>
      <td>${formatarCobertura(lead.cobertura)}</td>
      <td>${formatarStatus(lead.status)}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-primary" onclick="enviarParaAtendimento('${lead.id}')">
            Atendimento
          </button>

          <button class="btn-warning" onclick="editarLead('${lead.id}')">
            Editar
          </button>

          <button class="btn-secondary" onclick="marcarSemCobertura('${lead.id}')">
            Sem Rede
          </button>

          <button class="btn-danger" onclick="excluirLead('${lead.id}')">
            Excluir
          </button>
        </div>
      </td>
    `;

    tabela.appendChild(linha);
  });
}

function editarLead(id) {
  const leads = StorageService.buscar("leads");
  const lead = leads.find((item) => item.id === id);

  if (!lead) {
    alert("Lead não encontrado.");
    return;
  }

  document.getElementById("leadId").value = lead.id;
  document.getElementById("nome").value = lead.nome;
  document.getElementById("telefone").value = lead.telefone;
  document.getElementById("email").value = lead.email;
  document.getElementById("origem").value = lead.origem;
  document.getElementById("endereco").value = lead.endereco;
  document.getElementById("bairro").value = lead.bairro;
  document.getElementById("cidade").value = lead.cidade;
  document.getElementById("cobertura").value = lead.cobertura;
  document.getElementById("observacoes").value = lead.observacoes;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function excluirLead(id) {
  const confirmar = confirm("Deseja realmente excluir este lead?");

  if (!confirmar) {
    return;
  }

  const leads = StorageService.buscar("leads");
  const leadsAtualizados = leads.filter((lead) => lead.id !== id);

  StorageService.salvar("leads", leadsAtualizados);

  carregarLeads();

  alert("Lead excluído com sucesso.");
}

function enviarParaAtendimento(id) {
  const leads = StorageService.buscar("leads");
  const lead = leads.find((item) => item.id === id);

  if (!lead) {
    alert("Lead não encontrado.");
    return;
  }

  const atendimentos = StorageService.buscar("atendimentos");

  const jaExiste = atendimentos.some((item) => item.leadId === id);

  if (jaExiste) {
    alert("Este lead já foi enviado para atendimento.");
    return;
  }

  const novoAtendimento = {
    id: gerarId(),
    leadId: lead.id,
    nomeLead: lead.nome,
    telefone: lead.telefone,
    origem: lead.origem,
    bairro: lead.bairro,
    cidade: lead.cidade,
    status: "aguardando_atendimento",
    criadoEm: new Date().toISOString()
  };

  atendimentos.push(novoAtendimento);

  StorageService.salvar("atendimentos", atendimentos);

  atualizarStatusLead(id, "atendimento");

  alert("Lead enviado para atendimento.");
  carregarLeads();
}

function marcarSemCobertura(id) {
  atualizarStatusLead(id, "sem_cobertura");

  alert("Lead marcado como sem cobertura.");
  carregarLeads();
}

function marcarVendaPerdida(id) {
  atualizarStatusLead(id, "venda_perdida");

  alert("Lead marcado como venda perdida.");
  carregarLeads();
}

function atualizarStatusLead(id, novoStatus) {
  const leads = StorageService.buscar("leads");

  const leadsAtualizados = leads.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        status: novoStatus,
        atualizadoEm: new Date().toISOString()
      };
    }

    return lead;
  });

  StorageService.salvar("leads", leadsAtualizados);
}

function configurarPesquisaLead() {
  const campoPesquisa = document.getElementById("pesquisaLead");

  campoPesquisa.addEventListener("input", (event) => {
    carregarLeads(event.target.value);
  });
}

function gerarId() {
  return crypto.randomUUID();
}

function formatarCobertura(cobertura) {
  if (cobertura === "sim") {
    return `<span class="badge badge-success">Sim</span>`;
  }

  if (cobertura === "nao") {
    return `<span class="badge badge-danger">Não</span>`;
  }

  return `<span class="badge badge-warning">Verificar</span>`;
}

function formatarStatus(status) {
  const textos = {
    novo: "Novo",
    atendimento: "Em atendimento",
    interessado: "Interessado",
    sem_cobertura: "Sem cobertura",
    venda_realizada: "Venda realizada",
    venda_perdida: "Venda perdida"
  };

  const classes = {
    novo: "badge-warning",
    atendimento: "badge-success",
    interessado: "badge-success",
    sem_cobertura: "badge-danger",
    venda_realizada: "badge-success",
    venda_perdida: "badge-danger"
  };

  return `
    <span class="badge ${classes[status] || "badge-warning"}">
      ${textos[status] || status}
    </span>
  `;
}