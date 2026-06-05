export interface CriarClienteDTO {
    nome: string;
    email?: string;
    whatsapp: string;
}

export interface AtualizarClienteDTO {
    nome?: string;
    email?: string;
    whatsapp?: string;
}

export interface ClienteDTO {
    id: string;
    nome: string;
    email?: string;
    whatsapp?: string;
    criado_em: Date;
}

export interface ExcluirClienteDTO {
    id: string;
}