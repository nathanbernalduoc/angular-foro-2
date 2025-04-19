import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private url = '/foro';
  private url2 = '/comentario';
  private foro = {};
  private comentario = {};

  constructor(private http: HttpClient) { }

  getForoData(): Observable<any> {
    return this.http.get(this.url);
  }

  getForoDataItem(foroId: number): Observable<any> {
    return this.http.get(this.url+"/"+foroId);
  }

  setForoData(id: number, nombre:String, categoriaId: number): Observable<any> {

    this.foro = 
      { 
        foroId: id,
        nombre: nombre,
        categoriaId: categoriaId
      }
    console.log("Uri "+this.url);
    console.log("Foro "+JSON.stringify(this.foro));
    return this.http.post(this.url, this.foro);
  }

  setComentarioData(comentarioId: number, foroId: number, usuarioId: number, comentario:String): Observable<any> {

    let fecha = new Date();
    let fechaStr = `${fecha.getFullYear()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getDate()}`;
    this.comentario = 
      { 
        comentarioId: null,
        foroId: foroId,
        usuarioId: usuarioId,
        comentario: comentario,
        registroFecha: fechaStr 
      }
    console.log("Uri "+this.url2);
    console.log("Foro "+JSON.stringify(this.comentario));
    return this.http.post(this.url2, this.comentario);
  }

}
