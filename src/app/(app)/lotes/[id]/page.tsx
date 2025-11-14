import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  Package,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react";
import { getLoteById } from "@/services/lotesService";
import { DistributionTable } from "@/features/lotes/DistributionTable";
import { Header } from "@/components/layout/Header";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card"; // Removi CardHeader/Title pois faremos na mão
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface LoteDetailsPageProps {
  params: { id: string };
}

function LoteStepper({ status }: { status: string }) {
  const steps = ["Cadastro", "Planejamento", "Em Distribuição", "Concluído"];
  const currentStepIndex = steps.indexOf(status);

  return (
    <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto my-4">
      {/* Linha de Fundo */}
      <div className="absolute left-0 top-1/2 h-1 w-full bg-gray-200 -z-10 rounded-full" />

      {/* Passos */}
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        // Atual se for IGUAL
        const isCurrent = index === currentStepIndex;

        return (
          <div key={step} className="flex flex-col items-center  px-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                isCompleted
                  ? "bg-[#B8CF5F] border-[#B8CF5F] text-white"
                  : isCurrent
                  ? "bg-[#63BEFF] text-white font-bold"
                  : "bg-[#CCCCCC] border-gray-300 text-white"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            <span
              className={`text-xs mt-2 font-medium ${
                isCurrent ? "text-ecosy-green font-bold" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Planejamento":
      return "bg-gray-200 text-black hover:bg-gray-300";
    case "Em Distribuição":
      return "bg-[#AEDDFF] text-black hover:bg-[#93C5FD]"; // Azul claro
    case "Concluído":
      return "bg-ecosy-green text-black hover:bg-ecosy-green-dark"; // Verde
    case "Cancelado":
      return "bg-red-100 text-black hover:bg-red-200"; // Vermelho
    default:
      return "bg-gray-100 text-black";
  }
};

export default async function LoteDetailsPage({
  params,
}: LoteDetailsPageProps) {
  const lote = await getLoteById(params.id);

  if (!lote) return <div>Lote não encontrado</div>;

  const totalEntregas = lote.entregas.length;
  const entregasRealizadas = lote.entregas.filter(
    (e) => e.status === "Entregue"
  ).length;
  const progresso = Math.round((entregasRealizadas / totalEntregas) * 100) || 0;

  return (
    <>
      <Header />

      <main className="flex flex-col p-4 md:p-8 pt-6 bg-[#F4F7F4]">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          <Card className="border-none shadow-md flex-1 flex flex-col overflow-hidden">
            <CardContent className="p-8 flex-1 overflow-y-auto">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-gray-100 rounded-full"
                >
                  <Link href="/lotes">
                    <ArrowLeft className="h-6 w-6 text-ecosy-blue" />
                  </Link>
                </Button>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-heading font-bold text-ecosy-blue">
                    Lote {lote.codigo} - {lote.semente}
                  </h1>
                  <Badge className={`${getStatusColor(lote.status)} border-none text-sm px-3 py-1`}>
                    {lote.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="border rounded-lg p-6 md:col-span-2 bg-white">
                  <h3 className="text-lg font-heading font-semibold text-ecosy-blue mb-4">
                    Resumo do Lote
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-ecosy-green mt-1" />
                      <div>
                        <p className="text-sm font-semibold">Tipo de Semente</p>
                        <p className="font-medium text-[#707070]">
                          {lote.semente}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-ecosy-green mt-1" />
                      <div>
                        <p className="text-sm font-semibold">Origem</p>
                        <p className="font-medium text-[#707070]">
                          {lote.origem}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-ecosy-green mt-1" />
                      <div>
                        <p className="text-sm font-semibold">
                          Data de Aquisição
                        </p>
                        <p className="font-medium text-[#707070]">
                          {lote.dataCadastro}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-ecosy-green mt-1" />
                      <div>
                        <p className="text-sm font-semibold">
                          Quantidade Total
                        </p>
                        <p className="font-medium text-[#707070]">
                          {lote.quantidade} kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-semibold text-ecosy-blue mb-4">
                    Progresso
                  </h3>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-4xl font-semibold text-[#7B94E5]">
                      {progresso}%
                    </span>
                    <span className="text-sm text-[#707070] font-medium mb-1">
                      Concluído
                    </span>
                  </div>

                  <Progress
                    value={progresso}
                    className="h-3 bg-[#EDEDED] [&>div]:bg-[#7B94E5]"
                  />

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#7B94E5]" />{" "}
                        Entregue
                      </span>
                      <span className="font-semibold text-ecosy-blue">
                        {entregasRealizadas}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#EDEDED]" />{" "}
                        Pendente
                      </span>
                      <span className="font-bold text-ecosy-blue">
                        {totalEntregas - entregasRealizadas}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span>{totalEntregas} Beneficiários</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. LINHA DO TEMPO (STEPPER) */}
              {/* Container cinza para destacar no fundo branco */}
              <div className="mb-10 px-4 py-6 rounded-lg border  border-gray-300">
                <h3 className="text-lg font-heading font-semibold text-ecosy-blue mb-4">
                  Etapas de entrega
                </h3>
                <LoteStepper status={lote.status} />
              </div>

              {/* 4. TABELA DE DISTRIBUIÇÃO */}
              <div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-semibold text-ecosy-blue">
                    Beneficiários Associados
                  </h3>

                  {lote.status === "Planejamento" && (
                    <Button
                      variant="outline"
                      className="text-ecosy-blue border-ecosy-green hover:bg-green-50"
                    >
                      + Associar Beneficiários
                    </Button>
                  )}
                </div>

                {/* Barra de Filtros */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-4 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar nesta lista..."
                      className="pl-4 rounded-3xl border-2 border-[#4FA26F] focus-visible:ring-0 focus-visible:border-[#4FA26F]"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-ecosy-blue"
                  >
                    <Filter className="mr-2 h-4 w-4" /> Filtrar Status
                  </Button>
                </div>

                {/* Tabela */}
                <DistributionTable data={lote.entregas} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
