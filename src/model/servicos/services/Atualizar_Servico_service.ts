import type { IServicoRepository } from "../repositories/IServico_repository";
import type { IEstoqueRepository } from "../../estoque/repositories/IEstoque_repository";
import { AtualizarServicoDTO} from "../dtos/ServicoDTOs";

export class AtualizarServicoService {
    constructor(private servicoRepository: IServicoRepository, private estoqueRepository: IEstoqueRepository) {}
    async execute(id: string, data: AtualizarServicoDTO) {
        const servicoExistente = await this.servicoRepository.BuscarPorId(id);
        if (!servicoExistente) {
            throw new Error("Servico nao encontrado");
        }

        if(data.metragem_usada){
             const material = await this.estoqueRepository.BuscarPorId(id);

            if (!material) {
                throw new Error("Material nao encontrado no estoque");
            }
            if (data.metragem_usada > material.quantidade) {
                throw new Error("Quantidade de materiais insuficiente");
            }
        }
        return await this.servicoRepository.atualizar(id, data);
        
    }
}