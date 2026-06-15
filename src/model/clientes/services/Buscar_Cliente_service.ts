import { IClienteRepository } from "../repositories/ICLiente_repository";
import { NotFoundError } from "../../../shared/errors/App_errors";

export class BuscarClientePorIdService {
    constructor(private clienteRepository: IClienteRepository) {}

    async execute(id: string) {
        const cliente = await this.clienteRepository.BuscarPorId(id);
        if (!cliente) {
            throw new NotFoundError("Cliente não encontrado");
        }
        return cliente; 
    }
}