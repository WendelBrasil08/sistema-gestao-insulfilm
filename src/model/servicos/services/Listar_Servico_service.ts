import type { IServicoRepository } from "../repositories/IServico_repository";

export class ListarServicoService {
    constructor(private servicoRepository: IServicoRepository) {}
    async execute(){
        return await this.servicoRepository.listar();
    }  
}