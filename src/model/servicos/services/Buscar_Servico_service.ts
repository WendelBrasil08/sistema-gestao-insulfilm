import type { IServicoRepository } from "../repositories/IServico_repository";
import { NotFoundError } from "../../../shared/errors/App_errors";

export class BuscarServicoService {
    constructor(private servicoRepository: IServicoRepository) {}

    async execute(id: string) {
        const servico = await this.servicoRepository.BuscarPorId(id);
        if (!servico) throw new NotFoundError("Servico nao encontrado");
        return servico;
    }
}