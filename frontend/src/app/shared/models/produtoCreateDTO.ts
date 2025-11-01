export interface ProdutoCreateDTO {
  nome: string;
  descricao: String;
  categoria_id:Number;
  imagem: File;
  valor: number;
}
