import { ICarroRepository} from './../repositories/ICarro_respository';
import { ExcluirCarroDTO } from '../dtos/CarroDTOs';
import { BadRequestError } from '../../../shared/errors/App_errors';
import { NotFoundError } from '../../../shared/errors/App_errors';

export class DeletarCarroService {
    constructor(private carroRepository: ICarroRepository) {}
    async execute(data: ExcluirCarroDTO) {
        if (!data.id) throw new BadRequestError("ID do carro nao informado");
        const existente = await this.carroRepository.BuscarPorId(data.id);
        if (!existente) {
            throw new NotFoundError("Carro nao encontrado");
        }
        await this.carroRepository.excluir(data);
    }
}