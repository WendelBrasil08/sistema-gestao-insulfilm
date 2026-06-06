import { ICarroRepository } from "./ICarro_respository";
import { CarroDTO, CriarCarroDTO, ExcluirCarroDTO, AtualizarCarroDTO } from "../dtos/CarroDTOs";
import { randomUUID } from "crypto";

export class CarroInMemoryRepository implements ICarroRepository {
    private carros: CarroDTO[] = [];
    async criar(data: CriarCarroDTO): Promise<CarroDTO> {
        const carro = {
            id: randomUUID(),
            ...data,
            criado_em: new Date(),
        };
        this.carros.push(carro);
        return carro;
    }
    async listar(): Promise<CarroDTO[]> {
        return this.carros;
    }
    async excluir(data: ExcluirCarroDTO): Promise<void> {
        const index = this.carros.findIndex(c => c.id === data.id);
        if (index === -1) throw new Error("Carro nao encontrado");
        this.carros.splice(index, 1);
    }
    async BuscarPorPlaca(placa: string): Promise<CarroDTO | null> {
        return this.carros.find(c => c.placa === placa) || null;
    }
    async atualizar(data: AtualizarCarroDTO, id: string): Promise<CarroDTO> {
        const index = this.carros.findIndex(c => c.id === id);
        if (index === -1) throw new Error("Carro nao encontrado");
        this.carros[index] = { ...this.carros[index]!, ...data };
        return this.carros[index]!;
    }
    async consultar(id: string): Promise<CarroDTO | null> {
        return this.carros.find(c => c.id === id) || null;
    }
}