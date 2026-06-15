import type { IServicoRepository } from "../repositories/IServico_repository";
import { ServicoStatus } from "../dtos/ServicoDTOs";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { BadRequestError } from "../../../shared/errors/App_errors";

export class ExcluirServicoService {
    constructor(private servicoRepository: IServicoRepository) {}
    async execute(id: string) {
        const servicoExistente = await this.servicoRepository.BuscarPorId(id);
        if (!servicoExistente) {
            throw new NotFoundError("Servico nao encontrado");
        }
        if(ServicoStatus.EM_APLICACAO === servicoExistente.status || ServicoStatus.PRONTO === servicoExistente.status){ {
            throw new BadRequestError("Servico nao pode ser excluido");
        }
    }
    await this.servicoRepository.excluir(id);
}
}