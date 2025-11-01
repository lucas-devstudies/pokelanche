import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProdutoCreateDTO } from '../../shared/models/produtoCreateDTO';
import { Observable } from 'rxjs';
import { Produto } from '../../shared/models/produto';
import { TokenService } from './token-service';
import { toFormData } from '../utils/form-data.util';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  API  = 'http://127.0.0.1:8000/produtos';

  constructor(private http: HttpClient,private tokenService: TokenService){}

  add(dados:ProdutoCreateDTO): Observable<Produto>{
    const headers = this.tokenService.getAuthHeaders();
    const formData = toFormData(dados);

    return this.http.post<Produto>(`${this.API}/cadastrar`,formData,{headers});
  }
}
