export interface ProdutoCreateDTO {
  nome: string;
  descricao: string;
  categoria_id: number;
  imagem: File;
  valor: number;
}
