import { Component } from '@angular/core';
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [BotaoConfirmar, CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  email: string = "";
  senha: string = "";
  erro=false;

constructor(private router:Router){}

logar(){
  if (this.email.length>=8 && this.senha.length>=6){
    this.router.navigate(['/home-admin'])
  }else{
    this.erro=true
  }
}
}
