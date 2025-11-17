import { Component } from '@angular/core';
import { TokenService } from '../../services/token-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  imports: [],
  templateUrl: './navbar-adm.html',
  styleUrl: './navbar-adm.scss'
})
export class NavbarAdm {


  constructor(private router:Router,private tokenService:TokenService){}
  sair(){
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}
