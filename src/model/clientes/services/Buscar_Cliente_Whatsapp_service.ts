import { IClienteRepository } from "../repositories/ICLiente_repository";
import { CriarClienteDTO } from "../dtos/ClienteDTOs";

export class BuscarClientePorWhatsappService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute(data: CriarClienteDTO) {
        const clienteExistente = await this.clienteRepository.FindByWhatsapp(data.whatsapp);
        if (clienteExistente) {
            throw new Error("Ja existe um cliente com esse whatsapp");
        }
        return await this.clienteRepository.criar(data);
    }
}