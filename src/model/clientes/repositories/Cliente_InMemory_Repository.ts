import { CriarClienteDTO, ClienteDTO, ExcluirClienteDTO, AtualizarClienteDTO } from "../dtos/ClienteDTOs";
import { IClienteRepository } from "./ICLiente_repository";
import { randomUUID } from "crypto";

export class ClienteInMemoryRepository implements IClienteRepository {
    private clientes: ClienteDTO[] = [];

    async criar(data: CriarClienteDTO): Promise<ClienteDTO> {
        const cliente = { ...data, id: randomUUID(), criado_em: new Date() };
        this.clientes.push(cliente);
        return cliente;
    }

    async atualizar(id: string, data: AtualizarClienteDTO): Promise<ClienteDTO> {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index === -1) throw new Error("Cliente não encontrado");
        this.clientes[index] = { ...this.clientes[index]!, ...data };
        return this.clientes[index]!;
    }
    async FindbyId(id: string): Promise<ClienteDTO | null> {
        return this.clientes.find(c => c.id === id) || null;
    }
    async consultar(id: string): Promise<ClienteDTO | null> {
        return this.clientes.find(c => c.id === id) || null;
    }
    async excluir(data: ExcluirClienteDTO): Promise<void> {
        const index = this.clientes.findIndex(c => c.id === data.id);
        if (index === -1) throw new Error("Cliente nao encontrado");
        this.clientes.splice(index, 1);
    }
    async listar(): Promise<ClienteDTO[]> {
        return this.clientes;

    }
    }