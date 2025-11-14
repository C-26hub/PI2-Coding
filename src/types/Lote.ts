// Define os status possíveis para garantir a tipagem
export type LoteStatus = "Planejamento" | "Em Distribuição" | "Concluído" | "Cancelado";

export interface Lote {
  id: string;
  codigo: string;      // Ex: "FJN-25.11"
  semente: string;     // Ex: "Feijão"
  origem: string;      // Ex: "Compra Governamental"
  quantidade: number;  // Ex: 500 (kg)
  dataCadastro: string; // Ex: "12/10/2025"
  status: LoteStatus;
}

export interface Entrega {
  id: string;
  beneficiario: string;
  cidade: string;
  tecnico: string;
  status: "Pendente" | "Entregue";
  dataEntrega?: string;
}

export interface LoteDetalhado extends Lote {
  entregas: Entrega[];
}