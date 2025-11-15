import { Component, Input } from '@angular/core';
import { Produto } from '../../models/produto';
import { Router } from '@angular/router';
import { ProdutosService } from '../../../core/services/produtos-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-item',
  imports: [CommonModule],
  templateUrl: './produto-item.html',
  styleUrl: './produto-item.scss',
})
export class ProdutoItem {
  @Input()
  produto!:Produto;
  constructor(private router:Router,private produtoService:ProdutosService){}

  mudarEstado(){
    this.alterarEstado();
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
  alterarEstado(){
    this.produtoService.state(this.produto.id).subscribe({
      next: (res) => {
          alert("Produto Removido com Sucesso");
        },
        error: (err) => {
          alert('Erro ao alterar estado de produto' + err.message);
          console.error(err);
        }
    })
  }
}