import Fastify from "fastify";
import { clienteRoutes } from "./model/clientes/routes/Cliente_Routes";
import { carroRoutes } from "./model/carros/routes/Carro_routes";

export const app = Fastify({
    logger: true,
});

app.register(clienteRoutes);
app.register(carroRoutes);