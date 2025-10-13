import { Component } from '@angular/core';
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { NavbarAdm } from "../../components/navbar-adm/navbar-adm";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecionar-tipo',
  imports: [BotaoConfirmar, NavbarAdm, CommonModule],
  templateUrl: './selecionar-tipo.html',
  styleUrl: './selecionar-tipo.scss'
})
export class SelecionarTipo {

  ativado:boolean=false;

  constructor(private router: Router){}

  alterarEstado(){
    this.ativado=!this.ativado;
  }
  voltar(){
    this.router.navigate(['/home-admin'])
  }
  continuar(){
    if(this.ativado==true){
      this.router.navigate(['/cadastro-produto']);
    }else{
      this.router.navigate(['/cadastro-categoria']);
    }
  }
}
