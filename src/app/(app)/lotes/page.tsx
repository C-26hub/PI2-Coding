import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { getLotes } from "@/services/lotesService";
import { LotesTable } from "@/features/lotes/LotesTable";
import { Header } from "@/components/layout/Header";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem, 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"; 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LotesPage() {
  const lotes = await getLotes();

  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-80px)] p-4 md:p-4 pt-6 bg-[#F4F7F4]">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          <Card className="border-none shadow-md flex-1 flex flex-col">
            <CardContent className="py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-medium tracking-tight">
                Ciclo de Sementes
              </h1>
              <p className="text-sm font-sans mt-1 font-medium ">
                Gerencie a aquisição e distribuição dos lotes.
              </p>
            </div>

            <Button className="font-medium bg-[#4FA26F] hover:bg-[#266940] text-white shadow-sm flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Criar Novo Lote
            </Button>
          </div>

          
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 flex-1 w-full">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-4 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por código ou semente..."
                      className="pl-4 bg-transparent rounded-3xl border-2 border-[#4FA26F]"
                    />
                  </div>
                  Total: <strong>{lotes.length}</strong> lotes
                </div>

                <div className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* O asChild faz este botão ser o gatilho */}
                      <Button
                        variant="outline"
                        className="font-medium text-black border-[#DEDEDE] hover:bg-[#F4F7F4]"
                      >
                        Filtrar por Status:
                        <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {/* Aqui você coloca as opções. No futuro, pode adicionar lógica de filtro onClick */}
                      <DropdownMenuItem>Todos</DropdownMenuItem>
                      <DropdownMenuItem>Planejamento</DropdownMenuItem>
                      <DropdownMenuItem>Em Distribuição</DropdownMenuItem>
                      <DropdownMenuItem>Concluído</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Cancelado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* --- DROPDOWN DE SEMENTE --- */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="font-medium text-black border-[#DEDEDE] hover:bg-[#F4F7F4]"
                      >
                        Filtrar por Semente
                        <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrar por Tipo</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Todas</DropdownMenuItem>
                      <DropdownMenuItem>Milho Crioulo</DropdownMenuItem>
                      <DropdownMenuItem>Feijão</DropdownMenuItem>
                      <DropdownMenuItem>Sorgo</DropdownMenuItem>
                      <DropdownMenuItem>Fava</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <LotesTable data={lotes} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
