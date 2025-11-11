// src/features/dashboard/KpiCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface KpiCardProps {
  title: string;
  value: string;
  icon: string;
}

// Este é um componente reutilizável simples
export function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-base font-medium">{title}</span>
          <span className="text-3xl font-medium mt-2">{value}</span>
        </div>
        <Image
          src={icon}
          alt={`Ícone ${title}`}
          width={80} // Defina o tamanho base (geralmente 20px ou 24px para ícones)
          height={80}
          className="h-20 w-20" // Garante o tamanho visual via Tailwind
        />
      </CardContent>
    </Card>
  );
}
