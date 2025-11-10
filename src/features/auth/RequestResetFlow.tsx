"use client"

import { useState } from "react"
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
import { Logo } from "@/components/layout/Logo"

type FormState = "form" | "success"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
})

export function RequestResetFlow() {
  const [formState, setFormState] = useState<FormState>("form")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // AQUI chama o BACKEND
    console.log("Enviando link de reset para:", values.email)
    
    
    setFormState("success")
  }

  if (formState === "success") {
    return (
      <Card className="w-full max-w-[600px] py-[60px] px-[60px] text-center">
        <CardHeader className="text-center">
          <Logo width={140} height={50} />
          <CardTitle className="text-2xl font-bold text-[#16424A]">
            🎉 Verifique seu Email!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6"> 
            Se uma conta com este email existir em nosso sistema,
            enviamos um link para você redefinir sua senha.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant="greenCustom"
            asChild
            className="w-full hover:bg-[#407554]"
          >
            <Link href="/">Voltar para o Login</Link>
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
          Esqueceu sua senha?
        </CardTitle>
         <CardDescription> 
          Digite seu email e enviaremos um link de redefinição.
        </CardDescription>
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
          </CardContent>
          <CardFooter>
            <Button
              variant="greenCustom"
              type="submit"
              className="w-full hover:bg-[#407554] mt-[60px]"
            >
              Enviar Link
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}