import { ICarroRepository } from './../repositories/ICarro_respository';
import { AtualizarCarroDTO } from '../dtos/CarroDTOs';
import { BadRequestError } from '../../../shared/errors/App_errors';
import { NotFoundError } from '../../../shared/errors/App_errors';

export class AtualizarCarroService {
    constructor(private carroRepository: ICarroRepository) {}

    async execute(data: AtualizarCarroDTO, id: string) {
        if (!id) throw new BadRequestError("ID do carro nao informado");
        const existente = await this.carroRepository.BuscarPorId(id);
        if (!existente) {
            throw new NotFoundError("Carro nao encontrado");
        }
        const carro = await this.carroRepository.atualizar(data, id);
        return carro;
    }
}