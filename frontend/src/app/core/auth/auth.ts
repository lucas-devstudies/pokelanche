import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenUsuario } from '../../shared/models/token';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://127.0.0.1:8000/auth'

  constructor(private http:HttpClient){}

  login(email:string,senha:string):Observable<TokenUsuario>{
    return this.http.post<TokenUsuario>(`${this.apiUrl}/login`, { email, senha });
  }
}
