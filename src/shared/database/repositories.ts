import { ClienteInMemoryRepository } from "../../model/clientes/repositories/Cliente_InMemory_repository";
import { CarroInMemoryRepository } from "../../model/carros/repositories/Carro_InMemory_repository";
import { ServicoInMemoryRepository } from "../../model/servicos/repositories/Servico_InMemory_repository";

export const clienteRepository = new ClienteInMemoryRepository();
export const carroRepository = new CarroInMemoryRepository();
export const servicoRepository = new ServicoInMemoryRepository();