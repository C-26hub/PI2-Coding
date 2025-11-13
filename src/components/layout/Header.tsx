"use client";

import Link from "next/link";
import { Menu, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

// 1. Definimos as listas de links separadas
const gestorLinks = [
  { href: "/dashboard", label: "Painel de Controle" },
  { href: "/beneficiarios", label: "Beneficiários" },
  { href: "/lotes", label: "Ciclo de Sementes" },
  { href: "/relatorios", label: "Relatórios" },
  { href: "/configuracoes", label: "Configurações" },
];

const tecnicoLinks = [
  { href: "/meu-painel", label: "Meu Painel" },
  { href: "/meus-beneficiarios", label: "Meus Beneficiários" },
  { href: "/minhas-entregas", label: "Minhas Entregas" },
];

export function Header() {
  const pathname = usePathname();

  // --- DADOS MOCKADOS ---
  const user = {
    name: "Ana Cecília",
    email: "ana.cecilia@ipa.pe.gov.br",
    role: "gestor" as "gestor" | "tecnico",
  };

  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const navLinks = user.role === "gestor" ? gestorLinks : tecnicoLinks;

  return (
    <header className="flex h-[80px] items-center border-b bg-white w-full max-w-[1200px] mx-auto px-6">
      <Link href="/dashboard">
        <Logo width={120} height={50} />
      </Link>

      {/* Menu de Navegação Dinâmico */}
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-6 h-full">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                // --- ESTILIZAÇÃO BASE MANTIDA ---
                "relative h-full flex items-center text-sm font-medium transition-colors text-[#2F2F2F]",               
                // --- A ANIMAÇÃO DA LINHA ---
                "after:content-[''] after:absolute after:left-0 after:bottom-5 after:h-[3px] after:bg-[#4D8965] after:transition-all after:duration-300",

                isActive
                  ? "after:w-full font-semibold text-ecosy-green" 
                  : "after:w-0 hover:after:w-full hover:text-ecosy-green"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Menu do Usuário */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-11 w-11 rounded-[16px] bg-[#4FA26F] hover:bg-[#266940] text-[20px] font-light cursor-pointer text-white"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-transparent font-heading text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none font-heading">
                {user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              <p className="text-xs font-bold text-ecosy-green uppercase mt-1">
                {user.role}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/perfil">
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}