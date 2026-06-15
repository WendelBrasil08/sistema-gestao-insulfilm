import type { IUsuarioRepository } from "../repositories/IUsuario_repository";
import type { CriarUsuarioDTO } from "../dtos/UsuarioDTOs";
import { ConflictError } from "../../../shared/errors/App_errors";
import bcrypt from "bcryptjs";

export class CriarUsuarioService {
    constructor(private repository: IUsuarioRepository) {}

    async execute(data: CriarUsuarioDTO) {
        const emailExistente = await this.repository.buscarPorEmail(data.email);
        if (emailExistente) {
            throw new ConflictError ("Ja existe um usuario com esse email");
        }
        const senha_hash = await bcrypt.hash(data.senha, 10);
        const usuario = await this.repository.criar({ ...data, senha_hash });
        return usuario;
    }
}