import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/modelo/curso';
import { ServicioService } from 'src/app/modelo/servicio.service';

@Component({
  selector: 'app-contenedor-cursos',
  templateUrl: './contenedor-cursos.component.html',
  styleUrls: ['./contenedor-cursos.component.scss']
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
