import { ICarroRepository } from "../repositories/ICarro_respository";

export class BuscarCarroService {
    constructor(private carroRepository: ICarroRepository) {}
    async execute(id: string) {
        const carro = await this.carroRepository.BuscarPorId(id);
        if (!carro) {
            throw new Error("Carro nao encontrado");
        }
        return carro;
    }
}