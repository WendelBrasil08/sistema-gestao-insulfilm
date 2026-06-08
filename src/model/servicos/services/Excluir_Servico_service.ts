import type { IServicoRepository } from "../repositories/IServico_repository";
import { ServicoStatus } from "../dtos/ServicoDTOs";

export class ExcluirServicoService {
    constructor(private servicoRepository: IServicoRepository) {}
    async execute(id: string) {
        const servicoExistente = await this.servicoRepository.BuscarPorId(id);
        if (!servicoExistente) {
            throw new Error("Servico nao encontrado");
        }
        if(ServicoStatus.EM_APLICACAO === servicoExistente.status || ServicoStatus.PRONTO === servicoExistente.status){ {
            throw new Error("Servico nao pode ser excluido");
        }
    }
    await this.servicoRepository.excluir(id);
}
}