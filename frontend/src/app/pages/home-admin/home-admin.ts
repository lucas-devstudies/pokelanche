import { Component, inject } from '@angular/core';
import { NavbarAdm } from "../../components/navbar-adm/navbar-adm";
import { CategoriaService } from '../../services/categoria-service';
import { Categoria } from '../../models/categoria';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';
import { CategoriaItem } from "../../components/categoria-item/categoria-item";
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  imports: [NavbarAdm, CommonModule, CategoriaItem, BotaoConfirmar],
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
