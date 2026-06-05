import { BuscarClientePorIdService } from "./../services/Buscar_Cliente_service";
import { BuscarClientePorWhatsappService } from "../services/Buscar_Cliente_Whatsapp_service";
import { CriarClienteService } from "../services/Criar_Cliente_service";
import { ExcluirClienteService } from "../services/Excluir_Cliente_service";
import { ListarClientesService } from "../services/Listar_Clientes_service";
import { AtualizarClienteService } from "../services/Atualizar_Cliente_service";
import { FastifyReply, FastifyRequest } from "fastify";
import { ClienteInMemoryRepository } from "../repositories/Cliente_InMemory_Repository";
import * as schemas from "../schemas/Cliente_schemas";

const Repository = new ClienteInMemoryRepository();

export class ClienteController {
    async criar(request: FastifyRequest, reply: FastifyReply) {

            const body = schemas.CriarClienteSchemas.parse(request.body);
            const service = new CriarClienteService(Repository);
            try {
                const cliente = await service.execute(body);
                return reply.status(201).send(cliente);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Erro ao criar cliente";
                return reply.status(409).send({ message });
            }
    }


    async listar(request: FastifyRequest, reply: FastifyReply) {
        const service = new ListarClientesService(Repository);
        const clientes = await service.execute();
        return reply.status(200).send(clientes);
    }

    async buscar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new BuscarClientePorIdService(Repository);
       try {
           const cliente = await service.execute(id);
           return reply.status(200).send(cliente);
       } catch (error) {
           return reply.status(404).send({ error: "Cliente não encontrado" });
       }
    }

    async atualizar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = schemas.AtualizarClienteSchemas.parse(request.body);
        const service = new AtualizarClienteService(Repository);
        try {
            const cliente = await service.execute(id, body);
            return reply.status(200).send(cliente);
        } catch (error) {
            return reply.status(404).send({ error: "Cliente nao encontrado" });
        }
    }

    async excluir(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new ExcluirClienteService(Repository);
        try {
            await service.execute(id);
            return reply.status(200).send();
        } catch (error) {
            return reply.status(404).send({ error: "Cliente nao encontrado" });
        }
    }
}