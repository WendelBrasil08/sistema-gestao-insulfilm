import type { IUsuarioRepository } from "../repositories/IUsuario_repository";
import { randomUUID } from "crypto";
import { UsuarioInternoDTO, UsuarioDTO, CriarUsuarioDTO } from "../dtos/UsuarioDTOs";

export class UsuarioInMemoryRepository implements IUsuarioRepository {
    private usuarios: UsuarioInternoDTO[] = []; 

    async criar(data: CriarUsuarioDTO & { senha_hash: string }): Promise<UsuarioDTO> {
        const usuario: UsuarioInternoDTO = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            senha_hash: data.senha_hash,
            criado_em: new Date(),
        };
        this.usuarios.push(usuario);
        return {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            criado_em: usuario.criado_em,
        };
    }
    async buscarPorEmail(email: string): Promise<UsuarioInternoDTO | null> {
        return this.usuarios.find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null;
    }
    async buscarPorId(id: string): Promise<UsuarioDTO | null> {
        const usuario = this.usuarios.find(u => u.id === id);
        if (!usuario)  return null;
        return {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            criado_em: usuario.criado_em,
        };
    }
    }
