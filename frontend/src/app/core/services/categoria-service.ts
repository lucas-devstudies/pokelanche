import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import { Categoria } from '../../shared/models/categoria';
import { CategoriaCreateDTO } from '../../shared/models/categoriaCreateDTO';
import { TokenService } from './token-service';
import { toFormData } from '../utils/form-data.util';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API = "http://127.0.0.1:8000/categorias";

  constructor(private http:HttpClient,private tokenService: TokenService){}

  add(dados: CategoriaCreateDTO): Observable<Categoria> {
    const headers = this.tokenService.getAuthHeaders();
    const formData = toFormData(dados);

    return this.http.post<Categoria>(`${this.API}/cadastrar`,formData,{headers});
  }
  getAll():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API + '/listar_com_produtos');
  }
}
