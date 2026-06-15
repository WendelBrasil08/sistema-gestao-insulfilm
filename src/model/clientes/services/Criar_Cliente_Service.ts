import type { CriarClienteDTO } from "../dtos/ClienteDTOs";
import { IClienteRepository } from "../repositories/ICLiente_repository";
import { ConflictError } from "../../../shared/errors/App_errors";

export class CriarClienteService {
    constructor(private clienteRepository: IClienteRepository) {}

    async execute(data: CriarClienteDTO) {
        const clienteExistente = await this.clienteRepository.BuscarPorWhatsapp(data.whatsapp);
        if (clienteExistente) {
            throw new ConflictError("Ja existe um cliente com esse whatsapp");
        }
        return await this.clienteRepository.criar(data);
    }
}
