import type { FastifyInstance, FastifyRequest } from "fastify";
import { CarroController } from "../controllers/Carro_Controller";
import { autenticar } from "../../../shared/middlewares/autenticar";

const controller = new CarroController();
export async function carroRoutes(app: FastifyInstance) {
    app.post('/carros', { preHandler: autenticar }, (req, res) => controller.criar(req, res));
    app.get('/carros', { preHandler: autenticar }, (req, res) => controller.listar(res));
    app.get('/carros/:id', { preHandler: autenticar }, (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/carros/:id', { preHandler: autenticar }, (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/carros/:id', { preHandler: autenticar }, (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));
}