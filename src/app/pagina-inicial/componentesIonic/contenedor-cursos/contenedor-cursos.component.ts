import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/modelo/curso';
import { ServicioService } from 'src/app/modelo/servicio.service';

@Component({
  selector: 'app-contenedor-cursos',
  templateUrl: './contenedor-cursos.component.html',
  styleUrls: ['./contenedor-cursos.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule]
})
export class ContenedorCursosComponent implements OnInit {
  listaCursos!: Curso[];

  constructor(protected serv: ServicioService, private router: Router) {}

  ngOnInit() {
    this.serv
      .getListaCursos$()
      .subscribe((cursos) => (this.listaCursos = cursos));

      console.log(this.listaCursos)
  }

  clickDetalleCurso(curso: Curso) {
    this.router.navigate(['pagina-detalle', curso.getId()]);
  }
}
