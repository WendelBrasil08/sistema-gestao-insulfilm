import { AtualizarClienteDTO } from "../dtos/ClienteDTOs";
import { IClienteRepository } from "../repositories/ICLiente_repository";
export class AtualizarClienteService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute(id: string, data: AtualizarClienteDTO) {
        if (!id) throw new Error("ID do cliente nao informado");
        const existente = await this.clienteRepository.FindbyId(id);
        if (!existente) {
            throw new Error("Cliente não encontrado");
        }
        const cliente = await this.clienteRepository.atualizar(id, data);
        return cliente;
    }
}