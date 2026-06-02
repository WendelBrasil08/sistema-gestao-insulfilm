import type { CriarClienteDTO } from "../dtos/ClienteDTOs";
import { IClienteRepository } from "../repositories/ICLiente_repository";

export class CriarClienteService {
    constructor(private clienteRepository: IClienteRepository) {}

    async execute(data: CriarClienteDTO) {
        const cliente = await this.clienteRepository.criar(data);
        return cliente;
    }
}