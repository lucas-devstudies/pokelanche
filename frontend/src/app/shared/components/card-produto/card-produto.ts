import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-produto',
  imports: [CommonModule,FormsModule],
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

  @Input()
  disponivel!:boolean;
  //caminho da api
  caminhoBackend = 'http://127.0.0.1:8000/';
}
