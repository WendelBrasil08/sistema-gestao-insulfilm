import { AtualizarClienteDTO } from "../dtos/ClienteDTOs";
import { IClienteRepository } from "../repositories/ICLiente_repository";
export class AtualizarClienteService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute(id: string, data: AtualizarClienteDTO) {
        if (!id) throw new Error("ID do cliente nao informado");
        if (data.whatsapp) {
            const clienteExistente = await this.clienteRepository.FindByWhatsapp(data.whatsapp);
            if (clienteExistente) {
                throw new Error("Ja existe um cliente com esse whatsapp");
            }
        }
        const existente = await this.clienteRepository.FindbyId(id);
        if (!existente) {
            throw new Error("Cliente não encontrado");
        }
        const cliente = await this.clienteRepository.atualizar(id, data);
        return cliente;
    }
}