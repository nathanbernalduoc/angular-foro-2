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

  resultado:string = '';
  titulo = 'Foro';
  foro: any[] = []; // {} objeto | [] array
  inventario: any[] = []; // {} objeto | [] array
  nombre: String = "";
  categoriaId: number = 0;
  idNew: number = 0;

  miFormulario!: FormGroup;

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

  }


  getForo() {

    this.jsonService.getForoData().subscribe(
      valor => {
        console.log("Recuperando foros "+JSON.stringify(valor));
        this.foro = valor;
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );

  }

  goDetalle(foroId:string): void {
    console.log('Hola '+foroId);
    this.router.navigate(['detalle', {foroId: foroId}]);
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

}
