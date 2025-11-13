import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import { Categoria } from '../../shared/models/categoria';
import { CategoriaCreateDTO } from '../../shared/models/categoriaCreateDTO';
import { TokenService } from './token-service';
import { toFormData } from '../utils/form-data.util';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  caminho = environment.apiUrl;
  API = `${this.caminho}/categorias`;

  constructor(private http:HttpClient,private tokenService: TokenService){}

  add(dados: CategoriaCreateDTO): Observable<Categoria> {
    const headers = this.tokenService.getAuthHeaders();
    const formData = toFormData(dados);

    return this.http.post<Categoria>(`${this.API}/cadastrar`,formData,{headers});
  }
  getAll():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API + '/listar_com_produtos');
  }
  getById(id:number):Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.API}/buscar_por_id/${id}`);
  }
}
