"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/layout/Logo"


const formSchema = z.object({
  novaSenha: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres.",
  }),
  confirmarSenha: z.string()
}).refine(data => data.novaSenha === data.confirmarSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarSenha"],
});

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") // Pega o token da URL

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      novaSenha: "",
      confirmarSenha: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // AQUI CHAMA O BACKEND
    console.log("Token:", token)
    console.log("Nova Senha:", values.novaSenha)
    
    alert("Senha redefinida com sucesso! Você será redirecionado para o login.")
    router.push("/login")
  }

  if (!token) {
    return (
      <Card className="w-full max-w-[600px] py-[60px] px-[60px] text-center">
        <CardHeader>
          <Logo width={140} height={50} />
          <CardTitle className="text-2xl font-bold text-red-600">
            Link Inválido ou Expirado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Este link de redefinição de senha não é válido.
            Por favor, solicite um novo link.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="greenCustom" asChild className="w-full hover:bg-[#407554]">
            <Link href="/esqueci-minha-senha">Solicitar Novo Link</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-[600px] py-[60px] px-[60px]">
      <CardHeader className="text-center">
        <Logo width={140} height={50} />
        <CardTitle className="text-2xl font-bold text-[#16424A]">
          Crie sua Nova Senha
        </CardTitle>
         <CardDescription>
          Digite e confirme sua nova senha de acesso.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="novaSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Nova Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmarSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-[32px] mb-[40px]">
              <Link
                href="/login"
                className="text-sm font-medium text-[#4D8965] hover:underline"
              >
                Lembrou a senha? Voltar ao login
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="greenCustom"
              type="submit"
              className="w-full hover:bg-[#407554]"
            >
              Redefinir Senha e Entrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}