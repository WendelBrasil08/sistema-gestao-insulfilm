import type { FastifyReply, FastifyRequest } from "fastify";
class CriarClienteController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const service = new CriarClienteService();
        const cliente = await service.execute(request.body);
        return reply.status(201).send(cliente);
    }
    }