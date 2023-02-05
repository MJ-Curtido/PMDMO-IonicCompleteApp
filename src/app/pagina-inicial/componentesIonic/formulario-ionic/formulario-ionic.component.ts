import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/modelo/servicio.service';
import { Curso } from 'src/app/modelo/curso';

@Component({
  selector: 'app-formulario-ionic',
  templateUrl: './formulario-ionic.component.html',
  styleUrls: ['./formulario-ionic.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class FormularioIonicComponent implements OnInit {
  protected miFormulario!: FormGroup;
  protected controlNombre!: FormControl;
  protected controlValoracion!: FormControl;

  constructor(
    protected serv: ServicioService,
    private controlAlerta: AlertController
  ) {}

  ngOnInit() {
    this.controlNombre = new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]);

    this.controlValoracion = new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]);

    this.miFormulario = new FormGroup({
      controlNombre: this.controlNombre,
      controlValoracion: this.controlValoracion,
    });
  }

  async comprobarValidacion() {
    let txtError = '';

    if (this.controlNombre.invalid && this.controlValoracion.invalid)
      txtError = 'Ambos datos están mal introducidos.';
    else if (this.controlNombre.invalid)
      txtError = 'El nombre no cumple con los caracteres mínimos.';
    else if (this.controlValoracion.invalid)
      txtError = 'La valoración tiene que ser un número entre 0 y 10.';

    if (this.miFormulario.invalid) {
      const alerta = await this.controlAlerta.create({
        header: 'Error',
        message: txtError,
        buttons: ['Okey'],
      });

      await alerta.present();
    } else {
      this.serv.anyadirCurso(
        new Curso(this.controlNombre.value, this.controlValoracion.value)
      );
      this.miFormulario.reset();
    }
  }

  async echarFoto() {
    const foto = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });
  }

  private async leerEnBase64(foto: Photo) {
    const respuesta = await fetch(foto.webPath!);
    const blob = await respuesta.blob();

    return (await this.convertidorBlobABase64(blob)) as string;
  }

  private convertidorBlobABase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async guardarFoto(foto: Photo) {
    const base64Data = await this.leerEnBase64(foto);
    const ruta = new Date().getTime() + '.png';

    const archivoGuardado = await Filesystem.writeFile({
      path: ruta,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filepath: ruta,
      webviewPath: foto.webPath,
    };
  }
}
