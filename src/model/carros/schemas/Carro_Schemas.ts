import { z } from "zod";

export const CriarCarroSchemas = z.object({
    modelo: z.string().min(2,"Modelo deve conter no mínimo 2 caracteres"),
    marca: z.string().min(2,"Marca deve conter no mínimo 2 caracteres"),
    ano: z.coerce.number().min(1900,"Ano deve ser maior que 1900"),
    placa: z.string().min(7,"Placa deve conter no mínimo 7 caracteres"),
    clienteId: z.string(),
});

export const AtualizarCarroSchemas = z.object({
    modelo: z.string().min(2,"Modelo deve conter no mínimo 2 caracteres").optional(),
    marca: z.string().min(2,"Marca deve conter no mínimo 2 caracteres").optional(),
    ano: z.coerce.number().min(1900,"Ano deve ser maior que 1900").optional(),
    placa: z.string().min(7,"Placa deve conter no mínimo 7 caracteres").optional(),
});

export const ExcluirCarroSchemas = z.object({
    id: z.string(),
});

export type CriarCarroSchemasType = z.infer<typeof CriarCarroSchemas>;
export type AtualizarCarroSchemasType = z.infer<typeof AtualizarCarroSchemas>;
export type ExcluirCarroSchemasType = z.infer<typeof ExcluirCarroSchemas>;