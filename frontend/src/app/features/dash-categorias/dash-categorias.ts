import { Component } from '@angular/core';
import { NavbarAdm } from "../../core/components/navbar-adm/navbar-adm";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../shared/models/categoria';
import { CategoriaItem } from "../../shared/components/categoria-item/categoria-item";
import { CategoriaService } from '../../core/services/categoria-service';
import { BotaoConfirmar } from "../../shared/components/botao-confirmar/botao-confirmar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-categorias',
  imports: [NavbarAdm, CommonModule, FormsModule, CategoriaItem, BotaoConfirmar],
  templateUrl: './dash-categorias.html',
  styleUrl: './dash-categorias.scss',
})
export class DashCategorias {

  listaCategorias!:Categoria[];

  constructor(private categoriaService:CategoriaService,private router: Router){
    this.getAll();
  }
  getAll(){
    this.categoriaService.getCategorias().subscribe({
      next:dados =>{
        this.listaCategorias = Array.isArray(dados) ? dados : [];    
      },error:erro =>{
        console.log('Requisição falhou | erro: ' + erro);
      }
    });
  }
  criar(){
    this.router.navigate(['/cadastro-categoria']);
  }
  voltar(){
    this.router.navigate(['/home-admin']);
  }
}
