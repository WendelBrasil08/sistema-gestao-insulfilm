import { ClienteController } from './../../clientes/controllers/Cliente_Controller';
import type { FastifyRequest, FastifyReply } from "fastify"
import { CriarServicoSchemas, AtualizarServicoSchemas, AtualizarStatusSchema } from '../schemas/Servico_schemas'
import { servicoRepository, carroRepository, clienteRepository } from "../../../shared/database/repositories"
import { CriarServicoService } from "../services/Criar_Servico_service"
import { ListarServicoService } from "../services/Listar_Servico_service"
import { BuscarServicoService } from "../services/Buscar_Servico_service"
import { AtualizarServicoService } from "../services/Atualizar_Servico_service"
import { BuscarStatusServicoService } from "../services/Buscar_Status_Servico_service"
import { AtualizarStatusServicoService } from "../services/Atualizar_Status_Servico_service"
import { ExcluirServicoService } from "../services/Excluir_Servico_service"
import { ServicoStatus } from "../dtos/ServicoDTOs"

const SRepository = servicoRepository;
const carRepository = carroRepository;
const ClientRepository = clienteRepository;

export class ServicoController {
    async criar(req: FastifyRequest, res: FastifyReply) {
        const body = CriarServicoSchemas.parse(req.body)
        const criarServicoService = new CriarServicoService(servicoRepository, clienteRepository, carroRepository)
        try {   
            const servico = await criarServicoService.execute(body)         
            return res.status(201).send(servico)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao criar serviço";
            return res.status(400).send({ message });
        }
    }

    async listar(req: FastifyRequest, res: FastifyReply) {
        const listarServicoService = new ListarServicoService(servicoRepository)
        const servicos = await listarServicoService.execute()
        return res.status(200).send(servicos)
    }

    async buscar(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        const { id } = req.params
        const buscarServicoService = new BuscarServicoService(servicoRepository)
        try {
            const servico = await buscarServicoService.execute(id)
            return res.status(200).send(servico)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao buscar serviço";
            return res.status(404).send({ message });
        }
    }

    async buscarPorStatus(req: FastifyRequest<{ Params: { status: ServicoStatus } }>, res: FastifyReply) {
        const { status } = req.params

        if(!Object.values(ServicoStatus).includes(status as ServicoStatus)) {
            return res.status(400).send({ message: `Status inválido Use: ${Object.values(ServicoStatus).join(", ")}` })
        }
        const buscarStatusServicoService = new BuscarStatusServicoService(servicoRepository)
        
        const servicos = await buscarStatusServicoService.execute(status)
        return res.status(200).send(servicos)
        
        }

    async atualizar(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        const { id } = req.params
        const data = AtualizarServicoSchemas.parse(req.body)
        const atualizarServicoService = new AtualizarServicoService(servicoRepository)
        try {
            const servico = await atualizarServicoService.execute(id, data)
            return res.status(200).send(servico)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao atualizar serviço";
            return res.status(400).send({ message });
        }
    }

    async atualizarStatus(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        const { id } = req.params

        try {
            const data = AtualizarStatusSchema.parse(req.body)
            const atualizarStatusServicoService = new AtualizarStatusServicoService(servicoRepository)
            const servico = await atualizarStatusServicoService.execute(id, data)
            return res.status(200).send(servico)

        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao atualizar status do serviço";
            return res.status(400).send({ message });
        }
    }

    async excluir(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        const { id } = req.params
        const excluirServicoService = new ExcluirServicoService(servicoRepository)
        try {
            await excluirServicoService.execute(id)
            return res.status(204).send("Serviço excluído com sucesso")
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro ao excluir serviço";
            return res.status(400).send({ message });
        }
    }
}