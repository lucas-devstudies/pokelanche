import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria-service';
import { Categoria } from '../../models/categoria';
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { NavbarAdm } from "../../components/navbar-adm/navbar-adm";
import { ImgSelecionavel } from "../../components/img-selecionavel/img-selecionavel";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  imports: [BotaoConfirmar, NavbarAdm, ImgSelecionavel,CommonModule],
  templateUrl: './cadastro-produto.html',
  styleUrl: './cadastro-produto.scss'
})
export class CadastroProduto {

  constructor(private router:Router){}
  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];

  ngOnInit(){
    this.findAll();
    console.log(this.listaCategorias);
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
  voltar(){
    this.router.navigate(['home-admin']);
  }
  salvar(){
    this.router.navigate(['/home-admin']);
  }
}