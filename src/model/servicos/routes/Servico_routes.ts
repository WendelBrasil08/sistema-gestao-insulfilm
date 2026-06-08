import { ServicoController } from "../controllers/Servico_controller";
import { FastifyInstance, FastifyRequest } from "fastify";
import { ServicoStatus } from "../dtos/ServicoDTOs";

const controller = new ServicoController()
export const servicoRoutes = async (app: FastifyInstance) => {
    app.post('/servicos', (req, res) => controller.criar(req, res));
    app.get('/servicos', (req, res) => controller.listar(req, res));
    app.get('/servicos/status/:status', (req, res) => controller.buscarPorStatus(req as FastifyRequest<{ Params: { status: ServicoStatus } }>, res));
    app.get('/servicos/:id', (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/servicos/:id', (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.patch('/servicos/:id/status', (req, res) => controller.atualizarStatus(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/servicos/:id', (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));
}
 