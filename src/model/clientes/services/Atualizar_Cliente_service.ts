import { AtualizarClienteDTO } from "../dtos/ClienteDTOs";
import { IClienteRepository } from "../repositories/ICLiente_repository";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { BadRequestError } from "../../../shared/errors/App_errors";
import { ConflictError } from "../../../shared/errors/App_errors";
export class AtualizarClienteService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute(id: string, data: AtualizarClienteDTO) {
        if (!id) throw new BadRequestError("ID do cliente nao informado");
        if (data.whatsapp) {
            const clienteExistente = await this.clienteRepository.BuscarPorWhatsapp(data.whatsapp);
            if (clienteExistente) {
                throw new ConflictError("Ja existe um cliente com esse whatsapp");
            }
        }
        const existente = await this.clienteRepository.BuscarPorId(id);
        if (!existente) {
            throw new NotFoundError("Cliente não encontrado");
        }
        const cliente = await this.clienteRepository.atualizar(id, data);
        return cliente;
    }
}