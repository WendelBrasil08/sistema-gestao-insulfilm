import { IEstoqueRepository } from "../repositories/IEstoque_repository";

export class ExcluirEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
  
    async execute(id: string) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new Error("Material nao encontrado");
        }
        if(materialExistente.quantidade > 0) {
            throw new Error("Material nao pode ser excluido, pois ainda possui quantidade em estoque, zere a quantidade primeiro");
        }
        await this.estoqueRepository.excluir(id);
    }
}