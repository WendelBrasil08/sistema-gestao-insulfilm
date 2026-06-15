import bcrypt from "bcryptjs";
import { IUsuarioRepository } from "../repositories/IUsuario_repository";
import { LoginDTO } from "../dtos/UsuarioDTOs";

export class LoginService {
    constructor(private repository: IUsuarioRepository) {}
    async execute(data: LoginDTO, assinar_token: (payload: object) => string) {
        const usuario = await this.repository.buscarPorEmail(data.email);
        if (!usuario) {
            throw new Error("Email ou senha incorretos");
        }
        const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha_hash);
        if (!senhaCorreta) {
            throw new Error("Email ou senha incorretos");
        }
        const token = assinar_token({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        });
        return {
            token,
            usuario: {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome,
                criado_em: usuario.criado_em
            } };
    }
}