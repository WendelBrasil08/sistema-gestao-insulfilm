import{ z } from "zod";
export const CriarClienteSchemas = z.object({
    nome: z.string().min(2,"Nome deve conter no mínimo 2 caracteres"),
    email: z.string().email("email inválido").optional(),
    whatsapp: z.string().min(10,"whatsapp inválido").optional(),
});

export const AtualizarClienteSchemas = z.object({
    nome: z.string().min(2,"Nome deve conter no mínimo 2 caracteres").optional(),
    email: z.string().email("email inválido").optional(),
    whatsapp: z.string().optional(),
});

export const ExcluirClienteSchemas = z.object({
    id: z.string(),
});

export type CriarClienteSchemasType = z.infer<typeof CriarClienteSchemas>;
export type AtualizarClienteSchemasType = z.infer<typeof AtualizarClienteSchemas>;
export type ExcluirClienteSchemasType = z.infer<typeof ExcluirClienteSchemas>;