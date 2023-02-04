import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Curso } from '../modelo/curso';
import { ServicioService } from '../modelo/servicio.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage implements OnInit {
  protected miFormulario!: FormGroup;
  protected controlNombre!: FormControl;
  protected controlValoracion!: FormControl;
  protected listaCursos!: Curso[];

  constructor(private controlAlerta: AlertController, protected serv: ServicioService, private router: Router) { }

  ngOnInit() {
    this.controlNombre = new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]);

    this.controlValoracion = new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ]);

    this.miFormulario = new FormGroup({
      controlNombre: this.controlNombre,
      controlValoracion: this.controlValoracion,
    });

    this.serv.getListaCursos$().subscribe(cursos => this.listaCursos = cursos);
  }

  async comprobarValidacion() {
    let txtError = "";

    if (this.controlNombre.invalid && this.controlValoracion.invalid) txtError = "Ambos datos están mal introducidos.";
    else if (this.controlNombre.invalid) txtError = "El nombre no cumple con los caracteres mínimos.";
    else if (this.controlValoracion.invalid) txtError = "La valoración tiene que ser un número entre 0 y 10.";

    if (this.miFormulario.invalid) {
      const alerta = await this.controlAlerta.create({
        header: 'Error',
        message: txtError,
        buttons: ['Okey'],
      });
  
      await alerta.present();
    }
    else {
      this.serv.anyadirCurso(new Curso(this.controlNombre.value, this.controlValoracion.value));
      this.miFormulario.reset();
    }
  }

  clickDetalleCurso(curso: Curso) {
    this.router.navigate(['pagina-detalle', curso.getId()]);
  }
}
