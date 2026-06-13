import type { IEstoqueRepository } from "../repositories/IEstoque_repository";

export class BuscarMaterialService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(materialId: string) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(materialId);
        if (!materialExistente) {
            throw new Error("Material nao encontrado");
        }
        return materialExistente;
    }
}