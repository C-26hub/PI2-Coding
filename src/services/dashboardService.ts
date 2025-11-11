// src/services/dashboardService.ts
import { AlertData } from "@/features/dashboard/AlertBanner";

// Interface para os dados do KPI
export interface KpiData {
  title: string;
  value: string;
  iconName: "Users" | "Truck" | "Package"; // Usamos nomes de ícone como string
}

// Interface para a atividade recente
export interface Activity {
  id: string;
  text: string;
  time: string;
}

// Mock da API do Gestor
export const getGestorDashboardData = async () => {
  // Simula o delay da rede
  await new Promise(resolve => setTimeout(resolve, 500));

  const kpis: KpiData[] = [
    { title: 'Beneficiários Ativos', value: '1.854', iconName: 'Users' },
    { title: 'Lotes em Distribuição', value: '21', iconName: 'Truck' },
    { title: 'Sementes Entregues (30d)', value: '8.940 kg', iconName: 'Package' },
  ];
  
  const alerts: AlertData[] = [
    { id: '1', message: 'Lote MLH-25.08 com 4 entregas atrasadas.' },
    { id: '2', message: 'Erro na sincronização do técnico Jonas Pereira.' },
  ];

  const activities: Activity[] = [
    { id: 'a1', text: 'Jonas Pereira confirmou a entrega para Maria Lúcia.', time: 'há 15 minutos' },
    { id: 'a2', text: 'Você criou o Lote SRG-25.12.', time: 'há 2 horas' },
  ];

  return { kpis, alerts, activities };
};