import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  imports: [],
  templateUrl: './navbar-adm.html',
  styleUrl: './navbar-adm.scss'
})
export class NavbarAdm {
  
  constructor(private router:Router){}
  sair(){
    //deslogar
    this.router.navigate(['/login'])
  }
}
