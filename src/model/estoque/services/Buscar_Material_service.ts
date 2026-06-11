import type { IEstoqueRepository } from "../repositories/IEstoque_repository";

export class BuscarMaterialService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(id: string) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new Error("Material nao encontrado");
        }
        return materialExistente;
    }
}