import { RequestResetFlow } from "@/features/auth/RequestResetFlow"; 

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[url('/images/login-bg.jpg')] bg-cover bg-center p-4">
      <RequestResetFlow />
    </main>
  );
}