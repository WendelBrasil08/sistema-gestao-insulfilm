import { ICarroRepository } from './../repositories/ICarro_respository';
import { AtualizarCarroDTO } from '../dtos/CarroDTOs';

export class AtualizarCarroService {
    constructor(private carroRepository: ICarroRepository) {}

    async execute(data: AtualizarCarroDTO, id: string) {
        if (!id) throw new Error("ID do carro nao informado");
        const existente = await this.carroRepository.consultar(id);
        const carroComPlaca = await this.carroRepository.BuscarPorPlaca(data.placa);
        if (carroComPlaca && carroComPlaca.id !== id) {
            throw new Error("Ja existe um carro com essa placa");
        }
        if (!existente) {
            throw new Error("Carro nao encontrado");
        }
        const carro = await this.carroRepository.atualizar(data, id);
        return carro;
    }
}