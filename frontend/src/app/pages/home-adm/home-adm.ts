import { Component } from '@angular/core';

import { ImgSelecionavel } from "../../components/img-selecionavel/img-selecionavel";
import { NavbarAdm } from "../../components/navbar-adm/navbar-adm";
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import {Footer} from "../../components/footer/footer"
@Component({
  selector: 'app-home-adm',
  imports: [Footer, NavbarAdm, BotaoConfirmar],
  templateUrl: './home-adm.html',
  styleUrls: ['./home-adm.scss']
})
export class HomeAdm {
  usuario = 'Administrador';
  ativo: number | null = null;

  toggle(index: number) {
    this.ativo = this.ativo === index ? null : index;
  }

  sair() {
    console.log('Saindo...');
  }
}
