import { EstoqueController } from "../controllers/Estoque_controller";
import { FastifyInstance, FastifyRequest } from "fastify";
import { autenticar } from "../../../shared/middlewares/autenticar";

const controller = new EstoqueController();

export function EstoqueRoutes(app: FastifyInstance) {
    app.post('/estoque', { preHandler: autenticar }, (req, res) => controller.criar(req, res));
    app.get('/estoque', { preHandler: autenticar }, (req, res) => controller.listar(res));
    app.get('/estoque/:id', { preHandler: autenticar }, (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.get('/estoque/baixo', { preHandler: autenticar }, (req, res) => controller.buscarEstoqueBaixo(res));
    app.get('/estoque/:id/historico', { preHandler: autenticar }, (req, res) => controller.buscarHistorico(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/estoque/:id', { preHandler: autenticar }, (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.patch('/estoque/:id/quantidade/entrada', { preHandler: autenticar }, (req, res) => controller.registrarEntrada(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.patch('/estoque/:id/quantidade/saida', { preHandler: autenticar }, (req, res) => controller.registrarBaixa(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/estoque/:id', { preHandler: autenticar }, (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));

}