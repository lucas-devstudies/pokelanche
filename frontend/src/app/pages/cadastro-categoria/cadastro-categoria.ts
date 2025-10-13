import { Component } from '@angular/core';
import { ImgSelecionavel } from "../../components/img-selecionavel/img-selecionavel";
import { NavbarAdm } from "../../components/navbar-adm/navbar-adm";
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-categoria',
  imports: [ImgSelecionavel, NavbarAdm, BotaoConfirmar],
  templateUrl: './cadastro-categoria.html',
  styleUrl: './cadastro-categoria.scss'
})
export class CadastroCategoria {

  constructor(private router: Router){}
  voltar(){
    this.router.navigate(['/home-admin']);
  }
  salvar(){
    //aqui cadastraria o produto
    this.router.navigate(['/home-admin']);
  }
}
