import { BuscarClientePorIdService } from "./../services/Buscar_Cliente_service";
import { CriarClienteService } from "../services/Criar_Cliente_service";
import { ExcluirClienteService } from "../services/Excluir_Cliente_service";
import { ListarClientesService } from "../services/Listar_Clientes_service";
import { AtualizarClienteService } from "../services/Atualizar_Cliente_service";
import { FastifyReply, FastifyRequest } from "fastify";
import { clienteRepository } from "../../../shared/database/repositories";
import {
    CriarClienteSchemas,AtualizarClienteSchemas,} from "../schemas//Cliente_schemas";

export class ClienteController {
    async criar(request: FastifyRequest, reply: FastifyReply) {

        const body = CriarClienteSchemas.parse(request.body);
        const service = new CriarClienteService(clienteRepository);
            
        const cliente = await service.execute(body);
        return reply.status(201).send(cliente);
    }


    async listar(reply: FastifyReply) {
        const service = new ListarClientesService(clienteRepository);
        const clientes = await service.execute();
        return reply.status(200).send(clientes);
    }

    async buscar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new BuscarClientePorIdService(clienteRepository);
        const cliente = await service.execute(id);
        return reply.status(200).send(cliente);
    }

    async atualizar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = AtualizarClienteSchemas.parse(request.body);
        const service = new AtualizarClienteService(clienteRepository);
        const cliente = await service.execute(id, body);
        return reply.status(200).send(cliente);
    }

    async excluir(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new ExcluirClienteService(clienteRepository);
        await service.execute(id);
        return reply.status(200).send();
    }
}