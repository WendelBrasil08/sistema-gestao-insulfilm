import { FastifyRequest, FastifyReply } from "fastify";

export async function autenticar(req: FastifyRequest, res: FastifyReply) {
    try {
        await req.jwtVerify();
    } catch (err) {
        return res.status(401).send({ message: "Nao autorizado, Faça login para prosseguir" });
    }
}