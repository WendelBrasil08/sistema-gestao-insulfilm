import { z } from "zod";

export const CriarUsuarioSchemas = z.object({
    nome: z.string().min(2,"Nome deve conter no mínimo 2 caracteres"),
    email: z.string().email("email inválido"),
    senha: z.string().min(6,"Senha deve conter no mínimo 6 caracteres"),
});

export const LoginSchemas = z.object({
    email: z.string().email("email inválido"),
    senha: z.string().min(6,"Senha deve conter no mínimo 6 caracteres"),
});