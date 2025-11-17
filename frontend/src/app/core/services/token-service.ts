import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable({providedIn:'root'})
export class TokenService {
  getToken():string{
    const rawtoken = localStorage.getItem('token');
    if(!rawtoken) throw new Error('Token não encontrado. Faça Login antes de cadastrar');
    return rawtoken.replace(/(\r\n|\n|\r)/gm, '').trim();
  }
  getAuthHeaders(): HttpHeaders{
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  logout():void{
    localStorage.removeItem('token');
  }
}
