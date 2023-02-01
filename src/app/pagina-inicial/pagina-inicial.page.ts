import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage implements OnInit {
  miFormulario!: FormGroup;
  controlNombre!: FormControl;
  controlValoracion!: FormControl;

  constructor(private controlAlerta: AlertController) { }

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
  }
}
