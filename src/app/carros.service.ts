import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carros } from './carro';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {
  url = "http://localhost:3000/carros";
  constructor(private http: HttpClient) { }

  getCarros(): Observable<Carros[]> {
    return this.http.get<Carros[]>(this.url)
  }

  save(carros: Carros): Observable<Carros> {
    return this.http.post<Carros>(this.url, carros);
  }

  update(carros: Carros): Observable<Carros> {
    return this.http.put<Carros>(`${this.url}/${carros.id}`, carros);
  }

  delete(carros: Carros): Observable<void> {
    return this.http.delete<void>(`${this.url}/${carros.id}`);
  }
}
