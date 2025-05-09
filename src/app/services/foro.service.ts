import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private url = 'http://localhost:8083/foros';
  private url2 = 'http://localhost:8083/comentarios';
  private urlUsuario = 'http://localhost:8083/usuarios';
  private foro = {};
  private usuario = {};
  private comentario = {};
  private login = {};

  constructor(private http: HttpClient) { }

  getForoData(): Observable<any> {
    return this.http.get(this.url);
  }

  getForoDataItem(foroId: number): Observable<any> {
    return this.http.get(this.url2+"/"+foroId);
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

  setForoDataUsuario(usuario: String, password: String, nombres: String, apellidos: String, rol: number): Observable<any> {

    this.usuario = 
      { 
        alias: usuario,
        password: password,
        nombres: nombres,
        apellidos: apellidos,
        rol: rol,
        vigencia: 1,
        direccion: 'S/D',
        key_word: ''  
      }
    console.log("Uri "+this.urlUsuario);
    console.log("Usuario "+JSON.stringify(this.usuario));
    return this.http.post(this.urlUsuario, this.usuario);
  }

  setComentarioData(comentarioId: number, foroId: number, usuarioId: number, comentario:String): Observable<any> {

    let fecha = new Date();
    let fechaStr = `${fecha.getFullYear()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getDate()}`;
    this.comentario = 
      { 
        comentarioId: null,
        foroId: foroId,
        usuario: usuarioId.toString(),
        comentario: comentario,
        registroFecha: fechaStr 
      }
    console.log("Uri "+this.url2);
    console.log("Foro "+JSON.stringify(this.comentario));
    return this.http.post(this.url2, this.comentario);
  }

  setLogin(usuario: String, password: String): Observable<any> {

    this.login = 
      { 
        alias: usuario,
        password: password,
      }
    return this.http.post(this.urlUsuario+"/login" , this.login);

  }

}
