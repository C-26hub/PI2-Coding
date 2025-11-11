// src/features/dashboard/AlertBanner.tsx
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Definimos o tipo de Alerta que esperamos
export interface AlertData {
  id: string;
  message: string;
}

interface AlertBannerProps {
  alerts: AlertData[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  // Se não houver alertas, não renderize nada
  if (alerts.length === 0) return null;

  return (
    <Alert variant="destructive" className="border-none bg-[#FFF3C4] text-black py-[32px]">
      <AlertTitle className="font-heading text-xl font-semibold">
        Ações Imediatas ({alerts.length})
      </AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5">
          {alerts.map(alert => (
            <li key={alert.id}>{alert.message}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}