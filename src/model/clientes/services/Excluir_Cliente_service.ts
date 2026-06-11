
import { IClienteRepository } from "../repositories/ICLiente_repository";

export class ExcluirClienteService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute(id: string) {
        const existente = await this.clienteRepository.BuscarPorId(id);
        if (!existente) {
            throw new Error("Cliente não encontrado");
        }
        await this.clienteRepository.excluir({ id });
    }
}