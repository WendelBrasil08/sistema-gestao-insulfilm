export interface UsuarioDTO{
    id: string,
    email: string,
    nome: string,
    criado_em: Date
}

export interface CriarUsuarioDTO{
    email: string,
    senha: string,
    nome: string
}

export interface LoginDTO{
    email: string,
    senha: string
}

export interface AuthResponseDTO{
    token: string,
    usuario: UsuarioDTO
}

export interface UsuarioInternoDTO{
    id: string,
    email: string,
    nome: string,
    senha_hash: string,
    criado_em: Date
}