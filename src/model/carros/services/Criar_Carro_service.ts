import { ICarroRepository } from './../repositories/ICarro_respository';
import { IClienteRepository } from '../../clientes/repositories/ICLiente_repository';
import { CriarCarroDTO } from '../dtos/CarroDTOs';

export class CriarCarroService {
    constructor(private carroRepository: ICarroRepository, private clienteRepository: IClienteRepository) {}
    async execute(data: CriarCarroDTO) {
        const clienteExistente = await this.clienteRepository.BuscarPorId(data.clienteId);
        if (!clienteExistente) {
            throw new Error("Cliente nao encontrado");
        }
        const carroExistente = await this.carroRepository.BuscarPorPlaca(data.placa);
        if (carroExistente) {
            throw new Error("Ja existe um carro com essa placa");
        }
        return await this.carroRepository.criar(data);
    }
}