import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Categoria} from '../models/categoria';
import {Observable, map} from 'rxjs';
import { CategoriaCreateDTO } from '../models/categoriaCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  http = inject(HttpClient);

  API = "http://127.0.0.1:8000/categorias";

  add(dados: CategoriaCreateDTO): Observable<Categoria> {
    const rawtoken = localStorage.getItem('token');
    if (!rawtoken) {
      throw new Error('Token não encontrado. Faça login antes de cadastrar.');
    }
    const token = rawtoken.replace(/(\r\n|\n|\r)/gm, '').trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const formData = new FormData();
    formData.append('nome', dados.nome);
    formData.append('imagem', dados.imagem);

    console.log(token);

    return this.http.post<Categoria>(
      `${this.API}/cadastrar`,
      formData,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        }),
      }
    );
  }
  getAll():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API + '/listar');
  }
}
