import type { IServicoRepository } from "./IServico_repository";
import { randomUUID } from "crypto";
import {
    CriarServicoDTO,
    ServicoDTO,
    AtualizarServicoDTO,
    AtualizarStatusServicoDTO,
    ServicoStatus
} from "../dtos/ServicoDTOs";

export class ServicoInMemoryRepository implements IServicoRepository {
    private servicos: ServicoDTO[] = [];

    async criar(data: CriarServicoDTO): Promise<ServicoDTO> {
        const servico = {
            id: randomUUID(),
            ...data,
            status: ServicoStatus.EM_ANALISE,
            criado_em: new Date(),
            finalizado_em: undefined,
        };
        this.servicos.push(servico);
        return servico;
    }

    async listar(): Promise<ServicoDTO[]> {
        return this.servicos;
    }
    async excluir(id: string): Promise<void> {
        const index = this.servicos.findIndex(s => s.id === id);
        if (index === -1) throw new Error("Servico nao encontrado");
        this.servicos.splice(index, 1);
    }
    async BuscarPorId(id: string): Promise<ServicoDTO | null> {
        return this.servicos.find(s => s.id === id) || null;
    }
    async BuscarPorCarro(carroId: string): Promise<ServicoDTO[]> {
        return this.servicos.filter(s => s.carroId === carroId);
    }
    async BuscarPorStatus(status: ServicoStatus): Promise<ServicoDTO[]> {
        return this.servicos.filter(s => s.status === status);
    }
    async atualizar(id: string, data: AtualizarServicoDTO): Promise<ServicoDTO> {
        const index = this.servicos.findIndex(s => s.id === id);
        if (index === -1) throw new Error("Servico nao encontrado");
        this.servicos[index] = { ...this.servicos[index]!, ...data };
        return this.servicos[index]!;
    }
    async atualizarStatus(id: string, data: AtualizarStatusServicoDTO): Promise<ServicoDTO> {
        const index = this.servicos.findIndex(s => s.id === id);
        if (index === -1) throw new Error("Servico nao encontrado");
         this.servicos[index] = {
      ...this.servicos[index]!,
      status: data.status,
      finalizado_em: data.status === ServicoStatus.ENTREGUE
        ? new Date()
        : this.servicos[index]!.finalizado_em
    }
    return this.servicos[index]!;
}
}