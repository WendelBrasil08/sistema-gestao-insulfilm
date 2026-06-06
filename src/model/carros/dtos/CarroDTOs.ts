export interface CriarCarroDTO {
    modelo: string;
    marca: string;
    ano: number;
    placa: string;
    clienteId: string;
}

export interface AtualizarCarroDTO {
    modelo?: string;
    marca?: string;
    ano?: number;
    placa?: string;
}

export interface CarroDTO {
    id: string;
    modelo: string;
    marca: string;
    ano: number;
    placa: string;
    clienteId: string;
    criado_em: Date;
}

export interface ExcluirCarroDTO {
    id: string;
}
