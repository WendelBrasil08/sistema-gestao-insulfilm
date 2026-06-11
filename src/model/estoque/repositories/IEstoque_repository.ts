import type {
    MovimentoEstoqueDTO,
    CriarEstoqueItemDTO,
    AtualizarEstoqueItemDTO,
    BaixaEstoqueDTO,
    EntradaEstoqueDTO,
    EstoqueItemDTO 
} from "../dtos/EstoqueDTOs";

export interface IEstoqueRepository {
    criar(data: CriarEstoqueItemDTO): Promise<EstoqueItemDTO>;
    listar(): Promise<EstoqueItemDTO[]>;
    excluir(id: string): Promise<void>;
    BuscarPorId(id: string): Promise<EstoqueItemDTO | null>;
    atualizar(id: string, data: AtualizarEstoqueItemDTO): Promise<EstoqueItemDTO>;
    registrarEntrada(id: string, data: EntradaEstoqueDTO): Promise<EstoqueItemDTO>;
    registrarBaixa(id: string, data: BaixaEstoqueDTO): Promise<EstoqueItemDTO>;
    BuscarPorEstoqueBaixo(): Promise<EstoqueItemDTO[]>;
    BuscarPorTipo(tipo: string): Promise<EstoqueItemDTO[]>;
    BuscarHistoricoMovimentos(MaterialId: string): Promise<MovimentoEstoqueDTO[]>;
}