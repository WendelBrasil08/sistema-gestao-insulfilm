import type { IServicoRepository } from "../repositories/IServico_repository";
import { AtualizarServicoDTO} from "../dtos/ServicoDTOs";

export class AtualizarServicoService {
    constructor(private servicoRepository: IServicoRepository) {}
    async execute(id: string, data: AtualizarServicoDTO) {
        const servicoExistente = await this.servicoRepository.BuscarPorId(id);
        if (!servicoExistente) {
            throw new Error("Servico nao encontrado");
        }
        return await this.servicoRepository.atualizar(id, data);
        
    }
}