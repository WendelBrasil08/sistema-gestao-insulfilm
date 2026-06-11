import type { IEstoqueRepository } from "../repositories/IEstoque_repository";

export class ListarEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute() {
        return await this.estoqueRepository.listar();
    }
}