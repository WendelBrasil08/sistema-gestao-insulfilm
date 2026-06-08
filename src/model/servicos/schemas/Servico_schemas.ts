import { z } from "zod";
import { ServicoStatus} from "../dtos/ServicoDTOs";

export const CriarServicoSchemas = z.object({
    clienteId: z.string().uuid("ID do cliente Inválido"),
    carroId: z.string().uuid("ID do carro Inválido"),
    observacoes: z.string().max(200, "Observações devem conter no máximo 200 caracteres").optional(),
    tipo_insulfilm: z.string().min(2, "Tipo de insulfilm deve conter no mínimo 2 caracteres").max(100, "Tipo de insulfilm deve conter no máximo 100 caracteres"),
    metragem_usada: z.coerce.number().positive("Metragem usada deve ser um número positivo"),
    mao_de_obra: z.coerce.number().min(0,"Mão de obra deve ser um número positivo"),
    valor_total: z.coerce.number().positive("Valor total deve ser um número positivo"),
});

export const AtualizarServicoSchemas = z.object({
    observacoes: z.string().max(200, "Observações devem conter no máximo 200 caracteres").optional(),
    tipo_insulfilm: z.string().min(2, "Tipo de insulfilm deve conter no mínimo 2 caracteres").max(100, "Tipo de insulfilm deve conter no máximo 100 caracteres").optional(),
    metragem_usada: z.coerce.number().positive("Metragem usada deve ser um número positivo").optional(),
    mao_de_obra: z.coerce.number().min(0,"Mão de obra deve ser um número positivo").optional(),
    valor_total: z.coerce.number().positive("Valor total deve ser um número positivo").optional(),
});

export const AtualizarStatusSchema = z.object({
  status: z.nativeEnum(ServicoStatus, {
    message: 'Status inválido. Use: Em análise, Em reparo/aplicação, Pronto ou Entregue'
  })
})