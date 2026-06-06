import { ICarroRepository} from './../repositories/ICarro_respository';
import { ExcluirCarroDTO } from '../dtos/CarroDTOs';

export class DeletarCarroService {
    constructor(private carroRepository: ICarroRepository) {}
    async execute(data: ExcluirCarroDTO) {
        const existente = await this.carroRepository.consultar(data.id);
        if (!existente) {
            throw new Error("Carro nao encontrado");
        }
        await this.carroRepository.excluir(data);
    }
}