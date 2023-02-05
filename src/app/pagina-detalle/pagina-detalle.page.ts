import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Curso } from '../modelo/curso';
import { ServicioService } from '../modelo/servicio.service';

@Component({
  selector: 'app-pagina-detalle',
  templateUrl: './pagina-detalle.page.html',
  styleUrls: ['./pagina-detalle.page.scss'],
})
export class PaginaDetallePage implements OnInit {
  private sub: any;
  protected id!: String;
  protected curso!: Curso;

  constructor(
    private controlAlerta: AlertController,
    protected serv: ServicioService,
    private routerActivo: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.routerActivo.params.subscribe((params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.curso = this.serv.getCurso(this.id);
  }

  async clickEliminarCurso() {
    this.serv.eliminarCurso(this.curso);

    const alerta = await this.controlAlerta.create({
      header: 'Curso eliminado',
      message: 'Curso eliminado correctamente.',
      buttons: ['Okay'],
    });

    await alerta.present();

    this.router.navigate(['pagina-inicial']);
  }
}
