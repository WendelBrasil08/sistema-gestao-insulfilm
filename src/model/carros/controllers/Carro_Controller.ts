import { carroRepository } from "../../../shared/database/repositories";
import { clienteRepository } from "../../../shared/database/repositories";
import { CriarCarroService } from "../services/Criar_Carro_service";
import { DeletarCarroService } from "../services/Deletar_Carro_service";
import { ListarCarroService } from "../services/Listar_Carro_service";
import { AtualizarCarroService } from "../services/Atualizar_Carro_service";
import { FastifyReply, FastifyRequest } from "fastify";
import * as schemas from "../schemas/Carro_Schemas";
import { ConsultarCarroService } from "../services/Consultar_Carro_service";

const Repository = carroRepository;
const ClienteRepository = clienteRepository;

export class CarroController {
    async criar(request: FastifyRequest, reply: FastifyReply) {

            const body = schemas.CriarCarroSchemas.parse(request.body);
            const service = new CriarCarroService(Repository, ClienteRepository);
            try {
                const carro = await service.execute(body);
                return reply.status(201).send(carro);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Erro ao criar carro";
                return reply.status(409).send({ message });
            }
    }

    async listar(reply: FastifyReply) {
        const service = new ListarCarroService(Repository);
        const carros = await service.execute();
        return reply.status(200).send(carros);
    }

    async buscar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new ConsultarCarroService(Repository);
        try {
            const carro = await service.execute(id);
            return reply.status(200).send(carro);
        } catch (error) {
            return reply.status(404).send({ error: "Carro nao encontrado" });
        }   
    }

    async atualizar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = schemas.AtualizarCarroSchemas.parse(request.body);
        const service = new AtualizarCarroService(Repository);
        try {
            const carro = await service.execute(body, id);
            return reply.status(200).send(carro);
        } catch (error) {
            return reply.status(404).send({ error: "Carro nao encontrado" });
        }
    }

    async excluir(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new DeletarCarroService(Repository);
        try {
            await service.execute({ id });
            return reply.status(200).send();
        } catch (error) {
            return reply.status(404).send({ error: "Carro nao encontrado" });
        }
    }
}