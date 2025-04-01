import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private url = '/libros';
  private libro = {};

  constructor(private http: HttpClient) { }

  getLibroData(): Observable<any> {
    return this.http.get(this.url);
  }

  setLibroData(id: number, titulo:String, autor:String, publicacion: number, genero:String): Observable<any> {
    this.libro = 
      {
        id: id,
        titulo: titulo,
        autor: autor,
        publicacion: publicacion,
        genero: genero,
      }
    return this.http.post(this.url, this.libro);
  }

}
