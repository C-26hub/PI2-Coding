"use client";

import { CheckCircle, Clock, Image as ImageIcon } from "lucide-react";
import { Entrega } from "@/types/Lote";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DistributionTableProps {
  data: Entrega[];
}

export function DistributionTable({ data }: DistributionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-ecosy-blue">Beneficiário</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Cidade</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Técnico</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Status</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Data Entrega</TableHead>
            <TableHead className="text-right font-bold text-ecosy-blue">Comprovante</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.beneficiario}</TableCell>
              <TableCell>{item.cidade}</TableCell>
              <TableCell>{item.tecnico}</TableCell>
              <TableCell>
                <Badge 
                  className={item.status === "Entregue" 
                    ? "bg-ecosy-green hover:bg-ecosy-green-dark text-white border-none" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-none"}
                >
                  {item.status === "Entregue" ? (
                    <><CheckCircle className="w-3 h-3 mr-1"/> Entregue</>
                  ) : (
                    <><Clock className="w-3 h-3 mr-1"/> Pendente</>
                  )}
                </Badge>
              </TableCell>
              <TableCell>{item.dataEntrega || "-"}</TableCell>
              <TableCell className="text-right">
                {item.status === "Entregue" && (
                  <Button variant="ghost" size="sm" className="text-ecosy-blue">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Ver Foto
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}