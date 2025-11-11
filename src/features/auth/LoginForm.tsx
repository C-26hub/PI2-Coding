"use client"
import { Logo } from "@/components/layout/Logo";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

// 1. Defina o schema de validação com Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  senha: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres.",
  }),
})

export function LoginForm() {
  
  // 2. Defina o formulário usando react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  })

  // 3. Defina o handler de submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    // AQUI é onde você fará a chamada para o backend (AuthService)
    // Por enquanto, vamos apenas logar os dados
    console.log("Dados do Login:", values)
    // (Simulando uma chamada de API...)
  }

  return (
    <Card className="w-full max-w-[600px] py-[60px] px-[60px]">
      <CardHeader className="text-center">
        <Logo width={140} height={50} />
        <CardTitle className="text-2xl font-bold text-[#16424A]">
          Acesse sua conta
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ana.cecilia@ipa.pe.gov.br" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Senha</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-[32px] mb-[40px]">
              <Link
                href="/esqueci-minha-senha" // (Você precisará criar esta página)
                className="text-sm font-medium text-[#4D8965] hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard" className="w-full  hover:bg-[#407554]">
            <Button
              variant="greenCustom"
              type="submit"
              className="w-full  hover:bg-[#407554]"
              
            >
              Entrar
            </Button>
            </Link>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}