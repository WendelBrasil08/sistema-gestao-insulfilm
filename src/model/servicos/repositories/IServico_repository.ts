import type {
    CriarServicoDTO,
    ServicoDTO,
    AtualizarServicoDTO,
    AtualizarStatusServicoDTO,
    ServicoStatus
} from "../dtos/ServicoDTOs";

export interface IServicoRepository {
    criar(data: CriarServicoDTO): Promise<ServicoDTO>;
    listar(): Promise<ServicoDTO[]>;
    excluir(id: string): Promise<void>;
    BuscarPorId(id: string): Promise<ServicoDTO | null>;
    BuscarPorCarro(carroId: string): Promise<ServicoDTO[]>;
    BuscarPorStatus(status: ServicoStatus): Promise<ServicoDTO[]>;
    atualizar(id: string, data: AtualizarServicoDTO): Promise<ServicoDTO>;
    atualizarStatus(id: string, data: AtualizarStatusServicoDTO): Promise<ServicoDTO>;
}