import { ICarroRepository} from './../repositories/ICarro_respository';


export class ListarCarroService {
    constructor(private carroRepository: ICarroRepository) {}
    async execute(){
        const carros = await this.carroRepository.listar();
        return carros;
    }
}