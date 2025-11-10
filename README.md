# ![Logo Ecosy](./public/logo.svg) 

O **Ecosy** é uma plataforma digital para a gestão, distribuição e rastreabilidade do programa de aquisição de **sementes crioulas** em Pernambuco.

O sistema conecta gestores públicos, técnicos de campo e agricultores familiares, substituindo o controle manual (planilhas, papel) por um fluxo de trabalho digital, eficiente e transparente.

---

## ✨ Funcionalidades Principais

O sistema é dividido em duas frentes principais, com funcionalidades e permissões distintas para cada perfil de usuário.

### 🏛️ Portal Web (Ecosy Gestão) - Para Gestores e Técnicos
- **Autenticação Segura:** Sistema de login por Email/Senha para usuários (Gestores, Técnicos).  
- **Controle de Acesso (RBAC):** Visões e permissões diferentes para Gestores (acesso total) e Técnicos (acesso restrito aos seus beneficiários).  
- **Dashboard Analítico:** Tela inicial com KPIs (indicadores-chave), gráficos e um feed de atividades recentes.  
- **Gestão de Beneficiários:** CRUD (Criar, Ler, Atualizar, Deletar) de agricultores familiares.  
- **Gestão de Lotes:** CRUD de lotes de sementes, desde o cadastro (planejamento) até a conclusão da distribuição.  
- **Rastreabilidade de Entregas:** Acompanhamento em tempo real do progresso de um lote (ex: "65 de 87 entregas realizadas").  
- **Gestão de Usuários (Admin):** Tela de Configurações restrita onde Gestores podem cadastrar, editar e desativar contas de Técnicos.  


---

## 🛠️ Tecnologias Utilizadas (Stack)

### Front-end (Este Repositório)
- **Framework:** Next.js   
- **Linguagem:** TypeScript  
- **Estilização:** Tailwind CSS  
- **Componentes UI:** shadcn/ui   
- **Fontes:** Poppins (Padrão/Títulos) e Lato (Corpo)


---

## 📂 Arquitetura do Front-end

O front-end utiliza uma arquitetura baseada em **features** (Feature-Sliced Design) para organizar a lógica de negócios e manter os componentes desacoplados.

```
/src/
├── /app/                   # Rotas (App Router)
│   ├── /(auth)/            # Rotas de autenticação (ex: /login)
│   └── /(app)/             # Rotas protegidas (ex: /dashboard)
│       └── layout.tsx      # Layout que verifica a autenticação
│
├── /components/            # Componentes de UI "burros" e reutilizáveis
│   ├── /ui/                # Componentes do Shadcn (Button, Card, Input...)
│   └── /layout/            # Componentes de layout (Header, Sidebar)
│
├── /features/              # "Módulos" - A inteligência do app
│   ├── /auth/              # (ex: LoginForm.tsx)
│   └── /beneficiarios/     # (ex: BeneficiariosTable.tsx)
│
├── /services/              # Camada de abstração de dados (Mock / API)
│   ├── authService.ts
│   └── beneficiariosService.ts
│
├── /lib/                   # Utilitários (ex: lib/utils.ts do shadcn)

```

## ✅ Requisitos e Pré-requisitos

Antes de rodar o front-end do **Ecosy**, verifique se sua máquina atende aos requisitos abaixo.

**- Node.js**  
**- Git**

## 🚀 Como Rodar o Projeto (Front-end)

Este projeto utiliza **npm** (mas você pode usar yarn ou pnpm se preferir).

1. Clone o repositório:

```bash
git clone https://github.com/C-26hub/PI2-Front.git
cd PI2-Front
```

2. Instale as dependências:

```bash
npm install
```
3. Configure as variáveis de ambiente: (*DESCONSIDERAR NO MOMENTO*)

Obs: Inicialmente, o projeto irá usar dados mockados no /services/, então não é necessário um .env para a API. Este passo será necessário quando o backend for integrado.

4. Rode o servidor de desenvolvimento:

```
npm run dev
```

5. Abra http://localhost:3000
 no seu navegador.
