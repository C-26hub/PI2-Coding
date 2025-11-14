// src/services/lotesService.ts
import { Lote } from "@/types/Lote";
import { LoteDetalhado } from "@/types/Lote";

export const getLotes = async (): Promise<Lote[]> => {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      codigo: "FJN-25.11",
      semente: "Feijão",
      origem: "Banco Comunitário de Garanhuns",
      quantidade: 500,
      dataCadastro: "01/10/2025",
      status: "Em Distribuição",
    },
    {
      id: "2",
      codigo: "SRG-25.12",
      semente: "Sorgo",
      origem: "Compra Governamental (NF 12345)",
      quantidade: 2000,
      dataCadastro: "09/10/2025",
      status: "Planejamento",
    },
    {
      id: "3",
      codigo: "MLH-25.08",
      semente: "Milho Crioulo",
      origem: "Banco de Sementes de Sertânia",
      quantidade: 1500,
      dataCadastro: "15/04/2025",
      status: "Concluído",
    },
    {
      id: "4",
      codigo: "FV-25.09",
      semente: "Fava",
      origem: "Compra Governamental",
      quantidade: 300,
      dataCadastro: "20/08/2025",
      status: "Cancelado",
    },
  ];
};

export const getLoteById = async (id: string): Promise<LoteDetalhado | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: id,
    codigo: "FJN-25.11",
    semente: "Feijão",
    origem: "Banco Comunitário de Garanhuns",
    quantidade: 500,
    dataCadastro: "01/10/2025",
    status: "Em Distribuição",
    entregas: [
      {
        id: "101",
        beneficiario: "Maria Lúcia dos Santos",
        cidade: "Garanhuns",
        tecnico: "Jonas Pereira",
        status: "Entregue",
        dataEntrega: "12/10/2025",
      },
      {
        id: "102",
        beneficiario: "José Cícero Almeida",
        cidade: "Garanhuns",
        tecnico: "Jonas Pereira",
        status: "Pendente",
      },
      {
        id: "103",
        beneficiario: "Antônia da Silva",
        cidade: "Garanhuns",
        tecnico: "Carla Medeiros",
        status: "Pendente",
      },
      {
        id: "104",
        beneficiario: "João Batista",
        cidade: "Garanhuns",
        tecnico: "Jonas Pereira",
        status: "Entregue",
        dataEntrega: "11/10/2025",
      },
    ],
  };
};