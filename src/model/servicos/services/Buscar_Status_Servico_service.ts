import type { IServicoRepository } from "../repositories/IServico_repository";
import { ServicoStatus } from "../dtos/ServicoDTOs";

export class BuscarStatusServicoService {
    constructor(private servicoRepository: IServicoRepository) {}
    async execute(status: ServicoStatus) {
        return await this.servicoRepository.BuscarPorStatus(status);
    }
}