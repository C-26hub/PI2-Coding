// src/app/(app)/dashboard/page.tsx
import { KpiCard } from "@/features/dashboard/KpiCard";
import { AlertBanner } from "@/features/dashboard/AlertBanner";
import { getGestorDashboardData } from "@/services/dashboardService";

// Importe os ícones que o serviço mock vai usar
import {
  Users,
  Truck,
  Package,
  MapPin,
  BarChart2,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";

// Mapeia os nomes de string (do serviço) para os componentes de ícone
const iconMap = {
  Users: "/icons/users.svg",
  Truck: "/icons/truck.svg",
  Package: "/icons/seed.svg",
};

// --- Componentes Mockados (Apenas para este layout) ---
// (Você pode movê-los para /features/dashboard/ depois)
function GeoMapCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-ecosy-blue">
          Distribuição Geográfica
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-64 items-center justify-center rounded-md bg-ecosy-gray">
        <MapPin className="h-16 w-16 text-gray-400" />
        <p className="ml-4 text-gray-400">
          (Simulação do Mapa SVG de Pernambuco)
        </p>
      </CardContent>
    </Card>
  );
}

function ChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-ecosy-blue">
          Total Entregue por Semente
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-64 items-center justify-center rounded-md bg-ecosy-gray">
        <BarChart2 className="h-16 w-16 text-gray-400" />
        <p className="ml-4 text-gray-400">(Simulação do Gráfico de Barras)</p>
      </CardContent>
    </Card>
  );
}

function RecentActivityFeed({ activities }: { activities: any[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-heading text-ecosy-blue">
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex">
            <History className="h-4 w-4 mr-3 mt-1" />
            <div>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: act.text }}
              />
              <p className="text-xs text-muted-foreground">{act.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
// --- Fim dos Componentes Mockados ---

export default async function DashboardPage() {
  // 1. A página (Server Component) busca os dados
  const { kpis, alerts, activities } = await getGestorDashboardData();

  return (
    <>
      <Header />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-[#F4F7F4]">
        <div className="w-full max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-heading font-medium tracking-tight mb-[28px]">
            Painel de Controle
          </h1>

          {/* Grid Layout para KPIs */}
          <div className="grid gap-8 md:grid-cols-3">
            {kpis.map((kpi) => (
              <KpiCard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                icon={iconMap[kpi.iconName]} // Passa o componente do ícone
              />
            ))}
          </div>

          {/* Alert Banner */}
          <div className="py-2 my-[24px]">
            <AlertBanner alerts={alerts} />
          </div>

          {/* Main Content Grid (2 colunas) */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            {/* Coluna da Esquerda (Mapa e Gráfico) */}
            <div className="lg:col-span-4 space-y-4">
              <GeoMapCard />
              <ChartCard />
            </div>

            {/* Coluna da Direita (Atividades) */}
            <div className="lg:col-span-3">
              <RecentActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
