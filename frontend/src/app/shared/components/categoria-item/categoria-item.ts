import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutosService } from '../../../core/services/produtos-service';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../../core/services/categoria-service';

@Component({
  selector: 'app-categoria-item',
  imports: [CommonModule],
  templateUrl: './categoria-item.html',
  styleUrl: './categoria-item.scss'
})
export class CategoriaItem {
  @Input()
  categoria!:Categoria;
  constructor(private router:Router,private categoriaService:CategoriaService){}

  excluir() {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoriaService.remove(this.categoria.id).subscribe({
        next: (res) => {
          alert("Categoria removida com sucesso");
        },
        error: (err) => {
          alert('Erro ao excluir categoria: '+ err.error.detail);
          console.log(err);
        }
      });
    }
  }
  editar(){
    this.router.navigate(['editar-categoria',this.categoria.id]);
  }
  alterarEstado(){
    
  }
}