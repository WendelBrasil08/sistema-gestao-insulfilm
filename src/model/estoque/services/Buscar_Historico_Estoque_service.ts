import type {  IEstoqueRepository } from "../repositories/IEstoque_repository";
import { NotFoundError } from "../../../shared/errors/App_errors";

export class BuscarHistoricoEstoqueService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute(MaterialId: string) {
        const Existe = await this.estoqueRepository.BuscarPorId(MaterialId);
        if (!Existe) {
            throw new NotFoundError("Material nao encontrado");
        }
        const historico = await this.estoqueRepository.BuscarHistoricoMovimentos(MaterialId);
        return{
            material: Existe.nome,
            Movimentos: historico
        }
    }
}