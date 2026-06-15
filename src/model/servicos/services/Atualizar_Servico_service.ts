import type { IServicoRepository } from "../repositories/IServico_repository";
import type { IEstoqueRepository } from "../../estoque/repositories/IEstoque_repository";
import { AtualizarServicoDTO} from "../dtos/ServicoDTOs";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { BadRequestError } from "../../../shared/errors/App_errors";

export class AtualizarServicoService {
    constructor(private servicoRepository: IServicoRepository, private estoqueRepository: IEstoqueRepository) {}
    async execute(id: string, data: AtualizarServicoDTO) {
        const servicoExistente = await this.servicoRepository.BuscarPorId(id);
        if (!servicoExistente) {
            throw new Error("Servico nao encontrado");
        }

        if(data.metragem_usada){
            const material = await this.estoqueRepository.BuscarPorId(servicoExistente.materialId);
            if (!material) throw new NotFoundError("Material nao encontrado no estoque");
            if(data.metragem_usada > material.quantidade) throw new BadRequestError("Quantidade de materiais em estoque insuficiente");
            const diferenca = data.metragem_usada - servicoExistente.metragem_usada;
            if(diferenca > 0){
                if(diferenca > material.quantidade) throw new BadRequestError("Quantidade de materiais em estoque insuficiente. Há apenas ${material.quantidade} ${material.unidade}");

                await this.estoqueRepository.registrarBaixa(servicoExistente.materialId, { 
                    quantidade: diferenca,
                    motivo: "Ajuste na metragem do Servico #${servicoExistente.id}"
                 });
            } else if (diferenca < 0) {

                await this.estoqueRepository.registrarBaixa(servicoExistente.materialId, { 
                    quantidade: Math.abs(diferenca),
                    motivo: "Devolucao na metragem do Servico #${servicoExistente.id}"
                 });
                
            }
        }
        if(data.mao_de_obra){
            servicoExistente.valor_total = (data.mao_de_obra - servicoExistente.mao_de_obra) + servicoExistente.valor_total;
        }
        return await this.servicoRepository.atualizar(id, data);
        
    }
}
