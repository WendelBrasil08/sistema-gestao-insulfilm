import type { FastifyInstance, FastifyRequest } from 'fastify';
import { ClienteController } from '../controllers/Cliente_Controller';
import { autenticar } from '../../../shared/middlewares/autenticar';

const controller = new ClienteController();

export async function clienteRoutes(app: FastifyInstance) {
    app.post('/clientes', { preHandler: autenticar }, (req, res) => controller.criar(req, res));
    app.get('/clientes', { preHandler: autenticar }, (req, res) => controller.listar(res));
    app.get('/clientes/:id', { preHandler: autenticar }, (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/clientes/:id', { preHandler: autenticar }, (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/clientes/:id', { preHandler: autenticar }, (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));
}
