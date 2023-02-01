import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private listaCursos: Curso[];
  private _listaCursos$: BehaviorSubject<Curso[]>;

  constructor() {
    this.listaCursos = [
      new Curso('Manu grande', 10),
      new Curso('Matematicas', 7),
      new Curso('Acceso a Datos', 0),
    ];

    this._listaCursos$ = new BehaviorSubject<Curso[]>(this.listaCursos);
  }

  getListaNoticias(): Curso[] {
    return [...this.listaCursos];
  }

  getListaNoticias$(): Observable<Curso[]> {
    return this._listaCursos$.asObservable();
  }
}
