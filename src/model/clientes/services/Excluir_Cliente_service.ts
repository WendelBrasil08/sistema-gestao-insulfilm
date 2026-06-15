import { NotFoundError } from "../../../shared/errors/App_errors";
import { IClienteRepository } from "../repositories/ICLiente_repository";
import { BadRequestError } from "../../../shared/errors/App_errors";

export class ExcluirClienteService {
    constructor(private clienteRepository: IClienteRepository) {}
    async execute(id: string) {
        if (!id) throw new BadRequestError("ID do cliente nao informado");
        const existente = await this.clienteRepository.BuscarPorId(id);
        if (!existente) {
            throw new NotFoundError("Cliente não encontrado");
        }
        await this.clienteRepository.excluir({ id });
    }
}