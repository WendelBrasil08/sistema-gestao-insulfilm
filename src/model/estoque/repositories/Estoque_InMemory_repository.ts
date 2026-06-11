import type { IEstoqueRepository } from "./IEstoque_repository";
import { randomUUID } from "crypto";
import {
    tipo_movimento,
    type MovimentoEstoqueDTO,
    type CriarEstoqueItemDTO,
    type AtualizarEstoqueItemDTO,
    type EstoqueItemDTO,
    type BaixaEstoqueDTO,
    type EntradaEstoqueDTO
} from "../dtos/EstoqueDTOs";

export class EstoqueInMemoryRepository implements IEstoqueRepository {
    private estoque: EstoqueItemDTO[] = [];
    private historico: MovimentoEstoqueDTO[] = [];

    async criar(data: CriarEstoqueItemDTO): Promise<EstoqueItemDTO> {
        const estoqueItem: EstoqueItemDTO = {
            id: randomUUID(),
            nome: data.nome,
            tipo: data.tipo,
            quantidade: data.quantidade,
            quantidade_minima: data.quantidade_minima,
            unidade: data.unidade,
            valor_unitario: data.valor_unitario,
            criado_em: new Date(),
            atualizado_em: new Date(),
        };
        this.estoque.push(estoqueItem);
        return estoqueItem;
    }

    async listar(): Promise<EstoqueItemDTO[]> {
        return this.estoque;
    }
    async excluir(id: string): Promise<void> {
        const index = this.estoque.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Item de estoque não encontrado");
        this.estoque.splice(index, 1);
    }
    async BuscarPorId(id: string): Promise<EstoqueItemDTO | null> {
        return this.estoque.find(item => item.id === id) || null;
    }
    async atualizar(id: string, data: AtualizarEstoqueItemDTO): Promise<EstoqueItemDTO> {
        const index = this.estoque.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Item de estoque não encontrado");
        this.estoque[index] = { ...this.estoque[index]!, ...data, atualizado_em: new Date() };
        return this.estoque[index]!;
    }
    async registrarEntrada(id: string, data: EntradaEstoqueDTO): Promise<EstoqueItemDTO> {
        const index = this.estoque.findIndex(e => e.id === id);
        if(index === -1) throw new Error ("Item do estoque não encontrado")

        this.estoque[index] = {
            ...this.estoque[index]!,
            quantidade: this.estoque[index]!.quantidade + data.quantidade,
            atualizado_em: new Date()
        }
        this.historico.push({
            id: randomUUID(),
            materialId: id,
            tipo: tipo_movimento.ENTRADA,
            quantidade: data.quantidade,
            motivo: data.motivo,
            criado_em: new Date()
  })

  return this.estoque[index]!
}
            
    async registrarBaixa(id: string, data: BaixaEstoqueDTO): Promise<EstoqueItemDTO> {
        const index = this.estoque.findIndex(e => e.id === id);
        if(index === -1) throw new Error ("Item do estoque não encontrado")

        this.estoque[index] = {
            ...this.estoque[index]!,
            quantidade: this.estoque[index]!.quantidade - data.quantidade,
            atualizado_em: new Date()
        }
        this.historico.push({
            id: randomUUID(),
            materialId: id,
            tipo: tipo_movimento.SAIDA,
            quantidade: data.quantidade,
            motivo: data.motivo,
            criado_em: new Date()
        })
        return this.estoque[index]!
    }
    async BuscarPorEstoqueBaixo(): Promise<EstoqueItemDTO[]> {
        return this.estoque.filter(item => item.quantidade <= item.quantidade_minima);
    }
    async BuscarPorTipo(tipo: string): Promise<EstoqueItemDTO[]> {
        return this.estoque.filter(item => item.tipo.toLowerCase() === tipo.toLowerCase());
    }
    async BuscarHistoricoMovimentos(MaterialId: string): Promise<MovimentoEstoqueDTO[]> {
        return this.historico.filter(h => h.materialId === MaterialId);
    }
}