import { ServicoController } from "../controllers/Servico_controller";
import { FastifyInstance, FastifyRequest } from "fastify";
import { ServicoStatus } from "../dtos/ServicoDTOs";
import { autenticar } from "../../../shared/middlewares/autenticar";

const controller = new ServicoController()
export const servicoRoutes = async (app: FastifyInstance) => {
    app.post('/servicos', { preHandler: autenticar }, (req, res) => controller.criar(req, res));
    app.get('/servicos', { preHandler: autenticar }, (req, res) => controller.listar(req, res));
    app.get('/servicos/status/:status', { preHandler: autenticar }, (req, res) => controller.buscarPorStatus(req as FastifyRequest<{ Params: { status: ServicoStatus } }>, res));
    app.get('/servicos/:id', { preHandler: autenticar }, (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/servicos/:id', { preHandler: autenticar }, (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.patch('/servicos/:id/status', { preHandler: autenticar }, (req, res) => controller.atualizarStatus(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/servicos/:id', { preHandler: autenticar }, (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));
}