import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProdutoCreateDTO } from '../../shared/models/produtoCreateDTO';
import { Observable } from 'rxjs';
import { Produto } from '../../shared/models/produto';
import { TokenService } from './token-service';
import { toFormData } from '../utils/form-data.util';
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  caminho = environment.apiUrl;
  API = `${this.caminho}/produtos`;
  

  constructor(private http: HttpClient,private tokenService: TokenService){}

  add(dados:ProdutoCreateDTO): Observable<Produto>{
    const headers = this.tokenService.getAuthHeaders();
    const formData = toFormData(dados);

    return this.http.post<Produto>(`${this.API}/cadastrar`,formData,{headers});
  }
  remove(id:number){
    const headers = this.tokenService.getAuthHeaders();
    return this.http.delete(`${this.API}/deletar/${id}`,{headers});
  }
  getById(id:number):Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get<Produto>(`${this.API}/buscar_por_id/${id}`,{headers});
  }
}
