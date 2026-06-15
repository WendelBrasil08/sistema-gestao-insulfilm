import type { IEstoqueRepository } from "../repositories/IEstoque_repository";
import type { EntradaEstoqueDTO } from "../dtos/EstoqueDTOs";
import { NotFoundError } from "../../../shared/errors/App_errors";

export class RegistrarEntradaEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}

    async execute(id: string, data: EntradaEstoqueDTO) {
        const materialExistente = await this.estoqueRepository.BuscarPorId(id);
        if (!materialExistente) {
            throw new NotFoundError("Material nao encontrado");
        }
        return await this.estoqueRepository.registrarEntrada(id, data);
    }
}