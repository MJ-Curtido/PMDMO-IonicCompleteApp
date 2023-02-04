import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private listaCursos: Curso[];
  private _listaCursos$: BehaviorSubject<Curso[]>;

  constructor() {
    this.listaCursos = [
      new Curso('Programación Multimedia y dispositivos móviles', 10),
      new Curso('Desarrollo de interfaces', 7),
      new Curso('Acceso a datos', 0),
    ];

    this._listaCursos$ = new BehaviorSubject<Curso[]>(this.listaCursos);
  }

  getListaCursos(): Curso[] {
    return [...this.listaCursos];
  }

  getListaCursos$(): Observable<Curso[]> {
    return this._listaCursos$.asObservable();
  }

  anyadirCurso(curso: Curso) {
    this.listaCursos.unshift(curso);
    this._listaCursos$.next([...this.listaCursos]);
  }

  eliminarCurso(curso: Curso) {
    this.listaCursos = this.listaCursos.filter(
      (cursoServ) => cursoServ.getId() !== curso.getId()
    );
    this._listaCursos$.next([...this.listaCursos]);
  }

  getCurso(id: String) {
    let curso: any = null;

    for (let i = 0; i < this.listaCursos.length && curso == null; i++) {
      if (this.listaCursos[i].getId() == id) {
        curso = this.listaCursos[i];
      }
    }

    return curso;
  }
}
