import { ICarroRepository } from "../repositories/ICarro_respository";
import { NotFoundError } from "../../../shared/errors/App_errors";
import { BadRequestError } from "../../../shared/errors/App_errors";

export class BuscarCarroService {
    constructor(private carroRepository: ICarroRepository) {}
    async execute(id: string) {
        if (!id) throw new BadRequestError("ID do carro nao informado");
        const carro = await this.carroRepository.BuscarPorId(id);
        if (!carro) {
            throw new NotFoundError("Carro nao encontrado");
        }
        return carro;
    }
}