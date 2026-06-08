import type { CriarServicoDTO } from "../dtos/ServicoDTOs";
import type { IServicoRepository } from "../repositories/IServico_repository";
import type { IClienteRepository } from "../../clientes/repositories/ICLiente_repository";
import type { ICarroRepository } from "../../carros/repositories/ICarro_respository";

export class CriarServicoService {
    constructor(
        private servicoRepository: IServicoRepository,
        private clienteRepository: IClienteRepository,
        private carroRepository: ICarroRepository
    ) {}
    async execute(data: CriarServicoDTO) {
        const cliente = await this.clienteRepository.FindbyId(data.clienteId);
        if (!cliente) throw new Error("Cliente nao encontrado");
        const carro = await this.carroRepository.consultar(data.carroId);
        if (!carro) throw new Error("Carro nao encontrado");
        if (carro.clienteId !== data.clienteId) throw new Error("Carro não pertence ao cliente");
        return await this.servicoRepository.criar(data);
    }
}