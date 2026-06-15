import { carroRepository, clienteRepository } from "../../../shared/database/repositories";
import { CriarCarroService } from "../services/Criar_Carro_service";
import { DeletarCarroService } from "../services/Deletar_Carro_service";
import { ListarCarroService } from "../services/Listar_Carro_service";
import { AtualizarCarroService } from "../services/Atualizar_Carro_service";
import { FastifyReply, FastifyRequest } from "fastify";
import {CriarCarroSchemas, AtualizarCarroSchemas,} from "../schemas/Carro_Schemas";
import { BuscarCarroService } from "../services/Buscar_Carro_service";

export class CarroController {
    async criar(request: FastifyRequest, reply: FastifyReply) {

            const body = CriarCarroSchemas.parse(request.body);
            const service = new CriarCarroService(carroRepository, clienteRepository);
            const carro = await service.execute(body);
            return reply.status(201).send(carro);
            
    }

    async listar(reply: FastifyReply) {
        const service = new ListarCarroService(carroRepository);
        const carros = await service.execute();
        return reply.status(200).send(carros);
    }

    async buscar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new BuscarCarroService(carroRepository);
        const carro = await service.execute(id);
        return reply.status(200).send(carro);
          
    }

    async atualizar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = AtualizarCarroSchemas.parse(request.body);
        const service = new AtualizarCarroService(carroRepository);
        const carro = await service.execute(body, id);
        return reply.status(200).send(carro);
        
    }

    async excluir(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new DeletarCarroService(carroRepository);
        await service.execute({ id });
        return reply.status(200).send();
    } 
}