import type { CriarServicoDTO } from "../dtos/ServicoDTOs";
import type { IEstoqueRepository } from "../../estoque/repositories/IEstoque_repository";
import type { IServicoRepository } from "../repositories/IServico_repository";
import type { IClienteRepository } from "../../clientes/repositories/ICLiente_repository";
import type { ICarroRepository } from "../../carros/repositories/ICarro_respository";

export class CriarServicoService {
    constructor(
        private estoqueRepository: IEstoqueRepository,
        private servicoRepository: IServicoRepository,
        private clienteRepository: IClienteRepository,
        private carroRepository: ICarroRepository
    ) {}
    async execute(data: CriarServicoDTO) {
        const cliente = await this.clienteRepository.BuscarPorId(data.clienteId);
        if (!cliente) throw new Error("Cliente nao encontrado");

        const material = await this.estoqueRepository.BuscarPorId(data.materialId);
        if (!material) throw new Error("Material nao encontrado no estoque");
        if(data.metragem_usada > material.quantidade) throw new Error("Quantidade de materiais insuficiente");
        const carro = await this.carroRepository.BuscarPorId(data.carroId);
        if (!carro) throw new Error("Carro nao encontrado");
        if (carro.clienteId !== data.clienteId) throw new Error("Carro não pertence ao cliente");

        const servico = await this.servicoRepository.criar(data);
        await this.estoqueRepository.registrarBaixa(data.materialId, { 
            quantidade: data.metragem_usada,
            motivo: "Servico #${servico.id}"
         });

        return servico;
    }
}