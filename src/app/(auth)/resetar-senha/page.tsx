import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";
import { Suspense } from "react";

// Opcional: Crie um componente de fallback (carregamento)
function LoadingFallback() {
  return <div>A carregar...</div>
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[url('/images/login-bg.jpg')] bg-cover bg-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}