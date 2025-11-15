import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarAdm } from '../../core/components/navbar-adm/navbar-adm';
import { CategoriaItem } from '../../shared/components/categoria-item/categoria-item';
import { CategoriaService } from '../../core/services/categoria-service';
import { Categoria } from '../../shared/models/categoria';
import { BotaoConfirmar } from '../../shared/components/botao-confirmar/botao-confirmar';
import { ProdutoItem } from "../../shared/components/produto-item/produto-item";

@Component({
  selector: 'app-home-admin',
  imports: [NavbarAdm, CommonModule, BotaoConfirmar, ProdutoItem],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.scss'
})
export class HomeAdmin {

  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];

  constructor(private router:Router){
    this.getAll();
    this.dropdownAberto = Array(this.listaCategorias.length).fill(false);
  }

  getAll() {
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
  criar(){
    this.router.navigate(['/selecionar-tipo']);
  }
  reflash(){
    this.getAll();
  }
  dash(){
    this.router.navigate(['/dash-categorias']);
  }
}