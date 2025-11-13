import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-produto',
  imports: [CommonModule],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.scss'
})
export class CardProduto {
  
  @Input()
  url:string="";
  
  @Input()
  titulo:string="";

  @Input()
  valor!:number;

  //caminho da api
  caminhoBackend = 'http://127.0.0.1:8000/';
}
