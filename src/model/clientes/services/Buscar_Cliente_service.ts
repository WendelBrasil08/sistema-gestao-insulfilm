import { IClienteRepository } from "../repositories/ICLiente_repository";

export class BuscarClienteService {
    constructor(private clienteRepository: IClienteRepository) {}

    async execute(id: string) {
        const cliente = await this.clienteRepository.FindbyId(id);
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }
        return cliente; 
    }
}