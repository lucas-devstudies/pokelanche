import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../models/categoria';
import {Observable, map} from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  http = inject(HttpClient);

  API = "http://127.0.0.1:8000";

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API + '/categorias');
  }
  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/produtos/${id}`);
  }
}
