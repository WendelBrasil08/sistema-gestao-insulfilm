export enum ServicoStatus {
    EM_ANALISE = "Em Análise",
    EM_APLICACAO = "Em Aplicação",
    PRONTO = "Pronto",
    ENTREGUE = "Entregue",
}

export interface ServicoDTO {
    id: string;
    clienteId: string;
    carroId: string;
    observacoes?: string;
    tipo_insulfilm: string;
    metragem_usada: number;
    mao_de_obra: number;
    valor_total: number;
    status: ServicoStatus;
    criado_em: Date;
    finalizado_em?: Date;
}

export interface CriarServicoDTO {
    clienteId: string;
    carroId: string;
    observacoes?: string;
    tipo_insulfilm: string;
    metragem_usada: number;
    mao_de_obra: number;
    valor_total: number;
}

export interface AtualizarServicoDTO {
    observacoes?: string;
    tipo_insulfilm?: string;
    metragem_usada?: number;
    mao_de_obra?: number;
    valor_total?: number;
    status?: ServicoStatus;
}

export interface AtualizarStatusServicoDTO {
    status: ServicoStatus;
}
