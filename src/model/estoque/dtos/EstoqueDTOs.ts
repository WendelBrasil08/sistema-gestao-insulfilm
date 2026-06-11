export enum tipo_movimento {
    ENTRADA = "Entrada",
    SAIDA = "Saída",
    AJUSTE = "Ajuste",
}

export interface EstoqueItemDTO {
    id: string;
    nome: string;
    tipo: string;
    quantidade: number;
    quantidade_minima: number;
    unidade: string;
    valor_unitario: number;
    criado_em: Date;
    atualizado_em: Date;
}

export interface MovimentoEstoqueDTO {
    id: string;
    materialId: string;
    tipo: tipo_movimento;
    quantidade: number;
    motivo: string;
    criado_em: Date;
}

export interface CriarEstoqueItemDTO {
    nome: string;
    tipo: string;
    quantidade: number;
    quantidade_minima: number;
    unidade: string;
    valor_unitario: number;
}

export interface AtualizarEstoqueItemDTO {
    nome?: string;
    tipo?: string;
    quantidade_minima?: number;
    unidade?: string;
    valor_unitario?: number;
}

export interface EntradaEstoqueDTO {
    quantidade: number;
    motivo: string;
}

export interface BaixaEstoqueDTO {
    quantidade: number;
    motivo: string;
}