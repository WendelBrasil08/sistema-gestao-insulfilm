import Fastify from "fastify";
import { clienteRoutes } from "./model/clientes/routes/Cliente_Routes";

export const app = Fastify({
    logger: true,
});

app.register(clienteRoutes);