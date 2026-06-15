import type { CriarEstoqueItemDTO } from "../dtos/EstoqueDTOs";
import type { IEstoqueRepository } from "../repositories/IEstoque_repository";
import { ConflictError } from "../../../shared/errors/App_errors";

export class CriarEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}

    async execute(data: CriarEstoqueItemDTO) {
        const material = await this.estoqueRepository.listar();
        const materialExistente = material.find((material) => material.nome.toLowerCase() === data.nome.toLowerCase());
        if (materialExistente) {
            throw new ConflictError("Ja existe um material com esse nome");
        }
         return await this.estoqueRepository.criar(data);
        }
    }