import Fastify from "fastify";
import FastifyJWT from "@fastify/jwt";
import "dotenv/config";
import { clienteRoutes } from "./model/clientes/routes/Cliente_Routes";
import { carroRoutes } from "./model/carros/routes/Carro_routes";
import { servicoRoutes } from "./model/servicos/routes/Servico_routes";
import { EstoqueRoutes } from "./model/estoque/routes/Estoque_routes";
import { authRoutes } from "./model/auth/Routes/Auth_routes";

export const app = Fastify({
    logger: true,
});

app.register(FastifyJWT, {
    secret: process.env.JWT_SECRET ?? "fall_back_secret",
})
app.register(clienteRoutes);
app.register(carroRoutes);
app.register(servicoRoutes);
app.register(EstoqueRoutes);
app.register(authRoutes);