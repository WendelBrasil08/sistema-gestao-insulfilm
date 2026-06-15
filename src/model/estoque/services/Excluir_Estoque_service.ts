import { IEstoqueRepository } from "../repositories/IEstoque_repository";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { ConflictError } from "../../../shared/errors/App_errors";

export class ExcluirEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
  
    async execute(id: string) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new NotFoundError("Material nao encontrado");
        }
        if(materialExistente.quantidade > 0) {
            throw new ConflictError("Material nao pode ser excluido, pois ainda possui quantidade em estoque, zere a quantidade primeiro");
        }
        await this.estoqueRepository.excluir(id);
    }
}