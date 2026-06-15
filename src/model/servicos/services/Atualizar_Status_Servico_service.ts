import type { AtualizarStatusServicoDTO } from './../dtos/ServicoDTOs';
import type { IServicoRepository } from "../repositories/IServico_repository";
import { ServicoStatus } from "../dtos/ServicoDTOs";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { BadRequestError } from "../../../shared/errors/App_errors";

export class AtualizarStatusServicoService {
    constructor(private servicoRepository: IServicoRepository) {}
    async execute(id: string, data: AtualizarStatusServicoDTO) {
        const servicoExistente = await this.servicoRepository.BuscarPorId(id);
        if (!servicoExistente) {
            throw new NotFoundError("Servico nao encontrado");
        }

        const ordem = [
            ServicoStatus.EM_ANALISE,
            ServicoStatus.EM_APLICACAO,
            ServicoStatus.PRONTO,
            ServicoStatus.ENTREGUE
        ]
        const statusAtualIndex = ordem.indexOf(servicoExistente.status);
        const novoStatusIndex = ordem.indexOf(data.status);
        if (novoStatusIndex < statusAtualIndex) {
            throw new BadRequestError("Status nao pode ser atualizado para um antigo");
        }
        return await this.servicoRepository.atualizarStatus(id, data);
    }
}