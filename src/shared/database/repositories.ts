import { ClienteInMemoryRepository } from "../../model/clientes/repositories/Cliente_InMemory_repository";
import { CarroInMemoryRepository } from "../../model/carros/repositories/Carro_InMemory_repository";
import { ServicoInMemoryRepository } from "../../model/servicos/repositories/Servico_InMemory_repository";
import { EstoqueInMemoryRepository } from "../../model/estoque/repositories/Estoque_InMemory_repository";
import { UsuarioInMemoryRepository } from "../../model/auth/repositories/Usuario_InMemory_repository";

export const clienteRepository = new ClienteInMemoryRepository();
export const carroRepository = new CarroInMemoryRepository();
export const servicoRepository = new ServicoInMemoryRepository();
export const estoqueRepository = new EstoqueInMemoryRepository();
export const usuarioRepository = new UsuarioInMemoryRepository();