import type { IEstoqueRepository } from "../repositories/IEstoque_repository";

export class BuscarEstoqueBaixoService {
    constructor(private estoqueRepository: IEstoqueRepository) {}
    async execute() {
        const estoqueBaixo = await this.estoqueRepository.BuscarPorEstoqueBaixo();
        return{
            total: estoqueBaixo.length,
            itens: estoqueBaixo.map(m => ({
                ...m,
                mensagem: "Restam ${m.quantidade} ${m.unidade} -- minimo é ${m.quantidade_minima}"
            }))
        }
    }
}