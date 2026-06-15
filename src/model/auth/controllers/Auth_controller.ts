import { SignPayloadType } from './../../../../node_modules/@fastify/jwt/types/index.d';
import { FastifyReply, FastifyRequest } from "fastify";
import { CriarUsuarioSchemas, LoginSchemas } from "../schemas/Usuario_schemas";
import { usuarioRepository } from "../../../shared/database/repositories";
import { CriarUsuarioService } from "../services/Criar_Usuario_service";
import { LoginService } from "../services/Login_service";

export class AuthController {
    async criar(req: FastifyRequest, res: FastifyReply) {
        const body = CriarUsuarioSchemas.parse(req.body);
        const service = new CriarUsuarioService(usuarioRepository);
        try {
            const usuario = await service.execute(body);
            return res.status(201).send(usuario);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao criar usuário";
            return res.status(409).send({ message });
        }
    }
    async login(req: FastifyRequest, res: FastifyReply) {
        const body = LoginSchemas.parse(req.body);
        const service = new LoginService(usuarioRepository);
        try {
            const resultado = await service.execute(body, (payload) => 
                req.server.jwt.sign(payload, {expiresIn: '7d'})
                    
                )
            return res.status(200).send(resultado);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao fazer login";
            return res.status(401).send({ message });
        }
    }

    async perfil(req: FastifyRequest, res: FastifyReply) {
        return res.status(200).send(req.user);
    }
}