import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { LibroService } from '../../services/libro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule, HttpClientModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  providers: [LibroService, HttpClient]
})

export class PrincipalComponent implements OnInit {

  resultado:string = '';
  titulo = 'Libro';
  libro: any[] = []; // {} objeto | [] array
  inventario: any[] = []; // {} objeto | [] array
  autor: String = "";
  publicacion: number = 0;
  genero: String = "";
  idNew: number = 0;

  miFormulario!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private jsonService: LibroService,
  ) {
    this.getLibro();
  }

  ngOnInit(): void {

    console.log('libros no recuperada '+JSON.stringify(this.libro));

    this.miFormulario = this.fb.group({
      libroId: [''],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      publicacion: ['', Validators.required],
      genero: [''],
    });

  }


  getLibro() {

    this.jsonService.getLibroData().subscribe(
      valor => {
        console.log("Recuperando libros "+JSON.stringify(valor));
        this.libro = valor;
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );

  }

  goDetalle(libro:string): void {
    console.log('Hola '+libro);
    this.router.navigate(['detalle', {libro: libro}]);
  }

  submitForm() {

    this.idNew = this.libro[this.libro.length-1].id + 1;

    console.log('Validando');
    this.titulo = this.miFormulario.get('titulo')!.value;
    this.autor = this.miFormulario.get('autor')!.value;
    this.publicacion = this.miFormulario.get('publicacion')!.value;
    this.genero = this.miFormulario.get('genero')!.value;

    this.jsonService.setLibroData(this.idNew, this.titulo, this.autor, this.publicacion, this.genero).subscribe(
      valor => {
        console.log("Feedback inserción libro "+JSON.stringify(valor));
        this.libro = valor;
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );


  }

}
