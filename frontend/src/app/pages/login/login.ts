import { Component } from '@angular/core';
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenUsuario } from '../../models/token';
import { Auth } from '../../services/auth';

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

constructor(private router:Router,private auth: Auth){}

logar(){
  this.auth.login(this.email, this.senha).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.access_token);
      this.router.navigate(['/home-admin']);
    },
    error: (err) => {
      console.error('Erro no login:', err);
      this.erro = true;
    }
  });
  }
}