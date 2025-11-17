import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenUsuario } from '../../shared/models/token';
import { TokenService } from '../services/token-service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://127.0.0.1:8000/auth'

  constructor(private http:HttpClient,private tokenService: TokenService){}

  login(email:string,senha:string):Observable<TokenUsuario>{
    return this.http.post<TokenUsuario>(`${this.apiUrl}/login`, { email, senha });
  }

  salvarToken(token: string) {
    this.tokenService.setToken(token);
  }

  logout() {
    this.tokenService.logout();
  }
}
