import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/Auth_controller";
import { autenticar } from "../../../shared/middlewares/autenticar";

const controller = new AuthController();

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth/criar', (req, res) => controller.criar(req, res));
    app.post('/auth/login', (req, res) => controller.login(req, res));
    app.get('/auth/perfil', { preHandler: autenticar }, (req, res) => controller.perfil(req, res));
}