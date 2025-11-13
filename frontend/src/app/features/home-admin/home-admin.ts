import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarAdm } from '../../core/components/navbar-adm/navbar-adm';
import { CategoriaItem } from '../../shared/components/categoria-item/categoria-item';
import { CategoriaService } from '../../core/services/categoria-service';
import { Categoria } from '../../shared/models/categoria';
import { BotaoConfirmar } from '../../shared/components/botao-confirmar/botao-confirmar';

@Component({
  selector: 'app-home-admin',
  imports: [NavbarAdm, CommonModule, CategoriaItem,BotaoConfirmar],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.scss'
})
export class HomeAdmin {

  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];

  constructor(private router:Router){
    this.findAll();
    this.dropdownAberto = Array(this.listaCategorias.length).fill(false);
  }

  findAll() {
    this.categoriaService.getAll().subscribe({
      next: dados => {
        this.listaCategorias = Array.isArray(dados) ? dados : [];
      },
      error: err => {
      }
    });
  }
  dropdownAberto: boolean[] = [];
  
  toggleDropdown(index: number) {
    this.dropdownAberto[index] = !this.dropdownAberto[index];
  }

  selecionarProduto(categoria: any, produto: any, index: number) {
    //para fazer depois a troca de estados
    console.log(`Categoria: ${categoria.nome}, Produto: ${produto.titulo}`);
  }
  criar(){
    this.router.navigate(['/selecionar-tipo']);
  }
}