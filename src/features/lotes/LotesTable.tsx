"use client";

import { Edit, Truck, Eye, MoreHorizontal } from "lucide-react";
import { Lote, LoteStatus } from "@/types/Lote";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LotesTableProps {
  data: Lote[];
}

// Função auxiliar para definir a cor do Badge baseada no status
const getStatusColor = (status: LoteStatus) => {
  switch (status) {
    case "Planejamento":
      return "bg-[#DEDEDE]"; 
    case "Em Distribuição":
      return "bg-[#AEDDFF]"; 
    case "Concluído":
      return "bg-[#EEFFAE]"; 
    case "Cancelado":
      return "bg-[#FFAEAE]"; 
    default:
      return "bg-gray-500";
  }
};

export function LotesTable({ data }: LotesTableProps) {
  const router = useRouter();

  const handleRowClick = (loteId: string) => {
    router.push(`/lotes/${loteId}`);
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-ecosy-blue">Código</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Semente</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Origem</TableHead>
            <TableHead className="font-bold text-ecosy-blue text-right">
              Qtd. (kg)
            </TableHead>
            <TableHead className="font-bold text-ecosy-blue">
              Cadastro
            </TableHead>
            <TableHead className="font-bold text-ecosy-blue">Status</TableHead>
            <TableHead className="text-right font-bold text-ecosy-blue">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((lote) => (
            <TableRow
              key={lote.id}
              onClick={() => handleRowClick(lote.id)}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium">{lote.codigo}</TableCell>
              <TableCell>{lote.semente}</TableCell>
              <TableCell className="">{lote.origem}</TableCell>
              <TableCell className="text-right">
                {lote.quantidade.toLocaleString("pt-BR")}
              </TableCell>
              <TableCell>{lote.dataCadastro}</TableCell>
              <TableCell>
                <Badge
                  className={`${getStatusColor(
                    lote.status
                  )} text-[#2F2F2F] border-none`}
                >
                  {lote.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {/* Botões de Ação Rápidos */}
                <div className="flex justify-end gap-2">
                  {/* Rastrear (Só aparece se estiver em distribuição ou concluído) */}
                  {(lote.status === "Em Distribuição" ||
                    lote.status === "Concluído") && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Rastrear Lote"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Clicou em Rastrear"); // Sua lógica futura aqui
                      }}
                    >
                      <Truck className="h-4 w-4 text-ecosy-blue" />
                    </Button>
                  )}

                  {/* Editar (Só aparece se não estiver cancelado) */}
                  {lote.status !== "Cancelado" &&
                    lote.status !== "Concluído" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Editar Lote"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Clicou em Editar");
                        }}
                      >
                        <Edit className="h-4 w-4 text-ecosy-blue" />
                      </Button>
                    )}

                  {/* Ver Detalhes (Sempre aparece) */}
                  {lote.status === "Concluído" && (
                    <Button variant="ghost" size="icon" title="Ver Histórico">
                      <Eye className="h-4 w-4 text-ecosy-blue" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
