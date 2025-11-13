import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutosService } from '../../../core/services/produtos-service';

@Component({
  selector: 'app-categoria-item',
  imports: [CommonModule],
  templateUrl: './categoria-item.html',
  styleUrl: './categoria-item.scss'
})
export class CategoriaItem {
  @Input()
  produto!:Produto;

  constructor(private router:Router,private produtoService:ProdutosService){}

  ativo = true;
  mudarEstado(){
    this.ativo = !this.ativo;
    if(this.ativo==false){
      alert(this.produto.nome+" está desativado");
    }else{
      alert(this.produto.nome+" está ativado");
    }
  }
  excluir() {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.remove(this.produto.id).subscribe({
        next: (res) => {
          alert("Produto Removido com Sucesso");
        },
        error: (err) => {
          alert('Erro ao excluir produto');
          console.error(err);
        }
      });
    }
  }
  editar(){
    this.router.navigate(['editar-produto',this.produto.id]);
  }
}