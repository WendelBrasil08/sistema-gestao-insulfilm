import { CriarClienteDTO, ClienteDTO, ExcluirClienteDTO, AtualizarClienteDTO } from "../dtos/ClienteDTOs";

export interface IClienteRepository {
    criar(data: CriarClienteDTO): Promise<ClienteDTO>;
    atualizar(id: string, data: AtualizarClienteDTO): Promise<ClienteDTO>;
    FindbyId(id: string): Promise<ClienteDTO | null>;
    excluir(data: ExcluirClienteDTO): Promise<void>;
    consultar(id: string): Promise<ClienteDTO | null>;
    listar(): Promise<ClienteDTO[]>;
}