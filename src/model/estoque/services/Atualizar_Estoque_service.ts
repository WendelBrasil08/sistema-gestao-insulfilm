import type { IEstoqueRepository } from "../repositories/IEstoque_repository";
import type { AtualizarEstoqueItemDTO } from "../dtos/EstoqueDTOs";

export class AtualizarEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(id: string, data: AtualizarEstoqueItemDTO) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new Error("Material nao encontrado");
        }
        return await this.estoqueRepository.atualizar(id, data);

    }
}