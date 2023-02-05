import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/modelo/servicio.service';
import { Curso } from 'src/app/modelo/curso';

@Component({
  selector: 'app-formulario-ionic',
  templateUrl: './formulario-ionic.component.html',
  styleUrls: ['./formulario-ionic.component.scss']
})
export class FormularioIonicComponent implements OnInit {
  protected miFormulario!: FormGroup;
  protected controlNombre!: FormControl;
  protected controlValoracion!: FormControl;
  protected srcImg: String;

  constructor(
    protected serv: ServicioService,
    private controlAlerta: AlertController
  ) {
    this.srcImg = './assets/img/sinIcono.png'
  }

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
        new Curso(this.controlNombre.value, this.controlValoracion.value, this.srcImg)
      );
      this.miFormulario.reset();
      this.controlValoracion.setValue(0)
      this.srcImg = './assets/img/sinIcono.png';
    }
  }

  async cogerFotoSistema() {
    const foto = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri,
    });

    const savedImageFile = await this.guardarFoto(foto);
  }

  async echarFoto() {
    const foto = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    const savedImageFile = await this.guardarFoto(foto);
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

    this.leerFoto(ruta);

    return {
      filepath: ruta,
      webviewPath: foto.webPath,
    };
  }

  async leerFoto(ruta: string){
    let file = await Filesystem.readFile({
      directory: Directory.Data,
      path: ruta
    })

    let data = `data:image/png;base64,${file.data}`;
    this.srcImg = data;
  }
}
