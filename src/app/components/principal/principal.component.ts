import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ForoService } from '../../services/foro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule, HttpClientModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  providers: [ForoService, HttpClient]
})

export class PrincipalComponent implements OnInit {

  resultado: String = '';
  resultado2: String = '';
  resultado3: String = '';
  titulo = 'Foro';
  foro: any[] = []; // {} objeto | [] array
  inventario: any[] = []; // {} objeto | [] array
  nombre: String = "";
  categoriaId: number = 0;
  idNew: number = 0;

  usuario: String = "";
  usuario2: String = "";
  nombres: String = "";
  apellidos: String = "";
  password: String = "";
  rol: number = 1;

  miFormulario!: FormGroup;
  miFormulario2!: FormGroup;
  miFormulario3!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private jsonService: ForoService,
  ) {
    this.getForo();
  }

  ngOnInit(): void {

    console.log('foros no recuperada '+JSON.stringify(this.foro));

    this.miFormulario = this.fb.group({
      foroId: [''],
      nombre: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });

    this.miFormulario2 = this.fb.group({
      usuario: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: [''],
      password: ['', Validators.required],
      rol: [1]
    });

    this.miFormulario3 = this.fb.group({
      usuario2: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  getForo() {

    this.jsonService.getForoData().subscribe(
      valor => {
        console.log("Recuperando foros 2 "+JSON.stringify(valor._embedded.foroDtoList));
        this.foro = valor._embedded.foroDtoList;
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );

  }

  goDetalle(foroId:string): void {
    console.log('Hola '+foroId);
    this.router.navigate([ '/detalle', foroId ]);
  }

  submitForm() {
    console.log(this.foro.length);
    this.idNew = this.foro.length ? this.foro[this.foro.length-1].id + 1:1;

    console.log('Validando');
    this.nombre = this.miFormulario.get('nombre')!.value;
    this.categoriaId = this.miFormulario.get('categoriaId')!.value;

    this.jsonService.setForoData(this.idNew, this.nombre, this.categoriaId).subscribe(
      valor => {
        console.log("Feedback inserción foro "+JSON.stringify(valor));
        this.foro = valor;
        this.getForo();
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );


  }

  submitForm2() {

    this.usuario = this.miFormulario2.get('usuario')!.value;
    this.password = this.miFormulario2.get('password')!.value;
    this.nombres = this.miFormulario2.get('nombres')!.value;
    this.apellidos = this.miFormulario2.get('apellidos')!.value;
    this.rol = this.miFormulario2.get('rol')!.value;

    this.jsonService.setForoDataUsuario(this.usuario, this.password, this.nombres, this.apellidos, this.rol).subscribe(
      usuarioItem => {
        console.log("Feedback inserción foro "+JSON.stringify(usuarioItem));
        this.resultado2 = (usuarioItem)?"Usuario creado correctamente":"Se ha producido un error al intentar crear el usaurio.";
        //this.getForo();
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );


  }

  submitFormLogin() {

    this.usuario2 = this.miFormulario3.get('usuario2')!.value;
    this.password = this.miFormulario3.get('password')!.value;

    console.log("Usuario : "+this.usuario2+" / Password: "+this.password);

    this.jsonService.setLogin(this.usuario2, this.password).subscribe(
      login => {
        console.log("Feedback login "+JSON.stringify(login));
        this.resultado3 = (login.status == true)?"LOGIN OK!":"Credenciales incorrectas.";
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 


    );


  }

}
