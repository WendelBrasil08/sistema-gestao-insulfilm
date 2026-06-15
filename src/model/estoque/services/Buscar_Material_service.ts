import type { IEstoqueRepository } from "../repositories/IEstoque_repository";
import { NotFoundError } from "../../../shared/errors/App_errors";

export class BuscarMaterialService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(materialId: string) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(materialId);
        if (!materialExistente) {
            throw new NotFoundError("Material nao encontrado");
        }
        return materialExistente;
    }
}