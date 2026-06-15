import type { IEstoqueRepository } from "../repositories/IEstoque_repository";
import type { BaixaEstoqueDTO } from "../dtos/EstoqueDTOs";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { BadRequestError } from "../../../shared/errors/App_errors";

export class RegistrarBaixaEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(id: string, data: BaixaEstoqueDTO) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new NotFoundError("Material nao encontrado");
        }
        if(materialExistente.quantidade < data.quantidade){
            throw new BadRequestError("Quantidade nao pode ser maior que a quantidade em estoque");
        }
        const atualizado = await this.estoqueRepository.registrarBaixa(id, data);
        if(atualizado.quantidade <= materialExistente.quantidade_minima){
            return{
                materialExistente: atualizado,
                alerta: "Estoque baixo! Restam ${atualizado.quantidade} ${atualizado.unidade} de ${atualizado.nome}",
            }
            
        }
        return {materialExistente: atualizado, alerta: null};
    }
}