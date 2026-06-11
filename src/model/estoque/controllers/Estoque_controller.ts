import { ExcluirEstoqueService } from './../services/Excluir_Estoque_service';
import { BuscarHistoricoEstoqueService } from './../services/Buscar_Historico_Estoque_service';
import { estoqueRepository } from './../../../shared/database/repositories';
import { RegistrarBaixaEstoqueService } from './../services/Registrar_Baixa_Estoque_service';
import { BuscarEstoqueBaixoService } from './../services/Buscar_EstoqueBaixo_service';
import { ListarEstoqueService } from './../services/Listar_Estoque_service';
import { FastifyRequest, FastifyReply } from "fastify";
import { CriarEstoqueService } from "../services/Criar_Estoque_service";
import { BuscarMaterialService } from "../services/Buscar_Material_service";
import { AtualizarEstoqueService } from "../services/Atualizar_Estoque_service";
import { RegistrarEntradaEstoqueService } from "../services/Registrar_Entrada_Estoque_service";
import {
    CriarEstoqueItemSchema,
    AtualizarEstoqueItemSchema,
    EntradaEstoqueSchema,
    BaixaEstoqueSchema
} from "../schemas/Estoque_schemas";

export class EstoqueController {
    async criar(request: FastifyRequest, reply: FastifyReply) {
        const body = CriarEstoqueItemSchema.parse(request.body);
        const service = new CriarEstoqueService(estoqueRepository);
        try {
            const material = await service.execute(body);
            return reply.status(201).send(material);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao criar material";
            return reply.status(400).send({ message });
        }
    }
    async listar(reply: FastifyReply) {
        const service = new ListarEstoqueService(estoqueRepository);
        const materiais = await service.execute();
        return reply.status(200).send(materiais);
    }
    async buscar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new BuscarMaterialService(estoqueRepository);
        try {
            const material = await service.execute(id);
            return reply.status(200).send(material);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Material nao encontrado";
            return reply.status(404).send({ message });
            
        }
    }
    async buscarEstoqueBaixo(reply: FastifyReply) {
        const service = new BuscarEstoqueBaixoService(estoqueRepository);
        const resultado = await service.execute();
        return reply.status(200).send(resultado);
    }   

    async buscarHistorico(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new BuscarHistoricoEstoqueService(estoqueRepository);
        try {
            const material = await service.execute(id);
            return reply.status(200).send(material);

        } catch (error) {
            const message = error instanceof Error ? error.message : "Material nao encontrado";
            return reply.status(404).send({ message });
            
        }
    }

    async atualizar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = AtualizarEstoqueItemSchema.parse(request.body);
        const service = new AtualizarEstoqueService(estoqueRepository);
        try {
            const material = await service.execute(id, body);
            return reply.status(200).send(material);
            
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao atualizar material";
            return reply.status(400).send({ message });
        }
    }
    
    async registrarEntrada(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = EntradaEstoqueSchema.parse(request.body);
        const service = new RegistrarEntradaEstoqueService(estoqueRepository);
        try {
            const material = await service.execute(id, body);
            return reply.status(200).send(material);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao registrar entrada";
            return reply.status(400).send({ message });
        }
    }
    async registrarBaixa(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const body = BaixaEstoqueSchema.parse(request.body);
        const service = new RegistrarBaixaEstoqueService(estoqueRepository);
        try {
            const resultado = await service.execute(id, body);
            if(resultado.alerta) {
                return reply.status(200).send({ ...resultado.materialExistente, aviso: resultado.alerta });
            }
            return reply.status(200).send(resultado.materialExistente);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao registrar baixa";
            return reply.status(400).send({ message });
        }
    }
    
    async excluir(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const service = new ExcluirEstoqueService(estoqueRepository);
        try {
            await service.execute(id);
            return reply.status(200).send();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Material nao encontrado";
            return reply.status(404).send({ message });
        }
    }
}
    