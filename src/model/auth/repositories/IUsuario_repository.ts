import type { UsuarioInternoDTO, UsuarioDTO, CriarUsuarioDTO } from "../dtos/UsuarioDTOs";

export interface IUsuarioRepository {
    criar(data: CriarUsuarioDTO & { senha_hash: string }): Promise<UsuarioDTO>;
    buscarPorEmail(email: string): Promise<UsuarioInternoDTO | null>;
    buscarPorId(id: string): Promise<UsuarioDTO | null>;
}