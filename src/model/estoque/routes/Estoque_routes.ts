import { EstoqueController } from "../controllers/Estoque_controller";
import { FastifyInstance, FastifyRequest } from "fastify";

const controller = new EstoqueController();

export function EstoqueRoutes(app: FastifyInstance) {
    app.post('/estoque', (req, res) => controller.criar(req, res));
    app.get('/estoque', (req, res) => controller.listar(res));
    app.get('/estoque/:id', (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.get('/estoque/baixo', (req, res) => controller.buscarEstoqueBaixo(res));
    app.get('/estoque/:id/historico', (req, res) => controller.buscarHistorico(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/estoque/:id', (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.patch('/estoque/:id/quantidade/entrada', (req, res) => controller.registrarEntrada(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.patch('/estoque/:id/quantidade/saida', (req, res) => controller.registrarBaixa(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/estoque/:id', (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));

}
    