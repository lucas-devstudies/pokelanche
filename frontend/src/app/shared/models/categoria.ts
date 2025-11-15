import { Produto } from "./produto";

export class Categoria{
    nome!:string;
    url_imagem!:string;
    id!:number;
    produtos!:Produto[];
}