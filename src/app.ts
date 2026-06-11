import Fastify from "fastify";
import { clienteRoutes } from "./model/clientes/routes/Cliente_Routes";
import { carroRoutes } from "./model/carros/routes/Carro_routes";
import { servicoRoutes } from "./model/servicos/routes/Servico_routes";
import { EstoqueRoutes } from "./model/estoque/routes/Estoque_routes";

export const app = Fastify({
    logger: true,
});

app.register(clienteRoutes);
app.register(carroRoutes);
app.register(servicoRoutes);
app.register(EstoqueRoutes);