import { z } from "zod";

export const CriarEstoqueItemSchema = z.object({
    nome: z.string().min(2,"Nome deve conter pelo menos 2 caracteres"),
    tipo: z.string().min(2,"Tipo deve conter pelo menos 2 caracteres"),
    quantidade: z.number().min(0, "Quantidade deve ser um número não negativo"),
    quantidade_minima: z.number().min(0,"Quantidade mínima deve ser um número não negativo"),
    unidade: z.string().min(1,"Unidade deve conter pelo menos 1 caractere"),
    valor_unitario: z.number().positive("Valor unitário deve ser um número não negativo"),
});

export const AtualizarEstoqueItemSchema = z.object({
    nome: z.string().min(2,"Nome deve conter pelo menos 2 caracteres").optional(),
    tipo: z.string().min(2,"Tipo deve conter pelo menos 2 caracteres").optional(),
    quantidade_minima: z.coerce.number().min(0,"Quantidade mínima deve ser um número não negativo").optional(),
    unidade: z.string().min(1,"Unidade deve conter pelo menos 1 caractere").optional(),
    valor_unitario: z.coerce.number().positive("Valor unitário deve ser um número não negativo").optional(),
});

export const EntradaEstoqueSchema = z.object({
    quantidade: z.coerce.number().positive("Quantidade deve ser um número positivo"),
    motivo: z.string().min(5,"Motivo deve conter pelo menos 5 caracteres"),
});

export const BaixaEstoqueSchema = z.object({
    quantidade: z.coerce.number().positive("Quantidade deve ser um número positivo"),
    motivo: z.string().min(2,"Motivo deve conter pelo menos 5 caracteres"),
});