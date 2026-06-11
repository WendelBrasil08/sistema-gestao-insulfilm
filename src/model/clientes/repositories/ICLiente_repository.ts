import { CriarClienteDTO, ClienteDTO, ExcluirClienteDTO, AtualizarClienteDTO } from "../dtos/ClienteDTOs";

export interface IClienteRepository {
    criar(data: CriarClienteDTO): Promise<ClienteDTO>;
    atualizar(id: string, data: AtualizarClienteDTO): Promise<ClienteDTO>;
    BuscarPorId(id: string): Promise<ClienteDTO | null>;
    BuscarPorWhatsapp(whatsapp: string): Promise<ClienteDTO | null>;
    excluir(data: ExcluirClienteDTO): Promise<void>;
    listar(): Promise<ClienteDTO[]>;
}