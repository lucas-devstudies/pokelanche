import { Produto } from "./produto";

export class Categoria{
    id!:number;
    nome!:String;
    url!:String;
    produtos!:Produto[];
}