import type { IEstoqueRepository } from "../repositories/IEstoque_repository";
import type { AtualizarEstoqueItemDTO } from "../dtos/EstoqueDTOs";
import { NotFoundError } from "../../../shared/errors/App_errors";

export class AtualizarEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(id: string, data: AtualizarEstoqueItemDTO) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new NotFoundError("Material nao encontrado");
        }
        return await this.estoqueRepository.atualizar(id, data);

    }
}