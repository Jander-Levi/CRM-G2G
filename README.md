# CRM PROVEDOR DE INTERNET

## Visão Geral

Sistema CRM completo para gestão de Leads, Atendimento Comercial, Vendas, Instalações, Clientes, Upgrades, Serviços Adicionais e Relatórios Gerenciais para provedores de internet.

---

# Objetivo do Projeto

Centralizar todo o ciclo de relacionamento com o cliente:

Lead → Atendimento → Venda → Instalação → Cliente Ativo → Upgrade → Serviços Adicionais → Relatórios

---

# Roadmap de Desenvolvimento

## FASE 1 — Planejamento

### Objetivo

Definir toda a estrutura do sistema antes de iniciar o desenvolvimento.

### Atividades

* Criar fluxograma do CRM
* Definir módulos
* Definir telas
* Definir regras de negócio
* Definir níveis de acesso

### Resultado Esperado

Ter uma visão completa do sistema antes de escrever código.

---

# FASE 2 — Estrutura Base do Projeto

### Objetivo

Montar a base visual do sistema.

### Criar

```text
Projeto/
│
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── icons/
│
├── pages/
│
└── components/
```

### Desenvolver

* Menu lateral
* Cabeçalho
* Rodapé
* Sistema de navegação
* Layout responsivo

### Resultado Esperado

Sistema navegável entre páginas.

---

# FASE 3 — Dashboard

### Objetivo

Criar a tela principal do CRM.

### Componentes

* Cards de indicadores
* Gráficos
* Resumos operacionais

### Indicadores

* Total de Leads
* Leads Atendidos
* Vendas Realizadas
* Vendas Perdidas
* Instalações Pendentes
* Clientes Ativos
* Upgrades
* Serviços Adicionais

### Resultado Esperado

Dashboard visual funcionando com dados simulados.

---

# FASE 4 — Módulo Leads

### Objetivo

Criar o primeiro módulo operacional.

### Funcionalidades

* Cadastro
* Edição
* Exclusão
* Pesquisa
* Filtros

### Campos

* Nome
* Telefone
* Email
* Origem
* Endereço
* Bairro
* Cidade
* CEP

### Resultado Esperado

Gestão completa de leads.

---

# FASE 5 — Verificação de Cobertura

### Objetivo

Controlar locais atendidos.

### Funcionalidades

* Consultar endereço
* Informar se possui rede
* Registrar local sem cobertura

### Resultado Esperado

Separação automática entre oportunidades viáveis e não viáveis.

---

# FASE 6 — Atendimento Comercial

### Objetivo

Registrar todo contato comercial.

### Funcionalidades

* Registrar atendente
* Registrar interesse
* Histórico de atendimento
* Observações

### Fluxo

```text
Lead
↓
Atendimento
↓
Interessado?
```

### Resultado Esperado

Controle comercial completo.

---

# FASE 7 — Motivos de Perda

### Objetivo

Controlar perdas comerciais.

### Motivos

* Concorrência
* Preço
* Sem interesse
* Sem cobertura
* Outro

### Resultado Esperado

Relatório de perdas.

---

# FASE 8 — Vendas

### Objetivo

Registrar contratos fechados.

### Funcionalidades

* Registrar venda
* Plano vendido
* Valor
* Vendedor
* Data

### Resultado Esperado

Controle de conversão comercial.

---

# FASE 9 — Instalações

### Objetivo

Controlar agenda técnica.

### Funcionalidades

* Agendamento
* Reagendamento
* Cancelamento
* Conclusão

### Status

* Agendada
* Pendente
* Reagendada
* Instalada
* Cancelada

### Resultado Esperado

Controle operacional.

---

# FASE 10 — Clientes

### Objetivo

Transformar vendas instaladas em clientes ativos.

### Funcionalidades

* Cadastro automático
* Histórico
* Plano atual
* Situação do cliente

### Resultado Esperado

Base de clientes ativa.

---

# FASE 11 — Upgrades

### Objetivo

Controlar migração de planos.

### Funcionalidades

* Upgrade
* Downgrade
* Fidelização
* Histórico

### Resultado Esperado

Aumento de ticket médio.

---

# FASE 12 — Serviços Adicionais

### Objetivo

Registrar vendas complementares.

### Exemplos

* IP Fixo
* Mesh Wi-Fi
* TV
* Telefonia
* Câmeras

### Resultado Esperado

Controle de receita adicional.

---

# FASE 13 — Relatórios

### Objetivo

Criar inteligência de negócio.

### Relatórios

* Conversão de Leads
* Vendas por Vendedor
* Instalações
* Motivos de Perda
* Clientes Ativos
* Upgrades
* Receita Mensal

### Resultado Esperado

Tomada de decisão baseada em dados.

---

# FASE 14 — Regras de Negócio

### Objetivo

Automatizar processos.

### Regras

Lead interessado:

```text
Lead
↓
Atendimento
↓
Venda
↓
Instalação
↓
Cliente Ativo
```

Lead perdido:

```text
Lead
↓
Atendimento
↓
Motivo da Perda
```

### Resultado Esperado

Fluxos automáticos.

---

# FASE 15 — Testes Locais

### Objetivo

Validar todo o sistema sem banco de dados.

### Utilizar

* Arrays JavaScript
* LocalStorage

### Testar

* Cadastros
* Edições
* Exclusões
* Filtros
* Navegação

### Resultado Esperado

Sistema 100% funcional localmente.

---

# FASE 16 — Banco de Dados (ÚLTIMA ETAPA)

### Objetivo

Persistência dos dados.

### Firebase

* Authentication
* Firestore
* Hosting

### Coleções

```text
usuarios
leads
atendimentos
vendas
instalacoes
clientes
upgrades
servicosAdicionais
motivosPerda
```

### Resultado Esperado

Sistema online e sincronizado.

---

# FASE 17 — Login e Segurança

### Recursos

* Login Google
* Login por Email
* Controle de acesso
* Perfis de usuário

### Perfis

* Administrador
* Supervisor
* Comercial
* Técnico

---

# FASE 18 — Publicação

### Deploy

* Firebase Hosting

### Domínio

* Domínio próprio
* SSL
* Backup

### Resultado Esperado

Sistema em produção.

---

# Ordem Recomendada de Desenvolvimento

```text
1. Layout
2. Menu Lateral
3. Dashboard
4. Leads
5. Cobertura
6. Atendimento
7. Motivos de Perda
8. Vendas
9. Instalações
10. Clientes
11. Upgrades
12. Serviços Adicionais
13. Relatórios
14. Regras de Negócio
15. Testes
16. Firebase
17. Login
18. Publicação
```

---

# Tecnologias

Frontend:

* HTML5
* CSS3
* JavaScript
* Bootstrap 5

Dashboard:

* Chart.js

Backend:

* Firebase Firestore

Autenticação:

* Firebase Authentication

Hospedagem:

* Firebase Hosting

---

# Desenvolvido por

Levih Enterprise Solutions © 2026
