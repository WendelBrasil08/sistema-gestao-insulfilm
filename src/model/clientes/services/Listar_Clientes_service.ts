import { IClienteRepository } from "../repositories/ICLiente_repository";

export class ListarClientesService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute() {
        const clientes = await this.clienteRepository.listar();
        return clientes;
    }
}