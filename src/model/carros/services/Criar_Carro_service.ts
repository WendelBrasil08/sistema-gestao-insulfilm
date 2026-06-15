import { ICarroRepository } from './../repositories/ICarro_respository';
import { IClienteRepository } from '../../clientes/repositories/ICLiente_repository';
import { CriarCarroDTO } from '../dtos/CarroDTOs';
import { NotFoundError } from '../../../shared/errors/App_errors';
import { ConflictError } from '../../../shared/errors/App_errors';

export class CriarCarroService {
    constructor(private carroRepository: ICarroRepository, private clienteRepository: IClienteRepository) {}
    async execute(data: CriarCarroDTO) {
        const clienteExistente = await this.clienteRepository.BuscarPorId(data.clienteId);
        if (!clienteExistente) {
            throw new NotFoundError("Cliente nao encontrado");
        }
        const carroExistente = await this.carroRepository.BuscarPorPlaca(data.placa);
        if (carroExistente) {
            throw new ConflictError("Ja existe um carro com essa placa");
        }
        return await this.carroRepository.criar(data);
    }
}