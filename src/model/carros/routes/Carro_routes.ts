import type { FastifyInstance, FastifyRequest } from "fastify";
import { CarroController } from "../controllers/Carro_Controller";

const controller = new CarroController();
export async function carroRoutes(app: FastifyInstance) {
    app.post('/carros', (req, res) => controller.criar(req, res));
    app.get('/carros', (req, res) => controller.listar(res));
    app.get('/carros/:id', (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/carros/:id', (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/carros/:id', (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));
}