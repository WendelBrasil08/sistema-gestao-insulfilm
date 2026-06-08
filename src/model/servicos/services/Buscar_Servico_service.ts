import type { IServicoRepository } from "../repositories/IServico_repository";

export class BuscarServicoService {
    constructor(private servicoRepository: IServicoRepository) {}

    async execute(id: string) {
        const servico = await this.servicoRepository.BuscarPorId(id);
        if (!servico) throw new Error("Servico nao encontrado");
        return servico;
    }
}