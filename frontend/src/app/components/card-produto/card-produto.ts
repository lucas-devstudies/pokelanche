import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-produto',
  imports: [],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.scss'
})
export class CardProduto {
  
  @Input()
  url:string="";
  
  @Input()
  titulo:string="";

  @Input()
  valor:number=0;

}
