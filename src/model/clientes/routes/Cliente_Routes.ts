import type { FastifyInstance, FastifyRequest } from 'fastify';
import { ClienteController } from '../controllers/Cliente_Controller';

const controller = new ClienteController();

export async function clienteRoutes(app: FastifyInstance) {
    app.post('/clientes', (req, res) => controller.criar(req, res));
    app.get('/clientes', (req, res) => controller.listar(res));
    app.get('/clientes/:id', (req, res) => controller.buscar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.put('/clientes/:id', (req, res) => controller.atualizar(req as FastifyRequest<{ Params: { id: string } }>, res));
    app.delete('/clientes/:id', (req, res) => controller.excluir(req as FastifyRequest<{ Params: { id: string } }>, res));
}
