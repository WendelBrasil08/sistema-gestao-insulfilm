import { CarroDTO, CriarCarroDTO, ExcluirCarroDTO, AtualizarCarroDTO } from "../dtos/CarroDTOs";

export interface ICarroRepository {
    criar(data: CriarCarroDTO): Promise<CarroDTO>;
    listar(): Promise<CarroDTO[]>;
    excluir(data: ExcluirCarroDTO): Promise<void>;
    BuscarPorPlaca(placa: string): Promise<CarroDTO | null>;
    atualizar(data: AtualizarCarroDTO, id: string): Promise<CarroDTO>;
    BuscarPorId(id: string): Promise<CarroDTO | null>;
}