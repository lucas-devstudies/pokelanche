import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-categoria-item',
  imports: [CommonModule],
  templateUrl: './categoria-item.html',
  styleUrl: './categoria-item.scss'
})
export class CategoriaItem {
  @Input()
  produto!:Produto;

  constructor(private router:Router){}

  ativo = true;
  mudarEstado(){
    this.ativo = !this.ativo;
    if(this.ativo==false){
      alert(this.produto.nome+" está desativado");
    }else{
      alert(this.produto.nome+" está ativado");
    }
  }
  excluir(){
    alert("Excluindo o botão "+this.produto.nome);

  }
  editar(){
    this.router.navigate(['editar-produto',this.produto.id]);
  }
}